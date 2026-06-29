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
  let exitStarted = false;

  /* ===== NATURAL SPEED FUNCTION ===== */
  function getNaturalSpeed(p) {
    if (p < 20) return random(1.2, 2.2);
    if (p < 70) return random(0.4, 1.4);
    if (p < 90) return random(0.2, 0.6);
    return random(0.05, 0.15);
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* ===== PROGRESS ENGINE ===== */
  function animate() {
    if (isPaused) {
      requestAnimationFrame(animate);
      return;
    }

    progress += getNaturalSpeed(progress);
    progress = Math.min(progress, 100);

    progressFill.style.width = progress + "%";
    logoText.style.backgroundSize = progress + "% 100%";

    /* ===== SMART MICRO PAUSES ===== */
    if (progress > 15 && progress < 92 && Math.random() < 0.035) {
      isPaused = true;
      setTimeout(() => (isPaused = false), random(120, 420));
    }

    /* ===== COMPLETE ===== */
    if (progress >= 100) {
      progress = 100;
      progressFill.style.width = "100%";
      logoText.style.backgroundSize = "100% 100%";

      // human-like wait before exit
      setTimeout(startExit, 550);
      return;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  /* ===== PERFECT BUTTERY EXIT ===== */
  function startExit() {
    if (exitStarted) return;
    exitStarted = true;

    /* ===== GPU PREP ===== */
    loaderBox.style.willChange = "transform, opacity, filter";
    loader.style.willChange = "opacity";

    /* ===== PHASE 1 — SOFT DISSOLVE ===== */
    setTimeout(() => {
      loaderBox.style.transition =
        "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), " +
        "opacity 1.2s ease-out, " +
        "filter 1.2s ease-out";

      // very subtle (premium feel)
      loaderBox.style.transform = "translateY(-6px) scale(0.96)";
      loaderBox.style.opacity = "0";
      loaderBox.style.filter = "blur(6px)";
    }, 60);

    /* ===== PHASE 2 — BACKDROP MELT ===== */
    setTimeout(() => {
      loader.style.transition = "opacity 0.9s ease-out";
      loader.style.opacity = "0";
    }, 420);

    /* ===== PHASE 3 — CLEAN REMOVE ===== */
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");

      loaderBox.style.willChange = "auto";
      loader.style.willChange = "auto";
    }, 1350);
  }
});