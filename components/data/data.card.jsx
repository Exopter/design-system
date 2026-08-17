const { Card, MetricTile, ReadinessStrip, ChecklistRow } = window.ExopterDesignSystem_4c9fc9;

const icon = (markup) => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: markup }} />
);
const gauge = icon('<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>');

function Demo() {
  return (
    <div>
      <div className="group"><span className="gl">ReadinessStrip</span>
        <ReadinessStrip mode="GLD" items={[
          { label: 'Pilot', value: 'A. Renaud', state: 'ready' },
          { label: 'Weather', value: 'CAVOK · 6 kt', state: 'ready' },
          { label: 'Battery', value: '74%', state: 'caution' },
          { label: 'FDR', value: 'Armed', state: 'live' },
          { label: 'Parachute', value: 'Pending', state: 'pending' },
        ]} />
      </div>
      <div className="group"><span className="gl">MetricTile</span>
        <div className="row">
          <MetricTile label="Airspeed" icon={gauge} value="214" unit="km/h" state="live" />
          <MetricTile label="Altitude" value="1 480" unit="m" delta="120" trend="down" />
          <MetricTile label="Glide" value="12.4" unit="L/D" delta="0.3" trend="up" state="ready" />
          <MetricTile label="Battery" value="74" unit="%" state="caution" />
          <MetricTile label="Pitot" value="—" state="fault" />
        </div>
      </div>
      <div className="group"><span className="gl">Card + ChecklistRow</span>
        <Card eyebrow="Flight prep" title="GLD readiness" flush>
          <div style={{ padding: '4px' }}>
            <ChecklistRow state="done" title="Harness & hooks inspected" owner="PILOT" evidence="#" />
            <ChecklistRow state="active" title="Parachute pack verified" owner="ENG-2" />
            <ChecklistRow state="blocked" title="Airspeed cross-check" blocker="Pitot fault — replace probe" owner="ENG-1" />
            <ChecklistRow state="pending" title="Weather window confirmed" owner="OPS" />
          </div>
        </Card>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
