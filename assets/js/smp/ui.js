// Shared figure styling. SVG text uses currentColor so it inherits the page's
// text color — high-contrast on dark, and still correct in a light theme.
// (HTML text like the main title inherits color automatically.)
export const MAIN_TITLE = { textAlign: "center", fontWeight: 700, fontSize: 18, marginBottom: 4, lineHeight: 1.2 };
export const AXIS_LABEL = { fill: "currentColor", fontSize: 13 };
export const TICK = { fill: "currentColor", fontSize: 12 };
