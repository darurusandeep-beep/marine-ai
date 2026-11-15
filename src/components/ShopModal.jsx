import React from 'react';
import { X, Heart, Shield, Sparkles, Gem, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ShopModal = ({ gems, setGems, hearts, setHearts, onClose }) => {
  const shopItems = [
    {
      id: 'hearts-refill',
      title: 'Full Heart Refill',
      desc: 'Instantly restore all 5 hearts to keep practicing mistakes-free!',
      icon: <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />,
      cost: 50,
      action: () => {
        if (hearts >= 5) {
          alert('Your hearts are already full!');
          return;
        }
        if (gems < 50) {
          alert('Not enough Ratnas (gems)! Complete more lessons to earn them.');
          return;
        }
        setGems(prev => prev - 50);
        setHearts(5);
        sounds.playFanfare();
      }
    },
    {
      id: 'streak-freeze',
      title: 'Streak Freeze',
      desc: 'Protects your daily learning streak even if you miss a day of practice.',
      icon: <Shield className="w-8 h-8 text-blue-500 fill-blue-500" />,
      cost: 100,
      action: () => {
        if (gems < 100) {
          alert('Not enough Ratnas (gems)!');
          return;
        }
        setGems(prev => prev - 100);
        sounds.playFanfare();
        alert('🛡️ Streak Freeze equipped! Your streak is protected for tomorrow.');
      }
    },
    {
      id: 'double-xp',
      title: 'Double XP Potion',
      desc: 'Gain 2x XP points for your next 3 lessons to climb the league!',
      icon: <Sparkles className="w-8 h-8 text-amber-500 fill-amber-500" />,
      cost: 80,
      action: () => {
        if (gems < 80) {
          alert('Not enough Ratnas (gems)!');
          return;
        }
        setGems(prev => prev - 80);
        sounds.playFanfare();
        alert('⚡ 2x XP Boost activated for your next lessons!');
      }
    }
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

        {/* Shop Header */}
        <div className="flex items-center justify-between border-b-2 border-duo-gray pb-4 mb-4">
          <div>
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
              Ratna Bazaar (Shop)
            </h3>
            <p className="text-xs font-bold text-gray-400">Power-ups for Indian Language Mastery</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-2xl text-cyan-700 font-black text-sm">
            <Gem className="w-4 h-4 fill-cyan-400" />
            <span>{gems}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border-2 border-duo-gray bg-white shadow-duo flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-200">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-800">{item.title}</h4>
                  <p className="text-[11px] font-semibold text-gray-500 max-w-[200px]">
                    {item.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playPop();
                  item.action();
                }}
                className="py-2 px-3.5 rounded-xl duo-btn-blue text-white font-black text-xs flex items-center gap-1 shadow-duo-sm active:scale-95"
              >
                <Gem className="w-3.5 h-3.5 fill-current" />
                {item.cost}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="mt-6 w-full py-3 rounded-2xl border-2 border-duo-gray text-gray-600 font-black text-xs uppercase tracking-wider hover:bg-gray-50 active:scale-95 transition-all shadow-duo-sm"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
