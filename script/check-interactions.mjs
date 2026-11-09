import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile("site/interactions.js", "utf8");
for (const id of ["contact-form", "buyer-form", "seller-form", "valuation-form", null]) {
  const button = { hidden: true, href: "/contact#contact-form" };
  const events = {};
  const window = {
    scrollY: 0,
    matchMedia: () => ({ matches: true }),
    addEventListener: (name, fn, options) => { events[name] = { fn, options }; },
    requestAnimationFrame: fn => fn(),
  };
  vm.runInNewContext(source, {
    window,
    document: { querySelector: selector => selector === ".floating-contact" ? button : selector.startsWith("#") && id ? { id } : null },
  });
  assert.equal(button.hidden, true, "Contact button should not cover the first viewport");
  assert.equal(button.href, id ? `#${id}` : "/contact#contact-form");
  assert.equal(events.scroll.options.passive, true);
  window.scrollY = 301;
  events.scroll.fn();
  assert.equal(button.hidden, false, "Contact button should appear after scrolling");
  window.matchMedia = () => ({ matches: false });
  events.resize.fn();
  assert.equal(button.hidden, true, "Contact button must stay hidden on desktop");
  window.matchMedia = () => ({ matches: true });
  window.scrollY = 0;
  events.pageshow.fn();
  assert.equal(button.hidden, true, "Contact button should hide again at the top");
}
console.log("PASS: mobile-only scroll button, desktop hiding, resize behavior, all four form destinations, fallback contact page, and passive scrolling.");

{
  const events = {};
  const button = { hidden: true };
  let menuClick;
  let summaryFocused = false;
  const menu = {
    open: true,
    addEventListener: (_name, callback) => { menuClick = callback; },
    querySelector: () => ({ focus: () => { summaryFocused = true; } }),
  };
  vm.runInNewContext(source, {
    window: { scrollY: 0, matchMedia: () => ({ matches: true }), requestAnimationFrame: fn => fn(), addEventListener: (name, fn) => { events[name] = fn; } },
    document: { querySelector: selector => selector === ".floating-contact" ? button : selector === ".mobile-menu" ? menu : null },
  });
  events.keydown({ key: "Escape" });
  assert.equal(menu.open, false);
  assert.equal(summaryFocused, true);
  menu.open = true;
  menuClick({ target: { closest: () => ({}) } });
  assert.equal(menu.open, false, "Following a menu link should close the overlay");
}
console.log("PASS: menu Escape handling, focus restoration, and closing after following a link.");
