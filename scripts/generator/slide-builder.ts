import PptxGenJS from "pptxgenjs";
import { SlideData } from "../parser/yaml-parser.js";
import { loadIllustration } from "../illustrations/image-loader.js";
import { createPlaceholder } from "../illustrations/placeholder.js";
import { getLayout } from "./layout-manager.js";

export function buildSlide(
  pptx: PptxGenJS,
  slideData: SlideData,
  illustrationsDir: string
): void {
  const slide = pptx.addSlide(
    getLayout(slideData.slide.type, slideData.slide.meta.order)
  );
  slide.addText(slideData.slide.title, { x: 0.5, y: 0.5, w: 9, h: 1 });

  if (
    slideData.slide.content.bullets &&
    slideData.slide.content.bullets.length > 0
  ) {
    slide.addText([...slideData.slide.content.bullets.slice(0, 5)], {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2,
    });
  }
  if (slideData.slide.content.key_message) {
    slide.addText(slideData.slide.content.key_message, {
      x: 0.5,
      y: 4,
      w: 9,
      h: 1,
    });
  }
  if (
    slideData.slide.content.items &&
    slideData.slide.content.items.length > 0
  ) {
    slide.addText([...slideData.slide.content.items], {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2,
    });
  }

  const image =
    loadIllustration(
      illustrationsDir,
      slideData.chapter.key,
      slideData.slide.id
    ) || createPlaceholder();
  slide.addImage({ data: image, x: 7, y: 1, w: 2, h: 2 });

  if (slideData.slide.content.speaker_notes) {
    slide.addNotes(slideData.slide.content.speaker_notes);
  }
}
