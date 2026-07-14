import React from "react";

// Real-world tier lists — one card per board (WDR, KBPM, MFP, KTT), names only,
// Normal Dice highlighted. Inherits the page theme: text via currentColor, card
// surfaces via color-mix, no own background or font. Tiers from natural breaks
// (fixed 6 classes, shared across categories per board).
const BOARDS = [{"key":"WDR","name":"Whomp's Domino Ruins"},{"key":"KBPM","name":"King Bob-omb's Powderkeg Mine"},{"key":"MFP","name":"Megafruit Paradise"},{"key":"KTT","name":"Kamek's Tantalizing Tower"}];
const TIER_ORDER = ["S","A","B","C","D","F"];
const TIER_COLORS = { S:"#fde725", A:"#7ad151", B:"#22a884", C:"#2a788e", D:"#414487", F:"#440154" }; // viridis, CVD-safe
const BOARD_COLORS = { WDR:"#56B4E9", KBPM:"#009E73", MFP:"#E69F00", KTT:"#CC79A7" }; // Okabe-Ito
const textOn = (hex)=>{const n=parseInt(hex.slice(1),16);const L=0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255);return L>135?"#141018":"#F4F1F3";};
const PERF = {"WDR":{"Boo":["F",2.66],"Bowser":["D",2.553],"Bowser Jr":["B",2.47],"Daisy":["B",2.446],"Diddy Kong":["F",2.726],"Donkey Kong":["S",2.245],"Dry Bones":["S",2.306],"Goomba":["D",2.549],"Hammer Bro":["C",2.505],"Koopa":["B",2.464],"Luigi":["A",2.389],"Mario":["A",2.401],"Monty Mole":["C",2.505],"Normal Dice":["A",2.405],"Peach":["B",2.446],"Pom Pom":["F",2.633],"Rosalina":["F",2.651],"Shy Guy":["D",2.543],"Waluigi":["F",2.64],"Wario":["S",2.279],"Yoshi":["F",2.624]},"KBPM":{"Boo":["A",2.404],"Bowser":["C",2.55],"Bowser Jr":["A",2.376],"Daisy":["C",2.553],"Diddy Kong":["D",2.602],"Donkey Kong":["B",2.424],"Dry Bones":["B",2.453],"Goomba":["B",2.457],"Hammer Bro":["S",2.285],"Koopa":["A",2.383],"Luigi":["A",2.384],"Mario":["A",2.374],"Monty Mole":["B",2.444],"Normal Dice":["A",2.356],"Peach":["F",2.69],"Pom Pom":["D",2.583],"Rosalina":["D",2.607],"Shy Guy":["F",2.712],"Waluigi":["C",2.501],"Wario":["F",2.74],"Yoshi":["C",2.546]},"MFP":{"Boo":["F",2.749],"Bowser":["F",2.707],"Bowser Jr":["B",2.46],"Daisy":["A",2.368],"Diddy Kong":["B",2.466],"Donkey Kong":["F",2.702],"Dry Bones":["S",2.316],"Goomba":["B",2.472],"Hammer Bro":["A",2.373],"Koopa":["A",2.41],"Luigi":["A",2.354],"Mario":["A",2.365],"Monty Mole":["B",2.463],"Normal Dice":["A",2.383],"Peach":["C",2.575],"Pom Pom":["B",2.462],"Rosalina":["B",2.501],"Shy Guy":["F",2.691],"Waluigi":["D",2.664],"Wario":["A",2.363],"Yoshi":["C",2.568]},"KTT":{"Boo":["D",2.707],"Bowser":["F",2.958],"Bowser Jr":["B",2.416],"Daisy":["S",2.027],"Diddy Kong":["F",3.018],"Donkey Kong":["D",2.665],"Dry Bones":["B",2.376],"Goomba":["B",2.407],"Hammer Bro":["C",2.57],"Koopa":["B",2.399],"Luigi":["C",2.482],"Mario":["A",2.178],"Monty Mole":["B",2.369],"Normal Dice":["A",2.254],"Peach":["B",2.404],"Pom Pom":["A",2.326],"Rosalina":["D",2.597],"Shy Guy":["D",2.678],"Waluigi":["D",2.657],"Wario":["B",2.41],"Yoshi":["C",2.532]}}; // [realTier, realPlace]; place only orders dice within a tier
const CHARS = Object.keys(PERF.WDR);

function Ladder({ board }) {
  const groups = TIER_ORDER
    .map(t => ({ t, m: CHARS.filter(c => PERF[board][c][0] === t).sort((a, b) => PERF[board][a][1] - PERF[board][b][1]) }))
    .filter(g => g.m.length);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {groups.map(g => (
        <div key={g.t} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
          <div style={{ width: 22, height: 22, flexShrink: 0, borderRadius: 5, background: TIER_COLORS[g.t], color: textOn(TIER_COLORS[g.t]), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, marginTop: 1 }}>{g.t}</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {g.m.map(c => {
              const isN = c === "Normal Dice";
              return (
                <span key={c} style={{ fontSize: 11.5, borderRadius: 5, padding: "3px 9px", border: "1px solid " + (isN ? BOARD_COLORS[board] : "var(--smp-border)"), fontWeight: isN ? 700 : 400, whiteSpace: "nowrap" }}>
                  {isN ? "Normal" : c}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RealTierList() {
  // theme-adaptive surfaces: a faint overlay of the inherited text color
  const vars = { "--smp-border": "color-mix(in srgb, currentColor 22%, transparent)", "--smp-panel": "color-mix(in srgb, currentColor 7%, transparent)" };
  return (
    <figure style={{ ...vars, margin: "1.5rem 0", display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", fontFamily: "inherit" }}>
      {BOARDS.map(b => (
        <div key={b.key} style={{ width: "fit-content", maxWidth: "100%", background: "var(--smp-panel)", border: "1px solid var(--smp-border)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: BOARD_COLORS[b.key] }} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>{b.name}</span>
          </div>
          <Ladder board={b.key} />
        </div>
      ))}
    </figure>
  );
}
