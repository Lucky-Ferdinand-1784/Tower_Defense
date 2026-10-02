import React from 'react';
import { TOWER_TYPES } from '../data/towers';
import { Coins, X, Info } from 'lucide-react';

export default function ShopPanel({
  gold,
  selectedTowerType,
  onSelectTowerType,
  onCancelPlacement
}) {
  const towersList = Object.values(TOWER_TYPES);

  return (
    <div className="w-full bg-slate-900/95 border-t-2 border-slate-700 px-3 py-2 z-20 backdrop-blur-md shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Placement Status / Guide */}
        <div className="flex items-center gap-2">
          {selectedTowerType ? (
            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/60 px-3 py-1.5 rounded-lg text-emerald-300 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">Menempatkan: {selectedTowerType.name}</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">(Klik rumput di luar jalan)</span>
              <button
                onClick={onCancelPlacement}
                className="pixel-btn pixel-btn-danger text-[10px] py-0.5 px-1.5 ml-2"
              >
                <X className="w-3.5 h-3.5" /> Batal
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-xs bg-slate-800/60 px-3 py-1.5 rounded border border-slate-700">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Pilih karakter untuk diletakkan di sepanjang jalan berliku:</span>
            </div>
          )}
        </div>

        {/* 6 Character Cards */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          {towersList.map((tower) => {
            const canAfford = gold >= tower.baseCost;
            const isSelected = selectedTowerType && selectedTowerType.id === tower.id;
            const baseRank = tower.ranks[0];

            return (
              <button
                key={tower.id}
                onClick={() => {
                  if (isSelected) {
                    onCancelPlacement();
                  } else if (canAfford) {
                    onSelectTowerType(tower);
                  }
                }}
                disabled={!canAfford && !isSelected}
                className={`group relative flex flex-col items-center justify-between p-2 rounded-lg border-2 text-center transition-all min-w-[105px] max-w-[125px] flex-shrink-0 ${
                  isSelected
                    ? 'bg-emerald-900/80 border-emerald-400 ring-2 ring-emerald-400 -translate-y-1'
                    : canAfford
                      ? 'bg-slate-800/90 border-slate-700 hover:border-slate-400 hover:bg-slate-750 hover:-translate-y-0.5'
                      : 'bg-slate-950/60 border-slate-800 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Element Badge */}
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className="text-[9px] font-bold px-1 rounded uppercase tracking-wider"
                    style={{
                      backgroundColor: `${tower.color}25`,
                      color: tower.color,
                      border: `1px solid ${tower.color}50`
                    }}
                  >
                    {tower.element}
                  </span>
                  {/* Cost */}
                  <div className="flex items-center gap-0.5 text-amber-300 font-pixel text-[10px] font-bold">
                    <Coins className="w-3 h-3 text-amber-400" />
                    <span>{tower.baseCost}</span>
                  </div>
                </div>

                {/* Character Name */}
                <span className="font-bold text-xs text-slate-100 font-arcade truncate w-full mb-1">
                  {tower.name}
                </span>

                {/* Stat summary */}
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-2 w-full bg-slate-900/60 py-0.5 rounded">
                  <span>DMG {baseRank.damage}</span>
                  <span>RNG {baseRank.range}</span>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[9px] font-bold px-1.5 rounded-full shadow">
                    Dipilih
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
