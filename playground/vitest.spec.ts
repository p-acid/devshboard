import { describe, expect, test } from "vitest";

const addOne = (num: number): number => num + 1;

describe("Add One", () => {
  test("Add One", () => {
    const num = 1;
    const expected = 2;
    const result = addOne(num);
    expect(result).toEqual(expected);
  });
});
