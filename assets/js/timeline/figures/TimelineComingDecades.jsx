import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Coming Decades (2026–2050) — timeline-fig name="coming-decades" */
export default function TimelineComingDecades() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Coming Decades", range: "2026\u20132050", from: 2026, to: 2050 }}
    />
  );
}
