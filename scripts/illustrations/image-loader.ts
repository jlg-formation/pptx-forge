import * as fs from "fs";
import * as path from "path";

// Loads an illustration from the file system
export function loadIllustration(imagePath: string): Buffer | null {
  try {
    if (fs.existsSync(imagePath)) {
      return fs.readFileSync(imagePath);
    }
    return null;
  } catch (error) {
    console.warn(`Failed to load image ${imagePath}: ${error}`);
    return null;
  }
}
