(() => {
  const button = document.querySelector(".floating-contact");
  if (!button) return;
  const form = document.querySelector("#contact-form, #buyer-form, #seller-form, #valuation-form");
  if (form) button.href = "#" + form.id;
  let scheduled = false;
  const update = () => {
    const bounds = form?.getBoundingClientRect?.();
    const formVisible = bounds && bounds.top < window.innerHeight && bounds.bottom > 0;
    button.hidden = window.scrollY < 300 || !window.matchMedia("(max-width: 767px)").matches || Boolean(formVisible);
    scheduled = false;
  };
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener("pageshow", update);
  window.addEventListener("resize", update, { passive: true });
  const menu = document.querySelector(".mobile-menu");
  if (menu) {
    menu.addEventListener("click", event => {
      if (event.target.closest("a")) menu.open = false;
    });
    window.addEventListener("keydown", event => {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
  }
  update();
})();

// Source details travel with a submitted inquiry, not to a third-party tracker.
(() => {
  const forms = document.querySelectorAll?.('form[data-netlify="true"]');
  if (!forms?.length) return;
  const params = new URLSearchParams(window.location.search);
  let referrer = "";
  try {
    const host = new URL(document.referrer).hostname;
    if (host !== window.location.hostname) referrer = host;
  } catch { /* An empty or unavailable referrer is normal. */ }
  let origin = {
    landing_page: window.location.pathname,
    referrer_host: referrer,
    utm_source: (params.get("utm_source") || "").slice(0, 200),
    utm_medium: (params.get("utm_medium") || "").slice(0, 200),
    utm_campaign: (params.get("utm_campaign") || "").slice(0, 200),
  };
  try {
    const key = "susie-inquiry-origin";
    const saved = JSON.parse(window.sessionStorage.getItem(key) || "null");
    if (saved && typeof saved.landing_page === "string" && saved.landing_page.startsWith("/")) {
      for (const field of Object.keys(origin)) {
        if (typeof saved[field] === "string") origin[field] = saved[field].slice(0, 200);
      }
    }
    window.sessionStorage.setItem(key, JSON.stringify(origin));
  } catch {
    // Optional attribution must never stop a native form if storage is blocked.
  }
  for (const form of forms) {
    for (const [name,value] of Object.entries(origin)) {
      const field = form.elements.namedItem(name);
      if (field) field.value = value;
    }
  }
})();
