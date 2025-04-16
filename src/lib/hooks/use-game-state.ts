"use client";

import { useState, useEffect } from "react";
import { initialAchievements, initialUpgrades } from "../game-data";
import { GameState } from "../game-types";
import { loadGameState, saveGameState } from "../utils/storage-utils";

export function useGameState() {
  // Use default initial state for both server and client
  const [gameState, setGameState] = useState<GameState>({
    clicks: 0,
    score: 0,
    clickPower: 1,
    upgrades: initialUpgrades,
    achievements: initialAchievements,
  });

  // Load saved game state only on client-side
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setGameState(savedState);
    }
  }, []);

  // Auto-save game state
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  return { gameState, setGameState };
} 