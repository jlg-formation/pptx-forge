import { SlideMasterDefinition } from "../layout-manager";

export const standardSlidemasters: Record<string, SlideMasterDefinition> = {
  cover: {
    background: { color: "#FFFFFF" },
    title: { fontSize: 36, color: "#222", bold: true, fontFace: "Arial" },
    layout: "cover-standard",
  },
  toc: {
    background: { color: "#F5F5F5" },
    title: { fontSize: 28, color: "#333", bold: true },
    items: { fontSize: 18, color: "#444" },
    layout: "toc-standard",
  },
  content: {
    background: { color: "#FFFFFF" },
    title: { fontSize: 24, color: "#222", bold: true },
    bullets: { fontSize: 18, color: "#222" },
    keyMessage: { fontSize: 20, color: "#0055AA", italic: true },
    layout: "content-standard",
  },
  conclusion: {
    background: { color: "#EAEAEA" },
    title: { fontSize: 24, color: "#222", bold: true },
    bullets: { fontSize: 18, color: "#222" },
    keyMessage: { fontSize: 20, color: "#0055AA", italic: true },
    layout: "conclusion-standard",
  },
};
