"use client";

import { useGame } from "../../game-context";
import { Card, CardContent } from "../../ui/card";
import { Tabs, TabsContent } from "../../ui/tabs";
import { AchievementHeader } from "./achievement-header";
import { AchievementTabs } from "./achievement-tabs";
import { 
  getUnlockedAchievements, 
  getLockedAchievements,
  calculateAchievementProgress
} from "../../../lib/utils/achievement-filter";

import { motion } from "framer-motion";
import { Achievement } from "../../../lib/game-types";
import { fadeInStaggered } from "../../../lib/utils/animation-variants";
import { AchievementItem } from "./achievement-item";
import React from "react";

interface AchievementGridProps {
  achievements: Achievement[];
  emptyMessage?: React.ReactNode;
}

function AchievementGrid({ achievements, emptyMessage }: AchievementGridProps) {
  return (
    <>
      {achievements.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          variants={fadeInStaggered}
          initial="hidden"
          animate="show"
        >
          {achievements.map((achievement) => (
            <AchievementItem 
              key={achievement.id} 
              achievement={achievement} 
            />
          ))}
        </motion.div>
      ) : (
        emptyMessage && (
          <p className="text-sm text-muted-foreground text-center py-4">
            {emptyMessage}
          </p>
        )
      )}
    </>
  );
}

export function Achievements() {
  const { gameState } = useGame();
  
  // Get achievements data
  const unlockedAchievements = getUnlockedAchievements(gameState.achievements);
  const lockedAchievements = getLockedAchievements(gameState.achievements);
  const achievementProgress = calculateAchievementProgress(gameState.achievements);

  return (
    <Card className="w-full h-full overflow-hidden border shadow-sm">
      <AchievementHeader 
        unlockedCount={unlockedAchievements.length}
        totalCount={gameState.achievements.length}
        progress={achievementProgress}
      />
      
      <Tabs defaultValue="all">
        <AchievementTabs 
          totalCount={gameState.achievements.length}
          unlockedCount={unlockedAchievements.length}
          lockedCount={lockedAchievements.length}
        />
        
        <CardContent className="p-3 max-h-[calc(min(80vh,600px))] overflow-y-auto custom-scrollbar">
          <TabsContent value="all" className="mt-0">
            <AchievementGrid achievements={gameState.achievements} />
          </TabsContent>
          
          <TabsContent value="unlocked" className="mt-0">
            <AchievementGrid 
              achievements={unlockedAchievements} 
              emptyMessage="No achievements unlocked yet. Keep playing!" 
            />
          </TabsContent>
          
          <TabsContent value="locked" className="mt-0">
            <AchievementGrid 
              achievements={lockedAchievements} 
              emptyMessage="All achievements unlocked. Congratulations!"
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
} 