interface ElectronAPI {
  getGameState: () => Promise<{
    score: number;
    clickValue: number;
    autoClickerCount: number;
    autoClickerCost: number;
    upgradeClickCost: number;
  }>;
  incrementScore: () => Promise<number>;
  buyAutoClicker: () => Promise<{
    success: boolean;
    score?: number;
    autoClickerCount?: number;
    autoClickerCost?: number;
  }>;
  upgradeClick: () => Promise<{
    success: boolean;
    score?: number;
    clickValue?: number;
    upgradeClickCost?: number;
  }>;
  onUpdateScore: (
    callback: (score: number) => void
  ) => (() => void) | undefined;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
