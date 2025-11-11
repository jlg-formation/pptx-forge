import PptxGenJS from "pptxgenjs";
import { SlideData } from "../../parser/yaml-parser";

export function addSlideContent(
  slide: PptxGenJS.Slide,
  slideData: SlideData,
  slidemaster: any
): void {
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
          slideData.slide.content.items.map((item) => `• ${item}`).join("\n"),
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
}
