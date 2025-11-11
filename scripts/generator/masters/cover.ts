import { SlideMasterDefinition, ColorScheme } from "../layout-manager";

export function createCoverMaster(
  colors: ColorScheme,
  theme: "standard" | "dark"
): SlideMasterDefinition {
  return {
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
            x: 0.5,
            y: 1,
            w: 9,
            h: 5,
            align: "center",
          },
          text: "",
        },
      },
      {
        placeholder: {
          options: {
            name: "subtitle",
            type: "subtitle",
            x: 0.5,
            y: 6.2,
            w: 9,
            h: 0.6,
            align: "center",
            fontSize: 18,
            color: "#666666",
          },
          text: "Jean-Louis GUENEGO @2025",
        },
      },
    ],
  };
}
