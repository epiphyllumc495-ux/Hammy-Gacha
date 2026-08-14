export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface GachaItem {
  id: number;
  name: string;
  rarity: Rarity;
  description: string;
  category: 'Food' | 'Fashion' | 'Nature' | 'Magic' | 'Treasures';
  color: string;
  secondaryColor: string;
}

export interface UserStats {
  coins: number;
  totalSpins: number;
  itemsCollected: Record<number, number>; // id -> count
  firstDiscoveredAt: Record<number, string>; // id -> ISO date string
  lastDailyClaim: string | null;
  soundEnabled: boolean;
}

export type HamsterMood = 'idle' | 'happy' | 'excited' | 'eating' | 'waving';

export type AppTab = 'gacha' | 'collection' | 'treats' | 'settings';
