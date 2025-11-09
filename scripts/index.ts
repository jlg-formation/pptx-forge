import { parseArgs } from "./cli/args.js";
import { loadSlides } from "./parser/slide-loader.js";
import { generatePptx } from "./generator/pptx-generator.js";
import { Logger, LogLevel } from "./cli/logger.js";

async function main(): Promise<void> {
  const options = parseArgs();
  const slidesDir = "slides";
  const illustrationsDir = "illustrations";

  Logger.log(LogLevel.INFO, "Loading slides...");
  const slides = loadSlides(slidesDir);
  if (slides.length === 0) {
    Logger.log(LogLevel.ERROR, "No valid slides found");
    process.exit(1);
  }

  Logger.log(LogLevel.INFO, "Generating PPTX...");
  await generatePptx(slides, options, illustrationsDir);
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
