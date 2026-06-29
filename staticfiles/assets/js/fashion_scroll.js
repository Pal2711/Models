// ===== CINEMATIC SMOOTH SCROLL REVEAL =====

document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(".fashion-card, .fashion-news-header");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 180); // smoother stagger
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        observer.observe(el);
    });

});