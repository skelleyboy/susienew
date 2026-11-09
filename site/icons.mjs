export const externalArrow = '<svg class="link-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg>';

// Older templates contain text glyphs. Emit the same SVG for every link icon.
export const withSvgArrows = markup => markup
  .replace(/<(span|b)\b[^>]*>\s*↗\s*<\/\1>/g, externalArrow)
  .replace(/↗/g, externalArrow);
