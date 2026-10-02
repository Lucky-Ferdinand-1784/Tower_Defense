import React from 'react';
import { Trophy, Star, ArrowRight, RotateCcw, Map, Coins, ShieldCheck } from 'lucide-react';

export default function LevelVictoryModal({
  isOpen,
  victoryData,
  onNextLevel,
  onReplay,
  onOpenLevelSelect,
  onClose
}) {
  if (!isOpen || !victoryData) return null;

  const { levelName, levelNumber, stars, bonusGold, castleHpRemaining, nextMapId, nextMapName } = victoryData;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-slate-900 border-4 border-amber-500 rounded-2xl shadow-2xl p-6 text-center text-slate-100 flex flex-col items-center relative overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy Header Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-4 border-amber-300 flex items-center justify-center mb-4 shadow-xl shadow-amber-500/30 animate-bounce">
          <Trophy className="w-10 h-10 text-slate-950" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-arcade mb-2">
          LEVEL {levelNumber} SELESAI!
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-arcade text-amber-300 mb-1">
          KEMENANGAN TELAK!
        </h2>
        <p className="text-xs text-slate-300 font-sans mb-5 max-w-sm">
          Semua gelombang monster di <span className="text-amber-200 font-bold">{levelName}</span> berhasil ditumpas!
        </p>

        {/* 3 Stars Rating */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map(starNum => {
            const isEarned = starNum <= stars;
            return (
              <div
                key={starNum}
                className={`flex flex-col items-center transition-all duration-500 transform ${
                  isEarned ? 'scale-110' : 'scale-90 opacity-40'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${
                    isEarned
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 border-amber-200 shadow-lg shadow-amber-500/40'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      isEarned ? 'text-amber-950 fill-amber-950' : 'text-slate-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Stats Breakdown */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <Coins className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Bonus Hadiah</span>
              <span className="font-pixel text-sm text-amber-300 font-bold">+{bonusGold} Emas</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Sisa HP Kastil</span>
              <span className="font-pixel text-sm text-emerald-300 font-bold">{castleHpRemaining} / 20</span>
            </div>
          </div>
        </div>

        {/* Unlocked Next Level Notification */}
        {nextMapId && (
          <div className="w-full bg-indigo-950/60 border border-indigo-500/40 rounded-xl p-3 mb-6 flex items-center gap-3 text-left">
            <Map className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="text-indigo-300 font-bold font-arcade block text-[11px]">Level Baru Terbuka!</span>
              <span className="text-slate-300 text-[11px]">{nextMapName}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          {nextMapId ? (
            <button
              onClick={onNextLevel}
              className="pixel-btn pixel-btn-primary flex-1 py-3 text-xs flex items-center justify-center gap-2 font-arcade shadow-lg"
            >
              <span>Level Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="pixel-btn pixel-btn-primary flex-1 py-3 text-xs flex items-center justify-center gap-2 font-arcade shadow-lg"
            >
              <span>Selesai & Lanjut Main</span>
            </button>
          )}

          <button
            onClick={onReplay}
            className="pixel-btn bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 py-3 px-4 text-xs flex items-center justify-center gap-2 font-arcade"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Ulang</span>
          </button>

          <button
            onClick={onOpenLevelSelect}
            className="pixel-btn bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 py-3 px-4 text-xs flex items-center justify-center gap-2 font-arcade"
          >
            <Map className="w-4 h-4" />
            <span>Pilih Level</span>
          </button>
        </div>
      </div>
    </div>
  );
}
