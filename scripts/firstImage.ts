// file: firstImage.ts
// Run: bun run firstImage.ts "chatgpt logo minimal"
import { argv, env } from "process";

const API_KEY = env.GOOGLE_API_KEY!;
const CX = env.GOOGLE_CX!;
const query = argv.slice(2).join(" ");
if (!API_KEY || !CX)
  throw new Error("Set GOOGLE_API_KEY and GOOGLE_CX env vars.");
if (!query) throw new Error('Usage: bun run firstImage.ts "your prompt"');

async function firstImageUrl(prompt: string) {
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("cx", CX);
  url.searchParams.set("q", prompt);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("num", "1"); // 1 résultat suffit
  url.searchParams.set("safe", "off"); // ou "active" selon ton besoin
  // Exemples de filtres utiles :
  // url.searchParams.set("imgSize", "large");  // icon|small|medium|large|xlarge|xxlarge|huge
  // url.searchParams.set("imgType", "photo");  // clipart|face|lineart|news|photo|animated
  // url.searchParams.set("rights","cc_publicdomain|cc_attribute");

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const first = data.items?.[0];
  if (!first?.link) throw new Error("No image result found.");
  return first.link as string; // URL directe de l’image
}

firstImageUrl(query)
  .then((u) => {
    console.log(u); // "clac" — tu récupères l’URL directe ici
  })
  .catch((e) => {
    console.error("Error:", e.message);
    process.exit(1);
  });
