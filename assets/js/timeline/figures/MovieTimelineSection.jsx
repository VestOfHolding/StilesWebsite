import React, { useState, useMemo, useRef, useEffect } from "react";
import { MOVIES } from "../movieTimeline.js";
import { EVENTS } from "../franchiseEvents.js";

/* ============================================================================
   The Future According to Movies — shared section renderer
   ----------------------------------------------------------------------------
   Not registered as a figure itself. Each section is a thin wrapper in this
   folder (TimelineCenturySoFar.jsx, TimelineComingDecades.jsx, …) that renders
   this component with its own `conf`, so prose can sit between them on the page.

   Franchise events, franchise tinting and other media (TV / games) are all on
   permanently — the toggles that used to control them have been removed.

   Layout is locked in below: PX_PER_FILM / LANE_GAP / LABEL_GAP.
   ========================================================================== */


/* Palette tuned for contrast against the near-black field.
   Ratios vs bg #161616 — ink 16.2:1, dim 10.9:1, faint 7.6:1, spine 6.4:1
   (all clear WCAG AA; ink/dim/detail clear AAA at these small sizes). */
const C = {
  bg: "#161616", panel: "#1e1e1e", edge: "#454545", spine: "#9a9a9a",
  chipBg: "#1c1c1c", chipEdge: "#e2e2e2", ink: "#f5f5f5", dim: "#c9c9c9",
  faint: "#a8a8a8", amber: "#f0b968", future: "#9ecbec",
};
/* Events are colour-coded by franchise. All clear WCAG AA on #161616
   (Terminator 6.7:1, the rest 8:1+). */
const FRANCHISE = {
  "Terminator": "#ff6f66",
  "Blade Runner": "#5fd0e2",
  "Alien": "#5fd4ab",
  "Star Trek": "#7cb0ff",
  "The Purge": "#c98ef0",
  "The Time Machine": "#ff9ec4",
};
const FALLBACK = "#d0d0d0";
const colorOf = (e) => FRANCHISE[e.franchise] || FALLBACK;

/* Films belonging to a tinted franchise get a matching border colour. Explicit
   title lists rather than pattern matching, because the obvious patterns lie —
   "Hot Tub Time Machine 2" is not a Time Machine film. The Apes films are
   deliberately absent here: that franchise is shown by its film markers alone. */
const FILM_FRANCHISE = {};
{
  const add = (f, titles) => titles.forEach((t) => { FILM_FRANCHISE[t] = f; });
  add("Alien", ["Prometheus", "Alien: Covenant", "Alien: Earth", "Alien: Isolation", "Alien", "Alien: Romulus", "Alien 3", "Aliens", "Alien Resurrection"]);
  add("Blade Runner", ["Blade Runner", "Blade Runner 2036: Nexus Dawn", "Blade Runner 2049"]);
  add("Star Trek", ["Star Trek: First Contact", "Star Trek", "Star Trek Into Darkness", "Star Trek Beyond",
    "Star Trek: The Motion Picture", "Star Trek II: The Wrath of Khan", "Star Trek III: The Search for Spock",
    "Star Trek IV: The Voyage Home", "Star Trek V: The Final Frontier", "Star Trek VI: The Undiscovered Country",
    "Star Trek Generations", "Star Trek: Insurrection", "Star Trek: Nemesis"]);
  add("Terminator", ["Terminator Salvation", "Terminator 3: Rise of the Machines", "Terminator: Dark Fate"]);
  add("The Purge", ["The Purge", "The Purge: Anarchy", "The Purge: Election Year", "The Forever Purge"]);
}
const filmTint = (m) => FRANCHISE[FILM_FRANCHISE[m.title]] || null;

/* Non-film entries: canon to a franchise already on the timeline, but flagged so
   they read as the exceptions they are (dashed border + a small tag). */
const MEDIUM_TAG = { tv: "TV", game: "Game" };
const SANS = "'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace";
const NOW = new Date().getFullYear();
const fmt = (y) => y.toLocaleString("en-US");

/* --- tunables --- */
const LH = 22, CONN = 22, TOPPAD = 14, TICKH = 22, BOTPAD = 10, MARGIN = 46;
const MAX_CONTENT = 4200;
/* --- locked-in layout --- */
const PX_PER_FILM = 32;   // horizontal budget per title → drives the scroll width
const LANE_GAP    = 8;    // vertical gap between stacked label lanes
const LABEL_GAP   = 30;   // min horizontal clearance before labels share a lane

let _ctx = null;
function measure(t) {
  if (typeof document === "undefined") return t.length * 7;
  if (!_ctx) { _ctx = document.createElement("canvas").getContext("2d"); _ctx.font = `600 12.5px ${SANS}`; }
  return _ctx.measureText(t).width;
}
function niceStep(span) { return span <= 30 ? 5 : span <= 70 ? 10 : span <= 140 ? 20 : span <= 400 ? 50 : 100; }

function useWidth(ref) {
  const [w, setW] = useState(880);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver((es) => { for (const e of es) setW(e.contentRect.width); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return w;
}

export default function MovieTimelineSection({ conf, movies = MOVIES, events = EVENTS }) {
  const ref = useRef(null);
  const W = useWidth(ref);
  const [hover, setHover] = useState(null);

  const L = useMemo(() => {
    const inR = (y) => y >= conf.from && y < conf.to;
    const films = movies.filter((m) => inR(m.start)).sort((a, b) => a.start - b.start || a.title.localeCompare(b.title));
    const evs = events.filter((e) => inR(e.start)).sort((a, b) => a.start - b.start);
    const clampY = (y) => Math.max(conf.from, Math.min(y, conf.to - 1));
    const ySet = new Set();
    films.forEach((f) => { ySet.add(f.start); ySet.add(clampY(f.end)); });
    evs.forEach((e) => { ySet.add(e.start); ySet.add(clampY(e.end)); });
    const years = Array.from(ySet).sort((a, b) => a - b);

    const contentW = Math.max(W, Math.min(MAX_CONTENT, films.length * PX_PER_FILM + 2 * MARGIN));
    const innerW = Math.max(160, contentW - 2 * MARGIN);

    let xOf, ticks = [], breaks = [];
    if (conf.compressed) {
      // Compress runs of empty years, but keep the axis continuous *within* each run
      // so ticks can fall on regular round years instead of on content years.
      const T = conf.breakAt || 50, BW = 40;
      const anchors = years, pos = new Map(), gaps = [];
      let acc = 0; pos.set(anchors[0], 0);
      for (let i = 1; i < anchors.length; i++) {
        const a = anchors[i - 1], b = anchors[i], g = b - a;
        if (g > T) { gaps.push({ a, b, gap: g, at: acc + BW / 2 }); acc += BW; }
        else acc += g;
        pos.set(b, acc);
      }
      const tot = acc || 1;
      const toX = (p) => MARGIN + (p / tot) * innerW;
      xOf = (y) => {
        if (pos.has(y)) return toX(pos.get(y));
        for (let i = 1; i < anchors.length; i++) {
          const a = anchors[i - 1], b = anchors[i];
          if (y > a && y < b) {
            if (b - a > T) return null;            // sits inside a collapsed gap
            return toX(pos.get(a) + (pos.get(b) - pos.get(a)) * ((y - a) / (b - a)));
          }
        }
        return null;
      };
      breaks = gaps.map((g) => ({ gap: g.gap, x: toX(g.at) }));

      const lo = anchors[0], hi = anchors[anchors.length - 1];
      const visible = anchors.reduce((sum, y, i) => i && (y - anchors[i - 1]) <= T ? sum + (y - anchors[i - 1]) : sum, 0);
      const step = conf.tickStep || niceStep(visible || (hi - lo));
      const tset = new Set([lo]);
      if ((hi - lo) / step <= 200) {
        for (let y = Math.ceil(lo / step) * step; y <= hi; y += step) tset.add(y);
      }
      gaps.forEach((g) => { tset.add(g.a); tset.add(g.b); });   // label what each break jumps between
      ticks = Array.from(tset).sort((a, b) => a - b)
        .map((y) => ({ y, x: xOf(y) })).filter((t) => t.x !== null);
    } else {
      const span = (conf.to - conf.from) || 1;
      xOf = (y) => MARGIN + ((y - conf.from) / span) * innerW;
      const step = niceStep(span);
      for (let y = Math.ceil(conf.from / step) * step; y <= conf.to - 1; y += step) ticks.push({ y, x: xOf(y) });
    }

    const lanesT = [], lanesB = [], placed = [];
    films.forEach((m, i) => {
      const x1 = xOf(m.start), x2 = xOf(clampY(m.end));
      const cx = (x1 + x2) / 2, w = Math.min(measure(m.title) + 18, 250);
      const left = Math.max(3, Math.min(cx - w / 2, contentW - w - 3));
      const side = i % 2 === 0 ? "T" : "B", lanes = side === "T" ? lanesT : lanesB;
      let lane = lanes.findIndex((edge) => left > edge + LABEL_GAP);
      if (lane === -1) { lane = lanes.length; lanes.push(left + w); } else lanes[lane] = left + w;
      placed.push({ m, cx, x1, x2, left, w, side, lane });
    });
    const maxT = lanesT.length, maxB = lanesB.length;
    const axisY = TOPPAD + CONN + maxT * (LH + LANE_GAP);
    const height = axisY + CONN + maxB * (LH + LANE_GAP) + TICKH + BOTPAD;

    const films2 = placed.map((p) => {
      const boxY = p.side === "T"
        ? axisY - CONN - (p.lane + 1) * (LH + LANE_GAP) + LANE_GAP
        : axisY + CONN + p.lane * (LH + LANE_GAP);
      const edgeY = p.side === "T" ? boxY + LH : boxY;
      return { ...p, boxY, edgeY };
    });
    const evGroups = {};
    const events2 = evs.map((e) => { const cx = xOf(e.start); const n = (evGroups[e.start] = (evGroups[e.start] || 0) + 1); return { e, cx, off: (n - 1) * 5 }; });
    return { films: films2, events: events2, ticks, breaks, axisY, height, contentW };
  }, [W, movies, events, conf]);

  const scrollable = L.contentW > W + 2;

  return (
    <div ref={ref} style={{ position: "relative", background: C.bg, color: C.ink, fontFamily: SANS,
      border: `1px solid ${C.edge}`, borderRadius: 12, padding: "14px 16px 12px" }}>
      <style>{CSS}</style>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "2px 2px 8px" }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.ink, letterSpacing: "-0.01em" }}>{conf.title}</h3>
        <span style={{ fontFamily: MONO, fontSize: 11, color: "#ffffff" }}>{conf.range}</span>
        {scrollable && <span style={{ marginLeft: "auto", fontSize: 11, color: C.faint }}>⟷ Scroll</span>}
      </div>

      <div className="tl-hscroll" style={{ overflowX: "auto", overflowY: "hidden", position: "relative" }}>
        <div style={{ position: "relative", height: L.height, width: L.contentW }}>
          <svg width={L.contentW} height={L.height} style={{ position: "absolute", inset: 0 }}>
            {L.ticks.map((t, i) => (
              <line key={"g" + i} x1={t.x} y1={2} x2={t.x} y2={L.height - TICKH - 2}
                stroke="#9a9a9a" strokeWidth="1" strokeDasharray="3 5" opacity="0.45" />
            ))}
            <line x1={MARGIN} y1={L.axisY} x2={L.contentW - MARGIN} y2={L.axisY} stroke={C.spine} strokeWidth="1.5" opacity="0.75" />
            {L.ticks.map((t, i) => (
              <g key={i}>
                <line x1={t.x} y1={L.axisY - 3} x2={t.x} y2={L.axisY + 3} stroke="#ffffff" strokeWidth="1" opacity="0.55" />
                <text x={t.x} y={L.axisY + TICKH - 6} textAnchor="middle" fontFamily={MONO} fontSize="10.5"
                  fontWeight={t.y % 10 === 0 ? 700 : 500} fill="#ffffff">{fmt(t.y)}</text>
              </g>
            ))}
            {L.breaks.map((b, i) => (
              <g key={"br" + i}>
                <line x1={b.x - 4} y1={L.axisY - 5} x2={b.x - 1} y2={L.axisY + 5} stroke={C.faint} strokeWidth="1" />
                <line x1={b.x + 1} y1={L.axisY - 5} x2={b.x + 4} y2={L.axisY + 5} stroke={C.faint} strokeWidth="1" />
                <text x={b.x} y={L.axisY + TICKH - 6} textAnchor="middle" fontFamily={MONO} fontSize="9" fill={C.faint}>+{b.gap.toLocaleString()}y</text>
              </g>
            ))}
            {L.films.map((p, i) => (
              <line key={i} x1={p.cx} y1={L.axisY} x2={p.cx} y2={p.edgeY}
                stroke={C.spine} strokeWidth="1" opacity="0.6" />
            ))}
            {L.films.map((p, i) => { const tc = filmTint(p.m); return p.m.end > p.m.start ? (
              <g key={"bar" + i}>
                <rect x={p.x1} y={L.axisY - 4.5} width={Math.max(p.x2 - p.x1, 4)} height="9" rx="4.5"
                  fill={C.chipBg} stroke={tc || C.chipEdge} strokeWidth="1.5" />
                <line x1={p.x1} y1={L.axisY - 7} x2={p.x1} y2={L.axisY + 7} stroke={tc || C.chipEdge} strokeWidth="1.5" />
                <line x1={p.x2} y1={L.axisY - 7} x2={p.x2} y2={L.axisY + 7} stroke={tc || C.chipEdge} strokeWidth="1.5" />
              </g>
            ) : (
              <circle key={"d" + i} cx={p.cx} cy={L.axisY} r="3"
                fill={C.chipBg} stroke={tc || C.chipEdge} strokeWidth="1.5" />
            ); })}
            {L.events.map(({ e, cx, off }, i) => {
              const kc = colorOf(e);
              return <rect key={"e" + i} x={cx - 4.5} y={L.axisY - 4.5 - off} width="9" height="9"
                transform={`rotate(45 ${cx} ${L.axisY - off})`} fill={kc} stroke="#111" strokeWidth="0.5"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHover({ kind: "event", data: e })} onClick={() => setHover({ kind: "event", data: e })} />;
            })}
          </svg>

          {L.films.map((p, i) => {
            const on = hover && hover.data === p.m;
            const tc = filmTint(p.m);
            return (
              <button key={i} className="tl-chip" onMouseEnter={() => setHover({ kind: "film", data: p.m })}
                onFocus={() => setHover({ kind: "film", data: p.m })} onClick={() => setHover({ kind: "film", data: p.m })}
                style={{ position: "absolute", left: p.left, top: p.boxY, height: LH, maxWidth: 250,
                  display: "inline-flex", alignItems: "center", gap: 5, background: C.chipBg,
                  border: `1px ${p.m.medium ? "dashed" : "solid"} ${tc || C.chipEdge}`, borderRadius: 6, padding: "0 8px",
                  cursor: "pointer", whiteSpace: "nowrap", boxShadow: on ? `0 0 0 1px ${tc || "#fff"}` : "none",
                  transition: "box-shadow .12s, border-color .12s", fontFamily: SANS }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.ink, overflow: "hidden", textOverflow: "ellipsis" }}>{p.m.title}</span>
                {p.m.medium && (
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.05em", color: C.dim,
                    border: `1px solid ${C.edge}`, borderRadius: 3, padding: "0 3px", flex: "none" }}>
                    {MEDIUM_TAG[p.m.medium] || p.m.medium}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ minHeight: 34, padding: "8px 2px 2px", borderTop: `1px solid ${C.edge}`, marginTop: 4 }}>
        {hover ? <DetailLine active={hover} /> :
          <span style={{ fontSize: 12, color: C.faint }}>Hover over a Title or Event Marker for details</span>}
      </div>

      <SectionLegend films={L.films} events={L.events} />
    </div>
  );
}

/* Only the franchises actually present in this section, so each figure carries a
   short legend of its own rather than repeating all six on every timeline. */
function SectionLegend({ films, events }) {
  const present = Array.from(new Set([
    ...events.map(({ e }) => e.franchise),
    ...films.map((p) => FILM_FRANCHISE[p.m.title]).filter(Boolean),
  ])).sort();
  if (!present.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", alignItems: "center",
      padding: "7px 2px 0", marginTop: 2 }}>
      {present.map((f) => (
        <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.dim }}>
          <span style={{ width: 8, height: 8, background: FRANCHISE[f] || FALLBACK, transform: "rotate(45deg)" }} />{f}
        </span>
      ))}
    </div>
  );
}

function DetailLine({ active }) {
  if (active.kind === "film") {
    const m = active.data, gap = m.start - m.released;
    const setStr = m.end !== m.start ? `${fmt(m.start)}\u2013${fmt(m.end)}` : fmt(m.start);
    return (
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "2px 10px", fontSize: 12.5 }}>
        <span style={{ fontWeight: 700, color: C.ink }}>{m.title}</span>
        {m.medium && <span style={{ fontFamily: MONO, fontSize: 10, color: C.dim, border: `1px solid ${C.edge}`,
          borderRadius: 3, padding: "0 4px" }}>{m.medium === "tv" ? "TV Series" : "Video Game"}</span>}
        <span style={{ fontFamily: MONO, color: C.dim }}>Released {m.released} · Set {setStr}</span>
        <span style={{ color: C.dim }}>· Imagined {gap.toLocaleString()} Years Ahead of Its Time</span>
      </div>
    );
  }
  const e = active.data, kc = colorOf(e);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "2px 10px", fontSize: 12.5 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: kc }} />{e.label}</span>
      <span style={{ fontFamily: MONO, color: C.dim }}>{fmt(e.start)}{e.end !== e.start ? `\u2013${fmt(e.end)}` : ""}</span>
      <span style={{ color: C.dim }}>· {e.franchise}</span>
      <span style={{ flexBasis: "100%", color: "#dcdcdc", marginTop: 2 }}>{e.detail}</span>
      {e.source && (
        <span style={{ flexBasis: "100%", marginTop: 3, fontSize: 11, color: C.faint,
          display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.06em", textTransform: "uppercase",
            border: `1px solid ${C.edge}`, borderRadius: 4, padding: "0 4px", color: C.dim }}>Source</span>
          {e.source}{e.released ? ` (${e.released})` : ""}
        </span>
      )}
    </div>
  );
}


const CSS = `
.tl-chip:hover{ border-color:#ffffff !important; box-shadow:0 0 0 1px #fff !important; z-index:5; }
.tl-chip:focus-visible{ outline:2px solid ${C.amber}; outline-offset:1px; z-index:5; }
.tl-ctl:hover{ border-color:${C.chipEdge}; color:${C.ink}; }
.tl-hscroll::-webkit-scrollbar{ height:10px; }
.tl-hscroll::-webkit-scrollbar-thumb{ background:#343434; border-radius:8px; border:2px solid ${C.bg}; }
.tl-hscroll::-webkit-scrollbar-track{ background:transparent; }
`;

