interface ElectronAPI {
  getGameState: () => Promise<{
    score: number;
    clickValue: number;
    autoClickerCount: number;
    autoClickerCost: number;
    upgradeClickCost: number;
    multiplierLevel: number;
    multiplierCost: number;
    goldCookiesEnabled: boolean;
    goldCookieUpgradeCost: number;
    criticalClickChance: number;
    criticalClickCost: number;
    criticalClickMultiplier: number;
    prestigePoints: number;
    prestigeMultiplier: number;
  }>;
  
  incrementScore: (isCritical?: boolean) => Promise<{
    score: number;
    clickValue: number;
  }>;
  
  checkCriticalClick: () => Promise<{
    isCritical: boolean;
  }>;
  
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
  
  buyMultiplier: () => Promise<{
    success: boolean;
    score?: number;
    multiplierLevel?: number;
    multiplierCost?: number;
  }>;
  
  buyGoldCookieUpgrade: () => Promise<{
    success: boolean;
    score?: number;
    goldCookiesEnabled?: boolean;
  }>;
  
  collectGoldCookie: (bonus: number) => Promise<{
    score: number;
    bonusAmount: number;
  }>;
  
  upgradeCriticalClick: () => Promise<{
    success: boolean;
    score?: number;
    criticalClickChance?: number;
    criticalClickCost?: number;
  }>;
  
  prestige: () => Promise<{
    success: boolean;
    newPrestigePoints?: number;
    prestigePoints?: number;
    prestigeMultiplier?: number;
    score?: number;
    clickValue?: number;
    autoClickerCount?: number;
    autoClickerCost?: number;
    upgradeClickCost?: number;
    multiplierLevel?: number;
    multiplierCost?: number;
    goldCookiesEnabled?: boolean;
    goldCookieUpgradeCost?: number;
    criticalClickChance?: number;
    criticalClickCost?: number;
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
