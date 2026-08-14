/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserStats, GachaItem, HamsterMood, AppTab, Rarity } from './types';
import { getRandomItem } from './data/items';
import { HamsterSVG } from './components/HamsterSVG';
import { GachaMachineSVG } from './components/GachaMachineSVG';
import { CollectionBook } from './components/CollectionBook';
import { CapsuleModal } from './components/CapsuleModal';
import { SettingsModal } from './components/SettingsModal';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import {
  playClickSound,
  playRattleSound,
  playCapsuleRollSound,
  playCoinSound,
} from './utils/audio';

const STORAGE_KEY = 'HAMMY_GACHA_USER_STATS_V1';

const DEFAULT_STATS: UserStats = {
  coins: 500,
  totalSpins: 0,
  itemsCollected: {},
  firstDiscoveredAt: {},
  lastDailyClaim: null,
  soundEnabled: true,
};

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback if localStorage unavailable
    }
    return DEFAULT_STATS;
  });

  const [activeTab, setActiveTab] = useState<AppTab>('gacha');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hamsterMood, setHamsterMood] = useState<HamsterMood>('idle');
  const [rolledCapsule, setRolledCapsule] = useState<{
    item: GachaItem;
    isNew: boolean;
  } | null>(null);

  const [confettiBurst, setConfettiBurst] = useState<{
    trigger: boolean;
    rarity: Rarity;
  }>({ trigger: false, rarity: 'common' });

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore local storage errors
    }
  }, [stats]);

  // Handle Spin Logic
  const handleSpinGacha = () => {
    if (isSpinning || stats.coins < 50) return;

    // Deduct cost & increment total spins
    setStats((prev) => ({
      ...prev,
      coins: prev.coins - 50,
      totalSpins: prev.totalSpins + 1,
    }));

    setIsSpinning(true);
    setHamsterMood('excited');

    // Audio effects during spin
    playRattleSound(stats.soundEnabled);

    setTimeout(() => {
      playCapsuleRollSound(stats.soundEnabled);
    }, 1200);

    // Roll item after 2.2s
    setTimeout(() => {
      const item = getRandomItem();
      const isNew = !(stats.itemsCollected[item.id] > 0);

      // Update collection stats
      setStats((prev) => {
        const currentCount = prev.itemsCollected[item.id] || 0;
        const updatedCollected = {
          ...prev.itemsCollected,
          [item.id]: currentCount + 1,
        };

        const updatedDiscovered = { ...prev.firstDiscoveredAt };
        if (isNew) {
          updatedDiscovered[item.id] = new Date().toISOString();
        }

        // Reward +5 coins if brand new discovery!
        const bonusCoins = isNew ? 5 : 0;

        return {
          ...prev,
          coins: prev.coins + bonusCoins,
          itemsCollected: updatedCollected,
          firstDiscoveredAt: updatedDiscovered,
        };
      });

      setIsSpinning(false);
      setRolledCapsule({ item, isNew });
    }, 2300);
  };

  const handleTriggerConfetti = (rarity: Rarity) => {
    setConfettiBurst({ trigger: true, rarity });
    setTimeout(() => {
      setConfettiBurst((prev) => ({ ...prev, trigger: false }));
    }, 100);
  };

  const handleToggleSound = () => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleClaimDaily = () => {
    setStats((prev) => ({
      ...prev,
      coins: prev.coins + 15,
      lastDailyClaim: new Date().toISOString(),
    }));
  };

  const handlePetHamster = () => {
    setHamsterMood('happy');
    setStats((prev) => ({ ...prev, coins: prev.coins + 2 }));
    setTimeout(() => setHamsterMood('idle'), 2000);
  };

  const handleResetData = () => {
    setStats(DEFAULT_STATS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8F1] flex flex-col justify-between items-center relative overflow-x-hidden font-sans text-[#663322]">
      {/* Particle Canvas Layer */}
      <ConfettiCanvas
        triggerBurst={confettiBurst.trigger}
        burstRarity={confettiBurst.rarity}
      />

      {/* --- TOP BAR HEADER --- */}
      <header className="w-full max-w-md px-4 pt-4 pb-2 flex items-center justify-between z-20">
        <div>
          <h1 className="text-xl font-extrabold text-[#663322] flex items-center gap-1.5">
            <span>🐹</span> Hammy Gacha
          </h1>
          <p className="text-[11px] font-bold text-[#A08070] -mt-0.5">
            Collect tiny treasures!
          </p>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Coin Counter Pill */}
          <div className="bg-[#FFE8DF] border-2 border-[#FFC7DA] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs transition-transform active:scale-95">
            <span className="text-base animate-bounce">🪙</span>
            <span className="text-sm font-black text-[#663322]">
              {stats.coins}
            </span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              playClickSound(!stats.soundEnabled);
              handleToggleSound();
            }}
            className="p-2 bg-[#FFF8F1] border-2 border-[#FFD8C7] hover:border-[#FF9EAA] rounded-2xl text-sm transition-all cursor-pointer shadow-xs"
            title="Toggle Sound"
          >
            {stats.soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Settings / Daily Corner Button */}
          <button
            onClick={() => {
              playClickSound(stats.soundEnabled);
              setShowSettingsModal(true);
            }}
            className="p-2 bg-[#FFC7DA] hover:bg-[#FF9EAA] text-white rounded-2xl text-sm transition-all cursor-pointer shadow-xs font-bold"
            title="Settings & Daily Gift"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center p-4 z-10">
        {activeTab === 'gacha' && (
          <div className="w-full flex flex-col items-center justify-center gap-4 animate-fadeIn">
            {/* Stage: Gacha Machine + Hamster */}
            <div className="relative w-full flex items-center justify-center my-2">
              {/* Gacha Machine */}
              <GachaMachineSVG isSpinning={isSpinning} size={280} />

              {/* Chubby Hamster beside machine */}
              <div className="absolute -bottom-2 right-1 sm:right-4 z-20">
                <HamsterSVG
                  mood={hamsterMood}
                  soundEnabled={stats.soundEnabled}
                  size={145}
                />
              </div>
            </div>

            {/* Huge Spin Button */}
            <div className="w-full max-w-xs px-2 mt-2">
              <button
                disabled={isSpinning || stats.coins < 50}
                onClick={() => {
                  playClickSound(stats.soundEnabled);
                  handleSpinGacha();
                }}
                className={`w-full py-4 px-6 rounded-3xl font-black text-lg sm:text-xl shadow-lg border-b-4 transition-all duration-150 flex items-center justify-center gap-2 select-none cursor-pointer ${
                  isSpinning
                    ? 'bg-gray-300 border-gray-400 text-gray-500 scale-98 cursor-not-allowed'
                    : stats.coins < 50
                    ? 'bg-[#FFD8C7] border-[#FFB7A1] text-[#A08070] cursor-not-allowed opacity-80'
                    : 'bg-gradient-to-r from-[#FFC7DA] via-[#FF9EAA] to-[#FF6B81] border-[#E91E63] text-white hover:brightness-105 active:translate-y-1 active:border-b-0 animate-[bounce_2s_infinite_ease-in-out]'
                }`}
              >
                <span>🎁 Spin Gacha</span>
                <span className="text-xs bg-white/25 px-2.5 py-1 rounded-xl font-bold">
                  50 🪙
                </span>
              </button>

              {stats.coins < 50 && (
                <p className="text-xs text-center text-[#FF5E78] font-bold mt-2 animate-bounce">
                  Need more coins? Tap ⚙️ top right for daily gift!
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'collection' && (
          <CollectionBook stats={stats} soundEnabled={stats.soundEnabled} />
        )}
      </main>

      {/* --- BOTTOM NAVIGATION TABS --- */}
      <nav className="w-full max-w-md px-6 py-3 bg-[#FFF8F1]/90 backdrop-blur-md border-t-2 border-[#FFD8C7] flex items-center justify-around z-20">
        <button
          onClick={() => {
            playClickSound(stats.soundEnabled);
            setActiveTab('gacha');
          }}
          className={`flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'gacha'
              ? 'bg-[#FFC7DA] text-[#663322] font-black shadow-xs'
              : 'text-[#A08070] font-bold hover:text-[#663322]'
          }`}
        >
          <span className="text-xl">🎰</span>
          <span className="text-xs">Machine</span>
        </button>

        <button
          onClick={() => {
            playClickSound(stats.soundEnabled);
            setActiveTab('collection');
          }}
          className={`flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'collection'
              ? 'bg-[#FFC7DA] text-[#663322] font-black shadow-xs'
              : 'text-[#A08070] font-bold hover:text-[#663322]'
          }`}
        >
          <span className="text-xl">📖</span>
          <span className="text-xs">Collection</span>
        </button>
      </nav>

      {/* --- CAPSULE REVEAL MODAL --- */}
      {rolledCapsule && (
        <CapsuleModal
          item={rolledCapsule.item}
          isNew={rolledCapsule.isNew}
          soundEnabled={stats.soundEnabled}
          userCoins={stats.coins}
          onClose={() => {
            setRolledCapsule(null);
            setHamsterMood('idle');
          }}
          onSpinAgain={() => {
            setRolledCapsule(null);
            setHamsterMood('idle');
            handleSpinGacha();
          }}
          onTriggerConfetti={handleTriggerConfetti}
        />
      )}

      {/* --- SETTINGS & DAILY GIFTS MODAL --- */}
      {showSettingsModal && (
        <SettingsModal
          stats={stats}
          onToggleSound={handleToggleSound}
          onClaimDaily={handleClaimDaily}
          onPetHamster={handlePetHamster}
          onResetData={handleResetData}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}
