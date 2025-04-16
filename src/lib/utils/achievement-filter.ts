import { Achievement } from "../game-types";

/**
 * Filter achievements by unlock status
 */
export function getUnlockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(achievement => achievement.unlocked);
}

/**
 * Filter achievements by locked status
 */
export function getLockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(achievement => !achievement.unlocked);
}

/**
 * Calculate achievement progress percentage
 */
export function calculateAchievementProgress(achievements: Achievement[]): number {
  const unlockedCount = getUnlockedAchievements(achievements).length;
  return Math.round((unlockedCount / achievements.length) * 100);
}

/**
 * Count unlocked achievements
 */
export function getUnlockedAchievementCount(achievements: Achievement[]): number {
  return getUnlockedAchievements(achievements).length;
} 