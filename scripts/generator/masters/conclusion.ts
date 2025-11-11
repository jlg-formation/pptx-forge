import { SlideMasterDefinition, ColorScheme } from "../layout-manager";

export function createConclusionMaster(
  colors: ColorScheme,
  theme: "standard" | "dark"
): SlideMasterDefinition {
  return {
    background: { color: colors.backgroundConclusion },
    title: { fontSize: 24, color: colors.titleConclusion, bold: true },
    bullets: { fontSize: 15, color: colors.bulletsConclusion },
    keyMessage: {
      fontSize: 20,
      color: colors.keyMessageConclusion,
      italic: true,
    },
    layout: `conclusion-${theme}`,
    objects: [
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 1,
          },
          text: "",
        },
      },
      {
        placeholder: {
          options: { name: "body", type: "body", x: 0.5, y: 2, w: 7, h: 3 },
          text: "",
        },
      },
      {
        placeholder: {
          options: {
            name: "keyMessage",
            type: "body",
            x: 0.5,
            y: 5,
            w: 9,
            h: 1,
          },
          text: "",
        },
      },
    ],
  };
}
