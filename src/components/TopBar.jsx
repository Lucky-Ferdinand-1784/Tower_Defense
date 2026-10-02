import React, { useState } from 'react';
import {
  Heart, Coins, Shield, Play, Pause, FastForward,
  Volume2, VolumeX, Music, Tv, Trophy, HelpCircle,
  Sun, CloudLightning, Snowflake, CloudFog, Flame,
  AlertTriangle, Map, Skull
} from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function TopBar({
  baseHp,
  maxBaseHp,
  gold,
  wave,
  totalLevelWaves,
  waveInProgress,
  onStartNextWave,
  autoWave,
  setAutoWave,
  gameSpeed,
  setGameSpeed,
  isPaused,
  setIsPaused,
  weather,
  weatherTimeLeft,
  incomingWeatherAlert,
  onOpenAchievements,
  onOpenHelp,
  onOpenLevelSelect,
  onOpenBestiary,
  unclaimedCount,
  crtEnabled,
  setCrtEnabled,
  maps,
  activeMap,
  onChangeMap
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [bgmActive, setBgmActive] = useState(false);
  const [showWeatherTooltip, setShowWeatherTooltip] = useState(false);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const toggleBgm = () => {
    const active = sound.toggleBgm();
    setBgmActive(active);
  };

  const isFinalWave = wave === (totalLevelWaves || 6);

  const getWeatherIcon = (id) => {
    switch (id) {
      case 'rain': return <CloudLightning className="w-5 h-5 text-sky-400 animate-pulse" />;
      case 'snow': return <Snowflake className="w-5 h-5 text-cyan-200 animate-spin" style={{ animationDuration: '6s' }} />;
      case 'fog': return <CloudFog className="w-5 h-5 text-purple-400" />;
      case 'heatwave': return <Flame className="w-5 h-5 text-orange-400 animate-bounce" />;
      default: return <Sun className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />;
    }
  };

  return (
    <header className="w-full bg-slate-900/90 border-b-2 border-slate-700 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-sm select-none z-20 backdrop-blur-md shadow-lg">
      {/* Left: Base HP, Gold, & Level Selector Button */}
      <div className="flex items-center gap-3">
        {/* Castle Health */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded border border-rose-500/40 shadow-inner">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Kastil HP</span>
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-xs text-rose-300 font-bold">{baseHp} / {maxBaseHp}</span>
              <div className="w-12 sm:w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${Math.max(0, (baseHp / maxBaseHp) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gold */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded border border-amber-500/40 shadow-inner">
          <Coins className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-coin" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Emas</span>
            <span className="font-pixel text-xs text-amber-300 font-bold">{gold}</span>
          </div>
        </div>

        {/* Level Selector Button */}
        <button
          onClick={onOpenLevelSelect}
          className="flex items-center gap-1.5 bg-indigo-950/80 hover:bg-indigo-900/90 text-slate-100 border border-indigo-500/50 px-2.5 py-1.5 rounded-lg transition shadow cursor-pointer"
          title="Klik untuk memilih level atau stage lain"
        >
          <Map className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-indigo-300 uppercase font-bold font-arcade leading-tight">Level {activeMap.levelNumber}</span>
            <span className="text-xs font-bold text-slate-200 hidden sm:inline max-w-[130px] truncate">{activeMap.name.split(':')[1] || activeMap.name}</span>
          </div>
          <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1 py-0.5 rounded font-mono ml-0.5">Peta</span>
        </button>
      </div>

      {/* Middle: Wave Status & Dynamic Weather Widget */}
      <div className="flex items-center gap-3">
        {/* Wave Banner */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${isFinalWave ? 'bg-rose-950/80 border-rose-500/70 shadow-lg shadow-rose-500/20' : 'bg-slate-800 border-indigo-500/40'}`}>
          {isFinalWave ? (
            <Skull className="w-4 h-4 text-rose-500 animate-bounce" />
          ) : (
            <Shield className="w-4 h-4 text-indigo-400" />
          )}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-slate-400 uppercase font-bold">Gelombang</span>
              {isFinalWave && (
                <span className="px-1 py-0.2 rounded bg-rose-600 text-white text-[8px] font-bold font-arcade animate-pulse">
                  BOS!
                </span>
              )}
            </div>
            <span className={`font-pixel text-xs font-bold ${isFinalWave ? 'text-rose-300' : 'text-indigo-300'}`}>
              {wave} <span className="text-[10px] text-slate-400 font-sans">/ {totalLevelWaves || 6}</span>
            </span>
          </div>

          <button
            onClick={onStartNextWave}
            disabled={waveInProgress}
            className={`pixel-btn ${waveInProgress ? 'opacity-40 cursor-not-allowed' : (isFinalWave ? 'pixel-btn-danger' : 'pixel-btn-primary')} text-[11px] py-1 px-2.5 ml-1`}
          >
            {waveInProgress ? 'Bertempur...' : (isFinalWave ? 'Lawan Bos!' : 'Mulai Wave!')}
          </button>

          <label className="flex items-center gap-1 text-[10px] text-slate-400 cursor-pointer ml-1">
            <input
              type="checkbox"
              checked={autoWave}
              onChange={(e) => setAutoWave(e.target.checked)}
              className="accent-indigo-500 cursor-pointer"
            />
            Auto
          </label>
        </div>

        {/* Dynamic Weather Pill with interactive tooltip */}
        <div
          className="relative flex items-center gap-2 px-3 py-1.5 rounded border cursor-help transition-all"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            borderColor: weather.color,
            boxShadow: `0 0 10px ${weather.glowColor}`
          }}
          onMouseEnter={() => setShowWeatherTooltip(true)}
          onMouseLeave={() => setShowWeatherTooltip(false)}
        >
          {getWeatherIcon(weather.id)}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs" style={{ color: weather.color }}>{weather.name}</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1 rounded">{weatherTimeLeft}s</span>
            </div>
            <span className="text-[10px] text-slate-300 font-sans truncate max-w-[130px]">{weather.title}</span>
          </div>

          {/* Incoming Weather Alert Banner */}
          {incomingWeatherAlert && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-amber-500/90 text-slate-950 font-bold text-[11px] px-2.5 py-1 rounded shadow-xl flex items-center gap-1.5 border border-amber-300 animate-bounce z-30">
              <AlertTriangle className="w-4 h-4 text-amber-950 flex-shrink-0" />
              <span>{incomingWeatherAlert}</span>
            </div>
          )}

          {/* Hover Tooltip detailing weather effects */}
          {showWeatherTooltip && (
            <div className="absolute top-12 left-0 w-72 bg-slate-900/95 border-2 border-slate-600 rounded p-3 shadow-2xl text-xs z-30 text-left">
              <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-700">
                {getWeatherIcon(weather.id)}
                <span className="font-bold font-arcade" style={{ color: weather.color }}>{weather.name} ({weather.title})</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed mb-2">{weather.description}</p>
              <div className="text-[10px] text-slate-400 bg-slate-800/80 p-1.5 rounded space-y-0.5">
                {weather.id === 'sunny' && <div>• Jangkauan Semua Menara: <span className="text-emerald-400 font-bold">+15%</span></div>}
                {weather.id === 'sunny' && <div>• Bonus Bakar Api: <span className="text-amber-400 font-bold">+25%</span></div>}
                {weather.id === 'rain' && <div>• Musuh Melambat: <span className="text-sky-400 font-bold">-10%</span></div>}
                {weather.id === 'rain' && <div>• Kerusakan Menara Petir: <span className="text-yellow-400 font-bold">+35% & Rantai +2</span></div>}
                {weather.id === 'snow' && <div>• Musuh Melambat: <span className="text-cyan-400 font-bold">-25%</span></div>}
                {weather.id === 'snow' && <div>• Peluang Pembekuan Es: <span className="text-cyan-300 font-bold">+35%</span></div>}
                {weather.id === 'fog' && <div>• Penglihatan Menara: <span className="text-rose-400 font-bold">-15%</span></div>}
                {weather.id === 'fog' && <div>• Peluang Serangan Kritis: <span className="text-purple-300 font-bold">+35%</span></div>}
                {weather.id === 'heatwave' && <div>• Damage Panas Pasif ke Musuh: <span className="text-orange-400 font-bold">5 DPS</span></div>}
                {weather.id === 'heatwave' && <div>• Kecepatan Serang Menara: <span className="text-amber-300 font-bold">+20%</span></div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Game Speed & Utility Controls */}
      <div className="flex items-center gap-2">
        {/* Speed Controls */}
        <div className="flex items-center bg-slate-800/80 rounded border border-slate-700 p-0.5">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Lanjutkan' : 'Jeda Permainan'}
            className={`p-1.5 rounded transition ${isPaused ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
          >
            {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setGameSpeed(1)}
            className={`px-2 py-1 text-xs font-mono rounded font-bold transition ${gameSpeed === 1 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            1x
          </button>
          <button
            onClick={() => setGameSpeed(2)}
            className={`px-2 py-1 text-xs font-mono rounded font-bold transition ${gameSpeed === 2 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            2x
          </button>
          <button
            onClick={() => setGameSpeed(3)}
            className={`px-2 py-1 text-xs font-mono rounded font-bold transition ${gameSpeed === 3 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            3x
          </button>
          <button
            onClick={() => setGameSpeed(5)}
            title="Kecepatan Turbo 5x"
            className={`px-2 py-1 text-xs font-mono rounded font-bold transition ${gameSpeed === 5 ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-amber-300'}`}
          >
            5x ⚡
          </button>
        </div>

        {/* Audio Toggles */}
        <button
          onClick={toggleMute}
          title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
          className={`p-2 rounded border border-slate-700 transition ${isMuted ? 'bg-rose-950/60 text-rose-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleBgm}
          title={bgmActive ? 'Matikan Musik 8-Bit' : 'Nyalakan Musik 8-Bit'}
          className={`p-2 rounded border border-slate-700 transition ${bgmActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Music className="w-4 h-4" />
        </button>

        {/* CRT Scanline Toggle */}
        <button
          onClick={() => setCrtEnabled(!crtEnabled)}
          title={crtEnabled ? 'Matikan Filter Layar Arcade CRT' : 'Nyalakan Filter Layar Arcade CRT'}
          className={`p-2 rounded border border-slate-700 transition ${crtEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Tv className="w-4 h-4" />
        </button>

        {/* Monster Bestiary Button */}
        <button
          onClick={onOpenBestiary}
          title="Buka Ensiklopedia & Bestiari Monster"
          className="pixel-btn bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/50 py-1.5 px-2.5 text-xs flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Skull className="w-4 h-4 text-rose-400" />
          <span className="hidden md:inline font-arcade text-[11px]">Monster</span>
        </button>

        {/* Achievements Modal Button */}
        <button
          onClick={onOpenAchievements}
          className="relative pixel-btn pixel-btn-warning text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          <Trophy className="w-4 h-4 text-amber-950 fill-amber-950" />
          <span className="hidden sm:inline font-arcade">Pencapaian</span>
          {unclaimedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce border border-white">
              {unclaimedCount}
            </span>
          )}
        </button>

        {/* Help / Guide */}
        <button
          onClick={onOpenHelp}
          title="Panduan Bermain"
          className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
