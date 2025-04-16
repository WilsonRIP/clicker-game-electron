"use client";

import { TabsList, TabsTrigger } from "../../ui/tabs";

interface AchievementTabsProps {
  totalCount: number;
  unlockedCount: number;
  lockedCount: number;
}

export function AchievementTabs({
  totalCount,
  unlockedCount,
  lockedCount
}: AchievementTabsProps) {
  return (
    <div className="px-4 border-b">
      <TabsList className="h-9 w-full justify-start gap-2 bg-transparent pt-1">
        <TabsTrigger value="all" className="text-xs">
          All ({totalCount})
        </TabsTrigger>
        <TabsTrigger value="unlocked" className="text-xs">
          Unlocked ({unlockedCount})
        </TabsTrigger>
        <TabsTrigger value="locked" className="text-xs">
          Locked ({lockedCount})
        </TabsTrigger>
      </TabsList>
    </div>
  );
} 