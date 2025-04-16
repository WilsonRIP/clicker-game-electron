"use client";

import React from "react";
import { GameState } from "../game-types";
import { initialAchievements, initialUpgrades } from "../game-data";
import { arePrerequisitesMet, calculateUpgradeCost, isMaxPurchasesReached } from "../game-utils";
import { clearGameState } from "../utils/storage-utils";
import { UPGRADE_IDS } from "../constants";
import { showInfoToast, showUpgradeErrorToast } from "../utils/toast-utils";

export function useGameActions(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const handleClick = (multiplier = 1) => {
    setGameState((prev) => {
      const newClicks = prev.clicks + multiplier;
      const newScore = prev.score + (prev.clickPower * multiplier);
      
      // Check for unlocking upgrades
      const updatedUpgrades = prev.upgrades.map((upgrade) => {
        if (!upgrade.unlocked && upgrade.prerequisites) {
          if (arePrerequisitesMet(upgrade, prev.upgrades)) {
            return { ...upgrade, unlocked: true };
          }
        }
        return upgrade;
      });
      
      return {
        ...prev,
        clicks: newClicks,
        score: newScore,
        upgrades: updatedUpgrades,
      };
    });
  };

  const purchaseUpgrade = (upgradeId: string) => {
    setGameState((prev) => {
      const upgradeIndex = prev.upgrades.findIndex((u) => u.id === upgradeId);
      
      if (upgradeIndex === -1) return prev;
      
      const upgrade = prev.upgrades[upgradeIndex];
      
      // Check if max purchases reached
      if (isMaxPurchasesReached(upgrade)) {
        showUpgradeErrorToast("Maximum purchases reached for this upgrade");
        return prev;
      }
      
      // Calculate cost
      const cost = calculateUpgradeCost(upgrade);
      
      // Check if player can afford
      if (prev.score < cost) {
        showUpgradeErrorToast("Not enough points to purchase this upgrade");
        return prev;
      }
      
      // Update upgrade and player stats
      const updatedUpgrades = [...prev.upgrades];
      updatedUpgrades[upgradeIndex] = {
        ...upgrade,
        purchased: upgrade.purchased + 1,
      };
      
      let newClickPower = prev.clickPower;
      
      // Handle special case for Double Click upgrade
      if (upgradeId === UPGRADE_IDS.DOUBLE_CLICK) {
        newClickPower = prev.clickPower * 2;
      } else {
        newClickPower += upgrade.clickIncrement;
      }
      
      return {
        ...prev,
        score: prev.score - cost,
        clickPower: newClickPower,
        upgrades: updatedUpgrades,
      };
    });
  };

  const resetGame = () => {
    // Clear saved game from local storage
    clearGameState();
    
    // Reset state to initial values
    setGameState({
      clicks: 0,
      score: 0,
      clickPower: 1,
      upgrades: initialUpgrades,
      achievements: initialAchievements,
    });
    showInfoToast("Game reset");
  };

  return {
    handleClick,
    purchaseUpgrade,
    resetGame
  };
} 