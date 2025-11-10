import { SlideData } from "../parser/yaml-parser";
import { sortSlides } from "../utils/sort";
import * as path from "path";
import * as fs from "fs";
import PptxGenJS from "pptxgenjs";
import { getSlidemaster } from "./layout-manager";

export function generatePptx(
  slides: SlideData[],
  options: { output: string; theme?: string }
): void {
  const pptx = new PptxGenJS();
  const theme = options.theme || "standard";

  // Définir les slidemasters pour le thème
  const themeSlidemasters =
    theme === "dark"
      ? require("./slidemasters/dark").darkSlidemasters
      : require("./slidemasters/standard").standardSlidemasters;

  for (const [type, def] of Object.entries(themeSlidemasters) as [
    string,
    (typeof themeSlidemasters)[string]
  ][]) {
    pptx.defineSlideMaster({
      title: def.layout,
      background: { color: def.background.color },
    });
  }

  // Trier les slides
  const sortedSlides = sortSlides(slides);

  for (const slideData of sortedSlides) {
    const slidemaster = getSlidemaster(slideData.slide.type, theme);
    const slide = pptx.addSlide({ masterName: slidemaster.layout });

    // Ajouter le titre
    slide.addText(slideData.slide.title, {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1,
      ...slidemaster.title,
    });

    // Selon le type
    if (slideData.slide.type === "cover") {
      // Pour cover, titre centré, plus grand
      slide.addText(slideData.slide.title, {
        x: 1,
        y: 2,
        w: 8,
        h: 2,
        align: "center",
        ...slidemaster.title,
        fontSize: 44,
      });
    } else if (slideData.slide.type === "toc") {
      // Titre déjà ajouté, ajouter items
      if (slideData.slide.content.items) {
        slide.addText(
          slideData.slide.content.items.map((item) => `• ${item}`).join("\n"),
          { x: 1, y: 2, w: 8, h: 4, ...slidemaster.items }
        );
      }
    } else if (
      slideData.slide.type === "content" ||
      slideData.slide.type === "conclusion"
    ) {
      // Bullets
      if (
        slideData.slide.content.bullets &&
        slideData.slide.content.bullets.length > 0
      ) {
        slide.addText(
          slideData.slide.content.bullets.map((b) => `• ${b}`).join("\n"),
          { x: 1, y: 2, w: 6, h: 3, ...slidemaster.bullets }
        );
      }
      // Key message
      if (slideData.slide.content.key_message) {
        slide.addText(slideData.slide.content.key_message, {
          x: 1,
          y: 5,
          w: 8,
          h: 1,
          ...slidemaster.keyMessage,
        });
      }
    }

    // Ajouter speaker notes
    if (slideData.slide.content.speaker_notes) {
      slide.addNotes(slideData.slide.content.speaker_notes);
    }

    // Ajouter l'illustration si elle existe
    const imagePath = path.resolve(
      "illustrations",
      slideData.chapter.key,
      `${slideData.slide.id}.png`
    );
    if (fs.existsSync(imagePath)) {
      slide.addImage({ path: imagePath, x: 7, y: 2, w: 2, h: 2 });
    }
  }

  // Sauvegarder
  pptx.writeFile({ fileName: options.output });
}
