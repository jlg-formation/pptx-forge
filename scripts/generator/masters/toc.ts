import { SlideMasterDefinition, ColorScheme } from "../layout-manager";

export function createTocMaster(
  colors: ColorScheme,
  theme: "standard" | "dark"
): SlideMasterDefinition {
  return {
    background: { color: colors.backgroundToc },
    title: { fontSize: 28, color: colors.titleToc, bold: true },
    items: { fontSize: 15, color: colors.itemsToc },
    layout: `toc-${theme}`,
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
          options: { name: "body", type: "body", x: 0.5, y: 2, w: 9, h: 4 },
          text: "",
        },
      },
    ],
  };
}
