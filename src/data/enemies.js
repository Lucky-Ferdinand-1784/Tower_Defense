// Monster Archetypes with Varied Pixel Art Profiles, Resistances, and Boss Mechanics
// Tuned for dynamic, fast-paced retro TD gameplay

export const ENEMY_TYPES = {
  // === LEVEL 1 & COMMON MONSTERS ===
  slime: {
    id: 'slime',
    name: 'Slime Hutan',
    levelCategory: 'Lembah',
    baseHp: 85,
    speed: 1.55,
    reward: 12,
    size: 22,
    color: '#22c55e',
    innerColor: '#15803d',
    eyeColor: '#052e16',
    armor: 0,
    isFlying: false,
    splitsOnDeath: true,
    splitType: 'mini_slime',
    splitCount: 2,
    desc: 'Lendir hijau kenyal yang elastis. Terbelah menjadi 2 Mini Slime saat dihancurkan!'
  },

  mini_slime: {
    id: 'mini_slime',
    name: 'Mini Slime Lincah',
    levelCategory: 'Lembah',
    baseHp: 38,
    speed: 2.2,
    reward: 6,
    size: 15,
    color: '#4ade80',
    innerColor: '#16a34a',
    eyeColor: '#052e16',
    armor: 0,
    isFlying: false,
    splitsOnDeath: false,
    desc: 'Pecahan lendir kecil yang melesat dengan cepat menuju kastil.'
  },

  goblin: {
    id: 'goblin',
    name: 'Goblin Gesit',
    levelCategory: 'Lembah',
    baseHp: 75,
    speed: 2.6,
    reward: 15,
    size: 22,
    color: '#84cc16',
    clothingColor: '#dc2626',
    eyeColor: '#b91c1c',
    armor: 2,
    isFlying: false,
    desc: 'Pelari cepat bertopi merah dengan belati tajam yang berusaha menyelinap.'
  },

  // LEVEL 1 BOSS
  king_slime: {
    id: 'king_slime',
    name: 'Raja Lendir Primitif (BOSS)',
    levelCategory: 'Lembah',
    baseHp: 1950,
    speed: 1.0,
    reward: 180,
    size: 44,
    color: '#10b981',
    innerColor: '#047857',
    eyeColor: '#facc15',
    armor: 6,
    isBoss: true,
    isFlying: false,
    splitsOnDeath: true,
    splitType: 'toxic_slime',
    splitCount: 3,
    desc: 'Penguasa lembah bermahkota emas murni! Menghasilkan gempa saat melompat dan terpecah menjadi 3 Slime Beracun.'
  },

  // === LEVEL 2: MYSTIC SWAMP MONSTERS ===
  toxic_slime: {
    id: 'toxic_slime',
    name: 'Slime Beracun Rawa',
    levelCategory: 'Rawa',
    baseHp: 140,
    speed: 1.45,
    reward: 18,
    size: 24,
    color: '#a855f7',
    innerColor: '#7e22ce',
    eyeColor: '#e9d5ff',
    armor: 2,
    isFlying: false,
    leavesHazardOnDeath: 'toxic_mist',
    desc: 'Slime bermutasi zat asam rawa. Mengeluarkan kabut racun saat tewas.'
  },

  goblin_assassin: {
    id: 'goblin_assassin',
    name: 'Goblin Ninja Bayangan',
    levelCategory: 'Rawa',
    baseHp: 120,
    speed: 2.9,
    reward: 22,
    size: 22,
    color: '#65a30d',
    clothingColor: '#1e1b4b',
    eyeColor: '#f43f5e',
    armor: 4,
    dodgeChance: 0.25, // 25% chance to dodge physical hits
    isFlying: false,
    desc: 'Pembunuh bayangan terlatih. Memiliki peluang menghindar dari panah biasa!'
  },

  orc: {
    id: 'orc',
    name: 'Prajurit Zirah Orc',
    levelCategory: 'Rawa',
    baseHp: 290,
    speed: 1.35,
    reward: 32,
    size: 28,
    color: '#166534',
    armor: 12,
    physicalResist: 0.30,
    isFlying: false,
    desc: 'Orc berzirah besi dengan helm bertanduk. Tahan terhadap serangan fisik.'
  },

  shadow_bat: {
    id: 'shadow_bat',
    name: 'Kelelawar Malam',
    levelCategory: 'Rawa',
    baseHp: 125,
    speed: 2.3,
    reward: 22,
    size: 22,
    color: '#4f46e5',
    wingColor: '#312e81',
    eyeColor: '#f43f5e',
    armor: 0,
    isFlying: true,
    desc: 'Monster terbang malam. Melayang di udara sehingga kebal terhadap perangkap darat.'
  },

  // LEVEL 2 BOSS
  swamp_treant: {
    id: 'swamp_treant',
    name: 'Pohon Rawa Terkutuk (BOSS)',
    levelCategory: 'Rawa',
    baseHp: 2900,
    speed: 0.9,
    reward: 250,
    size: 46,
    color: '#3f2e18',
    barkColor: '#271b0d',
    eyeColor: '#84cc16',
    armor: 16,
    isBoss: true,
    isFlying: false,
    regenerationPerSec: 25,
    desc: 'Pohon purba rawa yang bangkit hidup. Memiliki kulit kayu tebal dan beregenerasi +25 HP setiap detik!'
  },

  // === LEVEL 3: DUNE OF SKULLS MONSTERS ===
  sand_scorpion: {
    id: 'sand_scorpion',
    name: 'Kalajengking Gurun',
    levelCategory: 'Gurun',
    baseHp: 220,
    speed: 2.05,
    reward: 26,
    size: 26,
    color: '#ca8a04',
    carapaceColor: '#854d0e',
    eyeColor: '#ef4444',
    armor: 14,
    physicalResist: 0.25,
    isFlying: false,
    desc: 'Monster berkulit cangkang keras gurun. Menahan tebasan fisik dan menyengat ganas.'
  },

  cursed_skeleton: {
    id: 'cursed_skeleton',
    name: 'Ksatria Tengkorak Kuno',
    levelCategory: 'Gurun',
    baseHp: 180,
    speed: 1.75,
    reward: 25,
    size: 24,
    color: '#e2e8f0',
    eyeColor: '#06b6d4',
    armor: 6,
    isFlying: false,
    revivesOnce: true, // Revives with 35% HP
    desc: 'Prajurit bertameng tulang. Jiwa terkutuknya bangkit kembali satu kali setelah gugur!'
  },

  orc_warlord: {
    id: 'orc_warlord',
    name: 'Panglima Perang Orc',
    levelCategory: 'Gurun',
    baseHp: 580,
    speed: 1.45,
    reward: 55,
    size: 32,
    color: '#14532d',
    armor: 18,
    physicalResist: 0.35,
    isFlying: false,
    speedAura: 0.2, // Gives +20% speed to nearby allies
    desc: 'Panglima Orc berkapak raksasa dengan tameng baja. Meneriakkan perang yang mempercepat pasukan sekitarnya!'
  },

  // LEVEL 3 BOSS
  sand_colossus: {
    id: 'sand_colossus',
    name: 'Raksasa Kolosus Gurun (BOSS)',
    levelCategory: 'Gurun',
    baseHp: 3800,
    speed: 0.85,
    reward: 320,
    size: 48,
    color: '#d97706',
    stoneColor: '#92400e',
    eyeColor: '#38bdf8',
    armor: 22,
    isBoss: true,
    isFlying: false,
    hasSandShield: true,
    shieldHp: 750,
    desc: 'Penjaga kuil gurun dari batu pasir purba. Dilindungi perisai badai pasir sebesar 750 HP!'
  },

  // === LEVEL 4: GLACIAL SPIRE MONSTERS ===
  frost_wyvern: {
    id: 'frost_wyvern',
    name: 'Wyvern Salju Gletser',
    levelCategory: 'Gletser',
    baseHp: 480,
    speed: 1.9,
    reward: 48,
    size: 32,
    color: '#0284c7',
    wingColor: '#38bdf8',
    eyeColor: '#f0f9ff',
    armor: 8,
    isFlying: true,
    chillAura: true,
    desc: 'Naga es bersayap tajam. Melayang di atas benteng dan menyebarkan aura dingin yang membekukan!'
  },

  shadow_wraith: {
    id: 'shadow_wraith',
    name: 'Wraith Arwah Es',
    levelCategory: 'Gletser',
    baseHp: 260,
    speed: 1.95,
    reward: 35,
    size: 26,
    color: '#38bdf8',
    shroudColor: '#0369a1',
    eyeColor: '#c084fc',
    armor: 0,
    magicResist: 0.45,
    isFlying: true,
    desc: 'Hantu es terapung tanpa wujud fisik padat. Sangat kebal terhadap mantra sihir api dan es biasa.'
  },

  stone_golem: {
    id: 'stone_golem',
    name: 'Golem Batu Es Kuno',
    levelCategory: 'Gletser',
    baseHp: 820,
    speed: 1.0,
    reward: 65,
    size: 36,
    color: '#475569',
    runeColor: '#38bdf8',
    eyeColor: '#e0f2fe',
    armor: 24,
    physicalResist: 0.45,
    weakness: 'lightning',
    isFlying: false,
    desc: 'Raksasa bebatuan berlapis kristal es. HP dan armor sangat tebal, namun rentan hancur oleh sambaran petir!'
  },

  // LEVEL 4 BOSS
  frost_dragon: {
    id: 'frost_dragon',
    name: 'Naga Es Purba Boreas (BOSS)',
    levelCategory: 'Gletser',
    baseHp: 4900,
    speed: 1.0,
    reward: 420,
    size: 52,
    color: '#0369a1',
    wingColor: '#7dd3fc',
    eyeColor: '#fef08a',
    armor: 20,
    isBoss: true,
    isFlying: true,
    desc: 'Naga es purba dari puncak kutub dunia! Sayap kristal esnya memanggil badai salju tak berujung.'
  },

  // === LEVEL 5: INFERNAL CITADEL MONSTERS ===
  infernal_gargoyle: {
    id: 'infernal_gargoyle',
    name: 'Gargoyle Lahar Neraka',
    levelCategory: 'Neraka',
    baseHp: 440,
    speed: 2.15,
    reward: 45,
    size: 28,
    color: '#7f1d1d',
    wingColor: '#b91c1c',
    eyeColor: '#facc15',
    armor: 10,
    isFlying: true,
    fireImmune: true,
    desc: 'Makhluk batu bersayap dari kawah neraka. Meluncur cepat di udara dan kebal terhadap kobaran api.'
  },

  magma_golem: {
    id: 'magma_golem',
    name: 'Golem Lahar Vulkanik',
    levelCategory: 'Neraka',
    baseHp: 880,
    speed: 1.05,
    reward: 70,
    size: 38,
    color: '#450a0a',
    magmaColor: '#f97316',
    eyeColor: '#fef08a',
    armor: 26,
    fireImmune: true,
    isFlying: false,
    leavesHazardOnDeath: 'lava',
    desc: 'Bebatuan lava membara. Kebal terhadap api dan meledakkan genangan lahar panas saat dihancurkan!'
  },

  // LEVEL 5 FINAL BOSS
  demon_lord: {
    id: 'demon_lord',
    name: 'Raja Iblis Azazel Sang Penguasa Neraka (FINAL BOSS)',
    levelCategory: 'Neraka',
    baseHp: 6800,
    speed: 0.95,
    reward: 600,
    size: 54,
    color: '#7f1d1d',
    hornColor: '#0f172a',
    fireColor: '#f97316',
    eyeColor: '#fef08a',
    armor: 24,
    isBoss: true,
    isFlying: false,
    fireImmune: true,
    speedAura: 0.25,
    desc: 'Penguasa tertinggi kegelapan bertanduk obsidian! Tubuhnya menyimpan tungku magma abadi dan meraung membakar bumi.'
  }
};
