import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Century So Far (2000–2025) — timeline-fig name="century-so-far" */
export default function TimelineCenturySoFar() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Century So Far", range: "2000\u20132025", from: 2000, to: 2026 }}
    />
  );
}
