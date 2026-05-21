/* ===== Interactive Dot Grid — Cursor-Reactive Mesh ===== */
(function() {
  const canvas = document.getElementById('dot-grid');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, cols, rows, dots = [];
  const SPACING = 32;
  const BASE_RADIUS = 1;
  const MAX_RADIUS = 3;
  const INFLUENCE = 160;
  const BASE_ALPHA = 0.12;
  const MAX_ALPHA = 0.6;
  const DOT_COLOR = { r: 99, g: 102, b: 241 }; // indigo-500

  let mouse = { x: -1000, y: -1000 };
  let animMouse = { x: -1000, y: -1000 };

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
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
    animMouse.x += (mouse.x - animMouse.x) * 0.12;
    animMouse.y += (mouse.y - animMouse.y) * 0.12;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const dx = animMouse.x - dot.baseX;
      const dy = animMouse.y - dot.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < INFLUENCE) {
        const factor = 1 - dist / INFLUENCE;
        const eased = factor * factor; // quadratic easing

        // Attract dots slightly toward cursor
        dot.x = dot.baseX + dx * eased * 0.08;
        dot.y = dot.baseY + dy * eased * 0.08;

        const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * eased;
        const alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * eased;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR.r}, ${DOT_COLOR.g}, ${DOT_COLOR.b}, ${alpha})`;
        ctx.fill();

        // Draw connection lines to nearby influenced dots
        if (eased > 0.3) {
          for (let j = i + 1; j < dots.length; j++) {
            const other = dots[j];
            const odx = animMouse.x - other.baseX;
            const ody = animMouse.y - other.baseY;
            const odist = Math.sqrt(odx * odx + ody * ody);
            if (odist < INFLUENCE) {
              const ldx = dot.x - other.x;
              const ldy = dot.y - other.y;
              const lineDist = Math.sqrt(ldx * ldx + ldy * ldy);
              if (lineDist < SPACING * 1.6) {
                const lineAlpha = (1 - lineDist / (SPACING * 1.6)) * eased * 0.2;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(${DOT_COLOR.r}, ${DOT_COLOR.g}, ${DOT_COLOR.b}, ${lineAlpha})`;
                ctx.lineWidth = 0.5;
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

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Touch support
  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
