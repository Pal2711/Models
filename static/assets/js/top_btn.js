document.addEventListener("DOMContentLoaded", function () {

    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    // Custom slow scroll
    scrollBtn.addEventListener("click", function () {

        let scrollStep = -window.scrollY / 60; // smaller number = slower
        let scrollInterval = setInterval(function () {

            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }

        }, 15);

    });

});