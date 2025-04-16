"use client";

import { useGame } from "../../game-context";
import { Info, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function GameStats() {
  const { gameState } = useGame();

  // Calculate total upgrades purchased
  const totalUpgradesPurchased = gameState.upgrades.reduce(
    (total, upgrade) => total + upgrade.purchased, 0
  );

  const stats = [
    {
      icon: <Info className="h-4 w-4 text-primary" />,
      label: "Points",
      value: gameState.score.toLocaleString(),
    },
    {
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      label: "Upgrades",
      value: totalUpgradesPurchased.toString(),
    },
    {
      icon: <Award className="h-4 w-4 text-purple-500" />,
      label: "Achievements",
      value: gameState.achievements.filter(a => a.unlocked).length.toString(),
    },
  ];

  return (
    <div className="hidden md:flex items-center gap-4">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-card/50 text-sm"
        >
          {stat.icon}
          <span className="font-medium">{stat.value}</span>
          <span className="text-xs text-muted-foreground">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
} 