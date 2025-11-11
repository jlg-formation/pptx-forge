import PptxGenJS from "pptxgenjs";

export function defineSlidemasters(
  pptx: PptxGenJS,
  themeSlidemasters: Record<string, any>
): void {
  for (const [type, def] of Object.entries(themeSlidemasters) as [
    string,
    (typeof themeSlidemasters)[string]
  ][]) {
    pptx.defineSlideMaster({
      title: def.layout,
      background: { color: def.background.color },
      objects: def.objects,
    });
  }
}
