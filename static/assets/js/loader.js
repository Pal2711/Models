window.addEventListener("load", () => {

  const loader = document.getElementById("loader");
  const loaderBox = document.getElementById("loaderBox");
  const navLogo = document.getElementById("navLogo");
  const progressFill = document.querySelector(".progress-fill");
  const progressTrack = document.querySelector(".progress");
  const logoText = document.querySelector(".logo-text");

  if (!loader || !loaderBox || !progressFill || !logoText || !progressTrack) return;

  /* ===============================
     ✅ MATCH BAR WIDTH TO TEXT
  =============================== */

  requestAnimationFrame(() => {
    const textWidth = logoText.getBoundingClientRect().width;
    progressTrack.style.width = textWidth + "px";
  });

  let progress = 0;
  let isPaused = false;

  /* ===============================
     🔥 PERFECT SYNC LOOP + MICRO PAUSE
  =============================== */

  const interval = setInterval(() => {

    // 🧊 if paused, skip this tick
    if (isPaused) return;

    progress += 1;

    // bar fill
    progressFill.style.width = progress + "%";

    // text reveal EXACT sync
    logoText.style.backgroundSize = progress + "% 100%";

    /* 🔥 RANDOM MICRO STOP (premium feel) */
    if (progress > 20 && progress < 95 && Math.random() < 0.12) {
      isPaused = true;

      setTimeout(() => {
        isPaused = false;
      }, 120); // ⭐ pause duration (change 80–200)
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(startExit, 700);
    }

  }, 35);


  /* ===============================
     🚀 PREMIUM EXIT
  =============================== */

  function startExit() {

    let moveX = -60;
    let moveY = 10;

    if (navLogo) {
      const logoRect = navLogo.getBoundingClientRect();
      const boxRect = loaderBox.getBoundingClientRect();

      moveX = (logoRect.left - boxRect.left) - 83;
      moveY = (logoRect.top - boxRect.top) - 12;
    }

    // smooth text shrink
    logoText.style.fontSize = "100px";

    // ultra smooth fly
    loaderBox.style.transform =
      `translate(${moveX}px, ${moveY}px) scale(0.25)`;

    loaderBox.style.opacity = "0.35";

    // slow luxury fade
    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 2200);
    }, 1800);
  }

});