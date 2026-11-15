import React, { useState } from 'react';
import { Star, Check, Lock, Play, Zap, Flame, Trophy, Award, Gift, Clock, Sparkles } from 'lucide-react';
import { Mascot } from './Mascot';
import { sounds } from '../utils/soundEffects';

export const PathView = ({
  curriculumData,
  completedLessons,
  onStartLesson,
  onStartBlitz,
  dailyGoalMinutes,
  timeSpentMinutes,
  openTimeGoalModal
}) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  if (!curriculumData || !curriculumData.units) {
    return (
      <div className="text-center py-20">
        <Mascot emotion="sad" speech="Lessons coming soon!" size="lg" />
        <h2 className="text-xl font-bold mt-4">Curriculum being prepared for this language!</h2>
        <p className="text-gray-500 text-sm">Please select Tamil, Hindi, or Telugu to start right now.</p>
      </div>
    );
  }

  // Winding offset coordinates for Duolingo serpentine tree
  const nodeOffsets = [0, -35, -50, -25, 25, 50, 35, 0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left/Main Column: Duolingo Learning Path */}
      <div className="lg:col-span-2 space-y-12">
        {curriculumData.units.map((unit, uIdx) => (
          <div key={unit.id} className="relative">
            {/* Unit Header Card */}
            <div
              className="rounded-3xl p-5 text-white shadow-duo mb-8 transition-transform"
              style={{ backgroundColor: unit.color || '#58cc02' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest opacity-80">
                    {unit.title.split(':')[0]}
                  </span>
                  <h3 className="text-xl font-black mt-0.5">
                    {unit.title.split(':')[1] || unit.title}
                  </h3>
                  <p className="text-xs font-medium text-white/90 mt-1 max-w-md">
                    {unit.description}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Path Nodes */}
            <div className="flex flex-col items-center space-y-7 relative py-2">
              {unit.lessons.map((lesson, lIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                // Active if previous is completed or it is the very first lesson
                const isUnlocked = lIdx === 0 || completedLessons.includes(unit.lessons[lIdx - 1]?.id);
                const offset = nodeOffsets[(uIdx * 4 + lIdx) % nodeOffsets.length];

                return (
                  <div
                    key={lesson.id}
                    className="relative flex flex-col items-center"
                    style={{ transform: `translateX(${offset}px)` }}
                  >
                    {/* Floating lesson tooltip popup if clicked */}
                    {selectedLesson?.id === lesson.id && (
                      <div className="absolute -top-24 z-20 bg-white border-2 border-duo-gray rounded-2xl p-3 shadow-duo-lg w-52 text-center animate-in fade-in zoom-in-95">
                        <div className="text-xs font-extrabold text-gray-800">{lesson.title}</div>
                        <div className="text-[11px] text-gray-500 font-bold mt-0.5">
                          ⚡ +{lesson.xp} XP • 🎯 5 Questions
                        </div>
                        <button
                          onClick={() => {
                            sounds.playPop();
                            onStartLesson(lesson);
                            setSelectedLesson(null);
                          }}
                          className="mt-2 w-full py-1.5 px-3 rounded-xl duo-btn-green text-white text-xs font-black uppercase tracking-wider"
                        >
                          START (+{lesson.xp} XP)
                        </button>
                      </div>
                    )}

                    {/* Circular Duolingo Stepping Stone Button */}
                    <button
                      onClick={() => {
                        sounds.playPop();
                        if (isUnlocked) {
                          setSelectedLesson(selectedLesson?.id === lesson.id ? null : lesson);
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center duo-node transition-all ${
                        isCompleted
                          ? 'bg-amber-400 border-4 border-amber-300'
                          : isUnlocked
                          ? 'bg-duo-green border-4 border-emerald-300 animate-pulse-glow'
                          : 'bg-gray-300 border-4 border-gray-400 cursor-not-allowed opacity-80'
                      }`}
                    >
                      {/* Active Crown / Mascot Indicator */}
                      {isUnlocked && !isCompleted && (
                        <div className="absolute -top-3 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-duo-sm border border-yellow-200 animate-bounce">
                          NEXT!
                        </div>
                      )}

                      {/* Icon Inside Node */}
                      {isCompleted ? (
                        <Check className="w-9 h-9 text-white stroke-[3.5]" />
                      ) : isUnlocked ? (
                        <Star className="w-9 h-9 text-white fill-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-500" />
                      )}
                    </button>

                    {/* Lesson Label */}
                    <span className="text-xs font-black text-gray-600 mt-2 text-center max-w-[120px] leading-tight">
                      {lesson.title}
                    </span>
                  </div>
                );
              })}

              {/* End of Unit Reward Chest */}
              <div className="pt-4 flex flex-col items-center">
                <button
                  onClick={() => {
                    sounds.playMatch();
                    alert("🎉 Unit complete chest! You'll receive 50 Ratnas upon finishing all lessons in this unit!");
                  }}
                  className="w-16 h-16 rounded-2xl bg-amber-500 hover:bg-amber-400 border-4 border-amber-300 shadow-duo flex items-center justify-center text-white active:scale-95 transition-all"
                  title="Unlock Unit Chest"
                >
                  <Gift className="w-8 h-8" />
                </button>
                <span className="text-[11px] font-bold text-amber-600 mt-1 uppercase tracking-wider">
                  Unit Reward Chest
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Time-Based Practice Widgets & Quests */}
      <div className="space-y-6">
        {/* Daily Study Time Card (As requested: "based on their time to learn") */}
        <div className="bg-white rounded-3xl border-2 border-duo-gray p-5 shadow-duo">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-black uppercase text-gray-800 tracking-wide">
                Daily Learning Goal
              </h4>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                openTimeGoalModal();
              }}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Edit Goal
            </button>
          </div>

          <p className="text-xs text-gray-500 font-medium mb-3">
            Consistent 5–10 mins daily builds rapid Indian language fluency!
          </p>

          {/* Goal Progress Ring / Bar */}
          <div className="bg-gray-100 rounded-2xl p-3 border border-gray-200">
            <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
              <span className="text-gray-700">Today's Progress</span>
              <span className="text-amber-600">
                {timeSpentMinutes} / {dailyGoalMinutes} mins
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((timeSpentMinutes / dailyGoalMinutes) * 100))}%`
                }}
              ></div>
            </div>
            <div className="text-[11px] text-gray-400 font-bold mt-2 flex items-center justify-between">
              <span>{Math.max(0, dailyGoalMinutes - timeSpentMinutes)} mins remaining today</span>
              <span>{Math.min(100, Math.round((timeSpentMinutes / dailyGoalMinutes) * 100))}%</span>
            </div>
          </div>
        </div>

        {/* 2-Minute Speed Blitz Challenge */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-duo relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-15">⚡</div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-xs font-black uppercase tracking-wider text-yellow-300">
                Quick Bite Mode
              </span>
            </div>
            <h4 className="text-lg font-black leading-snug">
              2-Minute Timed Blitz!
            </h4>
            <p className="text-xs text-indigo-100 mt-1 mb-4">
              Short on time? Play a rapid-fire quiz to keep your streak alive & earn double XP!
            </p>
            <button
              onClick={() => {
                sounds.playPop();
                onStartBlitz();
              }}
              className="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-duo-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Start 2-Min Sprint
            </button>
          </div>
        </div>

        {/* Mascot Encouragement Card */}
        <div className="bg-white rounded-3xl border-2 border-duo-gray p-5 shadow-duo text-center">
          <Mascot emotion="happy" size="md" speech="Namaste! Ready to learn?" />
          <h5 className="font-black text-gray-800 text-sm mt-3">Indra says:</h5>
          <p className="text-xs text-gray-600 mt-1 italic">
            "Learning Indian languages connects you with millions of friends, food, films, and cultures!"
          </p>
        </div>

        {/* Daily Quests */}
        <div className="bg-white rounded-3xl border-2 border-duo-gray p-5 shadow-duo space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase text-gray-800 tracking-wider">
              Daily Quests
            </h4>
            <span className="text-[10px] font-bold text-gray-400">Resets in 5h</span>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-2xl">🔥</span>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-800">Complete 1 Lesson</div>
              <div className="text-[10px] text-gray-400 font-bold">Reward: +10 Ratnas 💎</div>
            </div>
            <span className="text-xs font-black text-duo-green">
              {completedLessons.length > 0 ? '✓ Done' : '0/1'}
            </span>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-2xl">⏱️</span>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-800">Study for 5 Minutes</div>
              <div className="text-[10px] text-gray-400 font-bold">Reward: +15 XP ⚡</div>
            </div>
            <span className="text-xs font-black text-duo-green">
              {timeSpentMinutes >= 5 ? '✓ Done' : `${timeSpentMinutes}/5m`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
