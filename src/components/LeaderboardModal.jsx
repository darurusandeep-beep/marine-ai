import React from 'react';
import { X, Trophy, Medal, Crown } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const LeaderboardModal = ({ userXp, onClose }) => {
  const leaderboardData = [
    { rank: 1, name: 'Ananya Sharma', city: 'Mumbai', xp: Math.max(340, userXp + 60), avatar: '👩‍💼', lang: 'Tamil' },
    { rank: 2, name: 'Vikramaditya', city: 'Chennai', xp: Math.max(280, userXp + 20), avatar: '👨‍🎓', lang: 'Hindi' },
    { rank: 3, name: 'You (Champion)', city: 'Learner', xp: userXp, avatar: '🦚', lang: 'Bharat', isUser: true },
    { rank: 4, name: 'Pooja Bannerjee', city: 'Kolkata', xp: 210, avatar: '👩‍🔬', lang: 'Telugu' },
    { rank: 5, name: 'Arjun Reddy', city: 'Hyderabad', xp: 195, avatar: '👨‍💻', lang: 'Kannada' },
    { rank: 6, name: 'Gurpreet Singh', city: 'Amritsar', xp: 160, avatar: '👳‍♂️', lang: 'Malayalam' },
    { rank: 7, name: 'Divya Nair', city: 'Kochi', xp: 140, avatar: '👩‍🎨', lang: 'Bengali' },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

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

        {/* League Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-2 border-2 border-amber-300 shadow-duo-sm">
            <Trophy className="w-8 h-8 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-xs font-black uppercase text-amber-600 tracking-widest">
            Indian Premier League
          </div>
          <h3 className="text-2xl font-black text-gray-800">Chola Gold League</h3>
          <p className="text-xs font-bold text-gray-400 mt-0.5">Top 3 advance to the Koh-i-Noor League!</p>
        </div>

        {/* Roster */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {leaderboardData.map((player) => (
            <div
              key={player.name}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                player.isUser
                  ? 'border-duo-green bg-green-50 shadow-duo-sm'
                  : 'border-duo-gray bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 text-center font-black text-sm ${
                  player.rank === 1 ? 'text-amber-500' : player.rank === 2 ? 'text-slate-400' : player.rank === 3 ? 'text-amber-700' : 'text-gray-400'
                }`}>
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                </span>

                <span className="text-2xl">{player.avatar}</span>

                <div>
                  <div className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                    {player.name}
                    {player.isUser && (
                      <span className="text-[10px] bg-duo-green text-white px-1.5 py-0.2 rounded-full font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400">
                    {player.city} • Learning {player.lang}
                  </div>
                </div>
              </div>

              <div className="text-xs font-black text-amber-600">
                {player.xp} XP
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="mt-6 w-full py-3 rounded-2xl duo-btn-green text-white font-black text-xs uppercase tracking-wider shadow-duo"
        >
          CONTINUE LEARNING
        </button>
      </div>
    </div>
  );
};
