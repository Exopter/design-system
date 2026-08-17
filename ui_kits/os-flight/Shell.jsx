/* Sillage Flight — application shell: left rail + top header. Exposes window.OSShell. */
(function () {
  const { Icon } = window.OSIcons;
  const DS = window.ExopterDesignSystem_4c9fc9;
  const { Badge } = DS;

  const ROOMS = [
    { id: 'flight', label: 'Flights', icon: 'plane' },
    { id: 'hangar', label: 'Hangar', icon: 'wrench' },
    { id: 'signal', label: 'Signal', icon: 'signal', separated: true },
  ];

  function Rail({ room, onRoom }) {
    return (
      <nav style={{
        width: 64, flex: 'none', background: 'var(--ex-carbon-950)', color: 'var(--ex-vapor-50)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: 6,
        borderRight: '1px solid var(--ex-carbon-700)',
      }}>
        <a className="shell-home-link" href="../../index.html" title="Design system" style={{ marginBottom: 10, display: 'flex', borderRadius: 8 }}>
          <img src="../../assets/app-icon.svg" alt="Exopter" style={{ width: 30, height: 30, borderRadius: 7 }} />
        </a>
        {ROOMS.map((r) => {
          const active = r.id === room;
          return (
            <React.Fragment key={r.id}>
              {r.separated && <span aria-hidden="true" style={{ width: 32, height: 1, margin: '7px 0', background: 'var(--ex-carbon-700)' }} />}
              <button type="button" className="shell-room-button" title={r.label} aria-current={active ? 'page' : undefined} onClick={() => onRoom(r.id)} style={{
                width: 44, height: 44, borderRadius: 8, border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                background: active ? 'var(--ex-carbon-800)' : 'transparent',
                color: active ? 'var(--ex-aqua-500)' : 'var(--ex-graphite-400)',
                transition: 'background .18s, color .18s',
              }}>
                <Icon name={r.icon} size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.06em', textTransform: 'uppercase' }}>{r.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  function Header({ title, crumb, onRoom }) {
    return (
      <header style={{
        height: 56, flex: 'none', display: 'flex', alignItems: 'center', gap: 16,
        padding: '0 20px', background: 'var(--ex-carbon-900)', color: 'var(--ex-vapor-50)',
        borderBottom: '1px solid var(--ex-carbon-700)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ex-graphite-400)' }}>Sillage · {crumb}</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{title}</span>
        </div>
        <div style={{ flex: 1 }} />
        <div className="ex-dark">
          <button
            type="button"
            className="signal-status-link"
            onClick={() => onRoom('signal')}
            aria-label="Open Signal"
            title="Open Signal"
          >
            <Badge tone="live">Station 01 connected</Badge>
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--ex-field-500)', color: 'var(--ex-white)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>AR</span>
        </div>
      </header>
    );
  }

  function useDialogFocus(onClose, stateKey = 'open') {
    const dialogRef = React.useRef(null);
    const openerRef = React.useRef(document.activeElement);
    const closeRef = React.useRef(onClose);
    closeRef.current = onClose;
    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return undefined;
      const focusable = () => [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
      const frame = requestAnimationFrame(() => focusable()[0]?.focus());
      const handleKey = (event) => {
        if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); return; }
        if (event.key !== 'Tab') return;
        const items = focusable();
        if (!items.length) { event.preventDefault(); return; }
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      };
      dialog.addEventListener('keydown', handleKey);
      return () => { cancelAnimationFrame(frame); dialog.removeEventListener('keydown', handleKey); };
    }, [stateKey]);
    React.useEffect(() => () => openerRef.current?.focus?.(), []);
    return dialogRef;
  }

  function Shell({ room, onRoom, title, crumb, children }) {
    return (
      <div style={{ display: 'flex', height: '100%', minHeight: 0, background: 'var(--surface-app)' }}>
        <Rail room={room} onRoom={onRoom} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Header title={title} crumb={crumb} onRoom={onRoom} />
          <main style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</main>
        </div>
      </div>
    );
  }

  window.OSShell = { Shell, ROOMS, useDialogFocus };
})();
