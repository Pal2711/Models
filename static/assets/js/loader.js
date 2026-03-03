window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderBox = document.getElementById("loaderBox");
  const progressFill = document.querySelector(".progress-fill");
  const progressTrack = document.querySelector(".progress");
  const logoText = document.querySelector(".logo-text");

  if (!loader || !loaderBox || !progressFill || !logoText || !progressTrack) return;

  /* ===== MATCH BAR WIDTH ===== */
  requestAnimationFrame(() => {
    const textWidth = logoText.getBoundingClientRect().width;
    progressTrack.style.width = textWidth + "px";
  });

  let progress = 0;
  let isPaused = false;

  /* ===== PROGRESS ENGINE ===== */
  const interval = setInterval(() => {
    if (isPaused) return;

    progress += 1;

    progressFill.style.width = progress + "%";
    logoText.style.backgroundSize = progress + "% 100%";

    // premium micro pause
    if (progress > 25 && progress < 92 && Math.random() < 0.10) {
      isPaused = true;
      setTimeout(() => (isPaused = false), 110);
    }

    /* ✅ WHEN COMPLETE → AUTO HIDE */
    if (progress >= 100) {
      clearInterval(interval);
      startExit(); // 🔥 immediate auto hide
    }
  }, 32);

  /* ===== SMOOTH EXIT ===== */
  function startExit() {
    loaderBox.style.transformOrigin = "center";
    loaderBox.style.transition =
      "transform 1.5s cubic-bezier(.16,1,.3,1), opacity 1.5s ease";

    loaderBox.style.transform = "scale(0.4)";
    loaderBox.style.opacity = "0";

    // background fade
    loader.style.transition = "opacity 1.2s ease";
    loader.style.opacity = "0";

    // remove completely (best)
    setTimeout(() => {
      loader.style.display = "none";
    }, 1300);
  }
});