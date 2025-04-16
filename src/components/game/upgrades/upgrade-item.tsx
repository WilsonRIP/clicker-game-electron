"use client";

import { Button } from "../../ui/button";
import { Upgrade } from "../../../lib/game-types";
import { motion } from "framer-motion";
import { formatNumber } from "../../../lib/utils/formatters";
import { getUpgradeIcon } from "./upgrade-icons";
import { conditionalStyles, getContainerBackground } from "../../../lib/utils/theme-utils";

interface UpgradeItemProps {
  upgrade: Upgrade;
  canAfford: boolean;
  cost: number;
  maxReached: boolean;
  purchaseUpgrade: (upgradeId: string) => void;
}

export function UpgradeItem({ upgrade, canAfford, cost, maxReached, purchaseUpgrade }: UpgradeItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
      className={`relative flex items-center justify-between rounded-md border p-2 ${
        getContainerBackground(canAfford)
      } transition-colors`}
    >
      <div className="flex items-center gap-2">
        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
          conditionalStyles(
            canAfford,
            "bg-primary/20 text-primary",
            "bg-muted/20 text-muted-foreground"
          )
        }`}>
          {getUpgradeIcon(upgrade.id)}
        </div>
        <div className="space-y-0">
          <h3 className="text-sm font-medium">{upgrade.name}</h3>
          <p className="text-xs text-muted-foreground">
            {upgrade.description}
          </p>
          {upgrade.purchased > 0 && (
            <p className="text-[10px] font-medium text-primary">
              Owned: {upgrade.purchased}
              {upgrade.maxPurchases && ` / ${upgrade.maxPurchases}`}
            </p>
          )}
        </div>
      </div>
      <Button
        onClick={() => purchaseUpgrade(upgrade.id)}
        disabled={!canAfford || maxReached}
        variant={canAfford ? "default" : "outline"}
        size="sm"
        className={`min-w-16 h-7 text-xs ${maxReached ? "bg-green-600 hover:bg-green-700" : ""}`}
      >
        {maxReached
          ? "Maxed"
          : `${formatNumber(cost)} pts`}
      </Button>
    </motion.div>
  );
} 