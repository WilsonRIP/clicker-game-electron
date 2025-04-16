"use client";

import { GameState } from "../game-types";
import { STORAGE_KEY } from "../constants";

/**
 * Save game state to local storage
 */
export function saveGameState(gameState: GameState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }
}

/**
 * Load game state from local storage
 */
export function loadGameState(): GameState | null {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
        console.error("Error parsing saved game state:", error);
      }
    }
  }
  return null;
}

/**
 * Clear saved game state from local storage
 */
export function clearGameState(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
} 