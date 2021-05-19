import { CacheControl } from "../app/cache-control";

describe("Cache Control", () => {
  describe("strategies", () => {
    test("No strategy", () => {
      let cacheControl = new CacheControl();
      expect(cacheControl.toString()).toBe("public");
    });

    test("Prevent any kind of cache", () => {
      let cacheControl = new CacheControl("prevent");
      expect(cacheControl.toString()).toBe("no-cache, max-age=0");
    });

    test("Cache forever", () => {
      let cacheControl = new CacheControl("forever");
      expect(cacheControl.toString()).toBe(
        "public, max-age=31540000000, immutable"
      );
    });

    test("Cache with SWR pattern", () => {
      let cacheControl = new CacheControl("swr");
      expect(cacheControl.toString()).toBe(
        "public, max-age=1, stale-while-revalidate=31540000000"
      );
    });

    test("Require revalidation", () => {
      let cacheControl = new CacheControl("require revalidation");
      expect(cacheControl.toString()).toBe(
        "public, max-age=0, must-revalidate"
      );
    });
  });

  test("When serialized return string", () => {
    let cacheControl = new CacheControl("prevent");
    expect(JSON.stringify({ "Cache-Control": cacheControl })).toBe(
      JSON.stringify({ "Cache-Control": "no-cache, max-age=0" })
    );
  });
});
