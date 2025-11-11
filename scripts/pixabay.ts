#!/usr/bin/env bun
import { mkdirSync } from "fs";
import { downloadImage } from "./utils/downloadImage";

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
if (!PIXABAY_API_KEY) {
  console.error("PIXABAY_API_KEY environment variable is required");
  process.exit(1);
}

const query = process.argv[2] || "nature"; // Default query
const count = 30;

async function main() {
  try {
    // Ensure pixabay directory exists
    mkdirSync("pixabay", { recursive: true });

    // Fetch images from Pixabay API
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&per_page=${count}`;
    console.log("Fetching images from Pixabay:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status}`);
    }
    const data = await response.json();
    const hits = data.hits || [];

    if (hits.length === 0) {
      console.log("No images found for query:", query);
      return;
    }

    console.log(`Downloading ${Math.min(hits.length, count)} images...`);

    for (let i = 0; i < Math.min(hits.length, count); i++) {
      const hit = hits[i];
      const imageUrl = hit.largeImageURL; // Use large image
      const baseName = String(i + 1).padStart(2, "0"); // 01, 02, etc.
      try {
        const downloadedPath = await downloadImage(
          imageUrl,
          "pixabay",
          baseName
        );
        console.log(`Downloaded: ${downloadedPath}`);
      } catch (error) {
        console.error(`Failed to download image ${i + 1}:`, error);
      }
    }

    console.log("Download completed.");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
