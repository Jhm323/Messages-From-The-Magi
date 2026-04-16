/**
 * Cosmic background animation — starfield, meteors, comets, and constellations.
 * Uses a single fixed <canvas> behind all page content.
 * Respects prefers-reduced-motion.
 */

// Constellation shape templates [x, y] relative coords
const SHAPES = [
  // Big Dipper
  [[0,0],[28,8],[58,4],[88,12],[116,4],[144,18],[136,52]],
  // Orion-like
  [[0,20],[30,0],[60,20],[45,60],[60,100],[0,100],[15,60]],
  // Southern Cross
  [[20,0],[20,60],[0,30],[40,30],[20,15]],
  // Simple arc
  [[0,30],[25,8],[55,0],[85,8],[110,30]],
  // Diamond
  [[30,0],[60,30],[30,60],[0,30],[30,0]],
  // Scorpion tail
  [[0,0],[20,15],[40,10],[55,25],[50,45],[40,60],[50,75]],
];

export function initCosmos() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Lift page content above canvas
  const lift = document.createElement('style');
  lift.textContent = 'main,footer,#site-footer-mount{position:relative;z-index:1;}';
  document.head.appendChild(lift);

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '0',
  });
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let stars = [], constellations = [];
  const meteors = [];
  let raf = null;
  let lastTs = 0, elapsed = 0, nextMeteor = 1500;

  // ── Resize ─────────────────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
    buildConstellations();
  }

  // ── Stars ───────────────────────────────────────────────────────────────
  function buildStars() {
    const n = Math.min(Math.floor((W * H) / 5000), 220);
    stars = Array.from({ length: n }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
      freq:  0.0006 + Math.random() * 0.0014,
      gold:  Math.random() < 0.18,
    }));
  }

  // ── Constellations ──────────────────────────────────────────────────────
  function buildConstellations() {
    constellations = Array.from({ length: 3 }, (_, i) => {
      const shape = SHAPES[(i * 2 + Math.floor(Math.random() * 2)) % SHAPES.length];
      const scale = 0.55 + Math.random() * 0.7;
      const ox = 60 + Math.random() * (W - 180);
      const oy = 60 + Math.random() * (H - 180);
      return {
        pts: shape.map(([x, y]) => [ox + x * scale, oy + y * scale]),
        phase: Math.random() * Math.PI * 2,
        freq:  0.0003 + Math.random() * 0.0003,
      };
    });
  }

  // ── Meteors / Comets ────────────────────────────────────────────────────
  function spawnMeteor() {
    const isComet = Math.random() < 0.22;
    // spawn along top or right edge
    const edge = Math.random();
    const x = edge < 0.7 ? Math.random() * W * 1.3 : W + 10;
    const y = edge < 0.7 ? -10 : Math.random() * H * 0.5;
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4; // ~45° downward
    const speed = isComet ? 1.8 + Math.random() * 1.4 : 4 + Math.random() * 3;
    meteors.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      tail: isComet ? 130 + Math.random() * 90 : 55 + Math.random() * 55,
      width: isComet ? 2.2 : 1.2,
      life: 0,
      maxLife: isComet ? 200 : 95,
      isComet,
    });
  }

  // ── Draw ────────────────────────────────────────────────────────────────
  function draw(ts) {
    const dt = Math.min(ts - lastTs, 64); // cap at ~15 fps equivalent
    lastTs = ts;
    elapsed += dt;

    ctx.clearRect(0, 0, W, H);

    // Stars
    for (const s of stars) {
      const a = 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(s.phase + elapsed * s.freq));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(201,168,76,${a})`
        : `rgba(220,225,255,${a})`;
      ctx.fill();
    }

    // Constellations
    for (const c of constellations) {
      const lineA = 0.07 + 0.04 * Math.sin(c.phase + elapsed * c.freq);
      const dotA  = 0.22 + 0.12 * Math.sin(c.phase + elapsed * c.freq * 1.3);

      ctx.beginPath();
      ctx.moveTo(c.pts[0][0], c.pts[0][1]);
      for (let i = 1; i < c.pts.length; i++) ctx.lineTo(c.pts[i][0], c.pts[i][1]);
      ctx.strokeStyle = `rgba(201,168,76,${lineA})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      for (const [px, py] of c.pts) {
        // glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 5);
        glow.addColorStop(0, `rgba(201,168,76,${dotA})`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,210,140,${dotA})`;
        ctx.fill();
      }
    }

    // Meteors & comets
    nextMeteor -= dt;
    if (nextMeteor <= 0) {
      spawnMeteor();
      nextMeteor = 2200 + Math.random() * 4500;
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.life++;
      m.x += m.vx;
      m.y += m.vy;

      const t = m.life / m.maxLife;
      const alpha = Math.sin(t * Math.PI); // fade in → out

      const ang = Math.atan2(m.vy, m.vx);
      const tx = m.x - Math.cos(ang) * m.tail;
      const ty = m.y - Math.sin(ang) * m.tail;

      // Trail
      const trail = ctx.createLinearGradient(tx, ty, m.x, m.y);
      if (m.isComet) {
        trail.addColorStop(0, 'transparent');
        trail.addColorStop(0.5, `rgba(201,168,76,${alpha * 0.25})`);
        trail.addColorStop(1, `rgba(255,225,120,${alpha * 0.9})`);
      } else {
        trail.addColorStop(0, 'transparent');
        trail.addColorStop(0.5, `rgba(180,190,255,${alpha * 0.2})`);
        trail.addColorStop(1, `rgba(240,245,255,${alpha * 0.85})`);
      }

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(m.x, m.y);
      ctx.strokeStyle = trail;
      ctx.lineWidth = m.width;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Head glow
      const glowR = m.isComet ? 10 : 5;
      const glowColor = m.isComet ? '255,215,100' : '210,220,255';
      const headGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glowR);
      headGlow.addColorStop(0, `rgba(${glowColor},${alpha * (m.isComet ? 0.9 : 0.7)})`);
      headGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(m.x, m.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = headGlow;
      ctx.fill();

      // Remove when done
      if (m.life >= m.maxLife || m.x > W + 80 || m.y > H + 80) {
        meteors.splice(i, 1);
      }
    }

    raf = requestAnimationFrame(draw);
  }

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      lastTs = performance.now();
      raf = requestAnimationFrame(draw);
    }
  });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  raf = requestAnimationFrame(draw);
}
