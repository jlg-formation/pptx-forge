/**
 * Recherche une image via Google Custom Search (PSE) et retourne l'URL de la première image trouvée.
 * @param {string} query - La requête de recherche d'image.
 * @returns {Promise<string|null>} - L'URL de l'image ou null si aucune trouvée.
 */
export async function searchPSEImage(query: string): Promise<string | null> {
  const GOOGLE_CX = process.env.GOOGLE_CX;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_CX || !GOOGLE_API_KEY) {
    throw new Error("Clés API Google manquantes dans .env");
  }
  const q = encodeURIComponent(query);
  console.log("q: ", q);
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image&q=${q}&num=1`;
  try {
    const res = await fetch(url);
    console.log("res: ", res);
    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      console.log("data.items[0].link: ", data.items[0].link);
      return data.items[0].link;
    }
    return null;
  } catch (err) {
    console.error(
      "Erreur recherche PSE:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
