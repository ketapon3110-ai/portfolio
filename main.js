(function () {
  function openModal(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // 開いたら先頭スライドへ
    var deck = el.querySelector("[data-deck]");
    if (deck) deck.scrollTo({ top: 0, behavior: "auto" });
  }

  function closeModal() {
    var open = document.querySelector('.modal[aria-hidden="false"]');
    if (!open) return;
    open.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function getOpenDeck() {
    var open = document.querySelector('.modal[aria-hidden="false"]');
    if (!open) return null;
    return open.querySelector("[data-deck]");
  }

  function scrollDeckBy(dir) {
    var deck = getOpenDeck();
    if (!deck) return;
  
    var slides = Array.prototype.slice.call(deck.querySelectorAll(".deckSlide"));
    if (!slides.length) return;
  
    // deck内スクロール位置
    var st = deck.scrollTop;
  
    // 「deck内でのoffsetTop」を使う（親がdeckなのでOK）
    // 現在位置に最も近いスライドを探す
    var currentIndex = 0;
    var bestDist = Infinity;
  
    for (var i = 0; i < slides.length; i++) {
      var y = slides[i].offsetTop; // deck内
      var dist = Math.abs(y - st);
      if (dist < bestDist) {
        bestDist = dist;
        currentIndex = i;
      }
    }
  
    var nextIndex = currentIndex + dir;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > slides.length - 1) nextIndex = slides.length - 1;
  
    deck.scrollTo({ top: slides[nextIndex].offsetTop, behavior: "smooth" });
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

    var prev = t && t.closest ? t.closest("[data-deck-prev]") : null;
    if (prev) {
      scrollDeckBy(-1);
      return;
    }

    var next = t && t.closest ? t.closest("[data-deck-next]") : null;
    if (next) {
      scrollDeckBy(1);
      return;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowDown") scrollDeckBy(1);
    if (e.key === "ArrowUp") scrollDeckBy(-1);
  });
})();
