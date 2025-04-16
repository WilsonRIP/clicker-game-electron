"use client";

import React, { useEffect } from "react";
import { GameState } from "../game-types";
import { showAchievementToast } from "../utils/toast-utils";

export function useAchievements(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  // Check for achievements
  useEffect(() => {
    checkAchievements();
  }, [gameState.clicks, gameState.score, gameState.upgrades]);

  const checkAchievements = () => {
    setGameState((prev) => {
      let achievementsChanged = false;
      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.unlocked) return achievement;
        
        let unlocked = false;
        const { type, value, upgradeId } = achievement.requirement;
        
        if (type === "clicks" && prev.clicks >= value) {
          unlocked = true;
        } else if (type === "score" && prev.score >= value) {
          unlocked = true;
        } else if (type === "upgrades" && upgradeId) {
          const upgrade = prev.upgrades.find((u) => u.id === upgradeId);
          if (upgrade && upgrade.purchased >= value) {
            unlocked = true;
          }
        }
        
        if (unlocked && !achievement.unlocked) {
          achievementsChanged = true;
          showAchievementToast(achievement.name);
          return { ...achievement, unlocked: true };
        }
        
        return achievement;
      });
      
      if (achievementsChanged) {
        return { ...prev, achievements: updatedAchievements };
      }
      
      return prev;
    });
  };

  return { checkAchievements };
} 