/* RWAFA — product parade hero (Three.js).
 * The store's own products (hoodies, tees, socks) drift toward the viewer through a Mediterranean night,
 * each lit in the Amazigh colours, with small rug-diamond motifs floating through the scene.
 * Hover a product to slow the parade, click to open it. The caption under the copy follows the product in front.
 * Pauses off-screen, lighter on mobile, a single still frame with reduced motion.
 */
import * as THREE from 'three';

const BG = 0x0b1016;
const RED = new THREE.Color(0xf2b53a), INDIGO = new THREE.Color(0x2f86e0), SAKURA = new THREE.Color(0x3aa66b);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BACKS = ['yaz-hoodie', 'arrif-hoodie', 'adrar-hoodie', 'marchica-hoodie', 'alhoceima-hoodie'];
const ZF = -46, ZN = 5.5;               // far / near ends of the parade
const texCache = new Map();             // kept across re-renders (language change, navigation back home)
let S = null;

function loadTex(src, w) {
  const key = src + '@' + w;
  if (!texCache.has(key)) {
    texCache.set(key, new Promise((res) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        const h = Math.round(w * img.naturalHeight / img.naturalWidth);
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
        res({ tex, aspect: w / h });
      };
      img.onerror = () => res(null);
      img.src = src;
    }));
  }
  return texCache.get(key);
}

function catalogue(mobile) {
  const list = (window.SHOP && window.SHOP.products) || [];
  const by = { hoodie: [], tee: [], socks: [] };
  list.forEach((p) => (by[p.type || 'hoodie'] || by.hoodie).push(p));
  // interleave types so sneakers and socks show up all along the parade
  const out = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const k of ['hoodie', 'hoodie', 'tee', 'hoodie', 'socks']) {
      const p = by[k].shift(); if (p) out.push({ p, src: `images/${p.id}-face.jpg` });
    }
    if (i > 40) break;
  }
  if (!mobile) list.filter((p) => BACKS.includes(p.id)).slice(0, 8).forEach((p, i) => out.splice(3 + i * 3, 0, { p, src: `images/${p.id}-dos.jpg` }));
  return mobile ? out.slice(0, 16) : out;
}

const VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }';
const FRAG = `
  uniform sampler2D map; uniform float uAlpha; uniform float uBright; uniform float uHover; uniform vec2 uSize; uniform vec3 uRim;
  varying vec2 vUv;
  float rbox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
  void main(){
    vec2 p = (vUv - 0.5) * uSize;
    float d = rbox(p, uSize * 0.5, 0.07);
    float a = 1.0 - smoothstep(-0.006, 0.0, d);
    vec3 col = texture2D(map, vUv).rgb * uBright * (1.0 + uHover * 0.22);
    float rim = 1.0 - smoothstep(0.0, 0.018 + uHover * 0.01, abs(d + 0.008));
    col += uRim * rim * (0.25 + uHover * 1.1);
    gl_FragColor = vec4(col, a * uAlpha);
    #include <colorspace_fragment>
  }`;

function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.35, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function petalTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d');
  x.translate(32, 32);
  const dia = (r) => { x.beginPath(); x.moveTo(0, -r); x.lineTo(r * 0.7, 0); x.lineTo(0, r); x.lineTo(-r * 0.7, 0); x.closePath(); };
  dia(26); x.fillStyle = '#f2b53a'; x.fill();
  dia(15); x.fillStyle = '#c8372d'; x.fill();
  dia(6); x.fillStyle = '#f6efe2'; x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function mount(host) {
  if (S && S.host === host) return;
  unmount();
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { host.classList.add('no-webgl'); return; }
  const mobile = matchMedia('(max-width: 760px)').matches || (navigator.hardwareConcurrency || 8) <= 4;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setClearColor(BG, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'scene-canvas';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
  camera.position.set(0, 0, 9);

  const glowTex = glowTexture(), petalTex = petalTexture();
  const geo = new THREE.PlaneGeometry(1, 1);
  const cards = [];
  const items = catalogue(mobile);
  const span = ZN - ZF;
  const GOLD = 2.39996;
  items.forEach((it, i) => {
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { map: { value: null }, uAlpha: { value: 0 }, uBright: { value: 1 }, uHover: { value: 0 }, uSize: { value: new THREE.Vector2(1, 1) },
        uRim: { value: (i % 3 === 1 ? INDIGO : i % 3 === 2 ? SAKURA : RED).clone() } },
    });
    const mesh = new THREE.Mesh(geo, mat); mesh.visible = false;
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: mat.uniforms.uRim.value, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    scene.add(glow); scene.add(mesh);
    const c = {
      it, mesh, glow, mat,
      z: ZF + (i / items.length) * span,            // evenly spaced along the corridor
      ang: i * GOLD, rad: (mobile ? 1.5 : 2.1) + ((i * 7) % 5) * (mobile ? 0.28 : 0.42),
      sway: Math.random() * Math.PI * 2, hover: 0, ready: false,
    };
    mesh.userData.card = c;
    cards.push(c);
    loadTex(it.src, mobile ? 280 : 420).then((r) => {
      if (!r || !S || S.host !== host) return;
      mat.uniforms.map.value = r.tex;
      const h = 1.5, w = h * r.aspect;
      mesh.scale.set(w, h, 1); mat.uniforms.uSize.value.set(w, h);
      c.ready = true; mesh.visible = true;
      if (reduce) frame(performance.now(), true);
    });
  });

  // sakura petals drifting through the parade
  const NP = mobile ? 70 : 150;
  const pPos = new Float32Array(NP * 3), pSpd = new Float32Array(NP), pPh = new Float32Array(NP);
  for (let i = 0; i < NP; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 22; pPos[i * 3 + 1] = (Math.random() - 0.5) * 14; pPos[i * 3 + 2] = ZF * 0.6 + Math.random() * (ZN - ZF * 0.6);
    pSpd[i] = 0.25 + Math.random() * 0.45; pPh[i] = Math.random() * 6.28;
  }
  const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const petals = new THREE.Points(pGeo, new THREE.PointsMaterial({ map: petalTex, size: mobile ? 0.16 : 0.2, transparent: true, depthWrite: false, opacity: 0.6, sizeAttenuation: true }));
  scene.add(petals);

  const st = { t: 0, last: 0, raf: 0, running: false, visible: true, px: 0, py: 0, tx: 0, ty: 0, speed: 1, cx: 0, cy: 0, hovered: null, front: null, scroll: 0 };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(-9, -9);
  const now = document.getElementById('hero-now');

  function layout() {
    const r = host.getBoundingClientRect();
    const w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    // on wide screens the parade passes on the right, leaving the copy on the left readable
    st.cx = innerWidth > 900 ? Math.min(4.4, (w / h) * 2) : 0;
    st.cy = innerWidth > 900 ? 0 : 1.9;   // on phones the copy sits low, so the parade passes above it
  }
  const ro = new ResizeObserver(layout); ro.observe(host);

  function onPointer(e) {
    const r = host.getBoundingClientRect();
    st.tx = ((e.clientX - r.left) / r.width) * 2 - 1; st.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    ndc.set(st.tx, -st.ty);
  }
  function onLeave() { ndc.set(-9, -9); }
  function onClick() { if (st.hovered) location.hash = '#/p/' + st.hovered.it.p.id; }
  function onScroll() { st.scroll = Math.min(1, Math.max(0, scrollY / Math.max(1, host.offsetHeight))); }
  host.addEventListener('pointermove', onPointer);
  host.addEventListener('pointerleave', onLeave);
  host.addEventListener('click', onClick);
  addEventListener('scroll', onScroll, { passive: true });

  const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  function setCaption(c) {
    if (!now || !c || st.front === c) return;
    st.front = c;
    const p = c.it.p;
    now.href = '#/p/' + p.id;
    now.querySelector('b').textContent = p.name;
    now.querySelector('.hero-now-p').textContent = window.SHOP ? window.SHOP.fmt(p.price) : p.price + ' €';
    now.hidden = false;
  }

  function frame(time, once) {
    const dt = st.last ? Math.min(0.05, (time - st.last) / 1000) : 0.016;
    st.last = time; if (!once) st.t += dt;

    // hover test first so the parade slows under the cursor
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(cards.filter((c) => c.ready && c.mat.uniforms.uAlpha.value > 0.5).map((c) => c.mesh))[0];
    st.hovered = hit ? hit.object.userData.card : null;
    host.style.cursor = st.hovered ? 'pointer' : '';
    st.speed += ((st.hovered ? 0.12 : 1) - st.speed) * Math.min(1, dt * 4);

    st.px += (st.tx - st.px) * Math.min(1, dt * 2.5); st.py += (st.ty - st.py) * Math.min(1, dt * 2.5);
    camera.position.x = st.px * 0.7; camera.position.y = -st.py * 0.45 + st.scroll * 1.2;
    camera.lookAt(st.cx * 0.35, st.scroll * 0.6, -14);

    const turn = st.t * 0.035;
    let best = null;
    for (const c of cards) {
      if (!once) { c.z += dt * 1.35 * st.speed; if (c.z > ZN) c.z -= span; }
      const fade = sstep(ZF, ZF + 12, c.z) * (1 - sstep(ZN - 3.5, ZN, c.z));
      const a = c.ang + turn;
      const x = st.cx + Math.cos(a) * c.rad * 1.45, y = st.cy + Math.sin(a) * c.rad * 0.72 + Math.sin(st.t * 0.6 + c.sway) * 0.12;
      c.mesh.position.set(x, y, c.z);
      c.mesh.lookAt(camera.position);
      c.mesh.rotation.z += Math.sin(st.t * 0.5 + c.sway) * 0.05;
      c.hover += ((st.hovered === c ? 1 : 0) - c.hover) * Math.min(1, dt * 8);
      const s = 1 + c.hover * 0.08;
      c.mesh.scale.x = c.mat.uniforms.uSize.value.x * s; c.mesh.scale.y = c.mat.uniforms.uSize.value.y * s;
      c.mat.uniforms.uAlpha.value = c.ready ? fade : 0;
      c.mat.uniforms.uBright.value = 0.35 + 0.65 * sstep(ZF + 4, -6, c.z);
      c.mat.uniforms.uHover.value = c.hover;
      c.glow.position.set(x, y, c.z - 0.25);
      c.glow.scale.setScalar(3.2 + c.hover);
      c.glow.material.opacity = c.ready ? fade * (0.22 + c.hover * 0.35) : 0;
      if (c.ready && fade > 0.9 && c.z < ZN - 4 && (!best || c.z > best.z)) best = c;
    }
    setCaption(st.hovered || best);

    if (!once) {
      for (let i = 0; i < NP; i++) {
        pPos[i * 3 + 1] -= pSpd[i] * dt;
        pPos[i * 3] += Math.sin(st.t * 0.8 + pPh[i]) * dt * 0.35 - dt * 0.12;
        pPos[i * 3 + 2] += dt * 0.6;
        if (pPos[i * 3 + 1] < -7 || pPos[i * 3 + 2] > ZN) { pPos[i * 3 + 1] = 7; pPos[i * 3] = (Math.random() - 0.5) * 22; if (pPos[i * 3 + 2] > ZN) pPos[i * 3 + 2] = ZF * 0.6; }
      }
      pGeo.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
    if (!once && st.running) st.raf = requestAnimationFrame((t) => frame(t, false));
  }
  function start() { if (st.running || reduce || document.hidden || !st.visible) return; st.running = true; st.last = 0; st.raf = requestAnimationFrame((t) => frame(t, false)); }
  function stop() { st.running = false; cancelAnimationFrame(st.raf); }
  const io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; st.visible ? start() : stop(); }, { threshold: 0.01 });
  io.observe(host);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  S = {
    host,
    dispose() {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      removeEventListener('scroll', onScroll);
      cards.forEach((c) => { c.mat.dispose(); c.glow.material.dispose(); });
      geo.dispose(); pGeo.dispose(); petals.material.dispose(); glowTex.dispose(); petalTex.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
  // still frame with reduced motion: spread the parade so several products are visible
  if (reduce) st.t = 0;
  layout(); onScroll(); frame(performance.now(), true); start();
  host.classList.add('is-3d');
}
function unmount() { if (S) { S.dispose(); S = null; } }
function sync() { const host = document.getElementById('hero-scene'); if (host) mount(host); else unmount(); }
document.addEventListener('oni:render', sync);
sync();
