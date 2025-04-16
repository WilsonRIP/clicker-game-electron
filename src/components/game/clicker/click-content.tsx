"use client";

import { motion } from "framer-motion";
import { pulseKeyframes } from "../../../lib/utils/animation-keyframes";
import { SCALE_ANIMATION_DURATION } from "../../../lib/constants";

interface ClickContentProps {
  clickPower: number;
}

export function ClickContent({ clickPower }: ClickContentProps) {
  return (
    <motion.div
      animate={pulseKeyframes}
      transition={{ 
        duration: SCALE_ANIMATION_DURATION / 1000, 
        repeat: Infinity 
      }}
      className="flex flex-col items-center"
    >
      <span className="text-5xl drop-shadow-md mb-1">Click!</span>
      <span className="text-sm uppercase tracking-wider font-medium opacity-80">
        Power: {clickPower}
      </span>
    </motion.div>
  );
} 