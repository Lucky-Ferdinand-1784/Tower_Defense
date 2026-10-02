import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { MAPS } from '../data/maps';
import { TOWER_TYPES, RANKS } from '../data/towers';
import { WEATHERS } from '../data/weather';
import { ENEMY_TYPES } from '../data/enemies';
import { getWaveData, getLevelTotalWaves } from '../data/waves';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { COMMANDER_SKILLS } from '../data/commanderSkills';
import { sound } from '../utils/soundEngine';

export function useGameEngine() {
  // Map & Game State
  const [activeMapId, setActiveMapId] = useState('valley');
  const activeMap = MAPS.find(m => m.id === activeMapId) || MAPS[0];

  // Level Progression & Victory
  const [unlockedLevels, setUnlockedLevels] = useState(['valley', 'swamp', 'desert', 'glacier', 'inferno']);
  const [levelStars, setLevelStars] = useState({ valley: 0, swamp: 0, desert: 0, glacier: 0, inferno: 0 });
  const [isLevelVictory, setIsLevelVictory] = useState(false);
  const [levelVictoryData, setLevelVictoryData] = useState(null);

  const [gold, setGold] = useState(400);
  const [baseHp, setBaseHp] = useState(20);
  const [maxBaseHp] = useState(20);
  const [wave, setWave] = useState(1);
  const [waveInProgress, setWaveInProgress] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1); // 1x, 2x, 4x
  const [isPaused, setIsPaused] = useState(false);
  const [autoWave, setAutoWave] = useState(true);

  // Weather System
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const weather = WEATHERS[currentWeatherIndex];
  const [weatherTimeLeft, setWeatherTimeLeft] = useState(weather.duration);
  const [incomingWeatherAlert, setIncomingWeatherAlert] = useState(null);

  // Entities
  const [towers, setTowers] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [projectiles, setProjectiles] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [hazards, setHazards] = useState([]); // Ground lava, traps

  // Shop & Selection
  const [selectedTowerType, setSelectedTowerType] = useState(null);
  const [selectedPlacedTower, setSelectedPlacedTower] = useState(null);

  // Commander Spells
  const [activeSpell, setActiveSpell] = useState(null);
  const [spellCooldowns, setSpellCooldowns] = useState({});
  const [overdriveBuffTimer, setOverdriveBuffTimer] = useState(0);

  // Achievements & Stats
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [stats, setStats] = useState({
    totalKills: 0,
    bossKills: 0,
    goldEarned: 380,
    spellsCast: 0,
    highestRankAchieved: 1,
    stormKills: 0,
    frozenCount: 0
  });

  const [toastNotification, setToastNotification] = useState(null);

  // Wave Spawning Queue
  const waveSpawnsRef = useRef([]);
  const spawnTimerRef = useRef(0);
  const idCounterRef = useRef(1);

  // Simulation Refs for Direct, Frame-Accurate Combat Physics & HP Deductions
  const enemiesRef = useRef([]);
  const projectilesRef = useRef([]);
  const towersRef = useRef([]);
  const floatingTextsRef = useRef([]);
  const hazardsRef = useRef([]);
  const waveInProgressRef = useRef(false);
  const statsRef = useRef(stats);

  // Show Toast Popup
  const showToast = (title, message, icon = 'Award') => {
    setToastNotification({ title, message, icon });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // Check and unlock achievements
  const checkAchievements = useCallback((newStats, currentTowers, currentWave) => {
    setAchievements(prev => {
      let updated = false;
      const nextList = prev.map(ach => {
        if (ach.completed) return ach;

        let isCompleted = false;
        let progress = ach.current;

        if (ach.id === 'first_blood' && newStats.totalKills >= 1) {
          isCompleted = true;
          progress = 1;
        } else if (ach.id === 'architect' && currentTowers.length >= 5) {
          isCompleted = true;
          progress = currentTowers.length;
        } else if (ach.id === 'rank_veteran' && newStats.highestRankAchieved >= 2) {
          isCompleted = true;
          progress = 1;
        } else if (ach.id === 'rank_master' && newStats.highestRankAchieved >= 4) {
          isCompleted = true;
          progress = 1;
        } else if (ach.id === 'mythic_ascension' && newStats.highestRankAchieved >= 5) {
          isCompleted = true;
          progress = 1;
        } else if (ach.id === 'full_roster') {
          const uniqueTypes = new Set(currentTowers.map(t => t.type)).size;
          progress = uniqueTypes;
          if (uniqueTypes >= 6) isCompleted = true;
        } else if (ach.id === 'storm_rider') {
          progress = newStats.stormKills;
          if (newStats.stormKills >= 25) isCompleted = true;
        } else if (ach.id === 'frost_shatter') {
          progress = newStats.frozenCount;
          if (newStats.frozenCount >= 50) isCompleted = true;
        } else if (ach.id === 'boss_slayer') {
          progress = newStats.bossKills;
          if (newStats.bossKills >= 1) isCompleted = true;
        } else if (ach.id === 'gold_tycoon') {
          progress = newStats.goldEarned;
          if (newStats.goldEarned >= 1500) isCompleted = true;
        } else if (ach.id === 'spell_caster') {
          progress = newStats.spellsCast;
          if (newStats.spellsCast >= 8) isCompleted = true;
        } else if (ach.id === 'wave_conqueror') {
          progress = currentWave;
          if (currentWave >= 10) isCompleted = true;
        }

        if (isCompleted && !ach.completed) {
          updated = true;
          sound.playAchievement();
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          showToast('Achievement Terbuka!', ach.title, ach.icon);
          return { ...ach, current: progress, completed: true };
        }

        return { ...ach, current: progress };
      });

      return updated ? nextList : prev;
    });
  }, []);

  // Claim Achievement Reward
  const claimAchievementReward = (achId) => {
    setAchievements(prev => prev.map(a => {
      if (a.id === achId && a.completed && !a.claimed) {
        setGold(g => g + a.rewardGold);
        sound.playEnemyDeath();
        showToast('Hadiah Diklaim!', `+${a.rewardGold} Koin Emas`);
        return { ...a, claimed: true };
      }
      return a;
    }));
  };

  // Weather Countdown & Switching
  useEffect(() => {
    if (isPaused || isGameOver) return;

    const timer = setInterval(() => {
      setWeatherTimeLeft(prev => {
        if (prev <= 1) {
          // Switch to next weather
          const nextIndex = (currentWeatherIndex + 1) % WEATHERS.length;
          const nextWeather = WEATHERS[nextIndex];
          setCurrentWeatherIndex(nextIndex);
          sound.playWeatherChange(nextWeather.id);
          showToast('Perubahan Cuaca!', `${nextWeather.name}: ${nextWeather.title}`, nextWeather.icon);
          setIncomingWeatherAlert(null);
          return nextWeather.duration;
        }

        // 10s warning
        if (prev === 11) {
          const upcoming = WEATHERS[(currentWeatherIndex + 1) % WEATHERS.length];
          setIncomingWeatherAlert(`Peringatan: ${upcoming.name} akan tiba dalam 10 detik!`);
        }

        return prev - 1;
      });
    }, 1000 / gameSpeed);

    return () => clearInterval(timer);
  }, [currentWeatherIndex, gameSpeed, isPaused, isGameOver]);

  // Start Next Wave
  const startNextWave = useCallback(() => {
    if (waveInProgressRef.current || isGameOver) return;

    const waveData = getWaveData(activeMap.id, wave);
    waveInProgressRef.current = true;
    setWaveInProgress(true);

    if (waveData.isBossWave) {
      sound.playBossAlert();
      showToast('PERINGATAN BOS!', waveData.title, 'Skull');
    } else {
      showToast(`Gelombang ${wave}`, waveData.title, 'Shield');
    }

    // Build spawn list
    const spawnQueue = [];
    let currentTime = 0;
    waveData.spawns.forEach(group => {
      for (let i = 0; i < group.count; i++) {
        spawnQueue.push({
          type: group.type,
          spawnAt: currentTime
        });
        currentTime += group.interval;
      }
    });

    waveSpawnsRef.current = spawnQueue;
    spawnTimerRef.current = 0;
  }, [activeMap.id, wave, waveInProgress, isGameOver]);

  // Validation function: Is placement valid?
  const isValidPlacement = useCallback((x, y, scaledWaypoints, pathWidth) => {
    // Within canvas bounds with padding
    if (x < 30 || x > 930 || y < 30 || y > 570) return false;

    // Must not be too close to the path
    const safeDist = pathWidth / 2 + 18;
    for (let i = 0; i < scaledWaypoints.length - 1; i++) {
      const p1 = scaledWaypoints[i];
      const p2 = scaledWaypoints[i + 1];

      // Distance from point to line segment
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const lenSq = dx * dx + dy * dy;
      let t = ((x - p1.x) * dx + (y - p1.y) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const projX = p1.x + t * dx;
      const projY = p1.y + t * dy;
      const dist = Math.hypot(x - projX, y - projY);

      if (dist < safeDist) {
        return false;
      }
    }

    // Must not overlap another tower
    for (const t of towers) {
      if (Math.hypot(t.x - x, t.y - y) < 36) {
        return false;
      }
    }

    return true;
  }, [towers]);

  // Buy and Place Tower
  const handlePlaceTower = useCallback((x, y) => {
    if (!selectedTowerType) return;

    const scaledWaypoints = activeMap.waypoints.map(wp => ({
      x: wp.x * 960,
      y: wp.y * 600
    }));

    if (!isValidPlacement(x, y, scaledWaypoints, activeMap.pathWidth || 38)) {
      return;
    }

    const cost = selectedTowerType.baseCost;
    if (gold < cost) {
      showToast('Koin Tidak Cukup!', `Membutuhkan ${cost} Koin Emas`);
      return;
    }

    // Deduct gold
    setGold(g => g - cost);
    sound.playPlace();

    const newTower = {
      id: `tower_${idCounterRef.current++}`,
      type: selectedTowerType.id,
      x,
      y,
      rank: 1,
      currentRankConfig: selectedTowerType.ranks[0],
      currentRange: selectedTowerType.ranks[0].range,
      attackCooldown: 0,
      activeSkillCooldown: 0,
      targetStrategy: 'first', // 'first', 'last', 'strongest', 'weakest'
      totalDamageDealt: 0,
      totalKills: 0,
      targetAngle: 0,
      currentTarget: null
    };

    towersRef.current = [...towersRef.current, newTower];
    setTowers([...towersRef.current]);
    checkAchievements(statsRef.current, towersRef.current, wave);

    setSelectedPlacedTower(newTower);
    setSelectedTowerType(null);
  }, [selectedTowerType, activeMap, isValidPlacement, gold, stats, wave, checkAchievements]);

  // Upgrade Tower Rank
  const handleUpgradeTower = useCallback((towerId) => {
    towersRef.current = towersRef.current.map(t => {
      if (t.id !== towerId) return t;

      if (t.rank >= 5) {
        showToast('Maksimal Rank!', 'Menara telah mencapai Rank 5 (Mythic)');
        return t;
      }

      const towerConfig = TOWER_TYPES[t.type];
      const nextRankIndex = t.rank; // 0-based for next
      const nextConfig = towerConfig.ranks[nextRankIndex];
      const cost = t.currentRankConfig.upgradeCost;

      if (gold < cost) {
        showToast('Koin Tidak Cukup!', `Upgrade butuh ${cost} Koin Emas`);
        return t;
      }

      setGold(g => g - cost);
      sound.playRankUp();
      confetti({ particleCount: 40, spread: 50 });

      const newRank = t.rank + 1;
      const rankTitle = RANKS[newRank - 1].title;
      showToast(`Pangkat Naik: ${rankTitle}!`, `${towerConfig.name} mencapai Rank ${newRank}`);

      const updatedStats = {
        ...statsRef.current,
        highestRankAchieved: Math.max(statsRef.current.highestRankAchieved, newRank)
      };
      statsRef.current = updatedStats;
      setStats(updatedStats);
      checkAchievements(updatedStats, towersRef.current, wave);

      const upgraded = {
        ...t,
        rank: newRank,
        currentRankConfig: nextConfig,
        currentRange: nextConfig.range
      };

      if (selectedPlacedTower && selectedPlacedTower.id === towerId) {
        setSelectedPlacedTower(upgraded);
      }

      return upgraded;
    });
    setTowers([...towersRef.current]);
  }, [gold, wave, selectedPlacedTower, checkAchievements]);

  // Sell Tower
  const handleSellTower = useCallback((towerId) => {
    const target = towersRef.current.find(t => t.id === towerId);
    if (!target) return;

    // 70% refund of base and upgrade costs
    const towerConfig = TOWER_TYPES[target.type];
    let totalSpent = towerConfig.baseCost;
    for (let r = 1; r < target.rank; r++) {
      totalSpent += towerConfig.ranks[r - 1].upgradeCost;
    }
    const refund = Math.floor(totalSpent * 0.7);

    setGold(g => g + refund);
    sound.playEnemyDeath();
    showToast('Karakter Dijual', `Mendapatkan +${refund} Koin Emas`);

    if (selectedPlacedTower && selectedPlacedTower.id === towerId) {
      setSelectedPlacedTower(null);
    }

    towersRef.current = towersRef.current.filter(t => t.id !== towerId);
    setTowers([...towersRef.current]);
  }, [selectedPlacedTower]);

  // Change Tower Target Strategy
  const handleChangeTargetStrategy = useCallback((towerId, strategy) => {
    towersRef.current = towersRef.current.map(t => {
      if (t.id === towerId) {
        const updated = { ...t, targetStrategy: strategy };
        if (selectedPlacedTower && selectedPlacedTower.id === towerId) {
          setSelectedPlacedTower(updated);
        }
        return updated;
      }
      return t;
    });
    setTowers([...towersRef.current]);
  }, [selectedPlacedTower]);

  // Trigger Tower Active Skill (Rank 4+)
  const handleTriggerTowerSkill = useCallback((towerId) => {
    const t = towersRef.current.find(tow => tow.id === towerId);
    if (!t) return;

    const skill = t.currentRankConfig.unlockedSkill;
    if (!skill || skill.type !== 'active') return;

    if (t.activeSkillCooldown > 0) {
      showToast('Sedang Cooldown!', `Tunggu ${Math.ceil(t.activeSkillCooldown)} detik`);
      return;
    }

    sound.playSpell(skill.id);
    showToast('Skill Aktif Digunakan!', `${t.currentRankConfig.title}: ${skill.name}`, 'Zap');

    // Trigger skill effect
    if (skill.id === 'arrow_storm') {
      // Shoot 12 rapid arrows
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const skillProj = {
            id: `skill_arrow_${idCounterRef.current++}`,
            towerId: t.id,
            towerType: 'archer',
            rank: t.rank,
            x: t.x,
            y: t.y,
            targetX: t.x + (Math.random() - 0.5) * 200,
            targetY: t.y + (Math.random() - 0.5) * 200,
            damage: t.currentRankConfig.damage * 0.8,
            speed: 14,
            type: 'arrow_wind',
            isCrit: true
          };
          projectilesRef.current.push(skillProj);
          setProjectiles([...projectilesRef.current]);
        }, i * 100);
      }
    } else if (skill.id === 'meteor_strike') {
      // Mini meteors
      const lavaHazard = {
        id: `lava_${idCounterRef.current++}`,
        type: 'lava',
        x: t.x + (Math.random() - 0.5) * 80,
        y: t.y + (Math.random() - 0.5) * 80,
        radius: 60,
        damagePerSec: 45,
        duration: 5
      };
      hazardsRef.current.push(lavaHazard);
      setHazards([...hazardsRef.current]);
    } else if (skill.id === 'instant_blizzard') {
      // Freeze all enemies within range
      enemiesRef.current = enemiesRef.current.map(e => {
        if (Math.hypot(e.x - t.x, e.y - t.y) <= t.currentRange + 40) {
          return { ...e, isFrozen: true, freezeTimer: 3.5 };
        }
        return e;
      });
      setEnemies([...enemiesRef.current]);
    } else if (skill.id === 'high_voltage_burst') {
      // Shockwave
      enemiesRef.current = enemiesRef.current.map(e => {
        if (Math.hypot(e.x - t.x, e.y - t.y) <= t.currentRange) {
          return {
            ...e,
            hp: Math.max(0, e.hp - t.currentRankConfig.damage * 2),
            isStunned: true,
            stunTimer: 2.0
          };
        }
        return e;
      });
      setEnemies([...enemiesRef.current]);
    } else if (skill.id === 'toxic_mist') {
      const mistHazard = {
        id: `mist_${idCounterRef.current++}`,
        type: 'toxic_mist',
        x: t.x,
        y: t.y,
        radius: 70,
        damagePerSec: 60,
        duration: 6
      };
      hazardsRef.current.push(mistHazard);
      setHazards([...hazardsRef.current]);
    } else if (skill.id === 'divine_sanctuary') {
      setBaseHp(h => Math.min(maxBaseHp, h + 3));
    }

    towersRef.current = towersRef.current.map(tow => {
      if (tow.id === towerId) {
        const up = { ...tow, activeSkillCooldown: skill.cooldown };
        if (selectedPlacedTower && selectedPlacedTower.id === towerId) {
          setSelectedPlacedTower(up);
        }
        return up;
      }
      return tow;
    });
    setTowers([...towersRef.current]);
  }, [maxBaseHp, selectedPlacedTower]);

  // Cast Commander Global Spells
  const handleSelectSpell = (spell) => {
    if (spellCooldowns[spell.id] > 0) {
      showToast('Mantra Belum Siap!', `Cooldown ${Math.ceil(spellCooldowns[spell.id])} detik`);
      return;
    }

    if (spell.needsTarget) {
      setActiveSpell(spell);
      showToast('Pilih Sasaran!', 'Klik area peta untuk memanggil Hujan Meteor', 'Flame');
    } else {
      executeCommanderSpell(spell, 0, 0);
    }
  };

  const executeCommanderSpell = (spell, targetX, targetY) => {
    sound.playSpell(spell.id);
    setSpellCooldowns(prev => ({ ...prev, [spell.id]: spell.cooldown }));
    setActiveSpell(null);

    setStats(s => {
      const updated = { ...s, spellsCast: s.spellsCast + 1 };
      checkAchievements(updated, towers, wave);
      return updated;
    });

    if (spell.id === 'meteor') {
      confetti({ particleCount: 30, origin: { x: targetX / 960, y: targetY / 600 } });
      // Damage all enemies in radius
      enemiesRef.current = enemiesRef.current.map(e => {
        const dist = Math.hypot(e.x - targetX, e.y - targetY);
        if (dist <= spell.radius) {
          const dmg = 450;
          return {
            ...e,
            hp: Math.max(0, e.hp - dmg),
            isBurning: true,
            burnTimer: 4.0,
            burnDPS: 35
          };
        }
        return e;
      });
      setEnemies([...enemiesRef.current]);

      // Spawn ground fire
      const crater = {
        id: `meteor_crater_${idCounterRef.current++}`,
        type: 'lava',
        x: targetX,
        y: targetY,
        radius: spell.radius,
        damagePerSec: 40,
        duration: 6
      };
      hazardsRef.current.push(crater);
      setHazards([...hazardsRef.current]);
      showToast('Hujan Meteor Menghantam!', 'Kerusakan Area Dahsyat Diberikan!');
    } else if (spell.id === 'freeze') {
      enemiesRef.current = enemiesRef.current.map(e => ({
        ...e,
        isFrozen: true,
        freezeTimer: 4.5
      }));
      setEnemies([...enemiesRef.current]);
      showToast('Pembekuan Total!', 'Seluruh Musuh Membeku Selama 4.5 Detik!', 'Snowflake');
    } else if (spell.id === 'overdrive') {
      setOverdriveBuffTimer(8);
      showToast('Adrenalin Tempur Aktif!', 'Kecepatan Serang +100% Selama 8 Detik!', 'Zap');
    } else if (spell.id === 'gold_transmute') {
      setGold(g => g + 180);
      showToast('Sentuhan Midas!', '+180 Koin Emas Ditambahkan!', 'Coins');
    }
  };

  // Main Game Loop Engine (Physics, Combat, Enemy Movement, Waves)
  useEffect(() => {
    if (isGameOver || isPaused) return;

    let lastTime = performance.now();
    let frameId;

    const gameLoop = (now) => {
      const rawDt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const dt = rawDt * gameSpeed;

      const scaledWaypoints = activeMap.waypoints.map(wp => ({
        x: wp.x * 960,
        y: wp.y * 600
      }));

      // 1. Tick Cooldowns & Timers
      setSpellCooldowns(prev => {
        let changed = false;
        const next = { ...prev };
        for (const k in next) {
          if (next[k] > 0) {
            next[k] = Math.max(0, next[k] - dt);
            changed = true;
          }
        }
        return changed ? next : prev;
      });

      if (overdriveBuffTimer > 0) {
        setOverdriveBuffTimer(t => Math.max(0, t - dt));
      }

      // 2. Wave Spawning
      if (waveInProgressRef.current && waveSpawnsRef.current.length > 0) {
        spawnTimerRef.current += dt * 1000;
        const nextSpawn = waveSpawnsRef.current[0];
        if (spawnTimerRef.current >= nextSpawn.spawnAt) {
          const typeDef = ENEMY_TYPES[nextSpawn.type] || ENEMY_TYPES.slime;
          const waveScale = 1 + (wave - 1) * 0.12;

          enemiesRef.current.push({
            id: `enemy_${idCounterRef.current++}`,
            typeConfig: typeDef,
            hp: Math.floor(typeDef.baseHp * waveScale),
            maxHp: Math.floor(typeDef.baseHp * waveScale),
            sandShieldHp: typeDef.hasSandShield ? (typeDef.shieldHp || 800) : 0,
            maxSandShieldHp: typeDef.hasSandShield ? (typeDef.shieldHp || 800) : 0,
            hasRevived: false,
            waypointIndex: 0,
            x: scaledWaypoints[0].x,
            y: scaledWaypoints[0].y,
            facing: 'right',
            speed: typeDef.speed,
            isFrozen: false,
            freezeTimer: 0,
            isSlowed: false,
            slowTimer: 0,
            slowMultiplier: 1.0,
            isBurning: false,
            burnTimer: 0,
            burnDPS: 0,
            isPoisoned: false,
            poisonStacks: 0,
            poisonTimer: 0,
            poisonDPS: 0,
            isStunned: false,
            stunTimer: 0
          });
          waveSpawnsRef.current.shift();
        }
      }

      // 3. Move & Update Enemies (DoT, regeneration, status effects, path movement)
      const survivingEnemies = [];
      let baseDamaged = 0;
      const dotSplits = [];
      let dotGold = 0;
      let dotKills = 0;
      let dotBossKills = 0;
      let dotStormKills = 0;

      for (const enemy of enemiesRef.current) {
        let {
          x, y, waypointIndex, hp, maxHp, isFrozen, freezeTimer,
          isSlowed, slowTimer, slowMultiplier, isBurning, burnTimer, burnDPS,
          isPoisoned, poisonStacks, poisonTimer, poisonDPS, isStunned, stunTimer,
          sandShieldHp, hasRevived
        } = enemy;

        // Natural Regeneration
        if (enemy.typeConfig.regenerationPerSec && !isBurning && hp < maxHp) {
          hp = Math.min(maxHp, hp + enemy.typeConfig.regenerationPerSec * dt);
        }

        // Apply Timers
        if (freezeTimer > 0) {
          freezeTimer -= dt;
          if (freezeTimer <= 0) isFrozen = false;
        }
        if (stunTimer > 0) {
          stunTimer -= dt;
          if (stunTimer <= 0) isStunned = false;
        }
        if (slowTimer > 0) {
          slowTimer -= dt;
          if (slowTimer <= 0) {
            isSlowed = false;
            slowMultiplier = 1.0;
          }
        }

        // Damage Over Time
        if (isBurning && burnTimer > 0) {
          hp -= burnDPS * dt * (weather.modifiers.fireBurnBonus || 1);
          burnTimer -= dt;
          if (burnTimer <= 0) isBurning = false;
        }
        if (isPoisoned && poisonTimer > 0) {
          hp -= poisonDPS * poisonStacks * dt;
          poisonTimer -= dt;
          if (poisonTimer <= 0) {
            isPoisoned = false;
            poisonStacks = 0;
          }
        }
        if (weather.modifiers.passiveEnemyDPS) {
          hp -= weather.modifiers.passiveEnemyDPS * dt;
        }

        // Check if dead from DoT
        if (hp <= 0) {
          sound.playEnemyDeath();
          const reward = enemy.typeConfig.reward;
          dotGold += reward;
          dotKills += 1;
          if (enemy.typeConfig.isBoss) dotBossKills += 1;
          if (weather.id === 'rain') dotStormKills += 1;

          // Splitting On Death
          if (enemy.typeConfig.splitsOnDeath && enemy.typeConfig.splitType) {
            const splitDef = ENEMY_TYPES[enemy.typeConfig.splitType];
            const count = enemy.typeConfig.splitCount || 2;
            if (splitDef) {
              for (let sc = 0; sc < count; sc++) {
                const offsetX = (Math.random() - 0.5) * 18;
                const offsetY = (Math.random() - 0.5) * 18;
                dotSplits.push({
                  id: `enemy_split_${idCounterRef.current++}`,
                  typeConfig: splitDef,
                  hp: splitDef.baseHp,
                  maxHp: splitDef.baseHp,
                  sandShieldHp: 0,
                  hasRevived: false,
                  waypointIndex: enemy.waypointIndex,
                  x: enemy.x + offsetX,
                  y: enemy.y + offsetY,
                  facing: enemy.facing || 'right',
                  speed: splitDef.speed,
                  isFrozen: false,
                  freezeTimer: 0,
                  isSlowed: false,
                  slowTimer: 0,
                  slowMultiplier: 1.0,
                  isBurning: false,
                  burnTimer: 0,
                  burnDPS: 0,
                  isPoisoned: false,
                  poisonStacks: 0,
                  poisonTimer: 0,
                  poisonDPS: 0,
                  isStunned: false,
                  stunTimer: 0
                });
              }
            }
          }

          // Hazard on death
          if (enemy.typeConfig.leavesHazardOnDeath) {
            const hazardType = enemy.typeConfig.leavesHazardOnDeath;
            hazardsRef.current.push({
              id: `hazard_death_${idCounterRef.current++}`,
              type: hazardType,
              x: enemy.x,
              y: enemy.y,
              radius: hazardType === 'lava' ? 48 : 42,
              damagePerSec: hazardType === 'lava' ? 45 : 35,
              duration: 5.0
            });
          }

          continue;
        }

        // Frozen / stunned enemies can't move
        if (isFrozen || isStunned) {
          survivingEnemies.push({
            ...enemy,
            hp,
            sandShieldHp,
            hasRevived,
            freezeTimer,
            isFrozen,
            stunTimer,
            isStunned,
            slowTimer,
            isSlowed,
            burnTimer,
            isBurning,
            poisonTimer,
            isPoisoned
          });
          continue;
        }

        // Calculate speed
        let currentSpeed = enemy.speed * (weather.modifiers.enemySpeedMultiplier || 1.0);
        if (isSlowed) currentSpeed *= slowMultiplier;
        for (const other of enemiesRef.current) {
          if (other.id !== enemy.id && other.typeConfig.speedAura && Math.hypot(other.x - x, other.y - y) <= 130) {
            currentSpeed *= (1 + other.typeConfig.speedAura);
            break;
          }
        }

        // Move along waypoints
        const targetWp = scaledWaypoints[waypointIndex + 1];
        if (!targetWp) {
          // Reached Castle!
          baseDamaged += enemy.typeConfig.isBoss ? 5 : 1;
          sound.playHit();
          continue;
        }

        const dx = targetWp.x - x;
        const dy = targetWp.y - y;
        const dist = Math.hypot(dx, dy);
        const step = currentSpeed * 75 * dt;

        let facing = enemy.facing || 'right';
        if (dx < -1) facing = 'left';
        else if (dx > 1) facing = 'right';

        if (dist <= step) {
          x = targetWp.x;
          y = targetWp.y;
          waypointIndex++;
        } else {
          x += (dx / dist) * step;
          y += (dy / dist) * step;
        }

        survivingEnemies.push({
          ...enemy,
          x,
          y,
          facing,
          waypointIndex,
          hp,
          sandShieldHp,
          hasRevived,
          freezeTimer,
          isFrozen,
          stunTimer,
          isStunned,
          slowTimer,
          isSlowed,
          burnTimer,
          isBurning,
          poisonTimer,
          isPoisoned
        });
      }

      if (dotSplits.length > 0) {
        survivingEnemies.push(...dotSplits);
      }
      enemiesRef.current = survivingEnemies;

      if (dotGold > 0) setGold(g => g + dotGold);
      if (dotKills > 0) {
        setStats(s => {
          const updated = {
            ...s,
            totalKills: s.totalKills + dotKills,
            goldEarned: s.goldEarned + dotGold,
            bossKills: s.bossKills + dotBossKills,
            stormKills: s.stormKills + dotStormKills
          };
          statsRef.current = updated;
          checkAchievements(updated, towersRef.current, wave);
          return updated;
        });
      }

      if (baseDamaged > 0) {
        setBaseHp(hp => {
          const nextHp = Math.max(0, hp - baseDamaged);
          if (nextHp <= 0) {
            setIsGameOver(true);
            sound.playBossAlert();
            showToast('Kastil Hancur!', 'Pertahanan Gagal Dilindungi. Game Over!');
          }
          return nextHp;
        });
      }

      // 4. Update Towers (Aiming & Shooting)
      const updatedTowers = towersRef.current.map(t => {
        let { attackCooldown, activeSkillCooldown, currentRange } = t;

        // Holy Paladin Aura
        let paladinSpeedBuff = 1.0;
        let paladinDmgBuff = 1.0;
        towersRef.current.forEach(other => {
          if (other.type === 'holy_paladin' && other.id !== t.id) {
            const d = Math.hypot(other.x - t.x, other.y - t.y);
            const auraR = other.currentRankConfig.auraRange || 130;
            if (d <= auraR) {
              paladinSpeedBuff += other.currentRankConfig.auraSpeedBonus || 0.15;
              paladinDmgBuff += other.currentRankConfig.auraDmgBonus || 0.15;
            }
          }
        });

        const effectiveRange = currentRange * (weather.modifiers.rangeMultiplier || 1.0);
        let attackSpeed = t.currentRankConfig.attackRate * paladinSpeedBuff;
        if (overdriveBuffTimer > 0) attackSpeed *= 2.0;
        if (weather.modifiers.towerSpeedMultiplier) attackSpeed *= weather.modifiers.towerSpeedMultiplier;
        if (t.type === 'poison_ninja' && weather.modifiers.ninjaSpeedMultiplier) {
          attackSpeed *= weather.modifiers.ninjaSpeedMultiplier;
        }

        attackCooldown = Math.max(0, attackCooldown - dt * attackSpeed);
        activeSkillCooldown = Math.max(0, activeSkillCooldown - dt);

        // Find living targets in range
        const enemiesInRange = enemiesRef.current.filter(e => Math.hypot(e.x - t.x, e.y - t.y) <= effectiveRange && e.hp > 0);

        let target = null;
        if (enemiesInRange.length > 0) {
          if (t.targetStrategy === 'strongest') {
            target = enemiesInRange.reduce((max, e) => (e.hp > max.hp ? e : max), enemiesInRange[0]);
          } else if (t.targetStrategy === 'weakest') {
            target = enemiesInRange.reduce((min, e) => (e.hp < min.hp ? e : min), enemiesInRange[0]);
          } else if (t.targetStrategy === 'last') {
            target = enemiesInRange.reduce((min, e) => (e.waypointIndex < min.waypointIndex ? e : min), enemiesInRange[0]);
          } else {
            // 'first'
            target = enemiesInRange.reduce((max, e) => (e.waypointIndex > max.waypointIndex ? e : max), enemiesInRange[0]);
          }
        }

        let targetAngle = t.targetAngle;
        if (target) {
          targetAngle = Math.atan2(target.y - t.y, target.x - t.x);
        }

        if (attackCooldown <= 0 && target) {
          attackCooldown = 1.0;
          sound.playShoot(t.type);

          const isCrit = Math.random() < ((t.rank >= 2 && t.type === 'archer') ? 0.35 : 0.1) + (weather.modifiers.critChanceBonus || 0);
          let finalDmg = t.currentRankConfig.damage * paladinDmgBuff;
          if (isCrit) finalDmg *= 2.0;

          projectilesRef.current.push({
            id: `proj_${idCounterRef.current++}`,
            towerId: t.id,
            towerType: t.type,
            rank: t.rank,
            x: t.x,
            y: t.y,
            targetId: target.id,
            targetX: target.x,
            targetY: target.y,
            damage: Math.round(finalDmg),
            isCrit,
            speed: t.currentRankConfig.projectileSpeed || 10,
            type: t.currentRankConfig.projectileType || 'arrow',
            splashRadius: t.currentRankConfig.splashRadius,
            slowAmount: t.currentRankConfig.slowAmount,
            chainCount: t.currentRankConfig.chainCount,
            poisonDPS: t.currentRankConfig.poisonDPS
          });
        }

        return {
          ...t,
          attackCooldown,
          activeSkillCooldown,
          targetAngle,
          currentTarget: target
        };
      });
      towersRef.current = updatedTowers;

      // 5. Update Projectiles & Hits (DIRECT HP DEDUCTION)
      const survivingProjectiles = [];
      const newChainProjectiles = [];
      const newFloatingTexts = [];
      const deadEnemyIds = new Set();
      const hitSplits = [];
      let hitGold = 0;
      let hitKills = 0;
      let hitBossKills = 0;
      let hitStormKills = 0;

      for (const p of projectilesRef.current) {
        let targetEnemy = enemiesRef.current.find(e => e.id === p.targetId && e.hp > 0);

        // Smart Retargeting: track nearest living monster if target died
        if (!targetEnemy && enemiesRef.current.length > 0) {
          let nearest = null;
          let nearestDist = Infinity;
          for (const en of enemiesRef.current) {
            if (en.hp > 0) {
              const d = Math.hypot(en.x - p.x, en.y - p.y);
              if (d < nearestDist) {
                nearestDist = d;
                nearest = en;
              }
            }
          }
          if (nearest && nearestDist < 250) {
            p.targetId = nearest.id;
            targetEnemy = nearest;
          }
        }

        const destX = targetEnemy ? targetEnemy.x : p.targetX;
        const destY = targetEnemy ? targetEnemy.y : p.targetY;
        const dx = destX - p.x;
        const dy = destY - p.y;
        const dist = Math.hypot(dx, dy);
        const step = p.speed * 85 * dt;

        if (dist <= step || (targetEnemy && Math.hypot(targetEnemy.x - p.x, targetEnemy.y - p.y) < 22)) {
          // HIT!
          sound.playHit();

          // Collect hit targets
          const hitTargets = [];
          if (p.splashRadius) {
            enemiesRef.current.forEach(e => {
              if (e.hp > 0 && Math.hypot(e.x - destX, e.y - destY) <= p.splashRadius) {
                hitTargets.push(e);
              }
            });
          } else if (targetEnemy && targetEnemy.hp > 0) {
            hitTargets.push(targetEnemy);
          } else {
            const near = enemiesRef.current.find(e => e.hp > 0 && Math.hypot(e.x - destX, e.y - destY) <= 32);
            if (near) hitTargets.push(near);
          }

          for (const enemy of hitTargets) {
            if (enemy.hp <= 0) continue;

            // 1. Dodge Check
            if (enemy.typeConfig.dodgeChance && Math.random() < enemy.typeConfig.dodgeChance) {
              newFloatingTexts.push({
                id: `ft_miss_${idCounterRef.current++}`,
                x: enemy.x,
                y: enemy.y - 12,
                text: 'HINDAR!',
                color: '#f43f5e',
                opacity: 1.0,
                vy: -25
              });
              continue;
            }

            // 2. Damage mitigation
            let calculatedDmg = p.damage;
            if ((p.towerType === 'archer' || p.towerType === 'holy_paladin') && enemy.typeConfig.physicalResist) {
              calculatedDmg *= (1 - enemy.typeConfig.physicalResist);
            }
            if ((p.towerType === 'fire_mage' || p.towerType === 'frost_mage') && enemy.typeConfig.magicResist) {
              calculatedDmg *= (1 - enemy.typeConfig.magicResist);
            }
            if (p.towerType === 'thunder_golem' && enemy.typeConfig.weakness === 'lightning') {
              calculatedDmg *= 1.45;
            }
            if (enemy.typeConfig.armor) {
              calculatedDmg = Math.max(1, calculatedDmg - Math.floor(enemy.typeConfig.armor * 0.35));
            }
            calculatedDmg = Math.round(calculatedDmg);

            // 3. Sand Shield
            let sandShieldHp = enemy.sandShieldHp || 0;
            let actualHpDmg = calculatedDmg;
            if (sandShieldHp > 0) {
              if (calculatedDmg <= sandShieldHp) {
                sandShieldHp -= calculatedDmg;
                actualHpDmg = 0;
              } else {
                actualHpDmg = calculatedDmg - sandShieldHp;
                sandShieldHp = 0;
              }
              enemy.sandShieldHp = sandShieldHp;
            }

            // 4. Deduct HP! (Direct & Guaranteed HP Reduction)
            enemy.hp = Math.max(0, enemy.hp - actualHpDmg);

            // 5. Undead Revival
            if (enemy.typeConfig.revivesOnce && enemy.hp <= 0 && !enemy.hasRevived) {
              enemy.hp = Math.floor(enemy.maxHp * 0.35);
              enemy.hasRevived = true;
              sound.playSpell('freeze');
              newFloatingTexts.push({
                id: `ft_rev_${idCounterRef.current++}`,
                x: enemy.x,
                y: enemy.y - 14,
                text: 'BANGKIT!',
                color: '#06b6d4',
                opacity: 1.0,
                vy: -30
              });
            }

            // 6. Floating damage text
            newFloatingTexts.push({
              id: `ft_${idCounterRef.current++}`,
              x: destX + (Math.random() - 0.5) * 14,
              y: destY - 10,
              text: `${calculatedDmg}${p.isCrit ? '!' : ''}`,
              color: p.isCrit ? '#facc15' : (p.towerType === 'fire_mage' ? '#f97316' : (p.towerType === 'frost_mage' ? '#38bdf8' : (p.towerType === 'thunder_golem' ? '#fde047' : (p.towerType === 'poison_ninja' ? '#c084fc' : '#fff')))),
              isCrit: p.isCrit,
              opacity: 1.0,
              vy: -30
            });

            // 7. Status effects
            if (p.towerType === 'frost_mage') {
              enemy.isSlowed = true;
              enemy.slowTimer = 3.0;
              enemy.slowMultiplier = 1 - (p.slowAmount || 0.4);
              const freezeChance = (p.rank >= 3 ? 0.25 : 0.1) + (weather.modifiers.frostFreezeBonus || 0);
              if (Math.random() < freezeChance) {
                enemy.isFrozen = true;
                enemy.freezeTimer = 2.0;
              }
            } else if (p.towerType === 'fire_mage' && !enemy.typeConfig.fireImmune) {
              enemy.isBurning = true;
              enemy.burnTimer = 3.5;
              enemy.burnDPS = Math.round(p.damage * 0.35);
            } else if (p.towerType === 'poison_ninja') {
              enemy.isPoisoned = true;
              enemy.poisonStacks = Math.min(5, (enemy.poisonStacks || 0) + 1);
              enemy.poisonTimer = 4.0;
              enemy.poisonDPS = p.poisonDPS || 16;
            }

            // 8. Enemy Death Check from Hit
            if (enemy.hp <= 0 && !deadEnemyIds.has(enemy.id)) {
              deadEnemyIds.add(enemy.id);
              sound.playEnemyDeath();
              const reward = enemy.typeConfig.reward;
              hitGold += reward;
              hitKills += 1;
              if (enemy.typeConfig.isBoss) hitBossKills += 1;
              if (weather.id === 'rain') hitStormKills += 1;

              // Splits on death
              if (enemy.typeConfig.splitsOnDeath && enemy.typeConfig.splitType) {
                const splitDef = ENEMY_TYPES[enemy.typeConfig.splitType];
                const count = enemy.typeConfig.splitCount || 2;
                if (splitDef) {
                  for (let sc = 0; sc < count; sc++) {
                    const offsetX = (Math.random() - 0.5) * 18;
                    const offsetY = (Math.random() - 0.5) * 18;
                    hitSplits.push({
                      id: `enemy_split_${idCounterRef.current++}`,
                      typeConfig: splitDef,
                      hp: splitDef.baseHp,
                      maxHp: splitDef.baseHp,
                      sandShieldHp: 0,
                      hasRevived: false,
                      waypointIndex: enemy.waypointIndex,
                      x: enemy.x + offsetX,
                      y: enemy.y + offsetY,
                      facing: enemy.facing || 'right',
                      speed: splitDef.speed,
                      isFrozen: false,
                      freezeTimer: 0,
                      isSlowed: false,
                      slowTimer: 0,
                      slowMultiplier: 1.0,
                      isBurning: false,
                      burnTimer: 0,
                      burnDPS: 0,
                      isPoisoned: false,
                      poisonStacks: 0,
                      poisonTimer: 0,
                      poisonDPS: 0,
                      isStunned: false,
                      stunTimer: 0
                    });
                  }
                }
              }

              // Hazard on death
              if (enemy.typeConfig.leavesHazardOnDeath) {
                const hazardType = enemy.typeConfig.leavesHazardOnDeath;
                hazardsRef.current.push({
                  id: `hazard_death_${idCounterRef.current++}`,
                  type: hazardType,
                  x: enemy.x,
                  y: enemy.y,
                  radius: hazardType === 'lava' ? 48 : 42,
                  damagePerSec: hazardType === 'lava' ? 45 : 35,
                  duration: 5.0
                });
              }
            }
          }

          // Chain Lightning targets
          if (p.chainCount && p.chainCount > 1) {
            const chainTargets = enemiesRef.current
              .filter(e => e.id !== p.targetId && e.hp > 0 && Math.hypot(e.x - destX, e.y - destY) <= 130)
              .slice(0, p.chainCount - 1 + (weather.modifiers.chainExtra || 0));

            chainTargets.forEach(ct => {
              newChainProjectiles.push({
                id: `chain_${idCounterRef.current++}`,
                towerId: p.towerId,
                towerType: 'thunder_golem',
                rank: p.rank,
                x: destX,
                y: destY,
                targetId: ct.id,
                targetX: ct.x,
                targetY: ct.y,
                damage: Math.round(p.damage * 0.75),
                speed: 24,
                type: 'lightning'
              });
            });
          }
        } else {
          survivingProjectiles.push({
            ...p,
            x: p.x + (dx / dist) * step,
            y: p.y + (dy / dist) * step,
            targetX: destX,
            targetY: destY
          });
        }
      }

      // Add chain projectiles
      projectilesRef.current = [...survivingProjectiles, ...newChainProjectiles];

      // Remove dead enemies & add splits
      if (deadEnemyIds.size > 0 || hitSplits.length > 0) {
        enemiesRef.current = [
          ...enemiesRef.current.filter(e => !deadEnemyIds.has(e.id) && e.hp > 0),
          ...hitSplits
        ];
      }

      if (hitGold > 0) setGold(g => g + hitGold);
      if (hitKills > 0) {
        setStats(s => {
          const updated = {
            ...s,
            totalKills: s.totalKills + hitKills,
            goldEarned: s.goldEarned + hitGold,
            bossKills: s.bossKills + hitBossKills,
            stormKills: s.stormKills + hitStormKills
          };
          statsRef.current = updated;
          checkAchievements(updated, towersRef.current, wave);
          return updated;
        });
      }

      // 6. Update Floating Combat Texts
      floatingTextsRef.current = [
        ...floatingTextsRef.current
          .map(ft => ({
            ...ft,
            y: ft.y + ft.vy * dt,
            opacity: ft.opacity - dt * 1.4
          }))
          .filter(ft => ft.opacity > 0),
        ...newFloatingTexts
      ];

      // 7. Update Hazards
      hazardsRef.current = hazardsRef.current
        .map(h => ({
          ...h,
          duration: h.duration - dt
        }))
        .filter(h => h.duration > 0);

      // 8. Check Wave Completion & Level Victory
      if (waveInProgressRef.current && waveSpawnsRef.current.length === 0 && enemiesRef.current.length === 0) {
        waveInProgressRef.current = false;
        setWaveInProgress(false);
        const waveReward = getWaveData(activeMap.id, wave).goldReward;
        setGold(g => g + waveReward);
        sound.playEnemyDeath();

        const totalLevelWaves = getLevelTotalWaves(activeMap.id);

        if (wave >= totalLevelWaves) {
          // LEVEL CLEARED / VICTORY!
          const stars = baseHp >= 16 ? 3 : (baseHp >= 8 ? 2 : 1);
          setLevelStars(prev => ({
            ...prev,
            [activeMap.id]: Math.max(prev[activeMap.id] || 0, stars)
          }));

          const currentIndex = MAPS.findIndex(m => m.id === activeMap.id);
          let nextMap = null;
          if (currentIndex >= 0 && currentIndex + 1 < MAPS.length) {
            nextMap = MAPS[currentIndex + 1];
            setUnlockedLevels(prev => prev.includes(nextMap.id) ? prev : [...prev, nextMap.id]);
          }

          const victoryBonus = 250 + activeMap.levelNumber * 100;
          setGold(g => g + victoryBonus);
          sound.playRankUp();
          confetti({ particleCount: 130, spread: 90, origin: { y: 0.5 } });

          setIsLevelVictory(true);
          setLevelVictoryData({
            levelName: activeMap.name,
            levelNumber: activeMap.levelNumber,
            stars,
            bonusGold: waveReward + victoryBonus,
            totalKills: statsRef.current.totalKills,
            castleHpRemaining: baseHp,
            nextMapId: nextMap ? nextMap.id : null,
            nextMapName: nextMap ? nextMap.name : null
          });

          showToast('LEVEL BERHASIL DISELESAIKAN!', `Selamat! Anda menaklukkan ${activeMap.name}!`, 'Trophy');
        } else {
          // Regular Wave Finished
          showToast(`Gelombang ${wave} Selesai!`, `Bonus Kemenangan +${waveReward} Koin Emas`, 'Award');
          const nextWave = wave + 1;
          setWave(nextWave);
          checkAchievements(statsRef.current, towersRef.current, nextWave);

          if (autoWave) {
            setTimeout(() => {
              startNextWave();
            }, 3000);
          }
        }
      }

      // 9. Sync State to React for Canvas Rendering
      setEnemies([...enemiesRef.current]);
      setProjectiles([...projectilesRef.current]);
      setTowers([...towersRef.current]);
      setFloatingTexts([...floatingTextsRef.current]);
      setHazards([...hazardsRef.current]);

      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, [
    isGameOver, isPaused, gameSpeed, wave,
    weather, overdriveBuffTimer, activeMap, autoWave, startNextWave
  ]);

  // Select Level / Map
  const handleSelectLevel = useCallback((mapId) => {
    const targetMap = MAPS.find(m => m.id === mapId) || MAPS[0];
    setActiveMapId(mapId);
    setGold(targetMap.startingGold || 400);
    setBaseHp(20);
    setWave(1);
    setWaveInProgress(false);
    setIsGameOver(false);
    setIsVictory(false);
    setIsLevelVictory(false);
    setLevelVictoryData(null);
    enemiesRef.current = [];
    projectilesRef.current = [];
    towersRef.current = [];
    floatingTextsRef.current = [];
    hazardsRef.current = [];
    waveInProgressRef.current = false;
    setTowers([]);
    setEnemies([]);
    setProjectiles([]);
    setFloatingTexts([]);
    setHazards([]);
    setSelectedTowerType(null);
    setSelectedPlacedTower(null);
    setActiveSpell(null);
    setSpellCooldowns({});
    waveSpawnsRef.current = [];
    spawnTimerRef.current = 0;
    setCurrentWeatherIndex(0);
    setWeatherTimeLeft(WEATHERS[0].duration);
    showToast(`Memasuki ${targetMap.name}!`, `Tingkat Kesulitan: ${targetMap.difficulty} | Total: ${targetMap.totalWaves} Gelombang`);
  }, []);

  // Replay Current Level
  const handleReplayCurrentLevel = useCallback(() => {
    handleSelectLevel(activeMapId);
  }, [activeMapId, handleSelectLevel]);

  // Proceed to Next Level
  const handleNextLevel = useCallback(() => {
    const currentIndex = MAPS.findIndex(m => m.id === activeMapId);
    if (currentIndex >= 0 && currentIndex + 1 < MAPS.length) {
      const nextMap = MAPS[currentIndex + 1];
      setUnlockedLevels(prev => prev.includes(nextMap.id) ? prev : [...prev, nextMap.id]);
      handleSelectLevel(nextMap.id);
    }
  }, [activeMapId, handleSelectLevel]);

  // Restart / Reset Game
  const restartGame = () => {
    handleSelectLevel(activeMapId);
    showToast('Permainan Dimulai Ulang!', 'Pertahankan bentengmu dari gelombang monster!');
  };

  return {
    activeMap,
    setActiveMapId,
    unlockedLevels,
    levelStars,
    isLevelVictory,
    setIsLevelVictory,
    levelVictoryData,
    handleSelectLevel,
    handleReplayCurrentLevel,
    handleNextLevel,
    totalLevelWaves: getLevelTotalWaves(activeMap.id),
    gold,
    baseHp,
    maxBaseHp,
    wave,
    waveInProgress,
    isGameOver,
    isVictory,
    gameSpeed,
    setGameSpeed,
    isPaused,
    setIsPaused,
    autoWave,
    setAutoWave,
    startNextWave,
    restartGame,
    weather,
    weatherTimeLeft,
    incomingWeatherAlert,
    towers,
    enemies,
    projectiles,
    floatingTexts,
    hazards,
    selectedTowerType,
    setSelectedTowerType,
    selectedPlacedTower,
    setSelectedPlacedTower,
    handlePlaceTower,
    handleUpgradeTower,
    handleSellTower,
    handleChangeTargetStrategy,
    handleTriggerTowerSkill,
    activeSpell,
    handleSelectSpell,
    executeCommanderSpell,
    spellCooldowns,
    achievements,
    claimAchievementReward,
    stats,
    toastNotification,
    isValidPlacement
  };
}
