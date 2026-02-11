/* ================= HERO SLIDER ================= */


document.addEventListener('DOMContentLoaded', () => {

  const slides = document.querySelectorAll('.feature-slide');
  const dots = document.querySelectorAll('.dot');
  let heroIndex = 0;
  let heroTimer;

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    heroIndex = index;
  }

  // AUTO SLIDE (SLOW)
  function startHeroAuto() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      heroIndex = (heroIndex + 1) % slides.length;
      showSlide(heroIndex);
    }, 6000); // ⏱️ SLOW (6 seconds)
  }

  // DOT CLICK SUPPORT
  window.currentSlide = function (index) {
    showSlide(index);
    startHeroAuto();
  };

  // INIT
  showSlide(0);
  startHeroAuto();

});



/* ================= TRENDING SLIDER ================= */


document.addEventListener('DOMContentLoaded', () => {

  const trendingSlider = document.getElementById('trendingSlider');
  if (trendingSlider) {

    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dotsContainer = document.getElementById('sliderDots');
    const cards = trendingSlider.querySelectorAll('.trend-card');

    const TREND_GAP = 24;
    let index = 0;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
      if (window.innerWidth >= 1200) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 480) return 2;
      return 1;
    }

    function maxIndex() {
      return cards.length - cardsPerView;
    }

    function updateSlider() {
      const cardWidth = cards[0].offsetWidth + TREND_GAP;
      trendingSlider.style.transform = `translateX(-${index * cardWidth}px)`;
      updateDots();
    }

    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => {
          index = i;
          updateSlider();
          restartAutoplay();
        };
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      dotsContainer.querySelectorAll('.slider-dot')
        .forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function next() {
      index = index < maxIndex() ? index + 1 : 0;
      updateSlider();
    }

    function prev() {
      index = index > 0 ? index - 1 : maxIndex();
      updateSlider();
    }

    prevBtn?.addEventListener('click', () => { prev(); restartAutoplay(); });
    nextBtn?.addEventListener('click', () => { next(); restartAutoplay(); });

    let autoplay = setInterval(next, 4000);
    function restartAutoplay() {
      clearInterval(autoplay);
      autoplay = setInterval(next, 4000);
    }

    window.addEventListener('resize', () => {
      cardsPerView = getCardsPerView();
      if (index > maxIndex()) index = maxIndex();
      updateSlider();
    });

    createDots();
    updateSlider();
  }

});



document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('mdcTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.mdc-card');
  const videos = track.querySelectorAll('video');
  const GAP = 20;

  let index = 0;
  let timer;

  // Prepare videos
  videos.forEach(video => {
    video.muted = true;
    video.loop = true;
    video.preload = 'auto';
    video.load();
    video.pause();
  });

  function cardWidth() {
    return cards[0].getBoundingClientRect().width + GAP;
  }

  // 🔥 PLAY ONLY CENTER VIDEO
  function playCenterVideo() {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    videos.forEach(v => v.pause());
    videos[closestIndex]?.play().catch(() => {});
  }

  // AUTO SCROLL (SLOW)
  function autoScroll() {
    index = (index + 1) % cards.length;
    track.scrollTo({
      left: index * cardWidth(),
      behavior: 'smooth'
    });
    setTimeout(playCenterVideo, 600);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(autoScroll, 9000); // ⏱️ slow
  }

  // Scroll detection
  track.addEventListener('scroll', () => {
    clearTimeout(track._t);
    track._t = setTimeout(playCenterVideo, 200);
    startAuto();
  });

  // Arrows
  document.querySelector('.nav-arrow.next').onclick = () => {
    index = Math.min(index + 1, cards.length - 1);
    track.scrollTo({ left: index * cardWidth(), behavior: 'smooth' });
    startAuto();
  };

  document.querySelector('.nav-arrow.prev').onclick = () => {
    index = Math.max(index - 1, 0);
    track.scrollTo({ left: index * cardWidth(), behavior: 'smooth' });
    startAuto();
  };

  // Init
  setTimeout(() => {
    playCenterVideo();
    startAuto();
  }, 500);

});

/* ================= SCROLL PROGRESS (SMOOTH & FAST) ================= */

let latestScrollY = 0;
let ticking = false;

function updateScrollProgress() {
  const progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) return;

  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (latestScrollY / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";

  ticking = false;
}

window.addEventListener("scroll", () => {
  latestScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateScrollProgress);
    ticking = true;
  }
});


/* ================= CLICK TO SCROLL (NEW FEATURE) ================= */

const progressContainer = document.getElementById("scroll-progress-container");

if (progressContainer) {
  progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const clickPercent = clickX / width;

    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    window.scrollTo({
      top: docHeight * clickPercent,
      behavior: "smooth",
    });
  });
}


/* ================= IMAGE LIGHTBOX ================= */

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg) return;

  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.style.display = "none";
}


/* ================= CLOSE LIGHTBOX WITH ESC ================= */

const popup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');
const closeBtn = document.querySelector('.video-close');

// Open popup on card video click
document.querySelectorAll('.mdc-card video').forEach(video => {
  video.addEventListener('click', () => {

    popup.classList.add('active');

    popupVideo.src = video.src;
    popupVideo.currentTime = 0;
    popupVideo.play();
  });
});

// Close popup
function closePopup() {
  popup.classList.remove('active');
  popupVideo.pause();
  popupVideo.src = '';
}

// Close events
closeBtn.addEventListener('click', closePopup);

popup.addEventListener('click', e => {
  if (e.target === popup) closePopup();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
});

