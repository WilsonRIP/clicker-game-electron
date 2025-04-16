/**
 * Calculate exponential cost based on base cost, multiplier, and quantity
 */
export function calculateExponentialCost(
  baseCost: number,
  multiplier: number,
  quantity: number
): number {
  return Math.floor(baseCost * Math.pow(multiplier, quantity));
}

/**
 * Calculate linear cost based on base cost and quantity
 */
export function calculateLinearCost(
  baseCost: number,
  increment: number,
  quantity: number
): number {
  return Math.floor(baseCost + (increment * quantity));
}

/**
 * Calculate cumulative cost for a range of purchases
 */
export function calculateCumulativeCost(
  baseCost: number,
  multiplier: number,
  startQuantity: number,
  endQuantity: number
): number {
  let total = 0;
  for (let i = startQuantity; i < endQuantity; i++) {
    total += calculateExponentialCost(baseCost, multiplier, i);
  }
  return total;
}

/**
 * Calculate score per second based on auto clickers and click power
 */
export function calculateScorePerSecond(
  autoClickerCount: number,
  clickPower: number
): number {
  return autoClickerCount * clickPower;
} 