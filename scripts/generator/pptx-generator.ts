import { SlideData } from "../parser/yaml-parser";
import { sortSlides } from "../utils/sort";
import path from "path";
import fs from "fs";
import PptxGenJS from "pptxgenjs";
import { getSlidemaster } from "./layout-manager";
import { standardSlidemasters } from "./slidemasters/standard";
import { darkSlidemasters } from "./slidemasters/dark";

export function generatePptx(
  slides: SlideData[],
  options: { output: string; theme?: string }
): void {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_4x3";
  const theme = options.theme || "standard";

  // Définir les slidemasters pour le thème
  const themeSlidemasters =
    theme === "dark" ? darkSlidemasters : standardSlidemasters;

  for (const [type, def] of Object.entries(themeSlidemasters) as [
    string,
    (typeof themeSlidemasters)[string]
  ][]) {
    pptx.defineSlideMaster({
      title: def.layout,
      background: { color: def.background.color },
      objects: def.objects,
    });
  }

  // Trier les slides
  const sortedSlides = sortSlides(slides);

  for (const slideData of sortedSlides) {
    const slidemaster = getSlidemaster(slideData.slide.type, theme);
    const slide = pptx.addSlide({ masterName: slidemaster.layout });

    // Selon le type
    if (slideData.slide.type === "cover") {
      // Titre centré avec placeholder
      slide.addText(slideData.slide.title, {
        placeholder: "title",
        ...slidemaster.title,
        fontSize: 44,
      });
    } else if (slideData.slide.type === "toc") {
      // Titre
      slide.addText(slideData.slide.title, {
        placeholder: "title",
        ...slidemaster.title,
      });
      // Items
      if (slideData.slide.content.items) {
        slide.addText(
          slideData.slide.content.items.map((item) => `• ${item}`).join("\n"),
          { placeholder: "body", ...slidemaster.items }
        );
      }
    } else if (
      slideData.slide.type === "content" ||
      slideData.slide.type === "conclusion"
    ) {
      // Titre
      slide.addText(slideData.slide.title, {
        placeholder: "title",
        ...slidemaster.title,
      });
      // Bullets
      if (
        slideData.slide.content.bullets &&
        slideData.slide.content.bullets.length > 0
      ) {
        slide.addText(
          slideData.slide.content.bullets.map((b) => `• ${b}`).join("\n"),
          { placeholder: "body", ...slidemaster.bullets }
        );
      }
      // Key message
      if (slideData.slide.content.key_message) {
        slide.addText(slideData.slide.content.key_message, {
          placeholder: "keyMessage",
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
