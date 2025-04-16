"use client";

import { useGame } from "../../game-context";
import { ThemeToggle } from "../../theme-toggle";
import { Button } from "../../ui/button";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export function GameControls() {
  const { resetGame } = useGame();

  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <ThemeToggle />
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (confirm("Are you sure you want to reset your game progress?")) {
            resetGame()
          }
        }}
        title="Reset Game"
        className="h-9 w-9 rounded-full"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </motion.div>
  );
} 