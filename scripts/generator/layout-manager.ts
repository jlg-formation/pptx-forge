import { createCoverMaster } from "./masters/cover";
import { createTocMaster } from "./masters/toc";
import { createContentMaster } from "./masters/content";
import { createConclusionMaster } from "./masters/conclusion";
import { standardSlidemasters } from "./slidemasters/standard";
import { darkSlidemasters } from "./slidemasters/dark";

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

export interface ColorScheme {
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
    cover: createCoverMaster(colors, theme),
    toc: createTocMaster(colors, theme),
    content: createContentMaster(colors, theme),
    conclusion: createConclusionMaster(colors, theme),
  };
}

// Fonction utilitaire pour récupérer le slidemaster selon le layout et le thème
export function getSlidemaster(
  layout: string,
  theme: string
): SlideMasterDefinition {
  if (theme === "dark") {
    return darkSlidemasters[layout];
  }
  return standardSlidemasters[layout];
}
