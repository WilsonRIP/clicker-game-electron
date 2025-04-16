"use client";

import { useMemo } from "react";
import { GameState } from "../game-types";
import { calculateScorePerSecond } from "../utils/math-utils";
import { UPGRADE_IDS } from "../constants";

interface GameStats {
  scorePerSecond: number;
  totalUpgrades: number;
  totalAchievements: number;
  autoClickerCount: number;
  achievementPercentage: number;
}

export function useGameStats(gameState: GameState): GameStats {
  return useMemo(() => {
    const { upgrades, achievements } = gameState;
    
    // Calculate auto clicker count
    const autoClickerUpgrade = upgrades.find(u => u.id === UPGRADE_IDS.AUTO_CLICKER);
    const autoClickerCount = autoClickerUpgrade?.purchased || 0;
    
    // Calculate score per second
    const scorePerSecond = calculateScorePerSecond(autoClickerCount, gameState.clickPower);
    
    // Get total upgrades purchased
    const totalUpgrades = upgrades.reduce((sum, upgrade) => sum + upgrade.purchased, 0);
    
    // Get achievement stats
    const unlockedAchievements = achievements.filter(a => a.unlocked).length;
    const totalAchievements = achievements.length;
    const achievementPercentage = totalAchievements > 0 
      ? Math.round((unlockedAchievements / totalAchievements) * 100)
      : 0;
    
    return {
      scorePerSecond,
      totalUpgrades,
      totalAchievements: unlockedAchievements,
      autoClickerCount,
      achievementPercentage
    };
  }, [gameState]);
} 