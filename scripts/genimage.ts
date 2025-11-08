import { mkdirSync, readFileSync } from "fs";
import {
  extractPromptFromAI,
  generateImageFromPrompt,
} from "./utils/openai/extractPromptFromAI";

export async function extractIllustrationPrompt(
  markdownFilePath: string,
  outputImagePath: string
): Promise<string | null> {
  // Lire le contenu du fichier markdown
  const fileContent = readFileSync(markdownFilePath, "utf-8");
  // extraire le prompt depuis une IA generative (openai)
  const prompt = await extractPromptFromAI(fileContent);
  mkdirSync("illustrations", { recursive: true });
  await generateImageFromPrompt(prompt, outputImagePath);
  return prompt;
}

// Exemple d'utilisation
(async () => {
  const prompt = await extractIllustrationPrompt(
    "slides/comprendre-l-ia-dans-le-design/03-les-bases-de-l-intelligence-artificielle.md",
    "illustrations/example.png"
  );
  console.log("Prompt extrait et image générée :", prompt);
})();
