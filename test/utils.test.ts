import { Request } from "node-fetch";
import {
  capitalize,
  doNotTrack,
  first,
  hasAny,
  isEmpty,
  parse,
  saveData,
  serialize,
} from "../app/utils";

describe("Utils", () => {
  describe("serialize", () => {
    test("it should transform the properties to snake_case", () => {
      let input = [
        {
          myKey: "value",
          AnotherKey: 123,
          keep_it: { really: true, array: [1, "random", false] },
        },
      ];

      let expected = JSON.stringify([
        {
          my_key: "value",
          another_key: 123,
          keep_it: { really: true, array: [1, "random", false] },
        },
      ]);

      let output = serialize(input);

      expect(output).toBe(expected);
    });
  });

  describe("parse", () => {
    test("it should transform the properties to camelCase", () => {
      let input = JSON.stringify({
        my_key: "value",
        another_key: 123,
        keep_it: { really: true, array: [1, "random", false] },
      });

      let expected = {
        myKey: "value",
        anotherKey: 123,
        keepIt: { really: true, array: [1, "random", false] },
      };

      let output = parse<typeof expected>(input);

      expect(output).toEqual(expected);
    });
  });

  describe("first", () => {
    test("get an array with the first element of another array", () => {
      let input = [1, 2, 3];
      let expected = [1];
      let output = first(input);
      expect(output).toEqual(expected);
    });

    test("get an array with the first two elements of another array", () => {
      let input = [1, 2, 3];
      let expected = [1, 2];
      let output = first(input, 2);
      expect(output).toEqual(expected);
    });
  });

  describe("isEmpty", () => {
    test("get true if the array is empty", () => {
      let input: void[] = [];
      let expected = true;
      let output = isEmpty(input);
      expect(output).toBe(expected);
    });

    test("get false if the array is not empty", () => {
      let input = [1, 2, 3];
      let expected = false;
      let output = isEmpty(input);
      expect(output).toBe(expected);
    });
  });

  describe("hasAny", () => {
    test("get true if the array is not empty", () => {
      let input = [1, 2, 3];
      let expected = true;
      let output = hasAny(input);
      expect(output).toBe(expected);
    });

    test("get false if the array is empty", () => {
      let input: void[] = [];
      let expected = false;
      let output = hasAny(input);
      expect(output).toBe(expected);
    });
  });

  describe("capitalize", () => {
    test("it should capitalize a full sentence", () => {
      let input = "this is a sEnTeNcE using Some wEIRD capitalization";
      let expected = "This Is A Sentence Using Some Weird Capitalization";
      let output = capitalize(input);
      expect(output).toBe(expected);
    });
  });

  describe("HTTP Headers", () => {
    describe("Save-Data", () => {
      test("If the Save-Data headers is defined as `on` it should return true", () => {
        let input = new Request("/", { headers: { "Save-Data": "on" } });
        let expected = true;
        let output = saveData(input);
        expect(output).toBe(expected);
      });

      test("If the Save-Data headers is not defined it should return false", () => {
        let input = new Request("/");
        let expected = false;
        let output = saveData(input);
        expect(output).toBe(expected);
      });
    });

    describe("DNT", () => {
      test("If DNT is `1` it should return true", () => {
        let input = new Request("/", { headers: { DNT: "1" } });
        let expected = true;
        let output = doNotTrack(input);
        expect(output).toBe(expected);
      });

      test("If DNT is `0` it should return false", () => {
        let input = new Request("/", { headers: { DNT: "0" } });
        let expected = false;
        let output = doNotTrack(input);
        expect(output).toBe(expected);
      });

      test("If DNT is `null` it should return false", () => {
        let input = new Request("/", { headers: { DNT: "null" } });
        let expected = false;
        let output = doNotTrack(input);
        expect(output).toBe(expected);
      });

      test("If DNT is not defined it should return false", () => {
        let input = new Request("/");
        let expected = false;
        let output = doNotTrack(input);
        expect(output).toBe(expected);
      });
    });
  });
});
