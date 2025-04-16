/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Format cost with a + symbol for positive values
 */
export function formatCost(value: number): string {
  return value >= 0 ? `+${formatNumber(value)}` : formatNumber(value);
}

/**
 * Format a value as currency
 */
export function formatCurrency(value: number): string {
  return `${formatNumber(value)} pts`;
} 