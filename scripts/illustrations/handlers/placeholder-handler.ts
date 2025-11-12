import path from "path";
import fs from "fs";
import { logger } from "../../cli/logger";
import { SlideData } from "../../parser/yaml-parser";

export async function handlePlaceholderMethod(
  slide: SlideData,
  imgDir: string
): Promise<void> {
  const chapterKey = slide.chapter.key;
  const slideId = slide.slide.id;
  logger.info(`Utilisation du placeholder pour ${chapterKey}/${slideId}`);
  // Copier le placeholder dans le dossier illustrations
  const placeholderSrc = path.join("illustrations", "placeholder.png");
  const outputPath = path.join(imgDir, `${slideId}.png`);
  try {
    if (!fs.existsSync(placeholderSrc)) {
      logger.error(`Placeholder manquant: ${placeholderSrc}`);
      return;
    }
    fs.copyFileSync(placeholderSrc, outputPath);
    logger.info(`Placeholder copié: ${outputPath}`);
  } catch (err) {
    logger.error(`Erreur copie placeholder: ${err}`);
  }
}
