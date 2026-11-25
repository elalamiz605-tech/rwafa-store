/* RWAFA — site-wide animated background.
 * A few Amazigh motifs (the ⵣ and rug diamonds) rise slowly behind every page, like the patterns on the products,
 * plus a faint Mediterranean swell along the bottom. Sparse on purpose. One still frame with reduced motion.
 */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = document.createElement('canvas');
  cv.className = 'site-bg'; cv.setAttribute('aria-hidden', 'true');
  document.body.prepend(cv);
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const COLS = ['#f2b53a', '#2f86e0', '#3aa66b', '#c8372d'];
  let W = 0, H = 0, dpr = 1, items = [], raf = 0, last = 0;

  function make(i) {
    return {
      kind: i % 3 === 0 ? 'yaz' : 'dia',
      x: Math.random() * W, y: Math.random() * H,
      s: 7 + Math.random() * 12, vy: -(6 + Math.random() * 10), r: (Math.random() - 0.5) * 0.6, vr: (Math.random() - 0.5) * 0.15,
      ph: Math.random() * 6.28, c: COLS[i % COLS.length], a: 0.1 + Math.random() * 0.14,
    };
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(26, Math.max(10, (W * H) / 60000)));
    while (items.length < n) items.push(make(items.length));
    items.length = n;
    if (reduce) draw(0);
  }
  function yaz(p) {
    const s = p.s;
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.lineTo(0, s);
    ctx.moveTo(-s * 0.55, -s * 0.9); ctx.bezierCurveTo(-s * 0.55, -s * 0.15, s * 0.55, -s * 0.15, s * 0.55, -s * 0.9);
    ctx.moveTo(-s * 0.55, s * 0.9); ctx.bezierCurveTo(-s * 0.55, s * 0.15, s * 0.55, s * 0.15, s * 0.55, s * 0.9);
    ctx.lineWidth = Math.max(1.5, s * 0.16); ctx.lineCap = 'round'; ctx.strokeStyle = p.c; ctx.stroke();
  }
  function dia(p) {
    const s = p.s;
    ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.7, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.7, 0); ctx.closePath();
    ctx.lineWidth = 1.5; ctx.strokeStyle = p.c; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -s * 0.4); ctx.lineTo(s * 0.28, 0); ctx.lineTo(0, s * 0.4); ctx.lineTo(-s * 0.28, 0); ctx.closePath();
    ctx.fillStyle = p.c; ctx.fill();
  }
  function sea(t) {
    // three soft swell lines along the bottom of the viewport
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      const base = H - 26 - k * 16;
      for (let x = 0; x <= W; x += 16) {
        const y = base + Math.sin(x * 0.012 + t * (0.5 + k * 0.15) + k) * (5 + k * 2);
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.globalAlpha = 0.07 - k * 0.015; ctx.lineWidth = 1.5; ctx.strokeStyle = '#2f86e0'; ctx.stroke();
    }
  }
  function draw(dt) {
    const t = performance.now() / 1000;
    ctx.clearRect(0, 0, W, H);
    sea(t);
    for (const p of items) {
      p.y += p.vy * dt; p.x += Math.sin(t * 0.4 + p.ph) * 6 * dt; p.r += p.vr * dt;
      if (p.y < -30) { p.y = H + 30; p.x = Math.random() * W; }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = p.a * (0.75 + 0.25 * Math.sin(t * 0.8 + p.ph));
      p.kind === 'yaz' ? yaz(p) : dia(p);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
  function loop(time) {
    const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016; last = time;
    draw(dt); raf = requestAnimationFrame(loop);
  }
  function start() { if (!reduce && !raf) { last = 0; raf = requestAnimationFrame(loop); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  resize(); start();
})();
