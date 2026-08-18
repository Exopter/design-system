const { Button, IconButton, Input, Select, Switch, SegmentedControl, Textarea } = window.ExopterDesignSystem_4c9fc9;

const icon = (markup) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: markup }} />
);
const playIcon = icon('<polygon points="6 3 20 12 6 21 6 3"/>');
const replayIcon = icon('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>');
const abortIcon = icon('<path d="m8.7 2 6.6 0 4.7 4.7 0 6.6-4.7 4.7-6.6 0-4.7-4.7 0-6.6z"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>');
const downloadIcon = icon('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>');

function Demo() {
  return (
    <div>
      <div className="group"><span className="gl">Button — variants & sizes</span>
        <div className="row">
          <Button variant="primary" iconLeft={playIcon}>Arm system</Button>
          <Button variant="secondary" iconLeft={replayIcon}>Replay T0</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger" iconLeft={abortIcon}>Abort</Button>
        </div>
        <div className="row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg" iconLeft={downloadIcon}>Export FDR</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      <div className="group"><span className="gl">IconButton</span>
        <div className="row">
          <IconButton icon={playIcon} variant="solid" round label="Play" />
          <IconButton icon={downloadIcon} variant="outline" label="Export" />
          <IconButton icon={replayIcon} variant="ghost" label="Replay" />
          <IconButton icon={abortIcon} variant="danger" label="Abort" />
        </div>
      </div>
      <div className="group"><span className="gl">Inputs, Select & Switch</span>
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 170 }}><Input label="Pilot mass" data suffix="kg" defaultValue="88" hint="Target 80–95" /></div>
          <div style={{ width: 170 }}><Input label="Exit altitude" data suffix="m" error="Above 5000 m" defaultValue="5400" /></div>
          <div style={{ width: 170 }}><Select label="Pilot" options={[{ value: '1', label: 'A. Renaud' }, { value: '2', label: 'M. Olsen' }]} /></div>
          <div style={{ paddingTop: 24 }}><Switch label="Record FDR" defaultChecked /></div>
        </div>
      </div>
      <div className="group"><span className="gl">SegmentedControl — view switcher</span>
        <div className="row">
          <SegmentedControl ariaLabel="Flight view" defaultValue="live" options={[
            { value: 'live', label: 'Live' },
            { value: 'replay', label: 'Replay' },
            { value: 'analysis', label: 'Analysis', disabled: true },
          ]} />
        </div>
      </div>
      <div className="group"><span className="gl">Textarea</span>
        <div style={{ width: 360 }}><Textarea label="Qualification notes" defaultValue="Bench run completed without storage faults." hint="Stored with the immutable test evidence" /></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
