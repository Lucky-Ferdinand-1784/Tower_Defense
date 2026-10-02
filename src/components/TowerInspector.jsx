import React from 'react';
import { TOWER_TYPES, RANKS } from '../data/towers';
import {
  ChevronUp, Coins, X, Target, Zap, Shield, Sparkles,
  Lock, CheckCircle2, Trash2, Crosshair, Eye, Flame,
  Snowflake, Radio, Skull, Crown
} from 'lucide-react';

export default function TowerInspector({
  tower,
  gold,
  onUpgrade,
  onSell,
  onChangeStrategy,
  onTriggerSkill,
  onClose
}) {
  if (!tower) return null;

  const towerConfig = TOWER_TYPES[tower.type];
  const currentRankIndex = tower.rank - 1;
  const currentRankInfo = RANKS[currentRankIndex];
  const nextRankConfig = tower.rank < 5 ? towerConfig.ranks[tower.rank] : null;
  const upgradeCost = tower.currentRankConfig.upgradeCost || 0;
  const canAffordUpgrade = tower.rank < 5 && gold >= upgradeCost;

  // 70% sell refund
  let totalSpent = towerConfig.baseCost;
  for (let r = 1; r < tower.rank; r++) {
    totalSpent += towerConfig.ranks[r - 1].upgradeCost;
  }
  const sellRefund = Math.floor(totalSpent * 0.7);

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-4 h-4 text-emerald-400" />;
      case 'Crosshair': return <Crosshair className="w-4 h-4 text-amber-400" />;
      case 'Wind': return <Zap className="w-4 h-4 text-sky-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-rose-400" />;
      case 'Snowflake': return <Snowflake className="w-4 h-4 text-cyan-400" />;
      case 'Radio': return <Radio className="w-4 h-4 text-yellow-400" />;
      case 'Skull': return <Skull className="w-4 h-4 text-purple-400" />;
      case 'Crown': return <Crown className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="absolute top-16 right-4 w-88 max-w-[90vw] bg-slate-900/95 border-2 border-slate-700 rounded-xl p-4 shadow-2xl z-30 backdrop-blur-md text-slate-100 select-none animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-700/80 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase"
              style={{
                backgroundColor: `${towerConfig.color}25`,
                color: towerConfig.color,
                border: `1px solid ${towerConfig.color}50`
              }}
            >
              {towerConfig.category}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-arcade ${currentRankInfo.badgeClass}`}>
              Rank {tower.rank}: {currentRankInfo.title}
            </span>
          </div>
          <h3 className="text-base font-bold font-arcade mt-1 text-slate-100">{towerConfig.name}</h3>
          <span className="text-xs text-slate-400 font-sans">{tower.currentRankConfig.title}</span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Combat Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-center">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Serangan</span>
          <span className="font-pixel text-xs text-rose-400 font-bold">{tower.currentRankConfig.damage}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Jangkauan</span>
          <span className="font-pixel text-xs text-sky-400 font-bold">{tower.currentRange}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Kecepatan</span>
          <span className="font-pixel text-xs text-amber-400 font-bold">{tower.currentRankConfig.attackRate}/s</span>
        </div>
      </div>

      {/* Progressive Skill Unlock Tree (Sistem Skill Terunlock) */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold font-arcade text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Sistem Skill Terunlock
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Rank {tower.rank} / 5</span>
        </div>

        {/* Skill progression list */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {towerConfig.ranks.slice(1).map((rankData, idx) => {
            const skillRankLevel = idx + 2; // Rank 2, 3, 4, 5
            const isUnlocked = tower.rank >= skillRankLevel;
            const skill = rankData.unlockedSkill;
            if (!skill) return null;

            return (
              <div
                key={skill.id}
                className={`p-2 rounded-lg border text-xs transition-all ${
                  isUnlocked
                    ? 'bg-slate-800/90 border-indigo-500/50 shadow-sm'
                    : 'bg-slate-950/50 border-slate-800/80 opacity-55'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {getSkillIcon(skill.icon)}
                    <span className={`font-bold font-arcade ${isUnlocked ? 'text-slate-200' : 'text-slate-400'}`}>
                      {skill.name}
                    </span>
                    <span className="text-[9px] px-1 rounded bg-slate-900 border border-slate-700 text-slate-400 uppercase">
                      {skill.type === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>

                  {isUnlocked ? (
                    <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terbuka
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                      <Lock className="w-3 h-3" /> Rank {skillRankLevel}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{skill.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Active Skill Trigger Button (if Rank >= 4) */}
      {tower.rank >= 4 && tower.currentRankConfig.unlockedSkill?.type === 'active' && (
        <div className="mb-3">
          <button
            onClick={() => onTriggerSkill(tower.id)}
            disabled={tower.activeSkillCooldown > 0}
            className={`w-full py-2 px-3 rounded-lg border-2 font-arcade text-xs flex items-center justify-center gap-2 transition ${
              tower.activeSkillCooldown <= 0
                ? 'bg-indigo-600 border-indigo-400 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/40'
                : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
            }`}
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>
              {tower.activeSkillCooldown <= 0
                ? `Aktifkan: ${tower.currentRankConfig.unlockedSkill.name}!`
                : `Cooldown (${Math.ceil(tower.activeSkillCooldown)}s)`}
            </span>
          </button>
        </div>
      )}

      {/* Target Priority Selector */}
      <div className="mb-3 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
          <Target className="w-3.5 h-3.5 text-slate-400" />
          <span>Prioritas Target:</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[
            { id: 'first', label: 'Pertama' },
            { id: 'last', label: 'Terakhir' },
            { id: 'strongest', label: 'Terkuat' },
            { id: 'weakest', label: 'Terlemah' }
          ].map(strat => (
            <button
              key={strat.id}
              onClick={() => onChangeStrategy(tower.id, strat.id)}
              className={`py-1 text-[10px] font-bold rounded border transition ${
                tower.targetStrategy === strat.id
                  ? 'bg-indigo-600 border-indigo-400 text-white'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {strat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade & Sell Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-700/80">
        {/* Upgrade Rank Button */}
        {tower.rank < 5 ? (
          <button
            onClick={() => onUpgrade(tower.id)}
            disabled={!canAffordUpgrade}
            className={`flex-1 pixel-btn ${canAffordUpgrade ? 'pixel-btn-success' : 'opacity-50 cursor-not-allowed'} py-2 text-xs flex items-center justify-center gap-1.5`}
          >
            <ChevronUp className="w-4 h-4" />
            <div className="flex flex-col items-center">
              <span>Naik ke Rank {tower.rank + 1}</span>
              <div className="flex items-center gap-1 text-[10px] text-amber-200">
                <Coins className="w-3 h-3 text-amber-400" />
                <span>{upgradeCost} Emas</span>
              </div>
            </div>
          </button>
        ) : (
          <div className="flex-1 bg-rose-950/60 border border-rose-500/50 py-2 rounded text-center text-xs font-arcade text-rose-300 font-bold">
            Rank Maksimal (Mythic)!
          </div>
        )}

        {/* Sell Button */}
        <button
          onClick={() => onSell(tower.id)}
          className="pixel-btn pixel-btn-danger py-2 px-3 text-xs flex flex-col items-center justify-center"
          title="Jual karakter untuk mendapatkan kembali sebagian koin emas"
        >
          <div className="flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Jual</span>
          </div>
          <span className="text-[10px] text-amber-200 font-mono">+{sellRefund} G</span>
        </button>
      </div>
    </div>
  );
}
