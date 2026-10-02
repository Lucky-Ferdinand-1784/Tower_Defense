import React from 'react';
import { X, Map, Star, Shield, Skull, Coins, CheckCircle, Play } from 'lucide-react';
import { MAPS } from '../data/maps';

export default function LevelSelectModal({
  isOpen,
  onClose,
  activeMapId,
  onSelectLevel,
  levelStars = {},
  unlockedLevels = []
}) {
  if (!isOpen) return null;

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Mudah':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">Mudah</span>;
      case 'Normal':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/40">Normal</span>;
      case 'Sulit':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">Sulit</span>;
      case 'Sangat Sulit':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">Sangat Sulit</span>;
      case 'Neraka':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600/30 text-rose-400 border border-rose-500/50 animate-pulse">Neraka</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-850 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/40">
              <Map className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-arcade text-slate-100">Pilih Medan Tempur / Level</h2>
              <p className="text-xs text-slate-400 font-sans">Setiap level memiliki gelombang, jalur berliku, dan Bos yang berbeda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level List */}
        <div className="p-5 overflow-y-auto space-y-3.5">
          {MAPS.map((map) => {
            const isActive = map.id === activeMapId;
            const isUnlocked = unlockedLevels.includes(map.id) || map.levelNumber === 1;
            const stars = levelStars[map.id] || 0;

            return (
              <div
                key={map.id}
                className={`relative rounded-xl border-2 transition-all p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-slate-850 border-amber-500 shadow-lg shadow-amber-500/10'
                    : isUnlocked
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Color Biome Badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-slate-700 shadow-inner font-arcade text-xs font-bold text-slate-100"
                    style={{ backgroundColor: map.bgColor }}
                  >
                    L{map.levelNumber}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-arcade text-sm font-bold text-slate-100">{map.name}</span>
                      {getDifficultyBadge(map.difficulty)}
                      {isActive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">{map.subtitle}</p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 font-sans">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{map.totalWaves} Gelombang</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Skull className="w-3.5 h-3.5 text-rose-400" />
                        <span>Bos: <strong className="text-slate-200">{map.bossName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>Emas Awal: {map.startingGold || 400}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Stars & Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(st => (
                      <Star
                        key={st}
                        className={`w-4 h-4 ${
                          st <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {isActive ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-arcade">
                      <CheckCircle className="w-4 h-4" />
                      <span>Dipilih</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onSelectLevel(map.id);
                        onClose();
                      }}
                      className="pixel-btn pixel-btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5 font-arcade shadow"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Mainkan</span>
                    </button>
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
