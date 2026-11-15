import { createMembershipCard, RANKS } from './membership-card.js';

// Export the same physical card for dark email clients without WebGL.
const addDownload = (filename, source) => {
  const link = document.createElement('a');
  link.className = 'exds-btn exds-btn--secondary';
  link.download = filename;
  link.href = source;
  link.textContent = `Download ${filename}`;
  const preview = document.createElement('img');
  preview.src = source;
  preview.alt = filename;
  preview.width = 560;
  document.querySelector('#downloads').append(preview);
  document.querySelector('#downloads').append(link);
};

try {
  await document.fonts.ready;
  for (const tier of Object.keys(RANKS)) {
    const card = await createMembershipCard(document.querySelector('#scene'), {
      name: '', memberNumber: 1, tier, since: '', personal: false,
      assets: {
        wordmark: '../../assets/logo-wordmark.svg',
        monogram: '../../assets/exopter-ex-flight-trails/exopter-ex-flight-trails.svg',
        wing: '../../assets/blueprints/exowing-axonometric.svg',
      },
    });
    // Let the rank's physical materials and transmission pass initialize.
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    const source = card.snapshot({ tier, background: '#070b0d', type: 'image/jpeg', quality: .94 });
    if (!source) throw new Error(`Card did not render: ${tier}`);
    addDownload(`card-${tier}.jpg`, source);
    card.dispose();
  }
  const logo = new Image();
  logo.src = '../../assets/logo-wordmark.svg';
  await logo.decode();
  const canvas = document.createElement('canvas');
  canvas.width = 472;canvas.height = 48;
  const context = canvas.getContext('2d');
  context.drawImage(logo, 0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = 'source-in';
  context.fillStyle = '#f5f8f6';context.fillRect(0, 0, canvas.width, canvas.height);
  addDownload('wordmark.png', canvas.toDataURL('image/png'));
  document.querySelector('#status').textContent = 'Ready: five dark card renders and a light wordmark.';
} catch (error) {
  document.querySelector('#status').textContent = `Export failed: ${error.message}`;
  console.error(error);
}
