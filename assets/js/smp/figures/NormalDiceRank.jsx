import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { BOARDS, DICE } from "../data.js";

export default function NormalDiceRank() {
  const data = BOARDS.map((b) => {
    const sorted = [...DICE[b.id]].sort((x, y) => x.place - y.place);
    return { board: b.name, rank: sorted.findIndex((d) => d.die === "Normal Dice") + 1 };
  });
  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 44, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 21]} tickCount={8} label={{ value: "Rank of 21 (1 = best)", position: "bottom" }} />
          <YAxis type="category" dataKey="board" width={190} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`rank ${v} of 21`, "Normal Dice"]} />
          <Bar dataKey="rank" fill="#0072B2">
            <LabelList dataKey="rank" position="right" formatter={(v) => `#${v}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </figure>
  );
}
