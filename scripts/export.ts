#!/usr/bin/env bun
import { readFileSync, mkdirSync, copyFileSync, cpSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { getFormationTitle, slugify } from "./utils/common";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
