document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") return;

    const ropes = document.querySelectorAll("svg path.rope");

    ropes.forEach((rope) => {

        const svg = rope.closest("svg");
        if (!svg) return;

        const vb = svg.viewBox?.baseVal;
        const width = vb?.width || 1500;
        const height = vb?.height || 400;

        const startX = 0;
        const endX = width;
        const baseY = height / 2;

        let scrollTimeout;
        let isHovering = false;

        // ✅ original path (cubic)
        const originalPath =
            `M ${startX} ${baseY}
             C ${width * 0.25} ${baseY}
               ${width * 0.75} ${baseY}
               ${endX} ${baseY}`;

        rope.setAttribute("d", originalPath);

        /* =========================
           🔹 POINTER EFFECT
        ========================= */

        svg.addEventListener("pointermove", function (event) {

            isHovering = true;

            const rect = svg.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            const x = ((event.clientX - rect.left) / rect.width) * width;
            const y = ((event.clientY - rect.top) / rect.height) * height;

            const newPath =
                `M ${startX} ${baseY}
                 C ${x} ${y}
                   ${x} ${y}
                   ${endX} ${baseY}`;

            gsap.to(rope, {
                attr: { d: newPath },
                duration: 0.3,
                ease: "power3.out",
                overwrite: true
            });

        });

        svg.addEventListener("pointerleave", function () {

            isHovering = false;

            gsap.to(rope, {
                attr: { d: originalPath },
                duration: 1.5,
                ease: "elastic.out(1, 0.3)"
            });

        });

        /* =========================
           🔹 SCROLL EFFECT
        ========================= */

        window.addEventListener("scroll", function () {

            if (isHovering) return;

            clearTimeout(scrollTimeout);

            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

            const maxDown = 180;
            const offsetY = maxDown * scrollPercent;
            const oscillation = Math.sin(scrollTop / 30) * 25;
            const totalOffset = offsetY + oscillation;

            const newPath =
                `M ${startX} ${baseY}
                 C ${width * 0.25} ${baseY + totalOffset}
                   ${width * 0.75} ${baseY + totalOffset}
                   ${endX} ${baseY}`;

            gsap.to(rope, {
                attr: { d: newPath },
                duration: 0.45,
                ease: "power2.out"
            });

            scrollTimeout = setTimeout(() => {
                gsap.to(rope, {
                    attr: { d: originalPath },
                    duration: 1.1,
                    ease: "elastic.out(1.2, 0.4)"
                });
            }, 180);

        });

    });

});