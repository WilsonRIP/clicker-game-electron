"use client";

import { CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";

interface AchievementHeaderProps {
  unlockedCount: number;
  totalCount: number;
  progress: number;
}

export function AchievementHeader({ 
  unlockedCount, 
  totalCount, 
  progress 
}: AchievementHeaderProps) {
  return (
    <CardHeader className="bg-gradient-to-r from-purple-500/10 to-primary/10 py-3 px-4">
      <CardTitle className="flex items-center gap-2 text-base leading-snug">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
          🏆
        </span>
        Achievements
      </CardTitle>
      <CardDescription className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Progress: {unlockedCount} of {totalCount} unlocked</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </CardDescription>
    </CardHeader>
  );
} 