import React from 'react';

interface GachaMachineSVGProps {
  isSpinning?: boolean;
  className?: string;
  size?: number;
}

export const GachaMachineSVG: React.FC<GachaMachineSVGProps> = ({
  isSpinning = false,
  className = '',
  size = 320,
}) => {
  return (
    <div
      className={`relative inline-block select-none transition-transform duration-200 ${
        isSpinning ? 'animate-[bounce_0.3s_infinite_ease-in-out]' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.25 }}
    >
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 320 400"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <filter id="machineShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#885544" floodOpacity="0.15" />
          </filter>
          <linearGradient id="globeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="machineBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC7DA" />
            <stop offset="100%" stopColor="#FF94B8" />
          </linearGradient>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCCEFF" />
            <stop offset="100%" stopColor="#B5A0FD" />
          </linearGradient>
          <linearGradient id="goldPlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="100%" stopColor="#FFB703" />
          </linearGradient>
        </defs>

        <g filter="url(#machineShadow)">
          {/* Base Stand Shadow */}
          <ellipse cx="160" cy="385" rx="120" ry="12" fill="#D2B49C" opacity="0.35" />

          {/* Machine Lower Base Stand */}
          <rect x="50" y="340" width="220" height="40" rx="20" fill="url(#baseGrad)" stroke="#A088F0" strokeWidth="3" />

          {/* Machine Main Lower Body */}
          <rect x="60" y="190" width="200" height="160" rx="24" fill="url(#machineBodyGrad)" stroke="#FF6090" strokeWidth="4" />

          {/* Front Plate Accent Box */}
          <rect x="85" y="210" width="150" height="110" rx="16" fill="#FFF8F1" stroke="#FFD8C7" strokeWidth="3" />

          {/* Crank Mechanism Plate */}
          <circle cx="160" cy="255" r="32" fill="url(#goldPlate)" stroke="#E59866" strokeWidth="3" />
          <circle cx="160" cy="255" r="22" fill="#FFFFFF" />

          {/* Crank Turning Handle */}
          <g
            className={`origin-[160px_255px] transition-transform duration-300 ${
              isSpinning ? 'animate-[spin_0.4s_linear_infinite]' : ''
            }`}
          >
            <rect x="145" y="250" width="30" height="10" rx="5" fill="#FF80AB" stroke="#E91E63" strokeWidth="2" />
            <circle cx="170" cy="255" r="7" fill="#FFC7DA" stroke="#E91E63" strokeWidth="2" />
          </g>

          {/* Coin Slot */}
          <rect x="110" y="225" width="24" height="6" rx="3" fill="#666" />
          <text x="122" y="242" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#885544">50🪙</text>

          {/* Delivery Chute Output Door */}
          <path d="M120 320 C120 295 200 295 200 320 L195 345 L125 345 Z" fill="#3D291D" stroke="#5D4037" strokeWidth="3" />
          <path d="M125 320 C125 302 195 302 195 320 L190 338 L130 338 Z" fill="#22150C" />

          {/* Floating Chute flap */}
          <path d="M122 300 H198 L194 322 H126 Z" fill="#FFD8C7" stroke="#FFB7A1" strokeWidth="2" opacity="0.9" />

          {/* --- Clear Glass Capsule Globe --- */}
          <circle cx="160" cy="115" r="95" fill="url(#globeGrad)" stroke="#CFF5E7" strokeWidth="5" />
          <ellipse cx="160" cy="205" rx="85" ry="12" fill="#CFF5E7" stroke="#8DE9C2" strokeWidth="3" />

          {/* Globe Top Roof Cap */}
          <path d="M90 40 Q160 10 230 40 L235 52 L85 52 Z" fill="url(#baseGrad)" stroke="#A088F0" strokeWidth="3" />
          <circle cx="160" cy="18" r="12" fill="#FFC7DA" stroke="#FF80AB" strokeWidth="3" />

          {/* --- Bouncing Capsules Inside Glass Dome --- */}
          <g className={isSpinning ? 'animate-bounce' : ''}>
            {/* Capsule 1: Pink & Cream */}
            <g transform="translate(115, 130) rotate(-20)">
              <rect x="0" y="0" width="34" height="17" rx="8.5" fill="#FF94B8" />
              <rect x="0" y="17" width="34" height="17" rx="8.5" fill="#FFF" />
              <line x1="0" y1="17" x2="34" y2="17" stroke="#FF80AB" strokeWidth="2" />
            </g>

            {/* Capsule 2: Blue & Mint */}
            <g transform="translate(160, 120) rotate(35)">
              <rect x="0" y="0" width="34" height="17" rx="8.5" fill="#70A6FF" />
              <rect x="0" y="17" width="34" height="17" rx="8.5" fill="#CFF5E7" />
              <line x1="0" y1="17" x2="34" y2="17" stroke="#56C596" strokeWidth="2" />
            </g>

            {/* Capsule 3: Lavender & Yellow */}
            <g transform="translate(130, 80) rotate(10)">
              <rect x="0" y="0" width="34" height="17" rx="8.5" fill="#DCCEFF" />
              <rect x="0" y="17" width="34" height="17" rx="8.5" fill="#FFEAA7" />
              <line x1="0" y1="17" x2="34" y2="17" stroke="#B5A0FD" strokeWidth="2" />
            </g>

            {/* Capsule 4: Peach & Gold */}
            <g transform="translate(175, 150) rotate(-45)">
              <rect x="0" y="0" width="34" height="17" rx="8.5" fill="#FFD8C7" />
              <rect x="0" y="17" width="34" height="17" rx="8.5" fill="#FFD166" />
              <line x1="0" y1="17" x2="34" y2="17" stroke="#F4A261" strokeWidth="2" />
            </g>

            {/* Capsule 5: Mint & Pink */}
            <g transform="translate(90, 155) rotate(50)">
              <rect x="0" y="0" width="34" height="17" rx="8.5" fill="#A8E6CF" />
              <rect x="0" y="17" width="34" height="17" rx="8.5" fill="#FFC7DA" />
              <line x1="0" y1="17" x2="34" y2="17" stroke="#56C596" strokeWidth="2" />
            </g>

            {/* Capsule 6: Legendary Gold Star Capsule */}
            <g transform="translate(138, 158) rotate(-10)">
              <rect x="0" y="0" width="34" height="17" rx="8.5" fill="#FFF275" />
              <rect x="0" y="17" width="34" height="17" rx="8.5" fill="#FF9F1C" />
              <line x1="0" y1="17" x2="34" y2="17" stroke="#FFB703" strokeWidth="2" />
              <circle cx="17" cy="17" r="4" fill="#FFF" />
            </g>
          </g>

          {/* Glass Specular Highlights */}
          <path d="M90 65 C110 50 140 45 160 45" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.6" fill="none" />
          <circle cx="215" cy="85" r="8" fill="#FFFFFF" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};
