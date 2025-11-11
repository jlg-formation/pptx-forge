import crypto from "crypto";
import fs from "fs";
import path from "path";
import PptxGenJS from "pptxgenjs";
import { SlideData } from "../parser/yaml-parser";
import { addImageToSlide } from "../utils/addImage";
import { sortSlides } from "../utils/sort";
import { getSlidemaster } from "./layout-manager";
import { darkSlidemasters } from "./slidemasters/dark";
import { standardSlidemasters } from "./slidemasters/standard";
import { defineSlidemasters } from "./pptx-helpers/define-slidemasters";
import { addSlideContent } from "./pptx-helpers/add-slide-content";
import { addSlideImage } from "./pptx-helpers/add-slide-image";

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

  defineSlidemasters(pptx, themeSlidemasters);

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

      addSlideContent(slide, slideData, slidemaster);
      addSlideImage(slide, slideData, slidemaster);
    }
  }

  // Sauvegarder
  pptx.writeFile({ fileName: options.output });
}
