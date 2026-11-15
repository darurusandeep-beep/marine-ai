import React, { useState } from 'react';
import { Flame, Heart, Gem, Clock, Globe, Volume2, Sparkles, ShoppingBag, Trophy, User } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { sounds } from '../utils/soundEffects';

export const Header = ({
  targetLang,
  setTargetLang,
  sourceLang,
  setSourceLang,
  hearts,
  gems,
  streak,
  dailyGoalMinutes,
  timeSpentMinutes,
  openTimeGoalModal,
  openShopModal,
  openLeaderboardModal,
  openProfileModal
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.id === targetLang) || SUPPORTED_LANGUAGES[1];
  const goalPercent = Math.min(100, Math.round((timeSpentMinutes / dailyGoalMinutes) * 100));

  return (
    <header className="sticky top-0 z-30 bg-white border-b-2 border-duo-gray px-4 py-2.5 transition-shadow shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => sounds.playPop()}>
            <span className="text-3xl">🦚</span>
            <div className="leading-tight">
              <h1 className="text-2xl font-black tracking-wider text-duo-green flex items-center gap-1">
                INDRAT
                <span className="text-[10px] uppercase font-extrabold bg-duo-orange text-white px-1.5 py-0.5 rounded-full tracking-normal">
                  Bharat
                </span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 hidden sm:block">Learn Indian Languages Daily</p>
            </div>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playPop();
                setLangDropdownOpen(!langDropdownOpen);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 border-duo-gray hover:bg-gray-50 active:scale-95 transition-all text-xs font-bold text-gray-700 shadow-duo-sm"
            >
              <span className="text-lg">{currentLangObj.flag}</span>
              <span className="font-extrabold">{currentLangObj.name}</span>
              <span className="text-gray-400 text-[10px]">▼</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute top-11 left-0 w-64 bg-white rounded-2xl border-2 border-duo-gray shadow-duo-lg p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-extrabold uppercase text-gray-400 px-3 py-1">
                  Learn Another Language
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {SUPPORTED_LANGUAGES.filter(l => l.id !== 'en').map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        sounds.playPop();
                        setTargetLang(lang.id);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-extrabold transition-colors ${
                        targetLang === lang.id ? 'bg-green-50 text-duo-green' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{lang.flag}</span>
                        <div>
                          <div>{lang.name}</div>
                          <div className="text-[10px] font-normal text-gray-400">{lang.native}</div>
                        </div>
                      </div>
                      {targetLang === lang.id && <span className="text-duo-green">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats & Gamification Counters */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Daily Learning Time Tracker (as requested: "based on their time to learn") */}
          <button
            onClick={() => {
              sounds.playPop();
              openTimeGoalModal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-duo-gray hover:bg-amber-50 text-gray-700 active:scale-95 transition-all shadow-duo-sm group"
            title="Daily Study Time Goal"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-[10px] font-extrabold text-gray-400 uppercase leading-none">Goal</div>
              <div className="text-xs font-black text-amber-600 leading-tight">
                {timeSpentMinutes}/{dailyGoalMinutes}m
              </div>
            </div>
            {/* Progress Pill Bar */}
            <div className="w-10 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${goalPercent}%` }}
              ></div>
            </div>
          </button>

          {/* Streak Counter */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-duo-gray text-orange-500 font-black text-sm shadow-duo-sm"
            title="Current Streak"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-wiggle" />
            <span>{streak}</span>
          </div>

          {/* Ratnas / Gems */}
          <button
            onClick={() => {
              sounds.playPop();
              openShopModal();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-duo-gray text-cyan-500 hover:bg-cyan-50 font-black text-sm active:scale-95 transition-all shadow-duo-sm"
            title="Ratnas (Gems)"
          >
            <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>{gems}</span>
          </button>

          {/* Hearts / Lives */}
          <button
            onClick={() => {
              sounds.playPop();
              openShopModal();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-duo-gray text-rose-500 hover:bg-rose-50 font-black text-sm active:scale-95 transition-all shadow-duo-sm"
            title="Hearts (Health)"
          >
            <Heart className={`w-4 h-4 text-rose-500 fill-rose-500 ${hearts <= 1 ? 'animate-pulse' : ''}`} />
            <span>{hearts}</span>
          </button>

          {/* Leaderboard & Profile shortcuts */}
          <button
            onClick={() => {
              sounds.playPop();
              openLeaderboardModal();
            }}
            className="p-2 rounded-2xl border-2 border-duo-gray hover:bg-yellow-50 text-amber-500 active:scale-95 transition-all shadow-duo-sm hidden sm:flex"
            title="Indian Leagues"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              openProfileModal();
            }}
            className="p-2 rounded-2xl border-2 border-duo-gray hover:bg-blue-50 text-blue-500 active:scale-95 transition-all shadow-duo-sm"
            title="Profile & Stats"
          >
            <User className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
