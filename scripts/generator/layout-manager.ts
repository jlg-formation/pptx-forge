// Type pour la définition d'un slidemaster
export interface SlideMasterDefinition {
  background: { color: string };
  title: { fontSize: number; color: string; bold?: boolean; fontFace?: string };
  items?: { fontSize: number; color: string };
  bullets?: { fontSize: number; color: string };
  keyMessage?: { fontSize: number; color: string; italic?: boolean };
  layout: string;
  objects: any[];
}

interface ColorScheme {
  backgroundCover: string;
  backgroundToc: string;
  backgroundContent: string;
  backgroundConclusion: string;
  titleCover: string;
  titleToc: string;
  titleContent: string;
  titleConclusion: string;
  itemsToc: string;
  bulletsContent: string;
  bulletsConclusion: string;
  keyMessageContent: string;
  keyMessageConclusion: string;
}

export function createSlidemasters(
  colors: ColorScheme,
  theme: "standard" | "dark"
): Record<string, SlideMasterDefinition> {
  return {
    cover: {
      background: { color: colors.backgroundCover },
      title: {
        fontSize: 36,
        color: colors.titleCover,
        bold: true,
        fontFace: "Arial",
      },
      layout: `cover-${theme}`,
      objects: [
        {
          placeholder: {
            options: {
              name: "title",
              type: "title",
              x: 1,
              y: 2,
              w: 8,
              h: 2,
              align: "center",
            },
            text: "",
          },
        },
      ],
    },
    toc: {
      background: { color: colors.backgroundToc },
      title: { fontSize: 28, color: colors.titleToc, bold: true },
      items: { fontSize: 18, color: colors.itemsToc },
      layout: `toc-${theme}`,
      objects: [
        {
          placeholder: {
            options: { name: "title", type: "title", x: 1, y: 0.5, w: 8, h: 1 },
            text: "",
          },
        },
        {
          placeholder: {
            options: { name: "body", type: "body", x: 1, y: 2, w: 8, h: 4 },
            text: "",
          },
        },
      ],
    },
    content: {
      background: { color: colors.backgroundContent },
      title: { fontSize: 24, color: colors.titleContent, bold: true },
      bullets: { fontSize: 18, color: colors.bulletsContent },
      keyMessage: {
        fontSize: 20,
        color: colors.keyMessageContent,
        italic: true,
      },
      layout: `content-${theme}`,
      objects: [
        {
          placeholder: {
            options: { name: "title", type: "title", x: 1, y: 0.5, w: 8, h: 1 },
            text: "",
          },
        },
        {
          placeholder: {
            options: { name: "body", type: "body", x: 1, y: 2, w: 6, h: 3 },
            text: "",
          },
        },
        {
          placeholder: {
            options: {
              name: "keyMessage",
              type: "body",
              x: 1,
              y: 5,
              w: 8,
              h: 1,
            },
            text: "",
          },
        },
      ],
    },
    conclusion: {
      background: { color: colors.backgroundConclusion },
      title: { fontSize: 24, color: colors.titleConclusion, bold: true },
      bullets: { fontSize: 18, color: colors.bulletsConclusion },
      keyMessage: {
        fontSize: 20,
        color: colors.keyMessageConclusion,
        italic: true,
      },
      layout: `conclusion-${theme}`,
      objects: [
        {
          placeholder: {
            options: { name: "title", type: "title", x: 1, y: 0.5, w: 8, h: 1 },
            text: "",
          },
        },
        {
          placeholder: {
            options: { name: "body", type: "body", x: 1, y: 2, w: 6, h: 3 },
            text: "",
          },
        },
        {
          placeholder: {
            options: {
              name: "keyMessage",
              type: "body",
              x: 1,
              y: 5,
              w: 8,
              h: 1,
            },
            text: "",
          },
        },
      ],
    },
  };
}

import { standardSlidemasters } from "./slidemasters/standard";
import { darkSlidemasters } from "./slidemasters/dark";

// Fonction utilitaire pour récupérer le slidemaster selon le layout et le thème
export function getSlidemaster(
  layout: string,
  theme: string
): SlideMasterDefinition {
  if (theme === "dark") {
    return darkSlidemasters[layout];
  } else {
    return standardSlidemasters[layout];
  }
}
