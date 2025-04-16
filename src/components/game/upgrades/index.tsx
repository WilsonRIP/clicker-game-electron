"use client";

import { useGame } from "../../game-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { motion } from "framer-motion";
import { UpgradeItem } from "./upgrade-item";
import { Upgrade, GameState } from "../../../lib/game-types";
import React from "react";

// --- UpgradeGrid Component (inlined) ---
interface UpgradeGridProps {
  upgrades: Upgrade[];
  gameState: GameState;
  purchaseUpgrade: (upgradeId: string) => void;
  calculateCost: (upgrade: Upgrade) => number;
}

function UpgradeGrid({ upgrades, gameState, purchaseUpgrade, calculateCost }: UpgradeGridProps) {
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      className="grid gap-2"
      variants={gridVariants}
      initial="hidden"
      animate="show"
    >
      {upgrades.map((upgrade) => {
        const cost = calculateCost(upgrade);
        const canAfford = gameState.score >= cost;
        const maxReached =
          upgrade.maxPurchases !== undefined &&
          upgrade.purchased >= upgrade.maxPurchases;

        return (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            canAfford={canAfford}
            cost={cost}
            maxReached={maxReached}
            purchaseUpgrade={purchaseUpgrade}
          />
        );
      })}
    </motion.div>
  );
}
// --- End UpgradeGrid Component ---

export function Upgrades() {
  const { gameState, purchaseUpgrade } = useGame();

  // Calculate the cost of an upgrade based on its base cost, multiplier, and number purchased
  const calculateCost = (upgrade: Upgrade) => {
    return Math.floor(
      upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.purchased)
    );
  };

  // Filter to only show unlocked upgrades
  const unlockedUpgrades = gameState.upgrades.filter(
    (upgrade) => upgrade.unlocked
  );

  return (
    <Card className="w-full h-full overflow-hidden border shadow-sm">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 py-3 px-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
            ⚡
          </span>
          Upgrades
        </CardTitle>
        <CardDescription className="text-xs">
          Enhance your clicking power with {unlockedUpgrades.length} available upgrades
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 max-h-[35vh] overflow-y-auto custom-scrollbar">
        {unlockedUpgrades.length === 0 ? (
          <div className="flex h-20 items-center justify-center text-center text-xs text-muted-foreground">
            <p>No upgrades available yet. Keep clicking!</p>
          </div>
        ) : (
          // Use the inlined UpgradeGrid component
          <UpgradeGrid
            upgrades={unlockedUpgrades}
            gameState={gameState}
            purchaseUpgrade={purchaseUpgrade}
            calculateCost={calculateCost}
          />
        )}
      </CardContent>
    </Card>
  );
} 