import crypto from "crypto";
import fs from "fs";
import path from "path";
import PptxGenJS from "pptxgenjs";
import { SlideData } from "../../parser/yaml-parser";
import { addImageToSlide } from "../../utils/addImage";

export function addSlideImage(
  slide: PptxGenJS.Slide,
  slideData: SlideData,
  slidemaster: any
): void {
  // Ajouter l'illustration si elle existe (peu importe l'extension) et si le template n'est pas 'toc'
  if (slideData.slide.type !== "toc") {
    // Calculer la zone d'image
    let imgZone = { x: 7, y: 2, w: 2, h: 3 };
    if (Array.isArray(slidemaster.objects)) {
      const imgObj = slidemaster.objects.find(
        (obj: any) => obj.placeholder?.options?.name === "contentImage"
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
    const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
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
