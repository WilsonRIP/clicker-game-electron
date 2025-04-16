"use client";

import { motion } from "framer-motion";
import { Achievement } from "../../../lib/game-types";
import { getAchievementBackground, getIconContainerStyle, formatAchievementRequirement } from "../../../lib/utils/achievement-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { itemFadeInUp } from "../../../lib/utils/animation-variants";

interface AchievementItemProps {
  achievement: Achievement;
  showDetails?: boolean;
}

export function AchievementItem({ achievement, showDetails = false }: AchievementItemProps) {
  return (
    <motion.div
      variants={itemFadeInUp}
      className={`relative flex items-start gap-2.5 rounded-md border p-3 transition-all ${
        getAchievementBackground(achievement)
      }`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Achievement icon */}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${
        getIconContainerStyle(achievement)
      }`}>
        {achievement.icon}
      </div>
      
      {/* Achievement details */}
      <div className="min-w-0 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="text-sm font-medium leading-tight flex-grow min-w-0 leading-snug">
            {achievement.name}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="h-5 w-5 rounded-full bg-muted/20 flex items-center justify-center text-xs text-muted-foreground hover:bg-muted/40 transition-colors shrink-0">
                  ?
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">{formatAchievementRequirement(achievement)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {achievement.unlocked && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-0.5"
          >
            <span 
              className="inline-flex items-center rounded-full bg-green-500/15 px-1.5 py-0.5 text-xs text-green-600 dark:text-green-400"
            >
              UNLOCKED
            </span>
          </motion.div>
        )}
        <p className="text-xs text-muted-foreground mt-1 leading-snug">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
} 