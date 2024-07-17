import { floorWithFixedPrecision } from "../../../utils/math";

describe("floorWithFixedPrecision", () => {
  test("rounds down to 2 decimal places", () => {
    expect(floorWithFixedPrecision(123.4567, 2)).toBe("123.45");
  });

  test("rounds down to 0 decimal places", () => {
    expect(floorWithFixedPrecision(123.4567, 0)).toBe("123");
  });

  test("rounds down to 3 decimal places", () => {
    expect(floorWithFixedPrecision(123.4567, 3)).toBe("123.456");
  });

  test("rounds down a whole number", () => {
    expect(floorWithFixedPrecision(123, 2)).toBe("123.00");
  });

  test("handles negative number", () => {
    expect(floorWithFixedPrecision(-123.4567, 2)).toBe("-123.45");
  });

  test("handles zero", () => {
    expect(floorWithFixedPrecision(0, 2)).toBe("0.00");
  });

  test("throws an error for negative decimal places", () => {
    expect(() => floorWithFixedPrecision(123.4567, -1)).toThrow("Decimal places must be non-negative");
  });

  test("handles edge case for large number", () => {
    expect(floorWithFixedPrecision(1e20 + 0.12345, 2)).toBe("100000000000000000000.00");
  });
});
