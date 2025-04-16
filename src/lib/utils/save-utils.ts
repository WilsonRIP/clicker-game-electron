"use client";

import { GameState } from "../game-types";
import { initialAchievements, initialUpgrades } from "../game-data";
import { saveGameState, loadGameState, clearGameState } from "./storage-utils";
import { showInfoToast } from "./toast-utils";

/**
 * Generate a new game state
 */
export function createNewGame(): GameState {
  return {
    clicks: 0,
    score: 0,
    clickPower: 1,
    upgrades: initialUpgrades,
    achievements: initialAchievements,
  };
}

/**
 * Save the current game with a backup
 */
export function saveGameWithBackup(gameState: GameState): void {
  try {
    // Create backup in different key
    if (typeof window !== "undefined") {
      const timestamp = new Date().toISOString();
      const backupKey = `clickerGameBackup_${timestamp}`;
      localStorage.setItem(backupKey, JSON.stringify(gameState));
      
      // Limit to 3 backups
      cleanupOldBackups();
    }
    
    // Save main game
    saveGameState(gameState);
  } catch (error) {
    console.error("Error saving game with backup:", error);
  }
}

/**
 * Clean up old backups, keeping only the most recent 3
 */
function cleanupOldBackups(): void {
  if (typeof window !== "undefined") {
    const backupKeys = [];
    
    // Find all backup keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('clickerGameBackup_')) {
        backupKeys.push(key);
      }
    }
    
    // Sort by timestamp (newest first)
    backupKeys.sort().reverse();
    
    // Remove old backups
    if (backupKeys.length > 3) {
      const keysToRemove = backupKeys.slice(3);
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }
}

/**
 * Export game as JSON string
 */
export function exportGame(gameState: GameState): string {
  return JSON.stringify(gameState);
}

/**
 * Import game from JSON string
 */
export function importGame(jsonString: string): GameState | null {
  try {
    const parsedGame: GameState = JSON.parse(jsonString);
    
    // Validate that it's a proper game state
    if (
      typeof parsedGame.clicks !== 'number' || 
      typeof parsedGame.score !== 'number' ||
      !Array.isArray(parsedGame.upgrades) ||
      !Array.isArray(parsedGame.achievements)
    ) {
      showInfoToast("Invalid game data format");
      return null;
    }
    
    // Save and return the imported game
    saveGameState(parsedGame);
    showInfoToast("Game imported successfully");
    return parsedGame;
  } catch (error) {
    console.error("Error importing game:", error);
    showInfoToast("Failed to import game");
    return null;
  }
} 