import PptxGenJS from "pptxgenjs";

type LayoutResult = "BLANK" | Record<string, unknown> | unknown[];

export function getLayout(type: string, order: number): LayoutResult {
  const lib = PptxGenJS as unknown as Record<string, any>;
  const candidate: unknown =
    lib?.Layouts?.[type] ??
    lib?.layouts?.[type] ??
    lib?.masterLayouts?.[type] ??
    lib?.LAYOUTS?.[type];

  if (!candidate) return "BLANK";

  const deepClone = <T>(obj: T, map = new WeakMap<object, any>()): T => {
    if (obj === null || typeof obj !== "object") return obj;
    const objKey = obj as unknown as object;
    if (map.has(objKey)) return map.get(objKey) as T;
    if (obj instanceof Date)
      return new Date((obj as unknown as Date).getTime()) as unknown as T;
    if (obj instanceof RegExp) {
      const r = obj as unknown as RegExp;
      return new RegExp(r.source, r.flags) as unknown as T;
    }

    const clone: any = Array.isArray(obj) ? [] : {};
    map.set(objKey, clone);

    const entries = Object.entries(obj as Record<string, any>);
    for (const [k, v] of entries) {
      clone[k] = deepClone(v, map);
    }

    return clone as T;
  };

  try {
    return deepClone(candidate) as LayoutResult;
  } catch {
    if (Array.isArray(candidate)) return candidate.slice();
    if (candidate && typeof candidate === "object")
      return { ...(candidate as Record<string, unknown>) };
    return "BLANK";
  }
}
