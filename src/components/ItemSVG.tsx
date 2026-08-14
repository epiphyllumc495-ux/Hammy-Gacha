import React from 'react';

interface ItemSVGProps {
  itemId: number;
  className?: string;
  size?: number | string;
  locked?: boolean;
}

export const ItemSVG: React.FC<ItemSVGProps> = ({
  itemId,
  className = '',
  size = 64,
  locked = false,
}) => {
  if (locked) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={`select-none ${className}`}
      >
        <rect width="100" height="100" rx="20" fill="#E2ECE9" opacity="0.6" />
        <path
          d="M50 25 C38 25 35 38 45 48 C50 53 50 58 50 62 M50 72 A3 3 0 1 1 50 78 A3 3 0 1 1 50 72"
          stroke="#94A3B8"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`select-none ${className}`}
    >
      <defs>
        <filter id={`shadow-${itemId}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#885544" floodOpacity="0.15" />
        </filter>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="100%" stopColor="#FF9F1C" />
        </linearGradient>
      </defs>

      <g filter={`url(#shadow-${itemId})`}>
        {renderItemContent(itemId)}
      </g>
    </svg>
  );
};

function renderItemContent(id: number) {
  switch (id) {
    case 1: // Strawberry
      return (
        <g>
          <path d="M50 22 C25 22 18 50 28 80 C36 94 64 94 72 80 C82 50 75 22 50 22 Z" fill="#FF5252" />
          <path d="M50 18 C40 10 32 24 50 25 C68 24 60 10 50 18 Z" fill="#52B788" />
          <path d="M50 12 L50 22" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round" />
          {/* Seeds */}
          <circle cx="40" cy="40" r="2" fill="#FFEAA7" />
          <circle cx="60" cy="40" r="2" fill="#FFEAA7" />
          <circle cx="50" cy="55" r="2" fill="#FFEAA7" />
          <circle cx="36" cy="65" r="2" fill="#FFEAA7" />
          <circle cx="64" cy="65" r="2" fill="#FFEAA7" />
          <circle cx="50" cy="78" r="2" fill="#FFEAA7" />
          {/* Cute face */}
          <circle cx="44" cy="48" r="2" fill="#333" />
          <circle cx="56" cy="48" r="2" fill="#333" />
          <path d="M47 52 Q50 55 53 52" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case 2: // Cookie
      return (
        <g>
          <circle cx="50" cy="50" r="36" fill="#E8A87C" stroke="#D48B5A" strokeWidth="3" />
          {/* Chocolate chips */}
          <circle cx="36" cy="35" r="5" fill="#5D4037" />
          <circle cx="62" cy="32" r="6" fill="#5D4037" />
          <circle cx="30" cy="60" r="5" fill="#5D4037" />
          <circle cx="68" cy="62" r="5" fill="#5D4037" />
          <circle cx="50" cy="42" r="4" fill="#5D4037" />
          <circle cx="52" cy="72" r="5" fill="#5D4037" />
          {/* Face */}
          <ellipse cx="44" cy="52" rx="2" ry="3" fill="#333" />
          <ellipse cx="56" cy="52" rx="2" ry="3" fill="#333" />
          <path d="M47 58 Q50 61 53 58" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case 3: // Sock
      return (
        <g>
          <path d="M35 20 L65 20 L65 60 C65 75 55 85 40 85 L30 85 C22 85 18 78 22 70 L35 55 Z" fill="#FFC7DA" stroke="#FF94B8" strokeWidth="3" />
          <path d="M35 20 L65 20" stroke="#FF80AB" strokeWidth="6" strokeLinecap="round" />
          <path d="M35 35 L65 35" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M35 48 L65 48" stroke="#FFFFFF" strokeWidth="5" />
          <circle cx="32" cy="76" r="3" fill="#333" />
          <circle cx="42" cy="76" r="3" fill="#333" />
        </g>
      );

    case 4: // Tiny Leaf
      return (
        <g>
          <path d="M50 15 C20 35 20 75 50 85 C80 75 80 35 50 15 Z" fill="#A8E6CF" stroke="#56C596" strokeWidth="3" />
          <path d="M50 85 L50 95" stroke="#56C596" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 25 L50 75" stroke="#56C596" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M50 40 Q35 35 30 38" stroke="#56C596" strokeWidth="2" fill="none" />
          <path d="M50 50 Q65 45 70 48" stroke="#56C596" strokeWidth="2" fill="none" />
          <path d="M50 60 Q35 55 30 58" stroke="#56C596" strokeWidth="2" fill="none" />
        </g>
      );

    case 5: // Milk Carton
      return (
        <g>
          <polygon points="30,35 50,20 70,35 70,85 30,85" fill="#FFD8C7" stroke="#FFB7A1" strokeWidth="3" />
          <polygon points="30,35 50,35 70,35 50,20" fill="#FFC7DA" />
          <rect x="38" y="45" width="24" height="24" rx="4" fill="#FFFFFF" />
          {/* Strawberry icon on carton */}
          <path d="M50 50 C44 50 42 58 46 64 C48 67 52 67 54 64 C58 58 56 50 50 50 Z" fill="#FF6B81" />
        </g>
      );

    case 6: // Acorn
      return (
        <g>
          <path d="M30 40 C30 75 50 85 50 85 C50 85 70 75 70 40 Z" fill="#D4A373" stroke="#A67C52" strokeWidth="3" />
          <path d="M26 30 C26 22 74 22 74 30 C74 42 26 42 26 30 Z" fill="#886043" stroke="#5C3D2E" strokeWidth="3" />
          <path d="M50 22 L50 12" stroke="#5C3D2E" strokeWidth="4" strokeLinecap="round" />
          <circle cx="44" cy="55" r="2.5" fill="#333" />
          <circle cx="56" cy="55" r="2.5" fill="#333" />
          <path d="M47 60 Q50 63 53 60" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case 7: // Cherry Pair
      return (
        <g>
          <path d="M50 15 Q30 25 32 50" stroke="#52B788" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M50 15 Q70 25 68 50" stroke="#52B788" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M50 12 Q52 8 58 12" stroke="#52B788" strokeWidth="3" fill="none" />
          <circle cx="32" cy="62" r="18" fill="#FF5E78" stroke="#D81B60" strokeWidth="3" />
          <circle cx="68" cy="62" r="18" fill="#FF5E78" stroke="#D81B60" strokeWidth="3" />
          <circle cx="26" cy="56" r="4" fill="#FFFFFF" opacity="0.6" />
          <circle cx="62" cy="56" r="4" fill="#FFFFFF" opacity="0.6" />
        </g>
      );

    case 8: // Mushroom
      return (
        <g>
          <path d="M20 50 C20 20 80 20 80 50 Z" fill="#FF6B6B" stroke="#D63031" strokeWidth="3" />
          <rect x="38" y="50" width="24" height="35" rx="8" fill="#FFF8F1" stroke="#E2C9B6" strokeWidth="3" />
          {/* White spots */}
          <circle cx="35" cy="35" r="6" fill="#FFFFFF" />
          <circle cx="65" cy="35" r="6" fill="#FFFFFF" />
          <circle cx="50" cy="26" r="5" fill="#FFFFFF" />
          {/* Face */}
          <circle cx="45" cy="62" r="2.5" fill="#333" />
          <circle cx="55" cy="62" r="2.5" fill="#333" />
          <path d="M47 67 Q50 70 53 67" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case 9: // Glazed Donut
      return (
        <g>
          <circle cx="50" cy="50" r="35" fill="#F7D070" stroke="#E5A93C" strokeWidth="3" />
          <path d="M50 18 C70 18 82 32 82 50 C82 62 70 82 50 82 C32 82 18 68 18 50 C18 32 30 18 50 18 Z" fill="#FFB7C5" opacity="0.9" />
          <circle cx="50" cy="50" r="14" fill="#FFF8F1" stroke="#E5A93C" strokeWidth="3" />
          {/* Sprinkles */}
          <rect x="30" y="32" width="6" height="3" rx="1.5" fill="#FF5E78" transform="rotate(25 30 32)" />
          <rect x="62" y="30" width="6" height="3" rx="1.5" fill="#A8E6CF" transform="rotate(-30 62 30)" />
          <rect x="68" y="55" width="6" height="3" rx="1.5" fill="#FDFFB6" transform="rotate(45 68 55)" />
          <rect x="25" y="58" width="6" height="3" rx="1.5" fill="#DCCEFF" transform="rotate(-15 25 58)" />
        </g>
      );

    case 10: // Tea Cup
      return (
        <g>
          <path d="M22 35 L78 35 L72 75 C70 82 60 85 50 85 C40 85 30 82 28 75 Z" fill="#D7ECFF" stroke="#70A6FF" strokeWidth="3" />
          <path d="M76 42 C88 42 88 65 74 65" stroke="#70A6FF" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="50" cy="35" rx="28" ry="6" fill="#FFE0A3" stroke="#70A6FF" strokeWidth="2" />
          {/* Steam */}
          <path d="M42 25 Q38 18 42 12" stroke="#A0C4FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M58 25 Q62 18 58 12" stroke="#A0C4FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );

    case 11: // Soft Pretzel
      return (
        <g>
          <path
            d="M30 65 C15 45 35 25 50 42 C65 25 85 45 70 65 C55 80 45 80 30 65 Z"
            fill="#DDA15E"
            stroke="#BC6C25"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <circle cx="35" cy="45" r="1.5" fill="#FFF" />
          <circle cx="65" cy="45" r="1.5" fill="#FFF" />
          <circle cx="50" cy="55" r="1.5" fill="#FFF" />
          <circle cx="42" cy="35" r="1.5" fill="#FFF" />
          <circle cx="58" cy="35" r="1.5" fill="#FFF" />
        </g>
      );

    case 12: // Lollipop
      return (
        <g>
          <path d="M50 55 L50 90" stroke="#FFF" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="38" r="26" fill="#FF9EAA" stroke="#FF5E78" strokeWidth="3" />
          <path
            d="M50 38 Q50 20 62 28 Q70 38 58 46 Q42 50 38 38 Q36 22 50 16"
            stroke="#FFF8F1"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      );

    case 13: // Cheese Wedge
      return (
        <g>
          <polygon points="15,70 85,70 70,30 15,70" fill="#FFD166" stroke="#F4A261" strokeWidth="3" />
          <polygon points="15,70 70,30 35,22 15,70" fill="#FFE29A" stroke="#F4A261" strokeWidth="3" />
          {/* Holes */}
          <circle cx="40" cy="58" r="5" fill="#F4A261" opacity="0.6" />
          <circle cx="62" cy="62" r="4" fill="#F4A261" opacity="0.6" />
          <circle cx="35" cy="40" r="3" fill="#F4A261" opacity="0.6" />
        </g>
      );

    case 14: // Orange Slice
      return (
        <g>
          <path d="M15 45 C15 78 85 78 85 45 Z" fill="#FF9F1C" stroke="#E07A5F" strokeWidth="3" />
          <path d="M22 45 C22 72 78 72 78 45 Z" fill="#FFE5B4" />
          <path d="M26 47 C26 68 74 68 74 47 Z" fill="#FF9F1C" />
          <line x1="50" y1="47" x2="50" y2="68" stroke="#FFE5B4" strokeWidth="2.5" />
          <line x1="50" y1="47" x2="32" y2="62" stroke="#FFE5B4" strokeWidth="2" />
          <line x1="50" y1="47" x2="68" y2="62" stroke="#FFE5B4" strokeWidth="2" />
        </g>
      );

    case 15: // Onigiri
      return (
        <g>
          <path d="M50 18 Q20 78 28 82 Q50 86 72 82 Q80 78 50 18 Z" fill="#FFFFFF" stroke="#E2ECE9" strokeWidth="3" />
          <rect x="36" y="58" width="28" height="24" rx="4" fill="#2B2D42" />
          <circle cx="43" cy="45" r="2.5" fill="#333" />
          <circle cx="57" cy="45" r="2.5" fill="#333" />
          <path d="M47 49 Q50 52 53 49" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case 16: // Fried Egg
      return (
        <g>
          <path d="M30 25 C15 35 15 65 30 80 C50 90 80 85 85 65 C90 45 75 20 50 20 C40 20 35 20 30 25 Z" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="3" />
          <circle cx="52" cy="52" r="18" fill="#FFB703" stroke="#FB8500" strokeWidth="3" />
          <circle cx="46" cy="46" r="4" fill="#FFFFFF" opacity="0.6" />
        </g>
      );

    case 17: // Avocado
      return (
        <g>
          <path d="M50 15 C32 15 22 45 22 68 C22 84 34 90 50 90 C66 90 78 84 78 68 C78 45 68 15 50 15 Z" fill="#386641" stroke="#2B4632" strokeWidth="3" />
          <path d="M50 22 C36 22 28 48 28 68 C28 80 38 84 50 84 C62 84 72 80 72 68 C72 48 64 22 50 22 Z" fill="#A7C957" />
          <circle cx="50" cy="65" r="13" fill="#6B705C" stroke="#4A4E3D" strokeWidth="3" />
          <circle cx="46" cy="61" r="3" fill="#FFFFFF" opacity="0.5" />
        </g>
      );

    case 18: // Peach
      return (
        <g>
          <path d="M50 20 C25 20 18 50 28 75 C38 90 62 90 72 75 C82 50 75 20 50 20 Z" fill="#FFD8C7" stroke="#FF94B8" strokeWidth="3" />
          <path d="M50 20 Q50 55 52 78" stroke="#FF94B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M50 20 Q40 10 30 18 Q42 22 50 20 Z" fill="#81C784" />
          <circle cx="40" cy="50" r="2.5" fill="#333" />
          <circle cx="60" cy="50" r="2.5" fill="#333" />
          <path d="M47 55 Q50 58 53 55" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case 19: // Watermelon
      return (
        <g>
          <path d="M15 35 L85 35 C85 75 15 75 15 35 Z" fill="#2D6A4F" stroke="#1B4332" strokeWidth="3" />
          <path d="M19 35 L81 35 C81 70 19 70 19 35 Z" fill="#FFFFFF" />
          <path d="M23 35 L77 35 C77 65 23 65 23 35 Z" fill="#FF5E78" />
          {/* Seeds */}
          <ellipse cx="35" cy="45" rx="1.5" ry="3" fill="#333" />
          <ellipse cx="50" cy="50" rx="1.5" ry="3" fill="#333" />
          <ellipse cx="65" cy="45" rx="1.5" ry="3" fill="#333" />
        </g>
      );

    case 20: // Ribbon Bow
      return (
        <g>
          <path d="M50 45 C35 25 15 35 25 55 C35 65 48 52 50 48 Z" fill="#FFC7DA" stroke="#FF80AB" strokeWidth="3" />
          <path d="M50 45 C65 25 85 35 75 55 C65 65 52 52 50 48 Z" fill="#FFC7DA" stroke="#FF80AB" strokeWidth="3" />
          <path d="M42 52 L32 80 L45 72 L50 82 L55 72 L68 80 L58 52 Z" fill="#FF94B8" />
          <circle cx="50" cy="48" r="8" fill="#FF80AB" stroke="#E91E63" strokeWidth="2" />
        </g>
      );

    case 21: // Bandage
      return (
        <g>
          <rect x="20" y="38" width="60" height="24" rx="12" fill="#FFD8C7" stroke="#E59866" strokeWidth="3" transform="rotate(-15 50 50)" />
          <rect x="42" y="38" width="16" height="24" fill="#FFF8F1" transform="rotate(-15 50 50)" />
          <path d="M50 46 C48 42 45 46 50 52 C55 46 52 42 50 46 Z" fill="#FF5E78" transform="rotate(-15 50 50)" />
        </g>
      );

    case 22: // Paper Airplane
      return (
        <g>
          <polygon points="15,45 85,20 50,80 42,55" fill="#D7ECFF" stroke="#70A6FF" strokeWidth="3" />
          <polygon points="85,20 42,55 50,80" fill="#A0C4FF" />
          <line x1="15" y1="45" x2="42" y2="55" stroke="#70A6FF" strokeWidth="2" />
        </g>
      );

    case 23: // Tiny Flower
      return (
        <g>
          <circle cx="50" cy="30" r="12" fill="#FFADAD" />
          <circle cx="70" cy="50" r="12" fill="#FFADAD" />
          <circle cx="62" cy="70" r="12" fill="#FFADAD" />
          <circle cx="38" cy="70" r="12" fill="#FFADAD" />
          <circle cx="30" cy="50" r="12" fill="#FFADAD" />
          <circle cx="50" cy="50" r="12" fill="#FFD166" stroke="#F4A261" strokeWidth="2" />
        </g>
      );

    case 24: // Seashell
      return (
        <g>
          <path d="M20 70 C20 30 80 30 80 70 L50 85 Z" fill="#FFD8C7" stroke="#E59866" strokeWidth="3" />
          <line x1="50" y1="85" x2="30" y2="40" stroke="#E59866" strokeWidth="2" />
          <line x1="50" y1="85" x2="50" y2="35" stroke="#E59866" strokeWidth="2" />
          <line x1="50" y1="85" x2="70" y2="40" stroke="#E59866" strokeWidth="2" />
        </g>
      );

    case 25: // Button
      return (
        <g>
          <circle cx="50" cy="50" r="32" fill="#DCCEFF" stroke="#B5A0FD" strokeWidth="4" />
          <circle cx="50" cy="50" r="24" fill="#E8DDFF" stroke="#B5A0FD" strokeWidth="2" />
          <circle cx="42" cy="42" r="3" fill="#B5A0FD" />
          <circle cx="58" cy="42" r="3" fill="#B5A0FD" />
          <circle cx="42" cy="58" r="3" fill="#B5A0FD" />
          <circle cx="58" cy="58" r="3" fill="#B5A0FD" />
        </g>
      );

    case 26: // Gummy Bear
      return (
        <g>
          {/* Ears */}
          <circle cx="35" cy="26" r="8" fill="#FF70A6" />
          <circle cx="65" cy="26" r="8" fill="#FF70A6" />
          {/* Body & Head */}
          <ellipse cx="50" cy="38" rx="18" ry="15" fill="#FF70A6" />
          <ellipse cx="50" cy="62" rx="22" ry="20" fill="#FF70A6" />
          {/* Snout */}
          <ellipse cx="50" cy="42" rx="7" ry="5" fill="#FF9770" />
          <circle cx="50" cy="40" r="2" fill="#333" />
          <circle cx="42" cy="35" r="2" fill="#333" />
          <circle cx="58" cy="35" r="2" fill="#333" />
        </g>
      );

    case 27: // Clover
      return (
        <g>
          <path d="M50 50 L50 90" stroke="#56C596" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="32" r="14" fill="#CFF5E7" stroke="#56C596" strokeWidth="2" />
          <circle cx="32" cy="50" r="14" fill="#CFF5E7" stroke="#56C596" strokeWidth="2" />
          <circle cx="68" cy="50" r="14" fill="#CFF5E7" stroke="#56C596" strokeWidth="2" />
          <circle cx="50" cy="68" r="14" fill="#CFF5E7" stroke="#56C596" strokeWidth="2" />
        </g>
      );

    case 28: // Muffin
      return (
        <g>
          <path d="M30 50 C20 30 80 30 70 50 Z" fill="#D4A373" stroke="#A67C52" strokeWidth="3" />
          <polygon points="32,50 68,50 62,85 38,85" fill="#FFC7DA" stroke="#FF80AB" strokeWidth="3" />
          <circle cx="40" cy="38" r="3" fill="#9B5DE5" />
          <circle cx="58" cy="36" r="3" fill="#9B5DE5" />
          <circle cx="50" cy="44" r="3" fill="#9B5DE5" />
        </g>
      );

    case 29: // Dango
      return (
        <g>
          <line x1="50" y1="15" x2="50" y2="88" stroke="#D4A373" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="30" r="14" fill="#FFC7DA" stroke="#FF80AB" strokeWidth="3" />
          <circle cx="50" cy="52" r="14" fill="#FFFFFF" stroke="#E2ECE9" strokeWidth="3" />
          <circle cx="50" cy="74" r="14" fill="#CFF5E7" stroke="#56C596" strokeWidth="3" />
        </g>
      );

    case 30: // Sunflower Seed
      return (
        <g>
          <path d="M50 15 C28 35 28 75 50 85 C72 75 72 35 50 15 Z" fill="#3D3A45" stroke="#1A1821" strokeWidth="3" />
          <path d="M50 20 C42 38 42 68 50 80" stroke="#E0A96D" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 20 C58 38 58 68 50 80" stroke="#E0A96D" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      );

    // --- RARE (31 to 42) ---
    case 31: // Frog Hat
      return (
        <g>
          <path d="M20 58 C20 28 80 28 80 58 Z" fill="#A8E6CF" stroke="#56C596" strokeWidth="3" />
          {/* Eyes */}
          <circle cx="32" cy="28" r="10" fill="#A8E6CF" stroke="#56C596" strokeWidth="3" />
          <circle cx="32" cy="28" r="5" fill="#FFFFFF" />
          <circle cx="32" cy="28" r="2.5" fill="#333" />
          <circle cx="68" cy="28" r="10" fill="#A8E6CF" stroke="#56C596" strokeWidth="3" />
          <circle cx="68" cy="28" r="5" fill="#FFFFFF" />
          <circle cx="68" cy="28" r="2.5" fill="#333" />
          <path d="M42 46 Q50 52 58 46" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );

    case 32: // Sakura Flower
      return (
        <g>
          {[0, 72, 144, 216, 288].map((deg, idx) => (
            <path
              key={idx}
              d="M50 50 C38 25 62 25 50 50 Z"
              fill="#FFC7DA"
              stroke="#FF80AB"
              strokeWidth="2"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="8" fill="#FFF275" stroke="#FFB703" strokeWidth="2" />
        </g>
      );

    case 33: // Plush Star
      return (
        <g>
          <polygon
            points="50,15 62,38 88,40 68,58 75,83 50,70 25,83 32,58 12,40 38,38"
            fill="#FDFFB6"
            stroke="#FFD166"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="48" r="2.5" fill="#333" />
          <circle cx="58" cy="48" r="2.5" fill="#333" />
          <path d="M46 54 Q50 57 54 54" stroke="#333" strokeWidth="2" fill="none" />
        </g>
      );

    case 34: // Boba Bubble Tea
      return (
        <g>
          <polygon points="28,30 72,30 66,85 34,85" fill="#DCCEFF" stroke="#B5A0FD" strokeWidth="3" />
          <rect x="24" y="24" width="52" height="8" rx="4" fill="#FFFFFF" stroke="#B5A0FD" strokeWidth="2" />
          <line x1="50" y1="12" x2="50" y2="80" stroke="#FF5E78" strokeWidth="5" strokeLinecap="round" />
          {/* Boba pearls */}
          <circle cx="40" cy="75" r="4" fill="#4A4E69" />
          <circle cx="52" cy="78" r="4" fill="#4A4E69" />
          <circle cx="60" cy="72" r="4" fill="#4A4E69" />
          <circle cx="46" cy="68" r="4" fill="#4A4E69" />
        </g>
      );

    case 35: // Mini Umbrella
      return (
        <g>
          <path d="M15 50 C15 22 85 22 85 50 Q67.5 45 50 50 Q32.5 45 15 50 Z" fill="#D7ECFF" stroke="#70A6FF" strokeWidth="3" />
          <line x1="50" y1="50" x2="50" y2="82" stroke="#70A6FF" strokeWidth="3" />
          <path d="M50 82 Q50 88 44 88" stroke="#70A6FF" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );

    case 36: // Cat Paw Mitten
      return (
        <g>
          <path d="M25 45 C25 25 75 25 75 45 L70 82 L30 82 Z" fill="#FFF8F1" stroke="#E2C9B6" strokeWidth="3" />
          {/* Paw pads */}
          <ellipse cx="50" cy="58" rx="12" ry="10" fill="#FFB7C5" />
          <circle cx="34" cy="40" r="4" fill="#FFB7C5" />
          <circle cx="45" cy="35" r="4" fill="#FFB7C5" />
          <circle cx="55" cy="35" r="4" fill="#FFB7C5" />
          <circle cx="66" cy="40" r="4" fill="#FFB7C5" />
        </g>
      );

    case 37: // Taiyaki
      return (
        <g>
          <path d="M15 50 Q35 30 70 42 Q88 30 85 50 Q88 70 70 58 Q35 70 15 50 Z" fill="#E8A87C" stroke="#C87A4B" strokeWidth="3" />
          <circle cx="30" cy="45" r="3" fill="#5D4037" />
          <path d="M40 42 Q50 48 40 54" stroke="#C87A4B" strokeWidth="2" fill="none" />
          <path d="M52 42 Q62 48 52 54" stroke="#C87A4B" strokeWidth="2" fill="none" />
        </g>
      );

    case 38: // Ramen Bowl
      return (
        <g>
          <path d="M20 40 L80 40 L72 75 C70 82 30 82 28 75 Z" fill="#FF6B6B" stroke="#D63031" strokeWidth="3" />
          <ellipse cx="50" cy="40" rx="30" ry="8" fill="#FFEAA7" stroke="#D63031" strokeWidth="2" />
          {/* Narutomaki fish cake */}
          <circle cx="42" cy="40" r="6" fill="#FFF" />
          <circle cx="42" cy="40" r="3" stroke="#FF5E78" strokeWidth="1.5" fill="none" />
          {/* Egg half */}
          <ellipse cx="58" cy="40" rx="6" ry="4" fill="#FFF" />
          <ellipse cx="58" cy="40" rx="3" ry="2" fill="#FFB703" />
        </g>
      );

    case 39: // Bear Pancake
      return (
        <g>
          <circle cx="30" cy="30" r="10" fill="#DDA15E" stroke="#BC6C25" strokeWidth="2" />
          <circle cx="70" cy="30" r="10" fill="#DDA15E" stroke="#BC6C25" strokeWidth="2" />
          <circle cx="50" cy="55" r="28" fill="#DDA15E" stroke="#BC6C25" strokeWidth="3" />
          <ellipse cx="50" cy="62" rx="10" ry="8" fill="#FFF8F1" />
          <circle cx="50" cy="58" r="3" fill="#5D4037" />
          <circle cx="42" cy="50" r="2.5" fill="#5D4037" />
          <circle cx="58" cy="50" r="2.5" fill="#5D4037" />
          {/* Butter pat */}
          <rect x="44" y="32" width="12" height="8" rx="2" fill="#FFEAA7" stroke="#F4A261" strokeWidth="1" />
        </g>
      );

    case 40: // Magic Potion
      return (
        <g>
          <path d="M42 20 L58 20 L58 35 L75 70 C80 80 72 88 50 88 C28 88 20 80 25 70 L42 35 Z" fill="#DCCEFF" stroke="#B5A0FD" strokeWidth="3" />
          <rect x="40" y="14" width="20" height="8" rx="2" fill="#D4A373" />
          <path d="M26 68 C35 62 65 74 74 68 L71 72 C68 82 32 82 29 72 Z" fill="#A2D2FF" />
          <circle cx="45" cy="72" r="2" fill="#FFF" />
          <circle cx="55" cy="76" r="1.5" fill="#FFF" />
        </g>
      );

    case 41: // Crystal Shard
      return (
        <g>
          <polygon points="50,12 70,38 62,88 38,88 30,38" fill="#BEE1E6" stroke="#89C2D9" strokeWidth="3" />
          <polygon points="50,12 50,88 62,88 70,38" fill="#CD84F1" opacity="0.5" />
          <polygon points="50,12 30,38 38,88 50,88" fill="#FFF" opacity="0.3" />
        </g>
      );

    case 42: // Origami Crane
      return (
        <g>
          <polygon points="50,20 20,50 50,75 80,50" fill="#FFC6FF" stroke="#BDB2FF" strokeWidth="3" />
          <polygon points="50,20 10,30 20,50" fill="#E8AEB7" />
          <polygon points="50,20 90,30 80,50" fill="#E8AEB7" />
          <polygon points="50,75 50,90 40,82" fill="#BDB2FF" />
        </g>
      );

    // --- EPIC (43 to 47) ---
    case 43: // Rainbow Donut
      return (
        <g>
          <circle cx="50" cy="50" r="35" fill="#FFEAA7" stroke="#F4A261" strokeWidth="3" />
          {/* Swirly rainbow frosting */}
          <path d="M50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 Z" fill="#FFC7DA" />
          <circle cx="50" cy="50" r="14" fill="#FFF8F1" stroke="#F4A261" strokeWidth="3" />
          <path d="M22 45 C30 25 70 25 78 45" stroke="#CFF5E7" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M25 55 C35 75 65 75 75 55" stroke="#DCCEFF" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      );

    case 44: // Moon Pillow
      return (
        <g>
          <path d="M60 15 C30 15 15 40 25 70 C35 90 70 85 85 65 C60 65 45 45 60 15 Z" fill="#FFEAA7" stroke="#F4A261" strokeWidth="3" />
          <circle cx="42" cy="52" r="2.5" fill="#333" />
          <circle cx="54" cy="52" r="2.5" fill="#333" />
          <path d="M46 58 Q48 61 50 58" stroke="#333" strokeWidth="2" fill="none" />
          {/* Sleeping cap */}
          <path d="M60 15 Q75 10 82 22 Q72 28 65 22 Z" fill="#FFC7DA" />
        </g>
      );

    case 45: // Baby Dragon
      return (
        <g>
          {/* Wings */}
          <path d="M30 45 Q12 30 22 55 Z" fill="#FFB7C5" stroke="#FF80AB" strokeWidth="2" />
          <path d="M70 45 Q88 30 78 55 Z" fill="#FFB7C5" stroke="#FF80AB" strokeWidth="2" />
          {/* Head & Body */}
          <ellipse cx="50" cy="42" rx="20" ry="18" fill="#CFF5E7" stroke="#56C596" strokeWidth="3" />
          <ellipse cx="50" cy="68" rx="16" ry="18" fill="#CFF5E7" stroke="#56C596" strokeWidth="3" />
          <circle cx="42" cy="40" r="3" fill="#333" />
          <circle cx="58" cy="40" r="3" fill="#333" />
          <path d="M46 48 Q50 52 54 48" stroke="#333" strokeWidth="2" fill="none" />
          {/* Horns */}
          <path d="M36 26 L40 18 L44 26 Z" fill="#FFD166" />
          <path d="M56 26 L60 18 L64 26 Z" fill="#FFD166" />
        </g>
      );

    case 46: // Galaxy Cookie
      return (
        <g>
          <circle cx="50" cy="50" r="36" fill="#3A0CA3" stroke="#7209B7" strokeWidth="3" />
          <circle cx="35" cy="35" r="12" fill="#4361EE" opacity="0.6" />
          <circle cx="65" cy="65" r="14" fill="#F72585" opacity="0.5" />
          {/* Stars */}
          <polygon points="50,30 52,35 57,35 53,38 55,43 50,40 45,43 47,38 43,35 48,35" fill="#FFF" />
          <polygon points="68,38 69,41 72,41 70,43 71,46 68,44 65,46 66,43 64,41 67,41" fill="#FDFFB6" />
          <circle cx="32" cy="62" r="2" fill="#FFF" />
          <circle cx="40" cy="68" r="1.5" fill="#FFF" />
        </g>
      );

    case 47: // Floating Jellyfish
      return (
        <g>
          <path d="M25 45 C25 20 75 20 75 45 Q50 52 25 45 Z" fill="#E8AEB7" stroke="#B8C0FF" strokeWidth="3" />
          <path d="M35 50 Q32 75 36 88" stroke="#B8C0FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M45 50 Q48 78 44 88" stroke="#FFC6FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M55 50 Q52 78 56 88" stroke="#B8C0FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M65 50 Q68 75 64 88" stroke="#FFC6FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="42" cy="35" r="2.5" fill="#333" />
          <circle cx="58" cy="35" r="2.5" fill="#333" />
        </g>
      );

    // --- LEGENDARY (48 to 50) ---
    case 48: // Golden Hamster Crown
      return (
        <g>
          <polygon points="20,70 20,32 38,50 50,22 62,50 80,32 80,70" fill="url(#goldGrad)" stroke="#E59866" strokeWidth="3" />
          <rect x="18" y="70" width="64" height="12" rx="4" fill="#FFD166" stroke="#E59866" strokeWidth="2" />
          <circle cx="20" cy="32" r="4" fill="#FF5E78" />
          <circle cx="50" cy="22" r="5" fill="#70A6FF" />
          <circle cx="80" cy="32" r="4" fill="#A8E6CF" />
          <circle cx="50" cy="76" r="3" fill="#E91E63" />
        </g>
      );

    case 49: // Floating Cloud
      return (
        <g>
          <path d="M25 65 C15 65 15 45 30 45 C32 30 55 25 68 38 C78 32 90 42 85 58 C92 68 80 78 68 75 C55 82 35 78 25 65 Z" fill="#FFFFFF" stroke="#D7ECFF" strokeWidth="4" />
          <circle cx="42" cy="52" r="3" fill="#333" />
          <circle cx="58" cy="52" r="3" fill="#333" />
          <path d="M47 57 Q50 61 53 57" stroke="#FF80AB" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="34" cy="56" rx="4" ry="2.5" fill="#FFB7C5" />
          <ellipse cx="66" cy="56" rx="4" ry="2.5" fill="#FFB7C5" />
        </g>
      );

    case 50: // Cosmic Cheese
      return (
        <g>
          <polygon points="12,72 88,72 72,24 12,72" fill="url(#goldGrad)" stroke="#F4A261" strokeWidth="3" />
          <polygon points="12,72 72,24 38,15 12,72" fill="#FFE29A" stroke="#F4A261" strokeWidth="3" />
          {/* Glowing orbital ring */}
          <ellipse cx="50" cy="50" rx="42" ry="12" stroke="#FFF275" strokeWidth="3" fill="none" transform="rotate(-18 50 50)" />
          {/* Star cutouts */}
          <polygon points="35,48 37,52 42,52 38,55 40,60 35,57 30,60 32,55 28,52 33,52" fill="#FFF" />
          <circle cx="60" cy="58" r="4" fill="#F4A261" opacity="0.7" />
        </g>
      );

    default:
      return (
        <circle cx="50" cy="50" r="30" fill="#FFD8C7" />
      );
  }
}
