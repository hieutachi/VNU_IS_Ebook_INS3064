/* Shared, dependency-free behaviour for the INS3064 student portal. */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeKey = "ins3064.theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var next = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", "Switch to " + next + " theme");
      var label = button.querySelector("[data-theme-label]");
      if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  document.addEventListener("click", function (event) {
    var themeButton = event.target.closest && event.target.closest("[data-theme-toggle]");
    if (themeButton) {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(themeKey, next); } catch (_error) { /* storage may be blocked */ }
    }
  });

  var section = window.location.pathname.match(/\/(sessions|ebook|slides|guides)\//);
  if (section) {
    var current = document.querySelector('[data-nav="' + section[1] + '"]');
    if (current) current.setAttribute("aria-current", "page");
  }

  var progress = document.querySelector("[data-reading-progress]");
  function updateProgress() {
    if (!progress) return;
    var distance = root.scrollHeight - root.clientHeight;
    var percent = distance > 0 ? Math.max(0, Math.min(100, root.scrollTop / distance * 100)) : 0;
    progress.style.width = percent + "%";
  }
  if (progress) {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  document.querySelectorAll("[data-filter]").forEach(function (input) {
    var selector = input.getAttribute("data-filter");
    var items = Array.prototype.slice.call(document.querySelectorAll(selector));
    var status = document.querySelector("[data-filter-status]");
    function filterItems() {
      var query = input.value.trim().toLocaleLowerCase("en");
      var shown = 0;
      items.forEach(function (item) {
        var match = !query || item.textContent.toLocaleLowerCase("en").indexOf(query) !== -1;
        item.hidden = !match;
        if (match) shown += 1;
      });
      if (status) status.textContent = shown + " session" + (shown === 1 ? "" : "s") + " shown";
    }
    input.addEventListener("input", filterItems);
    filterItems();
  });

  var deck = document.querySelector("[data-deck]");
  if (!deck) return;
  var slides = Array.prototype.slice.call(deck.querySelectorAll("[data-slide]"));
  var select = document.querySelector("[data-deck-select]");
  var counter = document.querySelector("[data-deck-counter]");
  var previous = document.querySelector("[data-deck-prev]");
  var nextButton = document.querySelector("[data-deck-next]");
  var active = 0;

  function showSlide(index, updateHash) {
    active = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === active);
      slide.setAttribute("aria-hidden", String(i !== active));
    });
    if (select) select.value = String(active);
    if (counter) counter.textContent = (active + 1) + " / " + slides.length;
    if (previous) previous.disabled = active === 0;
    if (nextButton) nextButton.disabled = active === slides.length - 1;
    if (updateHash && history.replaceState) history.replaceState(null, "", "#slide-" + (active + 1));
    slides[active].focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (previous) previous.addEventListener("click", function () { showSlide(active - 1, true); });
  if (nextButton) nextButton.addEventListener("click", function () { showSlide(active + 1, true); });
  if (select) select.addEventListener("change", function () { showSlide(Number(select.value), true); });
  document.addEventListener("keydown", function (event) {
    if (/input|select|textarea/i.test(event.target.tagName)) return;
    if (["ArrowRight", "PageDown", "j", "J"].indexOf(event.key) !== -1) showSlide(active + 1, true);
    if (["ArrowLeft", "PageUp", "k", "K"].indexOf(event.key) !== -1) showSlide(active - 1, true);
    if (event.key === "Home") showSlide(0, true);
    if (event.key === "End") showSlide(slides.length - 1, true);
  });

  var hash = window.location.hash.match(/^#slide-(\d+)$/);
  showSlide(hash ? Number(hash[1]) - 1 : 0, false);
})();
