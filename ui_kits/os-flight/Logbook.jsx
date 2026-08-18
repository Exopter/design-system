/* Sillage Flights — preparation, acquisition handoff, imports, and logbook. */
(function () {
  const { Icon } = window.OSIcons;
  const DS = window.ExopterDesignSystem_4c9fc9;
  const { Badge, Button, Drawer, Input, Select, StatusDot, SuccessState } = DS;

  const INITIAL_FLIGHTS = [
    { id: 'FLT-2026-020', aircraft: 'EXO-001', location: 'Tournon', date: '28 Jul · 18:00', duration: '—', source: 'No data yet', status: 'preparation', state: 'unknown', label: 'Preparation' },
    { id: 'FLT-2026-019', aircraft: 'F-GOCC', location: 'Millau', date: '29 Jul · 08:30', duration: '—', source: 'No data yet', status: 'preparation', state: 'unknown', label: 'Preparation' },
    { id: 'FLT-2026-018', aircraft: 'EXO-001', location: 'Tournon', date: '14 Jun · 09:42', duration: '00:07:12', source: 'ExoFDR', status: 'analysed', state: 'ready', label: 'Analysed' },
    { id: 'FLT-2026-017', aircraft: 'EXO-001', location: 'Gap · Tallard', date: '14 Jun · 08:15', duration: '00:06:48', source: 'ExoFDR', status: 'analysed', state: 'ready', label: 'Analysed' },
    { id: 'FLT-2026-016', aircraft: 'F-GOCC', location: 'Millau', date: '11 Jun · 16:03', duration: '00:05:31', source: 'ExoFDR', status: 'review', state: 'caution', label: 'Sensor flag' },
    { id: 'FLT-2026-015', aircraft: 'WS-TEST-02', location: 'Tournon', date: '09 Jun · 11:27', duration: '00:11:54', source: 'FlySight', status: 'processing', state: 'live', label: 'Processing' },
  ];

  const CSS = `
    .flights-root{padding:22px 24px 30px;max-width:1180px;margin:0 auto}
    .flights-head{display:flex;align-items:flex-end;gap:12px;margin-bottom:14px}.flights-head>div:first-child{flex:1}
    .flights-table-wrap{background:var(--surface-card);border:1px solid var(--border-rule);border-radius:8px;box-shadow:var(--shadow-sm);overflow:hidden}
    .flights-table{width:100%;border-collapse:collapse}.flights-table th{text-align:left;padding:13px 12px 10px;font:600 9px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap}.flights-table td{padding:12px;border-top:1px solid var(--border-rule);font-size:12px;color:var(--text-body);white-space:nowrap}.flights-table tbody tr{cursor:pointer}.flights-table tbody tr:hover{background:var(--surface-hover)}.flights-table tbody tr:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-2px;background:var(--surface-hover)}
    .flights-code{font:700 12px/1.2 var(--font-data);color:var(--text-strong)}
    .flights-source{display:flex;align-items:center;gap:7px;color:var(--text-muted)}
    .flights-prep-row{background:rgba(239,244,242,.44)}
    .flight-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.flight-form-grid>.full{grid-column:1/-1}
    .flight-source-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.flight-source-card{padding:14px;border:1px solid var(--border-rule);border-radius:7px;background:var(--surface-card);text-align:left;cursor:pointer;color:var(--text-body)}.flight-source-card[data-active=true]{border-color:var(--ex-aqua-500);background:var(--surface-hover)}.flight-source-card:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}.flight-source-card strong{display:block;margin:9px 0 4px;color:var(--text-strong)}.flight-source-card span{font-size:12px;line-height:1.4;color:var(--text-muted)}
    .flight-drop{padding:16px;border:1px dashed var(--ex-graphite-400);border-radius:7px;background:var(--surface-panel);text-align:center}.flight-drop strong{display:block;margin-top:7px;color:var(--text-strong)}.flight-drop span{display:block;margin-top:4px;font-size:12px;color:var(--text-muted)}
    .flight-help{padding:11px 12px;border-radius:6px;background:var(--surface-panel);font-size:12px;line-height:1.5;color:var(--text-muted)}
    .flight-detection{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px;border:1px solid var(--ex-field-500);border-radius:7px;background:var(--ex-state-ready-bg)}.flight-detection strong{display:block;margin-top:4px;font:600 13px var(--font-data);color:var(--text-strong)}
    .flight-detail-card{padding:14px;border:1px solid var(--border-rule);border-radius:7px;background:var(--surface-panel)}.flight-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.flight-detail-grid strong{display:block;margin-top:5px;font:600 13px var(--font-data);color:var(--text-strong)}
    .flight-empty-data{padding:18px;border:1px dashed var(--ex-graphite-400);border-radius:7px;text-align:center}.flight-empty-data strong{display:block;margin:8px 0 5px;color:var(--text-strong)}.flight-empty-data p{margin:0;font-size:12px;line-height:1.45;color:var(--text-muted)}
    @media(max-width:900px){.flights-table-wrap{overflow:auto}.flights-table{min-width:920px}.flight-source-grid,.flight-form-grid,.flight-detection{grid-template-columns:1fr}.flight-form-grid>.full{grid-column:auto}}
  `;
  if (!document.getElementById('flights-screen-css')) { const s=document.createElement('style');s.id='flights-screen-css';s.textContent=CSS;document.head.appendChild(s); }

  const EYEBROW = { fontFamily:'var(--font-mono)',fontSize:10,fontWeight:600,letterSpacing:'.09em',textTransform:'uppercase',color:'var(--text-muted)' };
  const LEAD = { margin:'4px 0 0',fontSize:13,color:'var(--text-muted)' };

  function Logbook({ flights, onFlightsChange, onOpen, onOpenSignal }) {
    const [query, setQuery] = React.useState('');
    const [drawer, setDrawer] = React.useState(null);
    const [target, setTarget] = React.useState(null);
    const [notice, setNotice] = React.useState('');
    const rows = flights.filter((f) => `${f.id} ${f.aircraft} ${f.location}`.toLowerCase().includes(query.toLowerCase()));

    const nextId = () => {
      const max = flights.reduce((n,f) => Math.max(n, Number(f.id.split('-').pop()) || 0), 0);
      return `FLT-2026-${String(max + 1).padStart(3,'0')}`;
    };
    const openImport = (flight=null) => { setTarget(flight); setDrawer('import'); };
    const openRow = (flight) => {
      if (flight.status === 'preparation') { setTarget(flight); setDrawer('detail'); }
      else onOpen(flight);
    };
    const createFlight = ({ aircraft, location, date }) => {
      const created = { id:nextId(), aircraft, location, date, duration:'—', source:'No data yet', status:'preparation', state:'unknown', label:'Preparation' };
      onFlightsChange([created, ...flights]);
      setNotice(`${created.id} created in Preparation`);
      return created;
    };
    const importData = ({ aircraft, source }) => {
      if (target) {
        onFlightsChange(flights.map((f) => f.id === target.id ? { ...f, source, status:'processing', state:'live', label:'Processing' } : f));
        setNotice(`${source} data attached to ${target.id}`);
      } else {
        const created = { id:nextId(), aircraft, location:'Not recorded', date:'28 Jul · 16:15', duration:'—', source, status:'processing', state:'live', label:'Processing' };
        onFlightsChange([created, ...flights]);
        setNotice(`${created.id} created and processing`);
      }
    };
    return <div className="flights-root">
      <div className="flights-head">
        <div><h1 style={{margin:0,fontSize:24,color:'var(--text-strong)'}}>Flights</h1><p style={LEAD}>Prepare a flight, acquire it live, or import data from the field.</p></div>
        <div style={{width:235}}><Input prefix={<Icon name="search" size={16}/>} placeholder="Search flight, aircraft, location" value={query} onChange={(e)=>setQuery(e.target.value)}/></div>
        <Button variant="secondary" iconLeft={<Icon name="upload" size={17}/>} onClick={()=>openImport()}>Import data</Button>
        <Button iconLeft={<Icon name="plus" size={17}/>} onClick={()=>{setTarget(null);setDrawer('create');}}>New flight</Button>
      </div>
      {notice && <div style={{display:'flex',justifyContent:'flex-end',marginBottom:10}}><Badge tone="ready">{notice}</Badge></div>}
      <div className="flights-table-wrap"><table className="flights-table"><thead><tr><th>Flight</th><th>Aircraft</th><th>Location</th><th>Date</th><th>Duration</th><th>Source</th><th>Status</th><th/></tr></thead><tbody>{rows.map((f)=><tr key={f.id} className={f.status==='preparation'?'flights-prep-row':''} tabIndex="0" role="button" aria-label={`Open flight ${f.id}`} onClick={()=>openRow(f)} onKeyDown={(event)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openRow(f);}}}><td><strong className="flights-code">{f.id}</strong></td><td><strong style={{fontFamily:'var(--font-data)'}}>{f.aircraft}</strong></td><td>{f.location}</td><td style={{fontFamily:'var(--font-data)',color:'var(--text-muted)'}}>{f.date}</td><td style={{fontFamily:'var(--font-data)'}}>{f.duration}</td><td><span className="flights-source"><Icon name={f.source==='FlySight'?'activity':f.source==='ExoFDR'?'file-text':f.source==='Live session'?'radio':'clock'} size={14}/>{f.source}</span></td><td><StatusDot state={f.state} label={f.label}/></td><td style={{textAlign:'right',color:'var(--text-muted)'}}><Icon name="chevron-right" size={16}/></td></tr>)}</tbody></table></div>
      {drawer && <FlightDrawer mode={drawer} flight={target} flights={flights} onClose={()=>setDrawer(null)} onCreate={createFlight} onImport={importData} onOpenImport={()=>openImport(target)} onOpenSignal={()=>{setDrawer(null);onOpenSignal(target);}}/>}
    </div>;
  }

  function FlightDrawer({ mode, flight, onClose, onCreate, onImport, onOpenImport, onOpenSignal }) {
    const [saved, setSaved] = React.useState(false);
    const [aircraft, setAircraft] = React.useState(flight?.aircraft || 'EXO-001');
    const [location, setLocation] = React.useState(flight?.location || 'Tournon');
    const [date, setDate] = React.useState('30 Jul 2026 · 09:00');
    const [source, setSource] = React.useState('ExoFDR');
    const title = mode==='create'?'Create flight':mode==='import'?'Import flight data':`${flight.id} · Preparation`;
    const eyebrow = mode==='create'?'Flight planning':mode==='import'?'SD card import':'Prepared flight';
    if (saved) return <Drawer ariaLabel="Flight saved" onClose={onClose}><SuccessState title={mode==='create'?'Flight ready for preparation':'Import started'} description={mode==='create'?'The flight is now available for data import or a linked Signal session.':'The source files are attached and the flight has moved to Processing.'} action={<Button autoFocus onClick={onClose}>Done</Button>}/></Drawer>;
    const commit = () => { if(mode==='create') onCreate({aircraft,location,date}); else onImport({aircraft,source}); setSaved(true); };
    return <Drawer title={title} eyebrow={eyebrow} description={mode==='create'?'Associate an aircraft before acquisition.':mode==='import'?'Import FlySight or ExoFDR files from removable media.':'No telemetry has been attached yet.'} onClose={onClose} footer={mode==='detail'?<><Button variant="secondary" iconLeft={<Icon name="upload" size={16}/>} onClick={onOpenImport}>Import data</Button><Button iconLeft={<Icon name="radio" size={16}/>} onClick={onOpenSignal}>Start Signal session</Button></>:<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button onClick={commit}>{mode==='create'?'Create in Preparation':'Start import'}</Button></>}>
        {mode==='detail' ? <PreparationDetail flight={flight}/> : mode==='create' ? <div className="flight-form-grid"><SelectField label="Aircraft" value={aircraft} onChange={setAircraft} options={['EXO-001','F-GOCC','WS-TEST-02']}/><Field label="Location" value={location} onChange={setLocation}/><Field full label="Planned date and time" value={date} onChange={setDate}/><div className="flight-help" style={{gridColumn:'1/-1'}}>The flight starts in Preparation. Data can arrive later from Signal, FlySight, or an ExoFDR SD card.</div></div> : <ImportForm flight={flight} aircraft={aircraft} source={source} onAircraft={setAircraft} onSource={setSource}/>}
    </Drawer>;
  }

  function PreparationDetail({flight}) { return <><div className="flight-detail-card"><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}><StatusDot state="unknown" label="Preparation"/><div style={{flex:1}}/><Badge tone="neutral">No source attached</Badge></div><div className="flight-detail-grid"><Mini label="Aircraft" value={flight.aircraft}/><Mini label="Location" value={flight.location}/><Mini label="Planned" value={flight.date}/><Mini label="Flight ID" value={flight.id}/></div></div><div className="flight-empty-data"><Icon name="radio" size={22}/><strong>Ready for acquisition</strong><p>Start Signal to attach live telemetry automatically, or import FlySight / ExoFDR files from an SD card.</p></div><div className="flight-help">Signal will inherit this Flight ID and aircraft. The local recorder remains authoritative during the session.</div></>; }

  function ImportForm({flight,aircraft,source,onAircraft,onSource}) { return <><div><span style={EYEBROW}>Data source</span><div className="flight-source-grid" style={{marginTop:9}}><button type="button" className="flight-source-card" data-active={source==='ExoFDR'} aria-pressed={source==='ExoFDR'} onClick={()=>onSource('ExoFDR')}><Icon name="file-text" size={20}/><strong>ExoFDR</strong><span>Recorder package copied from the FDR SD card.</span></button><button type="button" className="flight-source-card" data-active={source==='FlySight'} aria-pressed={source==='FlySight'} onClick={()=>onSource('FlySight')}><Icon name="activity" size={20}/><strong>FlySight</strong><span>Track files copied from the FlySight removable storage.</span></button></div></div><div className="flight-drop"><Icon name="upload" size={20}/><strong>{source==='ExoFDR'?'FDR_20260728_1615.zip':'TRACK.CSV + SENSOR.CSV'}</strong><span>SD card detected · files ready to import</span></div>{flight?<div className="flight-detail-card"><span style={EYEBROW}>Attach to prepared flight</span><div className="flight-detail-grid" style={{marginTop:11}}><Mini label="Flight" value={flight.id}/><Mini label="Aircraft" value={flight.aircraft}/><Mini label="Location" value={flight.location}/><Mini label="Next status" value="Processing"/></div></div>:<><div className="flight-detection"><div><span style={EYEBROW}>Aircraft detected</span><strong>EXO-001 · device EXOFDR-014</strong></div></div><div className="flight-form-grid"><SelectField label="Aircraft" value={aircraft} onChange={onAircraft} options={['EXO-001','F-GOCC','WS-TEST-02','To complete']}/></div><div className="flight-help">Direct import creates a Flight automatically. Confirm the detected aircraft or select it before processing.</div></>}</>; }

  function Mini({label,value}) { return <div><span style={EYEBROW}>{label}</span><strong>{value}</strong></div>; }
  function Field({label,value,onChange,full}) { return <Input className={full?'full':''} label={label} value={value} onChange={(e)=>onChange(e.target.value)}/>; }
  function SelectField({label,value,onChange,options}) { return <Select label={label} value={value} onChange={(e)=>onChange(e.target.value)} options={options.map((option)=>({value:option,label:option}))}/>; }

  window.OSLogbook = { Logbook, INITIAL_FLIGHTS };
})();
