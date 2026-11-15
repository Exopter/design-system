import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const host = document.querySelector('#card-scene');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ranks = {
  pioneer: { label: 'Pioneer', color: '#c4a0f0', edge: '#91809f', stripes: 1, numeral: 'Ⅰ' },
  explorer: { label: 'Explorer', color: '#9acddd', edge: '#6e9fba', stripes: 2, numeral: 'Ⅱ' },
  pathfinder: { label: 'Pathfinder', color: '#dfc18d', edge: '#b5a072', stripes: 3, numeral: 'Ⅲ' },
  trailblazer: { label: 'Trailblazer', color: '#e5ad9f', edge: '#c08d8b', stripes: 4, numeral: 'Ⅳ' },
};
let activeRank = 'pioneer';
let flipped = false;
let revealAt = -100;
let pointerX = 0;
let pointerY = 0;
let dragging = false;
let dragStart = 0;
let dragAngle = 0;
let lastAngle = 0;
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
  dragAngle = 0;
  lastAngle = 0;
  document.querySelector('#flip-button').innerHTML = 'Turn card <span aria-hidden="true">↔</span>';
  revealAt = performance.now() / 1000;
  document.body.classList.remove('revealing');
  requestAnimationFrame(() => document.body.classList.add('revealing'));
  document.querySelector('.object-section').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
  announce('Welcome, Julien. Your Pioneer membership card has been revealed.');
});
document.querySelector('#flip-button').addEventListener('click', () => {
  flipped = !flipped;
  dragAngle = 0;
  lastAngle = 0;
  document.querySelector('#flip-button').innerHTML = `${flipped ? 'Show front' : 'Turn card'} <span aria-hidden="true">↔</span>`;
  announce(flipped ? 'Reverse: Flight and Signal included. Automatic flight recording enabled. Mock membership.' : `${ranks[activeRank].label} membership card, front.`);
});
document.querySelectorAll('[data-rank]').forEach((button) => button.addEventListener('click', () => setRank(button.dataset.rank)));

let frontMaterial;
let insignia;
let card;
const frontMaps = new Map();
const disposable = [];

function setRank(key) {
  activeRank = key;
  flipped = false;
  dragAngle = 0;
  lastAngle = 0;
  document.querySelector('#flip-button').innerHTML = 'Turn card <span aria-hidden="true">↔</span>';
  const rank = ranks[key];
  document.querySelectorAll('[data-rank]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.rank === key)));
  // Future rank previews never change the mock member's actual Pioneer status.
  host.setAttribute('aria-label', `${rank.label} membership card design preview. Julien Blancher, member 0001. ${key === 'pioneer' ? 'Current founding edition.' : 'Future concept only.'}`);
  document.querySelector('.object-caption .muted').textContent = key === 'pioneer' ? 'IRIDESCENT INSIGNIA / FIRST EDITION' : 'IRIDESCENT INSIGNIA / FUTURE CONCEPT';
  if (sceneReady) {
    frontMaterial.map = frontMaps.get(key);
    frontMaterial.needsUpdate = true;
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
  const rimMaterial = new THREE.MeshPhysicalMaterial({ color: rank.color, metalness: .97, roughness: .22, iridescence: 1, iridescenceIOR: 1.45, iridescenceThicknessMinimum: 180, iridescenceThicknessMaximum: 480, clearcoat: 1 });
  const innerMaterial = new THREE.MeshPhysicalMaterial({ color: '#232028', metalness: .8, roughness: .36, clearcoat: 1 });
  const metalMaterial = new THREE.MeshPhysicalMaterial({ color: '#eee8f6', metalness: 1, roughness: .21, iridescence: .55, iridescenceThicknessMinimum: 150, iridescenceThicknessMaximum: 380 });
  const shieldPoints = [[0, 1.38], [1.05, .94], [.91, -.65], [0, -1.32], [-.91, -.65], [-1.05, .94]];
  const extrusion = { depth: .035, bevelEnabled: true, bevelThickness: .024, bevelSize: .025, bevelSegments: 3, steps: 1 };
  const shield = new THREE.Mesh(new THREE.ExtrudeGeometry(polygon(shieldPoints), extrusion), rimMaterial);
  insignia.add(shield);
  const inner = new THREE.Mesh(new THREE.ExtrudeGeometry(polygon(shieldPoints.map(([x, y]) => [x * .943, y * .943])), extrusion), innerMaterial);
  inner.position.z = .043;
  insignia.add(inner);
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

function text(ctx, content, x, y, size, color = '#ede9f2', family = 'Aptos', weight = 400, tracking = 0) {
  ctx.font = `${weight} ${size}px "${family}"`;
  ctx.fillStyle = color;
  ctx.letterSpacing = `${tracking}px`;
  ctx.fillText(content, x, y);
  ctx.letterSpacing = '0px';
}

function makeTexture(rank, reverse, logo) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1292;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 2048, 1292);
  gradient.addColorStop(0, '#24212a');
  gradient.addColorStop(.4, '#141118');
  gradient.addColorStop(1, '#0c0b10');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2048, 1292);
  // Deterministic micrograin keeps the printed finish stable across redraws.
  for (let row = 0; row < 1292; row += 3) {
    ctx.fillStyle = `rgba(235,221,255,${.008 + (row * 17 % 11) / 1200})`;
    ctx.fillRect(0, row, 2048, 1);
  }
  ctx.strokeStyle = '#8b819329';
  ctx.lineWidth = 1.3;
  ctx.strokeRect(45, 45, 1958, 1202);
  if (reverse) {
    ctx.save();ctx.globalAlpha = .8;ctx.drawImage(logo, 124, 112, 330, 33);ctx.restore();
    text(ctx, 'THE SKY IS ONLY', 124, 345, 90, '#e6dfed', 'Aptos Display');
    text(ctx, 'THE BEGINNING.', 124, 446, 90, '#e6dfed', 'Aptos Display');
    text(ctx, 'YOUR FLIGHT CLUB MEMBERSHIP', 128, 589, 24, '#a094ae', 'Aptos Mono', 400, 4);
    [['01', 'Flight + Signal', 'FULL ACCESS'], ['02', 'Automatic flight recording', 'ENABLED']].forEach(([number, label, status], index) => {
      const y = 715 + index * 145;
      ctx.fillStyle = '#d6c7e82a';ctx.fillRect(125, y - 55, 1795, 1);
      text(ctx, number, 128, y + 12, 25, '#9d90ac', 'Aptos Mono');
      text(ctx, label, 225, y + 12, 43);
      text(ctx, status, 1570, y + 10, 23, '#c6b3dc', 'Aptos Mono', 400, 2);
    });
    text(ctx, 'JULIEN BLANCHER', 128, 1090, 28, '#d5cddd', 'Aptos Mono', 400, 3);
    text(ctx, 'FC 0001 / PIONEER / NOV 2026', 128, 1150, 23, '#9d90ac', 'Aptos Mono', 400, 2);
    text(ctx, 'DESIGN PREVIEW', 1630, 1150, 18, '#9d90ac', 'Aptos Mono', 400, 2);
  } else {
    ctx.save();ctx.globalAlpha = .9;ctx.drawImage(logo, 125, 115, 370, 37);ctx.restore();
    text(ctx, 'MEMBER OF THE FIRST CHAPTER', 1190, 145, 20, '#b0a3bc', 'Aptos Mono', 400, 3);
    // Fine concentric engravings echo altitude rings and the insignia's trajectory.
    ctx.save();ctx.beginPath();ctx.rect(1040, 210, 900, 740);ctx.clip();
    for (let index = 0; index < 12; index++) {
      ctx.beginPath();ctx.ellipse(1538, 620, 265 + index * 42, 265 + index * 42, -.3, 0, Math.PI * 2);
      ctx.strokeStyle = index % 3 === 0 ? '#b49bc71b' : '#b49bc70d';ctx.stroke();
    }
    ctx.restore();
    text(ctx, 'FLIGHT', 116, 490, 192, '#f4eefb', 'Aptos Display', 400, -7);
    text(ctx, 'CLUB.', 116, 674, 192, '#f4eefb', 'Aptos Display', 400, -7);
    text(ctx, rank.label.toUpperCase(), 128, 801, 26, rank.color, 'Aptos Mono', 400, 10);
    ctx.fillStyle = '#9a89ab55';ctx.fillRect(127, 965, 1794, 1);
    text(ctx, 'JULIEN BLANCHER', 128, 1067, 43, '#f0eaf6', 'Aptos', 400, 1);
    text(ctx, 'FOUNDING MEMBER', 128, 1138, 20, '#a79aad', 'Aptos Mono', 400, 4);
    text(ctx, 'FC', 1715, 1067, 22, rank.color, 'Aptos Mono', 400, 4);
    text(ctx, '0001', 1707, 1138, 48, '#e8deef', 'Aptos Mono', 400, 2);
    text(ctx, 'EST. 2026', 1302, 893, 17, '#a79aad', 'Aptos Mono', 400, 5);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  disposable.push(texture);
  return texture;
}

async function init() {
  await Promise.all([document.fonts.load('400 32px Aptos'), document.fonts.load('400 32px "Aptos Display"'), document.fonts.load('400 32px "Aptos Mono"')]);
  const logo = new Image();
  // Reuse the canonical wordmark, recolored only for printing on a dark surface.
  const logoSource = await (await fetch('../../assets/logo-wordmark.svg')).text();
  const logoUrl = URL.createObjectURL(new Blob([logoSource.replaceAll('#000000', '#eee6f7')], { type: 'image/svg+xml' }));
  logo.src = logoUrl;
  await logo.decode();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 100);
  camera.position.set(0, 0, 13.4);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight('#f3eaff', 3.8);
  key.position.set(-4, 5, 8);scene.add(key);
  const edge = new THREE.DirectionalLight('#a48bff', 3);
  edge.position.set(5, 2, 4);scene.add(edge);
  const warmth = new THREE.DirectionalLight('#ffcf9f', 1.8);
  warmth.position.set(-3, -3, 1);scene.add(warmth);
  scene.add(new THREE.AmbientLight('#dcd2ed', .7));
  card = new THREE.Group();
  scene.add(card);
  const shell = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedShape(8.56, 5.4, .28), { depth: .065, bevelEnabled: true, bevelThickness: .025, bevelSize: .025, bevelSegments: 4, curveSegments: 24, steps: 1 }), new THREE.MeshPhysicalMaterial({ color: '#afa0bc', metalness: 1, roughness: .27, iridescence: .6, clearcoat: 1 }));
  shell.position.z = -.033;
  card.add(shell);
  for (const [keyName, rank] of Object.entries(ranks)) frontMaps.set(keyName, makeTexture(rank, false, logo));
  frontMaterial = new THREE.MeshPhysicalMaterial({ map: frontMaps.get('pioneer'), metalness: .48, roughness: .38, clearcoat: .85, clearcoatRoughness: .25, envMapIntensity: .65 });
  const front = new THREE.Mesh(faceGeometry(), frontMaterial);
  front.position.z = .06;card.add(front);
  const back = new THREE.Mesh(faceGeometry(), new THREE.MeshPhysicalMaterial({ map: makeTexture(ranks.pioneer, true, logo), metalness: .4, roughness: .4, clearcoat: .7, envMapIntensity: .7 }));
  back.rotation.y = Math.PI;back.position.z = -.066;card.add(back);
  URL.revokeObjectURL(logoUrl);
  buildInsignia(ranks.pioneer);
  // A soft contact shadow grounds the floating object without an expensive shadow pass.
  const shadowCanvas = document.createElement('canvas');shadowCanvas.width = 256;shadowCanvas.height = 256;
  const sc = shadowCanvas.getContext('2d');
  const shadowGradient = sc.createRadialGradient(128, 128, 5, 128, 128, 128);
  shadowGradient.addColorStop(0, '#1c10274d');shadowGradient.addColorStop(.5, '#1c10271c');shadowGradient.addColorStop(1, '#1c102700');
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
  card.rotation.set(.13, -.12, -.055);
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
  buildInsignia(ranks[activeRank]);
  host.addEventListener('pointermove', (event) => {
    const bounds = host.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    if (dragging) dragAngle = lastAngle + (event.clientX - dragStart) * .008;
  });
  host.addEventListener('pointerleave', () => { pointerX = 0;pointerY = 0; });
  host.addEventListener('pointerdown', (event) => { dragging = true;dragStart = event.clientX;host.setPointerCapture(event.pointerId); });
  host.addEventListener('pointerup', () => { dragging = false;lastAngle = dragAngle; });
  host.addEventListener('pointercancel', () => { dragging = false;lastAngle = dragAngle; });
  let frameId;
  let previousTime = performance.now();
  function animate(now) {
    const time = now / 1000;
    const elapsed = Math.min((now - previousTime) / 1000, .05);previousTime = now;
    const ease = 1 - Math.exp(-7 * elapsed);
    const revealProgress = Math.min(1, Math.max(0, (time - revealAt) / 2.2));
    const revealSpin = !reducedMotion.matches && revealProgress < 1 ? (1 - Math.pow(1 - revealProgress, 3)) * Math.PI * 2 - Math.PI * 2 : 0;
    const targetY = (flipped ? Math.PI : -.12) + dragAngle + (reducedMotion.matches ? 0 : pointerX * .23);
    card.rotation.y += (targetY - card.rotation.y) * (reducedMotion.matches ? 1 : ease);
    card.rotation.x += ((reducedMotion.matches ? 0 : .13 + pointerY * .15) - card.rotation.x) * ease;
    card.rotation.z += ((reducedMotion.matches ? 0 : -.055 - pointerX * .025) - card.rotation.z) * ease;
    card.position.y = reducedMotion.matches ? 0 : .08 + Math.sin(time * .7) * .065;
    if (revealProgress < 1 && !reducedMotion.matches) {
      card.rotation.y = targetY + revealSpin;
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
