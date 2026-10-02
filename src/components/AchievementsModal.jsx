import React, { useState } from 'react';
import {
  Trophy, X, CheckCircle2, Lock, Coins, Sword,
  Shield, ChevronUp, Sparkles, Crown, Users,
  CloudLightning, Snowflake, Skull, Flame
} from 'lucide-react';

export default function AchievementsModal({
  isOpen,
  onClose,
  achievements,
  onClaimReward
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'progress'

  if (!isOpen) return null;

  const totalCount = achievements.length;
  const completedCount = achievements.filter(a => a.completed).length;

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'completed') return a.completed;
    if (filter === 'progress') return !a.completed;
    return true;
  });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sword': return <Sword className="w-5 h-5 text-rose-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-indigo-400" />;
      case 'ChevronUp': return <ChevronUp className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'Users': return <Users className="w-5 h-5 text-sky-400" />;
      case 'CloudLightning': return <CloudLightning className="w-5 h-5 text-yellow-400" />;
      case 'Snowflake': return <Snowflake className="w-5 h-5 text-cyan-400" />;
      case 'Skull': return <Skull className="w-5 h-5 text-red-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      default: return <Trophy className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="bg-slate-850 px-5 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/40">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-arcade text-slate-100">Pencapaian Pertahanan</h2>
              <span className="text-xs text-slate-400 font-sans">
                {completedCount} dari {totalCount} Selesai ({Math.round((completedCount / totalCount) * 100)}%)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Filter Tabs */}
        <div className="px-5 py-3 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="w-full sm:w-64 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded font-bold transition ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Semua ({totalCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded font-bold transition ${filter === 'completed' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Selesai ({completedCount})
            </button>
            <button
              onClick={() => setFilter('progress')}
              className={`px-3 py-1 rounded font-bold transition ${filter === 'progress' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Berjalan ({totalCount - completedCount})
            </button>
          </div>
        </div>

        {/* Achievement List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {filteredAchievements.map((ach) => {
            const isCompleted = ach.completed;
            const isClaimed = ach.claimed;
            const progressRatio = Math.min(1, ach.current / ach.target);

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  isClaimed
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-70'
                    : isCompleted
                      ? 'bg-slate-800/90 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                {/* Icon & Details */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-lg border flex-shrink-0 ${
                    isCompleted ? 'bg-amber-500/20 border-amber-400/40' : 'bg-slate-900 border-slate-800'
                  }`}>
                    {getIcon(ach.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm font-arcade text-slate-100 truncate">{ach.title}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-400 uppercase font-mono">
                        {ach.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-sans mt-0.5 leading-snug">{ach.desc}</p>

                    {/* Progress Bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
                        <div
                          className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-400' : 'bg-indigo-500'}`}
                          style={{ width: `${progressRatio * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {ach.current} / {ach.target}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Claim / Reward Button */}
                <div className="flex-shrink-0">
                  {isClaimed ? (
                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold px-3 py-1.5 bg-emerald-950/50 border border-emerald-500/30 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Klaim OK</span>
                    </div>
                  ) : isCompleted ? (
                    <button
                      onClick={() => onClaimReward(ach.id)}
                      className="pixel-btn pixel-btn-warning text-xs py-1.5 px-3 flex items-center gap-1.5 animate-bounce"
                    >
                      <Coins className="w-4 h-4 text-amber-950" />
                      <span>Klaim +{ach.rewardGold} G</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
                      <Lock className="w-3.5 h-3.5" />
                      <span>+{ach.rewardGold} G</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
