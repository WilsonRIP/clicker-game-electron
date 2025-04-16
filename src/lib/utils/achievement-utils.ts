import { Achievement } from "../game-types";

/**
 * Get the background style for an achievement based on its status
 */
export function getAchievementBackground(achievement: Achievement): string {
  return achievement.unlocked
    ? "bg-gradient-to-r from-primary/10 to-primary/20 border-primary/40"
    : "opacity-80 bg-muted/10 hover:bg-muted/20 border-muted/30";
}

/**
 * Get the icon container style for an achievement based on its status
 */
export function getIconContainerStyle(achievement: Achievement): string {
  return achievement.unlocked
    ? "bg-primary/20 text-primary border border-primary/30"
    : "bg-muted/30 text-muted-foreground border border-muted/40";
}

/**
 * Format achievement requirement for display
 */
export function formatAchievementRequirement(achievement: Achievement): string {
  const { type, value } = achievement.requirement;
  
  switch (type) {
    case "clicks":
      return `Reach ${value.toLocaleString()} clicks`;
    case "score":
      return `Reach ${value.toLocaleString()} points`;
    case "upgrades":
      return `Purchase ${value} upgrade${value > 1 ? "s" : ""}`;
    default:
      return "";
  }
} 