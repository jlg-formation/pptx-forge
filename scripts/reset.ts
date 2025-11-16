#!/usr/bin/env bun
import { existsSync, unlinkSync, rmSync } from "fs";

const filesToDelete = ["00-plan-formation.md", "01-slidemap.md"];

const dirsToDelete = [
  "dist",
  "illustrations",
  "pixabay",
  "slides", // Assuming slides are generated as per README
];

function deleteFile(filePath: string): void {
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    } else {
      console.log(`File not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
}

function deleteDir(dirPath: string): void {
  try {
    if (existsSync(dirPath)) {
      rmSync(dirPath, { recursive: true, force: true });
      console.log(`Deleted directory: ${dirPath}`);
    } else {
      console.log(`Directory not found: ${dirPath}`);
    }
  } catch (error) {
    console.error(`Error deleting directory ${dirPath}:`, error);
  }
}

function main(): void {
  console.log("Starting reset: deleting generated files and directories...");

  // Delete individual files
  for (const file of filesToDelete) {
    deleteFile(file);
  }

  // Delete directories
  for (const dir of dirsToDelete) {
    deleteDir(dir);
  }

  console.log("Reset completed.");
}

main();
