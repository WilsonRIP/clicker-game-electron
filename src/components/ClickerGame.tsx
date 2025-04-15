import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// Define the game state interface
interface GameState {
  score: number;
  clickValue: number;
  autoClickerCount: number;
  autoClickerCost: number;
  upgradeClickCost: number;
}

// Define the response interfaces for type safety
interface AutoClickerResponse {
  success: boolean;
  score: number;
  autoClickerCount: number;
  autoClickerCost: number;
}

interface UpgradeClickResponse {
  success: boolean;
  score: number;
  clickValue: number;
  upgradeClickCost: number;
}

export function ClickerGame() {
  // State to track game variables
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    clickValue: 1,
    autoClickerCount: 0,
    autoClickerCost: 10,
    upgradeClickCost: 25,
  });

  // Initialize the game state from the main process
  useEffect(() => {
    const initGame = async () => {
      try {
        const initialState = await window.electronAPI.getGameState();
        setGameState(initialState);
      } catch (error) {
        console.error("Failed to get game state:", error);
      }
    };

    initGame();

    // Set up the score update listener
    const unsubscribe = window.electronAPI.onUpdateScore((newScore: number) => {
      setGameState((prevState) => ({
        ...prevState,
        score: newScore,
      }));
    });

    // Clean up the listener when component unmounts
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  // Handle clicking the cookie/button
  const handleClick = async () => {
    try {
      const newScore = await window.electronAPI.incrementScore();
      setGameState((prevState) => ({
        ...prevState,
        score: newScore,
      }));
    } catch (error) {
      console.error("Failed to increment score:", error);
    }
  };

  // Buy an auto clicker
  const buyAutoClicker = async () => {
    try {
      const result =
        (await window.electronAPI.buyAutoClicker()) as AutoClickerResponse;
      if (result.success) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score,
          autoClickerCount: result.autoClickerCount,
          autoClickerCost: result.autoClickerCost,
        }));
      }
    } catch (error) {
      console.error("Failed to buy auto clicker:", error);
    }
  };

  // Upgrade click value
  const upgradeClick = async () => {
    try {
      const result =
        (await window.electronAPI.upgradeClick()) as UpgradeClickResponse;
      if (result.success) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score,
          clickValue: result.clickValue,
          upgradeClickCost: result.upgradeClickCost,
        }));
      }
    } catch (error) {
      console.error("Failed to upgrade click:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Clicker Game</CardTitle>
            <CardDescription className="text-center">
              Click to earn points and upgrade!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-4">
              {gameState.score.toLocaleString()}
            </div>
            <Button
              className="w-32 h-32 rounded-full mb-6 text-lg transition-transform hover:scale-105"
              onClick={handleClick}
            >
              Click Me!
            </Button>
            <div className="text-sm mb-2">
              +{gameState.clickValue} per click
            </div>
            <div className="text-sm">
              +{gameState.autoClickerCount} per second
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex w-full justify-between gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={buyAutoClicker}
                disabled={gameState.score < gameState.autoClickerCost}
              >
                Buy Auto Clicker
                <span className="ml-2 text-xs">
                  ({gameState.autoClickerCost})
                </span>
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={upgradeClick}
                disabled={gameState.score < gameState.upgradeClickCost}
              >
                Upgrade Click
                <span className="ml-2 text-xs">
                  ({gameState.upgradeClickCost})
                </span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
