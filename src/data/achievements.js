// In-game Achievements with Tracking, Rewards, and Confetti Celebrations

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'first_blood',
    title: 'Darah Pertama',
    desc: 'Kalahkan musuh pertamamu di medan tempur.',
    icon: 'Sword',
    category: 'Combat',
    target: 1,
    current: 0,
    rewardGold: 50,
    completed: false,
    claimed: false
  },
  {
    id: 'architect',
    title: 'Arsitek Pertahanan',
    desc: 'Bangun minimal 5 menara karakter di atas peta.',
    icon: 'Shield',
    category: 'Building',
    target: 5,
    current: 0,
    rewardGold: 80,
    completed: false,
    claimed: false
  },
  {
    id: 'rank_veteran',
    title: 'Kenaikan Pangkat: Ahli',
    desc: 'Tingkatkan setidaknya satu menara ke Rank 2 (Veteran).',
    icon: 'ChevronUp',
    category: 'Rank',
    target: 1,
    current: 0,
    rewardGold: 100,
    completed: false,
    claimed: false
  },
  {
    id: 'rank_master',
    title: 'Keahlian Tinggi',
    desc: 'Buka Rank 4 (Master) dan dapatkan skill aktif karakter!',
    icon: 'Sparkles',
    category: 'Rank',
    target: 1,
    current: 0,
    rewardGold: 180,
    completed: false,
    claimed: false
  },
  {
    id: 'mythic_ascension',
    title: 'Legenda Mitik',
    desc: 'Bangkitkan kekuatan penuh menara ke Rank 5 (Mythic)!',
    icon: 'Crown',
    category: 'Rank',
    target: 1,
    current: 0,
    rewardGold: 350,
    completed: false,
    claimed: false
  },
  {
    id: 'full_roster',
    title: 'Aliansi Sempurna',
    desc: 'Pasang ke-6 jenis karakter menara berbeda secara bersamaan di peta.',
    icon: 'Users',
    category: 'Building',
    target: 6,
    current: 0,
    rewardGold: 220,
    completed: false,
    claimed: false
  },
  {
    id: 'storm_rider',
    title: 'Penunggang Badai',
    desc: 'Kalahkan 25 musuh saat kondisi cuaca Hujan Badai berlangsung.',
    icon: 'CloudLightning',
    category: 'Weather',
    target: 25,
    current: 0,
    rewardGold: 150,
    completed: false,
    claimed: false
  },
  {
    id: 'frost_shatter',
    title: 'Kutub Abadi',
    desc: 'Bekukan atau perlambat 50 musuh dengan sihir es.',
    icon: 'Snowflake',
    category: 'Combat',
    target: 50,
    current: 0,
    rewardGold: 140,
    completed: false,
    claimed: false
  },
  {
    id: 'boss_slayer',
    title: 'Pembantai Raja Iblis',
    desc: 'Tumbangkan Bos Raksasa Wave 5 atau lebih tinggi.',
    icon: 'Skull',
    category: 'Combat',
    target: 1,
    current: 0,
    rewardGold: 300,
    completed: false,
    claimed: false
  },
  {
    id: 'gold_tycoon',
    title: 'Saudagar Perang',
    desc: 'Kumpulkan total 1.500 Koin Emas.',
    icon: 'Coins',
    category: 'Economy',
    target: 1500,
    current: 0,
    rewardGold: 200,
    completed: false,
    claimed: false
  },
  {
    id: 'spell_caster',
    title: 'Ahli Mantra Komandan',
    desc: 'Luncurkan mantra komandan atau skill aktif karakter sebanyak 8 kali.',
    icon: 'Flame',
    category: 'Skills',
    target: 8,
    current: 0,
    rewardGold: 160,
    completed: false,
    claimed: false
  },
  {
    id: 'wave_conqueror',
    title: 'Benteng Tak Terkalahkan',
    desc: 'Capai dan pertahankan kastil hingga Gelombang 10!',
    icon: 'Trophy',
    category: 'Wave',
    target: 10,
    current: 0,
    rewardGold: 400,
    completed: false,
    claimed: false
  }
];
