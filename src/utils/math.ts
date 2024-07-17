/**
 * Rounds a number down to a specified number of decimal places.
 * @param value The number to round down.
 * @param decimals The number of decimal places.
 * @returns The rounded down number as a string.
 */
export function floorWithFixedPrecision(value: number, decimals: number): string {
  if (decimals < 0) throw new Error("Decimal places must be non-negative");
  const sign = value < 0 ? -1 : 1;
  const factor = Math.pow(10, decimals);
  const flooredValue = (sign * Math.floor(Math.abs(value) * factor)) / factor;
  return flooredValue.toFixed(decimals);
}
