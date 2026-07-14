import React from "react";

// The Ally Effect — per board, each character's rank shift between the die-skill
// ladder and the real-world ladder. Positive means allies lift the character
// above what its die alone earns; negative means poor ally luck drags it down.
// Registry component: inherits the page theme (text via currentColor).
const BOARDS = [{"key":"WDR","name":"Whomp's Domino Ruins"},{"key":"KBPM","name":"King Bob-omb's Powderkeg Mine"},{"key":"MFP","name":"Megafruit Paradise"},{"key":"KTT","name":"Kamek's Tantalizing Tower"}];
const BOARD_COLORS = { WDR:"#56B4E9", KBPM:"#009E73", MFP:"#E69F00", KTT:"#CC79A7" }; // Okabe-Ito
const CARRIED = "#E69F00", STARVED = "#56B4E9"; // CVD-safe diverging pair
const GAP = {"WDR":{"Boo":-1,"Bowser":-8,"Bowser Jr":-1,"Daisy":6,"Diddy Kong":-7,"Donkey Kong":0,"Dry Bones":-1,"Goomba":-4,"Hammer Bro":3,"Koopa":-1,"Luigi":-1,"Mario":0,"Monty Mole":1,"Normal Dice":0,"Peach":3,"Pom Pom":0,"Rosalina":-1,"Shy Guy":3,"Waluigi":3,"Wario":2,"Yoshi":4},"KBPM":{"Boo":6,"Bowser":-3,"Bowser Jr":6,"Daisy":1,"Diddy Kong":-15,"Donkey Kong":-7,"Dry Bones":-3,"Goomba":-3,"Hammer Bro":8,"Koopa":0,"Luigi":-3,"Mario":1,"Monty Mole":3,"Normal Dice":4,"Peach":1,"Pom Pom":-1,"Rosalina":-4,"Shy Guy":1,"Waluigi":6,"Wario":-2,"Yoshi":4},"MFP":{"Boo":-1,"Bowser":1,"Bowser Jr":2,"Daisy":-3,"Diddy Kong":1,"Donkey Kong":0,"Dry Bones":4,"Goomba":-5,"Hammer Bro":-5,"Koopa":-1,"Luigi":2,"Mario":-1,"Monty Mole":-1,"Normal Dice":-1,"Peach":1,"Pom Pom":2,"Rosalina":-5,"Shy Guy":-3,"Waluigi":1,"Wario":13,"Yoshi":-1},"KTT":{"Boo":-1,"Bowser":0,"Bowser Jr":2,"Daisy":0,"Diddy Kong":0,"Donkey Kong":-6,"Dry Bones":-2,"Goomba":-4,"Hammer Bro":-4,"Koopa":0,"Luigi":-4,"Mario":0,"Monty Mole":1,"Normal Dice":0,"Peach":4,"Pom Pom":5,"Rosalina":0,"Shy Guy":-1,"Waluigi":0,"Wario":9,"Yoshi":1}}; // d = skillRank - realRank, per character per board
const MAXABS = 15;
const CHARS = Object.keys(GAP.WDR);

function Facet({ name, keyId }) {
  const rows = CHARS.map(c => ({ c, d: GAP[keyId][c] })).sort((a, b) => b.d - a.d);
  const unit = 92 / MAXABS; // % of track per rank of shift (split across the two halves)
  return (
    <div style={{ background: "var(--smp-panel)", border: "1px solid var(--smp-border)", borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 9, height: 9, borderRadius: 3, flexShrink: 0, background: BOARD_COLORS[keyId], transform: "translateY(1px)" }} />
        <span style={{ fontWeight: 700, fontSize: 14 }}>{name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map(r => {
          const off = Math.abs(r.d) * unit / 2;
          const lbl = { position: "absolute", top: -2, fontSize: 9, color: "var(--smp-muted)" };
          if (r.d > 0) lbl.left = "calc(50% + " + off + "% + 3px)"; else lbl.right = "calc(50% + " + off + "% + 3px)";
          const isN = r.c === "Normal Dice";
          return (
            <div key={r.c} style={{ display: "flex", alignItems: "center", height: 15 }}>
              <div style={{ width: 82, textAlign: "right", paddingRight: 6, fontSize: 10.5, color: isN ? BOARD_COLORS[keyId] : "inherit", fontWeight: isN ? 700 : 400, whiteSpace: "nowrap" }}>{isN ? "Normal" : r.c}</div>
              <div style={{ flex: 1, position: "relative", height: 11 }}>
                <div style={{ position: "absolute", left: "50%", top: -1, bottom: -1, width: 1, background: "var(--smp-border)" }} />
                {r.d !== 0 && <div style={{ position: "absolute", top: 1, height: 9, borderRadius: 2, background: r.d > 0 ? CARRIED : STARVED, left: r.d > 0 ? "50%" : "calc(50% - " + off + "%)", width: off + "%" }} />}
                {r.d !== 0 && <span style={lbl}>{r.d > 0 ? "+" + r.d : r.d}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AllyEffect() {
  const vars = { "--smp-border": "color-mix(in srgb, currentColor 22%, transparent)", "--smp-panel": "color-mix(in srgb, currentColor 7%, transparent)", "--smp-muted": "color-mix(in srgb, currentColor 60%, transparent)" };
  return (
    <figure style={{ ...vars, margin: "1.5rem 0", fontFamily: "inherit" }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>The Ally Effect</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        {BOARDS.map(b => <Facet key={b.key} keyId={b.key} name={b.name} />)}
      </div>
    </figure>
  );
}
