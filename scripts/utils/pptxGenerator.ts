// generatePptxFromMarkdown
import { readdirSync, readFileSync } from "fs";
import marked from "marked";
import path from "path";
import { PptxGenJS } from "pptxgenjs";

export async function generatePptxFromMarkdown(
  inputDir: string,
  outputFile: string
) {
  const pptx = new PptxGenJS();
  const files = readdirSync(inputDir).filter((file) => file.endsWith(".md"));
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const markdownContent = readFileSync(filePath, "utf-8");
    const slidesContent = markdownContent.split("\n---\n");
    for (const slide of slidesContent) {
      const slideHtml = marked(slide);
      pptx.addSlide().addText(slideHtml, { x: 1, y: 1, w: "80%", h: "80%" });
    }
  }
  await pptx.writeFile(outputFile);
}
