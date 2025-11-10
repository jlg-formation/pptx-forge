import * as path from "path";
import * as fs from "fs";
// Scan un dossier et parse tous les fichiers YAML
export function parseYamlFiles(dir: string): SlideData[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const slides: SlideData[] = [];
  for (const file of files) {
    if (file.isFile() && file.name.endsWith(".yaml")) {
      const slide = parseYamlFile(path.join(dir, file.name));
      if (slide) slides.push(slide);
    }
    if (file.isDirectory()) {
      const subSlides = parseYamlFiles(path.join(dir, file.name));
      slides.push(...subSlides);
    }
  }
  return slides;
}
import { load } from "js-yaml";
import { readFileSync } from "fs";

export interface SlideData {
  chapter: {
    number: number;
    key: string;
    title: string;
  };
  slide: {
    id: string;
    type: "cover" | "toc" | "content" | "conclusion";
    title: string;
    meta: { order: number };
    content: {
      bullets?: string[];
      key_message?: string;
      illustration_prompt?: string;
      speaker_notes?: string;
      items?: string[];
    };
  };
}

export function parseYamlFile(filePath: string): SlideData | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    const data = load(content) as Record<string, unknown>;
    if (!data) return null;
    return data as unknown as SlideData;
  } catch {
    return null;
  }
}
