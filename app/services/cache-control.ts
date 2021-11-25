type CacheStrategy = "prevent" | "swr" | "forever" | "require revalidation";

type Cacheability = "public" | "private" | "no-cache" | "no-store";

let SECOND_PER_YEAR = 3.154e7;

export class CacheControl {
  public cacheability: Cacheability = "public";

  public maxAge?: number;
  public sMaxAge?: number;
  public maxStale?: number;
  public minFresh?: number;
  public staleWhileRevalidate?: number;
  public staleIfError?: number;
  public mustRevalidate?: boolean;
  public proxyRevalidate?: boolean;
  public immutable?: boolean;
  public noTransform?: boolean;
  public onlyIfCached?: boolean;

  constructor(readonly strategy?: CacheStrategy) {
    if (strategy === "prevent") {
      this.cacheability = "no-cache";
      this.maxAge = 0;
    }
    if (strategy === "swr") {
      this.maxAge = 60;
      this.sMaxAge = 60;
      this.staleWhileRevalidate = SECOND_PER_YEAR;
    }
    if (strategy === "forever") {
      this.cacheability = "public";
      this.maxAge = SECOND_PER_YEAR;
      this.immutable = true;
    }
    if (strategy === "require revalidation") {
      this.maxAge = 0;
      this.mustRevalidate = true;
    }
  }

  toString() {
    let result = [];

    if (this.cacheability) result.push(this.cacheability);

    if (this.maxAge !== undefined) result.push(`max-age=${this.maxAge}`);
    if (this.sMaxAge !== undefined) result.push(`s-maxage=${this.sMaxAge}`);
    if (this.maxStale !== undefined) result.push(`max-stale=${this.maxStale}`);
    if (this.minFresh !== undefined) result.push(`min-fresh=${this.minFresh}`);
    if (this.staleWhileRevalidate !== undefined) {
      result.push(`stale-while-revalidate=${this.staleWhileRevalidate}`);
    }
    if (this.staleIfError !== undefined) {
      result.push(`stale-if-error=${this.staleIfError}`);
    }

    if (this.mustRevalidate) result.push("must-revalidate");
    if (this.proxyRevalidate) result.push("proxy-revalidate");
    if (this.immutable) result.push("immutable");
    if (this.noTransform) result.push("no-transform");
    if (this.onlyIfCached) result.push("only-if-cached");

    return result.join(", ");
  }

  toJSON() {
    return this.toString();
  }
}
