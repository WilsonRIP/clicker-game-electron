"use client";

import { useRef } from "react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { useGame } from "../../game-context";
import { createClickAnimation } from "../../../lib/utils/animations";
import { clickKeyframes } from "../../../lib/utils/animation-keyframes";
import { ClickDecorations } from "./click-decorations";
import { ClickContent } from "./click-content";

interface ClickButtonProps {
  onClick: () => void;
}

export function ClickButton({ onClick }: ClickButtonProps) {
  const { gameState } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    onClick();

    // Create click animation
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createClickAnimation(x, y, gameState.clickPower, containerRef.current);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      whileTap={clickKeyframes}
      className="relative select-none"
    >
      <ClickDecorations />
      
      {/* Main button with improved styling */}
      <Button
        className="relative h-52 w-52 rounded-full text-4xl font-extrabold shadow-2xl transition-all hover:scale-105 
                  bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70 
                  border-8 border-primary/30 dark:border-primary/20
                  hover:shadow-primary/30 hover:border-primary/40
                  text-primary-foreground flex flex-col items-center justify-center gap-1
                  active:scale-95 active:shadow-inner"
        onClick={handleClick}
      >
        <ClickContent clickPower={gameState.clickPower} />
      </Button>
    </motion.div>
  );
} 