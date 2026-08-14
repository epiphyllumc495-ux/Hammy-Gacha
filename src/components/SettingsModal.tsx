import React, { useState } from 'react';
import { UserStats } from '../types';
import { playClickSound, playCoinSound } from '../utils/audio';

interface SettingsModalProps {
  stats: UserStats;
  onToggleSound: () => void;
  onClaimDaily: () => void;
  onPetHamster: () => void;
  onResetData: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  stats,
  onToggleSound,
  onClaimDaily,
  onPetHamster,
  onResetData,
  onClose,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Check if daily gift is claimable (e.g., last claim was > 24 hours ago, or never)
  const canClaimDaily = !stats.lastDailyClaim || (Date.now() - new Date(stats.lastDailyClaim).getTime() > 24 * 60 * 60 * 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF8F1] border-4 border-[#FFC7DA] rounded-3xl p-6 max-w-sm w-full text-center flex flex-col gap-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-[#A08070] hover:text-[#663322] font-bold text-lg cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-extrabold text-[#663322] flex items-center justify-center gap-2">
          <span>⚙️ Hammy Corner</span>
        </h2>

        {/* Daily Bonus Section */}
        <div className="bg-[#FFE8DF] border border-[#FFC7DA] rounded-2xl p-4 flex items-center justify-between">
          <div className="text-left">
            <div className="text-sm font-extrabold text-[#663322]">🎁 Daily Gift</div>
            <div className="text-xs text-[#A08070]">Claim +15 free coins daily!</div>
          </div>
          <button
            disabled={!canClaimDaily}
            onClick={() => {
              if (canClaimDaily) {
                playCoinSound(stats.soundEnabled);
                onClaimDaily();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              canClaimDaily
                ? 'bg-[#FF6B81] hover:bg-[#FF5252] text-white shadow cursor-pointer animate-pulse'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canClaimDaily ? 'Claim +15🪙' : 'Claimed ✨'}
          </button>
        </div>

        {/* Pet Hammy Action */}
        <div className="bg-[#FFF2E8] border border-[#FFD8C7] rounded-2xl p-4 flex items-center justify-between">
          <div className="text-left">
            <div className="text-sm font-extrabold text-[#663322]">🌻 Gentle Pat</div>
            <div className="text-xs text-[#A08070]">Give Hammy love (+2 coins)</div>
          </div>
          <button
            onClick={() => {
              playCoinSound(stats.soundEnabled);
              onPetHamster();
            }}
            className="px-4 py-2 bg-[#A8E6CF] hover:bg-[#8DE9C2] text-[#2D6A4F] rounded-xl text-xs font-extrabold cursor-pointer shadow-xs transition-transform active:scale-95"
          >
            Pat Hammy 💖
          </button>
        </div>

        {/* Audio Toggle */}
        <div className="bg-white/80 border border-[#FFD8C7] rounded-2xl p-4 flex items-center justify-between">
          <div className="text-left">
            <div className="text-sm font-bold text-[#663322]">🔊 Game Sounds</div>
            <div className="text-xs text-[#A08070]">
              {stats.soundEnabled ? 'Sound is turned ON' : 'Muted'}
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound(!stats.soundEnabled);
              onToggleSound();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              stats.soundEnabled
                ? 'bg-[#DCCEFF] text-[#4A3274]'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {stats.soundEnabled ? '🔊 ON' : '🔇 OFF'}
          </button>
        </div>

        {/* Reset Data Section */}
        <div className="pt-2 border-t border-[#FFD8C7]">
          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="text-xs font-bold text-red-400 hover:text-red-600 underline cursor-pointer py-1"
            >
              Reset Game Progress
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 p-3 rounded-2xl flex flex-col gap-2 text-left">
              <p className="text-xs font-bold text-red-600">
                Are you sure? This will reset all coins and unlocked treasures!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onResetData();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="flex-1 py-1.5 bg-red-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-1.5 bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
