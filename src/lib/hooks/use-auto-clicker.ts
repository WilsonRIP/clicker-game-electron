"use client";

import { useEffect } from "react";
import { GameState } from "../game-types";
import { AUTO_CLICKER_INTERVAL, UPGRADE_IDS } from "../constants";

export function useAutoClicker(
  gameState: GameState,
  handleClick: (multiplier: number) => void
) {
  // Handle auto clickers
  useEffect(() => {
    const autoClickerUpgrade = gameState.upgrades.find(
      (u) => u.id === UPGRADE_IDS.AUTO_CLICKER
    );
    
    if (autoClickerUpgrade && autoClickerUpgrade.purchased > 0) {
      const interval = setInterval(() => {
        handleClick(autoClickerUpgrade.purchased);
      }, AUTO_CLICKER_INTERVAL);
      
      return () => clearInterval(interval);
    }
  }, [gameState.upgrades, handleClick]);
} 