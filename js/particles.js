/* ===== Interactive Dot Grid — Cursor-Reactive Mesh ===== */
(function() {
  function init() {
    const canvas = document.getElementById('dot-grid');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h, cols, rows, dots = [];
    const SPACING = 28;
    const BASE_RADIUS = 1.5;
    const MAX_RADIUS = 4;
    const INFLUENCE = 180;
    const BASE_ALPHA = 0.25;
    const MAX_ALPHA = 0.85;
    const DOT_COLOR = { r: 129, g: 140, b: 248 }; // indigo-400 (brighter)

    let mouse = { x: -1000, y: -1000 };
    let animMouse = { x: -1000, y: -1000 };

    function resize() {
      const parent = canvas.parentElement;
      w = canvas.width = parent.offsetWidth;
      h = canvas.height = parent.offsetHeight;
      cols = Math.ceil(w / SPACING) + 1;
      rows = Math.ceil(h / SPACING) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * SPACING, y: r * SPACING, baseX: c * SPACING, baseY: r * SPACING });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse interpolation
      animMouse.x += (mouse.x - animMouse.x) * 0.15;
      animMouse.y += (mouse.y - animMouse.y) * 0.15;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = animMouse.x - dot.baseX;
        const dy = animMouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE) {
          const factor = 1 - dist / INFLUENCE;
          const eased = factor * factor;

          // Magnetic pull toward cursor
          dot.x = dot.baseX + dx * eased * 0.12;
          dot.y = dot.baseY + dy * eased * 0.12;

          const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * eased;
          const alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * eased;

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT_COLOR.r}, ${DOT_COLOR.g}, ${DOT_COLOR.b}, ${alpha})`;
          ctx.fill();

          // Connection lines between nearby influenced dots
          if (eased > 0.2) {
            for (let j = i + 1; j < dots.length; j++) {
              const other = dots[j];
              const odx = animMouse.x - other.baseX;
              const ody = animMouse.y - other.baseY;
              const odist = Math.sqrt(odx * odx + ody * ody);
              if (odist < INFLUENCE) {
                const ldx = dot.x - other.x;
                const ldy = dot.y - other.y;
                const lineDist = Math.sqrt(ldx * ldx + ldy * ldy);
                if (lineDist < SPACING * 1.8) {
                  const lineAlpha = (1 - lineDist / (SPACING * 1.8)) * eased * 0.25;
                  ctx.beginPath();
                  ctx.moveTo(dot.x, dot.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.strokeStyle = `rgba(${DOT_COLOR.r}, ${DOT_COLOR.g}, ${DOT_COLOR.b}, ${lineAlpha})`;
                  ctx.lineWidth = 0.6;
                  ctx.stroke();
                }
              }
            }
          }
        } else {
          dot.x = dot.baseX;
          dot.y = dot.baseY;
          ctx.beginPath();
          ctx.arc(dot.baseX, dot.baseY, BASE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT_COLOR.r}, ${DOT_COLOR.g}, ${DOT_COLOR.b}, ${BASE_ALPHA})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }

    // Use document-level mousemove for better tracking across the hero
    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.bottom + 100) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }
    });

    // Touch support
    document.addEventListener('touchmove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });

    document.addEventListener('touchend', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  // Wait for DOM and layout to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 50));
  } else {
    setTimeout(init, 50);
  }
})();
