import path from "path";
import process from "process";
import { parseArgs } from "./cli/args";
import { logger } from "./cli/logger";
import { generatePptx } from "./generator/pptx-generator";
// import { loadIllustration } from "./illustrations/image-loader";
import { parseYamlFiles } from "./parser/yaml-parser";

import { SlideData } from "./parser/yaml-parser";
import { processIllustrationsOnly } from "./illustrations/illustrations-only";

// CLI arguments
const args = parseArgs(process.argv.slice(2));
const slidesDir = path.resolve("slides");
const outputFile = args.output || "dist/presentation.pptx";
const theme = args.theme || "standard";

logger.info(`Scan slides in: ${slidesDir}`);

// 1. Parse YAML files
let slides: SlideData[] = [];
try {
  slides = parseYamlFiles(slidesDir);
  logger.info(`Slides loaded: ${slides.length}`);
} catch (err) {
  logger.error(`Erreur lors du parsing YAML: ${err}`);
  process.exit(1);
}

// Extraire le titre de la formation
const title = slides[0]?.slide.title || "Formation";

// Mode illustrations-only
if (args.illustrationsOnly) {
  logger.info(
    `Mode illustrations-only activé${
      args.illustrationsOnly !== "interactive"
        ? ` (${args.illustrationsOnly})`
        : ""
    }`
  );
  processIllustrationsOnly(
    slides,
    args.illustrationsOnly === "interactive"
      ? undefined
      : args.illustrationsOnly
  ).then(() => {
    process.exit(0);
  });
} else {
  // 2. Génération PPTX (mode normal)
  try {
    generatePptx(slides, { output: outputFile, theme, title });
    logger.info(`PPTX généré: ${outputFile}`);
  } catch (err) {
    logger.error(`Erreur lors de la génération PPTX: ${err}`);
    process.exit(2);
  }
}
