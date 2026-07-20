import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Deep Future (4000 and beyond) — timeline-fig name="deep-future" */
export default function TimelineDeepFuture() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Deep Future", range: "4000 and beyond", from: 4000, to: 1e9, compressed: true }}
    />
  );
}
