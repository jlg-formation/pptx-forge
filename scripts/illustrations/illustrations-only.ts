import path from "path";
import fs from "fs";
import readline from "readline";
import process from "process";
import { logger } from "../cli/logger";
import { SlideData } from "../parser/yaml-parser";
import { searchPSEImage } from "../utils/searchPSEImage";
import { downloadImage } from "../utils/downloadImage";
import { handleAIMethod } from "./handlers/ai-handler";
import { handlePSEMethod } from "./handlers/pse-handler";
import { handlePlaceholderMethod } from "./handlers/placeholder-handler";

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
