const { Button, Input, Select } = window.ExopterDesignSystem_4c9fc9;

function Demo() {
  const [dark, setDark] = React.useState(false);
  const [message, setMessage] = React.useState('Hover, focus or press a control to inspect its feedback.');
  const [altitude, setAltitude] = React.useState('4200');
  const [saved, setSaved] = React.useState(false);
  const invalidAltitude = altitude === '' || Number(altitude) < 1000 || Number(altitude) > 5000;
  const variants = [
    ['primary', 'Prepare session', 'One clear next action.'],
    ['secondary', 'Export flight', 'Supporting actions, defined edges.'],
    ['ghost', 'View details', 'Quiet actions in dense interfaces.'],
    ['danger', 'Discard draft', 'Reserved for destructive actions.'],
  ];
  return <div className={`workbench ${dark ? 'ex-dark' : ''}`}>
    <header className="masthead"><div className="shell">
      <div className="wordmark"><img src={dark ? '../../assets/logo-mark-white.svg' : '../../assets/logo-mark.svg'} alt="" />EXOPTER</div>
      <div className="header-actions"><span className="edition">Design system / proposal</span><Button variant="secondary" size="sm" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? 'Light surface' : 'Dark surface'}</Button></div>
    </div></header>
    <main className="shell">
      <section className="intro"><div><span className="eyebrow">01 / Interaction foundations</span><h1>Precision at your fingertips.</h1><p>A sharper control language for Exopter. Quiet surfaces, deliberate actions and legible flight data.</p></div><div className="principles"><strong>Built like an instrument.</strong>Less rounding. More definition.<br />Colour communicates intent.<br />Every interaction has a clear state.</div></section>
      <div className="token-strip">{[['Control radius','2 px'],['Surface radius','4 px'],['Control height','44 px'],['Spacing unit','4 px']].map(([label,value]) => <div className="token" key={label}><span className="token-label">{label}</span><b>{value}</b></div>)}</div>
      <section aria-labelledby="buttons-title"><div className="section-head"><span className="section-index">01</span><h2 id="buttons-title">Buttons with intent</h2><p>Solid, outlined, quiet and destructive.</p></div>
        <div className="specimen"><div className="button-grid">{variants.map(([variant,label,description]) => <div className="button-cell" key={variant}><span className="sample-label">{variant}</span><Button variant={variant} onClick={() => setMessage(`${label}: demonstration only. No flight data changed.`)}>{label}</Button><p>{description}</p></div>)}</div>
        <div className="specimen-footer"><span className="sample-label">Size & availability</span><Button size="sm" variant="secondary" onClick={() => setMessage('Compact control: 32 px.')}>Compact</Button><Button variant="secondary" onClick={() => setMessage('Standard control: 44 px.')}>Standard</Button><Button size="lg" variant="secondary" onClick={() => setMessage('Large control: 48 px.')}>Large</Button><Button disabled>Unavailable</Button></div><div className="specimen-footer"><p className="feedback" role="status">{message}</p></div></div>
      </section>
      <section aria-labelledby="inputs-title"><div className="section-head"><span className="section-index">02</span><h2 id="inputs-title">Fields that read clearly</h2><p>Persistent labels. Distinct units. Explicit feedback.</p></div>
        <div className="specimen fields-grid"><Input label="Session name" placeholder="Enter a session name" hint="A label you can find after landing." /><Input label="Pilot mass" type="number" data suffix="kg" defaultValue="88" hint="Units stay separate from the value." /><Input label="Flight reference" prefix="ID" defaultValue="EX-0248" hint="Tab through fields to inspect focus." /><Input label="Exit altitude" type="number" data suffix="m" defaultValue="5400" error="Enter an altitude between 1,000 and 5,000 m." /><Input label="Recorder serial" defaultValue="FDR-0084" disabled hint="Read from the connected recorder." /><Select label="Recording profile" options={[{value:'standard',label:'Standard / 100 Hz'},{value:'high',label:'High rate / 200 Hz'}]} /></div>
      </section>
      <section aria-labelledby="context-title"><div className="section-head"><span className="section-index">03</span><h2 id="context-title">In context</h2><p>A small interaction to feel the system.</p></div><div className="specimen lab"><div className="lab-description"><span className="eyebrow">Session setup / local demo</span><h3>Ready before the first move.</h3><p>Try an altitude outside the allowed range, then save your setup. The same controls carry through from the workbench to the product.</p></div><form onSubmit={event => {event.preventDefault();setSaved(!invalidAltitude);}}>
        <Input label="Session label" required defaultValue="Morning flight" onChange={() => setSaved(false)} />
        <div className="lab-row"><Input label="Planned exit altitude" type="number" data suffix="m" value={altitude} onChange={event => {setAltitude(event.target.value);setSaved(false);}} error={invalidAltitude ? 'Use 1,000 to 5,000 m.' : ''} hint={!invalidAltitude ? 'Within the demo range.' : ''} /><Select label="Flight mode" onChange={() => setSaved(false)} options={[{value:'training',label:'Training'},{value:'evaluation',label:'Evaluation'}]} /></div>
        <div className="form-actions"><Button type="submit" disabled={invalidAltitude}>Save setup</Button><Button variant="ghost" type="reset" onClick={() => {setAltitude('4200');setSaved(false);}}>Reset</Button></div><p className="feedback" role="status">{saved ? 'Setup saved for this preview. No device connected.' : 'Preview only. Values remain in this page.'}</p>
      </form></div></section>
      <footer className="page-footer"><span>EXOPTER / CONTROL LANGUAGE</span><a href="../../index.html">Explore the component catalogue</a><span>LOCAL PROPOSAL / NOV 2026</span></footer>
    </main>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
