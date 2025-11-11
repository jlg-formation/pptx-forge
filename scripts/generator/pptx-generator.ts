import { SlideData } from "../parser/yaml-parser";
import { sortSlides } from "../utils/sort";
import path from "path";
import fs from "fs";
import PptxGenJS from "pptxgenjs";
import { getSlidemaster } from "./layout-manager";
import { standardSlidemasters } from "./slidemasters/standard";
import { darkSlidemasters } from "./slidemasters/dark";
import { getImageSize } from "../utils/getImageSize";
import { addImageToSlide } from "../utils/addImage";
import crypto from "crypto";

export function generatePptx(
  slides: SlideData[],
  options: { output: string; theme?: string; title?: string }
): void {
  const pptx = new PptxGenJS();

  // Métadonnées
  const author = process.env.AUTHOR || "JLG";
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
      switch (slideData.slide.type) {
        case "cover":
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
          break;
        case "toc":
          slide.addText(slideData.slide.title, {
            placeholder: "title",
            ...slidemaster.title,
          });
          if (slideData.slide.content.items) {
            slide.addText(
              slideData.slide.content.items
                .map((item) => `• ${item}`)
                .join("\n"),
              { placeholder: "body", ...slidemaster.items }
            );
          }
          break;
        case "content":
        case "conclusion":
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
          break;
      }

      // Ajouter speaker notes
      if (slideData.slide.content.speaker_notes) {
        slide.addNotes(slideData.slide.content.speaker_notes);
      }

      // Ajouter l'illustration si elle existe (peu importe l'extension) et si le template n'est pas 'toc'
      if (slideData.slide.type !== "toc") {
        // Calculer la zone d'image
        let imgZone = { x: 7, y: 2, w: 2, h: 3 };
        if (Array.isArray(slidemaster.objects)) {
          const imgObj = slidemaster.objects.find(
            (obj) => obj.placeholder?.options?.name === "contentImage"
          );
          if (imgObj) {
            const opts = imgObj.placeholder.options;
            imgZone = { x: opts.x, y: opts.y, w: opts.w, h: opts.h };
          }
        }
        if (slideData.slide.type === "cover") {
          imgZone = { x: 2.5, y: 3, w: 5, h: 2.5 };
        }

        // Chercher l'image d'illustration
        const imageExtensions = [
          ".png",
          ".jpg",
          ".jpeg",
          ".webp",
          ".gif",
          ".svg",
        ];
        let imagePath: string | null = null;
        for (const ext of imageExtensions) {
          const candidatePath = path.resolve(
            "illustrations",
            slideData.chapter.key,
            `${slideData.slide.id}${ext}`
          );
          if (fs.existsSync(candidatePath)) {
            imagePath = candidatePath;
            break;
          }
        }

        // Fallback to pixabay si pas trouvée
        if (!imagePath) {
          const hash = crypto
            .createHash("sha1")
            .update(slideData.slide.id)
            .digest("hex");
          const num = (parseInt(hash.substring(0, 8), 16) % 30) + 1;
          const padded = num.toString().padStart(2, "0");
          const pixabayDir = "pixabay";
          if (fs.existsSync(pixabayDir)) {
            const files = fs.readdirSync(pixabayDir);
            const pixabayFile = files.find((f) => f.startsWith(padded + "."));
            if (pixabayFile) {
              imagePath = path.join(pixabayDir, pixabayFile);
            }
          }
        }

        // Ajouter l'image si trouvée
        if (imagePath) {
          addImageToSlide(slide, imagePath, imgZone);
        }
      }
    }
  }

  // Sauvegarder
  pptx.writeFile({ fileName: options.output });
}
