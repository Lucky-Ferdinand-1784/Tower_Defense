import React, { useEffect } from 'react';
import { COMMANDER_SKILLS } from '../data/commanderSkills';
import { Flame, Snowflake, Zap, Coins } from 'lucide-react';

export default function CommanderBar({
  onSelectSpell,
  activeSpell,
  spellCooldowns
}) {
  const getIcon = (id) => {
    switch (id) {
      case 'meteor': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'freeze': return <Snowflake className="w-5 h-5 text-sky-400" />;
      case 'overdrive': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'gold_transmute': return <Coins className="w-5 h-5 text-amber-400" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  // Keyboard shortcuts 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        const skill = COMMANDER_SKILLS[index];
        if (skill) {
          onSelectSpell(skill);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectSpell]);

  return (
    <div className="absolute top-16 left-4 flex flex-col gap-2 z-20 select-none">
      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur self-start">
        Mantra Komandan
      </span>

      <div className="flex flex-col gap-1.5">
        {COMMANDER_SKILLS.map((skill, idx) => {
          const cd = spellCooldowns[skill.id] || 0;
          const isReady = cd <= 0;
          const isSelected = activeSpell && activeSpell.id === skill.id;

          return (
            <button
              key={skill.id}
              onClick={() => onSelectSpell(skill)}
              disabled={!isReady}
              title={`${skill.name} [${idx + 1}]: ${skill.desc}`}
              className={`relative group flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-left transition-all backdrop-blur-md shadow-md ${
                isSelected
                  ? 'bg-amber-600/90 border-amber-300 ring-2 ring-amber-400 scale-105'
                  : isReady
                    ? 'bg-slate-900/80 border-slate-700 hover:border-slate-400 hover:bg-slate-800'
                    : 'bg-slate-950/70 border-slate-800 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Icon */}
              <div className="relative">
                {getIcon(skill.id)}
                {/* Hotkey Tag */}
                <span className="absolute -bottom-2 -left-1 text-[9px] font-mono bg-slate-800 text-slate-300 px-1 rounded border border-slate-600">
                  {idx + 1}
                </span>
              </div>

              {/* Title & Status */}
              <div className="hidden sm:flex flex-col pr-1">
                <span className="text-xs font-bold font-arcade text-slate-100">{skill.name}</span>
                <span className="text-[10px] text-slate-400">
                  {isReady ? (isSelected ? 'Pilih Sasaran...' : 'Siap Pakai') : `Cooldown: ${Math.ceil(cd)}s`}
                </span>
              </div>

              {/* Cooldown Dark Overlay */}
              {!isReady && (
                <div
                  className="absolute inset-0 bg-slate-950/70 rounded-lg flex items-center justify-center pointer-events-none"
                  style={{
                    clipPath: `inset(${100 - (cd / skill.cooldown) * 100}% 0 0 0)`
                  }}
                >
                  <span className="text-xs font-pixel font-bold text-amber-300">{Math.ceil(cd)}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
