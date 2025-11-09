import { existsSync } from "fs";
import { SlideData } from "../parser/yaml-parser.js";

export function validateYaml(data: any): data is SlideData {
  return (
    data && typeof data.chapter === "object" && typeof data.slide === "object"
  );
}

export function validatePath(path: string): boolean {
  return existsSync(path);
}
