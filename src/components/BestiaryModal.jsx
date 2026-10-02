import React, { useState, useEffect, useRef } from 'react';
import { X, Skull, Shield, Zap, Wind, Eye, Award, Flame, Snowflake, AlertCircle } from 'lucide-react';
import { ENEMY_TYPES } from '../data/enemies';
import { drawEnemy } from '../utils/pixelRenderer';

export default function BestiaryModal({ isOpen, onClose }) {
  const [selectedEnemyId, setSelectedEnemyId] = useState('slime');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const previewCanvasRef = useRef(null);

  const categories = ['Semua', 'Lembah', 'Rawa', 'Gurun', 'Gletser', 'Neraka', 'Boss'];
  const allEnemies = Object.values(ENEMY_TYPES);

  const filteredEnemies = allEnemies.filter(e => {
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Boss') return e.isBoss;
    return e.levelCategory === activeCategory;
  });

  const selectedEnemy = ENEMY_TYPES[selectedEnemyId] || allEnemies[0];

  // Draw animated monster preview on the mini canvas
  useEffect(() => {
    if (!isOpen || !selectedEnemy) return;

    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    const render = (timeMs) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark pedestal circle
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height / 2 + 18, 42, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dummy enemy object for drawing
      const dummyEnemy = {
        x: canvas.width / 2,
        y: canvas.height / 2 + 6,
        typeConfig: selectedEnemy,
        hp: selectedEnemy.baseHp,
        maxHp: selectedEnemy.baseHp,
        sandShieldHp: selectedEnemy.hasSandShield ? 800 : 0,
        isFrozen: false,
        isSlowed: false,
        isBurning: false,
        isPoisoned: false,
        isStunned: false
      };

      drawEnemy(ctx, dummyEnemy, timeMs * 0.001);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isOpen, selectedEnemy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-850 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-600/20 border border-rose-500/40">
              <Skull className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-arcade text-slate-100">Bestiari & Ensiklopedia Monster</h2>
              <p className="text-xs text-slate-400 font-sans">Daftar lengkap 20 jenis monster dan bos bertingkat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg font-arcade transition whitespace-nowrap text-[11px] ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main 2-Column Split: Monster Grid (Left) + Detail Profile (Right) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left: Monster Thumbnails (5 cols) */}
          <div className="md:col-span-5 p-4 overflow-y-auto space-y-2 border-r border-slate-800 max-h-[480px]">
            {filteredEnemies.map(enemy => {
              const isSelected = enemy.id === selectedEnemyId;
              return (
                <button
                  key={enemy.id}
                  onClick={() => setSelectedEnemyId(enemy.id)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                    isSelected
                      ? 'bg-slate-800 border-rose-500 shadow-md shadow-rose-500/10'
                      : 'bg-slate-950/50 border-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Small Color Dot */}
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20"
                      style={{ backgroundColor: enemy.color }}
                    />
                    <div>
                      <div className="font-arcade text-xs text-slate-200 font-bold flex items-center gap-1.5">
                        <span>{enemy.name}</span>
                        {enemy.isBoss && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-rose-600 text-white font-bold">
                            BOS
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans">{enemy.levelCategory}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-pixel text-[11px] text-rose-400 block font-bold">{enemy.baseHp} HP</span>
                    <span className="text-[10px] text-slate-500 font-sans">{enemy.speed} spd</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Tactical Inspector (7 cols) */}
          <div className="md:col-span-7 p-6 overflow-y-auto flex flex-col items-center max-h-[480px]">
            {/* Animated Canvas Preview */}
            <div className="w-40 h-32 rounded-2xl bg-slate-950 border-2 border-slate-800 shadow-inner flex items-center justify-center mb-4 overflow-hidden relative">
              <canvas
                ref={previewCanvasRef}
                width={160}
                height={128}
                className="w-full h-full"
                style={{ imageRendering: 'pixelated' }}
              />
              <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-arcade">LIVE PREVIEW</span>
            </div>

            {/* Monster Title */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold font-arcade text-slate-100 flex items-center justify-center gap-2">
                <span>{selectedEnemy.name}</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">Asal: Wilayah {selectedEnemy.levelCategory}</p>
            </div>

            {/* Core Stats Grid */}
            <div className="w-full grid grid-cols-3 gap-2 mb-4 text-center font-sans">
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Base HP</span>
                <span className="font-pixel text-sm text-rose-400 font-bold">{selectedEnemy.baseHp}</span>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Kecepatan</span>
                <span className="font-pixel text-sm text-sky-400 font-bold">{selectedEnemy.speed}</span>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Armor Fisik</span>
                <span className="font-pixel text-sm text-amber-400 font-bold">{selectedEnemy.armor || 0}</span>
              </div>
            </div>

            {/* Special Attributes Badges */}
            <div className="w-full flex flex-wrap gap-2 mb-4">
              {selectedEnemy.isFlying && (
                <div className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs flex items-center gap-1.5 font-sans">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Monster Terbang (Abaikan Bahaya Darat)</span>
                </div>
              )}
              {selectedEnemy.splitsOnDeath && (
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 font-sans">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Terbelah Menjadi {selectedEnemy.splitCount} Slime Saat Tewas</span>
                </div>
              )}
              {selectedEnemy.dodgeChance && (
                <div className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs flex items-center gap-1.5 font-sans">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Menghindar 28% Serangan Panah</span>
                </div>
              )}
              {selectedEnemy.physicalResist && (
                <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-1.5 font-sans">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Tahan Fisik -{Math.round(selectedEnemy.physicalResist * 100)}%</span>
                </div>
              )}
              {selectedEnemy.magicResist && (
                <div className="px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs flex items-center gap-1.5 font-sans">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Tahan Sihir -{Math.round(selectedEnemy.magicResist * 100)}%</span>
                </div>
              )}
              {selectedEnemy.fireImmune && (
                <div className="px-2.5 py-1 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs flex items-center gap-1.5 font-sans">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Kebal Bakaran Api</span>
                </div>
              )}
              {selectedEnemy.revivesOnce && (
                <div className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-1.5 font-sans">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>Bangkit Kembali Sekali (35% HP)</span>
                </div>
              )}
              {selectedEnemy.regenerationPerSec && (
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 font-sans">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Regenerasi +{selectedEnemy.regenerationPerSec} HP/detik</span>
                </div>
              )}
              {selectedEnemy.hasSandShield && (
                <div className="px-2.5 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs flex items-center gap-1.5 font-sans">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Perisai Badai Pasir 800 HP</span>
                </div>
              )}
              {selectedEnemy.weakness && (
                <div className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-1.5 font-sans">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Kelemahan: Petir & Golem Listrik</span>
                </div>
              )}
            </div>

            {/* Tactical Lore & Strategy */}
            <div className="w-full bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">Catatan Intelijen Tempur:</span>
              <p>{selectedEnemy.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
