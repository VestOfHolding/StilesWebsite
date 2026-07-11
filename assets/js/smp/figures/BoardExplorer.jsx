import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";
import { BOARDS, METRICS, DOMAINS, DICE } from "../data.js";
import { MAIN_TITLE, AXIS_LABEL, TICK } from "../ui.js";

function DieTooltip({ active, payload, metricLabel }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (<div style={{ background:"#fff", color:"#111", border:"1px solid #ccc", borderRadius:6, padding:"6px 10px", fontSize:13 }}>
    <strong>{d.die}</strong><br />{metricLabel}: {d._x}<br />Avg place: {d.place.toFixed(3)}</div>);
}

export default function BoardExplorer({ board = "WDR", metric = "distance" }) {
  const [boardId, setBoardId] = useState(board);
  const [metricId, setMetricId] = useState(metric);
  const b = BOARDS.find((x) => x.id === boardId) || BOARDS[0];
  const m = METRICS.find((x) => x.id === metricId) || METRICS[0];
  const rows = (DICE[boardId] || []).map((d) => ({ ...d, _x: d[metricId] }));
  const sel = { marginRight: 16, padding: "3px 6px" };
  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <div style={{ marginBottom: 10, fontSize: 14 }}>
        <label style={{ fontWeight: 600, marginRight: 6 }}>Board:</label>
        <select value={boardId} onChange={(e) => setBoardId(e.target.value)} style={sel}>
          {BOARDS.map((bd) => <option key={bd.id} value={bd.id}>{bd.name}</option>)}
        </select>
        <label style={{ fontWeight: 600, marginRight: 6 }}>X axis:</label>
        <select value={metricId} onChange={(e) => setMetricId(e.target.value)} style={sel}>
          {METRICS.map((mm) => <option key={mm.id} value={mm.id}>{mm.label}</option>)}
        </select>
      </div>
      <div style={MAIN_TITLE}>{b.name}</div>
      <ResponsiveContainer width="100%" height={420}>
        <ScatterChart margin={{ top: 8, right: 24, bottom: 44, left: 36 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="_x" domain={DOMAINS[metricId]} allowDataOverflow tick={TICK}>
            <Label value={m.label} position="bottom" offset={18} style={{ ...AXIS_LABEL, textAnchor: "middle" }} />
          </XAxis>
          <YAxis type="number" dataKey="place" reversed domain={DOMAINS.place} allowDataOverflow tick={TICK} tickFormatter={(v) => v.toFixed(2)}>
            <Label value="Avg place (lower = better)" angle={-90} position="left" offset={2} style={{ ...AXIS_LABEL, textAnchor: "middle" }} />
          </YAxis>
          <ZAxis range={[55, 55]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<DieTooltip metricLabel={m.label} />} />
          <Scatter data={rows} fill="#0072B2" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>
    </figure>
  );
}
