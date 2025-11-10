import { searchPSEImage } from "../utils/searchPSEImage";
import { downloadImage } from "../utils/downloadImage";
import { mkdirSync } from "fs";
import { createInterface } from "readline";

async function main() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const query = await new Promise<string>((resolve) => {
    rl.question("Entrez la requête de recherche d'image: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  try {
    const imageUrl = await searchPSEImage(query);

    if (imageUrl) {
      console.log(`Image URL: ${imageUrl}`);

      // Ensure dist directory exists
      mkdirSync("dist", { recursive: true });

      // Download the image
      const filePath = await downloadImage(imageUrl, "dist", "searched-image");

      console.log(`Image downloaded to ${filePath}`);
    } else {
      console.log("No image found for the query.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
