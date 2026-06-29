document.addEventListener("DOMContentLoaded", () => {
  console.log("Main JS Loaded ✅");

  /* ================= MODEL IMAGE SLIDER ================= */

  const slider = document.querySelector(".model-slider");

  if (slider) {
    const slides = slider.querySelectorAll(".model-slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    showSlide(currentIndex);

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  }

  /* ================= SCROLL PROGRESS BAR ================= */

  const progressBar = document.getElementById("scroll-progress-bar");
  const progressContainer = document.getElementById("scroll-progress-container");

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percent = (scrollTop / docHeight) * 100;
    progressBar.style.width = percent + "%";
  }

  window.addEventListener("scroll", updateProgress);

  /* ================= CLICK TO SCROLL ================= */

  if (progressContainer) {
    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      window.scrollTo({
        top: docHeight * percent,
        behavior: "smooth"
      });
    });
  }

  /* ================= SMOOTH SLOW SCROLL ================= */

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let isScrolling = false;

  const scrollSpeed = 0.08; // 🔥 adjust (0.05 = slow, 0.1 = fast)

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      targetScroll += e.deltaY;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isScrolling) smoothScroll();
    },
    { passive: false }
  );

  function smoothScroll() {
    isScrolling = true;

    currentScroll += (targetScroll - currentScroll) * scrollSpeed;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.5) {
      requestAnimationFrame(smoothScroll);
    } else {
      isScrolling = false;
    }
  }
});
