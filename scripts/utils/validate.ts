// Validation des données YAML et chemins
import { SlideData } from "../parser/yaml-parser";

export function validateSlide(slide: SlideData): boolean {
  if (!slide.chapter || typeof slide.chapter.number !== "number") return false;
  if (!slide.slide || typeof slide.slide.id !== "string") return false;
  if (!slide.slide.type) return false;
  if (!slide.slide.title) return false;
  return true;
}

export function validatePath(path: string): boolean {
  // Simple validation: path must be non-empty string
  return typeof path === "string" && path.length > 0;
}
