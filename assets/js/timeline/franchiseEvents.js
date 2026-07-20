// The Future According to Movies — franchise "lore" events layer.
//
// Dated in-universe facts used to annotate the timeline, INDEPENDENT of where each
// film's main marker sits (movieTimeline.js). Use these for things a franchise
// establishes about its future — apocalypses, wars, foundings, discoveries — even
// when little or none of it is shown on screen, or when the film's own setting is
// elsewhere on the timeline.
//
//   franchise : grouping key
//   source    : where this fact comes from — usually the film that establishes it
//               (a film mentioning off-screen history is itself a valid source), but
//               equally a book, RPG rulebook, short film, or wiki compilation, e.g.
//                 source: "Terminator 2: Judgment Day"
//                 source: "ALIEN RPG, Evolved Edition core rulebook"
//                 source: "Alien: The Weyland-Yutani Report (Titan Books)"
//               A film title here can be cross-referenced against movieTimeline.js.
//   released  : the year that source came out (film release, book publication, etc.)
//   branch    : for series with alternate/parallel timelines; null otherwise
//   start     : in-universe year the event happens (or begins)
//   end       : last year for eras/ranges; equals `start` for a single-point event
//   approx    : true when the year is inferred/unspecified rather than stated on screen
//   label     : short marker text
//   detail    : one-line paraphrased description
// Every event sits at year 2000 or later, so all of them render on the timeline.
// Supplementary material is cited the same way films are; pair a non-film source
// with approx: true when the year itself is uncertain.

export const EVENTS = [
  // ── Alien ──
  { franchise: "Alien", source: "https://weylandyu.com/about/history/", released: 2026, branch: null,
    start: 2030, end: 2030, approx: false,
    label: "Hypersleep Patented",
    detail: "Weyland Corp patents a viable hypersleep cryogenic suspension chamber, an essential technology in future interstellar travel." },
  { franchise: "Alien", source: "https://weylandyu.com/about/history/", released: 2026, branch: null,
    start: 2032, end: 2032, approx: false,
    label: "FTL Travel Achieved",
    detail: "Weyland Corp researchers succeed at achieving faster-than-light travel." },
  { franchise: "Alien", source: "Alien RPG Evolved Edition Core Rulebook", released: 2025, branch: null,
    start: 2039, end: 2039, approx: false,
    label: "First Terraformed Planet",
    detail: "Weyland Corp successfully creates a breathable atmosphere on extra-solar planet GJ667CC." },
  { franchise: "Alien", source: "Prometheus", released: 2012, branch: null,
    start: 2089, end: 2089, approx: false,
    label: "Star map discovered",
    detail: "Archaeologists find a star map pointing to the 'Engineers,' launching the Weyland-funded Prometheus expedition." },
  { franchise: "Alien", source: "Alien RPG Evolved Edition Core Rulebook", released: 2025, branch: null,
    start: 2157, end: 2157, approx: true,
    label: "Hadley's Hope founded",
    detail: "Weyland-Yutani establishes the Hadley's Hope terraforming colony on LV-426 — the world Ripley had warned about." },
  // ── Blade Runner ──
  { franchise: "Blade Runner", source: "Blade Runner: Black Out 2022", released: 2017, branch: null,
    start: 2020, end: 2020, approx: false,
    label: "Nexus-8 released",
    detail: "After Eldon Tyrell's death, the Tyrell Corp rushes out Nexus-8 replicants with open-ended human lifespans." },
  { franchise: "Blade Runner", source: "Blade Runner: Black Out 2022", released: 2017, branch: null,
    start: 2022, end: 2022, approx: false,
    label: "The Blackout",
    detail: "Replicant militants detonate a nuclear EMP over Los Angeles, erasing every replicant record and crashing society." },
  { franchise: "Blade Runner", source: "Blade Runner 2049", released: 2017, branch: null,
    start: 2023, end: 2023, approx: false,
    label: "Replicant Prohibition",
    detail: "In the Blackout's wake, replicant production is outlawed indefinitely and surviving units are ordered retired." },
  { franchise: "Blade Runner", source: "Blade Runner 2049", released: 2017, branch: null,
    start: 2025, end: 2025, approx: false,
    label: "Wallace ends the famine",
    detail: "Niander Wallace ends a global food crisis with synthetic farming and free patents, rising to vast power." },
  { franchise: "Blade Runner", source: "Blade Runner 2049", released: 2017, branch: null,
    start: 2028, end: 2028, approx: false,
    label: "Wallace absorbs Tyrell",
    detail: "The Wallace Corporation acquires the bankrupt Tyrell Corp and its replicant technology." },
  // ── Star Trek ──
  { franchise: "Star Trek", source: "Star Trek: First Contact", released: 1996, branch: null,
    start: 2053, end: 2053, approx: true,
    label: "World War III",
    detail: "A nuclear WWIII devastates Earth (~600 million dead, governments gone) — the backdrop the film returns to." },
  // ── Terminator ──
  { franchise: "Terminator", source: "Terminator 3: Rise of the Machines", released: 2003, branch: "Skynet (T3–Salvation)",
    start: 2004, end: 2004, approx: false,
    label: "Judgment Day (delayed)",
    detail: "T2 only postponed Judgement Day. Skynet wakes and launches the war at 6:18pm ET" },
  { franchise: "Terminator", source: "Terminator Genisys", released: 2015, branch: "Genisys (reboot)",
    start: 2017, end: 2017, approx: false,
    label: "Judgment Day (Genisys)",
    detail: "Skynet re-emerges as an OS called 'Genisys' that goes online and turns on humanity." },
  { franchise: "Terminator", source: "Terminator: Dark Fate", released: 2019, branch: "Dark Fate (T2 sequel)",
    start: 2026, end: 2026, approx: true,
    label: "Judgment Day (Legion)",
    detail: "Skynet was stopped, but a new cyberwarfare AI, Legion, triggers a fresh Judgement Day." },
  { franchise: "Terminator", source: "The Terminator", released: 1984, branch: "Skynet (T1–T2)",
    start: 2029, end: 2029, approx: true,
    label: "Future war vs Skynet",
    detail: "Skynet is near defeat; it and John Connor's resistance both send agents back." },
  { franchise: "Terminator", source: "Terminator 3: Rise of the Machines", released: 2003, branch: "Skynet (T3–Salvation)",
    start: 2032, end: 2032, approx: true,
    label: "War origin (T3)",
    detail: "Kate Brewster sends the reprogrammed T-850 (and Skynet sends the T-X) back." },
  { franchise: "Terminator", source: "Terminator: Dark Fate", released: 2019, branch: "Dark Fate (T2 sequel)",
    start: 2042, end: 2042, approx: false,
    label: "Future war vs Legion",
    detail: "Grace and the Rev-9 are both sent back." },
  // ── The Purge ──
  { franchise: "The Purge", source: "The First Purge", released: 2018, branch: null,
    start: 2014, end: 2014, approx: false,
    label: "NFFA takes power",
    detail: "Amid economic collapse, the New Founding Fathers of America seize control of the US government." },
  { franchise: "The Purge", source: "The First Purge", released: 2018, branch: null,
    start: 2017, end: 2017, approx: false,
    label: "The first Purge",
    detail: "The 28th Amendment legalizes all crime for 12 hrs a year (7pm Mar 21–7am Mar 22); the NFFA trials it on Staten Island." },
  // ── The Time Machine ──
  { franchise: "The Time Machine", source: "The Time Machine (2002)", released: 2002, branch: null,
    start: 2037, end: 2037, approx: false,
    label: "The Moon is destroyed",
    detail: "Lunar mining/demolition breaks apart the moon. It rains debris and starts Earth's collapse." },
  { franchise: "The Time Machine", source: "The Time Machine (2002)", released: 2002, branch: null,
    start: 802701, end: 802701, approx: false,
    label: "The Eloi and the Morlocks",
    detail: "By 802,701 humanity has split into the gentle, childlike Eloi and the subterranean Morlocks who farm and prey on them." },
];
