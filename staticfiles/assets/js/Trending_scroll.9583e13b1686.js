document.addEventListener("DOMContentLoaded", function () {

    const models = document.querySelectorAll(".reveal-model");

    function revealModels() {
        const windowHeight = window.innerHeight;

        models.forEach((model, index) => {
            const elementTop = model.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    model.classList.add("active");
                }, index * 150);  // smooth stagger from bottom
            }
        });
    }

    window.addEventListener("scroll", revealModels);

    // Run once on load
    revealModels();
});