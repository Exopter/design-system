import { createMembershipCard, RANKS } from './membership-card.js';

// Specimen page: mock member data, rank previews, dialogs and announcements
// around the shared membership card module.
const host = document.querySelector('#card-scene');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const LEAVE_MS = 420;
const flipButton = document.querySelector('#flip-button');
const welcome = document.querySelector('#welcome-dialog');
const account = document.querySelector('#account-dialog');
let activeRank = 'pioneer';
let card = null;
const announce = (message) => { document.querySelector('#announcement').textContent = message; };

function showFace(flipped) {
  flipButton.innerHTML = `${flipped ? 'Show front' : 'Turn card'} <span aria-hidden="true">↔</span>`;
  announce(flipped ? 'Reverse: The story is ours to write. Member identity and Exowing engraving. Design preview.' : `${RANKS[activeRank].label} membership card, front.`);
}

function setRank(key) {
  activeRank = key;
  const rank = RANKS[key];
  document.querySelectorAll('[data-rank]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.rank === key)));
  // Future rank previews never change the mock member's actual Pioneer status.
  host.setAttribute('aria-label', `${rank.label} membership card design preview. Julien Blancher, member 0001. ${key === 'pioneer' ? 'Current founding edition.' : key === 'core_team' ? 'Exopter team edition.' : 'Future concept only.'} Move the pointer to catch the light; drag, click or use Turn card to inspect the reverse.`);
  document.querySelector('.object-caption > .micro').textContent = rank.finish.toUpperCase();
  document.querySelector('.object-caption .muted').textContent = key === 'pioneer' ? 'CARBON WEAVE / FOUNDING EDITION' : key === 'core_team' ? 'FACETED CRYSTAL / EXOPTER TEAM' : 'CARBON WEAVE / FUTURE CONCEPT';
  card?.setRank(key);
  announce(`${rank.label} ${key === 'pioneer' ? 'founding edition' : key === 'core_team' ? 'team edition' : 'future concept'} preview selected.`);
}

// Dialogs leave with a short fade; the next step starts once they are gone.
function dismiss(dialog, then) {
  const finish = () => { dialog.classList.remove('leaving');dialog.close();then?.(); };
  if (reducedMotion.matches) return finish();
  dialog.classList.add('leaving');
  setTimeout(finish, LEAVE_MS);
}

// The account keeps the very same rendered Pioneer object, insignia included.
// The capture waits for a laid-out canvas instead of failing the scene.
let thumbnailReady = false;
function captureAccountCard() {
  const source = thumbnailReady ? null : card?.snapshot({ tier: 'pioneer' });
  if (!source) return;
  const image = new Image();
  image.src = source;
  image.alt = 'Julien Blancher’s Pioneer membership card, with the same titanium finish and raised insignia.';
  const accountCard = document.querySelector('.account-card');
  accountCard.replaceChildren(image);
  accountCard.classList.add('rendered-card');
  thumbnailReady = true;
}

document.querySelectorAll('.close-dialog').forEach((button) => {
  button.addEventListener('click', () => dismiss(button.closest('dialog')));
});
document.querySelector('#replay-button').addEventListener('click', () => welcome.showModal());
document.querySelector('#account-button').addEventListener('click', () => { captureAccountCard();account.showModal(); });
document.querySelector('#inspect-button').addEventListener('click', () => {
  account.close();
  document.querySelector('.object-section').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
});
document.querySelector('#reveal-button').addEventListener('click', () => {
  // The stage is set behind the invitation: the card waits unlit and without
  // its insignia, then the sequence starts as the invitation clears.
  setRank('pioneer');
  card?.reveal(LEAVE_MS / 1000);
  document.body.classList.remove('revealing');
  document.querySelector('.object-section').scrollIntoView({ behavior: 'instant', block: 'center' });
  dismiss(welcome, () => {
    document.body.classList.add('revealing');
    announce('Welcome, Julien. Your Pioneer membership card has been revealed.');
  });
});
flipButton.addEventListener('click', () => card?.turn());
document.querySelectorAll('[data-rank]').forEach((button) => button.addEventListener('click', () => setRank(button.dataset.rank)));

createMembershipCard(host, {
  name: 'Julien Blancher',
  memberNumber: 1,
  tier: 'pioneer',
  since: 'Nov 2026',
  footnote: 'DESIGN PREVIEW',
  assets: {
    wordmark: '../../assets/logo-wordmark.svg',
    monogram: '../../assets/exopter-ex-flight-trails/exopter-ex-flight-trails.svg',
    wing: '../../assets/blueprints/exowing-axonometric.svg',
  },
  onFace: showFace,
}).then((created) => {
  card = created;
  document.documentElement.dataset.scene = 'ready';
  captureAccountCard();
  if (activeRank !== 'pioneer') card.setRank(activeRank);
}).catch((error) => {
  document.documentElement.dataset.scene = 'fallback';
  document.querySelector('#fallback').hidden = false;
  flipButton.disabled = true;
  announce('The 3D preview is unavailable. A static membership card is shown.');
  console.error('Flight Club preview could not initialize.', error);
});
