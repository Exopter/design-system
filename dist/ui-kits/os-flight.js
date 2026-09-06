"use strict";
(() => {
  // ui_kits/os-flight/icons.jsx
  (function() {
    const P = {
      gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
      activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
      plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
      map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M9 4v13"/><path d="M15 7v13"/>',
      radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>',
      battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11v2"/><path d="M10 11v2"/>',
      thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      "triangle-alert": '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
      "octagon-x": '<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
      play: '<polygon points="6 3 20 12 6 21 6 3"/>',
      pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
      "rotate-ccw": '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
      download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
      upload: '<path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
      "clipboard-check": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
      shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
      wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
      crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>',
      "chevron-right": '<path d="m9 18 6-6-6-6"/>',
      layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
      search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
      plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
      x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
      signal: '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',
      wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
      "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
      menu: '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>'
    };
    function Icon({ name, size = 18, strokeWidth = 2, className = "", style }) {
      return React.createElement("svg", {
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        style,
        dangerouslySetInnerHTML: { __html: P[name] || "" }
      });
    }
    window.OSIcons = { Icon, paths: P };
  })();

  // ui_kits/os-flight/Shell.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Badge } = DS;
    const ROOMS = [
      { id: "flight", label: "Flights", icon: "plane" },
      { id: "hangar", label: "Hangar", icon: "wrench" },
      { id: "signal", label: "Signal", icon: "signal", separated: true }
    ];
    function Rail({ room, onRoom }) {
      return /* @__PURE__ */ React.createElement("nav", { style: {
        width: 64,
        flex: "none",
        background: "var(--ex-carbon-950)",
        color: "var(--ex-vapor-50)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "14px 0",
        gap: 6,
        borderRight: "1px solid var(--ex-carbon-700)"
      } }, /* @__PURE__ */ React.createElement("a", { className: "shell-home-link", href: "../../index.html", title: "Design system", style: { marginBottom: 10, display: "flex", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("img", { src: "../../assets/app-icon.svg", alt: "Exopter", style: { width: 30, height: 30, borderRadius: 7 } })), ROOMS.map((r) => {
        const active = r.id === room;
        return /* @__PURE__ */ React.createElement(React.Fragment, { key: r.id }, r.separated && /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: { width: 32, height: 1, margin: "7px 0", background: "var(--ex-carbon-700)" } }), /* @__PURE__ */ React.createElement("button", { type: "button", className: "shell-room-button", title: r.label, "aria-current": active ? "page" : void 0, onClick: () => onRoom(r.id), style: {
          width: 44,
          height: 44,
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: active ? "var(--ex-carbon-800)" : "transparent",
          color: active ? "var(--ex-aqua-500)" : "var(--ex-graphite-400)",
          transition: "background .18s, color .18s"
        } }, /* @__PURE__ */ React.createElement(Icon, { name: r.icon, size: 18 }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: ".06em", textTransform: "uppercase" } }, r.label)));
      }));
    }
    function Header({ title, crumb, onRoom }) {
      return /* @__PURE__ */ React.createElement("header", { style: {
        height: 56,
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 20px",
        background: "var(--ex-carbon-900)",
        color: "var(--ex-vapor-50)",
        borderBottom: "1px solid var(--ex-carbon-700)"
      } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", lineHeight: 1.15 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ex-graphite-400)" } }, "Sillage · ", crumb), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 600 } }, title)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("div", { className: "ex-dark" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "signal-status-link",
          onClick: () => onRoom("signal"),
          "aria-label": "Open Signal",
          title: "Open Signal"
        },
        /* @__PURE__ */ React.createElement(Badge, { tone: "live" }, "Station 01 connected")
      )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingLeft: 4 } }, /* @__PURE__ */ React.createElement("span", { style: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "var(--ex-field-500)",
        color: "var(--ex-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 600
      } }, "AR")));
    }
    function Shell2({ room, onRoom, title, crumb, children }) {
      return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", height: "100%", minHeight: 0, background: "var(--surface-app)" } }, /* @__PURE__ */ React.createElement(Rail, { room, onRoom }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement(Header, { title, crumb, onRoom }), /* @__PURE__ */ React.createElement("main", { style: { flex: 1, minHeight: 0, overflow: "auto" } }, children)));
    }
    window.OSShell = { Shell: Shell2, ROOMS };
  })();

  // ui_kits/os-flight/Logbook.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Badge, Button, Drawer, Input, Select, StatusDot, SuccessState } = DS;
    const INITIAL_FLIGHTS2 = [
      { id: "FLT-2026-020", aircraft: "EXO-001", location: "Tournon", date: "28 Jul · 18:00", duration: "—", source: "No data yet", status: "preparation", state: "unknown", label: "Preparation" },
      { id: "FLT-2026-019", aircraft: "F-GOCC", location: "Millau", date: "29 Jul · 08:30", duration: "—", source: "No data yet", status: "preparation", state: "unknown", label: "Preparation" },
      { id: "FLT-2026-018", aircraft: "EXO-001", location: "Tournon", date: "14 Jun · 09:42", duration: "00:07:12", source: "ExoFDR", status: "analysed", state: "ready", label: "Analysed" },
      { id: "FLT-2026-017", aircraft: "EXO-001", location: "Gap · Tallard", date: "14 Jun · 08:15", duration: "00:06:48", source: "ExoFDR", status: "analysed", state: "ready", label: "Analysed" },
      { id: "FLT-2026-016", aircraft: "F-GOCC", location: "Millau", date: "11 Jun · 16:03", duration: "00:05:31", source: "ExoFDR", status: "review", state: "caution", label: "Sensor flag" },
      { id: "FLT-2026-015", aircraft: "WS-TEST-02", location: "Tournon", date: "09 Jun · 11:27", duration: "00:11:54", source: "FlySight", status: "processing", state: "live", label: "Processing" }
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
    if (!document.getElementById("flights-screen-css")) {
      const s = document.createElement("style");
      s.id = "flights-screen-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    const EYEBROW = { fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--text-muted)" };
    const LEAD = { margin: "4px 0 0", fontSize: 13, color: "var(--text-muted)" };
    function Logbook2({ flights, onFlightsChange, onOpen, onOpenSignal }) {
      const [query, setQuery] = React.useState("");
      const [drawer, setDrawer] = React.useState(null);
      const [target, setTarget] = React.useState(null);
      const [notice, setNotice] = React.useState("");
      const rows = flights.filter((f) => `${f.id} ${f.aircraft} ${f.location}`.toLowerCase().includes(query.toLowerCase()));
      const nextId = () => {
        const max = flights.reduce((n, f) => Math.max(n, Number(f.id.split("-").pop()) || 0), 0);
        return `FLT-2026-${String(max + 1).padStart(3, "0")}`;
      };
      const openImport = (flight = null) => {
        setTarget(flight);
        setDrawer("import");
      };
      const openRow = (flight) => {
        if (flight.status === "preparation") {
          setTarget(flight);
          setDrawer("detail");
        } else onOpen(flight);
      };
      const createFlight = ({ aircraft, location, date }) => {
        const created = { id: nextId(), aircraft, location, date, duration: "—", source: "No data yet", status: "preparation", state: "unknown", label: "Preparation" };
        onFlightsChange([created, ...flights]);
        setNotice(`${created.id} created in Preparation`);
        return created;
      };
      const importData = ({ aircraft, source }) => {
        if (target) {
          onFlightsChange(flights.map((f) => f.id === target.id ? { ...f, source, status: "processing", state: "live", label: "Processing" } : f));
          setNotice(`${source} data attached to ${target.id}`);
        } else {
          const created = { id: nextId(), aircraft, location: "Not recorded", date: "28 Jul · 16:15", duration: "—", source, status: "processing", state: "live", label: "Processing" };
          onFlightsChange([created, ...flights]);
          setNotice(`${created.id} created and processing`);
        }
      };
      return /* @__PURE__ */ React.createElement("div", { className: "flights-root" }, /* @__PURE__ */ React.createElement("div", { className: "flights-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { style: { margin: 0, fontSize: 24, color: "var(--text-strong)" } }, "Flights"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Prepare a flight, acquire it live, or import data from the field.")), /* @__PURE__ */ React.createElement("div", { style: { width: 235 } }, /* @__PURE__ */ React.createElement(Input, { prefix: /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 16 }), placeholder: "Search flight, aircraft, location", value: query, onChange: (e) => setQuery(e.target.value) })), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "upload", size: 17 }), onClick: () => openImport() }, "Import data"), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), onClick: () => {
        setTarget(null);
        setDrawer("create");
      } }, "New flight")), notice && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 10 } }, /* @__PURE__ */ React.createElement(Badge, { tone: "ready" }, notice)), /* @__PURE__ */ React.createElement("div", { className: "flights-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "flights-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Flight"), /* @__PURE__ */ React.createElement("th", null, "Aircraft"), /* @__PURE__ */ React.createElement("th", null, "Location"), /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", null, "Duration"), /* @__PURE__ */ React.createElement("th", null, "Source"), /* @__PURE__ */ React.createElement("th", null, "Status"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((f) => /* @__PURE__ */ React.createElement("tr", { key: f.id, className: f.status === "preparation" ? "flights-prep-row" : "", tabIndex: "0", role: "button", "aria-label": `Open flight ${f.id}`, onClick: () => openRow(f), onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRow(f);
        }
      } }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", { className: "flights-code" }, f.id)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", { style: { fontFamily: "var(--font-data)" } }, f.aircraft)), /* @__PURE__ */ React.createElement("td", null, f.location), /* @__PURE__ */ React.createElement("td", { style: { fontFamily: "var(--font-data)", color: "var(--text-muted)" } }, f.date), /* @__PURE__ */ React.createElement("td", { style: { fontFamily: "var(--font-data)" } }, f.duration), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "flights-source" }, /* @__PURE__ */ React.createElement(Icon, { name: f.source === "FlySight" ? "activity" : f.source === "ExoFDR" ? "file-text" : f.source === "Live session" ? "radio" : "clock", size: 14 }), f.source)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(StatusDot, { state: f.state, label: f.label })), /* @__PURE__ */ React.createElement("td", { style: { textAlign: "right", color: "var(--text-muted)" } }, /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 16 }))))))), drawer && /* @__PURE__ */ React.createElement(FlightDrawer, { mode: drawer, flight: target, flights, onClose: () => setDrawer(null), onCreate: createFlight, onImport: importData, onOpenImport: () => openImport(target), onOpenSignal: () => {
        setDrawer(null);
        onOpenSignal(target);
      } }));
    }
    function FlightDrawer({ mode, flight, onClose, onCreate, onImport, onOpenImport, onOpenSignal }) {
      const [saved, setSaved] = React.useState(false);
      const [aircraft, setAircraft] = React.useState(flight?.aircraft || "EXO-001");
      const [location, setLocation] = React.useState(flight?.location || "Tournon");
      const [date, setDate] = React.useState("30 Jul 2026 · 09:00");
      const [source, setSource] = React.useState("ExoFDR");
      const title = mode === "create" ? "Create flight" : mode === "import" ? "Import flight data" : `${flight.id} · Preparation`;
      const eyebrow = mode === "create" ? "Flight planning" : mode === "import" ? "SD card import" : "Prepared flight";
      if (saved) return /* @__PURE__ */ React.createElement(Drawer, { ariaLabel: "Flight saved", onClose }, /* @__PURE__ */ React.createElement(SuccessState, { title: mode === "create" ? "Flight ready for preparation" : "Import started", description: mode === "create" ? "The flight is now available for data import or a linked Signal session." : "The source files are attached and the flight has moved to Processing.", action: /* @__PURE__ */ React.createElement(Button, { autoFocus: true, onClick: onClose }, "Done") }));
      const commit = () => {
        if (mode === "create") onCreate({ aircraft, location, date });
        else onImport({ aircraft, source });
        setSaved(true);
      };
      return /* @__PURE__ */ React.createElement(Drawer, { title, eyebrow, description: mode === "create" ? "Associate an aircraft before acquisition." : mode === "import" ? "Import FlySight or ExoFDR files from removable media." : "No telemetry has been attached yet.", onClose, footer: mode === "detail" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "upload", size: 16 }), onClick: onOpenImport }, "Import data"), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "radio", size: 16 }), onClick: onOpenSignal }, "Start Signal session")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: onClose }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: commit }, mode === "create" ? "Create in Preparation" : "Start import")) }, mode === "detail" ? /* @__PURE__ */ React.createElement(PreparationDetail, { flight }) : mode === "create" ? /* @__PURE__ */ React.createElement("div", { className: "flight-form-grid" }, /* @__PURE__ */ React.createElement(SelectField, { label: "Aircraft", value: aircraft, onChange: setAircraft, options: ["EXO-001", "F-GOCC", "WS-TEST-02"] }), /* @__PURE__ */ React.createElement(Field, { label: "Location", value: location, onChange: setLocation }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Planned date and time", value: date, onChange: setDate }), /* @__PURE__ */ React.createElement("div", { className: "flight-help", style: { gridColumn: "1/-1" } }, "The flight starts in Preparation. Data can arrive later from Signal, FlySight, or an ExoFDR SD card.")) : /* @__PURE__ */ React.createElement(ImportForm, { flight, aircraft, source, onAircraft: setAircraft, onSource: setSource }));
    }
    function PreparationDetail({ flight }) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flight-detail-card" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(StatusDot, { state: "unknown", label: "Preparation" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, "No source attached")), /* @__PURE__ */ React.createElement("div", { className: "flight-detail-grid" }, /* @__PURE__ */ React.createElement(Mini, { label: "Aircraft", value: flight.aircraft }), /* @__PURE__ */ React.createElement(Mini, { label: "Location", value: flight.location }), /* @__PURE__ */ React.createElement(Mini, { label: "Planned", value: flight.date }), /* @__PURE__ */ React.createElement(Mini, { label: "Flight ID", value: flight.id }))), /* @__PURE__ */ React.createElement("div", { className: "flight-empty-data" }, /* @__PURE__ */ React.createElement(Icon, { name: "radio", size: 22 }), /* @__PURE__ */ React.createElement("strong", null, "Ready for acquisition"), /* @__PURE__ */ React.createElement("p", null, "Start Signal to attach live telemetry automatically, or import FlySight / ExoFDR files from an SD card.")), /* @__PURE__ */ React.createElement("div", { className: "flight-help" }, "Signal will inherit this Flight ID and aircraft. The local recorder remains authoritative during the session."));
    }
    function ImportForm({ flight, aircraft, source, onAircraft, onSource }) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Data source"), /* @__PURE__ */ React.createElement("div", { className: "flight-source-grid", style: { marginTop: 9 } }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "flight-source-card", "data-active": source === "ExoFDR", "aria-pressed": source === "ExoFDR", onClick: () => onSource("ExoFDR") }, /* @__PURE__ */ React.createElement(Icon, { name: "file-text", size: 20 }), /* @__PURE__ */ React.createElement("strong", null, "ExoFDR"), /* @__PURE__ */ React.createElement("span", null, "Recorder package copied from the FDR SD card.")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "flight-source-card", "data-active": source === "FlySight", "aria-pressed": source === "FlySight", onClick: () => onSource("FlySight") }, /* @__PURE__ */ React.createElement(Icon, { name: "activity", size: 20 }), /* @__PURE__ */ React.createElement("strong", null, "FlySight"), /* @__PURE__ */ React.createElement("span", null, "Track files copied from the FlySight removable storage.")))), /* @__PURE__ */ React.createElement("div", { className: "flight-drop" }, /* @__PURE__ */ React.createElement(Icon, { name: "upload", size: 20 }), /* @__PURE__ */ React.createElement("strong", null, source === "ExoFDR" ? "FDR_20260728_1615.zip" : "TRACK.CSV + SENSOR.CSV"), /* @__PURE__ */ React.createElement("span", null, "SD card detected · files ready to import")), flight ? /* @__PURE__ */ React.createElement("div", { className: "flight-detail-card" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Attach to prepared flight"), /* @__PURE__ */ React.createElement("div", { className: "flight-detail-grid", style: { marginTop: 11 } }, /* @__PURE__ */ React.createElement(Mini, { label: "Flight", value: flight.id }), /* @__PURE__ */ React.createElement(Mini, { label: "Aircraft", value: flight.aircraft }), /* @__PURE__ */ React.createElement(Mini, { label: "Location", value: flight.location }), /* @__PURE__ */ React.createElement(Mini, { label: "Next status", value: "Processing" }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flight-detection" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Aircraft detected"), /* @__PURE__ */ React.createElement("strong", null, "EXO-001 · device EXOFDR-014"))), /* @__PURE__ */ React.createElement("div", { className: "flight-form-grid" }, /* @__PURE__ */ React.createElement(SelectField, { label: "Aircraft", value: aircraft, onChange: onAircraft, options: ["EXO-001", "F-GOCC", "WS-TEST-02", "To complete"] })), /* @__PURE__ */ React.createElement("div", { className: "flight-help" }, "Direct import creates a Flight automatically. Confirm the detected aircraft or select it before processing.")));
    }
    function Mini({ label, value }) {
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, label), /* @__PURE__ */ React.createElement("strong", null, value));
    }
    function Field({ label, value, onChange, full }) {
      return /* @__PURE__ */ React.createElement(Input, { className: full ? "full" : "", label, value, onChange: (e) => onChange(e.target.value) });
    }
    function SelectField({ label, value, onChange, options }) {
      return /* @__PURE__ */ React.createElement(Select, { label, value, onChange: (e) => onChange(e.target.value), options: options.map((option) => ({ value: option, label: option })) });
    }
    window.OSLogbook = { Logbook: Logbook2, INITIAL_FLIGHTS: INITIAL_FLIGHTS2 };
  })();

  // ui_kits/os-flight/Replay.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { IconButton, Button, MetricTile, Badge, StatusDot } = DS;
    const N = 120;
    const T_TOTAL = 432;
    const samples = Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1);
      const alt = 1520 * (1 - t) + 40 * Math.sin(t * 9) + 30;
      const spd = 198 + 26 * Math.sin(t * 7 + 1) + 8 * Math.sin(t * 21);
      const gld = 12.6 - 1.2 * Math.sin(t * 5 + 0.5);
      const vs = -(4.6 + 1.8 * Math.sin(t * 7 + 1));
      return { alt, spd, gld, vs };
    });
    const fmtT = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    function pathFor(acc, min, max, w, h, pad) {
      return samples.map((s, i) => {
        const x = pad + i / (N - 1) * (w - 2 * pad);
        const y = pad + (1 - (acc(s) - min) / (max - min)) * (h - 2 * pad);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(" ");
    }
    function Replay2({ flight, onBack }) {
      const f = flight || { id: "FLT-2026-018" };
      const [idx, setIdx] = React.useState(Math.floor(N * 0.46));
      const [playing, setPlaying] = React.useState(false);
      const raf = React.useRef(null);
      React.useEffect(() => {
        if (!playing) return;
        let last = performance.now();
        const tick = (now) => {
          const dt = (now - last) / 1e3;
          last = now;
          setIdx((p) => {
            const next = p + dt * (N / T_TOTAL) * 6;
            if (next >= N - 1) {
              setPlaying(false);
              return N - 1;
            }
            return next;
          });
          raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
      }, [playing]);
      const i = Math.round(idx);
      const cur = samples[i];
      const tNow = i / (N - 1) * T_TOTAL;
      const W = 760, H = 240, PAD = 24;
      const altPath = pathFor((s) => s.alt, 0, 1600, W, H, PAD);
      const dotX = PAD + i / (N - 1) * (W - 2 * PAD);
      const dotY = PAD + (1 - cur.alt / 1600) * (H - 2 * PAD);
      const CW = 760, CH = 150, CPAD = 18;
      const spdPath = pathFor((s) => s.spd, 150, 240, CW, CH, CPAD);
      const altMini = pathFor((s) => s.alt, 0, 1600, CW, CH, CPAD);
      const scrubX = CPAD + i / (N - 1) * (CW - 2 * CPAD);
      const events = [
        { t: "00:00", label: "T0 exit · 1520 m", state: "ready" },
        { t: "02:14", label: "Best glide window", state: "live" },
        { t: "04:02", label: "Airspeed dip −12 km/h", state: "caution" },
        { t: "07:12", label: "Flare · landing", state: "ready" }
      ];
      return /* @__PURE__ */ React.createElement("div", { className: "ex-dark", style: { minHeight: "100%", background: "var(--ex-carbon-950)", color: "var(--ex-vapor-50)", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: "1px solid var(--ex-carbon-700)" } }, /* @__PURE__ */ React.createElement(IconButton, { icon: /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 18, style: { transform: "rotate(180deg)" } }), variant: "ghost", label: "Back to logbook", onClick: onBack }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums", fontSize: 17, fontWeight: 600 } }, f.id), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, "Replay"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "activity", size: 18 }) }, "Compare"), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "download", size: 18 }) }, "Export FDR")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, padding: 16, flex: 1, minHeight: 0, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 600px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--ex-carbon-900)", border: "1px solid var(--ex-carbon-700)", borderRadius: 8, padding: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ex-graphite-400)" } }, "Altitude profile · side view"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ex-graphite-400)" } }, "Exit → flare")), /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, style: { width: "100%", height: "auto", display: "block" } }, [0, 0.25, 0.5, 0.75, 1].map((g) => {
        const y = PAD + g * (H - 2 * PAD);
        return /* @__PURE__ */ React.createElement("g", { key: g }, /* @__PURE__ */ React.createElement("line", { x1: PAD, y1: y, x2: W - PAD, y2: y, stroke: "var(--ex-carbon-700)", strokeWidth: "1" }), /* @__PURE__ */ React.createElement("text", { x: 4, y: y + 3, fill: "var(--ex-graphite-600)", fontSize: "9", fontFamily: "var(--font-mono)" }, Math.round(1600 * (1 - g))));
      }), /* @__PURE__ */ React.createElement("path", { d: `${altPath} L ${W - PAD} ${H - PAD} L ${PAD} ${H - PAD} Z`, fill: "color-mix(in srgb, var(--ex-aqua-500) 8%, transparent)", stroke: "none" }), /* @__PURE__ */ React.createElement("path", { d: altPath, fill: "none", stroke: "var(--ex-aqua-500)", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("line", { x1: dotX, y1: PAD, x2: dotX, y2: H - PAD, stroke: "var(--ex-aqua-500)", strokeWidth: "1", strokeDasharray: "3 4", opacity: ".5" }), /* @__PURE__ */ React.createElement("circle", { cx: dotX, cy: dotY, r: "5", fill: "var(--ex-hud-green)", stroke: "var(--ex-carbon-950)", strokeWidth: "1.5" }))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--ex-carbon-900)", border: "1px solid var(--ex-carbon-700)", borderRadius: 8, padding: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, marginBottom: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ex-graphite-400)" } }, "Telemetry"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ex-vapor-50)" } }, /* @__PURE__ */ React.createElement("i", { style: { width: 10, height: 2, background: "var(--ex-sky-500)" } }), " Airspeed"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ex-vapor-50)" } }, /* @__PURE__ */ React.createElement("i", { style: { width: 10, height: 2, background: "var(--ex-aqua-500)" } }), " Altitude")), /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${CW} ${CH}`, style: { width: "100%", height: "auto", display: "block" } }, /* @__PURE__ */ React.createElement("path", { d: altMini, fill: "none", stroke: "var(--ex-aqua-500)", strokeWidth: "1.5", opacity: ".5" }), /* @__PURE__ */ React.createElement("path", { d: spdPath, fill: "none", stroke: "var(--ex-sky-500)", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("line", { x1: scrubX, y1: 4, x2: scrubX, y2: CH - 4, stroke: "var(--ex-hud-green)", strokeWidth: "1" })))), /* @__PURE__ */ React.createElement("div", { style: { flex: "0 0 230px", display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(MetricTile, { label: "Airspeed", value: cur.spd.toFixed(0), unit: "km/h", state: "live", sunken: true }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Altitude", value: cur.alt.toFixed(0), unit: "m", sunken: true }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Glide", value: cur.gld.toFixed(1), unit: "L/D", state: "ready", sunken: true }), /* @__PURE__ */ React.createElement(MetricTile, { label: "V-speed", value: cur.vs.toFixed(1), unit: "m/s", sunken: true })), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--ex-carbon-900)", border: "1px solid var(--ex-carbon-700)", borderRadius: 8, padding: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ex-graphite-400)" } }, "Events"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 } }, events.map((e) => /* @__PURE__ */ React.createElement("div", { key: e.t, style: { display: "flex", gap: 8, alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums", fontSize: 12, color: "var(--ex-graphite-400)", width: 42, flex: "none" } }, e.t), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(StatusDot, { state: e.state, label: e.label })))))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderTop: "1px solid var(--ex-carbon-700)", background: "var(--ex-carbon-900)" } }, /* @__PURE__ */ React.createElement(IconButton, { icon: /* @__PURE__ */ React.createElement(Icon, { name: playing ? "pause" : "play", size: 18 }), variant: "solid", round: true, label: playing ? "Pause" : "Play", onClick: () => setPlaying((p) => !p) }), /* @__PURE__ */ React.createElement(IconButton, { icon: /* @__PURE__ */ React.createElement(Icon, { name: "rotate-ccw", size: 18 }), variant: "ghost", label: "Restart", onClick: () => {
        setIdx(0);
        setPlaying(false);
      } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--ex-hud-green)", width: 52 } }, fmtT(tNow)), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "range",
          min: "0",
          max: N - 1,
          step: "1",
          value: i,
          onChange: (e) => {
            setPlaying(false);
            setIdx(Number(e.target.value));
          },
          style: { flex: 1, accentColor: "var(--ex-aqua-500)", height: 4 }
        }
      ), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--ex-graphite-400)", width: 52, textAlign: "right" } }, fmtT(T_TOTAL))));
    }
    window.OSReplay = { Replay: Replay2 };
  })();

  // ui_kits/os-flight/FlightPrep.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Card, ChecklistRow, ReadinessStrip, MetricTile, Button, Badge } = DS;
    function SafetyGate({ armed, onArm }) {
      return /* @__PURE__ */ React.createElement("div", { style: { border: "2px solid " + (armed ? "var(--ex-field-500)" : "var(--ex-amber-500)"), borderRadius: 8, background: "var(--surface-card)", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { color: armed ? "var(--ex-field-500)" : "var(--ex-amber-500)", display: "flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 18 })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-strong)" } }, "Safety gate · arm system")), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 14px", fontSize: 13, color: "var(--text-muted)", maxWidth: 360 } }, armed ? "System armed. Parachute opening set 1500 m. Disarm before any ground handling." : "Requires human approval. All readiness items must pass before arming. This is a safety-critical action."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, armed ? /* @__PURE__ */ React.createElement(Button, { variant: "danger", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "octagon-x", size: 18 }), onClick: onArm }, "Disarm") : /* @__PURE__ */ React.createElement(Button, { variant: "primary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 18 }), disabled: true, title: "Resolve the three open readiness items before arming" }, "Arm system"), /* @__PURE__ */ React.createElement(Badge, { tone: armed ? "ready" : "caution" }, armed ? "Armed" : "Blocked · 3 items")));
    }
    function FlightPrep2() {
      const [armed, setArmed] = React.useState(false);
      const items = [
        { label: "Pilot", value: "A. Renaud · 88 kg", state: "ready" },
        { label: "Weather", value: "CAVOK · 6 kt", state: "ready" },
        { label: "Battery", value: "74%", state: "caution" },
        { label: "FDR", value: "Armed", state: "live" },
        { label: "Comms", value: "VHF + intercom", state: "ready" },
        { label: "Parachute", value: "Check pending", state: "pending" }
      ];
      return /* @__PURE__ */ React.createElement("div", { style: { padding: 24, maxWidth: 1100, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("h1", { style: { margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-.01em", color: "var(--text-strong)" } }, "Flight prep · FLT-2026-019"), /* @__PURE__ */ React.createElement("p", { style: { margin: "4px 0 0", fontSize: 14, color: "var(--text-muted)" } }, "Verify flight readiness before arming the system.")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(ReadinessStrip, { items })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement(
        Card,
        {
          eyebrow: "Pre-flight",
          title: "Readiness checklist",
          flush: true,
          actions: /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" } }, "4 / 7 passed")
        },
        /* @__PURE__ */ React.createElement("div", { style: { padding: 4 } }, /* @__PURE__ */ React.createElement(ChecklistRow, { state: "done", title: "Harness, hooks & attachment inspected", owner: "PILOT", evidence: "#" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "done", title: "Wing surface & control check", owner: "ENG-2", evidence: "#" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "done", title: "Pitot / pressure probe clear", owner: "ENG-2", evidence: "#" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "active", title: "Parachute pack & jettison verified", owner: "ENG-1" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "blocked", title: "Battery above 80%", blocker: "At 74% — charge before flight", owner: "OPS" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "pending", title: "Audible altimeter test", owner: "PILOT" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "pending", title: "Weather window confirmed", owner: "OPS" }))
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(MetricTile, { label: "Wind", icon: /* @__PURE__ */ React.createElement(Icon, { name: "wind", size: 13 }), value: "6", unit: "kt", state: "ready" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "OAT", icon: /* @__PURE__ */ React.createElement(Icon, { name: "thermometer", size: 13 }), value: "19", unit: "°C" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Battery", icon: /* @__PURE__ */ React.createElement(Icon, { name: "battery", size: 13 }), value: "74", unit: "%", state: "caution" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Ceiling", value: "5 000", unit: "m" })), /* @__PURE__ */ React.createElement(SafetyGate, { armed, onArm: () => setArmed((a) => !a) }), /* @__PURE__ */ React.createElement(Card, { eyebrow: "Hardware", title: "Sensor placement", elevation: "flat" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, [["Wing", "Pitot · GPS · camera"], ["Seat", "Attitude · GPS · VHF"], ["Helmet", "GPS · intercom · HUD"]].map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-muted)" } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-body)" } }, v))))))));
    }
    window.OSFlightPrep = { FlightPrep: FlightPrep2 };
  })();

  // ui_kits/os-flight/Hud.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Switch } = DS;
    const HUD_GREEN = "var(--ex-hud-green)";
    const HUD_AMBER = "#ffe000";
    const HUD_RED = "var(--ex-red-600)";
    const STATUS_ITEMS = [
      { icon: "signal", label: "GPS", value: "3D" },
      { icon: "activity", label: "IMU", value: "OK" },
      { icon: "plane", label: "GLD", value: "ARMED" },
      { icon: "radio", label: "FDR", value: "LIVE" }
    ];
    const HEADING_MARKS = ["33", "34", "35", "036", "37", "38", "39"];
    function StatusItem({ icon, label, value }) {
      return /* @__PURE__ */ React.createElement("div", { className: "hud-status-item" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 22, strokeWidth: 1.8 }), /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("b", null, value));
    }
    function Tape({ side, label, unit, value, step, detail }) {
      const offsets = Array.from({ length: 21 }, (_, index) => index - 10);
      return /* @__PURE__ */ React.createElement("div", { className: `hud-tape hud-tape--${side}`, "aria-label": `${label}: ${value} ${unit}` }, /* @__PURE__ */ React.createElement("div", { className: "hud-tape__title" }, unit), /* @__PURE__ */ React.createElement("div", { className: "hud-tape__rail", "aria-hidden": "true" }, offsets.map((offset, index) => {
        const displayValue = value - offset * step;
        const major = offset % 2 === 0;
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            className: `hud-tape__tick${major ? " hud-tape__tick--major" : ""}`,
            key: offset,
            style: { "--tick-position": `${index / 20 * 100}%` }
          },
          major && /* @__PURE__ */ React.createElement("span", null, displayValue),
          /* @__PURE__ */ React.createElement("i", null)
        );
      })), /* @__PURE__ */ React.createElement("div", { className: "hud-tape__readout" }, value), /* @__PURE__ */ React.createElement("div", { className: "hud-tape__meta" }, /* @__PURE__ */ React.createElement("strong", null, label), /* @__PURE__ */ React.createElement("span", null, detail)));
    }
    function PitchLadder() {
      const rows = [
        { label: "5", position: "12%" },
        { label: "−5", position: "48%" },
        { label: "−10", position: "78%" }
      ];
      return /* @__PURE__ */ React.createElement("div", { className: "hud-pitch-ladder", "aria-label": "Pitch ladder" }, rows.map((row) => /* @__PURE__ */ React.createElement("div", { className: "hud-pitch-row", key: row.label, style: { "--pitch-position": row.position } }, /* @__PURE__ */ React.createElement("span", null, row.label), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("span", null, row.label))));
    }
    function HeadingTape() {
      return /* @__PURE__ */ React.createElement("div", { className: "hud-heading-tape", "aria-label": "Heading 036 degrees" }, HEADING_MARKS.map((mark) => /* @__PURE__ */ React.createElement("div", { className: `hud-heading-mark${mark === "036" ? " hud-heading-mark--active" : ""}`, key: mark }, /* @__PURE__ */ React.createElement("span", null, mark), /* @__PURE__ */ React.createElement("i", null))));
    }
    function AltitudeAlerts() {
      const alerts = [
        { label: "BREAK OFF", top: "15%", tone: "primary" },
        { label: "PULL", top: "30%", tone: "caution" },
        { label: "HARD DECK", top: "80%", tone: "fault" }
      ];
      return /* @__PURE__ */ React.createElement("div", { className: "hud-altitude-alerts", "aria-label": "Altitude thresholds" }, alerts.map((alert) => /* @__PURE__ */ React.createElement("div", { className: `hud-threshold hud-threshold--${alert.tone}`, key: alert.label, style: { "--alert-position": alert.top } }, /* @__PURE__ */ React.createElement("span", null, alert.label), /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 16, strokeWidth: 3 }))));
    }
    function TelemetryFooter() {
      return /* @__PURE__ */ React.createElement("div", { className: "hud-telemetry-footer", "aria-label": "Navigation telemetry" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "GLIDE"), /* @__PURE__ */ React.createElement("b", null, "12.4")), /* @__PURE__ */ React.createElement("div", { className: "hud-heading-box" }, /* @__PURE__ */ React.createElement("span", null, "HDG"), /* @__PURE__ */ React.createElement("b", null, "036°")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "V/S"), /* @__PURE__ */ React.createElement("b", null, "−4.6 ", /* @__PURE__ */ React.createElement("small", null, "m/s"))));
    }
    function HudDisplay() {
      return /* @__PURE__ */ React.createElement("div", { className: "hud-display", "data-testid": "hud-canvas", "aria-label": "Exopter pilot head-up display" }, /* @__PURE__ */ React.createElement("div", { className: "hud-status-bar" }, /* @__PURE__ */ React.createElement("div", { className: "hud-status-cluster" }, STATUS_ITEMS.map((item) => /* @__PURE__ */ React.createElement(StatusItem, { key: item.label, ...item }))), /* @__PURE__ */ React.createElement("div", { className: "hud-mode" }, /* @__PURE__ */ React.createElement("strong", null, "Pilot mode"), /* @__PURE__ */ React.createElement("div", { "aria-label": "Display mode 3 of 5" }, /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null), /* @__PURE__ */ React.createElement("i", null))), /* @__PURE__ */ React.createElement("div", { className: "hud-status-cluster hud-status-cluster--right" }, /* @__PURE__ */ React.createElement(StatusItem, { icon: "radio", label: "LINK", value: "OK" }), /* @__PURE__ */ React.createElement(StatusItem, { icon: "battery", label: "BATT", value: "78%" }), /* @__PURE__ */ React.createElement(StatusItem, { icon: "clock", label: "UTC", value: "03:30" }))), /* @__PURE__ */ React.createElement(HeadingTape, null), /* @__PURE__ */ React.createElement(PitchLadder, null), /* @__PURE__ */ React.createElement("div", { className: "hud-flight-path", "aria-label": "Flight path marker" }, /* @__PURE__ */ React.createElement(Icon, { name: "crosshair", size: 42, strokeWidth: 1.4 })), /* @__PURE__ */ React.createElement(Tape, { side: "left", label: "TAS", unit: "km/h", value: 214, step: 5, detail: "GS 198 · 1.0 G" }), /* @__PURE__ */ React.createElement("div", { className: "hud-speed-limit" }, /* @__PURE__ */ React.createElement(Icon, { name: "triangle-alert", size: 14 }), /* @__PURE__ */ React.createElement("span", null, "MAX 250")), /* @__PURE__ */ React.createElement(Tape, { side: "right", label: "MSL", unit: "m", value: 1480, step: 100, detail: "AGL 1210" }), /* @__PURE__ */ React.createElement(AltitudeAlerts, null), /* @__PURE__ */ React.createElement("div", { className: "hud-primary-alert", role: "status" }, /* @__PURE__ */ React.createElement("span", null, "PULL"), /* @__PURE__ */ React.createElement("small", null, "ALTITUDE GATE")), /* @__PURE__ */ React.createElement(TelemetryFooter, null));
    }
    function Hud2() {
      const [failsafe, setFailsafe] = React.useState(false);
      return /* @__PURE__ */ React.createElement("div", { className: "hud-page" }, /* @__PURE__ */ React.createElement("div", { className: "hud-page-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "HUD preview"), /* @__PURE__ */ React.createElement("p", null, "Final pilot-display direction · high-contrast symbology, fixed scan zones, fail-safe to black.")), /* @__PURE__ */ React.createElement(Switch, { label: "Fail-safe", checked: failsafe, onChange: (event) => setFailsafe(event.target.checked) })), /* @__PURE__ */ React.createElement("div", { className: "hud-frame ex-dark" }, failsafe ? /* @__PURE__ */ React.createElement("div", { className: "hud-failsafe", "data-testid": "hud-canvas", "aria-label": "Fail-safe display blank" }, /* @__PURE__ */ React.createElement("span", null, "FAIL-SAFE · DISPLAY BLANK"), /* @__PURE__ */ React.createElement("small", null, "Recovery remains outside the pilot field of view")) : /* @__PURE__ */ React.createElement(HudDisplay, null)), /* @__PURE__ */ React.createElement("div", { className: "hud-legend", "aria-label": "HUD colour legend" }, [
        ["Primary data", HUD_GREEN],
        ["Immediate action", HUD_AMBER],
        ["Limit / fault", HUD_RED]
      ].map(([label, colour]) => /* @__PURE__ */ React.createElement("span", { key: label }, /* @__PURE__ */ React.createElement("i", { style: { background: colour } }), label))));
    }
    window.OSHud = { Hud: Hud2 };
  })();

  // ui_kits/os-flight/Hangar.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Badge, Button, Drawer, Input, Select, StatusDot, SuccessState, Textarea } = DS;
    const SECTIONS = [
      { id: "fleet", label: "Fleet" },
      { id: "assemblies", label: "Assemblies" },
      { id: "parts", label: "Parts" },
      { id: "functions", label: "Functions" },
      { id: "qualification", label: "Qualification" }
    ];
    const FLEET = [
      {
        id: "F-GOCC",
        type: "Pilatus PC-6/B2-H4",
        role: "Flight-test aircraft",
        state: "caution",
        label: "1 item to review",
        summary: "1 assembly · 5 parts",
        cycles: "18 test flights",
        updated: "Configuration since 24 Jul 2026",
        installations: [
          { kind: "Assembly", id: "FDR-0012", name: "Flight data recorder", meta: "Installed in F-GOCC", state: "caution", label: "Conditional", children: [
            { kind: "Part", id: "REC-0007", name: "XIAO ESP32S3 recorder", meta: "SN XIAO-7431", state: "ready", label: "Installed" },
            { kind: "Part", id: "GPS-0008", name: "Holybro M9N GNSS", meta: "SN M9N-2481", state: "ready", label: "Installed" },
            { kind: "Part", id: "IMU-0004", name: "BNO085 IMU", meta: "SN BNO-0917", state: "ready", label: "Installed" },
            { kind: "Part", id: "PIT-0006", name: "Matek ASPD-AUAV", meta: "SN ASPD-1142", state: "caution", label: "Review flag" },
            { kind: "Part", id: "RAD-0003", name: "SiK 433 MHz air radio", meta: "SN SIK-433-03", state: "ready", label: "Installed" }
          ] }
        ]
      },
      {
        id: "WS-TEST-02",
        type: "Wingsuit",
        role: "Personal flight-test article",
        state: "ready",
        label: "Ready",
        summary: "1 installed device",
        cycles: "7 test flights",
        updated: "Configuration since 26 Jul 2026",
        installations: [
          { kind: "Equipment", id: "FLY-0003", name: "FlySight 2", meta: "Installed in WS-TEST-02 · SN FS2-2184", state: "ready", label: "Installed", children: [] }
        ]
      },
      {
        id: "EXO-001",
        type: "Exowing prototype",
        role: "Glider prototype",
        state: "ready",
        label: "Ready",
        summary: "2 assemblies · 9 parts",
        cycles: "4 test flights",
        updated: "Configuration since 27 Jul 2026",
        installations: [
          { kind: "Assembly", id: "WING-0001", name: "Wing structure and controls", meta: "Installed in EXO-001", state: "ready", label: "Serviceable", children: [
            { kind: "Subassembly", id: "CTRL-0002", name: "Control linkage", meta: "4 serialized parts", state: "ready", label: "Serviceable" },
            { kind: "Part", id: "STR-0009", name: "Primary structure", meta: "SN EXOW-STR-01", state: "ready", label: "Installed" }
          ] },
          { kind: "Assembly", id: "FDR-0014", name: "Flight data recorder", meta: "Installed in EXO-001", state: "ready", label: "Serviceable", children: [
            { kind: "Part", id: "GPS-0011", name: "Holybro M9N GNSS", meta: "SN M9N-2514", state: "ready", label: "Installed" },
            { kind: "Part", id: "IMU-0006", name: "BNO085 IMU", meta: "SN BNO-1044", state: "ready", label: "Installed" }
          ] }
        ]
      }
    ];
    const ASSEMBLIES = [
      { code: "FDR-0012", name: "Flight data recorder", parent: "—", installed: "F-GOCC", parts: 5, state: "caution", label: "Conditional", note: "Airborne FDR used for Pilatus validation flights." },
      { code: "FDR-0014", name: "Flight data recorder", parent: "—", installed: "EXO-001", parts: 5, state: "ready", label: "Serviceable", note: "Exowing recorder configuration." },
      { code: "WING-0001", name: "Wing structure and controls", parent: "—", installed: "EXO-001", parts: 4, state: "ready", label: "Serviceable", note: "Primary Exowing mechanical assembly." },
      { code: "CTRL-0002", name: "Control linkage", parent: "WING-0001", installed: "EXO-001", parts: 4, state: "ready", label: "Serviceable", note: "Nested subassembly for pitch and roll control." },
      { code: "FDR-0015", name: "Flight data recorder", parent: "—", installed: "Not installed", parts: 0, state: "unknown", label: "In preparation", note: "Empty assembly reserved for the next recorder build." }
    ];
    const PARTS = [
      { id: "REC-0007", function: "Recorder", manufacturer: "Seeed Studio", model: "XIAO ESP32S3", serial: "XIAO-7431", assembly: "FDR-0012", state: "installed", label: "Installed" },
      { id: "GPS-0008", function: "GNSS", manufacturer: "Holybro", model: "M9N", serial: "M9N-2481", assembly: "FDR-0012", state: "installed", label: "Installed" },
      { id: "IMU-0004", function: "IMU", manufacturer: "CEVA", model: "BNO085", serial: "BNO-0917", assembly: "FDR-0012", state: "installed", label: "Installed" },
      { id: "PIT-0006", function: "Air data", manufacturer: "Matek", model: "ASPD-AUAV", serial: "ASPD-1142", assembly: "FDR-0012", state: "quarantined", label: "Review flag" },
      { id: "RAD-0003", function: "Radio", manufacturer: "Holybro", model: "SiK 433 MHz", serial: "SIK-433-03", assembly: "FDR-0012", state: "installed", label: "Installed" },
      { id: "FLY-0003", function: "Flight computer", manufacturer: "FlySight", model: "FlySight 2", serial: "FS2-2184", assembly: "WS-TEST-02", state: "installed", label: "Installed" },
      { id: "GPS-0012", function: "GNSS", manufacturer: "Holybro", model: "M9N", serial: "M9N-2527", assembly: "—", state: "available", label: "Available" }
    ];
    const FUNCTIONS = [
      { code: "GNSS", name: "Global navigation", description: "Position, altitude, groundspeed, and GNSS time.", count: 3 },
      { code: "IMU", name: "Inertial measurement", description: "Attitude, angular rates, and acceleration.", count: 2 },
      { code: "AIR_DATA", name: "Air data", description: "Differential pressure and derived airspeed.", count: 2 },
      { code: "RECORDER", name: "Recorder", description: "Authoritative acquisition and local storage.", count: 3 },
      { code: "RADIO", name: "Telemetry radio", description: "Reduced live telemetry and link health.", count: 2 },
      { code: "FLIGHT_COMPUTER", name: "Flight computer", description: "Standalone personal flight instrumentation.", count: 1 }
    ];
    const BUILDS = [
      { code: "FDR-DEV-042", assembly: "FDR-0012", previous: "FDR-DEV-041", firmware: "8c41a27", state: "caution", label: "Tests in progress", locked: "No" },
      { code: "FDR-DEV-041", assembly: "FDR-0012", previous: "FDR-DEV-040", firmware: "ab498ee", state: "ready", label: "Qualified", locked: "Yes" },
      { code: "FDR-EXO-009", assembly: "FDR-0014", previous: "FDR-EXO-008", firmware: "32f08bd", state: "ready", label: "Qualified", locked: "Yes" }
    ];
    const TESTS = [
      { uuid: "TR-92A7", build: "FDR-DEV-042", target: "PIT-0006", recipe: "air-data-zero/v3", ran: "28 Jul · 14:32", state: "caution", label: "Blocked" },
      { uuid: "TR-91F2", build: "FDR-DEV-041", target: "Whole build", recipe: "bench-smoke/v5", ran: "27 Jul · 17:08", state: "ready", label: "Passed" },
      { uuid: "TR-90C8", build: "FDR-EXO-009", target: "Whole build", recipe: "flight-readiness/v2", ran: "27 Jul · 11:46", state: "ready", label: "Passed" }
    ];
    const CSS = `
    .hangar-root{padding:18px 20px 28px;max-width:1180px;margin:0 auto}
    .hangar-head{display:flex;align-items:flex-end;gap:16px;margin-bottom:12px}
    .hangar-tabs{display:flex;align-items:center;gap:4px;padding:4px;background:var(--surface-panel);border:1px solid var(--border-rule);border-radius:8px;margin-bottom:20px;width:max-content}
    .hangar-tab{border:0;border-radius:5px;background:transparent;color:var(--text-muted);padding:8px 13px;font:600 11px/1 var(--font-mono);letter-spacing:.05em;text-transform:uppercase;cursor:pointer}
    .hangar-tab[data-active=true]{background:var(--surface-card);color:var(--text-strong);box-shadow:var(--shadow-sm)}
    .hangar-tab:focus-visible,.hangar-fleet-item:focus-visible,.hangar-table tbody tr[tabindex]:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-2px}
    .hangar-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
    .hangar-summary-card{background:var(--surface-card);border:1px solid var(--border-rule);border-radius:8px;padding:11px 13px;box-shadow:var(--shadow-sm)}
    .hangar-summary-card strong{display:block;margin-top:5px;font:700 18px/1 var(--font-data);color:var(--text-strong)}
    .hangar-layout{display:grid;grid-template-columns:300px minmax(0,1fr);gap:14px}
    .hangar-layout--assemblies{grid-template-columns:minmax(520px,.95fr) minmax(380px,1.05fr)}
    .hangar-panel{background:var(--surface-card);border:1px solid var(--border-rule);border-radius:8px;box-shadow:var(--shadow-sm);overflow:hidden}
    .hangar-panel-head{display:flex;align-items:center;gap:12px;padding:13px 14px;border-bottom:1px solid var(--border-rule)}
    .hangar-section-head{display:flex;align-items:flex-end;gap:16px;margin-bottom:12px}.hangar-section-head>div:first-child{flex:1}.hangar-section-head h2{margin:0;font-size:20px;line-height:1.15;color:var(--text-strong)}
    .hangar-fleet-item{width:100%;padding:13px 14px;border:0;border-bottom:1px solid var(--border-rule);background:transparent;text-align:left;cursor:pointer}
    .hangar-fleet-item[data-active=true]{background:var(--surface-hover);box-shadow:inset 3px 0 0 var(--ex-aqua-500)}
    .hangar-fleet-item:hover,.hangar-table tbody tr:hover{background:var(--surface-hover)}
    .hangar-fleet-name{display:flex;align-items:center;justify-content:space-between;gap:10px}
    .hangar-fleet-name strong{font:700 15px/1.2 var(--font-data);color:var(--text-strong)}
    .hangar-fleet-meta{margin-top:6px;font-size:12px;color:var(--text-muted)}
    .hangar-fleet-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:9px;font:500 10px/1.2 var(--font-mono);color:var(--text-muted)}
    .hangar-asset-head{padding:14px 16px;border-bottom:1px solid var(--border-rule);display:flex;align-items:flex-start;gap:12px}
    .hangar-asset-head h2{margin:4px 0 3px;font-size:20px;color:var(--text-strong)}
    .hangar-asset-meta{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--border-rule)}
    .hangar-asset-meta>div{padding:11px 14px;border-right:1px solid var(--border-rule)}
    .hangar-config-head{padding:12px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border-rule);background:var(--surface-panel)}
    .hangar-tree-row{display:grid;grid-template-columns:minmax(0,1fr) 150px 116px;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border-rule)}
    .hangar-tree-row[data-level="1"]{padding-left:38px;background:rgba(239,244,242,.45)}
    .hangar-tree-primary{display:flex;align-items:center;gap:9px;min-width:0}
    .hangar-tree-icon{width:28px;height:28px;display:grid;place-items:center;border-radius:6px;background:var(--surface-panel);color:var(--text-muted);flex:none}
    .hangar-tree-copy{min-width:0}.hangar-tree-copy strong{display:block;font:600 13px/1.25 var(--font-data);color:var(--text-strong)}
    .hangar-tree-copy span{display:block;margin-top:2px;font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .hangar-kind{font:600 9px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted)}
    .hangar-detail-foot{display:grid;grid-template-columns:1fr 1fr;gap:0}.hangar-detail-foot>div{padding:13px 14px}.hangar-detail-foot>div+div{border-left:1px solid var(--border-rule)}
    .hangar-table{width:100%;border-collapse:collapse}.hangar-table th{text-align:left;padding:12px 13px 9px;font:600 9px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap}.hangar-table td{padding:11px 13px;border-top:1px solid var(--border-rule);font-size:12px;color:var(--text-body);vertical-align:middle}.hangar-table tbody tr{cursor:pointer}
    .hangar-code{font:700 12px/1.2 var(--font-data);color:var(--text-strong)}
    .hangar-toolbar{display:flex;align-items:center;gap:10px;margin-bottom:12px}.hangar-search,.hangar-select{height:38px;border:1px solid var(--border-rule);border-radius:6px;background:var(--surface-card);color:var(--text-body);padding:0 11px;font:500 13px var(--font-ui);outline:none}.hangar-search{width:250px}.hangar-search:focus-visible,.hangar-select:focus-visible{border-color:var(--focus-ring);outline:2px solid var(--focus-ring);outline-offset:1px}
    .hangar-function-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.hangar-function-card{padding:14px;background:var(--surface-card);border:1px solid var(--border-rule);border-radius:8px;box-shadow:var(--shadow-sm)}.hangar-function-card h3{margin:5px 0 5px;font-size:15px;color:var(--text-strong)}.hangar-function-card p{margin:0;min-height:38px;font-size:12px;line-height:1.45;color:var(--text-muted)}.hangar-function-foot{display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid var(--border-rule)}
    .hangar-qualification{display:grid;grid-template-columns:1.2fr .8fr;gap:14px}.hangar-qual-note{padding:13px 14px;border-top:1px solid var(--border-rule);background:var(--surface-panel);font-size:12px;line-height:1.5;color:var(--text-muted)}
    .hangar-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.hangar-form-grid>.full{grid-column:1/-1}
    .hangar-help{padding:11px 12px;border-radius:6px;background:var(--surface-panel);font-size:12px;line-height:1.5;color:var(--text-muted)}
    @media(max-width:900px){.hangar-layout,.hangar-qualification{grid-template-columns:1fr}.hangar-summary{grid-template-columns:1fr 1fr}.hangar-function-grid{grid-template-columns:1fr 1fr}.hangar-tree-row{grid-template-columns:minmax(0,1fr) 105px}.hangar-tree-row>.hangar-kind{display:none}.hangar-tabs{max-width:100%;overflow:auto}}
  `;
    if (!document.getElementById("hangar-screen-css")) {
      const s = document.createElement("style");
      s.id = "hangar-screen-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    function Hangar2({ onOpenSignal }) {
      const [section, setSection] = React.useState("fleet");
      const [drawer, setDrawer] = React.useState(null);
      const [notice, setNotice] = React.useState("");
      const openDrawer = (type) => {
        setNotice("");
        setDrawer(type);
      };
      const closeDrawer = () => setDrawer(null);
      const created = (message) => {
        setNotice(message);
        setDrawer(null);
      };
      return /* @__PURE__ */ React.createElement("div", { className: "hangar-root" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-head" }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Sillage"), /* @__PURE__ */ React.createElement("h1", { style: H1 }, "Hangar"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Aircraft, installed configurations, serialized inventory, and qualification evidence.")), notice && /* @__PURE__ */ React.createElement(Badge, { tone: "ready" }, notice)), /* @__PURE__ */ React.createElement("nav", { className: "hangar-tabs", "aria-label": "Hangar sections" }, SECTIONS.map((item) => /* @__PURE__ */ React.createElement("button", { key: item.id, type: "button", className: "hangar-tab", "data-active": section === item.id, "aria-pressed": section === item.id, onClick: () => setSection(item.id) }, item.label))), section === "fleet" && /* @__PURE__ */ React.createElement(FleetView, { onAdd: () => openDrawer("aircraft"), onInstall: () => openDrawer("installation"), onOpenSignal }), section === "assemblies" && /* @__PURE__ */ React.createElement(AssembliesView, { onAdd: () => openDrawer("assembly") }), section === "parts" && /* @__PURE__ */ React.createElement(PartsView, { onAdd: () => openDrawer("part") }), section === "functions" && /* @__PURE__ */ React.createElement(FunctionsView, { onAdd: () => openDrawer("function") }), section === "qualification" && /* @__PURE__ */ React.createElement(QualificationView, { onBuild: () => openDrawer("build"), onTest: () => openDrawer("test") }), drawer && /* @__PURE__ */ React.createElement(CreateDrawer, { key: drawer, type: drawer, onClose: closeDrawer, onCreated: created }));
    }
    function FleetView({ onAdd, onInstall, onOpenSignal }) {
      const [selected, setSelected] = React.useState(0);
      const aircraft = FLEET[selected];
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hangar-section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Fleet"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Aircraft are durable identities; installations record which equipment flew, and when.")), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 18 }), onClick: onAdd }, "Register aircraft")), /* @__PURE__ */ React.createElement("div", { className: "hangar-summary" }, /* @__PURE__ */ React.createElement(Summary, { label: "Aircraft", value: "3 registered" }), /* @__PURE__ */ React.createElement(Summary, { label: "Installed configurations", value: "4 active" }), /* @__PURE__ */ React.createElement(Summary, { label: "Attention", value: "1 review item", caution: true })), /* @__PURE__ */ React.createElement("div", { className: "hangar-layout" }, /* @__PURE__ */ React.createElement("aside", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-panel-head" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Fleet aircraft"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, "3")), FLEET.map((item, index) => /* @__PURE__ */ React.createElement("button", { key: item.id, type: "button", className: "hangar-fleet-item", "data-active": selected === index, "aria-pressed": selected === index, onClick: () => setSelected(index) }, /* @__PURE__ */ React.createElement("div", { className: "hangar-fleet-name" }, /* @__PURE__ */ React.createElement("strong", null, item.id), /* @__PURE__ */ React.createElement(Icon, { name: "chevron-right", size: 16, style: { color: "var(--text-muted)" } })), /* @__PURE__ */ React.createElement("div", { className: "hangar-fleet-meta" }, item.type, /* @__PURE__ */ React.createElement("br", null), item.role), /* @__PURE__ */ React.createElement("div", { className: "hangar-fleet-foot" }, /* @__PURE__ */ React.createElement(StatusDot, { state: item.state, label: item.label }), /* @__PURE__ */ React.createElement("span", null, item.summary))))), /* @__PURE__ */ React.createElement("section", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-asset-head" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-tree-icon", style: { width: 36, height: 36, color: "var(--ex-aqua-500)" } }, /* @__PURE__ */ React.createElement(Icon, { name: "plane", size: 20 })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Aircraft"), /* @__PURE__ */ React.createElement("h2", null, aircraft.id, " · ", aircraft.type), /* @__PURE__ */ React.createElement("p", { style: LEAD }, aircraft.role)), /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "secondary", onClick: onInstall }, "Change configuration"), /* @__PURE__ */ React.createElement(Badge, { tone: aircraft.state === "caution" ? "caution" : "ready" }, aircraft.state === "caution" ? "Conditional" : "Ready")), /* @__PURE__ */ React.createElement("div", { className: "hangar-asset-meta" }, /* @__PURE__ */ React.createElement(Mini, { label: "Current configuration", value: aircraft.updated }), /* @__PURE__ */ React.createElement(Mini, { label: "Usage", value: aircraft.cycles }), /* @__PURE__ */ React.createElement(Mini, { label: "Installed content", value: aircraft.summary })), /* @__PURE__ */ React.createElement("div", { className: "hangar-config-head" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Installed configuration"), /* @__PURE__ */ React.createElement("span", { style: { ...EYEBROW, letterSpacing: ".04em" } }, "Installation → assembly / equipment → part")), /* @__PURE__ */ React.createElement("div", null, aircraft.installations.map((item) => /* @__PURE__ */ React.createElement(Configuration, { key: item.id, item }))), /* @__PURE__ */ React.createElement("div", { className: "hangar-detail-foot" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Configuration history"), /* @__PURE__ */ React.createElement("p", { style: { ...LEAD, lineHeight: 1.45 } }, "Every installation and removal is dated, so an FDR assembly can move between aircraft without losing traceability.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Flight handoff"), /* @__PURE__ */ React.createElement("p", { style: { ...LEAD, lineHeight: 1.45 } }, aircraft.id === "F-GOCC" ? "PIT-0006 is linked to the last live telemetry flag." : "The current physical configuration is ready to be attached to the next flight record."), aircraft.id === "F-GOCC" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9 } }, /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "signal", size: 15 }), onClick: onOpenSignal }, "Inspect in Signal")))))));
    }
    function AssembliesView({ onAdd }) {
      const [selected, setSelected] = React.useState(0);
      const item = ASSEMBLIES[selected];
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hangar-section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Assemblies"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Reusable physical configurations contain Parts and may include nested Assemblies.")), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), onClick: onAdd }, "New assembly")), /* @__PURE__ */ React.createElement("div", { className: "hangar-layout hangar-layout--assemblies" }, /* @__PURE__ */ React.createElement("section", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("table", { className: "hangar-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Assembly"), /* @__PURE__ */ React.createElement("th", null, "Installed in"), /* @__PURE__ */ React.createElement("th", null, "Parts"), /* @__PURE__ */ React.createElement("th", null, "State"))), /* @__PURE__ */ React.createElement("tbody", null, ASSEMBLIES.map((a, i) => /* @__PURE__ */ React.createElement("tr", { key: a.code, tabIndex: "0", role: "button", "aria-label": `Select assembly ${a.code}`, onClick: () => setSelected(i), onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelected(i);
        }
      }, style: selected === i ? { background: "var(--surface-hover)" } : null }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", { className: "hangar-code" }, a.code), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-muted)" } }, a.name)), /* @__PURE__ */ React.createElement("td", null, a.installed), /* @__PURE__ */ React.createElement("td", null, a.parts), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(StatusDot, { state: a.state, label: a.label }))))))), /* @__PURE__ */ React.createElement("aside", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-panel-head" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Assembly details")), /* @__PURE__ */ React.createElement("div", { style: { padding: 15 } }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, item.parent === "—" ? "Root assembly" : `Child of ${item.parent}`), /* @__PURE__ */ React.createElement("h2", { style: { margin: "6px 0 4px", fontSize: 19 } }, item.code), /* @__PURE__ */ React.createElement("p", { style: { ...LEAD, lineHeight: 1.5 } }, item.note), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 11, marginTop: 16 } }, /* @__PURE__ */ React.createElement(Mini, { label: "Name", value: item.name }), /* @__PURE__ */ React.createElement(Mini, { label: "Installed in", value: item.installed }), /* @__PURE__ */ React.createElement(Mini, { label: "Direct parts", value: String(item.parts) }), /* @__PURE__ */ React.createElement(Mini, { label: "Parent", value: item.parent }))), /* @__PURE__ */ React.createElement("div", { className: "hangar-qual-note" }, "Parts are installed in an assembly. Aircraft installation is tracked separately, so the complete assembly can be moved without rewriting its contents."))));
    }
    function PartsView({ onAdd }) {
      const [query, setQuery] = React.useState("");
      const [state, setState] = React.useState("all");
      const rows = PARTS.filter((p) => (state === "all" || p.state === state) && `${p.id} ${p.function} ${p.manufacturer} ${p.model} ${p.serial}`.toLowerCase().includes(query.toLowerCase()));
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hangar-section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Parts"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Serialized physical inventory with installation state and functional role.")), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), onClick: onAdd }, "Register part")), /* @__PURE__ */ React.createElement("div", { className: "hangar-toolbar" }, /* @__PURE__ */ React.createElement("input", { className: "hangar-search", "aria-label": "Search parts", placeholder: "Search part, serial, function…", value: query, onChange: (e) => setQuery(e.target.value) }), /* @__PURE__ */ React.createElement("select", { className: "hangar-select", "aria-label": "Filter part state", value: state, onChange: (e) => setState(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "all" }, "All states"), /* @__PURE__ */ React.createElement("option", { value: "available" }, "Available"), /* @__PURE__ */ React.createElement("option", { value: "installed" }, "Installed"), /* @__PURE__ */ React.createElement("option", { value: "quarantined" }, "Quarantined"), /* @__PURE__ */ React.createElement("option", { value: "retired" }, "Retired")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, rows.length, " parts")), /* @__PURE__ */ React.createElement("section", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("table", { className: "hangar-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Part"), /* @__PURE__ */ React.createElement("th", null, "Function"), /* @__PURE__ */ React.createElement("th", null, "Manufacturer / model"), /* @__PURE__ */ React.createElement("th", null, "Serial"), /* @__PURE__ */ React.createElement("th", null, "Assembly"), /* @__PURE__ */ React.createElement("th", null, "State"))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((p) => /* @__PURE__ */ React.createElement("tr", { key: p.id }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", { className: "hangar-code" }, p.id)), /* @__PURE__ */ React.createElement("td", null, p.function), /* @__PURE__ */ React.createElement("td", null, p.manufacturer, " · ", p.model), /* @__PURE__ */ React.createElement("td", { style: { fontFamily: "var(--font-data)" } }, p.serial), /* @__PURE__ */ React.createElement("td", null, p.assembly), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(StatusDot, { state: toneForPart(p.state), label: p.label }))))))));
    }
    function FunctionsView({ onAdd }) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hangar-section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Functions"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Controlled roles classify Parts without adding a level to the physical hierarchy.")), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, "Admin"), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), onClick: onAdd }, "New function")), /* @__PURE__ */ React.createElement("div", { className: "hangar-function-grid" }, FUNCTIONS.map((f) => /* @__PURE__ */ React.createElement("article", { key: f.code, className: "hangar-function-card" }, /* @__PURE__ */ React.createElement("span", { className: "hangar-code" }, f.code), /* @__PURE__ */ React.createElement("h3", null, f.name), /* @__PURE__ */ React.createElement("p", null, f.description), /* @__PURE__ */ React.createElement("div", { className: "hangar-function-foot" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Assigned inventory"), /* @__PURE__ */ React.createElement("strong", { style: { fontFamily: "var(--font-data)" } }, f.count, " parts"))))));
    }
    function QualificationView({ onBuild, onTest }) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hangar-section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Qualification"), /* @__PURE__ */ React.createElement("p", { style: LEAD }, "Frozen Builds and Test Runs provide evidence for a specific configuration.")), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), onClick: onTest }, "Record test run"), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 17 }), onClick: onBuild }, "New build")), /* @__PURE__ */ React.createElement("div", { className: "hangar-qualification" }, /* @__PURE__ */ React.createElement("section", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-panel-head" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Builds"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, BUILDS.length)), /* @__PURE__ */ React.createElement("table", { className: "hangar-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Build"), /* @__PURE__ */ React.createElement("th", null, "Assembly"), /* @__PURE__ */ React.createElement("th", null, "Firmware"), /* @__PURE__ */ React.createElement("th", null, "Locked"), /* @__PURE__ */ React.createElement("th", null, "State"))), /* @__PURE__ */ React.createElement("tbody", null, BUILDS.map((b) => /* @__PURE__ */ React.createElement("tr", { key: b.code }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("strong", { className: "hangar-code" }, b.code), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-muted)" } }, "after ", b.previous)), /* @__PURE__ */ React.createElement("td", null, b.assembly), /* @__PURE__ */ React.createElement("td", { style: { fontFamily: "var(--font-data)" } }, b.firmware), /* @__PURE__ */ React.createElement("td", null, b.locked), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(StatusDot, { state: b.state, label: b.label })))))), /* @__PURE__ */ React.createElement("div", { className: "hangar-qual-note" }, "The first recorded Test Run locks its Build. Changes require cloning the Build as a new iteration.")), /* @__PURE__ */ React.createElement("section", { className: "hangar-panel" }, /* @__PURE__ */ React.createElement("div", { className: "hangar-panel-head" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, "Recent test runs")), TESTS.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.uuid, style: { padding: "12px 14px", borderBottom: "1px solid var(--border-rule)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("strong", { className: "hangar-code", style: { flex: 1 } }, t.uuid, " · ", t.build), /* @__PURE__ */ React.createElement(StatusDot, { state: t.state, label: t.label })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 } }, /* @__PURE__ */ React.createElement(Mini, { label: "Target", value: t.target }), /* @__PURE__ */ React.createElement(Mini, { label: "Recipe", value: t.recipe }), /* @__PURE__ */ React.createElement(Mini, { label: "Ran at", value: t.ran })))))));
    }
    const DRAWERS = {
      aircraft: { eyebrow: "Fleet", title: "Register aircraft", description: "Create the durable identity that flights and installations refer to.", success: "Aircraft registered", message: "The aircraft is ready to receive assemblies or standalone equipment." },
      installation: { eyebrow: "Fleet configuration", title: "Install equipment", description: "Attach an assembly or standalone device to an aircraft with an effective date.", success: "Configuration updated", message: "The dated installation now defines the aircraft configuration for future flights." },
      assembly: { eyebrow: "Assemblies", title: "Create assembly", description: "Create an empty physical container, optionally nested below another assembly.", success: "Assembly created", message: "It is available for parts, child assemblies, and aircraft installation." },
      part: { eyebrow: "Serialized inventory", title: "Register part", description: "Register one physical item and classify it with a Function.", success: "Part registered", message: "The part is available and can now be installed in an assembly." },
      function: { eyebrow: "Controlled catalog · Admin", title: "Create function", description: "Add a reusable functional role for classifying parts.", success: "Function created", message: "The new Function is now available when registering or editing parts." },
      build: { eyebrow: "Qualification", title: "Create build", description: "Freeze an assembly snapshot together with its firmware and source revision.", success: "Build created", message: "The immutable configuration snapshot is ready for its first Test Run." },
      test: { eyebrow: "Qualification", title: "Record test run", description: "Attach structured test evidence to a Build or one Part contained in it.", success: "Test run recorded", message: "The Build is now locked and the result is available for review." }
    };
    function CreateDrawer({ type, onClose, onCreated }) {
      const config = DRAWERS[type];
      const [saved, setSaved] = React.useState(false);
      if (saved) return /* @__PURE__ */ React.createElement(Drawer, { ariaLabel: config.success, onClose }, /* @__PURE__ */ React.createElement(SuccessState, { title: config.success, description: config.message, action: /* @__PURE__ */ React.createElement(Button, { autoFocus: true, onClick: () => onCreated(config.success) }, "Done") }));
      return /* @__PURE__ */ React.createElement(Drawer, { title: config.title, eyebrow: config.eyebrow, description: config.description, onClose, footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: onClose }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { onClick: () => setSaved(true) }, type === "test" ? "Record test run" : "Save")) }, /* @__PURE__ */ React.createElement(DrawerFields, { type }));
    }
    function DrawerFields({ type }) {
      if (type === "aircraft") return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(Field, { label: "Aircraft ID", value: "F-HNEW" }), /* @__PURE__ */ React.createElement(Field, { label: "Type", value: "Pilatus PC-6" }), /* @__PURE__ */ React.createElement(Field, { label: "Role", value: "Flight-test aircraft" }), /* @__PURE__ */ React.createElement(SelectField, { label: "Initial state", options: ["Ready", "Unavailable", "In maintenance"] }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Notes", textarea: true, value: "Aircraft registered for FDR validation flights." }), /* @__PURE__ */ React.createElement(Help, null, "Register the aircraft first. Assemblies and equipment are attached afterward through dated installations."));
      if (type === "installation") return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(SelectField, { label: "Aircraft", options: ["F-GOCC", "WS-TEST-02", "EXO-001"] }), /* @__PURE__ */ React.createElement(SelectField, { label: "Equipment", options: ["FDR-0015 · Flight data recorder", "FDR-0012 · Flight data recorder", "FLY-0003 · FlySight 2"] }), /* @__PURE__ */ React.createElement(Field, { label: "Effective from", value: "28 Jul 2026 · 16:00" }), /* @__PURE__ */ React.createElement(Field, { label: "Mounting position", value: "Cabin · aft bulkhead" }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Installation note", textarea: true, value: "Installed for the next test campaign." }), /* @__PURE__ */ React.createElement(Help, null, "This action closes any conflicting active installation and preserves the previous configuration in history."));
      if (type === "assembly") return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(Field, { label: "Assembly code", value: "FDR-0015" }), /* @__PURE__ */ React.createElement(Field, { label: "Name", value: "Flight data recorder" }), /* @__PURE__ */ React.createElement(SelectField, { full: true, label: "Parent assembly", options: ["None · root assembly", "WING-0001 · Wing structure and controls", "FDR-0012 · Flight data recorder"] }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Notes", textarea: true, value: "Recorder assembly for the next hardware iteration." }), /* @__PURE__ */ React.createElement(Help, null, "An assembly starts empty. Add Parts or nested Assemblies after creation, then install the resulting configuration in an aircraft."));
      if (type === "part") return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(Field, { label: "Internal number", value: "PART-000013" }), /* @__PURE__ */ React.createElement(SelectField, { label: "Function", options: ["GNSS · Global navigation", "IMU · Inertial measurement", "AIR_DATA · Air data", "RECORDER · Recorder", "RADIO · Telemetry radio"] }), /* @__PURE__ */ React.createElement(Field, { label: "Manufacturer", value: "Holybro" }), /* @__PURE__ */ React.createElement(Field, { label: "Model", value: "M9N" }), /* @__PURE__ */ React.createElement(Field, { label: "Serial number", value: "M9N-2527" }), /* @__PURE__ */ React.createElement(SelectField, { label: "Initial state", options: ["Available", "Quarantined", "Retired"] }), /* @__PURE__ */ React.createElement(SelectField, { full: true, label: "Install in assembly · optional", options: ["Leave available", "FDR-0015 · Flight data recorder", "FDR-0012 · Flight data recorder", "FDR-0014 · Flight data recorder"] }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Notes", textarea: true, value: "Bench checked on receipt." }), /* @__PURE__ */ React.createElement(Help, null, "Installed state is derived from the selected Assembly. Quarantined or retired Parts cannot be installed."));
      if (type === "function") return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(Field, { label: "Code", value: "POWER" }), /* @__PURE__ */ React.createElement(Field, { label: "Name", value: "Power supply" }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Description", textarea: true, value: "Power conversion, distribution, and source monitoring." }), /* @__PURE__ */ React.createElement(Help, null, "Functions are controlled reference data. They classify Parts but never contain them physically."));
      if (type === "build") return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(Field, { label: "Build code", value: "FDR-DEV-043" }), /* @__PURE__ */ React.createElement(SelectField, { label: "Assembly", options: ["FDR-0012 · Flight data recorder", "FDR-0014 · Flight data recorder", "WING-0001 · Wing structure and controls"] }), /* @__PURE__ */ React.createElement(SelectField, { label: "Previous build", options: ["FDR-DEV-042", "FDR-DEV-041", "None"] }), /* @__PURE__ */ React.createElement(Field, { label: "Source revision", value: "8c41a27" }), /* @__PURE__ */ React.createElement(Field, { label: "Arduino Core", value: "3.3.10" }), /* @__PURE__ */ React.createElement(Field, { label: "Firmware SHA-256", value: "Pending upload" }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Notes", textarea: true, value: "Updated radio scheduling and pitot filtering." }), /* @__PURE__ */ React.createElement(Help, null, "The current Assembly contents are copied into an immutable snapshot. Once testing begins, create a new Build for every change."));
      return /* @__PURE__ */ React.createElement("div", { className: "hangar-form-grid" }, /* @__PURE__ */ React.createElement(SelectField, { label: "Build", options: ["FDR-DEV-042 · FDR-0012", "FDR-DEV-041 · FDR-0012", "FDR-EXO-009 · FDR-0014"] }), /* @__PURE__ */ React.createElement(SelectField, { label: "Target", options: ["Whole build", "PIT-0006 · Matek ASPD-AUAV", "RAD-0003 · SiK 433 MHz"] }), /* @__PURE__ */ React.createElement(Field, { label: "Recipe ID", value: "air-data-zero" }), /* @__PURE__ */ React.createElement(Field, { label: "Recipe version", value: "3" }), /* @__PURE__ */ React.createElement(Field, { label: "Ran at", value: "28 Jul 2026 · 16:15" }), /* @__PURE__ */ React.createElement(SelectField, { label: "Outcome", options: ["Passed", "Failed", "Blocked"] }), /* @__PURE__ */ React.createElement(Field, { full: true, label: "Notes", textarea: true, value: "Zero drift remains outside the acceptance band." }), /* @__PURE__ */ React.createElement(Help, null, "The first Test Run locks the Build. A Part target must exist in the stored Build snapshot."));
    }
    function Field({ label, value, textarea, full }) {
      const [v, setV] = React.useState(value);
      const FieldComponent = textarea ? Textarea : Input;
      return /* @__PURE__ */ React.createElement(FieldComponent, { className: full ? "full" : "", label, value: v, onChange: (e) => setV(e.target.value) });
    }
    function SelectField({ label, options, full }) {
      const [v, setV] = React.useState(options[0]);
      return /* @__PURE__ */ React.createElement(Select, { className: full ? "full" : "", label, value: v, onChange: (e) => setV(e.target.value), options: options.map((option) => ({ value: option, label: option })) });
    }
    function Help({ children }) {
      return /* @__PURE__ */ React.createElement("div", { className: "hangar-help", style: { gridColumn: "1/-1" } }, children);
    }
    function Configuration({ item }) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HierarchyRow, { item, level: 0 }), (item.children || []).map((child) => /* @__PURE__ */ React.createElement(HierarchyRow, { key: child.id, item: child, level: 1 })));
    }
    function HierarchyRow({ item, level }) {
      const icon = item.kind === "Assembly" || item.kind === "Subassembly" ? "layers" : item.kind === "Equipment" ? "gauge" : "settings";
      return /* @__PURE__ */ React.createElement("div", { className: "hangar-tree-row", "data-level": level }, /* @__PURE__ */ React.createElement("div", { className: "hangar-tree-primary" }, /* @__PURE__ */ React.createElement("span", { className: "hangar-tree-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 16 })), /* @__PURE__ */ React.createElement("span", { className: "hangar-tree-copy" }, /* @__PURE__ */ React.createElement("strong", null, item.id, " · ", item.name), /* @__PURE__ */ React.createElement("span", null, item.meta))), /* @__PURE__ */ React.createElement("span", { className: "hangar-kind" }, item.kind), /* @__PURE__ */ React.createElement(StatusDot, { state: item.state, label: item.label }));
    }
    function Summary({ label, value, caution }) {
      return /* @__PURE__ */ React.createElement("div", { className: "hangar-summary-card" }, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, label), /* @__PURE__ */ React.createElement("strong", { style: caution ? { color: "var(--ex-amber-500)" } : null }, value));
    }
    function Mini({ label, value }) {
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: EYEBROW }, label), /* @__PURE__ */ React.createElement("strong", { style: { display: "block", marginTop: 4, font: "600 12px/1.3 var(--font-data)", color: "var(--text-strong)" } }, value));
    }
    function toneForPart(state) {
      return state === "quarantined" ? "caution" : state === "retired" ? "fault" : state === "available" ? "unknown" : "ready";
    }
    const EYEBROW = { fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" };
    const H1 = { margin: "4px 0 0", fontSize: 24, fontWeight: 700, color: "var(--text-strong)" };
    const LEAD = { margin: "4px 0 0", fontSize: 13, color: "var(--text-muted)" };
    window.OSHangar = { Hangar: Hangar2 };
  })();

  // ui_kits/os-flight/Signal.jsx
  (function() {
    const { Icon } = window.OSIcons;
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Badge, Button, Drawer, Select, StatusDot } = DS;
    const CSS = `
    .signal-root{min-height:100%;background:var(--ex-carbon-950);color:var(--ex-vapor-50)}
    .signal-status{display:grid;grid-template-columns:minmax(155px,1fr) minmax(140px,.9fr) 92px minmax(175px,.95fr) auto;min-height:58px;border-bottom:1px solid var(--ex-carbon-700);background:var(--ex-carbon-900)}
    .signal-status-cell{padding:8px 12px;border-right:1px solid var(--ex-carbon-700);min-width:0;display:flex;flex-direction:column;justify-content:center}
    .signal-status-cell .signal-k{margin-bottom:3px}
    .signal-status-sub{margin-top:3px;font:500 9px/1.15 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ex-graphite-400);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .signal-link-stack{padding:6px 10px;border-right:1px solid var(--ex-carbon-700);display:grid;align-content:center;gap:3px;min-width:0}
    .signal-link-row{display:grid;grid-template-columns:56px minmax(0,1fr);align-items:center;gap:7px;font:600 9px/1.1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ex-graphite-400)}
    .signal-link-row b{color:var(--ex-field-500);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.signal-link-row b.caution{color:var(--ex-amber-500)}
    .signal-link-row .signal-dot{width:6px;height:6px;margin-right:5px}
    .signal-session-actions{display:flex;align-items:center;justify-content:flex-end;gap:7px;padding:8px 10px;min-width:0}
    .signal-k{display:block;font:600 10px/1.2 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ex-graphite-400);margin-bottom:5px}
    .signal-v{font:600 13px/1.2 var(--font-data);color:var(--ex-vapor-50);font-variant-numeric:tabular-nums;white-space:nowrap}
    .signal-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--ex-field-500);margin-right:7px}
    .signal-dot.live{background:var(--ex-aqua-500)}.signal-dot.caution{background:var(--ex-amber-500)}
    .signal-panel{background:var(--ex-carbon-900);border:1px solid var(--ex-carbon-700);border-radius:8px;overflow:hidden}
    .signal-panel-head{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-bottom:1px solid var(--ex-carbon-700)}
    .signal-title{font:600 10px/1.2 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ex-graphite-400)}
    .signal-track{position:absolute;z-index:1;inset:0;width:100%;height:100%}
    .signal-vehicle{position:absolute;z-index:3;transform:translate(-50%,-50%);color:var(--ex-hud-green);transition:left .8s linear,top .8s linear}
    .signal-vehicle-icon{width:38px;height:38px;border:1px solid currentColor;border-radius:50%;display:grid;place-items:center;background:rgba(7,11,13,.84);box-shadow:0 0 0 7px rgba(140,255,77,.10)}
    .signal-vehicle-icon svg{filter:drop-shadow(0 0 4px rgba(140,255,77,.45))}
    .signal-vehicle-label{position:absolute;left:48px;top:-38px;min-width:190px;padding:6px 8px;border-radius:4px;background:rgba(7,11,13,.88);color:var(--ex-vapor-50);font:600 11px/1.35 var(--font-mono);letter-spacing:.03em;white-space:nowrap}
    .signal-vehicle-label strong{color:var(--ex-hud-green);font-weight:600}
    .signal-heading-line{position:absolute;left:50%;bottom:35px;height:72px;border-left:1px dashed rgba(140,255,77,.8);transform-origin:bottom center;pointer-events:none}
    .signal-canvas{width:100%;height:430px;display:block;background:var(--ex-carbon-950)}
    .signal-charts-canvas{width:100%;height:440px;display:block;background:var(--ex-carbon-950)}
    .signal-live-shell{height:100%;min-height:640px;display:flex;flex-direction:column;overflow:hidden}
    .signal-tool-button{height:32px;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:0 10px;border:1px solid var(--ex-carbon-700);border-radius:5px;background:var(--ex-carbon-900);color:var(--ex-vapor-50);font:600 10px/1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;cursor:pointer;white-space:nowrap}
    .signal-tool-button:hover,.signal-tool-button[aria-pressed=true]{border-color:var(--ex-aqua-500);color:var(--ex-aqua-500);background:rgba(47,214,198,.08)}
    .signal-tool-button:focus-visible,.signal-widget-mode:focus-visible,.signal-drag-handle:focus-visible,.signal-choice button:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
    .signal-tool-button.icon-only{width:34px;padding:0}
    .signal-dashboard{position:relative;flex:1;min-height:0;overflow:hidden;background:var(--ex-carbon-950)}
    .signal-workspace-panel{position:absolute;box-sizing:border-box;min-width:0;min-height:0;display:flex;flex-direction:column;background:var(--ex-carbon-900);border:1px solid var(--ex-carbon-700);border-radius:var(--radius);overflow:hidden;box-shadow:none;transition:border-color .18s,width .18s,height .18s,left .18s,top .18s}
    .signal-workspace-panel:hover{border-color:var(--ex-graphite-600)}
    .signal-workspace-panel.is-enlarged,.signal-workspace-panel.is-dragging{border-color:var(--ex-aqua-500)}
    .signal-workspace-panel.is-dragging{transition:none;user-select:none}
    .signal-workspace-panel.is-hidden .signal-workspace-body{display:none}
    .signal-workspace-head{height:38px;box-sizing:border-box;flex:none;display:flex;align-items:center;gap:8px;padding:0 8px;border-bottom:1px solid var(--ex-carbon-700);background:var(--ex-carbon-900)}
    .signal-workspace-panel.is-hidden .signal-workspace-head{border-bottom:0}
    .signal-drag-handle{width:22px;height:22px;flex:none;padding:0;border:1px solid transparent;border-radius:4px;background:transparent;color:var(--ex-graphite-400);display:grid;place-items:center;cursor:grab;touch-action:none}
    .signal-drag-handle:hover{border-color:var(--ex-carbon-700);color:var(--ex-aqua-500);background:var(--ex-carbon-950)}.signal-drag-handle:active{cursor:grabbing}
    .signal-workspace-head-icon{color:var(--ex-aqua-500);display:flex}.signal-workspace-head strong{font:600 10px/1 var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ex-vapor-50)}
    .signal-workspace-subtitle{font:500 9px/1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ex-graphite-400);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .signal-workspace-head-actions{margin-left:auto;display:flex;align-items:center;gap:6px}
    .signal-widget-modes{display:flex;align-items:center;gap:2px;padding:2px;border:1px solid var(--ex-carbon-700);border-radius:4px;background:var(--ex-carbon-950)}
    .signal-widget-mode{height:21px;padding:0 6px;border:0;border-radius:3px;background:transparent;color:var(--ex-graphite-400);font:600 8px/1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;cursor:pointer}
    .signal-widget-mode:hover{color:var(--ex-vapor-50)}.signal-widget-mode[aria-pressed=true]{background:var(--ex-carbon-700);color:var(--ex-aqua-500)}
    .signal-workspace-body{position:relative;flex:1;min-height:0;overflow:hidden}
    .signal-unified-map{position:absolute;inset:0;background:url(../../assets/flight-terrain-v1.png) center/cover no-repeat}
    .signal-unified-map:after{content:"";position:absolute;inset:0;background:rgba(7,11,13,.34);pointer-events:none}
    .signal-map-cache{position:absolute;z-index:4;left:12px;top:12px}
    .signal-map-event{position:absolute;z-index:4;right:12px;top:12px;max-width:250px;padding:7px 9px;border:1px solid var(--ex-carbon-700);border-radius:5px;background:var(--ex-carbon-950);font:600 9px/1.35 var(--font-mono);letter-spacing:.03em;color:var(--ex-vapor-50)}.signal-map-event time{margin-right:7px;color:var(--ex-aqua-500)}
    .signal-unified-instruments{position:absolute;inset:0;background:var(--ex-carbon-950)}
    .signal-unified-instruments .signal-canvas{height:100%;min-height:0}
    .signal-unified-charts{position:absolute;inset:0;display:grid;grid-template-columns:1fr;background:var(--ex-carbon-950)}.signal-unified-charts .signal-charts-canvas{height:100%;min-height:0}
    .signal-workspace-panel.is-enlarged .signal-unified-charts{display:block}.signal-workspace-panel.is-enlarged .signal-chart-summary{position:absolute;z-index:3;right:18px;bottom:18px;width:250px;box-sizing:border-box;display:grid;grid-template-columns:1fr 1fr;gap:0 10px;border:1px solid var(--ex-carbon-700);border-radius:5px;background:var(--ex-carbon-950)}.signal-workspace-panel.is-enlarged .signal-chart-summary>.signal-title,.signal-workspace-panel.is-enlarged .signal-chart-summary>h4{grid-column:1/-1}.signal-workspace-panel.is-enlarged .signal-chart-summary-row{font-size:7px}
    .signal-chart-summary{display:none;flex-direction:column;padding:9px 10px;border-left:1px solid var(--ex-carbon-700);background:var(--ex-carbon-900)}.signal-chart-summary h4{margin:4px 0 8px;font-size:12px;color:var(--ex-vapor-50)}.signal-chart-summary-row{display:flex;justify-content:space-between;gap:6px;padding:6px 0;border-bottom:1px solid var(--ex-carbon-700);font:600 8px/1 var(--font-mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ex-graphite-400)}.signal-chart-summary-row b{color:var(--ex-field-500)}.signal-chart-summary-row b.caution{color:var(--ex-amber-500)}
    .signal-workspace-panel.is-mini .signal-workspace-subtitle,.signal-workspace-panel.is-hidden .signal-workspace-subtitle{display:none}
    .signal-workspace-panel.is-mini .signal-map-event,.signal-workspace-panel.is-mini .signal-map-cache,.signal-workspace-panel.is-mini .signal-vehicle-label{display:none}
    .signal-workspace-panel.is-mini .signal-vehicle-icon{width:30px;height:30px}
    .signal-telemetry-strip{height:50px;flex:none;display:grid;grid-template-columns:repeat(5,minmax(88px,1fr));border-top:1px solid var(--ex-carbon-700);background:var(--ex-carbon-900)}
    .signal-telemetry-item{min-width:0;padding:7px 12px;border-right:1px solid var(--ex-carbon-700);display:flex;flex-direction:column;justify-content:center}.signal-telemetry-item:last-child{border-right:0}
    .signal-telemetry-item span{font:600 8px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ex-graphite-400)}.signal-telemetry-item strong{margin-top:4px;font:600 15px/1 var(--font-data);color:var(--ex-hud-green);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.signal-telemetry-item small{font:500 8px/1 var(--font-mono);color:var(--ex-graphite-400)}
    .signal-presentation{position:fixed;z-index:300;inset:0;width:100vw;height:100dvh;min-height:0;background:var(--ex-carbon-950)}
    .signal-home{min-height:calc(100vh - 56px);padding:28px;display:grid;place-items:center;background:var(--ex-carbon-950)}
    .signal-home-inner{width:min(920px,100%)}.signal-home-head{display:flex;align-items:flex-end;gap:16px;margin-bottom:18px}.signal-home-head>div:first-child{flex:1}.signal-home-head h1{margin:4px 0 5px;font-size:27px;color:var(--ex-vapor-50)}
    .signal-launch-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:14px}.signal-launch-card{background:var(--ex-carbon-900);border:1px solid var(--ex-carbon-700);border-radius:8px;overflow:hidden}.signal-launch-body{padding:18px}.signal-launch-body h2{margin:6px 0 6px;color:var(--ex-vapor-50);font-size:20px}.signal-launch-body p{margin:0;color:var(--ex-graphite-400);font-size:13px;line-height:1.55}
    .signal-prep-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-top:1px solid var(--ex-carbon-700)}.signal-prep-row strong{display:block;font:600 12px var(--font-data);color:var(--ex-vapor-50)}.signal-prep-row span{display:block;margin-top:3px;font-size:11px;color:var(--ex-graphite-400)}
    .signal-rule{display:flex;gap:10px;padding:11px 0;border-bottom:1px solid var(--ex-carbon-700)}.signal-rule:last-child{border-bottom:0}.signal-rule-icon{width:28px;height:28px;flex:none;border-radius:6px;display:grid;place-items:center;background:var(--ex-carbon-800);color:var(--ex-aqua-500)}.signal-rule strong{display:block;color:var(--ex-vapor-50);font-size:12px}.signal-rule span{display:block;margin-top:4px;color:var(--ex-graphite-400);font-size:11px;line-height:1.45}
    .signal-choice{display:grid;grid-template-columns:1fr 1fr;gap:10px}.signal-choice button{padding:14px;border:1px solid var(--border-rule);border-radius:7px;background:var(--surface-card);text-align:left;cursor:pointer;color:var(--text-body)}.signal-choice button[data-active=true]{border-color:var(--ex-aqua-500);background:var(--surface-hover)}.signal-choice strong{display:block;margin:8px 0 4px;color:var(--text-strong)}.signal-choice span{font-size:12px;line-height:1.4;color:var(--text-muted)}
    .signal-detect{display:grid;gap:10px;padding:12px;border:1px solid var(--ex-field-500);border-radius:7px;background:var(--ex-state-ready-bg)}.signal-detect strong{display:block;margin-top:5px;font:600 13px var(--font-data);color:var(--text-strong)}.signal-help{padding:11px 12px;border-radius:6px;background:var(--surface-panel);font-size:12px;line-height:1.5;color:var(--text-muted)}
    @media(max-width:1100px){.signal-status{grid-template-columns:minmax(130px,1fr) minmax(120px,.9fr) 76px minmax(145px,.9fr) auto}.signal-status-cell,.signal-link-stack{padding-left:8px;padding-right:8px}.signal-session-actions{gap:5px;padding-left:7px;padding-right:7px}.signal-session-actions .signal-action-label--optional{display:none}.signal-tool-button{padding:0 8px}.signal-telemetry-item{padding-left:8px;padding-right:8px}}
    @media(max-width:950px){.signal-status-cell:nth-child(2){display:none}.signal-status{grid-template-columns:minmax(145px,1.1fr) 86px minmax(155px,1fr) auto}}
    @media(max-width:700px){.signal-status{grid-template-columns:minmax(145px,1fr) 86px auto;grid-template-rows:46px 40px}.signal-status-cell:first-child{grid-column:1;grid-row:1}.signal-status-cell:nth-child(3){grid-column:2;grid-row:1}.signal-link-stack{grid-column:1/3;grid-row:2;display:flex;align-items:center;gap:9px;border-top:1px solid var(--ex-carbon-700);border-right:1px solid var(--ex-carbon-700)}.signal-link-row{min-width:0;grid-template-columns:auto;gap:2px}.signal-link-row b{font-size:8px}.signal-session-actions{grid-column:3;grid-row:1/3}.signal-tool-button{padding:0 7px}}
    @media(max-width:900px){.signal-launch-grid{grid-template-columns:1fr}.signal-vehicle-label{min-width:150px;font-size:10px}.signal-choice{grid-template-columns:1fr}.signal-live-shell{min-height:700px}.signal-workspace-head-actions .exds-badge{display:none}.signal-widget-mode{padding:0 5px}.signal-telemetry-strip{grid-template-columns:repeat(5,minmax(70px,1fr))}}
  `;
    if (!document.getElementById("signal-screen-css")) {
      const s = document.createElement("style");
      s.id = "signal-screen-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    function Signal2({ activeFlight, preparationFlights, onStartSession, onEndSession }) {
      const [panelModes, setPanelModes] = React.useState({ map: "enlarged", instruments: "mini", charts: "mini" });
      const [presentation, setPresentation] = React.useState(false);
      const [cloudLive, setCloudLive] = React.useState(true);
      const [startOpen, setStartOpen] = React.useState(false);
      const [events, setEvents] = React.useState([
        { t: "12:08:10", label: "Exit detected", state: "ready" },
        { t: "12:08:22", label: "Radio link established", state: "live" },
        { t: "12:11:03", label: "Pitot differential flag", state: "caution" }
      ]);
      const markEvent = () => setEvents((e) => [...e, { t: "12:14:50", label: `Operator marker ${e.length - 2}`, state: "live" }]);
      const setPanelMode = (id, mode) => setPanelModes((current) => {
        const next = { ...current, [id]: mode };
        if (mode === "enlarged") ["map", "instruments", "charts"].forEach((other) => {
          if (other !== id && next[other] === "enlarged") next[other] = "mini";
        });
        return next;
      });
      if (!activeFlight) return /* @__PURE__ */ React.createElement(SignalHome, { preparations: preparationFlights, onStart: () => setStartOpen(true) }, startOpen && /* @__PURE__ */ React.createElement(SignalStartDrawer, { preparations: preparationFlights, onClose: () => setStartOpen(false), onStart: onStartSession }));
      return /* @__PURE__ */ React.createElement("div", { className: `signal-root ex-dark signal-live-shell ${presentation ? "signal-presentation" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "signal-status" }, /* @__PURE__ */ React.createElement(StatusCell, { k: "Active flight", v: activeFlight.id, sub: "attached" }), /* @__PURE__ */ React.createElement(StatusCell, { k: "Aircraft", v: activeFlight.aircraft }), /* @__PURE__ */ React.createElement(StatusCell, { k: "Elapsed", v: "T0+06:32", live: true }), /* @__PURE__ */ React.createElement(LinkStack, { cloudLive }), /* @__PURE__ */ React.createElement("div", { className: "signal-session-actions" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "signal-tool-button", "aria-label": presentation ? "Exit full screen" : "Full screen", title: presentation ? "Exit full screen" : "Full screen", "aria-pressed": presentation, onClick: () => setPresentation((v) => !v) }, /* @__PURE__ */ React.createElement(Icon, { name: presentation ? "x" : "arrow-up-right", size: 14 }), /* @__PURE__ */ React.createElement("span", { className: "signal-action-label--optional" }, presentation ? "Exit full screen" : "Full screen")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "signal-tool-button icon-only", "aria-label": cloudLive ? "Simulate Internet cut" : "Restore Internet", title: cloudLive ? "Simulate Internet cut" : "Restore Internet", onClick: () => setCloudLive((v) => !v) }, /* @__PURE__ */ React.createElement(Icon, { name: cloudLive ? "signal" : "rotate-ccw", size: 14 })), /* @__PURE__ */ React.createElement("button", { type: "button", className: "signal-tool-button", onClick: onEndSession }, "End session"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "signal-tool-button", onClick: markEvent }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 15 }), /* @__PURE__ */ React.createElement("span", null, "Mark event")))), /* @__PURE__ */ React.createElement(UnifiedDashboard, { panelModes, onPanelMode: setPanelMode, flight: activeFlight, cloudLive, events }), /* @__PURE__ */ React.createElement(TelemetryStrip, null));
    }
    function SignalHome({ preparations, onStart, children }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-root ex-dark" }, /* @__PURE__ */ React.createElement("div", { className: "signal-home" }, /* @__PURE__ */ React.createElement("div", { className: "signal-home-inner" }, /* @__PURE__ */ React.createElement("div", { className: "signal-home-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "signal-title" }, "Ground station"), /* @__PURE__ */ React.createElement("h1", null, "Signal sessions"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ex-graphite-400)", fontSize: 13 } }, "Start live acquisition from a prepared Flight, or let Signal create one.")), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "radio", size: 17 }), onClick: onStart }, "Start live session")), /* @__PURE__ */ React.createElement("div", { className: "signal-launch-grid" }, /* @__PURE__ */ React.createElement("section", { className: "signal-launch-card" }, /* @__PURE__ */ React.createElement("div", { className: "signal-panel-head" }, /* @__PURE__ */ React.createElement("span", { className: "signal-title" }, "Flights ready for Signal"), /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, preparations.length)), preparations.map((f) => /* @__PURE__ */ React.createElement("div", { className: "signal-prep-row", key: f.id }, /* @__PURE__ */ React.createElement("span", { className: "signal-rule-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "plane", size: 16 })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("strong", null, f.id, " · ", f.aircraft), /* @__PURE__ */ React.createElement("span", null, "Planned ", f.date)), /* @__PURE__ */ React.createElement(StatusDot, { state: "unknown", label: "Preparation" })))), /* @__PURE__ */ React.createElement("section", { className: "signal-launch-card" }, /* @__PURE__ */ React.createElement("div", { className: "signal-panel-head" }, /* @__PURE__ */ React.createElement("span", { className: "signal-title" }, "Automatic Flight rule")), /* @__PURE__ */ React.createElement("div", { className: "signal-launch-body" }, /* @__PURE__ */ React.createElement("h2", null, "No telemetry is orphaned"), /* @__PURE__ */ React.createElement("p", null, "Every live session belongs to a Flight, even when the operator starts from Signal."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 15 } }, /* @__PURE__ */ React.createElement(Rule, { icon: "clipboard-check", title: "Prepared Flight selected", copy: "Signal inherits the Flight ID and aircraft." }), /* @__PURE__ */ React.createElement(Rule, { icon: "search", title: "Aircraft detected", copy: "Device identity prefills the aircraft." }), /* @__PURE__ */ React.createElement(Rule, { icon: "file-text", title: "Aircraft unresolved", copy: "Signal creates a Flight with the aircraft set to To complete for later review." }))))))), children);
    }
    function SignalStartDrawer({ preparations, onClose, onStart }) {
      const [mode, setMode] = React.useState(preparations.length ? "existing" : "automatic");
      const [flightId, setFlightId] = React.useState(preparations[0]?.id || "");
      return /* @__PURE__ */ React.createElement(Drawer, { title: "Start live session", eyebrow: "Signal acquisition", description: "Choose how this session should be attached to a Flight.", onClose, footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: onClose }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { iconLeft: /* @__PURE__ */ React.createElement(Icon, { name: "radio", size: 16 }), onClick: () => onStart({ mode, flightId, aircraft: "EXO-001" }) }, "Start acquisition")) }, /* @__PURE__ */ React.createElement("div", { className: "signal-choice" }, /* @__PURE__ */ React.createElement("button", { type: "button", "data-active": mode === "existing", "aria-pressed": mode === "existing", onClick: () => setMode("existing") }, /* @__PURE__ */ React.createElement(Icon, { name: "clipboard-check", size: 19 }), /* @__PURE__ */ React.createElement("strong", null, "Use prepared Flight"), /* @__PURE__ */ React.createElement("span", null, "Attach Signal to a Flight already in Preparation.")), /* @__PURE__ */ React.createElement("button", { type: "button", "data-active": mode === "automatic", "aria-pressed": mode === "automatic", onClick: () => setMode("automatic") }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 19 }), /* @__PURE__ */ React.createElement("strong", null, "Create automatically"), /* @__PURE__ */ React.createElement("span", null, "Create a Flight as soon as acquisition starts."))), mode === "existing" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Select, { label: "Prepared Flight", value: flightId, onChange: (e) => setFlightId(e.target.value), options: preparations.map((flight) => ({ value: flight.id, label: `${flight.id} · ${flight.aircraft}` })) }), /* @__PURE__ */ React.createElement("div", { className: "signal-help" }, "The selected Flight moves from Preparation to Live and receives this Signal session automatically.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "signal-detect" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--text-muted)" } }, "Aircraft detected"), /* @__PURE__ */ React.createElement("strong", null, "EXO-001"))), /* @__PURE__ */ React.createElement("div", { className: "signal-help" }, "Signal creates a Flight with default values. The detected aircraft is filled now; an unresolved aircraft is stored as To complete without blocking capture.")));
    }
    function Rule({ icon, title, copy }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-rule" }, /* @__PURE__ */ React.createElement("span", { className: "signal-rule-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 15 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, title), /* @__PURE__ */ React.createElement("span", null, copy)));
    }
    function StatusCell({ k, v, sub, live, caution }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-status-cell" }, /* @__PURE__ */ React.createElement("span", { className: "signal-k" }, k), /* @__PURE__ */ React.createElement("span", { className: "signal-v" }, /* @__PURE__ */ React.createElement("i", { className: `signal-dot ${live ? "live" : ""} ${caution ? "caution" : ""}` }), v), sub && /* @__PURE__ */ React.createElement("span", { className: "signal-status-sub" }, sub));
    }
    function LinkStack({ cloudLive }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-link-stack", "aria-label": "Capture and synchronization status" }, /* @__PURE__ */ React.createElement(LinkRow, { label: "Radio", value: "Linked · −78 dBm" }), /* @__PURE__ */ React.createElement(LinkRow, { label: "Recorder", value: "Local capture" }), /* @__PURE__ */ React.createElement(LinkRow, { label: "Cloud", value: cloudLive ? "Live" : "18 s behind", caution: !cloudLive }));
    }
    function LinkRow({ label, value, caution }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-link-row" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("b", { className: caution ? "caution" : "" }, /* @__PURE__ */ React.createElement("i", { className: `signal-dot ${caution ? "caution" : ""}` }), value));
    }
    function TelemetryStrip() {
      return /* @__PURE__ */ React.createElement("footer", { className: "signal-telemetry-strip", "aria-label": "Shared live telemetry" }, /* @__PURE__ */ React.createElement(TelemetryValue, { label: "Heading", value: "036", unit: "deg" }), /* @__PURE__ */ React.createElement(TelemetryValue, { label: "Airspeed", value: "214", unit: "km/h" }), /* @__PURE__ */ React.createElement(TelemetryValue, { label: "Altitude", value: "1 480", unit: "m AMSL" }), /* @__PURE__ */ React.createElement(TelemetryValue, { label: "Vertical speed", value: "−4.6", unit: "m/s" }), /* @__PURE__ */ React.createElement(TelemetryValue, { label: "Glide", value: "12.4", unit: "L/D" }));
    }
    function TelemetryValue({ label, value, unit }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-telemetry-item" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, value, unit && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", /* @__PURE__ */ React.createElement("small", null, unit))));
    }
    function panelLayout(size, modes) {
      const ids = ["map", "instruments", "charts"], pad = 8, gap = 8, width = Math.max(0, size.width), height = Math.max(0, size.height);
      const enlarged = ids.find((id) => modes[id] === "enlarged");
      const rects = {};
      if (enlarged) {
        if (width < 720) {
          const sideIds2 = ids.filter((id) => id !== enlarged), panelWidth = Math.max(0, width - pad * 2), mainHeight = Math.max(260, Math.round(height * 0.52));
          rects[enlarged] = { left: pad, top: pad, width: panelWidth, height: mainHeight };
          const usable2 = Math.max(76, height - mainHeight - pad * 2 - gap * 2), hiddenCount2 = sideIds2.filter((id) => modes[id] === "hidden").length, miniCount2 = sideIds2.length - hiddenCount2;
          const miniHeight2 = miniCount2 ? Math.max(90, (usable2 - hiddenCount2 * 38) / miniCount2) : 38;
          let top2 = pad + mainHeight + gap;
          sideIds2.forEach((id) => {
            const panelHeight = modes[id] === "hidden" ? 38 : miniHeight2;
            rects[id] = { left: pad, top: top2, width: panelWidth, height: panelHeight };
            top2 += panelHeight + gap;
          });
          return rects;
        }
        const sideIds = ids.filter((id) => id !== enlarged), sideWidth = Math.min(340, Math.max(270, Math.round(width * 0.28)));
        const mainWidth = Math.max(360, width - sideWidth - gap - pad * 2);
        rects[enlarged] = { left: pad, top: pad, width: mainWidth, height: Math.max(180, height - pad * 2) };
        const hiddenCount = sideIds.filter((id) => modes[id] === "hidden").length, miniCount = sideIds.length - hiddenCount;
        const usable = Math.max(120, height - pad * 2 - gap * (sideIds.length - 1)), miniHeight = miniCount ? Math.max(120, (usable - hiddenCount * 38) / miniCount) : 38;
        let top = pad;
        sideIds.forEach((id) => {
          const panelHeight = modes[id] === "hidden" ? 38 : miniHeight;
          rects[id] = { left: pad + mainWidth + gap, top, width: sideWidth, height: panelHeight };
          top += panelHeight + gap;
        });
        return rects;
      }
      const columnWidth = Math.max(230, (width - pad * 2 - gap * 2) / 3);
      ids.forEach((id, index) => {
        rects[id] = { left: pad + index * (columnWidth + gap), top: pad, width: columnWidth, height: modes[id] === "hidden" ? 38 : Math.min(270, Math.max(150, height - pad * 2)) };
      });
      return rects;
    }
    function UnifiedDashboard({ panelModes, onPanelMode, flight, cloudLive, events }) {
      const boardRef = React.useRef(null);
      const [size, setSize] = React.useState({ width: 1200, height: 620 });
      const [offsets, setOffsets] = React.useState({ map: { x: 0, y: 0 }, instruments: { x: 0, y: 0 }, charts: { x: 0, y: 0 } });
      const [activePanel, setActivePanel] = React.useState(null);
      const [draggingPanel, setDraggingPanel] = React.useState(null);
      const dragRef = React.useRef(null);
      React.useLayoutEffect(() => {
        const node = boardRef.current;
        if (!node) return;
        const measure = () => setSize({ width: node.clientWidth, height: node.clientHeight });
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
      }, []);
      const rects = panelLayout(size, panelModes);
      const changeMode = (id, mode) => onPanelMode(id, mode);
      const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
      const panelRect = (id) => {
        const base = rects[id], offset = offsets[id];
        return { ...base, left: clamp(base.left + offset.x, 0, size.width - base.width), top: clamp(base.top + offset.y, 0, size.height - base.height) };
      };
      const panelStyle = (id) => ({ ...panelRect(id), zIndex: activePanel === id ? 10 : panelModes[id] === "enlarged" ? 1 : 4 });
      const beginDrag = (event, id) => {
        if (event.button !== 0) return;
        event.preventDefault();
        dragRef.current?.stop?.();
        const rect = panelRect(id);
        const drag = { id, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, left: rect.left, top: rect.top, baseLeft: rects[id].left, baseTop: rects[id].top, width: rect.width, height: rect.height };
        const move = (next) => {
          if (next.pointerId !== drag.pointerId) return;
          const left = clamp(drag.left + next.clientX - drag.startX, 0, size.width - drag.width), top = clamp(drag.top + next.clientY - drag.startY, 0, size.height - drag.height);
          setOffsets((current) => ({ ...current, [drag.id]: { x: left - drag.baseLeft, y: top - drag.baseTop } }));
        };
        const stop = (next) => {
          if (next?.pointerId !== void 0 && next.pointerId !== drag.pointerId) return;
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", stop);
          window.removeEventListener("pointercancel", stop);
          window.removeEventListener("blur", stop);
          dragRef.current = null;
          setDraggingPanel(null);
        };
        dragRef.current = { ...drag, stop };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", stop);
        window.addEventListener("pointercancel", stop);
        window.addEventListener("blur", stop);
        setActivePanel(id);
        setDraggingPanel(id);
      };
      const nudgePanel = (event, id) => {
        const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
        if (!direction) return;
        event.preventDefault();
        const step = event.shiftKey ? 24 : 8, rect = panelRect(id), left = clamp(rect.left + direction[0] * step, 0, size.width - rect.width), top = clamp(rect.top + direction[1] * step, 0, size.height - rect.height);
        setActivePanel(id);
        setOffsets((current) => ({ ...current, [id]: { x: left - rects[id].left, y: top - rects[id].top } }));
      };
      const resetPanel = (id) => {
        setActivePanel(id);
        setOffsets((current) => ({ ...current, [id]: { x: 0, y: 0 } }));
      };
      const layoutKey = `${Math.round(size.width)}-${Math.round(size.height)}`;
      const panelInteraction = { onDragStart: beginDrag, onNudge: nudgePanel, onReset: resetPanel };
      return /* @__PURE__ */ React.createElement("main", { ref: boardRef, className: "signal-dashboard", "aria-label": "Movable live Signal widgets" }, /* @__PURE__ */ React.createElement(WorkspacePanel, { id: "map", title: "Live map", subtitle: "Flight path and heading", icon: "map", mode: panelModes.map, style: panelStyle("map"), dragging: draggingPanel === "map", onMode: changeMode, ...panelInteraction }, /* @__PURE__ */ React.createElement(UnifiedMap, { key: `map-${panelModes.map}-${layoutKey}`, flight, events })), /* @__PURE__ */ React.createElement(WorkspacePanel, { id: "instruments", title: "Instruments", subtitle: "Ground-reconstructed flight state", icon: "gauge", mode: panelModes.instruments, style: panelStyle("instruments"), dragging: draggingPanel === "instruments", onMode: changeMode, ...panelInteraction }, /* @__PURE__ */ React.createElement(UnifiedInstruments, { key: `instruments-${panelModes.instruments}-${layoutKey}`, enlarged: panelModes.instruments === "enlarged" })), /* @__PURE__ */ React.createElement(WorkspacePanel, { id: "charts", title: "Charts", subtitle: "Aligned telemetry and stream validity", icon: "activity", mode: panelModes.charts, style: panelStyle("charts"), dragging: draggingPanel === "charts", onMode: changeMode, ...panelInteraction }, /* @__PURE__ */ React.createElement(UnifiedCharts, { key: `charts-${panelModes.charts}-${layoutKey}`, cloudLive, enlarged: panelModes.charts === "enlarged" })));
    }
    function WorkspacePanel({ id, title, subtitle, icon, mode, style, dragging, onMode, onDragStart, onNudge, onReset, children }) {
      return /* @__PURE__ */ React.createElement("section", { className: `signal-workspace-panel signal-panel-${id} is-${mode}${dragging ? " is-dragging" : ""}`, style, "aria-label": title, "data-widget": id, "data-mode": mode }, /* @__PURE__ */ React.createElement("header", { className: "signal-workspace-head" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "signal-drag-handle", "aria-label": `Move ${title}. Use arrow keys; hold Shift for larger steps. Double-click to reset.`, title: `Move ${title} · double-click to reset`, onPointerDown: (event) => onDragStart(event, id), onKeyDown: (event) => onNudge(event, id), onDoubleClick: () => onReset(id) }, /* @__PURE__ */ React.createElement(Icon, { name: "menu", size: 13 })), /* @__PURE__ */ React.createElement("span", { className: "signal-workspace-head-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 15 })), /* @__PURE__ */ React.createElement("strong", null, title), /* @__PURE__ */ React.createElement("span", { className: "signal-workspace-subtitle" }, subtitle), /* @__PURE__ */ React.createElement("span", { className: "signal-workspace-head-actions" }, /* @__PURE__ */ React.createElement(Badge, { tone: "live" }, "Live"), /* @__PURE__ */ React.createElement("span", { className: "signal-widget-modes", "aria-label": `${title} size` }, /* @__PURE__ */ React.createElement(ModeButton, { label: "Large", pressed: mode === "enlarged", onClick: () => onMode(id, "enlarged") }), /* @__PURE__ */ React.createElement(ModeButton, { label: "Mini", pressed: mode === "mini", onClick: () => onMode(id, "mini") }), /* @__PURE__ */ React.createElement(ModeButton, { label: "Hide", pressed: mode === "hidden", onClick: () => onMode(id, "hidden") })))), /* @__PURE__ */ React.createElement("div", { className: "signal-workspace-body" }, children));
    }
    function ModeButton({ label, pressed, onClick }) {
      return /* @__PURE__ */ React.createElement("button", { type: "button", className: "signal-widget-mode", "aria-pressed": pressed, onClick }, label);
    }
    function UnifiedMap({ flight, events }) {
      const latest = events[events.length - 1];
      return /* @__PURE__ */ React.createElement("div", { className: "signal-unified-map" }, /* @__PURE__ */ React.createElement(LiveFlightTrack, { flight }), /* @__PURE__ */ React.createElement("div", { className: "signal-map-cache" }, /* @__PURE__ */ React.createElement(Badge, { tone: "neutral" }, "Terrain cached · 09:08 UTC")), latest && /* @__PURE__ */ React.createElement("div", { className: "signal-map-event" }, /* @__PURE__ */ React.createElement("time", null, latest.t), latest.label));
    }
    function UnifiedInstruments({ enlarged }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-unified-instruments" }, /* @__PURE__ */ React.createElement(AttitudeCanvas, { compact: !enlarged }));
    }
    function UnifiedCharts({ cloudLive, enlarged }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-unified-charts" }, /* @__PURE__ */ React.createElement(ChartsCanvas, { cloudLive, compact: !enlarged }), /* @__PURE__ */ React.createElement("aside", { className: "signal-chart-summary" }, /* @__PURE__ */ React.createElement("span", { className: "signal-title" }, "Stream health"), /* @__PURE__ */ React.createElement("h4", null, cloudLive ? "Streams healthy" : "Cloud reconnecting"), /* @__PURE__ */ React.createElement(ChartHealth, { label: "GNSS", value: "Valid" }), /* @__PURE__ */ React.createElement(ChartHealth, { label: "IMU", value: "Valid" }), /* @__PURE__ */ React.createElement(ChartHealth, { label: "Pitot", value: "Monitor", caution: true }), /* @__PURE__ */ React.createElement(ChartHealth, { label: "Radio", value: "Nominal" }), /* @__PURE__ */ React.createElement(ChartHealth, { label: "Cloud", value: cloudLive ? "Live" : "18 s behind", caution: !cloudLive })));
    }
    function ChartHealth({ label, value, caution }) {
      return /* @__PURE__ */ React.createElement("div", { className: "signal-chart-summary-row" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("b", { className: caution ? "caution" : "" }, value));
    }
    function LiveFlightTrack({ flight }) {
      const [step, setStep] = React.useState(0);
      React.useEffect(() => {
        const timer = window.setInterval(() => setStep((s) => (s + 1) % 5), 900);
        return () => window.clearInterval(timer);
      }, []);
      const x = 43.5 + step * 0.35;
      const y = 53 - step * 0.16;
      const heading = 34 + Math.round(step / 2);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FlightPathCanvas, { progress: step }), /* @__PURE__ */ React.createElement("div", { className: "signal-vehicle", style: { left: `${x}%`, top: `${y}%` } }, /* @__PURE__ */ React.createElement("span", { className: "signal-heading-line", style: { transform: `rotate(${heading}deg)` } }), /* @__PURE__ */ React.createElement("span", { className: "signal-vehicle-icon", style: { transform: `rotate(${heading}deg)` } }, /* @__PURE__ */ React.createElement(Icon, { name: "plane", size: 23, strokeWidth: 1.8 })), /* @__PURE__ */ React.createElement("span", { className: "signal-vehicle-label" }, /* @__PURE__ */ React.createElement("strong", null, flight.id, " · LIVE"), /* @__PURE__ */ React.createElement("br", null), "1 480 m · 214 km/h · ", String(heading).padStart(3, "0"), "°")));
    }
    function FlightPathCanvas({ progress }) {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const c = ref.current, ctx = c.getContext("2d"), d = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
        c.width = w * d;
        c.height = h * d;
        ctx.scale(d, d);
        ctx.clearRect(0, 0, w, h);
        const styles = getComputedStyle(document.documentElement), vapor = styles.getPropertyValue("--ex-vapor-150").trim(), hud = styles.getPropertyValue("--ex-hud-green").trim();
        const points = [[0.08, 0.28], [0.16, 0.36], [0.24, 0.44], [0.31, 0.49], [0.37, 0.51], [0.435 + progress * 35e-4, 0.53 - progress * 16e-4]];
        const path = () => {
          ctx.beginPath();
          points.forEach(([px, py], i) => {
            const x = px * w, y = py * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
        };
        ctx.globalAlpha = 0.58;
        ctx.strokeStyle = vapor;
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 8]);
        path();
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = hud;
        ctx.lineWidth = 3;
        ctx.setLineDash([7, 6]);
        ctx.beginPath();
        points.slice(2).forEach(([px, py], i) => {
          const x = px * w, y = py * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
        const last = points[points.length - 1], lx = last[0] * w, ly = last[1] * h;
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = hud;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx + 95, ly - 70);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }, [progress]);
      return /* @__PURE__ */ React.createElement("canvas", { ref, className: "signal-track", "aria-label": "Live flight path and heading" });
    }
    function AttitudeCanvas({ compact = false }) {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const c = ref.current, ctx = c.getContext("2d"), d = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
        c.width = w * d;
        c.height = h * d;
        ctx.scale(d, d);
        const styles = getComputedStyle(document.documentElement), carbon950 = styles.getPropertyValue("--ex-carbon-950").trim(), carbon900 = styles.getPropertyValue("--ex-carbon-900").trim(), carbon700 = styles.getPropertyValue("--ex-carbon-700").trim(), sky = styles.getPropertyValue("--ex-sky-500").trim(), hud = styles.getPropertyValue("--ex-hud-green").trim(), amber = styles.getPropertyValue("--ex-amber-500").trim(), graphite = styles.getPropertyValue("--ex-graphite-500").trim(), vapor = styles.getPropertyValue("--ex-vapor-150").trim(), vapor50 = styles.getPropertyValue("--ex-vapor-50").trim();
        ctx.fillStyle = carbon950;
        ctx.fillRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2 + 8, r = Math.min(w, h) * 0.36;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.lineTo(cx + r, cy + 26);
        ctx.lineTo(cx - r, cy + 26);
        ctx.closePath();
        ctx.clip();
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = sky;
        ctx.fillRect(cx - r, cy - r, r * 2, r);
        ctx.globalAlpha = 1;
        ctx.fillStyle = carbon900;
        ctx.fillRect(cx - r, cy, r * 2, r);
        ctx.strokeStyle = vapor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - r, cy);
        ctx.lineTo(cx + r, cy);
        ctx.stroke();
        ctx.restore();
        ctx.strokeStyle = hud;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.stroke();
        ctx.strokeStyle = amber;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - 80, cy - 7);
        ctx.lineTo(cx - 24, cy - 7);
        ctx.lineTo(cx, cy + 6);
        ctx.lineTo(cx + 24, cy - 7);
        ctx.lineTo(cx + 80, cy - 7);
        ctx.stroke();
        ctx.fillStyle = hud;
        ctx.font = `600 ${compact ? 24 : 28}px ui-monospace`;
        ctx.textAlign = "center";
        ctx.fillText("036°", cx, compact ? 36 : 44);
        ctx.fillStyle = graphite;
        ctx.font = "600 10px ui-monospace";
        ctx.fillText("HEADING", cx, compact ? 52 : 62);
        ctx.fillStyle = vapor50;
        ctx.font = `500 ${compact ? 10 : 13}px ui-monospace`;
        ctx.fillText("FLIGHT DATA · LIVE", cx, h - (compact ? 18 : 34));
        if (compact) return;
        const tape = (x, label, value, steps, unit, side) => {
          ctx.textAlign = side === "left" ? "left" : "right";
          ctx.fillStyle = graphite;
          ctx.font = "600 10px ui-monospace";
          ctx.fillText(label, x, 78);
          ctx.fillText(unit, x, 94);
          ctx.strokeStyle = graphite;
          ctx.lineWidth = 1;
          for (let i = -2; i <= 2; i++) {
            const y = cy + i * 42;
            ctx.beginPath();
            ctx.moveTo(x + (side === "left" ? 48 : -48), y);
            ctx.lineTo(x + (side === "left" ? 72 : -72), y);
            ctx.stroke();
            ctx.fillStyle = i === 0 ? hud : vapor;
            ctx.font = i === 0 ? "600 18px ui-monospace" : "500 12px ui-monospace";
            ctx.fillText(String(value + i * steps), x, y + 5);
          }
          ctx.strokeStyle = hud;
          ctx.strokeRect(x + (side === "left" ? 36 : -102), cy - 18, 66, 36);
        };
        tape(38, "AIRSPEED", 214, 10, "km/h", "left");
        tape(w - 185, "V/S", -5, 5, "m/s", "right");
        tape(w - 32, "ALTITUDE", 1480, 100, "m", "right");
        ctx.strokeStyle = carbon700;
        ctx.lineWidth = 1;
        for (let y = 95; y < h - 70; y += 36) {
          ctx.beginPath();
          ctx.moveTo(40, y);
          ctx.lineTo(w - 40, y);
          ctx.stroke();
        }
      }, [compact]);
      return /* @__PURE__ */ React.createElement("canvas", { ref, className: "signal-canvas", "aria-label": "Ground reconstructed attitude instrument" });
    }
    function ChartsCanvas({ cloudLive, compact = false }) {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const c = ref.current, ctx = c.getContext("2d"), d = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
        c.width = w * d;
        c.height = h * d;
        ctx.scale(d, d);
        const styles = getComputedStyle(document.documentElement), carbon950 = styles.getPropertyValue("--ex-carbon-950").trim(), carbon700 = styles.getPropertyValue("--ex-carbon-700").trim(), graphite = styles.getPropertyValue("--ex-graphite-400").trim(), vapor = styles.getPropertyValue("--ex-vapor-150").trim(), aqua = styles.getPropertyValue("--ex-aqua-500").trim(), sky = styles.getPropertyValue("--ex-sky-500").trim(), field = styles.getPropertyValue("--ex-field-500").trim(), amber = styles.getPropertyValue("--ex-amber-500").trim();
        ctx.fillStyle = carbon950;
        ctx.fillRect(0, 0, w, h);
        if (compact) {
          const left2 = 112, right2 = w - 14, top2 = 25, row2 = Math.max(33, (h - 32) / 4);
          ctx.textAlign = "left";
          [["AIRSPEED", "214"], ["ALTITUDE", "1 480"], ["VERTICAL SPEED", "−4.6"], ["DATA VALIDITY", "Valid"]].forEach(([lab, value], i) => {
            const y = top2 + i * row2;
            ctx.fillStyle = graphite;
            ctx.font = "600 8px ui-monospace";
            ctx.fillText(lab, 12, y);
            ctx.fillStyle = i === 3 ? field : vapor;
            ctx.font = "600 13px ui-monospace";
            ctx.fillText(value, 12, y + 17);
            ctx.strokeStyle = i === 3 ? field : aqua;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = left2; x <= right2; x += 6) {
              const t = (x - left2) / Math.max(1, right2 - left2), yy = y + 7 + Math.sin(t * 16 + i) * 2 + (i === 3 && !cloudLive && t > 0.72 ? 8 : 0);
              if (x === left2) ctx.moveTo(x, yy);
              else ctx.lineTo(x, yy);
            }
            ctx.stroke();
          });
          ctx.strokeStyle = aqua;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(left2 + (right2 - left2) * 0.68, 10);
          ctx.lineTo(left2 + (right2 - left2) * 0.68, h - 10);
          ctx.stroke();
          return;
        }
        const left = 154, right = w - 24, top = 38, row = 61;
        ctx.font = "600 10px ui-monospace";
        ctx.textAlign = "left";
        const rows = [["AIRSPEED", "km/h", "214"], ["ALTITUDE", "m", "1 480"], ["VERTICAL SPEED", "m/s", "−4.6"], ["GLIDE RATIO", "L/D", "12.4"], ["RADIO QUALITY", "RSSI dBm", "−78"], ["DATA VALIDITY", "", "Valid"]];
        rows.forEach(([lab, unit, value], i) => {
          const y = top + i * row;
          ctx.fillStyle = graphite;
          ctx.fillText(lab, 14, y);
          ctx.font = "500 9px ui-monospace";
          ctx.fillText(unit, 14, y + 14);
          ctx.fillStyle = i === 5 ? field : vapor;
          ctx.font = "600 16px ui-monospace";
          ctx.fillText(value, 14, y + 37);
          ctx.font = "600 10px ui-monospace";
          ctx.strokeStyle = carbon700;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(left, y + 22);
          ctx.lineTo(right, y + 22);
          ctx.stroke();
          ctx.strokeStyle = i === 4 ? sky : i === 5 ? field : aqua;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = left; x <= right; x += 8) {
            let t = (x - left) / (right - left), yy = y + 12 + Math.sin(t * 18 + i) * 2;
            if (i === 4 && t > 0.42 && t < 0.52) yy += 28;
            if (i === 5 && !cloudLive && t > 0.72) yy += 12;
            if (x === left) ctx.moveTo(x, yy);
            else ctx.lineTo(x, yy);
          }
          ctx.stroke();
        });
        ctx.strokeStyle = aqua;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left + (right - left) * 0.68, 18);
        ctx.lineTo(left + (right - left) * 0.68, h - 24);
        ctx.stroke();
        ctx.fillStyle = vapor;
        ctx.font = "600 11px ui-monospace";
        ctx.fillText("T0+06:32", left + (right - left) * 0.68 + 8, 20);
        ctx.fillStyle = amber;
        ctx.fillText("PITOT FLAG · RESOLVED", left + (right - left) * 0.31, top + 2 * row + 45);
        if (!cloudLive) {
          ctx.fillText("CLOUD 18 s BEHIND · LOCAL CAPTURE CONTINUES", left + (right - left) * 0.62, top + 5 * row + 47);
        }
      }, [cloudLive, compact]);
      return /* @__PURE__ */ React.createElement("canvas", { ref, className: "signal-charts-canvas", "aria-label": "Aligned live telemetry charts" });
    }
    window.OSSignal = { Signal: Signal2 };
  })();

  // ui_kits/os-flight/app.jsx
  var { Shell } = window.OSShell;
  var { Logbook, INITIAL_FLIGHTS } = window.OSLogbook;
  var { Replay } = window.OSReplay;
  var { FlightPrep } = window.OSFlightPrep;
  var { Hud } = window.OSHud;
  var { Hangar } = window.OSHangar;
  var { Signal } = window.OSSignal;
  var SUBTABS = [
    { id: "logbook", label: "Flights" },
    { id: "prep", label: "Flight prep" },
    { id: "hud", label: "HUD" }
  ];
  function App() {
    const [room, setRoom] = React.useState("flight");
    const [sub, setSub] = React.useState("logbook");
    const [flight, setFlight] = React.useState(null);
    const [flights, setFlights] = React.useState(INITIAL_FLIGHTS);
    const [signalFlight, setSignalFlight] = React.useState(null);
    const openFlight = (selectedFlight) => {
      setFlight(selectedFlight);
      setSub("replay");
    };
    const openSignalForFlight = (selectedFlight) => {
      const live = { ...selectedFlight, source: "Live session", status: "live", state: "live", label: "Live" };
      setFlights((rows) => rows.map((row) => row.id === selectedFlight.id ? live : row));
      setSignalFlight(live);
      setRoom("signal");
    };
    const startSignalSession = ({ mode, flightId, aircraft }) => {
      if (mode === "existing") {
        const prepared = flights.find((candidate) => candidate.id === flightId);
        if (prepared) openSignalForFlight(prepared);
        return;
      }
      const max = flights.reduce((number, candidate) => Math.max(number, Number(candidate.id.split("-").pop()) || 0), 0);
      const created = {
        id: `FLT-2026-${String(max + 1).padStart(3, "0")}`,
        aircraft: aircraft || "To complete",
        location: "Not recorded",
        date: "28 Jul · now",
        duration: "Live",
        source: "Live session",
        status: "live",
        state: "live",
        label: "Live"
      };
      setFlights((rows) => [created, ...rows]);
      setSignalFlight(created);
    };
    const endSignalSession = () => {
      if (signalFlight) {
        setFlights((rows) => rows.map((candidate) => candidate.id === signalFlight.id ? { ...candidate, duration: "00:06:32", status: "processing", state: "live", label: "Processing" } : candidate));
      }
      setSignalFlight(null);
    };
    let title = "Flights";
    let crumb = "Operations";
    if (room === "flight") {
      if (sub === "prep") {
        title = "Flight prep";
        crumb = "Pre-flight";
      }
      if (sub === "replay") {
        title = flight ? flight.id : "Replay";
        crumb = "Replay & analysis";
      }
      if (sub === "hud") {
        title = "HUD preview";
        crumb = "Pilot display";
      }
    } else if (room === "hangar") {
      title = "Fleet configuration";
      crumb = "Hangar";
    } else if (room === "signal") {
      title = signalFlight ? signalFlight.id : "Signal sessions";
      crumb = "Signal";
    }
    let body;
    if (room === "hangar") {
      body = /* @__PURE__ */ React.createElement(Hangar, { onOpenSignal: () => setRoom("signal") });
    } else if (room === "signal") {
      body = /* @__PURE__ */ React.createElement(Signal, { activeFlight: signalFlight, preparationFlights: flights.filter((candidate) => candidate.status === "preparation"), onStartSession: startSignalSession, onEndSession: endSignalSession });
    } else if (sub === "replay") {
      body = /* @__PURE__ */ React.createElement(Replay, { flight, onBack: () => setSub("logbook") });
    } else {
      body = /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "subtabs" }, SUBTABS.map((tab) => /* @__PURE__ */ React.createElement("button", { key: tab.id, type: "button", className: "subtab", "data-active": sub === tab.id, "aria-pressed": sub === tab.id, onClick: () => setSub(tab.id) }, tab.label))), sub === "logbook" && /* @__PURE__ */ React.createElement(Logbook, { flights, onFlightsChange: setFlights, onOpen: openFlight, onOpenSignal: openSignalForFlight }), sub === "prep" && /* @__PURE__ */ React.createElement(FlightPrep, null), sub === "hud" && /* @__PURE__ */ React.createElement(Hud, null));
    }
    return /* @__PURE__ */ React.createElement(Shell, { room, onRoom: (selectedRoom) => {
      setRoom(selectedRoom);
      if (selectedRoom === "flight") setSub("logbook");
    }, title, crumb }, body);
  }
  ReactDOM.createRoot(document.getElementById("app")).render(/* @__PURE__ */ React.createElement(App, null));
})();
