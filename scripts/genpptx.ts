// generate a PowerPoint presentation from the markdown content situe dans le repertoire `slides/`
import { generatePptxFromMarkdown } from "./utils/pptxGenerator";

async function main() {
  const inputDir = "slides/";
  const outputFile = "presentation.pptx";
  await generatePptxFromMarkdown(inputDir, outputFile);
}
main().catch((err) => {
  console.error("Error generating PPTX:", err);
});
