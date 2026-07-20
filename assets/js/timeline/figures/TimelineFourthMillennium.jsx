import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Fourth Millennium (3000–3999) — timeline-fig name="fourth-millennium" */
export default function TimelineFourthMillennium() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Fourth Millennium", range: "3000\u20133999", from: 3000, to: 4000, compressed: true, breakAt: 50, tickStep: 50 }}
    />
  );
}
