import React from 'react';

export const SpotFoodLogo = ({ 
  size = 'md', 
  showText = true, 
  className = '', 
  animated = true 
}) => {
  // Size mapping for the circular emblem
  const dimensions = {
    xs: { badge: 32, fontSpot: 'text-lg', fontSub: 'text-[7px]' },
    sm: { badge: 38, fontSpot: 'text-xl', fontSub: 'text-[8px]' },
    md: { badge: 44, fontSpot: 'text-2xl', fontSub: 'text-[9px]' },
    lg: { badge: 54, fontSpot: 'text-3xl', fontSub: 'text-[10px]' },
    xl: { badge: 68, fontSpot: 'text-4xl', fontSub: 'text-xs' },
  };

  const current = dimensions[size] || dimensions.md;
  const badgeSize = typeof size === 'number' ? size : current.badge;

  return (
    <div className={`inline-flex items-center gap-3 group select-none transition-all duration-300 ${className}`}>
      
      {/* Option 3: Luxury Neon Urban Diner Circular Emblem */}
      <div 
        className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: badgeSize, height: badgeSize }}
      >
        {/* Soft Ambient Neon Glow Behind Emblem */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-fiery to-gold opacity-50 blur-md group-hover:opacity-85 group-hover:blur-lg transition-all duration-300"
        />

        {/* High-Precision Vector SVG Badge */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Gold Gradient */}
            <linearGradient id="metallicGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D1" />
              <stop offset="25%" stopColor="#FFD54F" />
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="75%" stopColor="#FFA000" />
              <stop offset="100%" stopColor="#FFE082" />
            </linearGradient>

            {/* Glowing Neon Orange Flame Gradient */}
            <linearGradient id="neonFlame" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#DD2C00" />
              <stop offset="40%" stopColor="#FF3D00" />
              <stop offset="75%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#FFAB91" />
            </linearGradient>

            {/* Inner Core Radial Gradient */}
            <radialGradient id="badgeDarkCore" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#26201C" />
              <stop offset="65%" stopColor="#151210" />
              <stop offset="100%" stopColor="#0B0908" />
            </radialGradient>

            {/* Neon Glow Filter */}
            <filter id="neonOrangeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 1. Outer Dark Circular Disc */}
          <circle cx="50" cy="50" r="47" fill="url(#badgeDarkCore)" stroke="url(#metallicGold)" strokeWidth="1.8" />

          {/* 2. Outer Fine Geometric Ring with Notch Accents */}
          <circle cx="50" cy="50" r="43.5" stroke="#FFC107" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.65" />
          
          {/* Compass / Luxury Geometric Accent Diamonds */}
          <polygon points="50,4 52,7 50,10 48,7" fill="url(#metallicGold)" />
          <polygon points="50,90 52,93 50,96 48,93" fill="url(#metallicGold)" />
          <polygon points="4,50 7,48 10,50 7,52" fill="url(#metallicGold)" />
          <polygon points="90,50 93,48 96,50 93,52" fill="url(#metallicGold)" />

          {/* 3. Inner Polished Ring */}
          <circle cx="50" cy="50" r="38" stroke="url(#metallicGold)" strokeWidth="1" opacity="0.4" />

          {/* 4. Glowing Neon Orange Flame Emerging Above Cloche */}
          <g filter="url(#neonOrangeGlow)">
            {/* Primary Stylized Flame Tongue */}
            <path
              d="M50 20 C46 27, 42 33, 44 41 C45 45, 48 48, 50 49 C52 48, 55 45, 56 41 C58 33, 54 27, 50 20 Z"
              fill="url(#neonFlame)"
            />
            {/* Left Dynamic Flame Curve */}
            <path
              d="M44 32 C39 37, 38 43, 41 48 C43 45, 45 42, 44 32 Z"
              fill="url(#neonFlame)"
              opacity="0.9"
            />
            {/* Right Dynamic Flame Curve */}
            <path
              d="M56 32 C61 37, 62 43, 59 48 C57 45, 55 42, 56 32 Z"
              fill="url(#neonFlame)"
              opacity="0.9"
            />
            {/* High-heat Neon Core Spark */}
            <ellipse cx="50" cy="42" rx="2.5" ry="4.5" fill="#FFF3E0" />
          </g>

          {/* 5. Luxury Metallic Golden Cloche (Serving Dome) */}
          {/* Handle Top Ring/Finial */}
          <circle cx="50" cy="46" r="3.2" fill="url(#metallicGold)" stroke="#151210" strokeWidth="0.8" />
          
          {/* Cloche Dome Lid (Polished Curved Geometry) */}
          <path
            d="M26 67 C26 50, 36 47, 50 47 C64 47, 74 50, 74 67 Z"
            fill="url(#metallicGold)"
          />

          {/* Specular Highlight Streak on Metallic Cloche Dome */}
          <path
            d="M31 65 C32 54, 40 50, 50 50 C42 50, 35 55, 33 65 Z"
            fill="#FFFDE7"
            opacity="0.55"
          />

          {/* Cloche Lower Lip Rim */}
          <rect x="23" y="67" width="54" height="3.2" rx="1.6" fill="url(#metallicGold)" />

          {/* Serving Platter Base Tray Line */}
          <path
            d="M17 73.5 C26 76, 74 76, 83 73.5 L82 76 C73 78.5, 27 78.5, 18 76 Z"
            fill="url(#metallicGold)"
          />

          {/* Geometric Accent Stars */}
          <path d="M22 36 L23.5 40 L27.5 41.5 L23.5 43 L22 47 L20.5 43 L16.5 41.5 L20.5 40 Z" fill="#FFC107" opacity="0.75" />
          <path d="M78 36 L79.5 40 L83.5 41.5 L79.5 43 L78 47 L76.5 43 L72.5 41.5 L76.5 40 Z" fill="#FFC107" opacity="0.75" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          {/* Main Title: SPOT in Metallic Gold + FOOD in Glowing Neon Orange */}
          <div className="flex items-center tracking-tight font-display font-black leading-none">
            {/* Metallic Golden "SPOT" */}
            <span className={`${current.fontSpot} font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6BD] via-[#FFD54F] to-[#FFA000] drop-shadow-[0_2px_8px_rgba(255,193,7,0.35)]`}>
              SPOT
            </span>

            {/* Glowing Neon Orange "FOOD" */}
            <span className={`${current.fontSpot} font-black uppercase tracking-wider ml-1 text-fiery drop-shadow-[0_0_12px_rgba(255,87,34,0.75)]`}>
              FOOD
            </span>

            {/* Pulsing Neon Indicator */}
            {animated && (
              <span className="w-1.5 h-1.5 rounded-full bg-fiery ml-1.5 shadow-[0_0_8px_#FF5722] animate-pulse" />
            )}
          </div>

          {/* Elegant Subtitle with Gold-Neon Accent */}
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`${current.fontSub} uppercase tracking-[0.22em] font-bold text-[#FFC107]/90 drop-shadow-[0_0_6px_rgba(255,193,7,0.4)]`}>
              CRAVINGS SOLVED
            </span>
            <span className="text-[8px] text-fiery font-black">✦</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default SpotFoodLogo;
