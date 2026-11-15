import React from 'react';

export const Mascot = ({ emotion = 'happy', size = 'md', speech = '', onClick }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-52 h-52'
  };

  return (
    <div className="relative inline-flex flex-col items-center cursor-pointer group" onClick={onClick}>
      {/* Interactive Speech Bubble */}
      {speech && (
        <div className="absolute -top-12 z-10 px-3 py-1.5 bg-white border-2 border-duo-gray rounded-2xl shadow-duo-sm text-xs font-bold text-gray-700 whitespace-nowrap animate-bounce">
          {speech}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white"></div>
        </div>
      )}

      {/* SVG Peacock Mascot: Indra */}
      <div className={`${sizeClasses[size] || sizeClasses.md} transition-transform duration-200 group-hover:scale-105 active:scale-95`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Peacock Tail Feathers / Fan */}
          <g className="transition-transform duration-300 group-hover:rotate-1 origin-bottom">
            <circle cx="60" cy="80" r="22" fill="#0284c7" />
            <circle cx="60" cy="80" r="14" fill="#0d9488" />
            <circle cx="60" cy="80" r="7" fill="#fbbf24" />

            <circle cx="100" cy="60" r="24" fill="#0284c7" />
            <circle cx="100" cy="60" r="15" fill="#0d9488" />
            <circle cx="100" cy="60" r="8" fill="#fbbf24" />

            <circle cx="140" cy="80" r="22" fill="#0284c7" />
            <circle cx="140" cy="80" r="14" fill="#0d9488" />
            <circle cx="140" cy="80" r="7" fill="#fbbf24" />
          </g>

          {/* Body */}
          <ellipse cx="100" cy="135" rx="42" ry="48" fill="#0369a1" />
          {/* Belly highlight */}
          <ellipse cx="100" cy="142" rx="28" ry="32" fill="#38bdf8" />

          {/* Crest / Kalgi on Head */}
          <path d="M 94 85 Q 85 55 80 50" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="80" cy="50" r="5" fill="#f59e0b" />
          <path d="M 100 85 Q 100 50 100 45" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="45" r="5" fill="#10b981" />
          <path d="M 106 85 Q 115 55 120 50" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="120" cy="50" r="5" fill="#f59e0b" />

          {/* Head */}
          <circle cx="100" cy="95" r="32" fill="#0284c7" />

          {/* Eyes */}
          {emotion === 'celebrate' || emotion === 'cheer' ? (
            // Closed happy arch eyes
            <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M 85 92 Q 91 84 97 92" />
              <path d="M 103 92 Q 109 84 115 92" />
            </g>
          ) : emotion === 'sad' ? (
            // Sad eyes
            <g>
              <circle cx="90" cy="95" r="7" fill="#ffffff" />
              <circle cx="89" cy="96" r="4" fill="#1e293b" />
              <circle cx="110" cy="95" r="7" fill="#ffffff" />
              <circle cx="109" cy="96" r="4" fill="#1e293b" />
            </g>
          ) : (
            // Big cute expressive Duolingo-style eyes
            <g>
              <ellipse cx="88" cy="92" rx="8" ry="11" fill="#ffffff" />
              <circle cx="89" cy="92" r="5" fill="#0f172a" />
              <circle cx="87" cy="89" r="2" fill="#ffffff" />

              <ellipse cx="112" cy="92" rx="8" ry="11" fill="#ffffff" />
              <circle cx="111" cy="92" r="5" fill="#0f172a" />
              <circle cx="109" cy="89" r="2" fill="#ffffff" />
            </g>
          )}

          {/* Golden Beak */}
          <polygon points="94,103 106,103 100,116" fill="#f59e0b" />

          {/* Rosy Cheeks */}
          <ellipse cx="80" cy="103" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="120" cy="103" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />

          {/* Feet */}
          <ellipse cx="86" cy="180" rx="9" ry="5" fill="#f59e0b" />
          <ellipse cx="114" cy="180" rx="9" ry="5" fill="#f59e0b" />
        </svg>
      </div>
    </div>
  );
};
