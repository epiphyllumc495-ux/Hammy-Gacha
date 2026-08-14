import React, { useState, useEffect } from 'react';
import { HamsterMood } from '../types';
import { HAMSTER_QUOTES } from '../data/items';
import { playHamsterSqueak } from '../utils/audio';

interface HamsterSVGProps {
  mood?: HamsterMood;
  soundEnabled?: boolean;
  size?: number;
  className?: string;
}

export const HamsterSVG: React.FC<HamsterSVGProps> = ({
  mood = 'idle',
  soundEnabled = true,
  size = 180,
  className = '',
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [isWavingArm, setIsWavingArm] = useState(false);

  // Automatic periodic blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Periodic wave or quote
  useEffect(() => {
    if (mood === 'excited') {
      const randomQuote = HAMSTER_QUOTES[Math.floor(Math.random() * HAMSTER_QUOTES.length)];
      setSpeechBubble(randomQuote);
      const timer = setTimeout(() => setSpeechBubble(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mood]);

  const handleHamsterClick = () => {
    playHamsterSqueak(soundEnabled);
    setIsWavingArm(true);
    setTimeout(() => setIsWavingArm(false), 1200);

    const randomQuote = HAMSTER_QUOTES[Math.floor(Math.random() * HAMSTER_QUOTES.length)];
    setSpeechBubble(randomQuote);
    setTimeout(() => setSpeechBubble(null), 2500);
  };

  const isExcited = mood === 'excited';
  const isHappy = mood === 'happy' || mood === 'eating';

  return (
    <div
      onClick={handleHamsterClick}
      className={`relative inline-block cursor-pointer select-none group ${className}`}
      style={{ width: size, height: size }}
      title="Tap Hammy!"
    >
      {/* Speech Bubble */}
      {speechBubble && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 bg-white border-2 border-[#FFB7C5] px-3 py-1.5 rounded-2xl shadow-lg text-xs font-bold text-[#885544] animate-bounce whitespace-nowrap flex items-center gap-1">
          <span>💬</span>
          <span>{speechBubble}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-x-6 border-x-transparent border-t-6 border-t-white" />
        </div>
      )}

      {/* Main Hamster Container with Gentle Breathing Animation */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={`w-full h-full transition-transform duration-300 ${
          isExcited ? 'animate-bounce' : 'animate-[pulse_3s_infinite_ease-in-out]'
        }`}
      >
        <defs>
          <filter id="hammyShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#885544" floodOpacity="0.12" />
          </filter>
          <linearGradient id="furGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F9ECE0" />
            <stop offset="100%" stopColor="#E6C8B0" />
          </linearGradient>
          <linearGradient id="bellyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF2E8" />
          </linearGradient>
        </defs>

        <g filter="url(#hammyShadow)">
          {/* Shadow beneath body */}
          <ellipse cx="100" cy="180" rx="60" ry="12" fill="#D2B49C" opacity="0.3" />

          {/* Tiny Ears */}
          <g>
            {/* Left Ear */}
            <circle cx="55" cy="55" r="18" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" />
            <circle cx="55" cy="55" r="11" fill="#FFB7C5" />
            {/* Right Ear */}
            <circle cx="145" cy="55" r="18" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" />
            <circle cx="145" cy="55" r="11" fill="#FFB7C5" />
          </g>

          {/* Chubby Round Body */}
          <path
            d="M50 110 C40 60 160 60 150 110 C165 155 140 180 100 180 C60 180 35 155 50 110 Z"
            fill="url(#furGrad)"
            stroke="#D5B095"
            strokeWidth="3"
          />

          {/* Cream Fluffy Belly */}
          <path
            d="M68 115 C60 85 140 85 132 115 C140 155 125 172 100 172 C75 172 60 155 68 115 Z"
            fill="url(#bellyGrad)"
          />

          {/* Pink Chubby Cheeks */}
          <ellipse cx="62" cy="120" rx="14" ry="9" fill="#FFB7C5" opacity="0.75" />
          <ellipse cx="138" cy="120" rx="14" ry="9" fill="#FFB7C5" opacity="0.75" />

          {/* Sparkly Eyes */}
          {isBlinking || isHappy ? (
            /* Closed / Happy Squinting Eyes ^_^ */
            <g>
              <path d="M72 105 Q80 97 88 105" stroke="#3D291D" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M112 105 Q120 97 128 105" stroke="#3D291D" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            /* Open Sparkly Black Eyes */
            <g>
              {/* Left Eye */}
              <circle cx="80" cy="102" r="9" fill="#3D291D" />
              <circle cx="77" cy="99" r="3.5" fill="#FFFFFF" />
              <circle cx="83" cy="105" r="1.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle cx="120" cy="102" r="9" fill="#3D291D" />
              <circle cx="117" cy="99" r="3.5" fill="#FFFFFF" />
              <circle cx="123" cy="105" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute Tiny Nose */}
          <polygon points="97,112 103,112 100,116" fill="#FF80AB" />

          {/* Mouth */}
          {isExcited ? (
            /* Big open happy mouth :D */
            <path d="M93 116 Q100 130 107 116 Z" fill="#FF6B81" stroke="#3D291D" strokeWidth="1.5" />
          ) : (
            /* Cute 'w' mouth */
            <path
              d="M93 118 Q97 123 100 118 Q103 123 107 118"
              stroke="#3D291D"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Whiskers */}
          <g stroke="#C9A080" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
            <line x1="42" y1="118" x2="25" y2="114" />
            <line x1="42" y1="123" x2="22" y2="125" />
            <line x1="158" y1="118" x2="175" y2="114" />
            <line x1="158" y1="123" x2="178" y2="125" />
          </g>

          {/* Tiny Paws */}
          {isExcited || isWavingArm ? (
            /* Raised Paws Waving! */
            <g className="animate-wiggle">
              <ellipse cx="65" cy="92" rx="8" ry="12" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" transform="rotate(-30 65 92)" />
              <ellipse cx="135" cy="92" rx="8" ry="12" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" transform="rotate(30 135 92)" />
            </g>
          ) : (
            /* Folded Tiny Paws on Belly */
            <g>
              <ellipse cx="82" cy="142" rx="9" ry="7" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" />
              <ellipse cx="118" cy="142" rx="9" ry="7" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" />
            </g>
          )}

          {/* Tiny Feet */}
          <ellipse cx="70" cy="176" rx="12" ry="6" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" />
          <ellipse cx="130" cy="176" rx="12" ry="6" fill="#E6C8B0" stroke="#C9A080" strokeWidth="2" />

          {/* Sunflower seed if eating */}
          {mood === 'eating' && (
            <path d="M100 135 C92 128 92 145 100 148 C108 145 108 128 100 135 Z" fill="#3D3A45" stroke="#E0A96D" strokeWidth="2" />
          )}
        </g>
      </svg>
    </div>
  );
};
