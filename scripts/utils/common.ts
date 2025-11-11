import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(fileURLToPath(import.meta.url), "..", "..");

// Function to extract title from 00-plan-formation.md
export function getFormationTitle(): string {
  const planPath = join(__dirname, "..", "00-plan-formation.md");
  const content = readFileSync(planPath, "utf-8");
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2).trim();
    }
  }
  throw new Error("Titre de la formation non trouvé dans 00-plan-formation.md");
}

// Function to slugify the title
export function slugify(title: string): string {
  return title
    .normalize("NFD") // Normalize to decompose diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}
