// extraire le prompt depuis une IA generative (openai)
import { OpenAI } from "openai";

export async function extractPromptFromAI(
  fileContent: string
): Promise<string | null> {
  const openai = new OpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Voici le contenu du fichier markdown : ${fileContent}. Peux-tu extraire le prompt d'illustration ? Prompt illustration:`,
      },
    ],
  });

  const message = response.choices[0].message.content;
  return message || null;
}
