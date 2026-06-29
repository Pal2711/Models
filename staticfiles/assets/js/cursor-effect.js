/* ================= CUSTOM CURSOR EFFECT - COMPLETE CODE ================= */

/* 
 * This file contains all the code needed for the custom cursor ball effect.
 * 
 * USAGE:
 * 1. Include this JS file in your HTML: <script src="js/cursor-effect.js"></script>
 * 2. Include the CSS from this file in your stylesheet (see CSS section below)
 * 
 * FEATURES:
 * - Smooth trailing ball cursor that follows the mouse
 * - Click animation (shrinks on click)
 * - Hover effect on interactive elements (links, buttons)
 * - Works alongside the default system cursor
 */

// ================= JAVASCRIPT CODE =================

document.addEventListener('DOMContentLoaded', () => {
  // Keep the default cursor visible (works alongside custom ball)
  document.body.style.cursor = 'auto';

  // Create custom cursor element
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor-ball';
  document.body.appendChild(cursor);

  // Smooth follow (trailing) effect
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  function animateCursor() {
    // Lerp (linear interpolation) towards mouse for smooth trailing
    const speed = 0.2; // lower = more lag/trail (0.1-0.3 recommended)
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Click effect - cursor shrinks when clicking
  document.addEventListener('mousedown', () => {
    cursor.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('is-clicking');
  });

  // Emphasize on interactive elements (links, buttons, etc.)
  const interactiveSelector = 'a, button, .model-book-btn, .slider-btn, .nav-arrow, .open-img';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('is-link-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('is-link-hover');
    }
  });
});


/* ================= CSS CODE (Add this to your stylesheet) =================

Copy the CSS below into your styles.css file:

.custom-cursor-ball {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(47, 41, 41, 0.8);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  border: 1px solid rgba(0, 0, 0, 0.4);
  pointer-events: none;
  transform: translate(-50%, -50%) scale(1);
  transition:
    transform 0.15s ease-out,
    background 0.15s ease-out,
    border-color 0.15s ease-out,
    box-shadow 0.15s ease-out;
  z-index: 99999;
}

.custom-cursor-ball.is-clicking {
  transform: translate(-50%, -50%) scale(0.7);
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.9);
}

.custom-cursor-ball.is-link-hover {
  transform: translate(-50%, -50%) scale(1.4);
  background: rgba(0, 0, 0, 0.18);
  border-color: #000;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.9);
}

*/

