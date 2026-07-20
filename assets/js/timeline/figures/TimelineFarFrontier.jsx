import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Far Frontier (2400–3000) — timeline-fig name="far-frontier" */
export default function TimelineFarFrontier() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Far Frontier", range: "2400\u20133000", from: 2400, to: 3000 }}
    />
  );
}
