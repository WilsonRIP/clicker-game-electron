"use client";

import { motion } from "framer-motion";

export function GameTitle() {
  return (
    <div className="flex items-center gap-3">
      <motion.h1 
        className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-3xl font-bold text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Clicker Game
      </motion.h1>
      <motion.div 
        className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        v1.0
      </motion.div>
    </div>
  );
} 