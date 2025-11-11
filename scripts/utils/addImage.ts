import { getImageSize } from "./getImageSize";
import PptxGenJS from "pptxgenjs";

export function addImageToSlide(
  slide: PptxGenJS.Slide,
  imagePath: string,
  imgZone: { x: number; y: number; w: number; h: number }
): void {
  const { width, height } = getImageSize(imagePath);
  if (width > 0 && height > 0) {
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
      path: imagePath,
      x: finalX,
      y: finalY,
      w: finalW,
      h: finalH,
    });
  }
}
