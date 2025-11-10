import { SlideMasterDefinition } from "../layout-manager";

export const darkSlidemasters: Record<string, SlideMasterDefinition> = {
  cover: {
    background: { color: "#222831" },
    title: { fontSize: 36, color: "#EEEEEE", bold: true, fontFace: "Arial" },
    layout: "cover-dark",
  },
  toc: {
    background: { color: "#393E46" },
    title: { fontSize: 28, color: "#EEEEEE", bold: true },
    items: { fontSize: 18, color: "#FFD369" },
    layout: "toc-dark",
  },
  content: {
    background: { color: "#222831" },
    title: { fontSize: 24, color: "#FFD369", bold: true },
    bullets: { fontSize: 18, color: "#EEEEEE" },
    keyMessage: { fontSize: 20, color: "#FFD369", italic: true },
    layout: "content-dark",
  },
  conclusion: {
    background: { color: "#393E46" },
    title: { fontSize: 24, color: "#FFD369", bold: true },
    bullets: { fontSize: 18, color: "#EEEEEE" },
    keyMessage: { fontSize: 20, color: "#FFD369", italic: true },
    layout: "conclusion-dark",
  },
};
