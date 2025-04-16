"use client";

import { ChevronUp, Sparkles, Zap } from "lucide-react";
import { UPGRADE_IDS } from "../../../lib/constants";

/**
 * Get icon based on upgrade ID
 */
export function getUpgradeIcon(id: string) {
  switch(id) {
    case UPGRADE_IDS.CURSOR:
      return <ChevronUp className="h-3 w-3" />;
    case UPGRADE_IDS.DOUBLE_CLICK:
      return <Zap className="h-3 w-3" />;
    case UPGRADE_IDS.AUTO_CLICKER:
      return <Sparkles className="h-3 w-3" />;
    case UPGRADE_IDS.MEGA_CURSOR:
      return <ChevronUp className="h-3 w-3 text-blue-500" />;
    case UPGRADE_IDS.HYPER_CLICK:
      return <Zap className="h-3 w-3 text-purple-500" />;
    default:
      return <ChevronUp className="h-3 w-3" />;
  }
} 