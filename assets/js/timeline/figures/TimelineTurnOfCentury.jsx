import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* Toward the Turn of the Century (2050–2100) — timeline-fig name="turn-of-century" */
export default function TimelineTurnOfCentury() {
  return (
    <MovieTimelineSection
      conf={{ title: "Toward the Turn of the Century", range: "2050\u20132100", from: 2050, to: 2100 }}
    />
  );
}
