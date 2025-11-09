import { readdirSync, statSync } from "fs";
import { join } from "path";
import { parseYamlFile, SlideData } from "./yaml-parser.js";
import { sortSlides } from "../utils/sort.js";
import { validateYaml } from "../utils/validate.js";
import { Logger, LogLevel } from "../cli/logger.js";

export function loadSlides(dir: string): SlideData[] {
  const slides: SlideData[] = [];
  function scan(directory: string): void {
    const items = readdirSync(directory);
    for (const item of items) {
      const fullPath = join(directory, item);
      if (statSync(fullPath).isDirectory()) {
        scan(fullPath);
      } else if (item.endsWith(".yaml")) {
        const data = parseYamlFile(fullPath);
        if (data && validateYaml(data)) {
          slides.push(data);
        } else {
          Logger.log(LogLevel.WARN, `Invalid YAML: ${fullPath}`);
        }
      }
    }
  }
  scan(dir);
  return sortSlides(slides);
}
