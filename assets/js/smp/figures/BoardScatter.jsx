import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";
import { BOARDS, METRICS, DOMAINS, DICE } from "../data.js";
import { MAIN_TITLE, AXIS_LABEL, TICK } from "../ui.js";

function DieTooltip({ active, payload, metricLabel }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (<div style={{ background:"#fff", color:"#111", border:"1px solid #ccc", borderRadius:6, padding:"6px 10px", fontSize:13 }}>
    <strong>{d.die}</strong><br />{metricLabel}: {d._x}<br />Avg place: {d.place.toFixed(3)}</div>);
}

export default function BoardScatter({ board = "WDR", metric = "distance" }) {
  const b = BOARDS.find((x) => x.id === board) || BOARDS[0];
  const m = METRICS.find((x) => x.id === metric) || METRICS[0];
  const rows = (DICE[b.id] || []).map((d) => ({ ...d, _x: d[metric] }));
  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <div style={MAIN_TITLE}>{b.name}</div>
      <ResponsiveContainer width="100%" height={380}>
        <ScatterChart margin={{ top: 8, right: 24, bottom: 44, left: 36 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="_x" domain={DOMAINS[metric]} allowDataOverflow tick={TICK}>
            <Label value={m.label} position="bottom" offset={18} style={{ ...AXIS_LABEL, textAnchor: "middle" }} />
          </XAxis>
          <YAxis type="number" dataKey="place" reversed domain={DOMAINS.place} allowDataOverflow tick={TICK} tickFormatter={(v) => v.toFixed(2)}>
            <Label value="Avg place (lower = better)" angle={-90} position="left" offset={2} style={{ ...AXIS_LABEL, textAnchor: "middle" }} />
          </YAxis>
          <ZAxis range={[55, 55]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<DieTooltip metricLabel={m.label} />} />
          <Scatter data={rows} fill="#0072B2" />
        </ScatterChart>
      </ResponsiveContainer>
    </figure>
  );
}
