import fs from "fs";
import { extractPromptFromAI } from "./utils/extractPromptFromAI";

export async function extractIllustrationPrompt(
  markdownFilePath: string
): Promise<string | null> {
  // Lire le contenu du fichier markdown
  const fileContent = fs.readFileSync(markdownFilePath, "utf-8");
  // extraire le prompt depuis une IA generative (openai)
  const prompt = await extractPromptFromAI(fileContent);

  return prompt;
}
