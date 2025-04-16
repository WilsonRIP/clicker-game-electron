"use client";

import React, { createContext, useContext } from "react";
import { GameState } from "../lib/game-types";
import { useGameState } from "../lib/hooks/use-game-state";
import { useGameActions } from "../lib/hooks/use-game-actions";
import { useAutoClicker } from "../lib/hooks/use-auto-clicker";
import { useAchievements } from "../lib/hooks/use-achievements";

interface GameContextProps {
  gameState: GameState;
  handleClick: () => void;
  purchaseUpgrade: (upgradeId: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  // State management
  const { gameState, setGameState } = useGameState();
  
  // Game actions
  const { handleClick, purchaseUpgrade, resetGame } = useGameActions(
    gameState,
    setGameState
  );
  
  // Auto-clicker
  useAutoClicker(gameState, handleClick);
  
  // Achievements
  useAchievements(gameState, setGameState);

  return (
    <GameContext.Provider
      value={{ gameState, handleClick, purchaseUpgrade, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
} 