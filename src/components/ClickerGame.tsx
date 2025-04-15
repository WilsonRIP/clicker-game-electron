import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GoldCookie } from "./GoldCookie";
import { PrestigeModal } from "./PrestigeModal";
import { BackgroundEffect } from "./BackgroundEffect";
import { Achievement, AchievementNotification, Achievements } from "./Achievement";
import { SettingsMenu } from "./SettingsMenu";
import { formatNumber } from "../lib/utils";
import { 
  createClickParticles, 
  createFloatingText, 
  pulseElement, 
  shakeElement 
} from "../lib/animations";
import {
  initAudio,
  playClickSound,
  playCriticalSound,
  playPurchaseSound,
  playAchievementSound,
  playGoldenCookieSound,
  getSoundEnabled,
  toggleSound
} from "../lib/sounds";

// Define the game state interface
interface GameState {
  score: number;
  clickValue: number;
  autoClickerCount: number;
  autoClickerCost: number;
  upgradeClickCost: number;
  multiplierLevel: number;
  multiplierCost: number;
  goldCookiesEnabled: boolean;
  goldCookieUpgradeCost: number;
  criticalClickChance: number;
  criticalClickCost: number;
  criticalClickMultiplier: number;
  prestigePoints: number;
  prestigeMultiplier: number;
}

export function ClickerGame() {
  // State to track game variables
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    clickValue: 1,
    autoClickerCount: 0,
    autoClickerCost: 10,
    upgradeClickCost: 25,
    multiplierLevel: 0,
    multiplierCost: 100,
    goldCookiesEnabled: false,
    goldCookieUpgradeCost: 500,
    criticalClickChance: 0,
    criticalClickCost: 200,
    criticalClickMultiplier: 3,
    prestigePoints: 0,
    prestigeMultiplier: 1
  });
  
  // Animation related references
  const containerRef = useRef<HTMLDivElement>(null);
  const cookieButtonRef = useRef<HTMLButtonElement>(null);
  
  // UI state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPrestigeModal, setShowPrestigeModal] = useState(false);
  const [estimatedPrestigePoints, setEstimatedPrestigePoints] = useState(0);
  
  // Achievement system
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-click',
      title: 'First Click',
      description: 'Click the cookie for the first time',
      icon: '🖱️',
      unlocked: false
    },
    {
      id: 'cookie-novice',
      title: 'Cookie Novice',
      description: 'Reach 100 points',
      icon: '🍪',
      unlocked: false
    },
    {
      id: 'cookie-enthusiast',
      title: 'Cookie Enthusiast',
      description: 'Reach 1,000 points',
      icon: '🍪',
      unlocked: false
    },
    {
      id: 'cookie-master',
      title: 'Cookie Master',
      description: 'Reach 10,000 points',
      icon: '👨‍🍳',
      unlocked: false
    },
    {
      id: 'cookie-legend',
      title: 'Cookie Legend',
      description: 'Reach 100,000 points',
      icon: '👑',
      unlocked: false
    },
    {
      id: 'auto-click-1',
      title: 'Automation Beginner',
      description: 'Buy your first auto clicker',
      icon: '🤖',
      unlocked: false
    },
    {
      id: 'auto-click-10',
      title: 'Automation Expert',
      description: 'Have 10 auto clickers',
      icon: '⚙️',
      unlocked: false
    },
    {
      id: 'golden-cookie',
      title: 'Golden Touch',
      description: 'Unlock golden cookies',
      icon: '✨',
      unlocked: false
    },
    {
      id: 'critical-master',
      title: 'Critical Hit Master',
      description: 'Reach 25% critical hit chance',
      icon: '⚡',
      unlocked: false
    },
    {
      id: 'prestige-1',
      title: 'Rebirth',
      description: 'Prestige for the first time',
      icon: '🔄',
      unlocked: false
    }
  ]);
  
  const [showAchievements, setShowAchievements] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(getSoundEnabled());
  
  // Effect for calculating estimated prestige points
  useEffect(() => {
    if (gameState.score >= 1000000) {
      setEstimatedPrestigePoints(Math.floor(Math.log10(gameState.score)));
    } else {
      setEstimatedPrestigePoints(0);
    }
  }, [gameState.score]);

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

  // Initialize audio on first user interaction
  useEffect(() => {
    const initOnInteraction = () => {
      initAudio();
      document.removeEventListener('click', initOnInteraction);
    };
    
    document.addEventListener('click', initOnInteraction);
    
    return () => {
      document.removeEventListener('click', initOnInteraction);
    };
  }, []);

  // Handle clicking the cookie/button
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      // Initialize audio if needed
      initAudio();
      
      // Get click position for animations
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if this is a critical click
      const criticalCheck = await window.electronAPI.checkCriticalClick();
      const isCritical = criticalCheck.isCritical;
      
      // Play appropriate sound
      if (isCritical) {
        playCriticalSound();
      } else {
        playClickSound();
      }
      
      // Increment score with possible critical
      const result = await window.electronAPI.incrementScore(isCritical);
      
      // Update game state
      setGameState((prevState) => ({
        ...prevState,
        score: result.score,
      }));
      
      // Apply visual effects
      if (containerRef.current && cookieButtonRef.current) {
        // Create visual click effect
        createClickParticles(x, y, containerRef.current);
        
        // Show floating number
        createFloatingText(x, y, result.clickValue, containerRef.current);
        
        // Apply pulse animation to the button
        pulseElement(cookieButtonRef.current);
        
        // Add a slight random rotation to the cookie for more dynamic feel
        const button = cookieButtonRef.current;
        const randomRotation = Math.random() * 10 - 5; // Random angle between -5 and 5 degrees
        button.style.transition = 'transform 0.2s ease-out';
        button.style.transform = `rotate(${randomRotation}deg)`;
        
        // Reset rotation after animation
        setTimeout(() => {
          button.style.transform = '';
        }, 200);
        
        // Show critical hit effect
        if (isCritical) {
          setToastMessage(`CRITICAL HIT! +${result.clickValue}`);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      }
    } catch (error) {
      console.error("Failed to increment score:", error);
    }
  };

  // Buy an auto clicker
  const buyAutoClicker = async () => {
    try {
      const result = await window.electronAPI.buyAutoClicker();
      if (result.success && result.score !== undefined && 
          result.autoClickerCount !== undefined && result.autoClickerCost !== undefined) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score as number,
          autoClickerCount: result.autoClickerCount as number,
          autoClickerCost: result.autoClickerCost as number,
        }));
        
        // Play purchase sound
        playPurchaseSound();
      } else if (containerRef.current) {
        // Apply shake animation to show cannot afford
        const buttons = containerRef.current.querySelectorAll('button');
        if (buttons[0]) shakeElement(buttons[0] as HTMLElement);
      }
    } catch (error) {
      console.error("Failed to buy auto clicker:", error);
    }
  };

  // Upgrade click value
  const upgradeClick = async () => {
    try {
      const result = await window.electronAPI.upgradeClick();
      if (result.success && result.score !== undefined && 
          result.clickValue !== undefined && result.upgradeClickCost !== undefined) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score as number,
          clickValue: result.clickValue as number,
          upgradeClickCost: result.upgradeClickCost as number,
        }));
        
        // Play purchase sound
        playPurchaseSound();
      } else if (containerRef.current) {
        // Apply shake animation to show cannot afford
        const buttons = containerRef.current.querySelectorAll('button');
        if (buttons[1]) shakeElement(buttons[1] as HTMLElement);
      }
    } catch (error) {
      console.error("Failed to upgrade click:", error);
    }
  };
  
  // Buy multiplier upgrade
  const buyMultiplier = async () => {
    try {
      const result = await window.electronAPI.buyMultiplier();
      if (result.success && result.score !== undefined && 
          result.multiplierLevel !== undefined && result.multiplierCost !== undefined) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score as number,
          multiplierLevel: result.multiplierLevel as number,
          multiplierCost: result.multiplierCost as number,
        }));
        
        // Play purchase sound
        playPurchaseSound();
      } else if (containerRef.current) {
        // Apply shake animation to show cannot afford
        const buttons = containerRef.current.querySelectorAll('button');
        if (buttons[2]) shakeElement(buttons[2] as HTMLElement);
      }
    } catch (error) {
      console.error("Failed to buy multiplier:", error);
    }
  };
  
  // Buy gold cookie upgrade
  const buyGoldCookieUpgrade = async () => {
    try {
      const result = await window.electronAPI.buyGoldCookieUpgrade();
      if (result.success && result.score !== undefined && 
          result.goldCookiesEnabled !== undefined) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score as number,
          goldCookiesEnabled: result.goldCookiesEnabled as boolean,
        }));
        
        // Play purchase sound
        playPurchaseSound();
      } else if (containerRef.current) {
        // Apply shake animation to show cannot afford
        const buttons = containerRef.current.querySelectorAll('button');
        if (buttons[3]) shakeElement(buttons[3] as HTMLElement);
      }
    } catch (error) {
      console.error("Failed to buy gold cookie upgrade:", error);
    }
  };
  
  // Upgrade critical click chance
  const upgradeCriticalClick = async () => {
    try {
      const result = await window.electronAPI.upgradeCriticalClick();
      if (result.success && result.score !== undefined && 
          result.criticalClickChance !== undefined && result.criticalClickCost !== undefined) {
        setGameState((prevState) => ({
          ...prevState,
          score: result.score as number,
          criticalClickChance: result.criticalClickChance as number,
          criticalClickCost: result.criticalClickCost as number,
        }));
        
        // Play purchase sound
        playPurchaseSound();
      } else if (containerRef.current) {
        // Apply shake animation to show cannot afford
        const buttons = containerRef.current.querySelectorAll('button');
        if (buttons[4]) shakeElement(buttons[4] as HTMLElement);
      }
    } catch (error) {
      console.error("Failed to upgrade critical click:", error);
    }
  };
  
  // Handle gold cookie collection
  const handleGoldCookieCollect = async (bonus: number) => {
    try {
      const result = await window.electronAPI.collectGoldCookie(bonus);
      setGameState((prevState) => ({
        ...prevState,
        score: result.score,
      }));
      
      // Play golden cookie sound
      playGoldenCookieSound();
      
      setToastMessage(`Golden Cookie! +${result.bonusAmount.toLocaleString()} points!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Failed to collect gold cookie:", error);
    }
  };
  
  // Check for achievements whenever game state changes
  useEffect(() => {
    const updatedAchievements = [...achievements];
    let achievementUnlocked = false;
    
    // Check each achievement condition
    if (!updatedAchievements.find(a => a.id === 'first-click')?.unlocked && gameState.score > 0) {
      unlockAchievement('first-click', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'cookie-novice')?.unlocked && gameState.score >= 100) {
      unlockAchievement('cookie-novice', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'cookie-enthusiast')?.unlocked && gameState.score >= 1000) {
      unlockAchievement('cookie-enthusiast', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'cookie-master')?.unlocked && gameState.score >= 10000) {
      unlockAchievement('cookie-master', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'cookie-legend')?.unlocked && gameState.score >= 100000) {
      unlockAchievement('cookie-legend', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'auto-click-1')?.unlocked && gameState.autoClickerCount >= 1) {
      unlockAchievement('auto-click-1', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'auto-click-10')?.unlocked && gameState.autoClickerCount >= 10) {
      unlockAchievement('auto-click-10', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'golden-cookie')?.unlocked && gameState.goldCookiesEnabled) {
      unlockAchievement('golden-cookie', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (!updatedAchievements.find(a => a.id === 'critical-master')?.unlocked && gameState.criticalClickChance >= 25) {
      unlockAchievement('critical-master', updatedAchievements);
      achievementUnlocked = true;
    }
    
    if (achievementUnlocked) {
      setAchievements(updatedAchievements);
    }
  }, [gameState, achievements]);
  
  // Unlock achievement helper function
  const unlockAchievement = (id: string, achievementList: Achievement[]) => {
    const achievement = achievementList.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      setNewAchievement(achievement);
      
      // Play achievement sound
      playAchievementSound();
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        setNewAchievement(null);
      }, 5000);
    }
  };
  
  // Check for prestige achievement
  const handlePrestige = async () => {
    try {
      const result = await window.electronAPI.prestige();
      if (result.success && 
          result.score !== undefined &&
          result.clickValue !== undefined &&
          result.autoClickerCount !== undefined &&
          result.autoClickerCost !== undefined &&
          result.upgradeClickCost !== undefined &&
          result.multiplierLevel !== undefined &&
          result.multiplierCost !== undefined &&
          result.goldCookiesEnabled !== undefined &&
          result.goldCookieUpgradeCost !== undefined &&
          result.criticalClickChance !== undefined &&
          result.criticalClickCost !== undefined &&
          result.prestigePoints !== undefined &&
          result.prestigeMultiplier !== undefined &&
          result.newPrestigePoints !== undefined) {
        
        setGameState({
          score: result.score,
          clickValue: result.clickValue,
          autoClickerCount: result.autoClickerCount,
          autoClickerCost: result.autoClickerCost,
          upgradeClickCost: result.upgradeClickCost,
          multiplierLevel: result.multiplierLevel,
          multiplierCost: result.multiplierCost,
          goldCookiesEnabled: result.goldCookiesEnabled,
          goldCookieUpgradeCost: result.goldCookieUpgradeCost,
          criticalClickChance: result.criticalClickChance,
          criticalClickCost: result.criticalClickCost,
          criticalClickMultiplier: gameState.criticalClickMultiplier,
          prestigePoints: result.prestigePoints,
          prestigeMultiplier: result.prestigeMultiplier
        });
        
        // Unlock prestige achievement
        if (!achievements.find(a => a.id === 'prestige-1')?.unlocked) {
          const updatedAchievements = [...achievements];
          unlockAchievement('prestige-1', updatedAchievements);
          setAchievements(updatedAchievements);
        }
        
        setShowPrestigeModal(false);
        setToastMessage(`Prestige complete! +${result.newPrestigePoints} prestige points!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Failed to prestige:", error);
    }
  };
  
  // Handle sound toggle
  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
  };
  
  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Background effect */}
      <BackgroundEffect />
      
      {/* Golden Cookie feature */}
      {gameState.goldCookiesEnabled && (
        <GoldCookie enabled={gameState.goldCookiesEnabled} onCollect={handleGoldCookieCollect} />
      )}
      
      {/* Toast messages */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-bounce">
          {toastMessage}
        </div>
      )}
      
      {/* Achievement notification */}
      {newAchievement && (
        <AchievementNotification 
          achievement={newAchievement} 
          onHide={() => setNewAchievement(null)} 
        />
      )}
      
      {/* Achievements modal */}
      {showAchievements && (
        <Achievements 
          achievements={achievements} 
          onClose={() => setShowAchievements(false)} 
        />
      )}
      
      {/* Settings modal */}
      {showSettings && (
        <SettingsMenu
          onClose={() => setShowSettings(false)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      
      {/* Prestige Modal */}
      <PrestigeModal 
        isOpen={showPrestigeModal}
        onClose={() => setShowPrestigeModal(false)}
        onPrestige={handlePrestige}
        score={gameState.score}
        canPrestige={gameState.score >= 1000000}
        newPrestigePoints={estimatedPrestigePoints}
        currentPrestigePoints={gameState.prestigePoints}
      />
      
      <div className="max-w-5xl w-full space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Clicker Game</h1>
            {gameState.prestigePoints > 0 && (
              <div className="text-sm text-yellow-500">
                Prestige Level: {gameState.prestigePoints} (+{((gameState.prestigeMultiplier - 1) * 100).toFixed(0)}% bonus)
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowAchievements(true)}
              className="flex items-center gap-1"
            >
              <span>🏆</span>
              <span>Achievements</span>
              <span className="ml-1 text-xs bg-yellow-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                {achievements.filter(a => a.unlocked).length}
              </span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPrestigeModal(true)}
              className={gameState.score >= 1000000 ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
            >
              Prestige
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main clicking area */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Points</CardTitle>
              <CardDescription className="text-center">
                Click to earn points and upgrade!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-6">
                {formatNumber(gameState.score)}
              </div>
              <Button
                ref={cookieButtonRef}
                className="w-40 h-40 rounded-full mb-6 text-2xl transition-transform hover:scale-105 bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg relative overflow-hidden"
                onClick={handleClick}
              >
                <span className="text-5xl">🍪</span>
              </Button>
              <div className="text-sm mb-2 font-semibold">
                +{formatNumber(gameState.clickValue)} per click
              </div>
              <div className="text-sm font-semibold">
                +{formatNumber(Math.floor(gameState.autoClickerCount * (1 + (gameState.multiplierLevel * 0.2) * gameState.prestigeMultiplier)))} per second
              </div>
              {gameState.criticalClickChance > 0 && (
                <div className="mt-2 text-sm text-yellow-500">
                  {gameState.criticalClickChance}% critical hit chance (x{gameState.criticalClickMultiplier})
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Upgrades panel */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-xl">Upgrades</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {/* Auto Clicker */}
              <Button
                variant={gameState.score >= gameState.autoClickerCost ? "default" : "outline"}
                className="w-full justify-between"
                onClick={buyAutoClicker}
                disabled={gameState.score < gameState.autoClickerCost}
              >
                <span>Auto Clicker ({gameState.autoClickerCount})</span>
                <span className="text-xs bg-background/30 rounded px-2 py-1">
                  {formatNumber(gameState.autoClickerCost)}
                </span>
              </Button>
              
              {/* Click Value */}
              <Button
                variant={gameState.score >= gameState.upgradeClickCost ? "default" : "outline"}
                className="w-full justify-between"
                onClick={upgradeClick}
                disabled={gameState.score < gameState.upgradeClickCost}
              >
                <span>Upgrade Click (+1)</span>
                <span className="text-xs bg-background/30 rounded px-2 py-1">
                  {formatNumber(gameState.upgradeClickCost)}
                </span>
              </Button>
              
              {/* Multiplier */}
              <Button
                variant={gameState.score >= gameState.multiplierCost ? "default" : "outline"}
                className="w-full justify-between"
                onClick={buyMultiplier}
                disabled={gameState.score < gameState.multiplierCost}
              >
                <span>Multiplier (Lvl {gameState.multiplierLevel})</span>
                <span className="text-xs bg-background/30 rounded px-2 py-1">
                  {formatNumber(gameState.multiplierCost)}
                </span>
              </Button>
              
              {/* Golden Cookie Upgrade */}
              {!gameState.goldCookiesEnabled && (
                <Button
                  variant={gameState.score >= gameState.goldCookieUpgradeCost ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={buyGoldCookieUpgrade}
                  disabled={gameState.score < gameState.goldCookieUpgradeCost}
                >
                  <span>Enable Golden Cookies</span>
                  <span className="text-xs bg-background/30 rounded px-2 py-1">
                    {formatNumber(gameState.goldCookieUpgradeCost)}
                  </span>
                </Button>
              )}
              
              {/* Critical Click Upgrade */}
              <Button
                variant={gameState.score >= gameState.criticalClickCost ? "default" : "outline"}
                className="w-full justify-between"
                onClick={upgradeCriticalClick}
                disabled={gameState.score < gameState.criticalClickCost}
              >
                <span>Critical Click Chance (+5%)</span>
                <span className="text-xs bg-background/30 rounded px-2 py-1">
                  {formatNumber(gameState.criticalClickCost)}
                </span>
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div>Click for instant points</div>
              <div>Auto-click for idle points</div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Stats Panel */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background/50 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Points</div>
              <div className="font-bold">{formatNumber(gameState.score)}</div>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Per Click</div>
              <div className="font-bold">{formatNumber(gameState.clickValue)}</div>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Per Second</div>
              <div className="font-bold">{formatNumber(Math.floor(gameState.autoClickerCount * (1 + (gameState.multiplierLevel * 0.2) * gameState.prestigeMultiplier)))}</div>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Prestige Bonus</div>
              <div className="font-bold">{((gameState.prestigeMultiplier - 1) * 100).toFixed(0)}%</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
