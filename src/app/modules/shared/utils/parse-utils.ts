export function parseNumber(value: number | string): number | null {
  if (!value) return null;

  if (typeof value == 'string')
    return parseFloat(value.replace(',', '.'));

  return value;
}
