import { SlideData } from "../parser/yaml-parser";
import { sortSlides } from "../utils/sort";
import path from "path";
import fs from "fs";
import PptxGenJS from "pptxgenjs";
import { getSlidemaster } from "./layout-manager";
import { standardSlidemasters } from "./slidemasters/standard";
import { darkSlidemasters } from "./slidemasters/dark";
import { getImageSize } from "../utils/getImageSize";

export function generatePptx(
  slides: SlideData[],
  options: { output: string; theme?: string; title?: string }
): void {
  const pptx = new PptxGenJS();

  // Métadonnées
  const author = process.env.AUTHOR || 'JLG';
  const company = process.env.COMPANY;
  if (options.title) {
    pptx.title = options.title;
    pptx.subject = options.title;
  }
  if (author) pptx.author = author;
  if (company) pptx.company = company;

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

  // Grouper les slides par chapitre
  const slidesByChapter: Record<string, SlideData[]> = {};
  for (const slideData of sortedSlides) {
    const chapterKey = slideData.chapter.key;
    if (!slidesByChapter[chapterKey]) {
      slidesByChapter[chapterKey] = [];
    }
    slidesByChapter[chapterKey].push(slideData);
  }

  // Pour chaque chapitre, créer une section et ajouter les slides
  for (const [chapterKey, chapterSlides] of Object.entries(slidesByChapter)) {
    // Utiliser le titre du chapitre pour la section
    const sectionTitle = chapterSlides[0]?.chapter.title || chapterKey;
    pptx.addSection({ title: sectionTitle });

    for (const slideData of chapterSlides) {
      const slidemaster = getSlidemaster(slideData.slide.type, theme);
      const slide = pptx.addSlide({
        masterName: slidemaster.layout,
        sectionTitle,
      });

      // Selon le type
      if (slideData.slide.type === "cover") {
        slide.addText(slideData.slide.title, {
          placeholder: "title",
          ...slidemaster.title,
          fontSize: 44,
        });
        const currentYear = new Date().getFullYear();
        slide.addText(`Jean-Louis GUENEGO @${currentYear}`, {
          placeholder: "subtitle",
          fontSize: 18,
          color: "#666666",
          align: "center",
          x: 0.5,
          y: 6.2,
          w: 9,
          h: 0.6,
        });
      } else if (slideData.slide.type === "toc") {
        slide.addText(slideData.slide.title, {
          placeholder: "title",
          ...slidemaster.title,
        });
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
        slide.addText(slideData.slide.title, {
          placeholder: "title",
          ...slidemaster.title,
        });
        if (
          slideData.slide.content.bullets &&
          slideData.slide.content.bullets.length > 0
        ) {
          slide.addText(
            slideData.slide.content.bullets.map((b) => `• ${b}`).join("\n"),
            { placeholder: "body", ...slidemaster.bullets }
          );
        }
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

      // Ajouter l'illustration si elle existe (peu importe l'extension) et si le template n'est pas 'toc'
      if (slideData.slide.type !== "toc") {
        const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
        let foundImagePath: string | null = null;
        for (const ext of imageExtensions) {
          const candidatePath = path.resolve(
            "illustrations",
            slideData.chapter.key,
            `${slideData.slide.id}${ext}`
          );
          if (fs.existsSync(candidatePath)) {
            foundImagePath = candidatePath;
            break;
          }
        }
        if (foundImagePath) {
          const { width, height } = getImageSize(foundImagePath);
          if (width > 0 && height > 0) {
            let imgZone;
            if (slideData.slide.type === "cover") {
              imgZone = { x: 2.5, y: 3, w: 5, h: 2.5 };
            } else {
              imgZone = { x: 7, y: 2, w: 2, h: 3 };
              if (Array.isArray(slidemaster.objects)) {
                const imgObj = slidemaster.objects.find(
                  (obj) => obj.placeholder?.options?.name === "contentImage"
                );
                if (imgObj) {
                  const opts = imgObj.placeholder.options;
                  imgZone = { x: opts.x, y: opts.y, w: opts.w, h: opts.h };
                }
              }
            }
            const imgRatio = width / height;
            const zoneRatio = imgZone.w / imgZone.h;
            let finalW = imgZone.w;
            let finalH = imgZone.h;
            if (imgRatio > zoneRatio) {
              finalH = imgZone.w / imgRatio;
            } else {
              finalW = imgZone.h * imgRatio;
            }
            const finalX = imgZone.x + (imgZone.w - finalW) / 2;
            const finalY = imgZone.y + (imgZone.h - finalH) / 2;
            slide.addImage({
              path: foundImagePath,
              x: finalX,
              y: finalY,
              w: finalW,
              h: finalH,
            });
          }
        }
      }
    }
  }

  // Sauvegarder
  pptx.writeFile({ fileName: options.output });
}
