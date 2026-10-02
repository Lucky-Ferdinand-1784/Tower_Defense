// Dedicated Wave Schedules per Level and Procedural Fallback

export const LEVEL_WAVES = {
  // ================= LEVEL 1: LEMBAH NAGA HIJAU (6 Waves) =================
  valley: [
    {
      wave: 1,
      title: 'Serbuan Lendir Pemula',
      description: 'Lendir hijau kenyal mulai merayap melintasi jalan lembah.',
      spawns: [
        { type: 'slime', count: 8, interval: 1100 }
      ],
      goldReward: 65
    },
    {
      wave: 2,
      title: 'Pengintai Goblin Gesit',
      description: 'Goblin pelari cepat memimpin regu lendir.',
      spawns: [
        { type: 'slime', count: 6, interval: 900 },
        { type: 'goblin', count: 6, interval: 750 }
      ],
      goldReward: 85
    },
    {
      wave: 3,
      title: 'Kawanan Lendir Pecah',
      description: 'Lendir berkeliaran dalam jumlah banyak. Waspadai pecahan Mini Slime!',
      spawns: [
        { type: 'slime', count: 10, interval: 700 },
        { type: 'mini_slime', count: 8, interval: 450 }
      ],
      goldReward: 105
    },
    {
      wave: 4,
      title: 'Pasukan Pengawal Goblin',
      description: 'Goblin gesit berlari kencang secara beruntun.',
      spawns: [
        { type: 'goblin', count: 12, interval: 550 },
        { type: 'slime', count: 6, interval: 800 }
      ],
      goldReward: 125
    },
    {
      wave: 5,
      title: 'Garda Terakhir Lembah',
      description: 'Gelombang gabungan sebelum kemunculan penguasa raksasa lembah.',
      spawns: [
        { type: 'slime', count: 12, interval: 600 },
        { type: 'goblin', count: 10, interval: 500 },
        { type: 'mini_slime', count: 10, interval: 400 }
      ],
      goldReward: 150
    },
    {
      wave: 6,
      title: 'PERINGATAN BOS: Raja Lendir Primitif!',
      description: 'Lendir raksasa bermahkota emas dengan daya tahan luar biasa datang memimpin pasukannya!',
      isBossWave: true,
      bossType: 'king_slime',
      spawns: [
        { type: 'slime', count: 8, interval: 700 },
        { type: 'king_slime', count: 1, interval: 1800 },
        { type: 'goblin', count: 10, interval: 500 }
      ],
      goldReward: 280
    }
  ],

  // ================= LEVEL 2: RAWA MISTIS BERKELOK (8 Waves) =================
  swamp: [
    {
      wave: 1,
      title: 'Zat Asam Rawa Menggelegak',
      description: 'Slime beracun keluar dari genangan lumpur rawa yang pekat.',
      spawns: [
        { type: 'toxic_slime', count: 8, interval: 1000 }
      ],
      goldReward: 80
    },
    {
      wave: 2,
      title: 'Sayap Malam Melayang',
      description: 'Kelelawar bayangan melintasi rawa di udara, kebal terhadap bahaya darat!',
      spawns: [
        { type: 'toxic_slime', count: 6, interval: 900 },
        { type: 'shadow_bat', count: 7, interval: 850 }
      ],
      goldReward: 100
    },
    {
      wave: 3,
      title: 'Pleton Zirah Orc',
      description: 'Prajurit Orc berzirah tebal memimpin barisan darat.',
      spawns: [
        { type: 'orc', count: 5, interval: 1300 },
        { type: 'goblin', count: 8, interval: 650 }
      ],
      goldReward: 120
    },
    {
      wave: 4,
      title: 'Penyusupan Ninja Bayangan',
      description: 'Goblin ninja yang sangat lincah memiliki peluang menghindari panah.',
      spawns: [
        { type: 'goblin_assassin', count: 8, interval: 600 },
        { type: 'shadow_bat', count: 8, interval: 750 }
      ],
      goldReward: 140
    },
    {
      wave: 5,
      title: 'Serangan Udara & Darat Bertubi-tubi',
      description: 'Kawanan kelelawar malam bersama prajurit Orc mengepung benteng.',
      spawns: [
        { type: 'shadow_bat', count: 12, interval: 650 },
        { type: 'orc', count: 6, interval: 1100 }
      ],
      goldReward: 165
    },
    {
      wave: 6,
      title: 'Banjir Racun Menusuk',
      description: 'Kawanan Slime beracun dan Goblin ninja merayap cepat.',
      spawns: [
        { type: 'toxic_slime', count: 12, interval: 600 },
        { type: 'goblin_assassin', count: 10, interval: 500 }
      ],
      goldReward: 190
    },
    {
      wave: 7,
      title: 'Garda Depan Rawa Perkasa',
      description: 'Barisan Orc berpelindung besi dan pasukan bayangan bergerak maju.',
      spawns: [
        { type: 'orc', count: 8, interval: 900 },
        { type: 'shadow_bat', count: 10, interval: 600 },
        { type: 'goblin_assassin', count: 8, interval: 500 }
      ],
      goldReward: 220
    },
    {
      wave: 8,
      title: 'PERINGATAN BOS: Pohon Rawa Terkutuk!',
      description: 'Pohon purba rawa bangkit dengan kulit kayu regenerasi abadi!',
      isBossWave: true,
      bossType: 'swamp_treant',
      spawns: [
        { type: 'orc', count: 6, interval: 1000 },
        { type: 'swamp_treant', count: 1, interval: 1800 },
        { type: 'goblin_assassin', count: 8, interval: 500 },
        { type: 'shadow_bat', count: 8, interval: 700 }
      ],
      goldReward: 340
    }
  ],

  // ================= LEVEL 3: GURUN TENGKORAK TERIK (8 Waves) =================
  desert: [
    {
      wave: 1,
      title: 'Derit Cangkang Kalajengking',
      description: 'Kalajengking gurun bercangkang keras merayap dari balik pasir.',
      spawns: [
        { type: 'sand_scorpion', count: 8, interval: 950 }
      ],
      goldReward: 100
    },
    {
      wave: 2,
      title: 'Kebangkitan Prajurit Tulang',
      description: 'Ksatria tengkorak kuno yang bangkit hidup dari kuburan pasir!',
      spawns: [
        { type: 'cursed_skeleton', count: 8, interval: 850 },
        { type: 'sand_scorpion', count: 6, interval: 800 }
      ],
      goldReward: 125
    },
    {
      wave: 3,
      title: 'Serbuan Badai Kalajengking',
      description: 'Kawanan kalajengking dan goblin cepat menerobos pertahanan.',
      spawns: [
        { type: 'sand_scorpion', count: 12, interval: 700 },
        { type: 'goblin_assassin', count: 8, interval: 600 }
      ],
      goldReward: 150
    },
    {
      wave: 4,
      title: 'Panglima Perang Memimpin',
      description: 'Orc Panglima Perang berkapak raksasa memacu kecepatan pasukannya!',
      spawns: [
        { type: 'orc_warlord', count: 2, interval: 2200 },
        { type: 'orc', count: 6, interval: 900 },
        { type: 'cursed_skeleton', count: 8, interval: 700 }
      ],
      goldReward: 180
    },
    {
      wave: 5,
      title: 'Langit Kelam Gurun',
      description: 'Kelelawar gurun terbang bersama kawanan tulang berkobar.',
      spawns: [
        { type: 'shadow_bat', count: 14, interval: 550 },
        { type: 'cursed_skeleton', count: 10, interval: 650 }
      ],
      goldReward: 210
    },
    {
      wave: 6,
      title: 'Pasukan Zirah Gurun Berat',
      description: 'Dua Panglima Orc bersama barisan kalajengking bersenjata lengkap.',
      spawns: [
        { type: 'orc_warlord', count: 3, interval: 1800 },
        { type: 'sand_scorpion', count: 10, interval: 650 }
      ],
      goldReward: 240
    },
    {
      wave: 7,
      title: 'Badai Pasir Penghabisan',
      description: 'Serbuan massal tengkorak, kalajengking, dan orc bersenjata.',
      spawns: [
        { type: 'cursed_skeleton', count: 14, interval: 500 },
        { type: 'sand_scorpion', count: 10, interval: 600 },
        { type: 'orc_warlord', count: 2, interval: 1500 }
      ],
      goldReward: 275
    },
    {
      wave: 8,
      title: 'PERINGATAN BOS: Raksasa Kolosus Gurun!',
      description: 'Penjaga kuil batu pasir kuno dengan perisai badai pasir 800 HP!',
      isBossWave: true,
      bossType: 'sand_colossus',
      spawns: [
        { type: 'orc_warlord', count: 2, interval: 1200 },
        { type: 'sand_colossus', count: 1, interval: 2000 },
        { type: 'sand_scorpion', count: 10, interval: 550 },
        { type: 'cursed_skeleton', count: 10, interval: 600 }
      ],
      goldReward: 400
    }
  ],

  // ================= LEVEL 4: PUNCAK GLETSER ABADI (10 Waves) =================
  glacier: [
    {
      wave: 1,
      title: 'Sayap Dingin Menghantam',
      description: 'Wyvern salju meluncur turun dari puncak gletser.',
      spawns: [
        { type: 'frost_wyvern', count: 5, interval: 1300 }
      ],
      goldReward: 120
    },
    {
      wave: 2,
      title: 'Arwah Kelam Es',
      description: 'Wraith mengapung menembus udara dingin, kebal sihir!',
      spawns: [
        { type: 'shadow_wraith', count: 8, interval: 900 },
        { type: 'frost_wyvern', count: 4, interval: 1200 }
      ],
      goldReward: 145
    },
    {
      wave: 3,
      title: 'Langkah Batu Es Kuno',
      description: 'Golem batu beku dengan pertahanan fisik luar biasa tebal.',
      spawns: [
        { type: 'stone_golem', count: 3, interval: 1800 },
        { type: 'cursed_skeleton', count: 8, interval: 700 }
      ],
      goldReward: 170
    },
    {
      wave: 4,
      title: 'Armada Penerbang Gletser',
      description: 'Kawanan wyvern dan wraith menyerbu bersama di udara.',
      spawns: [
        { type: 'frost_wyvern', count: 7, interval: 900 },
        { type: 'shadow_wraith', count: 8, interval: 800 }
      ],
      goldReward: 200
    },
    {
      wave: 5,
      title: 'Barisan Batu & Arwah',
      description: 'Golem batu es melindungi barisan arwah terbang.',
      spawns: [
        { type: 'stone_golem', count: 4, interval: 1600 },
        { type: 'shadow_wraith', count: 10, interval: 650 }
      ],
      goldReward: 230
    },
    {
      wave: 6,
      title: 'Badai Salju Pembeku',
      description: 'Serbuan beruntun wyvern salju dan prajurit zirah.',
      spawns: [
        { type: 'frost_wyvern', count: 8, interval: 850 },
        { type: 'orc_warlord', count: 3, interval: 1500 }
      ],
      goldReward: 260
    },
    {
      wave: 7,
      title: 'Dinding Batu Raksasa',
      description: 'Lima golem batu es berbaris menahan segala serangan fisik.',
      spawns: [
        { type: 'stone_golem', count: 5, interval: 1400 },
        { type: 'frost_wyvern', count: 6, interval: 900 }
      ],
      goldReward: 290
    },
    {
      wave: 8,
      title: 'Serangan Udara Masif',
      description: 'Langit gletser dipenuhi wyvern dan wraith tak terhitung jumlahnya.',
      spawns: [
        { type: 'frost_wyvern', count: 10, interval: 700 },
        { type: 'shadow_wraith', count: 12, interval: 550 }
      ],
      goldReward: 330
    },
    {
      wave: 9,
      title: 'Kebangkitan Tentara Beku',
      description: 'Barisan golem dan wyvern dalam formasi terkuat.',
      spawns: [
        { type: 'stone_golem', count: 6, interval: 1200 },
        { type: 'frost_wyvern', count: 8, interval: 700 },
        { type: 'shadow_wraith', count: 10, interval: 500 }
      ],
      goldReward: 370
    },
    {
      wave: 10,
      title: 'PERINGATAN BOS: Naga Es Purba Boreas!',
      description: 'Naga es legendaris penguasa puncak kutub membawa badai dingin abadi!',
      isBossWave: true,
      bossType: 'frost_dragon',
      spawns: [
        { type: 'frost_wyvern', count: 6, interval: 900 },
        { type: 'frost_dragon', count: 1, interval: 2200 },
        { type: 'stone_golem', count: 4, interval: 1300 },
        { type: 'shadow_wraith', count: 10, interval: 500 }
      ],
      goldReward: 500
    }
  ],

  // ================= LEVEL 5: BENTENG VULKANIK NERAKA (12 Waves) =================
  inferno: [
    {
      wave: 1,
      title: 'Letupan Lahar Neraka',
      description: 'Golem lahar yang kebal api bangkit dari kolam magma.',
      spawns: [
        { type: 'magma_golem', count: 4, interval: 1400 }
      ],
      goldReward: 140
    },
    {
      wave: 2,
      title: 'Sayap Batu Berapi',
      description: 'Gargoyle lahar terbang membelah asap kawah neraka.',
      spawns: [
        { type: 'infernal_gargoyle', count: 8, interval: 900 },
        { type: 'magma_golem', count: 3, interval: 1300 }
      ],
      goldReward: 170
    },
    {
      wave: 3,
      title: 'Tentara Arwah Bara',
      description: 'Arwah bayangan dan gargoyle api mengepung garis depan.',
      spawns: [
        { type: 'shadow_wraith', count: 10, interval: 700 },
        { type: 'infernal_gargoyle', count: 7, interval: 800 }
      ],
      goldReward: 200
    },
    {
      wave: 4,
      title: 'Legiun Panglima Neraka',
      description: 'Para Panglima Orc bersenjata kapak api berbaris maju.',
      spawns: [
        { type: 'orc_warlord', count: 4, interval: 1500 },
        { type: 'magma_golem', count: 4, interval: 1200 }
      ],
      goldReward: 240
    },
    {
      wave: 5,
      title: 'Hujan Api & Sayap Gelap',
      description: 'Gargoyle lahar dalam jumlah besar melancarkan serangan udara.',
      spawns: [
        { type: 'infernal_gargoyle', count: 14, interval: 550 },
        { type: 'shadow_bat', count: 12, interval: 500 }
      ],
      goldReward: 280
    },
    {
      wave: 6,
      title: 'Banteng Lahar Membara',
      description: 'Pasukan Golem Lahar berat meledakkan genangan lahar saat roboh.',
      spawns: [
        { type: 'magma_golem', count: 6, interval: 1200 },
        { type: 'orc_warlord', count: 4, interval: 1300 }
      ],
      goldReward: 320
    },
    {
      wave: 7,
      title: 'Kombinasi Udara Terkutuk',
      description: 'Wyvern salju dan gargoyle api saling berpadu menghancurkan pertahanan.',
      spawns: [
        { type: 'frost_wyvern', count: 6, interval: 900 },
        { type: 'infernal_gargoyle', count: 10, interval: 650 }
      ],
      goldReward: 360
    },
    {
      wave: 8,
      title: 'Tentara Tengkorak Lahar',
      description: 'Ksatria tengkorak bangkit kembali berulang kali di tengah medan api.',
      spawns: [
        { type: 'cursed_skeleton', count: 16, interval: 450 },
        { type: 'magma_golem', count: 5, interval: 1100 }
      ],
      goldReward: 400
    },
    {
      wave: 9,
      title: 'Garda Neraka Paling Mematikan',
      description: 'Panglima orc, gargoyle, dan golem lahar menyerbu tanpa henti.',
      spawns: [
        { type: 'orc_warlord', count: 5, interval: 1100 },
        { type: 'infernal_gargoyle', count: 10, interval: 600 },
        { type: 'magma_golem', count: 5, interval: 1000 }
      ],
      goldReward: 450
    },
    {
      wave: 10,
      title: 'Gempa Kawah Magma',
      description: 'Serbuan massal sebelum raja tertinggi neraka menampakkan wujudnya.',
      spawns: [
        { type: 'magma_golem', count: 7, interval: 900 },
        { type: 'infernal_gargoyle', count: 12, interval: 500 },
        { type: 'shadow_wraith', count: 12, interval: 450 }
      ],
      goldReward: 500
    },
    {
      wave: 11,
      title: 'Badai Sayap Obsidian',
      description: 'Armada penerbang neraka menyapu langit benteng pertahanan.',
      spawns: [
        { type: 'infernal_gargoyle', count: 16, interval: 450 },
        { type: 'frost_wyvern', count: 8, interval: 700 },
        { type: 'orc_warlord', count: 4, interval: 1200 }
      ],
      goldReward: 560
    },
    {
      wave: 12,
      title: 'PERINGATAN BOS AKHIR: Raja Iblis Azazel!',
      description: 'Penguasa Tertinggi Neraka bertanduk api memijakkan kakinya di bumi!',
      isBossWave: true,
      bossType: 'demon_lord',
      spawns: [
        { type: 'magma_golem', count: 6, interval: 900 },
        { type: 'demon_lord', count: 1, interval: 2500 },
        { type: 'infernal_gargoyle', count: 12, interval: 550 },
        { type: 'orc_warlord', count: 5, interval: 1000 }
      ],
      goldReward: 800
    }
  ]
};

// Retrieve wave data for specific level map and wave number
export function getWaveData(mapId, waveNumber) {
  const mapWaves = LEVEL_WAVES[mapId] || LEVEL_WAVES.valley;

  if (waveNumber <= mapWaves.length) {
    return mapWaves[waveNumber - 1];
  }

  // Procedural Endless scaling for waves beyond total waves
  const scale = 1 + (waveNumber - mapWaves.length) * 0.18;
  const isBoss = waveNumber % 5 === 0;

  return {
    wave: waveNumber,
    title: isBoss ? `PERINGATAN BOS: Pasukan Neraka Tingkat ${waveNumber}!` : `Serangan Pasukan Tak Berujung Gelombang ${waveNumber}`,
    description: 'Gelombang tak berujung dengan monster berkekuatan tinggi.',
    isBossWave: isBoss,
    bossType: isBoss ? 'demon_lord' : null,
    spawns: [
      { type: 'magma_golem', count: Math.floor(4 * scale), interval: 900 },
      { type: 'infernal_gargoyle', count: Math.floor(8 * scale), interval: 500 },
      { type: 'orc_warlord', count: Math.floor(3 * scale), interval: 1000 },
      { type: 'shadow_wraith', count: Math.floor(6 * scale), interval: 600 },
      ...(isBoss ? [{ type: 'demon_lord', count: 1 + Math.floor((waveNumber - mapWaves.length) / 10), interval: 3000 }] : [])
    ],
    goldReward: Math.floor(180 + waveNumber * 25)
  };
}

export function getLevelTotalWaves(mapId) {
  const mapWaves = LEVEL_WAVES[mapId] || LEVEL_WAVES.valley;
  return mapWaves.length;
}
