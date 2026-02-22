document.addEventListener("DOMContentLoaded", function () {

    const ropes = document.querySelectorAll(".rope");
    if (!ropes.length) return;

    const baseY = 200;
    const maxDown = 180;

    let scrollTimeout;

    // store original path for each rope
    ropes.forEach(rope => {
        const original =
            `M 20 ${baseY} C 400 ${baseY} 1100 ${baseY} 1480 ${baseY}`;
        rope.dataset.original = original;
        rope.setAttribute("d", original);
    });

    window.addEventListener("scroll", function () {

        clearTimeout(scrollTimeout);

        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

        const offsetY = maxDown * scrollPercent;
        const oscillation = Math.sin(scrollTop / 30) * 25;
        const totalOffset = offsetY + oscillation;

        // 🔥 ALL ROPES MOVE TOGETHER
        ropes.forEach(rope => {

            const newPath =
                `M 20 ${baseY}
                 C 400 ${baseY + totalOffset}
                   1100 ${baseY + totalOffset}
                   1480 ${baseY}`;

            gsap.to(rope, {
                attr: { d: newPath },
                duration: 0.45,
                ease: "power2.out"
            });

        });

        // return when scroll stops
        scrollTimeout = setTimeout(() => {

            ropes.forEach(rope => {

                gsap.to(rope, {
                    attr: { d: rope.dataset.original },
                    duration: 1.1,
                    ease: "elastic.out(1.2, 0.4)"
                });

            });

        }, 180);

    });

});