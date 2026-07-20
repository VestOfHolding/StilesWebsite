import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Centuries of Star Trek (2200–2400) — timeline-fig name="centuries-of-trek" */
export default function TimelineCenturiesOfTrek() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Centuries of Star Trek", range: "2200\u20132400", from: 2200, to: 2400 }}
    />
  );
}
