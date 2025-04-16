"use client";

import { motion } from "framer-motion";
import { formatNumber } from "../../../lib/utils/formatters";
import { getGradientTextStyle } from "../../../lib/utils/theme-utils";
import { SCALE_ANIMATION_DURATION } from "../../../lib/constants";
import { pulseKeyframes, fadeInKeyframes, transitions } from "../../../lib/utils/animation-keyframes";

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <motion.div 
        className="text-3xl font-bold tracking-tight"
        animate={pulseKeyframes}
        transition={{ 
          duration: SCALE_ANIMATION_DURATION / 1000, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <span className={getGradientTextStyle()}>
          {formatNumber(score)}
        </span>
      </motion.div>
      <div className="text-xl text-muted-foreground">points</div>
    </motion.div>
  );
} 