import path from "path";
import fs from "fs";
import { logger } from "../../cli/logger";
import { SlideData } from "../../parser/yaml-parser";
import { searchPSEImage } from "../../utils/searchPSEImage";
import { downloadImage } from "../../utils/downloadImage";

export async function handlePSEMethod(
  slide: SlideData,
  imgDir: string
): Promise<void> {
  const chapterKey = slide.chapter.key;
  const slideId = slide.slide.id;
  const searchTerm = slide.slide.title;
  logger.info(
    `Recherche et téléchargement PSE pour ${chapterKey}/${slideId} (titre: ${searchTerm})`
  );
  try {
    const url = await searchPSEImage(searchTerm);
    if (!url) {
      logger.warn(`Aucune image trouvée pour le titre: ${searchTerm}`);
      // Use placeholder
      const placeholderSrc = path.join("illustrations", "placeholder.png");
      const outputPath = path.join(imgDir, `${slideId}.png`);
      try {
        if (!fs.existsSync(placeholderSrc)) {
          logger.error(`Placeholder manquant: ${placeholderSrc}`);
          return;
        }
        fs.copyFileSync(placeholderSrc, outputPath);
        logger.info(`Placeholder utilisé: ${outputPath}`);
      } catch (err) {
        logger.error(`Erreur copie placeholder: ${err}`);
      }
      return;
    }
    const downloadedPath = await downloadImage(url, imgDir, slideId);
    logger.info(`Image téléchargée: ${downloadedPath}`);
  } catch (err) {
    logger.error(`Erreur PSE: ${err}`);
  }
}
