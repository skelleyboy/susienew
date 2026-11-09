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

{
  const events = {};
  const classes = new Set();
  const timers = new Map();
  let nextTimer = 0;
  let reducedMotion = false;
  const headerProperties = new Map();
  const header = {
    offsetHeight: 96,
    style: { setProperty: (name, value) => headerProperties.set(name, value) },
    classList: { toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name) },
  };
  const spacer = { hidden: true, style: {} };
  const window = {
    scrollY: 0,
    matchMedia: query => ({ matches: query.includes("prefers-reduced-motion") && reducedMotion }),
    requestAnimationFrame: fn => fn(),
    addEventListener: (name, fn) => { events[name] = fn; },
    setTimeout: (fn, delay) => {
      assert.equal(delay, 160);
      timers.set(++nextTimer, fn);
      return nextTimer;
    },
    clearTimeout: id => timers.delete(id),
  };
  vm.runInNewContext(source, {
    window,
    document: { querySelector: selector => ({
      ".floating-contact": { hidden: true },
      ".site-header": header,
      ".header-spacer": spacer,
    })[selector] || null },
  });
  assert(!classes.has("is-scrolled"), "Header should scroll normally at the top");
  assert(spacer.hidden);
  window.scrollY = 240;
  events.scroll();
  assert(!classes.has("is-scrolled"), "Do not pin the header before the threshold");
  window.scrollY = 241;
  events.scroll();
  assert(classes.has("is-scrolled"), "Pin the dark header after scrolling");
  assert.equal(Number(headerProperties.get("--header-shrink")), 1/160, "Start shrinking progressively at the pin threshold");
  window.scrollY = 320;
  events.scroll();
  assert.equal(Number(headerProperties.get("--header-shrink")), .5, "Halfway through the scroll range should be halfway shrunk");
  window.scrollY = 400;
  events.scroll();
  assert.equal(Number(headerProperties.get("--header-shrink")), 1, "Reach the 60px height at the end of the shrink range");
  window.scrollY = 1200;
  events.scroll();
  assert.equal(Number(headerProperties.get("--header-shrink")), 1, "Do not shrink smaller than 60px");
  assert.equal(spacer.hidden, false);
  assert.equal(spacer.style.height, undefined, "Let the responsive spacer retain the full original height");
  header.offsetHeight = 60;
  events.resize();
  assert.equal(spacer.style.height, undefined, "Do not shrink the spacer to the compact header height");
  window.scrollY = 100;
  events.scroll();
  assert(classes.has("is-leaving"), "Fade out before restoring the normal header");
  assert(classes.has("is-scrolled"), "Keep header fixed throughout the exit animation");
  assert(!spacer.hidden, "Keep layout space until the fade completes");
  assert.equal(timers.size, 1);
  window.scrollY = 260;
  events.scroll();
  assert(!classes.has("is-leaving"), "Cancel fade-out when the visitor scrolls down again");
  assert(classes.has("is-scrolled"));
  assert.equal(timers.size, 0, "Cancel stale exit timers");
  window.scrollY = 0;
  events.scroll();
  assert(classes.has("is-leaving"));
  const finishExit = [...timers.values()][0];
  timers.clear();
  finishExit();
  assert(!classes.has("is-scrolled"), "Restore the original header when returning to the top");
  assert(spacer.hidden);
  window.scrollY = 260;
  events.scroll();
  reducedMotion = true;
  window.scrollY = 0;
  events.scroll();
  assert(!classes.has("is-scrolled"), "Skip exit animation when reduced motion is requested");
  assert(spacer.hidden);
  assert.equal(timers.size, 0);
}
console.log("PASS: delayed fixed header, layout spacer, fade-out completion, rapid scroll reversal, and reduced-motion reset.");

{
  const css = await readFile("site/layout.css", "utf8");
  assert(css.includes("(var(--expanded-header-height) - 60px) * var(--header-shrink,1)"), "Header height must interpolate with scroll to 60px");
  const reveal = css.match(/@keyframes header-reveal\s*\{[\s\S]*?\n\}/)?.[0] || "";
  assert(!reveal.includes("height:"), "Do not replace scroll-driven resizing with timed height animation");
  const scrolledLogo = css.match(/\.site-header\.is-scrolled \.header-inner > \.brand \.brand-lockup\s*\{[^}]*\}/)?.[0] || "";
  assert(scrolledLogo.includes("invert(1)") && !/width:|height:|scale\(/.test(scrolledLogo), "Keep the logo the same size while inverting its color");
  assert(css.includes(".header-spacer { height: var(--expanded-header-height); }"), "Spacer must retain the expanded height");
  assert(css.includes("--expanded-header-height: 89px") && css.includes("--expanded-header-height: 97px"), "Use separate mobile and desktop expanded heights");
  assert(css.includes("header-dismiss 160ms"), "Exit should have quick easing");
  assert(css.includes("prefers-reduced-motion"), "Respect reduced-motion preferences");
  assert(css.includes(".menu-topbar { position: fixed;"), "Keep the mobile menu logo visible when scrolling the menu");
  const { header } = await import("../site/pages.mjs");
  assert(/<nav aria-label="Site and social links"><div class="menu-topbar"><a class="menu-brand"[^>]*><img src="\/assets\/brand-lockup\.svg"/.test(header("/")), "Include Susie's black logo inside the open menu");
}
console.log("PASS: scroll-driven 60px compact header, responsive layout reservation, entrance/exit easing, and reduced-motion CSS.");
