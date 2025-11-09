import PptxGenJS from "pptxgenjs";

export function getLayout(type: string, order: number): string {
  switch (type) {
    case "cover":
      return "TITLE";
    case "toc":
      return "TITLE_AND_CONTENT";
    case "content":
    case "conclusion":
      return ["CONTENT", "TWO_CONTENT", "COMPARISON"][order % 3];
    default:
      return "CONTENT";
  }
}
