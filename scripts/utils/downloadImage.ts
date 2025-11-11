import { join } from "path";

/**
 * Télécharge une image depuis une URL et l'enregistre dans le répertoire de destination avec un nom de fichier de base.
 * Détermine l'extension basée sur le type de contenu.
 * @param url - L'URL de l'image à télécharger.
 * @param destDir - Le répertoire de destination.
 * @param baseFileName - Le nom de base du fichier (sans extension).
 * @returns Le chemin complet du fichier téléchargé.
 */
export async function downloadImage(
  url: string,
  destDir: string,
  baseFileName: string
): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();

  // Déterminer l'extension basée sur le content-type
  const contentType = response.headers.get("content-type");
  let extension = "jpg";
  if (contentType) {
    if (contentType.includes("png")) extension = "png";
    if (contentType.includes("gif")) extension = "gif";
    if (contentType.includes("webp")) extension = "webp";
  }

  const fullPath = join(destDir, `${baseFileName}.${extension}`);
  await Bun.write(fullPath, buffer);

  return fullPath;
}
