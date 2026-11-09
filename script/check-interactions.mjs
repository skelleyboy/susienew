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

{
  const events = {};
  const button = { hidden: true };
  let bounds = { top: 400, bottom: 1200 };
  const form = { id: "contact-form", getBoundingClientRect: () => bounds };
  vm.runInNewContext(source, {
    window: { innerHeight: 800, scrollY: 400, matchMedia: () => ({ matches: true }), requestAnimationFrame: fn => fn(), addEventListener: (name, fn) => { events[name] = fn; } },
    document: { querySelector: selector => selector === ".floating-contact" ? button : selector === ".mobile-menu" ? null : form },
  });
  assert.equal(button.hidden, true, "Do not cover a visible inquiry form");
  bounds = { top: 950, bottom: 1600 };
  events.scroll();
  assert.equal(button.hidden, false, "Offer the shortcut before the form comes into view");
  bounds = { top: -1000, bottom: -50 };
  events.scroll();
  assert.equal(button.hidden, false, "Restore the shortcut after scrolling past the form");
}
console.log("PASS: mobile contact shortcut stays out of the way of inquiry forms.");

for (const hash of ["", "#contact-form", "#buyer-form", "#community-map-heading"]) {
  const events = {};
  const positions = [];
  const history = { scrollRestoration: "auto" };
  vm.runInNewContext(source, {
    window: {
      history, location: { hash }, scrollY: 400,
      scrollTo: position => positions.push(position),
      matchMedia: () => ({ matches: true }),
      addEventListener: (name, fn) => { events[name] = fn; },
    },
    document: { querySelector: selector => selector === ".floating-contact" ? { hidden: true } : null },
  });
  assert.equal(history.scrollRestoration, "manual");
  events.pageshow();
  assert.equal(positions.length, hash ? 0 : 1, "Start normal navigation at the top without overriding form anchors");
  if (!hash) assert.equal(positions[0].top, 0);
}
console.log("PASS: page navigation starts at the top while explicit form and section links retain their destinations.");
