export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  multiplier: number;
  clickIncrement: number;
  purchased: number;
  maxPurchases?: number;
  prerequisites?: string[];
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: {
    type: 'clicks' | 'score' | 'upgrades';
    value: number;
    upgradeId?: string;
  };
  unlocked: boolean;
  icon: string;
}

export interface GameState {
  clicks: number;
  score: number;
  clickPower: number;
  upgrades: Upgrade[];
  achievements: Achievement[];
} 