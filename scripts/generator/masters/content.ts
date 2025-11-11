import { SlideMasterDefinition, ColorScheme } from "../layout-manager";

export function createContentMaster(
  colors: ColorScheme,
  theme: "standard" | "dark"
): SlideMasterDefinition {
  return {
    background: { color: colors.backgroundContent },
    title: { fontSize: 24, color: colors.titleContent, bold: true },
    bullets: { fontSize: 15, color: colors.bulletsContent },
    keyMessage: {
      fontSize: 20,
      color: colors.keyMessageContent,
      italic: true,
    },
    layout: `content-${theme}`,
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
          options: { name: "body", type: "body", x: 0.5, y: 2, w: 6, h: 3 },
          text: "",
        },
      },
      {
        placeholder: {
          options: {
            name: "keyMessage",
            type: "body",
            x: 0.5,
            y: 6,
            w: 9,
            h: 1,
          },
          text: "",
        },
      },
    ],
  };
}
