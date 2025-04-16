"use client";

import { motion } from "framer-motion";
import { pulseKeyframes } from "../../../lib/utils/animation-keyframes";
import { PULSE_ANIMATION_DURATION } from "../../../lib/constants";

export function ClickDecorations() {
  return (
    <>
      {/* Multiple glow rings for depth effect */}
      <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/20 to-blue-500/30 blur-2xl opacity-60"></div>
      <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-primary/10 via-blue-500/5 to-purple-500/10 blur-3xl opacity-40"></div>
      
      {/* Multiple pulse animations with different timing */}
      <motion.div 
        className="absolute -inset-4 rounded-full bg-primary/15"
        animate={pulseKeyframes}
        transition={{
          duration: PULSE_ANIMATION_DURATION / 1000,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1
        }}
      />
      
      <motion.div 
        className="absolute -inset-2 rounded-full bg-primary/20"
        animate={pulseKeyframes}
        transition={{
          duration: (PULSE_ANIMATION_DURATION - 200) / 1000,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Sparkle effects at different positions */}
      <motion.div 
        className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-yellow-400/90 blur-sm"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute left-2 -bottom-4 h-6 w-6 rounded-full bg-blue-400/90 blur-sm"
        animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </>
  );
}