"use client";

import { GameTitle } from "./title";
import { GameStats } from "./game-stats";
import { GameControls } from "./controls";

export function GameHeader() {
  return (
    <header className="relative py-5">
      {/* Decorative header line */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="flex items-center justify-between">
        <GameTitle />
        <GameStats />
        <GameControls />
      </div>
    </header>
  );
} 