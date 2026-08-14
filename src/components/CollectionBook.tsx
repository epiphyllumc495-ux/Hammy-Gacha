import React, { useState } from 'react';
import { GachaItem, Rarity, UserStats } from '../types';
import { GACHA_ITEMS } from '../data/items';
import { ItemSVG } from './ItemSVG';
import { playClickSound } from '../utils/audio';

interface CollectionBookProps {
  stats: UserStats;
  soundEnabled: boolean;
}

export const CollectionBook: React.FC<CollectionBookProps> = ({ stats, soundEnabled }) => {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItemModal, setActiveItemModal] = useState<GachaItem | null>(null);

  const collectedCount = Object.keys(stats.itemsCollected).filter(
    (id) => (stats.itemsCollected[Number(id)] || 0) > 0
  ).length;

  const totalCount = GACHA_ITEMS.length; // 50 items
  const completionPercentage = Math.round((collectedCount / totalCount) * 100);

  const filteredItems = GACHA_ITEMS.filter((item) => {
    const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRarity && matchesSearch;
  });

  const getRarityBadgeStyle = (rarity: Rarity) => {
    switch (rarity) {
      case 'common':
        return 'bg-[#E2ECE9] text-[#2D6A4F]';
      case 'rare':
        return 'bg-[#D7ECFF] text-[#1E40AF]';
      case 'epic':
        return 'bg-[#F3E8FF] text-[#6B21A8]';
      case 'legendary':
        return 'bg-[#FEF3C7] text-[#92400E]';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-4">
      {/* Header & Progress Card */}
      <div className="bg-[#FFF8F1] border-2 border-[#FFD8C7] rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#663322] flex items-center gap-2">
              <span>📖 Treasure Album</span>
            </h2>
            <p className="text-xs text-[#A08070] font-medium">
              Collect all 50 kawaii treasures!
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#FF6B81]">
              {collectedCount} <span className="text-sm text-[#A08070] font-bold">/ {totalCount}</span>
            </span>
            <div className="text-[10px] font-bold text-[#885544] uppercase tracking-wider">
              {completionPercentage}% Complete
            </div>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="w-full h-4 bg-[#FFE8DF] rounded-full overflow-hidden p-0.5 border border-[#FFC7DA]">
          <div
            className="h-full bg-gradient-to-r from-[#FFC7DA] via-[#FF9EAA] to-[#FF6B81] rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        {/* Rarity Filter Buttons */}
        <div className="flex items-center gap-1 bg-[#FFF8F1] p-1.5 rounded-2xl border border-[#FFD8C7] overflow-x-auto w-full sm:w-auto">
          {(['all', 'common', 'rare', 'epic', 'legendary'] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                playClickSound(soundEnabled);
                setSelectedRarity(r);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all capitalize whitespace-nowrap cursor-pointer ${
                selectedRarity === r
                  ? 'bg-[#FF6B81] text-white shadow-xs'
                  : 'text-[#885544] hover:bg-[#FFD8C7]/50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-48 px-3.5 py-1.5 text-xs bg-[#FFF8F1] border border-[#FFD8C7] rounded-xl focus:outline-none focus:border-[#FF6B81] text-[#663322]"
        />
      </div>

      {/* 50 Items Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {filteredItems.map((item) => {
          const count = stats.itemsCollected[item.id] || 0;
          const isUnlocked = count > 0;

          return (
            <div
              key={item.id}
              onClick={() => {
                playClickSound(soundEnabled);
                if (isUnlocked) setActiveItemModal(item);
              }}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all select-none ${
                isUnlocked
                  ? 'bg-[#FFF8F1] border-[#FFD8C7] hover:border-[#FF9EAA] hover:scale-105 cursor-pointer shadow-xs'
                  : 'bg-[#F3EFEA]/80 border-[#E5DDD5] opacity-70'
              }`}
            >
              {/* Item Index # */}
              <span className="absolute top-1.5 left-2 text-[10px] font-bold text-[#B09888]">
                #{item.id}
              </span>

              {/* Rarity Tag */}
              <span
                className={`absolute top-1.5 right-1.5 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase ${getRarityBadgeStyle(
                  item.rarity
                )}`}
              >
                {item.rarity[0]}
              </span>

              {/* Icon */}
              <div className="my-3">
                <ItemSVG itemId={item.id} size={48} locked={!isUnlocked} />
              </div>

              {/* Name */}
              <span className="text-xs font-bold text-[#663322] text-center line-clamp-1 w-full">
                {isUnlocked ? item.name : '???'}
              </span>

              {/* Count Badge if multiple */}
              {isUnlocked && count > 1 && (
                <span className="mt-1 text-[10px] font-bold bg-[#FFD8C7] text-[#885544] px-2 py-0.5 rounded-full">
                  x{count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Item Inspection Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFF8F1] border-4 border-[#FFC7DA] rounded-3xl p-6 max-w-xs w-full text-center flex flex-col items-center shadow-2xl relative">
            <button
              onClick={() => setActiveItemModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold p-1"
            >
              ✕
            </button>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase mb-2 ${getRarityBadgeStyle(
                activeItemModal.rarity
              )}`}
            >
              {activeItemModal.rarity}
            </span>

            <div className="w-28 h-28 my-2 flex items-center justify-center bg-[#FFD8C7]/40 rounded-2xl border border-[#FFC7DA]">
              <ItemSVG itemId={activeItemModal.id} size={80} />
            </div>

            <h3 className="text-xl font-extrabold text-[#663322] mt-1">
              {activeItemModal.name}
            </h3>

            <p className="text-xs font-semibold text-[#A08070] mb-2">
              Category: {activeItemModal.category} • Collected: {stats.itemsCollected[activeItemModal.id] || 0} times
            </p>

            <p className="text-xs text-[#885544] italic bg-white/80 p-3 rounded-xl border border-[#FFD8C7] w-full mb-4">
              "{activeItemModal.description}"
            </p>

            <button
              onClick={() => setActiveItemModal(null)}
              className="w-full py-2.5 bg-[#FF9EAA] hover:bg-[#FF6B81] text-white font-bold rounded-2xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
