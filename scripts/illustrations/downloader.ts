import { writeFileSync } from "fs";
import { Buffer } from "buffer";

export async function downloadImage(
  url: string,
  outputPath: string
): Promise<void> {
  // Bun intègre fetch en global
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(outputPath, buffer);
}
