#!/usr/bin/env bash
# =============================================================================
#  build_book.sh  –  Build "Tesla Engine" as a PDF book using Pandoc + LaTeX
# =============================================================================
#
#  Usage:
#    ./build_book.sh              # full build  → dist/tesla-engine-book.pdf
#    ./build_book.sh --no-cover   # skip standalone cover page
#    ./build_book.sh --help
#
#  Requirements:
#    - pandoc  (https://pandoc.org)
#    - pdflatex / xelatex  (TeX Live or MacTeX)
#    - pdftk OR pdfunite   (for cover merging; optional if --no-cover)
#
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BOOK_DIR="$REPO_ROOT/book"
PAGES_DIR="$REPO_ROOT/_pages"
DIST_DIR="$REPO_ROOT/dist"
BUILD_DIR="$REPO_ROOT/.book-build"   # temporary artefacts

OUTPUT_PDF="$DIST_DIR/tesla-engine-book.pdf"
COVER_TEX="$BOOK_DIR/latex/cover.tex"
COVER_PDF="$BUILD_DIR/cover.pdf"

# ---------------------------------------------------------------------------
# Colours for terminal output
# ---------------------------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RESET='\033[0m'
info()    { echo -e "${GREEN}[INFO]${RESET}  $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; }
die()     { error "$*"; exit 1; }

# ---------------------------------------------------------------------------
# Argument parsing
# ---------------------------------------------------------------------------
BUILD_COVER=true

for arg in "$@"; do
  case "$arg" in
    --no-cover) BUILD_COVER=false ;;
    --help|-h)
      sed -n '3,17p' "$0"   # print the Usage block at the top of this file
      exit 0
      ;;
    *) die "Unknown argument: $arg" ;;
  esac
done

# ---------------------------------------------------------------------------
# Dependency checks
# ---------------------------------------------------------------------------
info "Checking dependencies…"

command -v pandoc  >/dev/null 2>&1 || die "pandoc not found. Install from https://pandoc.org"
command -v pdflatex >/dev/null 2>&1 || \
  command -v xelatex  >/dev/null 2>&1 || \
  die "No LaTeX engine found (pdflatex or xelatex). Install TeX Live or MacTeX."

if $BUILD_COVER; then
  if command -v pdftk >/dev/null 2>&1; then
    MERGE_TOOL="pdftk"
  elif command -v pdfunite >/dev/null 2>&1; then
    MERGE_TOOL="pdfunite"
  else
    warn "Neither pdftk nor pdfunite found — cover page will be skipped."
    BUILD_COVER=false
  fi
fi

# Prefer xelatex for better Unicode/font support; fall back to pdflatex
if command -v xelatex >/dev/null 2>&1; then
  LATEX_ENGINE="xelatex"
else
  LATEX_ENGINE="pdflatex"
fi
info "LaTeX engine: $LATEX_ENGINE"

# ---------------------------------------------------------------------------
# Prepare directories
# ---------------------------------------------------------------------------
mkdir -p "$DIST_DIR" "$BUILD_DIR" "$BUILD_DIR/img"

# ---------------------------------------------------------------------------
# Step 0 – Convert SVG assets to PDF for LaTeX inclusion
# ---------------------------------------------------------------------------
info "Converting SVG assets to PDF…"
for svg_file in "$REPO_ROOT/assets/img/"*.svg; do
  base="$(basename "$svg_file" .svg)"
  rsvg-convert -f pdf -o "$BUILD_DIR/img/${base}.pdf" "$svg_file" \
    && info "  ${base}.svg → ${base}.pdf" \
    || warn "  Failed to convert ${base}.svg (skipping)"
done

# ---------------------------------------------------------------------------
# Step 1 – Strip Jekyll front-matter and class annotations from MD sources
#          Pandoc does not understand {: .class } syntax or YAML blocks with
#          Jekyll-specific keys (layout, permalink, sim_url).
# ---------------------------------------------------------------------------
info "Pre-processing Markdown sources…"

# Write the perl preprocessing script once into the build dir
write_preprocess_script() {
  cat > "$BUILD_DIR/preprocess.pl" <<'PERLEOF'
#!/usr/bin/env perl
# Pre-process a Jekyll/Kramdown Markdown file for Pandoc PDF generation.
use strict;
use warnings;
use utf8;
use open ':std', ':encoding(UTF-8)';

local $/ = undef;
my $text = <STDIN>;

# 0a. Replace graph-container divs with raw LaTeX \includegraphics
#     IMG_DIR is injected by the shell at preprocess.pl generation time.
my $img_dir = $ENV{BOOK_IMG_DIR};
$text =~ s{<div class="graph-container">\s*<img[^>]*src="[^"]*?/([^"/]+\.svg)[^"]*"[^>]*alt="([^"]*)"[^>]*>\s*</div>}{
my ($svgfile, $alt) = ($1, $2);
(my $base = $svgfile) =~ s/\.svg$//;
my $pdf = "$img_dir/${base}.pdf";
"\\begin{figure}[H]\n\\centering\n\\includegraphics[width=0.85\\linewidth]{$pdf}\n\\caption{$alt}\n\\end{figure}"
}gse;

# 0b. Normalise Jekyll/Kramdown math delimiters → Pandoc dollar math
#    Kramdown source uses \\[...\\] (display) and \\(...\\) (inline).
#    Convert them to $$...$$ and $...$ which Pandoc handles natively
#    with the tex_math_dollars extension, avoiding any escaping issues.
$text =~ s/\\\\\[(.*?)\\\\\]/\$\$$1\$\$/gs;   # \\[...\\] → $$...$$
$text =~ s/\\\\\((.*?)\\\\\)/\$$1\$/gs;        # \\(...\\) → $...$

# 1. Remove YAML front matter at the very start of the file
$text =~ s/\A---\n.*?---\n//s;

# 2. Remove {: .class } Kramdown annotations
$text =~ s/\{:\s*\.[^}]*\}//g;

# 3. Remove Liquid template tags
$text =~ s/\{\{[^}]*\}\}//g;
$text =~ s/\{%[^%]*%\}//g;

# 4. Strip emoji from headings (and anywhere at start of token after ## prefix)
$text =~ s/(^[ \t]*#{0,6}[ \t]*)[\x{1F000}-\x{1FFFF}\x{2600}-\x{27BF}\x{2300}-\x{23FF}]+[ \t]*/$1/mg;
# Strip stray variation selectors (U+FE0F) and zero-width joiners (U+200D)
$text =~ s/[\x{FE0F}\x{200D}]//g;
# Strip U+25B6 ▶ play icon used in CTA buttons
$text =~ s/\x{25B6}//g;

# 5. Convert Unicode subscript/physics notation to plain ASCII
#    Combined subscript forms first (order matters)
$text =~ s/v\x{2080}\x{2093}/v0x/g;   # v₀ₓ
$text =~ s/v\x{2080}\x{1D67}/v0y/g;   # v₀ᵧ
$text =~ s/v\x{2093}/vx/g;             # vₓ
$text =~ s/v\x{1D67}/vy/g;             # vᵧ
$text =~ s/x\x{2080}/x0/g;             # x₀
$text =~ s/v\x{2080}/v0/g;             # v₀
$text =~ s/v\x{2081}/v1/g;             # v₁
$text =~ s/v\x{2082}/v2/g;             # v₂
$text =~ s/v\x{2083}/v3/g;             # v₃
# Strip remaining lone subscript digits
$text =~ s/[\x{2080}-\x{2089}]//g;
$text =~ s/\x{2093}//g;   # ₓ
$text =~ s/\x{1D67}//g;   # ᵧ

# 6. Greek letters used in plain-text formula lines → ASCII
$text =~ s/\x{03B8}/theta/g;   # θ
$text =~ s/\x{03C0}/pi/g;      # π
$text =~ s/\x{0394}/Delta/g;   # Δ
$text =~ s/\x{2248}/approx/g;  # ≈
$text =~ s/\x{00B2}/^2/g;      # ²
$text =~ s/\x{00B9}/^1/g;      # ¹
$text =~ s/\x{00BD}/1\/2/g;    # ½
$text =~ s/\x{00B7}/*/g;       # · (middle dot)

# 7. Remove CTA button lines [text](url){: .btn ...}
$text =~ s/^\[.*?\]\(.*?\)\{:.*?\.btn.*?\}[ \t]*\n?//mg;

print $text;
PERLEOF
  chmod +x "$BUILD_DIR/preprocess.pl"
}

preprocess_md() {
  local src="$1"
  local dst="$2"
  BOOK_IMG_DIR="$BUILD_DIR/img" perl "$BUILD_DIR/preprocess.pl" < "$src" > "$dst"
}

PHYSICAL_QUANTITIES_CLEAN="$BUILD_DIR/physical-quantities-theory.md"
UNIFORM_CLEAN="$BUILD_DIR/uniform-motion-theory.md"
ACCELERATED_CLEAN="$BUILD_DIR/uniformly-accelerated-motion-theory.md"
FREE_FALL_CLEAN="$BUILD_DIR/free-fall-theory.md"
PROJECTILE_CLEAN="$BUILD_DIR/projectile-motion-theory.md"
GALILEAN_RELATIVITY_CLEAN="$BUILD_DIR/galilean-relativity-theory.md"

write_preprocess_script
preprocess_md "$PAGES_DIR/physical-quantities-theory.md"          "$PHYSICAL_QUANTITIES_CLEAN"
preprocess_md "$PAGES_DIR/uniform-motion-theory.md"               "$UNIFORM_CLEAN"
# Uniformly accelerated motion: theory + math-jit appended as a section
preprocess_md "$PAGES_DIR/uniformly-accelerated-motion-theory.md" "$ACCELERATED_CLEAN"
{
  echo ""
  echo "## Math JIT — Deriving the Position Formula"
  echo ""
  BOOK_IMG_DIR="$BUILD_DIR/img" perl "$BUILD_DIR/preprocess.pl" \
    < "$PAGES_DIR/uniformly-accelerated-motion-math-jit.md" \
    | sed '/^# [^#]/d' \
    | sed 's/^## /### /g'   # demote ## → ### so steps become subsections
} >> "$ACCELERATED_CLEAN"
preprocess_md "$PAGES_DIR/free-fall-theory.md"                    "$FREE_FALL_CLEAN"
# Projectile motion: theory + math-jit appended as a section
preprocess_md "$PAGES_DIR/projectile-motion-theory.md"            "$PROJECTILE_CLEAN"
{
  echo ""
  echo "## Math JIT — Splitting a Vector (The Shadow Analogy)"
  echo ""
  BOOK_IMG_DIR="$BUILD_DIR/img" perl "$BUILD_DIR/preprocess.pl" \
    < "$PAGES_DIR/projectile-motion-math-jit.md" \
    | sed '/^# [^#]/d' \
    | sed 's/^## /### /g'   # demote ## → ### so steps become subsections
} >> "$PROJECTILE_CLEAN"
preprocess_md "$PAGES_DIR/galilean-relativity-theory.md"          "$GALILEAN_RELATIVITY_CLEAN"

# ---------------------------------------------------------------------------
# Step 2 – (Optional) Build the standalone cover PDF with pdflatex/tikz
# ---------------------------------------------------------------------------
if $BUILD_COVER; then
  info "Building cover page (LaTeX/TikZ)…"
  pushd "$BUILD_DIR" >/dev/null
    cp "$COVER_TEX" ./cover.tex
    pdflatex -interaction=nonstopmode cover.tex >/dev/null 2>&1 \
      || { warn "Cover compilation failed; continuing without cover."; BUILD_COVER=false; }
  popd >/dev/null
fi

# ---------------------------------------------------------------------------
# Step 3 – Assemble the full book with Pandoc
#          Source order:
#            01  half-title
#            02  dedication        (raw LaTeX block)
#            03  preface
#            04  toc-placeholder   (raw LaTeX \tableofcontents)
#            10  chapter 1 – physical quantities & measurements
#            20  chapter 2 – uniform motion
#            30  chapter 3 – uniformly accelerated motion  (+ position formula derivation)
#            40  chapter 4 – free fall
#            50  chapter 5 – projectile motion             (+ shadow analogy)
#            60  chapter 6 – galilean relativity & reference frames
#            90  appendix
#            91  bibliography
#            92  colophon          (raw LaTeX block)
# ---------------------------------------------------------------------------
info "Running Pandoc…"

BODY_PDF="$BUILD_DIR/body.pdf"

pandoc \
  "$BOOK_DIR/metadata.yaml" \
  "$BOOK_DIR/01-half-title.md" \
  "$BOOK_DIR/02-dedication.md" \
  "$BOOK_DIR/03-preface.md" \
  "$PHYSICAL_QUANTITIES_CLEAN" \
  "$UNIFORM_CLEAN" \
  "$ACCELERATED_CLEAN" \
  "$FREE_FALL_CLEAN" \
  "$PROJECTILE_CLEAN" \
  "$GALILEAN_RELATIVITY_CLEAN" \
  "$BOOK_DIR/90-appendix.md" \
  "$BOOK_DIR/91-bibliography.md" \
  "$BOOK_DIR/92-colophon.md" \
  --from markdown+raw_tex+tex_math_dollars \
  --to pdf \
  --pdf-engine="$LATEX_ENGINE" \
  --toc \
  --toc-depth=3 \
  --number-sections \
  --top-level-division=chapter \
  --pdf-engine-opt="-interaction=nonstopmode" \
  --include-in-header="$BOOK_DIR/latex/header.tex" \
  --variable geometry:a4paper \
  --output "$BODY_PDF"

# ---------------------------------------------------------------------------
# Step 4 – Merge cover + body (if cover was built successfully)
# ---------------------------------------------------------------------------
if $BUILD_COVER && [ -f "$COVER_PDF" ]; then
  info "Merging cover + body…"
  case "$MERGE_TOOL" in
    pdftk)
      pdftk "$COVER_PDF" "$BODY_PDF" cat output "$OUTPUT_PDF"
      ;;
    pdfunite)
      pdfunite "$COVER_PDF" "$BODY_PDF" "$OUTPUT_PDF"
      ;;
  esac
else
  cp "$BODY_PDF" "$OUTPUT_PDF"
fi

# ---------------------------------------------------------------------------
# Step 5 – Cleanup temporary build artefacts
# ---------------------------------------------------------------------------
info "Cleaning up build artefacts…"
rm -rf "$BUILD_DIR"

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo ""
info "Book built successfully:"
echo "    $OUTPUT_PDF"
echo ""
ls -lh "$OUTPUT_PDF"
