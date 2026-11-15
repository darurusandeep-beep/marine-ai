import React from 'react';
import { X, Flame, Zap, Award, Clock, BookOpen, ShieldCheck } from 'lucide-react';
import { Mascot } from './Mascot';
import { sounds } from '../utils/soundEffects';

export const ProfileModal = ({
  userXp,
  streak,
  timeSpentMinutes,
  completedLessonsCount,
  onClose
}) => {
  const achievements = [
    { title: 'Namaste India', desc: 'Completed your very first lesson', unlocked: completedLessonsCount >= 1, icon: '🙏' },
    { title: 'Chai Lover', desc: 'Learned food & restaurant phrases', unlocked: completedLessonsCount >= 2, icon: '☕' },
    { title: 'Auto Navigator', desc: 'Asked for directions in native language', unlocked: completedLessonsCount >= 3, icon: '🛺' },
    { title: 'Daily Devotee', desc: 'Maintained a daily learning streak', unlocked: streak >= 1, icon: '🔥' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border-2 border-duo-gray max-w-md w-full p-6 shadow-duo-lg relative animate-in zoom-in-95">
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Profile Card */}
        <div className="flex items-center gap-4 border-b-2 border-duo-gray pb-5 mb-5">
          <Mascot emotion="celebrate" size="sm" />
          <div>
            <h3 className="text-xl font-black text-gray-800">Bharat Polyglot</h3>
            <p className="text-xs font-bold text-gray-400">Joined November 2026</p>
            <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider bg-duo-green text-white px-2 py-0.5 rounded-full">
              Chola League Tier
            </span>
          </div>
        </div>

        {/* Statistics Grid */}
        <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">
          Your Learning Statistics
        </h4>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl border-2 border-duo-gray bg-white shadow-duo-sm flex items-center gap-3">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            <div>
              <div className="text-base font-black text-gray-800">{streak} Days</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Day Streak</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border-2 border-duo-gray bg-white shadow-duo-sm flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
            <div>
              <div className="text-base font-black text-gray-800">{userXp} XP</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Total XP</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border-2 border-duo-gray bg-white shadow-duo-sm flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <div>
              <div className="text-base font-black text-gray-800">{timeSpentMinutes} mins</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Time Studied</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border-2 border-duo-gray bg-white shadow-duo-sm flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <div>
              <div className="text-base font-black text-gray-800">{completedLessonsCount * 6}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Words Mastered</div>
            </div>
          </div>
        </div>

        {/* Badges / Achievements */}
        <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">
          Badges & Honors
        </h4>
        <div className="space-y-2">
          {achievements.map((ach) => (
            <div
              key={ach.title}
              className={`p-2.5 rounded-2xl border flex items-center gap-3 ${
                ach.unlocked ? 'bg-amber-50/60 border-amber-200' : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <span className="text-2xl">{ach.icon}</span>
              <div className="flex-1">
                <div className="text-xs font-black text-gray-800">{ach.title}</div>
                <div className="text-[10px] font-semibold text-gray-500">{ach.desc}</div>
              </div>
              {ach.unlocked && (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="mt-6 w-full py-3 rounded-2xl duo-btn-blue text-white font-black text-xs uppercase tracking-wider shadow-duo"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
