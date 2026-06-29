document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".be-inspired");
    const reveals = section.querySelectorAll(".reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // When section enters → activate all inner animations
                reveals.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("active");
                    }, index * 200); // small stagger
                });

            }
        });
    }, {
        threshold: 0.4   // section must be 40% visible
    });

    observer.observe(section);

});





document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(".discover-section");

    sections.forEach(section => {

        const reveals = section.querySelectorAll(".reveal-left, .reveal-right");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    reveals.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add("active");
                        }, index * 200);
                    });

                }
            });
        }, {
            threshold: 0.4
        });

        observer.observe(section);
    });

});


document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".brand-section");
    const reveals = section.querySelectorAll(".reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                reveals.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("active");
                    }, index * 200);
                });

            }

        });
    }, {
        threshold: 0.4
    });

    observer.observe(section);

});