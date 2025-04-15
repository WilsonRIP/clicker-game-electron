import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface PrestigeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrestige: () => void;
  score: number;
  canPrestige: boolean;
  newPrestigePoints: number;
  currentPrestigePoints: number;
}

export function PrestigeModal({
  isOpen,
  onClose,
  onPrestige,
  score,
  canPrestige,
  newPrestigePoints,
  currentPrestigePoints,
}: PrestigeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Prestige</DialogTitle>
          <DialogDescription>
            Reset your progress to gain permanent bonuses
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <p className="mb-2">Current Score: <span className="font-bold">{score.toLocaleString()}</span></p>
            <p className="mb-2">Current Prestige Points: <span className="font-bold">{currentPrestigePoints}</span></p>
            <p className="mb-2">
              New Prestige Points: <span className="font-bold text-green-500">{newPrestigePoints}</span>
            </p>
            <p className="mb-2">
              New Total: <span className="font-bold text-green-500">{currentPrestigePoints + newPrestigePoints}</span>
            </p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-md">
            <p className="text-sm">
              Prestiging will reset your game but give you <span className="font-bold">{newPrestigePoints}</span> prestige
              points, which provide a permanent {(newPrestigePoints * 10).toFixed(0)}% boost to your clicking and idle production.
            </p>
          </div>
          {!canPrestige && (
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-md mt-3">
              <p className="text-sm text-red-600 dark:text-red-400">
                You need at least 1,000,000 points to prestige.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onPrestige} disabled={!canPrestige}>
            Prestige
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 