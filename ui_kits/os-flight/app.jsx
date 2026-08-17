import './icons.jsx';
import './Shell.jsx';
import './Logbook.jsx';
import './Replay.jsx';
import './FlightPrep.jsx';
import './Hud.jsx';
import './Hangar.jsx';
import './Signal.jsx';

const { Shell } = window.OSShell;
const { Logbook, INITIAL_FLIGHTS } = window.OSLogbook;
const { Replay } = window.OSReplay;
const { FlightPrep } = window.OSFlightPrep;
const { Hud } = window.OSHud;
const { Hangar } = window.OSHangar;
const { Signal } = window.OSSignal;

const SUBTABS = [
  { id: 'logbook', label: 'Flights' },
  { id: 'prep', label: 'Flight prep' },
  { id: 'hud', label: 'HUD' },
];

function App() {
  const [room, setRoom] = React.useState('flight');
  const [sub, setSub] = React.useState('logbook');
  const [flight, setFlight] = React.useState(null);
  const [flights, setFlights] = React.useState(INITIAL_FLIGHTS);
  const [signalFlight, setSignalFlight] = React.useState(null);

  const openFlight = (selectedFlight) => { setFlight(selectedFlight); setSub('replay'); };
  const openSignalForFlight = (selectedFlight) => {
    const live = { ...selectedFlight, source: 'Live session', status: 'live', state: 'live', label: 'Live' };
    setFlights((rows) => rows.map((row) => (row.id === selectedFlight.id ? live : row)));
    setSignalFlight(live);
    setRoom('signal');
  };
  const startSignalSession = ({ mode, flightId, aircraft }) => {
    if (mode === 'existing') {
      const prepared = flights.find((candidate) => candidate.id === flightId);
      if (prepared) openSignalForFlight(prepared);
      return;
    }
    const max = flights.reduce((number, candidate) => Math.max(number, Number(candidate.id.split('-').pop()) || 0), 0);
    const created = {
      id: `FLT-2026-${String(max + 1).padStart(3, '0')}`,
      aircraft: aircraft || 'To complete',
      location: 'Not recorded',
      date: '28 Jul · now',
      duration: 'Live',
      source: 'Live session',
      status: 'live',
      state: 'live',
      label: 'Live',
    };
    setFlights((rows) => [created, ...rows]);
    setSignalFlight(created);
  };
  const endSignalSession = () => {
    if (signalFlight) {
      setFlights((rows) => rows.map((candidate) => (
        candidate.id === signalFlight.id
          ? { ...candidate, duration: '00:06:32', status: 'processing', state: 'live', label: 'Processing' }
          : candidate
      )));
    }
    setSignalFlight(null);
  };

  let title = 'Flights';
  let crumb = 'Operations';
  if (room === 'flight') {
    if (sub === 'prep') { title = 'Flight prep'; crumb = 'Pre-flight'; }
    if (sub === 'replay') { title = flight ? flight.id : 'Replay'; crumb = 'Replay & analysis'; }
    if (sub === 'hud') { title = 'HUD preview'; crumb = 'Pilot display'; }
  } else if (room === 'hangar') {
    title = 'Fleet configuration'; crumb = 'Hangar';
  } else if (room === 'signal') {
    title = signalFlight ? signalFlight.id : 'Signal sessions'; crumb = 'Signal';
  }

  let body;
  if (room === 'hangar') {
    body = <Hangar onOpenSignal={() => setRoom('signal')} />;
  } else if (room === 'signal') {
    body = <Signal activeFlight={signalFlight} preparationFlights={flights.filter((candidate) => candidate.status === 'preparation')} onStartSession={startSignalSession} onEndSession={endSignalSession} />;
  } else if (sub === 'replay') {
    body = <Replay flight={flight} onBack={() => setSub('logbook')} />;
  } else {
    body = (
      <div>
        <div className="subtabs">
          {SUBTABS.map((tab) => (
            <button key={tab.id} type="button" className="subtab" data-active={sub === tab.id} aria-pressed={sub === tab.id} onClick={() => setSub(tab.id)}>{tab.label}</button>
          ))}
        </div>
        {sub === 'logbook' && <Logbook flights={flights} onFlightsChange={setFlights} onOpen={openFlight} onOpenSignal={openSignalForFlight} />}
        {sub === 'prep' && <FlightPrep />}
        {sub === 'hud' && <Hud />}
      </div>
    );
  }

  return (
    <Shell room={room} onRoom={(selectedRoom) => { setRoom(selectedRoom); if (selectedRoom === 'flight') setSub('logbook'); }} title={title} crumb={crumb}>
      {body}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
