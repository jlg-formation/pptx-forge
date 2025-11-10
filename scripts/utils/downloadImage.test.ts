import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { downloadImage } from "./downloadImage";
import { join } from "path";

describe("downloadImage", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should download image with jpg extension by default", async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ "content-type": "image/jpeg" }),
      arrayBuffer: mock(() => Promise.resolve(new ArrayBuffer(8))),
    };
    global.fetch = mock(() => Promise.resolve(mockResponse)) as any;

    const writeMock = mock(() => Promise.resolve(0));
    const originalWrite = Bun.write;
    Bun.write = writeMock;

    try {
      const result = await downloadImage(
        "http://example.com/image.jpg",
        "dist",
        "test-image"
      );
      expect(result).toBe(join("dist", "test-image.jpg"));
      expect(writeMock).toHaveBeenCalledWith(
        join("dist", "test-image.jpg"),
        expect.any(ArrayBuffer)
      );
    } finally {
      Bun.write = originalWrite;
    }
  });

  it("should download image with png extension", async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ "content-type": "image/png" }),
      arrayBuffer: mock(() => Promise.resolve(new ArrayBuffer(8))),
    };
    global.fetch = mock(() => Promise.resolve(mockResponse)) as any;

    const writeMock = mock(() => Promise.resolve(0));
    const originalWrite = Bun.write;
    Bun.write = writeMock;

    try {
      const result = await downloadImage(
        "http://example.com/image.png",
        "dist",
        "test-image"
      );
      expect(result).toBe(join("dist", "test-image.png"));
      expect(writeMock).toHaveBeenCalledWith(
        join("dist", "test-image.png"),
        expect.any(ArrayBuffer)
      );
    } finally {
      Bun.write = originalWrite;
    }
  });

  it("should throw error on fetch failure", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };
    global.fetch = mock(() => Promise.resolve(mockResponse)) as any;

    await expect(
      downloadImage("http://example.com/image.jpg", "dist", "test-image")
    ).rejects.toThrow("Failed to download image: 404");
  });
});
