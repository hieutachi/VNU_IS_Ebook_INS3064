/* Shared, dependency-free behaviour for the INS3064 student portal. */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeKey = "ins3064.theme";
  /* Progressive enhancement flag: the deck only collapses to one slide with JS. */
  root.classList.add("js");

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

  /* Filter cards, and hide part sections that end up empty. */
  document.querySelectorAll("[data-filter]").forEach(function (input) {
    var selector = input.getAttribute("data-filter");
    var items = Array.prototype.slice.call(document.querySelectorAll(selector));
    var blocks = Array.prototype.slice.call(document.querySelectorAll("[data-part-block]"));
    var status = document.querySelector("[data-filter-status]");
    function filterItems() {
      var query = input.value.trim().toLocaleLowerCase("en");
      var shown = 0;
      items.forEach(function (item) {
        var match = !query || item.textContent.toLocaleLowerCase("en").indexOf(query) !== -1;
        item.hidden = !match;
        if (match) shown += 1;
      });
      blocks.forEach(function (block) {
        var visible = block.querySelectorAll(selector + ":not([hidden])").length;
        block.hidden = visible === 0;
      });
      if (status) status.textContent = shown + " session" + (shown === 1 ? "" : "s") + " shown";
    }
    input.addEventListener("input", filterItems);
    filterItems();
  });

  /* Highlight the table-of-contents entry for the section in view. */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    var targets = [];
    tocLinks.forEach(function (link) {
      var target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      byId[target.id] = link;
      targets.push(target);
    });
    var active = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = byId[entry.target.id];
        if (!link || link === active) return;
        if (active) active.removeAttribute("aria-current");
        link.setAttribute("aria-current", "true");
        active = link;
      });
    }, { rootMargin: "-88px 0px -70% 0px", threshold: 0 });
    targets.forEach(function (target) { observer.observe(target); });
  }
  /* Copy a code listing to the clipboard. */
  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-code-copy]");
    if (!button) return;
    var figure = button.closest(".code-block");
    var code = figure && figure.querySelector("pre code");
    if (!code || !navigator.clipboard) return;
    navigator.clipboard.writeText(code.textContent).then(function () {
      button.textContent = "Copied";
      button.classList.add("is-done");
      window.setTimeout(function () {
        button.textContent = "Copy";
        button.classList.remove("is-done");
      }, 1600);
    }).catch(function () { button.textContent = "Press Ctrl+C"; });
  });

  /* Slide deck: one slide at a time, plus a grid overview. */
  var deck = document.querySelector("[data-deck]");
  if (!deck) return;
  var slides = Array.prototype.slice.call(deck.querySelectorAll("[data-slide]"));
  if (!slides.length) return;
  var select = document.querySelector("[data-deck-select]");
  var counter = document.querySelector("[data-deck-counter]");
  var bar = document.querySelector("[data-deck-progress]");
  var previous = document.querySelector("[data-deck-prev]");
  var nextButton = document.querySelector("[data-deck-next]");
  var modeButton = document.querySelector("[data-deck-mode]");
  var jumps = Array.prototype.slice.call(document.querySelectorAll("[data-deck-jump]"));
  var active = 0;
  var overview = false;

  function showSlide(index, updateHash) {
    active = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach(function (slide, i) {
      var isActive = i === active;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive && !overview));
      if (isActive) slide.setAttribute("data-current", "true");
      else slide.removeAttribute("data-current");
    });
    jumps.forEach(function (button, i) {
      if (i === active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    if (select) select.value = String(active);
    if (counter) counter.textContent = (active + 1) + " / " + slides.length;
    if (bar) bar.style.width = ((active + 1) / slides.length * 100) + "%";
    if (previous) previous.disabled = active === 0;
    if (nextButton) nextButton.disabled = active === slides.length - 1;
    if (updateHash && history.replaceState) history.replaceState(null, "", "#slide-" + (active + 1));
    if (!overview) {
      slides[active].focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    var rail = jumps[active];
    if (rail && rail.scrollIntoView) rail.scrollIntoView({ block: "nearest" });
  }

  function setOverview(next) {
    overview = next;
    deck.classList.toggle("is-overview", overview);
    if (modeButton) {
      modeButton.setAttribute("aria-pressed", String(overview));
      modeButton.textContent = overview ? "Single slide" : "Overview";
    }
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", overview || i === active);
      slide.setAttribute("aria-hidden", String(!overview && i !== active));
    });
    if (!overview) showSlide(active, true);
  }

  if (previous) previous.addEventListener("click", function () { setOverview(false); showSlide(active - 1, true); });
  if (nextButton) nextButton.addEventListener("click", function () { setOverview(false); showSlide(active + 1, true); });
  if (select) select.addEventListener("change", function () { setOverview(false); showSlide(Number(select.value), true); });
  if (modeButton) modeButton.addEventListener("click", function () { setOverview(!overview); });
  jumps.forEach(function (button, index) {
    button.addEventListener("click", function () { setOverview(false); showSlide(index, true); });
  });
  slides.forEach(function (slide, index) {
    slide.addEventListener("click", function () { if (overview) { active = index; setOverview(false); } });
  });

  document.addEventListener("keydown", function (event) {
    if (/input|select|textarea/i.test(event.target.tagName)) return;
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (["ArrowRight", "PageDown", "j", "J"].indexOf(event.key) !== -1) { setOverview(false); showSlide(active + 1, true); }
    if (["ArrowLeft", "PageUp", "k", "K"].indexOf(event.key) !== -1) { setOverview(false); showSlide(active - 1, true); }
    if (event.key === "Home") { setOverview(false); showSlide(0, true); }
    if (event.key === "End") { setOverview(false); showSlide(slides.length - 1, true); }
    if (event.key === "o" || event.key === "O") setOverview(!overview);
    if (event.key === "Escape" && overview) setOverview(false);
  });

  var hash = window.location.hash.match(/^#slide-(\d+)$/);
  showSlide(hash ? Number(hash[1]) - 1 : 0, false);
})();
