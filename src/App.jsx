import React, { useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import TopBar from './components/TopBar';
import GameCanvas from './components/GameCanvas';
import CommanderBar from './components/CommanderBar';
import ShopPanel from './components/ShopPanel';
import TowerInspector from './components/TowerInspector';
import AchievementsModal from './components/AchievementsModal';
import HelpModal from './components/HelpModal';
import GameOverModal from './components/GameOverModal';
import LevelVictoryModal from './components/LevelVictoryModal';
import LevelSelectModal from './components/LevelSelectModal';
import BestiaryModal from './components/BestiaryModal';
import { MAPS } from './data/maps';
import { Sparkles, Trophy, Award, Zap, Skull } from 'lucide-react';

export default function App() {
  const engine = useGameEngine();
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);
  const [isBestiaryOpen, setIsBestiaryOpen] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);

  const unclaimedAchievementsCount = engine.achievements.filter(a => a.completed && !a.claimed).length;

  const getToastIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Skull': return <Skull className="w-5 h-5 text-rose-500" />;
      default: return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* CRT Scanline Retro Arcade Effect */}
      {crtEnabled && <div className="crt-overlay" />}

      {/* Top Navigation & Status Bar */}
      <TopBar
        baseHp={engine.baseHp}
        maxBaseHp={engine.maxBaseHp}
        gold={engine.gold}
        wave={engine.wave}
        totalLevelWaves={engine.totalLevelWaves}
        waveInProgress={engine.waveInProgress}
        onStartNextWave={engine.startNextWave}
        autoWave={engine.autoWave}
        setAutoWave={engine.setAutoWave}
        gameSpeed={engine.gameSpeed}
        setGameSpeed={engine.setGameSpeed}
        isPaused={engine.isPaused}
        setIsPaused={engine.setIsPaused}
        weather={engine.weather}
        weatherTimeLeft={engine.weatherTimeLeft}
        incomingWeatherAlert={engine.incomingWeatherAlert}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
        onOpenBestiary={() => setIsBestiaryOpen(true)}
        unclaimedCount={unclaimedAchievementsCount}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        maps={MAPS}
        activeMap={engine.activeMap}
        onChangeMap={(mapId) => engine.handleSelectLevel(mapId)}
      />

      {/* Center Arena Stage */}
      <main className="relative flex-1 flex items-center justify-center overflow-hidden bg-slate-950 p-1 sm:p-2">
        {/* Commander Global Spells Bar (Left) */}
        <CommanderBar
          onSelectSpell={engine.handleSelectSpell}
          activeSpell={engine.activeSpell}
          spellCooldowns={engine.spellCooldowns}
        />

        {/* Selected Tower Inspector & Progression Tree (Right) */}
        <TowerInspector
          tower={engine.selectedPlacedTower}
          gold={engine.gold}
          onUpgrade={engine.handleUpgradeTower}
          onSell={engine.handleSellTower}
          onChangeStrategy={engine.handleChangeTargetStrategy}
          onTriggerSkill={engine.handleTriggerTowerSkill}
          onClose={() => engine.setSelectedPlacedTower(null)}
        />

        {/* HTML5 Pixel Canvas Game Field */}
        <GameCanvas
          gameState={engine}
          activeMap={engine.activeMap}
          weather={engine.weather}
          selectedTowerType={engine.selectedTowerType}
          selectedPlacedTower={engine.selectedPlacedTower}
          onSelectPlacedTower={engine.setSelectedPlacedTower}
          onPlaceTower={engine.handlePlaceTower}
          activeSpell={engine.activeSpell}
          onCastSpellAt={(x, y) => engine.executeCommanderSpell(engine.activeSpell, x, y)}
          gameSpeed={engine.gameSpeed}
          isPaused={engine.isPaused}
        />
      </main>

      {/* Bottom Shop Panel (Buy Character Towers) */}
      <ShopPanel
        gold={engine.gold}
        selectedTowerType={engine.selectedTowerType}
        onSelectTowerType={engine.setSelectedTowerType}
        onCancelPlacement={() => engine.setSelectedTowerType(null)}
      />

      {/* Global In-Game Toast Banner */}
      {engine.toastNotification && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900/95 border-2 border-amber-400 text-slate-100 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/40">
            {getToastIcon(engine.toastNotification.icon)}
          </div>
          <div>
            <div className="font-bold text-xs font-arcade text-amber-300">
              {engine.toastNotification.title}
            </div>
            <div className="text-xs text-slate-300 font-sans">
              {engine.toastNotification.message}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <LevelSelectModal
        isOpen={isLevelSelectOpen}
        onClose={() => setIsLevelSelectOpen(false)}
        activeMapId={engine.activeMap.id}
        onSelectLevel={engine.handleSelectLevel}
        levelStars={engine.levelStars}
        unlockedLevels={engine.unlockedLevels}
      />

      <LevelVictoryModal
        isOpen={engine.isLevelVictory}
        victoryData={engine.levelVictoryData}
        onNextLevel={() => {
          engine.handleNextLevel();
          engine.setIsLevelVictory(false);
        }}
        onReplay={() => {
          engine.handleReplayCurrentLevel();
          engine.setIsLevelVictory(false);
        }}
        onOpenLevelSelect={() => {
          engine.setIsLevelVictory(false);
          setIsLevelSelectOpen(true);
        }}
        onClose={() => engine.setIsLevelVictory(false)}
      />

      <BestiaryModal
        isOpen={isBestiaryOpen}
        onClose={() => setIsBestiaryOpen(false)}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={engine.achievements}
        onClaimReward={engine.claimAchievementReward}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <GameOverModal
        isOpen={engine.isGameOver}
        wave={engine.wave}
        stats={engine.stats}
        onRestart={engine.restartGame}
      />
    </div>
  );
}
