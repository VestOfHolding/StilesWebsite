import React from "react";

// Ported from the standalone viz built in the other chat. Data, palettes, and
// thresholds are unchanged; the only adaptation is mapping the original's CSS
// variables (--text-*, --surface-1, --border) onto the site theme via
// currentColor, so the tables read correctly on dark and light backgrounds.

const boards = ["Whomp's", "King Bob-omb's", "Megafruit", "Kamek's"];
const pairs = ["Distance & Coins", "Distance & Stars", "Distance & Place", "Coins & Stars", "Coins & Place", "Stars & Place"];

const R = [
  [-0.3496, 0.7977, 0.5946, 0.1464, 0.3707, 0.9558],
  [-0.2509, 0.5251, 0.3253, 0.5621, 0.6974, 0.9694],
  [-0.5608, 0.4907, 0.0099, 0.0709, 0.5452, 0.8251],
  [-0.0261, 0.0834, 0.0463, 0.7441, 0.8014, 0.9869],
];
const P = [
  [0.1203, 1.48e-5, 0.0045, 0.5265, 0.0981, 1.48e-11],
  [0.2726, 0.0145, 0.1502, 0.0080, 4.41e-4, 4.72e-13],
  [0.0082, 0.0239, 0.9659, 0.7602, 0.0106, 4.17e-6],
  [0.9106, 0.7194, 0.8421, 1.10e-4, 1.26e-5, 1.61e-16],
];

const NEU = { bg: "var(--smp-surface)", fg: "var(--smp-muted)" };
const PUR = [{ bg: "#CECBF6", fg: "#3C3489" }, { bg: "#AFA9EC", fg: "#26215C" }, { bg: "#534AB7", fg: "#ffffff" }];
const AMB = [{ bg: "#FAC775", fg: "#633806" }, { bg: "#EF9F27", fg: "#412402" }, { bg: "#854F0B", fg: "#ffffff" }];
const BLU = [NEU, { bg: "#B5D4F4", fg: "#0C447C" }, { bg: "#85B7EB", fg: "#042C53" }, { bg: "#185FA5", fg: "#ffffff" }];

const rCell = (r) => {
  const a = Math.abs(r);
  if (a < 0.433) return NEU;
  const i = a < 0.549 ? 0 : a < 0.665 ? 1 : 2;
  return (r >= 0 ? AMB : PUR)[i];
};
const pCell = (p) => BLU[p >= 0.05 ? 0 : p >= 0.01 ? 1 : p >= 0.001 ? 2 : 3];
const fmtP = (p) => (p < 0.001 ? "<0.001" : p.toFixed(3));

function Matrix({ data, cellFn, textFn }) {
  return (
    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 3, tableLayout: "fixed" }}>
      <tbody>
        <tr>
          <th style={{ width: 96 }} />
          {pairs.map((p) => (
            <th key={p} style={{ fontSize: 11.5, fontWeight: 500, color: "var(--smp-secondary)", padding: "2px 3px 5px", lineHeight: 1.25, verticalAlign: "bottom", whiteSpace: "normal" }}>{p}</th>
          ))}
        </tr>
        {boards.map((b, i) => (
          <tr key={b}>
            <td style={{ fontSize: 12.5, color: "var(--smp-primary)", textAlign: "right", paddingRight: 8, whiteSpace: "nowrap" }}>{b}</td>
            {pairs.map((p, j) => {
              const c = cellFn(data[i][j]);
              return (
                <td key={p} style={{ background: c.bg, color: c.fg, fontSize: 13, fontVariantNumeric: "tabular-nums", textAlign: "center", padding: "9px 2px", borderRadius: 6 }}>
                  {textFn(data[i][j])}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const Swatch = ({ c }) => (
  <span style={{ display: "inline-block", width: 20, height: 14, background: c.bg, border: c.bg.indexOf("var(") === 0 ? "0.5px solid var(--smp-border)" : 0, verticalAlign: "middle" }} />
);
const Chip = ({ c, children, brd }) => (
  <span style={{ display: "inline-block", background: c.bg, color: c.fg, padding: "1px 8px", borderRadius: 4, marginRight: 5, border: brd ? "0.5px solid var(--smp-border)" : 0 }}>{children}</span>
);

export default function CorrelationMatrix() {
  // Theme-adaptive tokens: inherit the page text color so the neutral cells,
  // labels, and legends stay legible on any background.
  const vars = {
    "--smp-primary": "currentColor",
    "--smp-secondary": "color-mix(in srgb, currentColor 75%, transparent)",
    "--smp-muted": "color-mix(in srgb, currentColor 55%, transparent)",
    "--smp-border": "color-mix(in srgb, currentColor 30%, transparent)",
    "--smp-surface": "color-mix(in srgb, currentColor 12%, transparent)",
  };
  const label = { fontSize: 18, fontWeight: 500, color: "var(--smp-primary)", margin: "0 0 10px 2px" };
  return (
    <figure style={{ ...vars, margin: "1.5rem 0", fontFamily: "inherit" }}>
      <div style={label}>Correlation coefficient · r</div>
      <Matrix data={R} cellFn={rCell} textFn={(r) => r.toFixed(2)} />
      <div style={{ fontSize: 11.5, color: "var(--smp-muted)", lineHeight: 1.9, margin: "9px 2px 0" }}>
        <span style={{ color: "var(--smp-secondary)" }}>negative</span>&nbsp;
        <Swatch c={PUR[2]} /><Swatch c={PUR[1]} /><Swatch c={PUR[0]} /><Swatch c={NEU} /><Swatch c={AMB[0]} /><Swatch c={AMB[1]} /><Swatch c={AMB[2]} />
        &nbsp;<span style={{ color: "var(--smp-secondary)" }}>positive</span>
        &nbsp;&nbsp;·&nbsp; |r| bands 0.43 / 0.55 / 0.67, center = &lt;0.43 (n.s.)
      </div>

      <div style={{ height: "2rem" }} />

      <div style={label}>Significance · p-value</div>
      <Matrix data={P} cellFn={pCell} textFn={fmtP} />
      <div style={{ fontSize: 11.5, color: "var(--smp-muted)", margin: "8px 2px 0", lineHeight: 1.7 }}>
        p: <Chip c={BLU[0]} brd>&ge;0.05</Chip><Chip c={BLU[1]}>&lt;0.05</Chip><Chip c={BLU[2]}>&lt;0.01</Chip><Chip c={BLU[3]}>&lt;0.001</Chip>
      </div>

      <div style={{ fontSize: 11.5, color: "var(--smp-muted)", margin: "14px 2px 0", lineHeight: 1.6 }}>n = 21 dice, df = 19.</div>
    </figure>
  );
}
