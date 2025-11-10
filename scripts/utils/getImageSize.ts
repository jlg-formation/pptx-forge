import sizeOf from "image-size";

/**
 * Retourne la largeur et la hauteur d'une image locale
 * @param path Chemin vers l'image
 * @returns { width, height }
 */
export function getImageSize(path: string): { width: number; height: number } {
  try {
    const dimensions = sizeOf(path);
    return { width: dimensions.width ?? 0, height: dimensions.height ?? 0 };
  } catch (err) {
    // Erreur de lecture ou format non supporté
    return { width: 0, height: 0 };
  }
}
