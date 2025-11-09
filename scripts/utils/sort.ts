import { SlideData } from "../parser/yaml-parser.js";

export function sortSlides(slides: SlideData[]): SlideData[] {
  return slides.sort((a, b) => {
    if (a.chapter.number !== b.chapter.number)
      return a.chapter.number - b.chapter.number;
    return a.slide.meta.order - b.slide.meta.order;
  });
}
