import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const host = document.querySelector('#card-scene');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const defaultTilt = -.04;
const ranks = {
  pioneer: { label: 'Pioneer', finish: 'Iridescent titanium', color: '#c798ff', edge: '#8838ed', metal: '#b785ed', stripes: 1, numeral: 'Ⅰ' },
  explorer: { label: 'Explorer', finish: 'Brushed copper', color: '#d6a48a', edge: '#b77a58', metal: '#d8a080', stripes: 2, numeral: 'Ⅱ' },
  pathfinder: { label: 'Pathfinder', finish: 'Brushed silver', color: '#cbd1d8', edge: '#8f9aa8', metal: '#e2e7ef', stripes: 3, numeral: 'Ⅲ' },
  trailblazer: { label: 'Trailblazer', finish: 'Champagne gold', color: '#d4c396', edge: '#ae9866', metal: '#e2cc90', stripes: 4, numeral: 'Ⅳ' },
};
let activeRank = 'pioneer';
let flipped = false;
let revealAt = -100;
let pointerX = 0;
let pointerY = 0;
let dragging = false;
let dragPointerId = null;
let manuallyRotated = false;
const dragRotation = new THREE.Quaternion();
const dragStep = new THREE.Quaternion();
const dragEuler = new THREE.Euler();
const lastPointer = new THREE.Vector2();
let sceneReady = false;
const announce = (message) => { document.querySelector('#announcement').textContent = message; };

const welcome = document.querySelector('#welcome-dialog');
const account = document.querySelector('#account-dialog');
document.querySelectorAll('.close-dialog').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog').close());
});
document.querySelector('#replay-button').addEventListener('click', () => welcome.showModal());
document.querySelector('#account-button').addEventListener('click', () => account.showModal());
document.querySelector('#inspect-button').addEventListener('click', () => {
  account.close();
  document.querySelector('.object-section').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
});
document.querySelector('#reveal-button').addEventListener('click', () => {
  welcome.close();
  setRank('pioneer');
  flipped = false;
  document.querySelector('#flip-button').innerHTML = 'Turn card <span aria-hidden="true">↔</span>';
  revealAt = performance.now() / 1000;
  document.body.classList.remove('revealing');
  requestAnimationFrame(() => document.body.classList.add('revealing'));
  document.querySelector('.object-section').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
  announce('Welcome, Julien. Your Pioneer membership card has been revealed.');
});
document.querySelector('#flip-button').addEventListener('click', () => {
  flipped = !flipped;
  resetRotation();
  document.querySelector('#flip-button').innerHTML = `${flipped ? 'Show front' : 'Turn card'} <span aria-hidden="true">↔</span>`;
  announce(flipped ? 'Reverse: The story is ours to write. Member identity and Exowing engraving. Design preview.' : `${ranks[activeRank].label} membership card, front.`);
});
document.querySelectorAll('[data-rank]').forEach((button) => button.addEventListener('click', () => setRank(button.dataset.rank)));
document.querySelector('#reset-button').addEventListener('click', resetView);

function resetRotation() {
  if (dragPointerId !== null && host.hasPointerCapture(dragPointerId)) host.releasePointerCapture(dragPointerId);
  dragPointerId = null;
  dragging = false;
  manuallyRotated = false;
  dragRotation.identity();
  pointerX = pointerY = 0;
  revealAt = -100;
}

function resetView() {
  flipped = false;
  resetRotation();
  document.querySelector('#flip-button').innerHTML = 'Turn card <span aria-hidden="true">↔</span>';
  announce('Card returned to its default, slightly upward orientation.');
}

function rotateCard(deltaX, deltaY) {
  // Compose screen-space rotations without Euler limits or polar singularities.
  dragEuler.set(deltaY * .01, deltaX * .01, 0);
  dragStep.setFromEuler(dragEuler);
  dragRotation.premultiply(dragStep).normalize();
  manuallyRotated = true;
}

let frontMaterial;
let backMaterial;
let shellMaterial;
let insignia;
let card;
let letteringMaterial;
let rankMaterial;
let surfaceGrain;
let foilGrain;
let interferenceMap;
const foilSweep = { value: 0 };
const rankTint = { value: new THREE.Color(ranks.pioneer.color) };
const frontMaps = new Map();
const backMaps = new Map();
const rankMaps = new Map();
const disposable = [];

function setRank(key) {
  activeRank = key;
  flipped = false;
  resetRotation();
  document.querySelector('#flip-button').innerHTML = 'Turn card <span aria-hidden="true">↔</span>';
  const rank = ranks[key];
  document.querySelectorAll('[data-rank]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.rank === key)));
  // Future rank previews never change the mock member's actual Pioneer status.
  host.setAttribute('aria-label', `${rank.label} membership card design preview. Julien Blancher, member 0001. ${key === 'pioneer' ? 'Current founding edition.' : 'Future concept only.'} Drag in any direction for unlimited 360-degree rotation. Arrow keys rotate; Home or Reset view restores the default angle.`);
  document.querySelector('.object-caption > .micro').textContent = rank.finish.toUpperCase();
  document.querySelector('.object-caption .muted').textContent = key === 'pioneer' ? 'CARBON WEAVE / FOUNDING EDITION' : 'CARBON WEAVE / FUTURE CONCEPT';
  if (sceneReady) {
    frontMaterial.map = frontMaps.get(key);
    frontMaterial.needsUpdate = true;
    backMaterial.map = backMaps.get(key);
    shellMaterial.color.set(key === 'pioneer' ? '#9876bc' : '#a6a9ad');
    shellMaterial.iridescence = key === 'pioneer' ? .6 : 0;
    rankMaterial.map = rankMaps.get(key);
    rankMaterial.emissiveMap = rankMaps.get(key);
    rankMaterial.color.set(rank.metal);
    rankMaterial.emissive.set(rank.color);
    rankTint.value.set(rank.color);
    rankMaterial.iridescence = key === 'pioneer' ? .8 : 0;
    rankMaterial.needsUpdate = true;
    buildInsignia(rank);
  }
  announce(`${rank.label} ${key === 'pioneer' ? 'founding edition' : 'future concept'} preview selected.`);
}

function roundedShape(w, h, radius) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + w - radius, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + radius);
  shape.lineTo(x + w, y + h - radius);
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  shape.lineTo(x + radius, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function faceGeometry() {
  const geometry = new THREE.ShapeGeometry(roundedShape(8.56, 5.4, .28), 24);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) uv.setXY(i, (position.getX(i) + 4.28) / 8.56, (position.getY(i) + 2.7) / 5.4);
  return geometry;
}

function polygon(points) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], index) => index === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
  shape.closePath();
  return shape;
}

function buildInsignia(rank) {
  if (insignia) {
    card.remove(insignia);
    insignia.traverse((object) => { object.geometry?.dispose(); if (object.material) object.material.dispose(); });
  }
  insignia = new THREE.Group();
  insignia.position.set(2.16, .24, .12);
  const isPioneer = rank === ranks.pioneer;
  const rimMaterial = new THREE.MeshPhysicalMaterial({ color: rank.metal, metalness: 1, roughness: .32, bumpMap: foilGrain, bumpScale: .018, anisotropy: .55, iridescence: isPioneer ? 1 : 0, iridescenceIOR: 1.38, iridescenceThicknessMap: interferenceMap, iridescenceThicknessMinimum: 180, iridescenceThicknessMaximum: 620, clearcoat: .32, clearcoatRoughness: .3, envMapIntensity: .9 });
  const innerMaterial = new THREE.MeshPhysicalMaterial({ color: isPioneer ? '#310057' : '#101112', metalness: .95, roughness: .5, bumpMap: surfaceGrain, bumpScale: .018, clearcoat: .06, clearcoatRoughness: .5, iridescence: isPioneer ? .2 : 0, iridescenceThicknessMap: interferenceMap, iridescenceThicknessMinimum: 365, iridescenceThicknessMaximum: 410, envMapIntensity: .18, emissive: isPioneer ? '#51008c' : '#000000', emissiveIntensity: .12 });
  const metalMaterial = rimMaterial.clone();
  metalMaterial.color.set(isPioneer ? '#eee8ff' : rank.metal);
  metalMaterial.roughness = .34;
  metalMaterial.envMapIntensity = .85;
  metalMaterial.clearcoat = .2;
  const shieldPoints = [[0, 1.38], [1.05, .94], [.91, -.65], [0, -1.32], [-.91, -.65], [-1.05, .94]];
  const extrusion = { depth: .035, bevelEnabled: true, bevelThickness: .024, bevelSize: .025, bevelSegments: 3, steps: 1 };
  const shield = new THREE.Mesh(new THREE.ExtrudeGeometry(polygon(shieldPoints), extrusion), rimMaterial);
  insignia.add(shield);
  const inner = new THREE.Mesh(new THREE.ExtrudeGeometry(polygon(shieldPoints.map(([x, y]) => [x * .943, y * .943])), extrusion), innerMaterial);
  inner.position.z = .043;
  insignia.add(inner);
  // Fine concentric machining catches the light around the rank device.
  for (let index = 0; index < 7; index++) {
    const scale = .88 - index * .046;
    const points = shieldPoints.map(([x, y]) => new THREE.Vector3(x * scale, y * scale, .101));
    points.push(points[0].clone());
    const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: rank.edge, transparent: true, opacity: .16 - index * .012 }));
    insignia.add(outline);
  }
  // Each rank adds a machined chevron to the same shield silhouette.
  const stripeCount = rank.stripes;
  for (let index = 0; index < stripeCount; index++) {
    const y = .28 - index * .25 + (stripeCount - 1) * .1;
    const chevron = polygon([[-.69, y], [0, y + .39], [.69, y], [.65, y - .17], [0, y + .17], [-.65, y - .17]]);
    const stripe = new THREE.Mesh(new THREE.ExtrudeGeometry(chevron, extrusion), metalMaterial.clone());
    stripe.position.z = .105;
    insignia.add(stripe);
  }
  const star = new THREE.Shape();
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4 + Math.PI / 2;
    const radius = i % 2 === 0 ? .215 : .065;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius + .87;
    if (i === 0) star.moveTo(x, y); else star.lineTo(x, y);
  }
  star.closePath();
  const starMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(star, extrusion), metalMaterial);
  starMesh.position.z = .12;
  insignia.add(starMesh);
  card.add(insignia);
}

function text(ctx, content, x, y, size, color = '#f5f5f5', family = 'Aptos', weight = 400, tracking = 0) {
  ctx.font = `${weight} ${size}px "${family}"`;
  ctx.fillStyle = color;
  ctx.letterSpacing = `${tracking}px`;
  ctx.fillText(content, x, y);
  ctx.letterSpacing = '0px';
}

function canvasTexture(canvas, color = true) {
  const texture = new THREE.CanvasTexture(canvas);
  if (color) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  disposable.push(texture);
  return texture;
}

function makeGrain(interference = false) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const pixels = ctx.createImageData(512, 512);
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    const noise = ((x * 73 + y * 179 + x * y * 3) % 101) / 100;
    const wave = Math.sin(x * .019 + y * .012 + Math.sin(y * .016) * 2.4);
    const value = interference ? 128 + wave * 48 + noise * 18 : 125 + Math.sin(y * 1.7) * 19 + noise * 16;
    const index = (y * 512 + x) * 4;
    pixels.data[index] = pixels.data[index + 1] = pixels.data[index + 2] = value;
    pixels.data[index + 3] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
  const texture = canvasTexture(canvas, false);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  if (!interference) texture.repeat.set(3, 3);
  return texture;
}

function makeFoil(logo, monogram, rank) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;canvas.height = 1292;
  const ctx = canvas.getContext('2d');
  if (rank) {
    text(ctx, rank.label.toUpperCase(), 128, 824, 62, '#ffffff', 'Aptos Mono', 400, 5);
  } else {
    ctx.drawImage(logo, 125, 112, 440, 44);
    ctx.drawImage(monogram, 1680, 96, 240, 83);
    text(ctx, 'FLIGHT', 116, 490, 192, '#ffffff', 'Aptos Display', 400, -7);
    text(ctx, 'CLUB.', 116, 674, 192, '#ffffff', 'Aptos Display', 400, -7);
  }
  // Printed tonal bands support the real environment reflections at the resting angle.
  ctx.globalCompositeOperation = 'source-in';
  const foil = ctx.createLinearGradient(0, 180, 1200, 920);
  [[0, '#ffffff'], [.22, '#e0e3e7'], [.38, '#9ba3af'], [.49, '#f4f7ff'], [.52, '#ffffff'], [.6, '#bec8d4'], [.75, '#f3f4f6'], [1, '#b3bcc7']].forEach(([offset, color]) => foil.addColorStop(offset, color));
  ctx.fillStyle = foil;ctx.fillRect(0, 0, 2048, 1292);
  ctx.globalCompositeOperation = 'source-atop';
  for (let y = 0; y < 1292; y += 2) {
    ctx.fillStyle = y % 6 === 0 ? '#ffffff16' : '#11182710';ctx.fillRect(0, y, 2048, 1);
  }
  return canvasTexture(canvas);
}

function addFoilHighlights(material, tint) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFoilSweep = foilSweep;
    shader.uniforms.uFoilTint = tint;
    shader.fragmentShader = `uniform float uFoilSweep;\nuniform vec3 uFoilTint;\n${shader.fragmentShader}`;
    shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>', `
      #include <emissivemap_fragment>
      float foilPosition = vMapUv.y * 10.0 + vMapUv.x * 3.0 + uFoilSweep;
      float foilHighlight = pow(0.5 + 0.5 * sin(foilPosition), 12.0);
      float foilBrush = sin(vMapUv.y * 3400.0) * 0.012;
      totalEmissiveRadiance += uFoilTint * (0.2 + foilHighlight * 0.65 + foilBrush);
    `);
  };
  material.customProgramCacheKey = () => 'flightclub-brushed-foil';
}

function drawEngraving(ctx, wing, reverse, rank) {
  ctx.save();
  ctx.beginPath();ctx.rect(65, 200, 1918, reverse ? 360 : 735);ctx.clip();
  ctx.globalAlpha = reverse ? .4 : .7;
  ctx.drawImage(wing, reverse ? 1010 : 520, reverse ? 135 : 205, reverse ? 930 : 1510, reverse ? 542 : 881);
  ctx.globalAlpha = .13;
  ctx.strokeStyle = rank.color;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 12]);
  ctx.beginPath();ctx.moveTo(1110, 215);ctx.lineTo(1110, 927);ctx.moveTo(690, 535);ctx.lineTo(1940, 535);ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = .65;
  text(ctx, 'EXOWING / AXONOMETRIC STUDY', 1070, reverse ? 560 : 936, 18, '#b8b8b8', 'Aptos Mono', 400, 3);
  ctx.restore();
}

function makeTexture(rank, reverse, logo, wing) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1292;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 2048, 1292);
  gradient.addColorStop(0, '#080808');
  gradient.addColorStop(.48, '#020202');
  gradient.addColorStop(1, '#040404');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2048, 1292);
  // Twilled carbon bundles are a subtle substrate, not a flat colored fill.
  ctx.save();ctx.translate(1024, 646);ctx.rotate(-Math.PI / 4);
  for (let y = -1600; y < 1600; y += 24) for (let x = -1600; x < 1600; x += 24) {
    const horizontal = (Math.floor(x / 24) + Math.floor(y / 24)) % 4 < 2;
    const weave = ctx.createLinearGradient(x, y, horizontal ? x : x + 24, horizontal ? y + 24 : y);
    weave.addColorStop(0, '#88888802');weave.addColorStop(.48, '#bbbbbb08');weave.addColorStop(1, '#03030312');
    ctx.fillStyle = weave;ctx.fillRect(x + 1, y + 1, 22, 22);
    ctx.strokeStyle = '#cccccc03';ctx.lineWidth = .7;
    for (let fiber = 4; fiber < 23; fiber += 4) {
      ctx.beginPath();ctx.moveTo(x + (horizontal ? 1 : fiber), y + (horizontal ? fiber : 1));
      ctx.lineTo(x + (horizontal ? 23 : fiber), y + (horizontal ? fiber : 23));ctx.stroke();
    }
  }
  ctx.restore();
  if (rank === ranks.pioneer) {
    const haze = ctx.createRadialGradient(1580, 610, 0, 1580, 610, 980);
    haze.addColorStop(0, '#8838ed10');haze.addColorStop(1, '#8838ed00');
    ctx.fillStyle = haze;ctx.fillRect(0, 0, 2048, 1292);
  }
  // Deterministic micrograin keeps the printed finish stable across redraws.
  for (let row = 0; row < 1292; row += 3) {
    ctx.fillStyle = `rgba(255,255,255,${.004 + (row * 17 % 11) / 1800})`;
    ctx.fillRect(0, row, 2048, 1);
  }
  ctx.strokeStyle = '#a0a0a055';
  ctx.lineWidth = 1.3;
  ctx.strokeRect(45, 45, 1958, 1202);
  ctx.strokeStyle = '#ffffff08';ctx.strokeRect(58, 58, 1932, 1176);
  drawEngraving(ctx, wing, reverse, rank);
  if (reverse) {
    ctx.save();ctx.globalAlpha = .8;ctx.drawImage(logo, 124, 112, 330, 33);ctx.restore();
    text(ctx, 'THE STORY IS', 124, 345, 90, '#f0f0f0', 'Aptos Display');
    text(ctx, 'OURS TO WRITE.', 124, 446, 90, '#f0f0f0', 'Aptos Display');
    text(ctx, 'JULIEN BLANCHER', 128, 1090, 28, '#ebebeb', 'Aptos Mono', 400, 3);
    text(ctx, `FC 0001 / ${rank.label.toUpperCase()} / NOV 2026`, 128, 1150, 23, '#b8b8b8', 'Aptos Mono', 400, 2);
    text(ctx, 'DESIGN PREVIEW', 1630, 1150, 18, '#b8b8b8', 'Aptos Mono', 400, 2);
  } else {
    text(ctx, 'THE FIRST CHAPTER / 001', 1060, 145, 21, '#c2c2c2', 'Aptos Mono', 400, 3);
    // Fine concentric engravings echo altitude rings and the insignia's trajectory.
    ctx.save();ctx.beginPath();ctx.rect(1040, 210, 900, 740);ctx.clip();
    for (let index = 0; index < 12; index++) {
      ctx.beginPath();ctx.ellipse(1538, 620, 265 + index * 42, 265 + index * 42, -.3, 0, Math.PI * 2);
      ctx.strokeStyle = index % 3 === 0 ? '#bcbcbc20' : '#bcbcbc10';ctx.stroke();
    }
    ctx.restore();
    text(ctx, rank.finish.toUpperCase(), 130, 887, 21, '#c4c4c4', 'Aptos Mono', 400, 3);
    ctx.fillStyle = '#a0a0a066';ctx.fillRect(127, 965, 1794, 1);
    text(ctx, 'JULIEN BLANCHER', 128, 1067, 48, '#ffffff', 'Aptos', 400, 1);
    text(ctx, 'FOUNDING MEMBER', 128, 1138, 23, '#bcbcbc', 'Aptos Mono', 400, 4);
    text(ctx, 'FC', 1715, 1067, 22, rank.color, 'Aptos Mono', 400, 4);
    text(ctx, '0001', 1707, 1138, 48, '#f0f0f0', 'Aptos Mono', 400, 2);
    text(ctx, 'EST. 2026', 1302, 893, 20, '#bcbcbc', 'Aptos Mono', 400, 4);
  }
  return canvasTexture(canvas);
}

async function init() {
  await Promise.all([document.fonts.load('400 32px Aptos'), document.fonts.load('400 32px "Aptos Display"'), document.fonts.load('400 32px "Aptos Mono"')]);
  const loadVector = async (path, recolor) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load illustration: ${path}`);
    const source = recolor(await response.text());
    const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml' }));
    try {
      const image = new Image();image.src = url;await image.decode();return image;
    } finally { URL.revokeObjectURL(url); }
  };
  const [logo, monogram, wing] = await Promise.all([
    loadVector('../../assets/logo-wordmark.svg', (source) => source.replaceAll('#000000', '#ffffff')),
    loadVector('../../assets/exopter-ex-flight-trails/exopter-ex-flight-trails.svg', (source) => source.replaceAll('#141414', '#ffffff')),
    loadVector('../../assets/blueprints/exowing-axonometric.svg', (source) => source.replaceAll('#10181a', 'none').replaceAll('#2fd6c6', '#b8b8b8').replaceAll('stroke-width="1.6"', 'stroke-width="2.5"')),
  ]);
  surfaceGrain = makeGrain();
  foilGrain = makeGrain();
  interferenceMap = makeGrain(true);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 100);
  camera.position.set(0, 0, 13.4);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  // Long studio softboxes produce broad, moving highlights on the metal inlays.
  for (const [x, y, z, w, h, intensity] of [[-5, 4, 5, 2, 9, 4], [4, 2, 6, 1.2, 8, 3], [1, -5, 4, 7, .6, 2]]) {
    const softbox = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(intensity, intensity, intensity) }));
    softbox.position.set(x, y, z);softbox.lookAt(0, 0, 0);room.add(softbox);
  }
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  scene.environmentRotation.set(.1, .65, 0);
  room.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight('#ffffff', 2.8);
  key.position.set(-6, 8, 4);scene.add(key);
  const edge = new THREE.DirectionalLight('#ffffff', 2.4);
  edge.position.set(8, 3, 1);scene.add(edge);
  const warmth = new THREE.DirectionalLight('#ffffff', 1.5);
  warmth.position.set(-3, -3, 1);scene.add(warmth);
  scene.add(new THREE.AmbientLight('#ffffff', .35));
  card = new THREE.Group();
  scene.add(card);
  shellMaterial = new THREE.MeshPhysicalMaterial({ color: '#9876bc', metalness: 1, roughness: .27, iridescence: .6, clearcoat: 1 });
  const shell = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedShape(8.56, 5.4, .28), { depth: .065, bevelEnabled: true, bevelThickness: .025, bevelSize: .025, bevelSegments: 4, curveSegments: 24, steps: 1 }), shellMaterial);
  shell.position.z = -.033;
  card.add(shell);
  for (const [keyName, rank] of Object.entries(ranks)) {
    frontMaps.set(keyName, makeTexture(rank, false, logo, wing));
    backMaps.set(keyName, makeTexture(rank, true, logo, wing));
    rankMaps.set(keyName, makeFoil(logo, monogram, rank));
  }
  frontMaterial = new THREE.MeshPhysicalMaterial({ map: frontMaps.get('pioneer'), color: '#ffffff', metalness: .02, roughness: .94, bumpMap: surfaceGrain, bumpScale: .002, clearcoat: 0, envMapIntensity: .06 });
  const front = new THREE.Mesh(faceGeometry(), frontMaterial);
  front.position.z = .06;card.add(front);
  const letteringMap = makeFoil(logo, monogram);
  letteringMaterial = new THREE.MeshPhysicalMaterial({ map: letteringMap, color: '#f0f2f5', metalness: 1, roughness: .2, anisotropy: .8, anisotropyRotation: .3, bumpMap: foilGrain, bumpScale: .004, transparent: true, alphaTest: .08, depthWrite: false, clearcoat: .7, envMapIntensity: 1.8, emissive: '#e1e4e8', emissiveMap: letteringMap, emissiveIntensity: .45 });
  addFoilHighlights(letteringMaterial, { value: new THREE.Color('#e7edf6') });
  const lettering = new THREE.Mesh(faceGeometry(), letteringMaterial);
  lettering.position.z = .067;card.add(lettering);
  rankMaterial = letteringMaterial.clone();
  rankMaterial.map = rankMaps.get('pioneer');rankMaterial.color.set(ranks.pioneer.metal);
  rankMaterial.emissiveMap = rankMaterial.map;rankMaterial.emissive.set(ranks.pioneer.color);rankMaterial.emissiveIntensity = .9;
  rankMaterial.iridescence = .8;rankMaterial.iridescenceThicknessMap = interferenceMap;
  rankMaterial.iridescenceThicknessMinimum = 180;rankMaterial.iridescenceThicknessMaximum = 620;
  addFoilHighlights(rankMaterial, rankTint);
  const rankLabel = new THREE.Mesh(faceGeometry(), rankMaterial);
  rankLabel.position.z = .069;card.add(rankLabel);
  backMaterial = frontMaterial.clone();backMaterial.map = backMaps.get('pioneer');
  const back = new THREE.Mesh(faceGeometry(), backMaterial);
  back.rotation.y = Math.PI;back.position.z = -.066;card.add(back);
  buildInsignia(ranks.pioneer);
  // A soft contact shadow grounds the floating object without an expensive shadow pass.
  const shadowCanvas = document.createElement('canvas');shadowCanvas.width = 256;shadowCanvas.height = 256;
  const sc = shadowCanvas.getContext('2d');
  const shadowGradient = sc.createRadialGradient(128, 128, 5, 128, 128, 128);
  shadowGradient.addColorStop(0, '#0000004d');shadowGradient.addColorStop(.5, '#0000001c');shadowGradient.addColorStop(1, '#00000000');
  sc.fillStyle = shadowGradient;sc.fillRect(0, 0, 256, 256);
  const shadowMap = new THREE.CanvasTexture(shadowCanvas);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(11, 2.2), new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false }));
  shadow.position.set(0, -3.15, -1);scene.add(shadow);
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = Math.max(13.4, 17.4 / camera.aspect);
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);observer.observe(host);resize();
  // The account retains the very same rendered Pioneer object, including its insignia.
  card.rotation.set(defaultTilt, -.12, -.055);
  renderer.render(scene, camera);
  const bounds = new THREE.Box3().setFromObject(card);
  const corners = [];
  for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) corners.push(new THREE.Vector3(x, y, z).project(camera));
  const pixelWidth = renderer.domElement.width;
  const pixelHeight = renderer.domElement.height;
  const left = Math.max(0, (Math.min(...corners.map((point) => point.x)) + 1) / 2 * pixelWidth - 8);
  const top = Math.max(0, (1 - Math.max(...corners.map((point) => point.y))) / 2 * pixelHeight - 8);
  const width = Math.min(pixelWidth - left, (Math.max(...corners.map((point) => point.x)) + 1) / 2 * pixelWidth - left + 8);
  const height = Math.min(pixelHeight - top, (1 - Math.min(...corners.map((point) => point.y))) / 2 * pixelHeight - top + 8);
  const thumbnail = document.createElement('canvas');
  thumbnail.width = Math.ceil(width);thumbnail.height = Math.ceil(height);
  thumbnail.getContext('2d').drawImage(renderer.domElement, left, top, width, height, 0, 0, width, height);
  const accountImage = new Image();
  accountImage.src = thumbnail.toDataURL('image/png');
  accountImage.alt = 'Julien Blancher’s Pioneer membership card, with the same titanium finish and raised insignia.';
  const accountCard = document.querySelector('.account-card');
  accountCard.replaceChildren(accountImage);
  accountCard.classList.add('rendered-card');
  frontMaterial.map = frontMaps.get(activeRank);
  backMaterial.map = backMaps.get(activeRank);
  shellMaterial.color.set(activeRank === 'pioneer' ? '#9876bc' : '#a6a9ad');
  shellMaterial.iridescence = activeRank === 'pioneer' ? .6 : 0;
  rankMaterial.map = rankMaps.get(activeRank);
  rankMaterial.emissiveMap = rankMaterial.map;
  rankMaterial.color.set(ranks[activeRank].metal);
  rankMaterial.emissive.set(ranks[activeRank].color);
  rankTint.value.set(ranks[activeRank].color);
  rankMaterial.iridescence = activeRank === 'pioneer' ? .8 : 0;
  buildInsignia(ranks[activeRank]);
  host.addEventListener('pointermove', (event) => {
    const bounds = host.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    if (dragging && event.pointerId === dragPointerId) {
      rotateCard(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
      lastPointer.set(event.clientX, event.clientY);
    }
  });
  host.addEventListener('pointerleave', () => { pointerX = 0;pointerY = 0; });
  host.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || dragPointerId !== null) return;
    dragging = true;dragPointerId = event.pointerId;revealAt = -100;
    lastPointer.set(event.clientX, event.clientY);
    host.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  const endDrag = (event) => {
    if (event.pointerId !== dragPointerId) return;
    dragging = false;dragPointerId = null;
    if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
  };
  host.addEventListener('pointerup', endDrag);
  host.addEventListener('pointercancel', endDrag);
  host.addEventListener('lostpointercapture', endDrag);
  host.addEventListener('dblclick', resetView);
  host.addEventListener('keydown', (event) => {
    const steps = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] };
    if (event.key === 'Home') { event.preventDefault();resetView(); }
    else if (steps[event.key]) {
      event.preventDefault();revealAt = -100;
      rotateCard(...steps[event.key]);
    }
  });
  const restEuler = new THREE.Euler();
  const restRotation = new THREE.Quaternion();
  const hoverEuler = new THREE.Euler();
  const hoverRotation = new THREE.Quaternion();
  const revealRotation = new THREE.Quaternion();
  const targetRotation = new THREE.Quaternion();
  const upAxis = new THREE.Vector3(0, 1, 0);
  const faceNormal = new THREE.Vector3();
  let frameId;
  let previousTime = performance.now();
  function animate(now) {
    const time = now / 1000;
    const elapsed = Math.min((now - previousTime) / 1000, .05);previousTime = now;
    const ease = 1 - Math.exp(-7 * elapsed);
    const revealProgress = Math.min(1, Math.max(0, (time - revealAt) / 2.2));
    const revealSpin = !reducedMotion.matches && revealProgress < 1 ? (1 - Math.pow(1 - revealProgress, 3)) * Math.PI * 2 - Math.PI * 2 : 0;
    restEuler.set(defaultTilt, flipped ? Math.PI : -.12, -.055);
    restRotation.setFromEuler(restEuler);
    targetRotation.copy(restRotation).premultiply(dragRotation);
    if (!manuallyRotated && !dragging && !reducedMotion.matches) {
      hoverEuler.set(pointerY * .15, pointerX * .23, -pointerX * .025);
      hoverRotation.setFromEuler(hoverEuler);
      targetRotation.premultiply(hoverRotation);
    }
    if (revealProgress < 1 && !reducedMotion.matches) {
      revealRotation.setFromAxisAngle(upAxis, revealSpin);
      targetRotation.premultiply(revealRotation);
    }
    card.quaternion.slerp(targetRotation, dragging || reducedMotion.matches ? 1 : ease);
    faceNormal.set(0, 0, 1).applyQuaternion(card.quaternion);
    foilSweep.value = faceNormal.x * 4.5 - faceNormal.y * 3.5;
    card.position.y = reducedMotion.matches ? 0 : .08 + Math.sin(time * .7) * .065;
    if (revealProgress < 1 && !reducedMotion.matches) {
      const scale = .78 + .22 * (1 - Math.pow(1 - revealProgress, 3));card.scale.setScalar(scale);
    } else card.scale.setScalar(1);
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
  sceneReady = true;
  document.documentElement.dataset.scene = 'ready';
  frameId = requestAnimationFrame(animate);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else { previousTime = performance.now();frameId = requestAnimationFrame(animate); }
  });
  renderer.domElement.addEventListener('webglcontextlost', (event) => { event.preventDefault();cancelAnimationFrame(frameId);document.querySelector('#fallback').hidden = false; });
  renderer.domElement.addEventListener('webglcontextrestored', () => location.reload());
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frameId);observer.disconnect();
    scene.traverse((object) => { object.geometry?.dispose();object.material?.dispose(); });
    disposable.forEach((texture) => texture.dispose());shadowMap.dispose();environment.dispose();renderer.dispose();
  }, { once: true });
}

init().catch((error) => {
  document.documentElement.dataset.scene = 'fallback';
  document.querySelector('#fallback').hidden = false;
  document.querySelector('#flip-button').disabled = true;
  announce('The 3D preview is unavailable. A static membership card is shown.');
  console.error('Flight Club preview could not initialize.', error);
});
