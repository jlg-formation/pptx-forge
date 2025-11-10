import { parseYamlFiles } from "./parser/yaml-parser";
import { generatePptx } from "./generator/pptx-generator";
import { loadIllustration } from "./illustrations/image-loader";
import { logger } from "./cli/logger";
import { parseArgs } from "./cli/args";
import path from "path";
import fs from "fs";

// CLI arguments
const args = parseArgs(process.argv.slice(2));
const slidesDir = path.resolve("slides");
const outputFile = args.output || "dist/presentation.pptx";
const theme = args.theme || "standard";

logger.info(`Scan slides in: ${slidesDir}`);

// 1. Parse YAML files
let slides: any[] = [];
try {
  slides = parseYamlFiles(slidesDir);
  logger.info(`Slides loaded: ${slides.length}`);
} catch (err) {
  logger.error(`Erreur lors du parsing YAML: ${err}`);
  process.exit(1);
}

// 2. Génération PPTX
try {
  generatePptx(slides, { output: outputFile, theme, loadIllustration });
  logger.info(`PPTX généré: ${outputFile}`);
} catch (err) {
  logger.error(`Erreur lors de la génération PPTX: ${err}`);
  process.exit(2);
}
