import React, { useState } from 'react';
import { GachaItem } from '../types';
import { ItemSVG } from './ItemSVG';
import { playPopSound, playFanfareSound, playClickSound } from '../utils/audio';

interface CapsuleModalProps {
  item: GachaItem;
  isNew: boolean;
  soundEnabled: boolean;
  userCoins: number;
  onClose: () => void;
  onSpinAgain: () => void;
  onTriggerConfetti: (rarity: GachaItem['rarity']) => void;
}

export const CapsuleModal: React.FC<CapsuleModalProps> = ({
  item,
  isNew,
  soundEnabled,
  userCoins,
  onClose,
  onSpinAgain,
  onTriggerConfetti,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCapsule = () => {
    if (isOpen) return;
    playPopSound(soundEnabled);
    playFanfareSound(item.rarity, soundEnabled);
    onTriggerConfetti(item.rarity);
    setIsOpen(true);
  };

  const getRarityBadgeStyle = (rarity: GachaItem['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-[#E2ECE9] text-[#2D6A4F] border-[#A8E6CF]';
      case 'rare':
        return 'bg-[#D7ECFF] text-[#1E40AF] border-[#A0C4FF]';
      case 'epic':
        return 'bg-[#F3E8FF] text-[#6B21A8] border-[#D8B4FE]';
      case 'legendary':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] animate-pulse';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#FFF8F1] border-4 border-[#FFC7DA] rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
        {!isOpen ? (
          /* Step 1: Unopened Wiggling Capsule */
          <div
            onClick={handleOpenCapsule}
            className="flex flex-col items-center cursor-pointer my-6 group select-none"
          >
            <div className="text-xs font-bold text-[#885544] mb-3 bg-[#FFD8C7] px-3 py-1 rounded-full animate-bounce">
              ✨ Tap to open capsule! ✨
            </div>

            {/* Kawaii Capsule SVG */}
            <div className="w-36 h-36 relative transition-transform duration-200 group-hover:scale-105 animate-wiggle">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                {/* Top Half */}
                <path d="M15 50 C15 20 85 20 85 50 Z" fill={item.color} stroke="#333" strokeWidth="3" />
                {/* Bottom Half */}
                <path d="M15 50 C15 80 85 80 85 50 Z" fill="#FFFFFF" stroke="#333" strokeWidth="3" />
                {/* Seam */}
                <line x1="12" y1="50" x2="88" y2="50" stroke="#333" strokeWidth="4" />
                {/* Highlight */}
                <ellipse cx="35" cy="32" rx="10" ry="5" fill="#FFF" opacity="0.6" />
              </svg>
            </div>

            <p className="text-xs text-[#A08070] mt-4 font-medium">
              Touch the capsule to pop it open!
            </p>
          </div>
        ) : (
          /* Step 2: Opened Item Reveal */
          <div className="flex flex-col items-center w-full animate-scaleUp">
            {/* Rarity & New Badge Header */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getRarityBadgeStyle(
                  item.rarity
                )}`}
              >
                {item.rarity}
              </span>
              {isNew && (
                <span className="text-xs font-extrabold bg-[#FF5E78] text-white px-2.5 py-0.5 rounded-full animate-bounce shadow">
                  🎉 NEW! +5🪙
                </span>
              )}
            </div>

            {/* Glowing Backdrop for Item */}
            <div className="relative w-40 h-40 flex items-center justify-center my-2 bg-gradient-to-b from-[#FFD8C7]/50 to-[#FFC7DA]/30 rounded-3xl border-2 border-dashed border-[#FFB7C5]">
              <ItemSVG itemId={item.id} size={110} className="animate-bounce" />
            </div>

            {/* Item Info */}
            <h3 className="text-2xl font-black text-[#663322] mt-2 mb-1 flex items-center gap-1">
              {item.name}
            </h3>
            <p className="text-xs font-bold text-[#A07060] mb-3 bg-[#FFE8DF] px-3 py-1 rounded-full">
              Category: {item.category}
            </p>
            <p className="text-sm text-[#885544] italic mb-6 px-4 bg-white/70 py-2 rounded-xl border border-[#FFD8C7] w-full">
              "{item.description}"
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              {userCoins >= 50 && (
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    onSpinAgain();
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#FF9EAA] to-[#FF6B81] hover:brightness-105 active:scale-95 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>🎁 Spin Again</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs">50 🪙</span>
                </button>
              )}

              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-[#DCCEFF] hover:bg-[#C4B2FF] active:scale-95 text-[#4A3274] font-bold rounded-2xl transition-all text-sm cursor-pointer border border-[#B5A0FD]"
              >
                Keep Treasure 💖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
