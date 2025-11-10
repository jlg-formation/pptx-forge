import { SlideMasterDefinition, createSlidemasters } from "../layout-manager";

const standardColors = {
  backgroundCover: "#FFFFFF",
  backgroundToc: "#F5F5F5",
  backgroundContent: "#FFFFFF",
  backgroundConclusion: "#EAEAEA",
  titleCover: "#222222",
  titleToc: "#333333",
  titleContent: "#222222",
  titleConclusion: "#222222",
  itemsToc: "#444444",
  bulletsContent: "#222222",
  bulletsConclusion: "#222222",
  keyMessageContent: "#0055AA",
  keyMessageConclusion: "#0055AA",
};

export const standardSlidemasters = createSlidemasters(
  standardColors,
  "standard"
);
