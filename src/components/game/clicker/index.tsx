"use client";

import { useGame } from "../../game-context";
import { ScoreDisplay } from "./score-display";
import { ClickButton } from "./click-button";
import { StatsDisplay } from "./stats-display";

export function ClickerButton() {
  const { handleClick, gameState } = useGame();

  return (
    <div className="flex flex-col items-center gap-8">
      <ScoreDisplay score={gameState.score} />
      <ClickButton onClick={() => handleClick()} />
      <StatsDisplay clicks={gameState.clicks} clickPower={gameState.clickPower} />
    </div>
  );
} 