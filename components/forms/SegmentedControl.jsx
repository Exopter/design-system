import React from 'react';

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
