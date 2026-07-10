import React from "react";
import { createRoot } from "react-dom/client";
import { REGISTRY } from "./registry.js";

function mountAll() {
  document.querySelectorAll(".smp-fig[data-fig]").forEach((el) => {
    if (el.dataset.mounted) return;
    const Comp = REGISTRY[el.dataset.fig];
    if (!Comp) return;
    const { fig, mounted, ...props } = el.dataset; // remaining data-* become props
    el.dataset.mounted = "1";
    createRoot(el).render(<Comp {...props} />);
  });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountAll);
else mountAll();
