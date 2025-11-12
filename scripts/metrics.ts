import { readdirSync, statSync, readFileSync } from "fs";
import { join, extname, relative } from "path";

function getTsFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && item !== "node_modules") {
      files.push(...getTsFiles(fullPath, baseDir));
    }
    if (extname(item) === ".ts") {
      files.push(relative(baseDir, fullPath));
    }
  }
  return files;
}

function countLines(file: string): number {
  const content = readFileSync(file, "utf-8");
  return content.split("\n").length;
}

function main() {
  const projectRoot = process.cwd();
  const tsFiles = getTsFiles(projectRoot);
  const results = tsFiles.map((file) => ({
    Path: file,
    Lines: countLines(join(projectRoot, file)),
  }));

  // Sort by lines descending
  results.sort((a, b) => b.Lines - a.Lines);

  // Find max path length
  const maxPathLength = Math.max(...results.map((r) => r.Path.length));

  // Print table
  const header = "Path".padEnd(maxPathLength) + "  Lines";
  console.log(header);
  console.log("-".repeat(maxPathLength) + "  -----");
  for (const result of results) {
    console.log(result.Path.padEnd(maxPathLength) + "  " + result.Lines);
  }
}

main();
