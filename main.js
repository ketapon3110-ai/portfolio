(function () {
  function openModal(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    var open = document.querySelector('.modal[aria-hidden="false"]');
    if (!open) return;
    open.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var t = e.target;

    var openBtn = t && t.closest ? t.closest("[data-open-modal]") : null;
    if (openBtn) {
      var id = openBtn.getAttribute("data-open-modal");
      openModal(id);
      return;
    }

    var closeBtn = t && t.closest ? t.closest("[data-close-modal]") : null;
    if (closeBtn) {
      closeModal();
      return;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();
