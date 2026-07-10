import React, { useState } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label,
} from "recharts";
import { BOARDS, METRICS, DICE } from "./data.js";

function DieTooltip({ active, payload, metricLabel }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#fff", border: "1px solid #ccc", borderRadius: 6, padding: "6px 10px", fontSize: 13 }}>
      <strong>{d.die}</strong><br />
      {metricLabel}: {d._x}<br />
      Avg place: {d.place.toFixed(3)}
    </div>
  );
}

export default function SmpDiceViz() {
  const [boardId, setBoardId] = useState(BOARDS[0].id);
  const [metricId, setMetricId] = useState(METRICS[0].id);
  const board = BOARDS.find((b) => b.id === boardId);
  const metric = METRICS.find((m) => m.id === metricId);
  const rows = (DICE[boardId] || []).map((d) => ({ ...d, _x: d[metricId] }));

  const selStyle = { marginRight: 16, padding: "3px 6px" };
  return (
    <div style={{ maxWidth: 780, margin: "1.5rem 0" }}>
      <div style={{ marginBottom: 12, fontSize: 14 }}>
        <label style={{ fontWeight: 600, marginRight: 6 }}>Board:</label>
        <select value={boardId} onChange={(e) => setBoardId(e.target.value)} style={selStyle}>
          {BOARDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <label style={{ fontWeight: 600, marginRight: 6 }}>X axis:</label>
        <select value={metricId} onChange={(e) => setMetricId(e.target.value)} style={selStyle}>
          {METRICS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={440}>
        <ScatterChart margin={{ top: 20, right: 24, bottom: 52, left: 32 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="_x" name={metric.label} domain={["dataMin", "dataMax"]}>
            <Label value={metric.label} position="bottom" offset={22} />
          </XAxis>
          <YAxis type="number" dataKey="place" name="Avg place" reversed
                 domain={["dataMin - 0.05", "dataMax + 0.05"]}
                 tickFormatter={(v) => v.toFixed(2)}>
            <Label value="Average place (lower = better)" angle={-90} position="left" />
          </YAxis>
          <ZAxis range={[60, 60]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<DieTooltip metricLabel={metric.label} />} />
          <Scatter name={board.name} data={rows} fill="#0072B2" />
        </ScatterChart>
      </ResponsiveContainer>
      <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
        {board.name} · {rows.length} dice · X = {metric.label.toLowerCase()}, Y = average finishing place
        (down is better). From 5M simulated games.
      </p>
    </div>
  );
}
