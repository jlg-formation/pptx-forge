import { SlideData } from "../parser/yaml-parser";
import { sortSlides } from "../utils/sort";
import * as path from "path";
import * as fs from "fs";
import PptxGenJS from "pptxgenjs";

export function generatePptx(
  slides: SlideData[],
  options: { output: string; theme?: string }
): void {
  const pptx = new PptxGenJS();

  // Trier les slides
  const sortedSlides = sortSlides(slides);

  for (const slideData of sortedSlides) {
    const slide = pptx.addSlide();

    // Ajouter le titre
    slide.addText(slideData.slide.title, {
      x: 1,
      y: 0.5,
      w: 8,
      h: 1,
      fontSize: 32,
      bold: true,
    });

    // Selon le type
    if (slideData.slide.type === "cover") {
      // Pour cover, titre centré, plus grand
      slide.addText(slideData.slide.title, {
        x: 1,
        y: 2,
        w: 8,
        h: 2,
        fontSize: 44,
        align: "center",
      });
    } else if (slideData.slide.type === "toc") {
      // Titre déjà ajouté, ajouter items
      if (slideData.slide.content.items) {
        slide.addText(
          slideData.slide.content.items.map((item) => `• ${item}`).join("\n"),
          { x: 1, y: 2, w: 8, h: 4, fontSize: 18 }
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
          { x: 1, y: 2, w: 6, h: 3, fontSize: 18 }
        );
      }
      // Key message
      if (slideData.slide.content.key_message) {
        slide.addText(slideData.slide.content.key_message, {
          x: 1,
          y: 5,
          w: 8,
          h: 1,
          fontSize: 24,
          bold: true,
          color: "FF0000",
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
