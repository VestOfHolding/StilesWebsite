import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";
import { BOARDS, METRICS, DOMAINS, DICE } from "../data.js";

function DieTooltip({ active, payload, metricLabel }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (<div style={{ background:"#fff", border:"1px solid #ccc", borderRadius:6, padding:"6px 10px", fontSize:13 }}>
    <strong>{d.die}</strong><br />{metricLabel}: {d._x}<br />Avg place: {d.place.toFixed(3)}</div>);
}

export default function BoardExplorer({ board = "WDR", metric = "distance" }) {
  const [boardId, setBoardId] = useState(board);
  const [metricId, setMetricId] = useState(metric);
  const m = METRICS.find((x) => x.id === metricId) || METRICS[0];
  const rows = (DICE[boardId] || []).map((d) => ({ ...d, _x: d[metricId] }));
  const sel = { marginRight: 16, padding: "3px 6px" };
  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <div style={{ marginBottom: 10, fontSize: 14 }}>
        <label style={{ fontWeight: 600, marginRight: 6 }}>Board:</label>
        <select value={boardId} onChange={(e) => setBoardId(e.target.value)} style={sel}>
          {BOARDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <label style={{ fontWeight: 600, marginRight: 6 }}>X axis:</label>
        <select value={metricId} onChange={(e) => setMetricId(e.target.value)} style={sel}>
          {METRICS.map((mm) => <option key={mm.id} value={mm.id}>{mm.label}</option>)}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={420}>
        <ScatterChart margin={{ top: 16, right: 24, bottom: 48, left: 32 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* X domain fixed per-metric (moves only when metric changes); Y always fixed to place */}
          <XAxis type="number" dataKey="_x" domain={DOMAINS[metricId]} allowDataOverflow>
            <Label value={m.label} position="bottom" offset={22} />
          </XAxis>
          <YAxis type="number" dataKey="place" reversed domain={DOMAINS.place} allowDataOverflow tickFormatter={(v) => v.toFixed(2)}>
            <Label value="Avg place (lower = better)" angle={-90} position="left" />
          </YAxis>
          <ZAxis range={[55, 55]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<DieTooltip metricLabel={m.label} />} />
          <Scatter data={rows} fill="#0072B2" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>
    </figure>
  );
}
