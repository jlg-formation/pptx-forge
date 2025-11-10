import pptxgen from "pptxgenjs";
import { mkdirSync } from "fs";
import { dirname } from "path";

// 1. Create a Presentation
const pres = new pptxgen();

// 2. Add a Slide to the presentation
let slide = pres.addSlide();

// 3. Add 1+ objects (Tables, Shapes, etc.) to the Slide
let textboxText = "Hello World from PptxGenJS!";
let textboxOpts = { x: 1, y: 1, color: "363636" };
slide.addText(textboxText, textboxOpts);

const outputFilePath = "dist/Hello-World.pptx";

// make sure the output directory exists
mkdirSync(dirname(outputFilePath), { recursive: true });

// 4. Save the Presentation
await pres.writeFile({ fileName: outputFilePath });
