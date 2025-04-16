"use client";

import { motion } from "framer-motion";
import { formatNumber } from "../../../lib/utils/formatters";

interface StatsDisplayProps {
  clicks: number;
  clickPower: number;
}

export function StatsDisplay({ clicks, clickPower }: StatsDisplayProps) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-base text-foreground">
            {formatNumber(clicks)}
          </span>
          <span>Total Clicks</span>
        </div>
        
        <div className="h-8 border-l border-border"></div>
        
        <div className="flex flex-col items-center">
          <span className="font-semibold text-base text-foreground">
            {formatNumber(clickPower)}
          </span>
          <span>Per Click</span>
        </div>
      </div>
    </motion.div>
  );
} 