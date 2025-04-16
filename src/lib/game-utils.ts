import { GameState, Upgrade } from "./game-types";
import { toast } from "sonner";
import { calculateExponentialCost } from "./utils/math-utils";

/**
 * Calculate the cost of an upgrade based on its base cost, multiplier, and number of purchases
 */
export function calculateUpgradeCost(upgrade: Upgrade): number {
  return calculateExponentialCost(
    upgrade.baseCost,
    upgrade.multiplier,
    upgrade.purchased
  );
}

/**
 * Check if a player can afford an upgrade
 */
export function canAffordUpgrade(score: number, upgrade: Upgrade): boolean {
  const cost = calculateUpgradeCost(upgrade);
  return score >= cost;
}

/**
 * Check if an upgrade has reached its maximum number of purchases
 */
export function isMaxPurchasesReached(upgrade: Upgrade): boolean {
  return (
    upgrade.maxPurchases !== undefined &&
    upgrade.purchased >= upgrade.maxPurchases
  );
}

/**
 * Check if prerequisites are met for an upgrade
 */
export function arePrerequisitesMet(upgrade: Upgrade, upgrades: Upgrade[]): boolean {
  if (!upgrade.prerequisites) return true;
  
  return upgrade.prerequisites.every((prereqId) => {
    const prereqUpgrade = upgrades.find((u) => u.id === prereqId);
    return prereqUpgrade && prereqUpgrade.purchased > 0;
  });
}

/**
 * Format a number with commas for better readability
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
} 