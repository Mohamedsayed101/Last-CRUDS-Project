// sidebar.js
(function () {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  const closeBtn = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main");

  if (!sidebar || !toggle) return;

  const mq = window.matchMedia("(max-width: 767px)");

  function openSidebarSmall() {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    toggle.setAttribute("aria-expanded", "true");
    sidebar.setAttribute("aria-hidden", "false");
  }

  function closeSidebarSmall() {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    toggle.setAttribute("aria-expanded", "false");
    sidebar.setAttribute("aria-hidden", "true");
  }

  // initial state: on small screens collapsed
  function setInitial() {
    if (mq.matches) {
      // small
      sidebar.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
      sidebar.setAttribute("aria-hidden", "true");
    } else {
      // large screens: show sidebar by default
      sidebar.classList.remove("-translate-x-full");
      sidebar.classList.add("translate-x-0");
      overlay.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "true");
      sidebar.setAttribute("aria-hidden", "false");
    }
  }
  setInitial();
  mq.addEventListener?.("change", setInitial);

  toggle.addEventListener("click", function () {
    if (mq.matches) {
      // small: open as overlay
      if (overlay.classList.contains("hidden")) openSidebarSmall();
      else closeSidebarSmall();
    } else {
      // large: toggle translate to collapse
      if (sidebar.classList.contains("-translate-x-full")) {
        sidebar.classList.remove("-translate-x-full");
        sidebar.classList.add("translate-x-0");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        sidebar.classList.add("-translate-x-full");
        sidebar.classList.remove("translate-x-0");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeSidebarSmall);
  overlay.addEventListener("click", closeSidebarSmall);
})();
