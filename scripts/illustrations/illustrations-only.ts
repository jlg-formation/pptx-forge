import path from "path";
import fs from "fs";
import readline from "readline";
import process from "process";
import { logger } from "../cli/logger";
import { SlideData } from "../parser/yaml-parser";
import { searchPSEImage } from "../utils/searchPSEImage";
import { downloadImage } from "../utils/downloadImage";

function illustrationExists(slide: SlideData): boolean {
  const chapterKey = slide.chapter.key;
  const slideId = slide.slide.id;
  const exts = [".jpg", ".png", ".webp"];
  for (const ext of exts) {
    const imgPath = path.join("illustrations", chapterKey, `${slideId}${ext}`);
    if (fs.existsSync(imgPath)) return true;
  }
  return false;
}

async function handleAIMethod(slide: SlideData, imgDir: string): Promise<void> {
  const chapterKey = slide.chapter.key;
  const slideId = slide.slide.id;
  const prompt = slide.slide.content.illustration_prompt || "";
  logger.info(
    `Génération IA pour ${chapterKey}/${slideId} (prompt: ${prompt})`
  );
  // Générer l'image via OpenAI et stocker
  const { generateImageFromPrompt } = await import(
    "../utils/openai/extractPromptFromAI"
  );
  const outputPath = path.join(imgDir, `${slideId}.png`);
  try {
    await generateImageFromPrompt(prompt, outputPath);
    logger.info(`Image IA créée: ${outputPath}`);
  } catch (err) {
    logger.error(`Erreur génération IA: ${err}`);
  }
}

async function handlePSEMethod(
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
    if (url) {
      const downloadedPath = await downloadImage(url, imgDir, slideId);
      logger.info(`Image téléchargée: ${downloadedPath}`);
    } else {
      logger.warn(`Aucune image trouvée pour le titre: ${searchTerm}`);
      // Use placeholder
      const placeholderSrc = path.join("illustrations", "placeholder.png");
      const outputPath = path.join(imgDir, `${slideId}.png`);
      try {
        if (fs.existsSync(placeholderSrc)) {
          fs.copyFileSync(placeholderSrc, outputPath);
          logger.info(`Placeholder utilisé: ${outputPath}`);
        } else {
          logger.error(`Placeholder manquant: ${placeholderSrc}`);
        }
      } catch (err) {
        logger.error(`Erreur copie placeholder: ${err}`);
      }
    }
  } catch (err) {
    logger.error(`Erreur PSE: ${err}`);
  }
}

async function handlePlaceholderMethod(
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
    if (fs.existsSync(placeholderSrc)) {
      fs.copyFileSync(placeholderSrc, outputPath);
      logger.info(`Placeholder copié: ${outputPath}`);
    } else {
      logger.error(`Placeholder manquant: ${placeholderSrc}`);
    }
  } catch (err) {
    logger.error(`Erreur copie placeholder: ${err}`);
  }
}

export async function processIllustrationsOnly(
  slides: SlideData[],
  defaultMethod?: string
) {
  const isInteractive = !defaultMethod;
  const rl = isInteractive
    ? readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
    : null;
  for (const slide of slides) {
    if (illustrationExists(slide)) continue;
    logger.info(
      `Illustration manquante pour: ${slide.chapter.key}/${slide.slide.id}`
    );
    const prompt = slide.slide.content.illustration_prompt || "";
    let answer: string;
    if (isInteractive && rl) {
      const question = `Que faire pour ${slide.chapter.key}/${slide.slide.id} ?\n1) Générer par IA\n2) Télécharger via PSE\n3) Utiliser le placeholder\nVotre choix (1/2/3): `;
      answer = await new Promise<string>((resolve) =>
        rl.question(question, resolve)
      );
    } else {
      // Non-interactive, use default method
      if (defaultMethod === "pse") {
        answer = "2";
      } else {
        // Default to placeholder if unknown method
        answer = "3";
      }
    }
    const chapterKey = slide.chapter.key;
    const slideId = slide.slide.id;
    const imgDir = path.join("illustrations", chapterKey);
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
    if (answer === "1") {
      await handleAIMethod(slide, imgDir);
    } else if (answer === "2") {
      await handlePSEMethod(slide, imgDir);
    } else {
      await handlePlaceholderMethod(slide, imgDir);
    }
  }
  if (rl) rl.close();
  logger.info("Traitement illustrations terminé.");
}
