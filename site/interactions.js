(() => {
  const button = document.querySelector(".floating-contact");
  if (!button) return;
  const form = document.querySelector("#contact-form, #buyer-form, #seller-form, #valuation-form");
  if (form) button.href = "#" + form.id;
  let scheduled = false;
  const update = () => {
    button.hidden = window.scrollY < 300 || !window.matchMedia("(max-width: 767px)").matches;
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
