// Tower Archetypes with 5 Ranks & Unlocked Skill Trees
// Tuned for fast, effective, and responsive retro arcade combat!

export const RANKS = [
  { level: 1, name: 'Novice', title: 'Pemula', badgeClass: 'badge-bronze', color: '#cd7f32' },
  { level: 2, name: 'Veteran', title: 'Ahli', badgeClass: 'badge-silver', color: '#cbd5e1' },
  { level: 3, name: 'Elite', title: 'Elit', badgeClass: 'badge-gold', color: '#f59e0b' },
  { level: 4, name: 'Master', title: 'Tuan', badgeClass: 'badge-diamond', color: '#38bdf8' },
  { level: 5, name: 'Mythic', title: 'Mitik', badgeClass: 'badge-mythic', color: '#f43f5e' }
];

export const TOWER_TYPES = {
  // 1. ARCHER (Pemanah Rimba) - Rapid sniper arrows
  archer: {
    id: 'archer',
    name: 'Pemanah Rimba',
    category: 'Fisik / Jarak Jauh',
    description: 'Menyerang sangat cepat dari jarak jauh dengan tembakan panah beruntun.',
    baseCost: 100,
    element: 'physical',
    color: '#22c55e',
    ranks: [
      {
        rank: 1,
        title: 'Scout Archer',
        cost: 0,
        upgradeCost: 120,
        damage: 32,
        range: 155,
        attackRate: 2.4, // attacks per sec (was 1.4)
        projectileSpeed: 16,
        projectileType: 'arrow',
        unlockedSkill: null
      },
      {
        rank: 2,
        title: 'Veteran Hunter',
        cost: 120,
        upgradeCost: 220,
        damage: 55,
        range: 170,
        attackRate: 2.8,
        projectileSpeed: 18,
        projectileType: 'arrow',
        unlockedSkill: {
          id: 'eagle_eye',
          name: 'Mata Elang',
          type: 'passive',
          desc: 'Meningkatkan peluang Serangan Kritis (+25% Crit, x2.0 Damage).',
          icon: 'Eye'
        }
      },
      {
        rank: 3,
        title: 'Sniper Ranger',
        cost: 220,
        upgradeCost: 400,
        damage: 105,
        range: 195,
        attackRate: 3.4,
        projectileSpeed: 20,
        projectileType: 'arrow_pierce',
        unlockedSkill: {
          id: 'piercing_arrow',
          name: 'Panah Tembus',
          type: 'passive',
          desc: 'Panah menembus hingga 2 musuh di belakang target.',
          icon: 'Crosshair'
        }
      },
      {
        rank: 4,
        title: 'Windrunner Elite',
        cost: 400,
        upgradeCost: 750,
        damage: 195,
        range: 220,
        attackRate: 4.0,
        projectileSpeed: 22,
        projectileType: 'arrow_wind',
        unlockedSkill: {
          id: 'arrow_storm',
          name: 'Badai Panah',
          type: 'active',
          cooldown: 15,
          desc: 'Menembakkan rentetan 15 anak panah kilat dalam 1.2 detik ke musuh terdekat!',
          icon: 'Wind'
        }
      },
      {
        rank: 5,
        title: 'Celestial Marksman',
        cost: 750,
        upgradeCost: 0,
        damage: 360,
        range: 250,
        attackRate: 4.8,
        projectileSpeed: 25,
        projectileType: 'arrow_celestial',
        unlockedSkill: {
          id: 'celestial_wrath',
          name: 'Panah Cahaya Bintang',
          type: 'passive',
          desc: 'Setiap panah yang mengenai musuh memicu ledakan cahaya bintang (AoE 55px).',
          icon: 'Sparkles'
        }
      }
    ]
  },

  // 2. FIRE MAGE (Penyihir Api) - Exploding AoE fireballs
  fire_mage: {
    id: 'fire_mage',
    name: 'Penyihir Api',
    category: 'Sihir / Area (AoE)',
    description: 'Melempar bola api peledak cepat yang membakar kerumunan musuh.',
    baseCost: 140,
    element: 'fire',
    color: '#ef4444',
    ranks: [
      {
        rank: 1,
        title: 'Fire Apprentice',
        cost: 0,
        upgradeCost: 150,
        damage: 45,
        range: 135,
        attackRate: 1.6, // attacks per sec (was 0.9)
        splashRadius: 40,
        projectileSpeed: 13,
        projectileType: 'fire',
        unlockedSkill: null
      },
      {
        rank: 2,
        title: 'Pyro Adept',
        cost: 150,
        upgradeCost: 260,
        damage: 78,
        range: 150,
        attackRate: 1.9,
        splashRadius: 50,
        projectileSpeed: 15,
        projectileType: 'fire',
        unlockedSkill: {
          id: 'flame_ignite',
          name: 'Lidah Api Membara',
          type: 'passive',
          desc: 'Musuh terbakar selama 3 detik, menerima 22 DPS tambahan.',
          icon: 'Flame'
        }
      },
      {
        rank: 3,
        title: 'Inferno Evoker',
        cost: 260,
        upgradeCost: 480,
        damage: 145,
        range: 165,
        attackRate: 2.2,
        splashRadius: 60,
        projectileSpeed: 17,
        projectileType: 'fire_lava',
        unlockedSkill: {
          id: 'lava_pool',
          name: 'Kawah Lahar',
          type: 'passive',
          desc: 'Ledakan meninggalkan genangan lahar selama 3.5 detik yang melukai musuh yang lewat.',
          icon: 'Waves'
        }
      },
      {
        rank: 4,
        title: 'Archmage of Flames',
        cost: 480,
        upgradeCost: 850,
        damage: 265,
        range: 185,
        attackRate: 2.6,
        splashRadius: 72,
        projectileSpeed: 19,
        projectileType: 'fire_inferno',
        unlockedSkill: {
          id: 'meteor_strike',
          name: 'Hujan Meteor Mini',
          type: 'active',
          cooldown: 16,
          desc: 'Menjatuhkan 3 meteor berapi besar yang membakar area luas!',
          icon: 'FlameKindling'
        }
      },
      {
        rank: 5,
        title: 'Phoenix Monarch',
        cost: 850,
        upgradeCost: 0,
        damage: 480,
        range: 210,
        attackRate: 3.2,
        splashRadius: 88,
        projectileSpeed: 22,
        projectileType: 'fire_phoenix',
        unlockedSkill: {
          id: 'phoenix_cataclysm',
          name: 'Ledakan Supernova Phoenix',
          type: 'passive',
          desc: 'Setiap serangan melepaskan ledakan raksasa dengan bonus damage +100%!',
          icon: 'Sun'
        }
      }
    ]
  },

  // 3. FROST MAGE (Penyihir Es) - Rapid chilling ice shards
  frost_mage: {
    id: 'frost_mage',
    name: 'Penyihir Es',
    category: 'Kontrol / Pembekuan',
    description: 'Menembakkan paku es dingin berkecepatan tinggi yang memperlambat musuh.',
    baseCost: 120,
    element: 'ice',
    color: '#06b6d4',
    ranks: [
      {
        rank: 1,
        title: 'Ice Neophyte',
        cost: 0,
        upgradeCost: 130,
        damage: 26,
        range: 145,
        attackRate: 1.8, // attacks per sec (was 1.1)
        slowAmount: 0.40, // 40% slow
        slowDuration: 2.5,
        projectileSpeed: 15,
        projectileType: 'ice',
        unlockedSkill: null
      },
      {
        rank: 2,
        title: 'Frost Weaver',
        cost: 130,
        upgradeCost: 240,
        damage: 48,
        range: 160,
        attackRate: 2.2,
        slowAmount: 0.50,
        slowDuration: 3.0,
        projectileSpeed: 17,
        projectileType: 'ice',
        unlockedSkill: {
          id: 'frost_burst',
          name: 'Embun Beku Mengembang',
          type: 'passive',
          desc: 'Efek lambat menyebar ke musuh dalam radius 45px dari target.',
          icon: 'Snowflake'
        }
      },
      {
        rank: 3,
        title: 'Glacial Warden',
        cost: 240,
        upgradeCost: 450,
        damage: 95,
        range: 175,
        attackRate: 2.6,
        slowAmount: 0.60,
        slowDuration: 3.5,
        projectileSpeed: 19,
        projectileType: 'ice_shard',
        unlockedSkill: {
          id: 'fragile_frost',
          name: 'Pecahan Es Rapuh',
          type: 'passive',
          desc: 'Musuh yang sedang diperlambat menerima +30% damage dari semua menara.',
          icon: 'ShieldAlert'
        }
      },
      {
        rank: 4,
        title: 'Blizzard Master',
        cost: 450,
        upgradeCost: 800,
        damage: 175,
        range: 195,
        attackRate: 3.0,
        slowAmount: 0.70,
        slowDuration: 4.0,
        projectileSpeed: 21,
        projectileType: 'ice_blizzard',
        unlockedSkill: {
          id: 'instant_blizzard',
          name: 'Gelombang Kutub',
          type: 'active',
          cooldown: 18,
          desc: 'Membekukan semua musuh di sekitarnya hingga berhenti bergerak selama 3.5 detik!',
          icon: 'CloudSnow'
        }
      },
      {
        rank: 5,
        title: 'Frost Empress',
        cost: 800,
        upgradeCost: 0,
        damage: 340,
        range: 220,
        attackRate: 3.6,
        slowAmount: 0.80,
        slowDuration: 4.5,
        projectileSpeed: 24,
        projectileType: 'ice_absolute',
        unlockedSkill: {
          id: 'absolute_zero',
          name: 'Nol Mutlak (Absolute Zero)',
          type: 'passive',
          desc: '35% peluang menghancurkan instan (Shatter) musuh beku ber-HP rendah.',
          icon: 'ZapOff'
        }
      }
    ]
  },

  // 4. THUNDER GOLEM (Golem Petir) - High-frequency chain lightning
  thunder_golem: {
    id: 'thunder_golem',
    name: 'Golem Petir',
    category: 'Listrik / Berantai',
    description: 'Menembakkan kilat bertegangan tinggi yang menyambar musuh seketika.',
    baseCost: 160,
    element: 'lightning',
    color: '#eab308',
    ranks: [
      {
        rank: 1,
        title: 'Spark Cannon',
        cost: 0,
        upgradeCost: 170,
        damage: 52,
        range: 140,
        attackRate: 1.5, // attacks per sec (was 0.8)
        chainCount: 2,
        projectileSpeed: 22,
        projectileType: 'lightning',
        unlockedSkill: null
      },
      {
        rank: 2,
        title: 'Voltaic Battery',
        cost: 170,
        upgradeCost: 290,
        damage: 90,
        range: 155,
        attackRate: 1.8,
        chainCount: 3,
        projectileSpeed: 24,
        projectileType: 'lightning',
        unlockedSkill: {
          id: 'extended_chain',
          name: 'Rantai Petir Tambahan',
          type: 'passive',
          desc: 'Petir menyambar +1 target tambahan dan tidak berkurang kekuatannya saat menyambar.',
          icon: 'Zap'
        }
      },
      {
        rank: 3,
        title: 'Overcharge Dynamo',
        cost: 290,
        upgradeCost: 520,
        damage: 165,
        range: 170,
        attackRate: 2.1,
        chainCount: 4,
        projectileSpeed: 26,
        projectileType: 'lightning_arc',
        unlockedSkill: {
          id: 'paralyzing_shock',
          name: 'Setrum Kelumpuhan',
          type: 'passive',
          desc: '20% peluang melumpuhkan (Stun) musuh selama 1 detik pada setiap sambaran.',
          icon: 'Activity'
        }
      },
      {
        rank: 4,
        title: 'Storm Colossus',
        cost: 520,
        upgradeCost: 900,
        damage: 295,
        range: 190,
        attackRate: 2.5,
        chainCount: 5,
        projectileSpeed: 28,
        projectileType: 'lightning_storm',
        unlockedSkill: {
          id: 'high_voltage_burst',
          name: 'Overcharge Voltase Tinggi',
          type: 'active',
          cooldown: 16,
          desc: 'Melepaskan sengatan listrik 360 derajat yang menyetrum semua musuh di dalam jangkauan!',
          icon: 'Radio'
        }
      },
      {
        rank: 5,
        title: 'Zeus Core',
        cost: 900,
        upgradeCost: 0,
        damage: 540,
        range: 215,
        attackRate: 3.0,
        chainCount: 7,
        projectileSpeed: 32,
        projectileType: 'lightning_god',
        unlockedSkill: {
          id: 'wrath_of_zeus',
          name: 'Amarah Dewa Petir',
          type: 'passive',
          desc: 'Damage petir meningkat +40% saat cuaca Hujan Badai dan menyambar hingga 7 musuh!',
          icon: 'Sparkle'
        }
      }
    ]
  },

  // 5. POISON NINJA (Ninja Racun) - Super-fast shuriken barrage
  poison_ninja: {
    id: 'poison_ninja',
    name: 'Ninja Racun',
    category: 'Racun / Cepat',
    description: 'Menyerang bagai kilat dengan racun mematikan yang menembus pertahanan musuh.',
    baseCost: 130,
    element: 'poison',
    color: '#a855f7',
    ranks: [
      {
        rank: 1,
        title: 'Shadow Rogue',
        cost: 0,
        upgradeCost: 140,
        damage: 24,
        range: 130,
        attackRate: 3.2, // attacks per sec (was 2.0)
        poisonDPS: 12,
        poisonDuration: 3,
        projectileSpeed: 19,
        projectileType: 'poison_shuriken',
        unlockedSkill: null
      },
      {
        rank: 2,
        title: 'Toxic Infiltrator',
        cost: 140,
        upgradeCost: 250,
        damage: 42,
        range: 145,
        attackRate: 3.8,
        poisonDPS: 22,
        poisonDuration: 4,
        projectileSpeed: 21,
        projectileType: 'poison_shuriken',
        unlockedSkill: {
          id: 'deadly_venom',
          name: 'Bisa Bertumpuk',
          type: 'passive',
          desc: 'Racun dapat bertumpuk (stack) hingga 5 kali pada musuh yang sama.',
          icon: 'Skull'
        }
      },
      {
        rank: 3,
        title: 'Venom Nightblade',
        cost: 250,
        upgradeCost: 460,
        damage: 80,
        range: 160,
        attackRate: 4.6,
        poisonDPS: 40,
        poisonDuration: 4,
        projectileSpeed: 23,
        projectileType: 'poison_blade',
        unlockedSkill: {
          id: 'armor_corrosion',
          name: 'Korosi Zirah',
          type: 'passive',
          desc: 'Mengurangi pertahanan musuh sebesar 35%, membuat serangan menara lain lebih sakit.',
          icon: 'ShieldOff'
        }
      },
      {
        rank: 4,
        title: 'Death Phantom',
        cost: 460,
        upgradeCost: 820,
        damage: 150,
        range: 175,
        attackRate: 5.5,
        poisonDPS: 75,
        poisonDuration: 5,
        projectileSpeed: 25,
        projectileType: 'poison_phantom',
        unlockedSkill: {
          id: 'toxic_mist',
          name: 'Kabut Racun Peledak',
          type: 'active',
          cooldown: 15,
          desc: 'Menyemprotkan kabut racun di jalanan yang menginfeksi semua musuh yang melintas!',
          icon: 'CloudRain'
        }
      },
      {
        rank: 5,
        title: 'Reaper Shinobi',
        cost: 820,
        upgradeCost: 0,
        damage: 280,
        range: 195,
        attackRate: 6.8,
        poisonDPS: 135,
        poisonDuration: 5,
        projectileSpeed: 28,
        projectileType: 'poison_reaper',
        unlockedSkill: {
          id: 'death_mark',
          name: 'Tebasan Maut Eksekusi',
          type: 'passive',
          desc: 'Musuh biasa (non-boss) yang darahnya tersisa di bawah 25% langsung tewas seketika.',
          icon: 'Sword'
        }
      }
    ]
  },

  // 6. HOLY PALADIN (Kesatria Suci) - Fast holy bolts & team aura buffs
  holy_paladin: {
    id: 'holy_paladin',
    name: 'Kesatria Suci',
    category: 'Aura / Penyangga',
    description: 'Memberikan aura penguat ke menara kawan di sekitar dan menghukum musuh.',
    baseCost: 150,
    element: 'holy',
    color: '#38bdf8',
    ranks: [
      {
        rank: 1,
        title: 'Templar Defender',
        cost: 0,
        upgradeCost: 160,
        damage: 38,
        range: 145,
        attackRate: 1.8, // attacks per sec (was 1.0)
        auraRange: 145,
        auraSpeedBonus: 0.20, // +20% attack speed to nearby towers
        projectileSpeed: 17,
        projectileType: 'holy',
        unlockedSkill: null
      },
      {
        rank: 2,
        title: 'Light Bringer',
        cost: 160,
        upgradeCost: 280,
        damage: 68,
        range: 160,
        attackRate: 2.1,
        auraRange: 160,
        auraSpeedBonus: 0.25,
        auraDmgBonus: 0.20, // +20% damage
        projectileSpeed: 19,
        projectileType: 'holy',
        unlockedSkill: {
          id: 'valor_aura',
          name: 'Aura Keberanian',
          type: 'passive',
          desc: 'Menara di sekitarnya menerima tambahan +20% Damage serang.',
          icon: 'ShieldCheck'
        }
      },
      {
        rank: 3,
        title: 'Divine Inquisitor',
        cost: 280,
        upgradeCost: 500,
        damage: 125,
        range: 175,
        attackRate: 2.5,
        auraRange: 175,
        auraSpeedBonus: 0.30,
        auraDmgBonus: 0.25,
        projectileSpeed: 21,
        projectileType: 'holy_beam',
        unlockedSkill: {
          id: 'holy_smite',
          name: 'Penghakiman Cahaya',
          type: 'passive',
          desc: 'Secara berkala memanggil pilar cahaya suci yang menghantam musuh terkuat.',
          icon: 'SunMedium'
        }
      },
      {
        rank: 4,
        title: 'Archon Paladin',
        cost: 500,
        upgradeCost: 880,
        damage: 235,
        range: 195,
        attackRate: 3.0,
        auraRange: 195,
        auraSpeedBonus: 0.35,
        auraDmgBonus: 0.30,
        projectileSpeed: 23,
        projectileType: 'holy_archon',
        unlockedSkill: {
          id: 'divine_sanctuary',
          name: 'Doa Perlindungan Kastil',
          type: 'active',
          cooldown: 20,
          desc: 'Memulihkan 4 HP Kastil dan meningkatkan damage semua menara kawan sebesar +50% selama 6 detik!',
          icon: 'HeartHandshake'
        }
      },
      {
        rank: 5,
        title: 'Seraphim Guardian',
        cost: 880,
        upgradeCost: 0,
        damage: 420,
        range: 220,
        attackRate: 3.6,
        auraRange: 220,
        auraSpeedBonus: 0.45,
        auraDmgBonus: 0.40,
        projectileSpeed: 26,
        projectileType: 'holy_seraphim',
        unlockedSkill: {
          id: 'celestial_grace',
          name: 'Anugerah Surgawi',
          type: 'passive',
          desc: 'Aura mencapai seluruh peta: memberi +12 Gold bonus setiap kali musuh tewas di dekatnya.',
          icon: 'Crown'
        }
      }
    ]
  }
};
