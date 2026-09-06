"use strict";
(() => {
  // ui_kits/exopter-brand/Brand.jsx
  (function() {
    const DS = window.ExopterDesignSystem_4c9fc9;
    const { Button, Badge } = DS;
    const WING = "../../assets/exopter-wing-reference.jpeg";
    const Eyebrow = ({ children, accent }) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: accent ? "var(--ex-aqua-500)" : "var(--ex-graphite-400)" } }, children);
    const Reveal = ({ children, style }) => /* @__PURE__ */ React.createElement("div", { className: "reveal", style }, children);
    function Nav() {
      return /* @__PURE__ */ React.createElement("header", { style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "18px 40px",
        backdropFilter: "blur(6px)",
        background: "rgba(7,11,13,.55)",
        borderBottom: "1px solid rgba(255,255,255,.06)"
      } }, /* @__PURE__ */ React.createElement("img", { src: "../../assets/logo-wordmark.svg", alt: "EXOPTER", style: { height: 16 } }), /* @__PURE__ */ React.createElement("nav", { style: { display: "flex", gap: 26, marginLeft: 28 } }, [
        ["Program", "#program"],
        ["Evidence", "#evidence"],
        ["Sillage", "#sillage"],
        ["Roadmap", "#roadmap"]
      ].map(([label, href]) => /* @__PURE__ */ React.createElement("a", { key: label, href, style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ex-graphite-400)", textDecoration: "none" } }, label))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Badge, { tone: "ready" }, "GLD validated"), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", size: "sm" }, "Request brief"));
    }
    function Hero() {
      return /* @__PURE__ */ React.createElement("section", { style: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: WING, alt: "Exopter rigid wing on a test field", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,11,13,.88) 0%, rgba(7,11,13,.55) 42%, rgba(7,11,13,.15) 100%)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(7,11,13,.95) 0%, rgba(7,11,13,0) 38%)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", padding: "0 40px 84px", maxWidth: 1e3 } }, /* @__PURE__ */ React.createElement(Eyebrow, { accent: true }, "Personal rigid-wing flight system"), /* @__PURE__ */ React.createElement("h1", { style: { margin: "18px 0 0", fontSize: "clamp(48px, 7vw, 104px)", fontWeight: 700, lineHeight: 0.98, letterSpacing: "-.02em", color: "var(--ex-white)" } }, "Human flight,", /* @__PURE__ */ React.createElement("br", null), "made measurable."), /* @__PURE__ */ React.createElement("p", { style: { margin: "24px 0 0", fontSize: 19, lineHeight: 1.5, maxWidth: 560, color: "var(--ex-vapor-100)" } }, "A rigid carbon wing from GLD glider validation to EPW electric power — built around flight-test evidence, pilot assistance, and the Sillage operating suite."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 30 } }, /* @__PURE__ */ React.createElement(Button, { variant: "primary" }, "View the program"), /* @__PURE__ */ React.createElement(Button, { variant: "secondary" }, "Flight evidence"))), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 24, right: 40, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ex-graphite-400)" } }, "Exowing GLD · field reference ↓"));
    }
    function SpecBand() {
      const specs = [
        { label: "Optimal speed", value: "170–230", unit: "km/h" },
        { label: "Wingspan", value: "2.5", unit: "m" },
        { label: "GLD distance", value: ">10", unit: "km" },
        { label: "EPW distance", value: ">25", unit: "km" },
        { label: "Exit altitude", value: "5 000", unit: "m" },
        { label: "Parachute", value: "1 500", unit: "m" }
      ];
      return /* @__PURE__ */ React.createElement("section", { id: "program", className: "grid-bg", style: { background: "var(--ex-carbon-950)", padding: "80px 40px", borderTop: "1px solid var(--ex-carbon-700)" } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement(Eyebrow, null, "Program truths"), /* @__PURE__ */ React.createElement("h2", { style: { margin: "14px 0 0", fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, letterSpacing: "-.01em", color: "var(--ex-white)", maxWidth: 680 } }, "Validated as a glider first. Powered next."), /* @__PURE__ */ React.createElement("p", { style: { margin: "16px 0 40px", fontSize: 16, color: "var(--ex-graphite-400)", maxWidth: 620 } }, "One pilot, 80–95 kg. The first validated stage is GLD — an unpowered rigid wing proving aerodynamics, structure, safety, and FDR workflows before electric power is added.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: "var(--ex-carbon-700)", border: "1px solid var(--ex-carbon-700)", borderRadius: 8, overflow: "hidden" } }, specs.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, style: { background: "var(--ex-carbon-900)", padding: "22px 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ex-graphite-400)" } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums", fontSize: 34, fontWeight: 500, color: "var(--ex-white)", marginTop: 8, lineHeight: 1 } }, s.value, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, color: "var(--ex-graphite-400)", marginLeft: 4 } }, s.unit))))));
    }
    function Evidence() {
      const mods = [
        { k: "Wing", d: "Rigid carbon airframe with pitot, pressure, GPS, and camera placement." },
        { k: "FDR", d: "Flight data recording with integrity state, import, and export." },
        { k: "HUD", d: "Sun-readable pilot display, fail-safe to black, explicit operating state." },
        { k: "Parachute & jettison", d: "Rescue parachute, attachment, harness, and emergency deactivation." },
        { k: "Telemetry", d: "Airspeed, altitude, glide, distance, temperature, and power traces." },
        { k: "Test path", d: "CFD, structural, tunnel, drop, and flight tests through acceptance." }
      ];
      return /* @__PURE__ */ React.createElement("section", { id: "evidence", style: { background: "var(--ex-carbon-900)", padding: "80px 40px" } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement(Eyebrow, { accent: true }, "Evidence"), /* @__PURE__ */ React.createElement("h2", { style: { margin: "14px 0 40px", fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, letterSpacing: "-.01em", color: "var(--ex-white)", maxWidth: 680 } }, "The object is the proof.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 } }, mods.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.k, className: "evi", style: { background: "var(--ex-carbon-950)", border: "1px solid var(--ex-carbon-700)", borderRadius: 8, padding: "24px 22px", transition: "border-color .2s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ex-aqua-500)" } }, m.k), /* @__PURE__ */ React.createElement("p", { style: { margin: "12px 0 0", fontSize: 15, lineHeight: 1.5, color: "var(--ex-vapor-100)" } }, m.d)))));
    }
    function OperatingSuite() {
      const rooms = [["Flight", "Prep, replay, logbook, maintenance"], ["Hangar", "Fleet, hardware, spare parts"], ["Signal", "Telemetry, live feeds, comms"], ["Forge", "Agent workflows, documentation"], ["Core", "Auth, audit, storage, ops"]];
      return /* @__PURE__ */ React.createElement("section", { id: "os", style: { background: "var(--ex-vapor-50)", padding: "80px 40px" } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement(Eyebrow, null, "Operating suite"), /* @__PURE__ */ React.createElement("h2", { style: { margin: "14px 0 0", fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, letterSpacing: "-.01em", color: "var(--ex-carbon-950)", maxWidth: 720 } }, "Sillage — one workbench for the full flight lifecycle."), /* @__PURE__ */ React.createElement("p", { style: { margin: "16px 0 36px", fontSize: 16, color: "var(--ex-graphite-600)", maxWidth: 640 } }, "Prepare, verify, record, replay, compare, inspect, train, certify. One house with several rooms — never a jump from the flight lab to an unrelated back office.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 28 } }, rooms.map(([k, d]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { background: "#fff", border: "1px solid var(--ex-vapor-200)", borderRadius: 8, padding: "18px 18px", boxShadow: "var(--shadow-sm)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "var(--ex-carbon-950)" } }, "Sillage ", k), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--ex-graphite-600)", marginTop: 4 } }, d)))), /* @__PURE__ */ React.createElement("a", { href: "../os-flight/index.html", style: { textDecoration: "none" } }, /* @__PURE__ */ React.createElement(Button, { variant: "primary" }, "Open Sillage Flight →")));
    }
    function Roadmap() {
      const stages = [
        { t: "T0 → T0+12", k: "GLD", d: "Glider wing validation", s: "validated" },
        { t: "T0+12 → T0+18", k: "EPW / EDF", d: "Electric-powered wing", s: "dev" },
        { t: "T0+18 → T0+24", k: "Bicopter", d: "Stability & control", s: "dev" },
        { t: "Beyond", k: "JPW / P1000", d: "Jet-powered extension", s: "roadmap" }
      ];
      const tone = { validated: "ready", dev: "caution", roadmap: "neutral" };
      const lab = { validated: "Validated", dev: "In development", roadmap: "Roadmap" };
      return /* @__PURE__ */ React.createElement("section", { id: "roadmap", className: "grid-bg", style: { background: "var(--ex-carbon-950)", padding: "80px 40px", borderTop: "1px solid var(--ex-carbon-700)" } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement(Eyebrow, { accent: true }, "Roadmap"), /* @__PURE__ */ React.createElement("h2", { style: { margin: "14px 0 40px", fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, letterSpacing: "-.01em", color: "var(--ex-white)", maxWidth: 680 } }, "Maturity, stated honestly.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 } }, stages.map((st) => /* @__PURE__ */ React.createElement("div", { key: st.k, style: { background: "var(--ex-carbon-900)", border: "1px solid var(--ex-carbon-700)", borderRadius: 8, padding: "22px 20px", borderTop: "2px solid " + (st.s === "validated" ? "var(--ex-field-500)" : st.s === "dev" ? "var(--ex-amber-500)" : "var(--ex-graphite-600)") } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em", color: "var(--ex-graphite-400)" } }, st.t), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: "var(--ex-white)", margin: "10px 0 2px", letterSpacing: "-.01em" } }, st.k), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "var(--ex-vapor-100)", marginBottom: 14 } }, st.d), /* @__PURE__ */ React.createElement(Badge, { tone: tone[st.s] }, lab[st.s])))));
    }
    function Footer() {
      return /* @__PURE__ */ React.createElement("footer", { style: { background: "var(--ex-carbon-950)", padding: "48px 40px", borderTop: "1px solid var(--ex-carbon-700)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("img", { src: "../../assets/logo-wordmark.svg", alt: "EXOPTER", style: { height: 16, opacity: 0.9 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ex-graphite-600)" } }, "Confidential · personal rigid-wing flight program · non-final marks"));
    }
    function Page2() {
      React.useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const els = document.querySelectorAll(".reveal");
        if (reduce) {
          els.forEach((e) => e.classList.add("in"));
          return;
        }
        const io = new IntersectionObserver((ents) => ents.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }), { threshold: 0.18 });
        els.forEach((e) => io.observe(e));
        return () => io.disconnect();
      }, []);
      return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--ex-carbon-950)" } }, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(SpecBand, null), /* @__PURE__ */ React.createElement(Evidence, null), /* @__PURE__ */ React.createElement(OperatingSuite, null), /* @__PURE__ */ React.createElement(Roadmap, null), /* @__PURE__ */ React.createElement(Footer, null));
    }
    window.ExopterBrand = { Page: Page2 };
  })();

  // ui_kits/exopter-brand/app.jsx
  var { Page } = window.ExopterBrand;
  ReactDOM.createRoot(document.getElementById("site")).render(/* @__PURE__ */ React.createElement(Page, null));
})();
