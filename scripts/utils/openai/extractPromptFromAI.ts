// extraire le prompt depuis une IA generative (openai)
import { writeFileSync } from "fs";
import { OpenAI } from "openai";

export async function extractPromptFromAI(
  fileContent: string
): Promise<string> {
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
  return message || "";
}

// a partir d'un prompt genere une image avec l'API openai et telecharge l'image dans le path specifie en parametre
export async function generateImageFromPrompt(
  prompt: string,
  outputPath: string
): Promise<void> {
  const openai = new OpenAI();

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    tools: [{ type: "image_generation" }],
  });

  // Save the image to a file
  const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

  if (imageData.length > 0) {
    const imageBase64 = imageData[0] as string;
    writeFileSync(outputPath, Buffer.from(imageBase64, "base64"));
  }
}
