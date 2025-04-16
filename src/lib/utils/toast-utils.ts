import { toast } from "sonner";

/**
 * Show a success toast for unlocking an achievement
 */
export function showAchievementToast(achievementName: string): void {
  toast.success(`Achievement Unlocked: ${achievementName}`);
}

/**
 * Show an error toast for upgrade purchase errors
 */
export function showUpgradeErrorToast(message: string): void {
  toast.error(message);
}

/**
 * Show an info toast for game actions
 */
export function showInfoToast(message: string): void {
  toast.info(message);
}

/**
 * Show a special toast for game milestones
 */
export function showMilestoneToast(message: string): void {
  toast(`🏆 Milestone reached! ${message}`, {
    style: {
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      borderColor: 'rgba(147, 51, 234, 0.2)',
      color: 'inherit'
    }
  });
} 