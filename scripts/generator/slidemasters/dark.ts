import { SlideMasterDefinition, createSlidemasters } from "../layout-manager";

const darkColors = {
  backgroundCover: "#222831",
  backgroundToc: "#393E46",
  backgroundContent: "#222831",
  backgroundConclusion: "#393E46",
  titleCover: "#EEEEEE",
  titleToc: "#EEEEEE",
  titleContent: "#FFD369",
  titleConclusion: "#FFD369",
  itemsToc: "#FFD369",
  bulletsContent: "#EEEEEE",
  bulletsConclusion: "#EEEEEE",
  keyMessageContent: "#FFD369",
  keyMessageConclusion: "#FFD369",
};

export const darkSlidemasters = createSlidemasters(darkColors, "dark");
