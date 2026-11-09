"""Create font-independent brand lockups from the approved vector monogram.

Run with Python and fonttools. The generated SVGs use paths, not external fonts.
The original Quiver monogram remains in site/assets/brand-mark.svg.
"""
from pathlib import Path
from xml.etree import ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "site" / "assets"
INK = "#111111"
PAPER = "#ffffff"
SERIF = TTFont("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf")
SANS = TTFont("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")


def word_paths(text, font, size, tracking, x, baseline):
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    pieces = []
    cursor = x
    for char in text:
        name = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        if pen.getCommands():
            pieces.append(
                f'<path transform="translate({cursor:.3f} {baseline}) scale({scale:.7f} {-scale:.7f})" d="{pen.getCommands()}"/>'
            )
        cursor += glyphs[name].width * scale + tracking
    return "".join(pieces)


original = ET.fromstring((ASSETS / "brand-monogram-source.svg").read_text())
mark_paths = "".join(ET.tostring(node, encoding="unicode") for node in original.iter() if node.tag.endswith("path"))
if not mark_paths:
    raise ValueError("The source monogram has no vector paths")
mark_paths = mark_paths.replace('fill="#35362F"', 'fill="currentColor"')
name_paths = word_paths("SUSIE SHARAK", SERIF, 34, 2.1, 0, 36)
descriptor = word_paths("REAL ESTATE", SANS, 21, 2.4, 2, 70)


def svg(viewbox, content, color):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-label="Susie Sharak Real Estate" style="color:{color}"><g fill="currentColor">{content}</g></svg>\n'


for suffix, color in [("", INK), ("-light", PAPER)]:
    (ASSETS / f"brand-mark{suffix}.svg").write_text(svg("0 0 80 80", mark_paths, color))
    wordmark = f'<g transform="translate(4 0)">{name_paths}{descriptor}</g>'
    (ASSETS / f"brand-wordmark{suffix}.svg").write_text(svg("0 0 345 90", wordmark, color))
    lockup = f'<g transform="translate(2 10)">{mark_paths}</g><path d="M100 22V78" stroke="currentColor" stroke-width=".6" opacity=".45"/><g transform="translate(124 12)">{name_paths}{descriptor}</g>'
    (ASSETS / f"brand-lockup{suffix}.svg").write_text(svg("0 0 475 110", lockup, color))

(ASSETS / "favicon.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">'
    f'<rect width="96" height="96" rx="8" fill="{INK}"/>'
    f'<g transform="translate(8 8)" style="color:{PAPER}">{mark_paths}</g></svg>\n'
)
print("Created path-based brand wordmarks, lockups, reverse marks, and favicon.")
