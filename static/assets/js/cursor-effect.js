document.addEventListener("DOMContentLoaded", function () {

  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor-ball");
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;

    cursor.style.left = currentX - 11 + "px";
    cursor.style.top = currentY - 11 + "px";

    requestAnimationFrame(animate);
  }

  animate();

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("is-clicking");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("is-clicking");
  });

  // Hover effect
  const interactive = "a, button, input, textarea, select";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactive)) {
      cursor.classList.add("is-link-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactive)) {
      cursor.classList.remove("is-link-hover");
    }
  });

});
