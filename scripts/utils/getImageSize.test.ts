import { getImageSize } from "../utils/getImageSize";
import { expect, test } from "bun:test";

// Remplacez ce chemin par une image existante dans votre projet
const imagePath = "images/jlg-consulting.png";

test("getImageSize retourne width et height corrects", () => {
  const { width, height } = getImageSize(imagePath);
  expect(typeof width).toBe("number");
  expect(typeof height).toBe("number");
  expect(width).toBeGreaterThan(0);
  expect(height).toBeGreaterThan(0);
});
