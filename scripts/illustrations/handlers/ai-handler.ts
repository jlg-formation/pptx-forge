import path from "path";
import fs from "fs";
import { logger } from "../../cli/logger";
import { SlideData } from "../../parser/yaml-parser";

export async function handleAIMethod(
  slide: SlideData,
  imgDir: string
): Promise<void> {
  const chapterKey = slide.chapter.key;
  const slideId = slide.slide.id;
  const prompt = slide.slide.content.illustration_prompt || "";
  logger.info(
    `Génération IA pour ${chapterKey}/${slideId} (prompt: ${prompt})`
  );
  // Générer l'image via OpenAI et stocker
  const { generateImageFromPrompt } = await import(
    "../../utils/openai/extractPromptFromAI"
  );
  const outputPath = path.join(imgDir, `${slideId}.png`);
  try {
    await generateImageFromPrompt(prompt, outputPath);
    logger.info(`Image IA créée: ${outputPath}`);
  } catch (err) {
    logger.error(`Erreur génération IA: ${err}`);
  }
}
