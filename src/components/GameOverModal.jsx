import React from 'react';
import { RotateCcw, Skull, Trophy, Swords, Coins, Sparkles } from 'lucide-react';

export default function GameOverModal({
  isOpen,
  wave,
  stats,
  onRestart
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-slate-900 border-4 border-rose-600 rounded-2xl shadow-2xl p-6 text-center text-slate-100 flex flex-col items-center">
        {/* Skull Icon */}
        <div className="w-16 h-16 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center mb-3 animate-bounce">
          <Skull className="w-8 h-8 text-rose-500" />
        </div>

        <h2 className="text-xl font-bold font-arcade text-rose-400 mb-1">
          KASTIL HANCUR!
        </h2>
        <p className="text-xs text-slate-400 font-sans mb-5">
          Pasukan monster berhasil menerobos pertahanan jalan berliku.
        </p>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2.5 mb-6 text-left">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Gelombang Terakhir</span>
              <span className="font-pixel text-sm text-slate-100 font-bold">{wave}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
            <Swords className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Musuh Ditumpas</span>
              <span className="font-pixel text-sm text-slate-100 font-bold">{stats.totalKills}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
            <Coins className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Emas Didapat</span>
              <span className="font-pixel text-sm text-amber-300 font-bold">{stats.goldEarned}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-pink-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Rank Tertinggi</span>
              <span className="font-pixel text-sm text-pink-400 font-bold">Rank {stats.highestRankAchieved}</span>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="pixel-btn pixel-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 font-arcade shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Coba Pertahankan Lagi!</span>
        </button>
      </div>
    </div>
  );
}
