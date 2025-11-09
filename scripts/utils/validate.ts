import { existsSync } from "fs";
import { SlideData } from "../parser/yaml-parser.js";

export function validateYaml(data: any): data is SlideData {
  return (
    data &&
    typeof data.chapter === "object" &&
    typeof data.chapter.number === "number" &&
    typeof data.chapter.key === "string" &&
    typeof data.chapter.title === "string" &&
    typeof data.slide === "object" &&
    typeof data.slide.id === "string" &&
    typeof data.slide.type === "string" &&
    ["cover", "toc", "content", "conclusion"].includes(data.slide.type) &&
    typeof data.slide.title === "string" &&
    typeof data.slide.meta === "object" &&
    typeof data.slide.meta.order === "number" &&
    typeof data.slide.content === "object" &&
    (data.slide.content.bullets === undefined ||
      Array.isArray(data.slide.content.bullets)) &&
    (data.slide.content.key_message === undefined ||
      typeof data.slide.content.key_message === "string") &&
    (data.slide.content.illustration_prompt === undefined ||
      typeof data.slide.content.illustration_prompt === "string") &&
    (data.slide.content.speaker_notes === undefined ||
      typeof data.slide.content.speaker_notes === "string") &&
    (data.slide.content.items === undefined ||
      Array.isArray(data.slide.content.items))
  );
}

export function validatePath(path: string): boolean {
  return existsSync(path);
}
