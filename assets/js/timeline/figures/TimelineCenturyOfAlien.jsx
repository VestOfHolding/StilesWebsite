import React from "react";
import MovieTimelineSection from "./MovieTimelineSection.jsx";

/* The Century of Alien (2100–2200) — timeline-fig name="century-of-alien" */
export default function TimelineCenturyOfAlien() {
  return (
    <MovieTimelineSection
      conf={{ title: "The Century of Alien", range: "2100\u20132200", from: 2100, to: 2200 }}
    />
  );
}
