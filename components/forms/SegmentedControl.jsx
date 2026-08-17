import React from 'react';

const CSS = `
.exds-seg{display:inline-flex;align-items:center;gap:2px;padding:3px;
  background:var(--surface-panel);border:1px solid var(--border-rule);border-radius:var(--radius);}
.exds-seg__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;letter-spacing:var(--ls-label);text-transform:uppercase;
  color:var(--text-muted);background:transparent;border:none;cursor:pointer;
  height:26px;padding:0 12px;border-radius:var(--radius-compact);
  transition:background var(--dur) var(--ease-out),color var(--dur) var(--ease-out);}
.exds-seg__btn:hover:not([disabled]):not([data-active="true"]){color:var(--text-body)}
.exds-seg__btn[data-active="true"]{background:var(--accent);color:var(--accent-contrast)}
.exds-seg__btn[disabled]{opacity:.4;cursor:not-allowed}
.exds-seg__btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.exds-seg__btn svg{width:14px;height:14px}
.exds-seg--lg .exds-seg__btn{height:32px;font-size:var(--fs-sm)}
`;
if (typeof document !== 'undefined' && !document.getElementById('exds-seg-css')) {
  const s = document.createElement('style'); s.id = 'exds-seg-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Exopter SegmentedControl — instrument-style single-choice switcher.
 * Mode label is always visible; selection is never color-only.
 * options: [{ value, label, icon?, disabled? }]
 */
export function SegmentedControl({ options = [], value, defaultValue, onChange, size = 'md', ariaLabel = 'Mode', className = '' }) {
  const isControlled = value !== undefined;
  const initialValue = options.find((option) => option.value === defaultValue && !option.disabled)?.value
    ?? options.find((option) => !option.disabled)?.value;
  const [internal, setInternal] = React.useState(initialValue);
  const current = isControlled ? value : internal;
  const selectedIndex = options.findIndex((option) => option.value === current && !option.disabled);
  const tabbableIndex = selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled);
  const buttonRefs = React.useRef([]);
  const pick = (v) => { if (!isControlled) setInternal(v); if (onChange) onChange(v); };
  const move = (fromIndex, direction) => {
    if (!options.length) return;
    let nextIndex = fromIndex;
    for (let attempts = 0; attempts < options.length; attempts += 1) {
      nextIndex = (nextIndex + direction + options.length) % options.length;
      if (!options[nextIndex].disabled) {
        pick(options[nextIndex].value);
        buttonRefs.current[nextIndex]?.focus();
        return;
      }
    }
  };
  const onKeyDown = (event, index) => {
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      move(index, 1);
    } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      move(index, -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const enabled = options.map((option, optionIndex) => ({ option, optionIndex })).filter(({ option }) => !option.disabled);
      const target = event.key === 'Home' ? enabled[0] : enabled.at(-1);
      if (target) {
        pick(target.option.value);
        buttonRefs.current[target.optionIndex]?.focus();
      }
    }
  };
  return (
    <div className={['exds-seg', size === 'lg' ? 'exds-seg--lg' : '', className].filter(Boolean).join(' ')}
         role="radiogroup" aria-label={ariaLabel}>
      {options.map((o, index) => (
        <button key={o.value} ref={(element) => { buttonRefs.current[index] = element; }} type="button"
                role="radio" aria-checked={index === selectedIndex} tabIndex={index === tabbableIndex ? 0 : -1}
                className="exds-seg__btn" data-active={index === selectedIndex ? 'true' : 'false'}
                disabled={o.disabled} onKeyDown={(event) => onKeyDown(event, index)} onClick={() => pick(o.value)}>
          {o.icon}{o.label}
        </button>
      ))}
    </div>
  );
}
