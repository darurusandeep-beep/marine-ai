import React from 'react';
import { X, Clock, Zap, Check, Sparkles } from 'lucide-react';
import { TIME_GOALS } from '../data/languages';
import { sounds } from '../utils/soundEffects';

export const TimeGoalModal = ({
  currentMinutes,
  onSelectGoal,
  onClose
}) => {
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

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-duo-sm">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Choose Your Daily Goal</h3>
          <p className="text-xs font-bold text-gray-500 mt-1">
            How much time do you want to dedicate each day to master Indian languages?
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {TIME_GOALS.map((goal) => {
            const isSelected = currentMinutes === goal.minutes;
            return (
              <button
                key={goal.id}
                onClick={() => {
                  sounds.playPop();
                  onSelectGoal(goal.minutes);
                }}
                className={`w-full p-4 rounded-2xl text-left border-2 flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-duo-green bg-green-50 shadow-duo-sm'
                    : 'border-duo-gray hover:bg-gray-50 shadow-duo'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-gray-800">{goal.label}</span>
                    <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      {goal.minutes} mins / day
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-500 mt-0.5">
                    {goal.desc}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold text-duo-green">
                    {goal.xpBonus}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-duo-green flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="mt-6 w-full py-3.5 rounded-2xl duo-btn-green text-white font-black text-sm uppercase tracking-wider shadow-duo"
        >
          SAVE DAILY GOAL
        </button>
      </div>
    </div>
  );
};
