const { Badge, StatusDot, Toast } = window.ExopterDesignSystem_4c9fc9;

const icon = (markup, size = 14) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: markup }} />
);
const check = icon('<path d="M20 6 9 17l-5-5"/>');
const alert = icon('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', 20);
const synced = icon('<path d="M20 6 9 17l-5-5"/>', 20);

function Demo() {
  return (
    <div>
      <div className="group"><span className="gl">Badge</span>
        <div className="row">
          <Badge tone="ready" icon={check}>Ready</Badge>
          <Badge tone="live">Live</Badge>
          <Badge tone="caution">Pending</Badge>
          <Badge tone="fault">Fault</Badge>
          <Badge tone="info">Sync</Badge>
          <Badge tone="solid">GLD</Badge>
          <Badge tone="neutral">T0+06</Badge>
        </div>
      </div>
      <div className="group"><span className="gl">StatusDot</span>
        <div className="row">
          <StatusDot state="ready" />
          <StatusDot state="live" pulse label="Streaming" />
          <StatusDot state="pending" />
          <StatusDot state="caution" />
          <StatusDot state="fault" />
          <StatusDot state="unknown" label="No data" />
        </div>
      </div>
      <div className="group"><span className="gl">Toast</span>
        <div className="row" style={{ alignItems: 'stretch' }}>
          <Toast tone="ready" title="FDR-118 synced" icon={synced} onClose={() => {}}>Flight data uploaded · integrity verified.</Toast>
          <Toast tone="fault" title="Sensor fault" icon={alert} onClose={() => {}}>Pitot pressure lost — do not rely on airspeed.</Toast>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
