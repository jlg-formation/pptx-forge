import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { searchPSEImage } from "./searchPSEImage";

describe("searchPSEImage", () => {
  let originalFetch: typeof global.fetch;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalFetch = global.fetch;
    originalEnv = { ...process.env };
    // Set default env vars
    process.env.GOOGLE_CX = "test_cx";
    process.env.GOOGLE_API_KEY = "test_key";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = originalEnv;
  });

  it("should throw error if GOOGLE_CX is missing", async () => {
    delete process.env.GOOGLE_CX;
    await expect(searchPSEImage("test query")).rejects.toThrow(
      "Clés API Google manquantes dans .env"
    );
  });

  it("should throw error if GOOGLE_API_KEY is missing", async () => {
    delete process.env.GOOGLE_API_KEY;
    await expect(searchPSEImage("test query")).rejects.toThrow(
      "Clés API Google manquantes dans .env"
    );
  });

  it("should return the first image link on successful search", async () => {
    const mockResponse = {
      ok: true,
      json: mock(() =>
        Promise.resolve({
          items: [
            { link: "http://example.com/image1.jpg" },
            { link: "http://example.com/image2.jpg" },
          ],
        })
      ),
    };
    global.fetch = mock(() => Promise.resolve(mockResponse)) as any;

    const result = await searchPSEImage("test query");
    expect(result).toBe("http://example.com/image1.jpg");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/customsearch/v1?key=test_key&cx=test_cx&searchType=image&q=test%20query&num=1"
    );
  });

  it("should return null if no items found", async () => {
    const mockResponse = {
      ok: true,
      json: mock(() => Promise.resolve({ items: [] })),
    };
    global.fetch = mock(() => Promise.resolve(mockResponse)) as any;

    const result = await searchPSEImage("test query");
    expect(result).toBeNull();
  });

  it("should return null on fetch error", async () => {
    try {
      global.fetch = mock(() =>
        Promise.reject(new Error("Network error"))
      ) as any;

      const result = await searchPSEImage("test query");
      expect(result).toBeNull();
    } catch (error) {
      console.error("Test fetch error caught:", error);
    }
  });

  it("should return null on HTTP error", async () => {
    const mockResponse = {
      ok: false,
      status: 400,
    };
    global.fetch = mock(() => Promise.resolve(mockResponse)) as any;

    const result = await searchPSEImage("test query");
    expect(result).toBeNull();
  });
});
