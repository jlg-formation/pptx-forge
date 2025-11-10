import pptxgen from "pptxgenjs";
import { SlideData } from "../parser/yaml-parser.js";
import { buildSlide } from "./slide-builder.js";
import { CliOptions } from "../cli/args.js";
import { Logger, LogLevel } from "../cli/logger.js";
import { mkdirSync } from "fs";
import { dirname } from "path";

export async function generatePptx(
  slides: SlideData[],
  options: CliOptions,
  illustrationsDir: string
): Promise<void> {
  const pptx = new pptxgen();
  pptx.author = "JLG Consulting";
  pptx.title = "Presentation";

  for (const slideData of slides) {
    buildSlide(pptx, slideData, illustrationsDir);
  }

  try {
    mkdirSync(dirname(options.output), { recursive: true });
    await pptx.writeFile({ fileName: options.output });
    Logger.log(LogLevel.INFO, `PPTX generated: ${options.output}`);
  } catch (error) {
    Logger.log(LogLevel.ERROR, `Generation failed: ${error}`);
    throw error;
  }
}
