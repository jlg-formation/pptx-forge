// Type pour la définition d'un slidemaster
export interface SlideMasterDefinition {
  background: { color: string };
  title: { fontSize: number; color: string; bold?: boolean; fontFace?: string };
  items?: { fontSize: number; color: string };
  bullets?: { fontSize: number; color: string };
  keyMessage?: { fontSize: number; color: string; italic?: boolean };
  layout: string;
}

// Fonction utilitaire pour récupérer le slidemaster selon le layout et le thème
export function getSlidemaster(
  layout: string,
  theme: string
): SlideMasterDefinition {
  if (theme === "dark") {
    // @ts-ignore
    const { darkSlidemasters } = require("./slidemasters/dark");
    return darkSlidemasters[layout];
  }
  // @ts-ignore
  const { standardSlidemasters } = require("./slidemasters/standard");
  return standardSlidemasters[layout];
}
