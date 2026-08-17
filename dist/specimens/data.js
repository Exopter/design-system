(() => {
  // components/data/data.card.jsx
  var { Card, MetricTile, ReadinessStrip, ChecklistRow } = window.ExopterDesignSystem_4c9fc9;
  var icon = (markup) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "13", height: "13", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", dangerouslySetInnerHTML: { __html: markup } });
  var gauge = icon('<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>');
  function Demo() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "group" }, /* @__PURE__ */ React.createElement("span", { className: "gl" }, "ReadinessStrip"), /* @__PURE__ */ React.createElement(ReadinessStrip, { mode: "GLD", items: [
      { label: "Pilot", value: "A. Renaud", state: "ready" },
      { label: "Weather", value: "CAVOK · 6 kt", state: "ready" },
      { label: "Battery", value: "74%", state: "caution" },
      { label: "FDR", value: "Armed", state: "live" },
      { label: "Parachute", value: "Pending", state: "pending" }
    ] })), /* @__PURE__ */ React.createElement("div", { className: "group" }, /* @__PURE__ */ React.createElement("span", { className: "gl" }, "MetricTile"), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement(MetricTile, { label: "Airspeed", icon: gauge, value: "214", unit: "km/h", state: "live" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Altitude", value: "1 480", unit: "m", delta: "120", trend: "down" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Glide", value: "12.4", unit: "L/D", delta: "0.3", trend: "up", state: "ready" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Battery", value: "74", unit: "%", state: "caution" }), /* @__PURE__ */ React.createElement(MetricTile, { label: "Pitot", value: "—", state: "fault" }))), /* @__PURE__ */ React.createElement("div", { className: "group" }, /* @__PURE__ */ React.createElement("span", { className: "gl" }, "Card + ChecklistRow"), /* @__PURE__ */ React.createElement(Card, { eyebrow: "Flight prep", title: "GLD readiness", flush: true }, /* @__PURE__ */ React.createElement("div", { style: { padding: "4px" } }, /* @__PURE__ */ React.createElement(ChecklistRow, { state: "done", title: "Harness & hooks inspected", owner: "PILOT", evidence: "#" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "active", title: "Parachute pack verified", owner: "ENG-2" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "blocked", title: "Airspeed cross-check", blocker: "Pitot fault — replace probe", owner: "ENG-1" }), /* @__PURE__ */ React.createElement(ChecklistRow, { state: "pending", title: "Weather window confirmed", owner: "OPS" })))));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(Demo, null));
})();
