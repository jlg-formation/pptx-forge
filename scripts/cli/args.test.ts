import { parseArgs } from "./args";
import { describe, test, expect } from "bun:test";

describe("parseArgs", () => {
  test("parse --key=value syntax", () => {
    expect(parseArgs(["--output=foo.pptx", "--theme=dark"])).toEqual({
      output: "foo.pptx",
      theme: "dark",
    });
  });

  test("parse --key value syntax", () => {
    expect(parseArgs(["--output", "foo.pptx", "--theme", "dark"])).toEqual({
      output: "foo.pptx",
      theme: "dark",
    });
  });

  test("parse mixed syntax", () => {
    expect(parseArgs(["--output=foo.pptx", "--theme", "dark"])).toEqual({
      output: "foo.pptx",
      theme: "dark",
    });
  });

  test("ignore missing value", () => {
    expect(parseArgs(["--output"])).toEqual({});
  });
});
