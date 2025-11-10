import PptxGenJS from "pptxgenjs";
import { getImageSize } from "../utils/getImageSize";

let pptx = new PptxGenJS();
const imgPath = "images/jlg-consulting.png";
const { width: imgWidth, height: imgHeight } = getImageSize(imgPath);
// Choix arbitraire d'une largeur en pouces, ici 1.67 comme avant
const w = 1.67;
const h = (imgHeight / imgWidth) * w;
pptx.layout = "LAYOUT_WIDE";

pptx.defineSlideMaster({
  title: "MASTER_SLIDE",
  background: { color: "FFFFFF" },
  objects: [
    { line: { x: 3.5, y: 1.0, w: 6.0, line: { color: "0088CC", width: 5 } } },
    { rect: { x: 0.0, y: 5.3, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
    {
      text: {
        text: "Status Report",
        options: { x: 3.0, y: 5.3, w: 5.5, h: 0.75 },
      },
    },
    {
      image: {
        x: 11.3,
        y: 6.4,
        w,
        h,
        path: imgPath,
      },
    },
  ],
  slideNumber: { x: 0.3, y: "90%" },
});

let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
slide.addText("How To Create PowerPoint Presentations with JavaScript", {
  x: 0.5,
  y: 0.7,
  fontSize: 18,
});

pptx.writeFile({ fileName: "dist/Status-Report.pptx" });
