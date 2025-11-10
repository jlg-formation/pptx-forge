#!/usr/bin/env bun
import { readFileSync, mkdirSync, copyFileSync, cpSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to extract title from 00-plan-formation.md
function getFormationTitle(): string {
  const planPath = join(__dirname, "..", "00-plan-formation.md");
  const content = readFileSync(planPath, "utf-8");
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2).trim();
    }
  }
  throw new Error("Titre de la formation non trouvé dans 00-plan-formation.md");
}

// Function to slugify the title
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

async function main() {
  try {
    const title = getFormationTitle();
    const slug = slugify(title);
    const exportDir = join(__dirname, "..", "dist", slug);

    console.log(`Titre de la formation: ${title}`);
    console.log(`Répertoire d'export: ${exportDir}`);

    // Create export directory
    mkdirSync(exportDir, { recursive: true });

    // Copy presentation.pptx
    const pptxSrc = join(__dirname, "..", "dist", "presentation.pptx");
    const pptxDest = join(exportDir, "presentation.pptx");
    copyFileSync(pptxSrc, pptxDest);
    console.log("Copié presentation.pptx");

    // Copy slides directory
    const slidesSrc = join(__dirname, "..", "slides");
    const slidesDest = join(exportDir, "slides");
    cpSync(slidesSrc, slidesDest, { recursive: true });
    console.log("Copié répertoire slides");

    // Copy 00-plan-formation.md
    const planSrc = join(__dirname, "..", "00-plan-formation.md");
    const planDest = join(exportDir, "00-plan-formation.md");
    copyFileSync(planSrc, planDest);
    console.log("Copié 00-plan-formation.md");

    // Copy 01-slidemap.md
    const mapSrc = join(__dirname, "..", "01-slidemap.md");
    const mapDest = join(exportDir, "01-slidemap.md");
    copyFileSync(mapSrc, mapDest);
    console.log("Copié 01-slidemap.md");

    console.log(`Export terminé dans ${exportDir}`);
  } catch (error) {
    console.error("Erreur lors de l'export:", error);
    process.exit(1);
  }
}

main();
