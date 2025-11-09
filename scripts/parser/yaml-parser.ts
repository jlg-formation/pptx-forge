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
    const data = load(content) as any;
    if (!data) return null;
    return data as SlideData;
  } catch {
    return null;
  }
}
