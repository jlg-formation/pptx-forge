import { readdirSync, statSync } from "fs";
import { join } from "path";
import { parseYamlFile, SlideData } from "./yaml-parser.js";
import { sortSlides } from "../utils/sort";
import { validateSlide } from "../utils/validate";
import { logger } from "../cli/logger";

export function loadSlides(dir: string): SlideData[] {
  const slides: SlideData[] = [];
  function scan(directory: string): void {
    const items = readdirSync(directory);
    for (const item of items) {
      const fullPath = join(directory, item);
      if (statSync(fullPath).isDirectory()) {
        scan(fullPath);
        continue;
      }
      if (item.endsWith(".yaml")) {
        const data = parseYamlFile(fullPath);
        if (!data || !validateSlide(data)) {
          logger.warn(`Invalid YAML: ${fullPath}`);
          continue;
        }
        slides.push(data);
      }
    }
  }
  scan(dir);
  return sortSlides(slides);
}
