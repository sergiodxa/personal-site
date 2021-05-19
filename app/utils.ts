import { camelize, underscore } from "inflected";
import { useEffect, useState } from "react";
import type { Request } from "remix";

/**
 * Wrap a value in a resolved Promise returning it
 */
export function resolved<Value>(value: Value): Promise<Value> {
  return Promise.resolve(value);
}

/**
 * Wrap a value in an array if it's not already an array
 */
export function toArray<Value = unknown>(value: Value | Value[]): Value[] {
  if (Array.isArray(value)) return value;
  return [value];
}

/**
 * Remove duplicated values from an array (only primitives and references)
 */
export function unique<Value>(array: Value[]): Value[] {
  return [...new Set(array)];
}

/**
 * Check the environment the app is currently running
 */
export function env(
  environment: "production" | "test" | "development"
): boolean {
  return process.env.NODE_ENV === environment;
}

/**
 * Check if an object has a property
 */
export function hasOwn<This extends Record<string, unknown>>(
  object: This,
  property: keyof This
): boolean {
  return Object.prototype.hasOwnProperty.call(object, property);
}

/**
 * A function that does nothing
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}

/**
 * Check if the current runtime of the code is server or browser
 */
export function runtime(name: "server" | "browser"): boolean {
  switch (name) {
    case "browser": {
      return typeof window === "object" && typeof document === "object";
    }
    case "server": {
      return typeof process !== "undefined" && Boolean(process.versions?.node);
    }
  }
}

let browser = false;

/**
 * Check if the component is currently on a Browser environment
 */
export function useIsBrowser() {
  const [isBrowser, setIsBrowser] = useState(browser);

  useEffect(() => {
    if (browser) return;
    browser = true;
    setIsBrowser(true);
  }, []);

  return isBrowser;
}

/**
 * Wait for a certain amount of time before doing something else
 */
export function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Get a random number from a range of two possible numbers
 */
export function random(
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if the user requested to not be tracked
 */
export function doNotTrack(request: Request) {
  const header = request.headers.get("DNT") ?? "null";
  return header === "1";
}

/**
 * Check if the user requested to receive less data
 */
export function saveData(request: Request) {
  const header = request.headers.get("Save-Data") ?? "off";
  return header === "on";
}

/**
 * Capitalize every word in a sentence
 */
export function capitalize(string: string): string {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Check if an array has any element inside
 */
export function hasAny<Value>(list: Value[]): boolean {
  return list.length > 0;
}

/**
 * Check if an array is empty
 */
export function isEmpty<Value>(list: Value[]): boolean {
  return list.length === 0;
}

/**
 * Serialize a value to a JSON string using snake_case for the keys
 */
export function serialize<Input>(input: Input): string {
  return JSON.stringify(input, (_: string, value: unknown) => {
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      let entries = Object.entries(value).map((entry) => [
        underscore(entry[0]),
        entry[1],
      ]);
      return Object.fromEntries(entries);
    }

    return value;
  });
}

/**
 * Parse an JSON string to a JS object with the keys in camelCase
 */
export function parse<Output>(input: string): Output {
  return JSON.parse(input, (_key, value: unknown) => {
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      let entries = Object.entries(value).map((entry) => [
        camelize(entry[0], false),
        entry[1],
      ]);
      return Object.fromEntries(entries);
    }
    return value;
  });
}

/**
 * Get the first n items of an array, defaults to one item
 */
export function first<Value>(list: Value[], limit = 1): Value[] {
  return list.slice(0, limit);
}
