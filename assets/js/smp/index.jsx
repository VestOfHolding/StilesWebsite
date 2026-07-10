import React from "react";
import { createRoot } from "react-dom/client";
import SmpDiceViz from "./SmpDiceViz.jsx";

const el = document.getElementById("smp-dice-viz");
if (el) {
  createRoot(el).render(<SmpDiceViz />);
}
