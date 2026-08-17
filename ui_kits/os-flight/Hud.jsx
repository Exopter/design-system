/* Sillage Flight — HUD preview (pilot display concept). window.OSHud. */
(function () {
  const { Icon } = window.OSIcons;
  const DS = window.ExopterDesignSystem_4c9fc9;
  const { Switch } = DS;

  const HUD_GREEN = 'var(--ex-hud-green)';
  const HUD_AMBER = '#ffe000';
  const HUD_RED = 'var(--ex-red-600)';

  const STATUS_ITEMS = [
    { icon: 'signal', label: 'GPS', value: '3D' },
    { icon: 'activity', label: 'IMU', value: 'OK' },
    { icon: 'plane', label: 'GLD', value: 'ARMED' },
    { icon: 'radio', label: 'FDR', value: 'LIVE' },
  ];

  const HEADING_MARKS = ['33', '34', '35', '036', '37', '38', '39'];

  function StatusItem({ icon, label, value }) {
    return (
      <div className="hud-status-item">
        <Icon name={icon} size={22} strokeWidth={1.8} />
        <span>{label}</span>
        <b>{value}</b>
      </div>
    );
  }

  function Tape({ side, label, unit, value, step, detail }) {
    const offsets = Array.from({ length: 21 }, (_, index) => index - 10);

    return (
      <div className={`hud-tape hud-tape--${side}`} aria-label={`${label}: ${value} ${unit}`}>
        <div className="hud-tape__title">{unit}</div>
        <div className="hud-tape__rail" aria-hidden="true">
          {offsets.map((offset, index) => {
            const displayValue = value - (offset * step);
            const major = offset % 2 === 0;
            return (
              <div
                className={`hud-tape__tick${major ? ' hud-tape__tick--major' : ''}`}
                key={offset}
                style={{ '--tick-position': `${(index / 20) * 100}%` }}
              >
                {major && <span>{displayValue}</span>}
                <i />
              </div>
            );
          })}
        </div>
        <div className="hud-tape__readout">{value}</div>
        <div className="hud-tape__meta">
          <strong>{label}</strong>
          <span>{detail}</span>
        </div>
      </div>
    );
  }

  function PitchLadder() {
    const rows = [
      { label: '5', position: '12%' },
      { label: '−5', position: '48%' },
      { label: '−10', position: '78%' },
    ];

    return (
      <div className="hud-pitch-ladder" aria-label="Pitch ladder">
        {rows.map((row) => (
          <div className="hud-pitch-row" key={row.label} style={{ '--pitch-position': row.position }}>
            <span>{row.label}</span><i /><i /><span>{row.label}</span>
          </div>
        ))}
      </div>
    );
  }

  function HeadingTape() {
    return (
      <div className="hud-heading-tape" aria-label="Heading 036 degrees">
        {HEADING_MARKS.map((mark) => (
          <div className={`hud-heading-mark${mark === '036' ? ' hud-heading-mark--active' : ''}`} key={mark}>
            <span>{mark}</span><i />
          </div>
        ))}
      </div>
    );
  }

  function AltitudeAlerts() {
    const alerts = [
      { label: 'BREAK OFF', top: '15%', tone: 'primary' },
      { label: 'PULL', top: '30%', tone: 'caution' },
      { label: 'HARD DECK', top: '80%', tone: 'fault' },
    ];

    return (
      <div className="hud-altitude-alerts" aria-label="Altitude thresholds">
        {alerts.map((alert) => (
          <div className={`hud-threshold hud-threshold--${alert.tone}`} key={alert.label} style={{ '--alert-position': alert.top }}>
            <span>{alert.label}</span>
            <Icon name="chevron-right" size={16} strokeWidth={3} />
          </div>
        ))}
      </div>
    );
  }

  function TelemetryFooter() {
    return (
      <div className="hud-telemetry-footer" aria-label="Navigation telemetry">
        <div><span>GLIDE</span><b>12.4</b></div>
        <div className="hud-heading-box"><span>HDG</span><b>036°</b></div>
        <div><span>V/S</span><b>−4.6 <small>m/s</small></b></div>
      </div>
    );
  }

  function HudDisplay() {
    return (
      <div className="hud-display" data-testid="hud-canvas" aria-label="Exopter pilot head-up display">
        <div className="hud-status-bar">
          <div className="hud-status-cluster">
            {STATUS_ITEMS.map((item) => <StatusItem key={item.label} {...item} />)}
          </div>

          <div className="hud-mode">
            <strong>Pilot mode</strong>
            <div aria-label="Display mode 3 of 5"><i /><i /><i /><i /><i /></div>
          </div>

          <div className="hud-status-cluster hud-status-cluster--right">
            <StatusItem icon="radio" label="LINK" value="OK" />
            <StatusItem icon="battery" label="BATT" value="78%" />
            <StatusItem icon="clock" label="UTC" value="03:30" />
          </div>
        </div>

        <HeadingTape />
        <PitchLadder />

        <div className="hud-flight-path" aria-label="Flight path marker">
          <Icon name="crosshair" size={42} strokeWidth={1.4} />
        </div>

        <Tape side="left" label="TAS" unit="km/h" value={214} step={5} detail="GS 198 · 1.0 G" />
        <div className="hud-speed-limit"><Icon name="triangle-alert" size={14} /><span>MAX 250</span></div>

        <Tape side="right" label="MSL" unit="m" value={1480} step={100} detail="AGL 1210" />
        <AltitudeAlerts />

        <div className="hud-primary-alert" role="status">
          <span>PULL</span>
          <small>ALTITUDE GATE</small>
        </div>

        <TelemetryFooter />
      </div>
    );
  }

  function Hud() {
    const [failsafe, setFailsafe] = React.useState(false);

    return (
      <div className="hud-page">
        <div className="hud-page-header">
          <div>
            <h1>HUD preview</h1>
            <p>Final pilot-display direction · high-contrast symbology, fixed scan zones, fail-safe to black.</p>
          </div>
          <Switch label="Fail-safe" checked={failsafe} onChange={(event) => setFailsafe(event.target.checked)} />
        </div>

        <div className="hud-frame ex-dark">
          {failsafe ? (
            <div className="hud-failsafe" data-testid="hud-canvas" aria-label="Fail-safe display blank">
              <span>FAIL-SAFE · DISPLAY BLANK</span>
              <small>Recovery remains outside the pilot field of view</small>
            </div>
          ) : <HudDisplay />}
        </div>

        <div className="hud-legend" aria-label="HUD colour legend">
          {[
            ['Primary data', HUD_GREEN],
            ['Immediate action', HUD_AMBER],
            ['Limit / fault', HUD_RED],
          ].map(([label, colour]) => (
            <span key={label}><i style={{ background: colour }} />{label}</span>
          ))}
        </div>
      </div>
    );
  }

  window.OSHud = { Hud };
})();
