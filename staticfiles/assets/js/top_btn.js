document.addEventListener("DOMContentLoaded", function () {

  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  // ===== SHOW / HIDE =====
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // ===== ULTRA SMOOTH SLOW SCROLL =====
  scrollBtn.addEventListener("click", function () {
    smoothScrollToTop(1200); // ⭐ CHANGE SPEED HERE
  });

  function smoothScrollToTop(duration) {
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 🔥 easeInOutCubic (super smooth)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

});