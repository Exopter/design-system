// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  const base = '../..';
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = base + '/styles.css';
  document.head.appendChild(l);
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — point `base` at the built design-system package root.');
  document.head.appendChild(s);
})();
