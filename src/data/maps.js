// Maps with smooth, forward-progressing winding paths (selalu maju ke depan menuju kastil)
// Thematic pixel art scenery, lanterns, and dedicated Level stages

export const MAPS = [
  // ================= LEVEL 1 =================
  {
    id: 'valley',
    levelNumber: 1,
    name: 'Level 1: Lembah Naga Hijau',
    subtitle: 'Jalanan berbatu yang meliuk maju melintasi padang rumput hijau subur, aliran sungai kristal, dan pepohonan',
    difficulty: 'Mudah',
    totalWaves: 6,
    bossId: 'king_slime',
    bossName: 'Raja Lendir Primitif',
    startingGold: 400,
    bgColor: '#15381f', // verdant deep meadow
    pathColor: '#c2a679', // cobblestone pavers
    pathBorder: '#5c4327',
    waterColor: '#0284c7',
    // Flowing S-curve that always marches EAST towards the castle (never doubles back!)
    waypoints: [
      { x: 0.0, y: 0.22 },  // Spawn Portal (Far Left)
      { x: 0.20, y: 0.22 }, // East out of portal
      { x: 0.36, y: 0.46 }, // South-East curve
      { x: 0.52, y: 0.72 }, // Across lower meadow
      { x: 0.68, y: 0.72 }, // Sweeping bend
      { x: 0.78, y: 0.42 }, // North-East towards upper meadow
      { x: 0.88, y: 0.25 }, // Approaching castle
      { x: 1.0, y: 0.25 },  // Castle Gate (Far Right)
    ],
    pathWidth: 40,
    scenery: [
      // Forest Canopy Trees (North)
      { type: 'tree', x: 0.06, y: 0.08, scale: 1.25 },
      { type: 'tree', x: 0.25, y: 0.07, scale: 1.1 },
      { type: 'tree', x: 0.45, y: 0.12, scale: 1.3 },
      { type: 'tree', x: 0.62, y: 0.15, scale: 1.05 },
      { type: 'tree', x: 0.80, y: 0.10, scale: 1.2 },
      { type: 'tree', x: 0.95, y: 0.08, scale: 1.15 },

      // Forest Canopy Trees (South & Central)
      { type: 'tree', x: 0.08, y: 0.60, scale: 1.15 },
      { type: 'tree', x: 0.18, y: 0.85, scale: 1.3 },
      { type: 'tree', x: 0.38, y: 0.88, scale: 1.1 },
      { type: 'tree', x: 0.58, y: 0.90, scale: 1.25 },
      { type: 'tree', x: 0.85, y: 0.85, scale: 1.2 },
      { type: 'tree', x: 0.48, y: 0.35, scale: 1.15 }, // central grove

      // Natural Chiseled Boulders
      { type: 'rock', x: 0.15, y: 0.40, scale: 1.1 },
      { type: 'rock', x: 0.40, y: 0.60, scale: 1.0 },
      { type: 'rock', x: 0.62, y: 0.55, scale: 1.2 },
      { type: 'rock', x: 0.85, y: 0.55, scale: 0.95 },

      // Road Lanterns (with warm pixel ground light)
      { type: 'lantern', x: 0.22, y: 0.14 },
      { type: 'lantern', x: 0.38, y: 0.36 },
      { type: 'lantern', x: 0.66, y: 0.62 },
      { type: 'lantern', x: 0.86, y: 0.16 },

      // Interactive / Aesthetic props
      { type: 'signpost', x: 0.08, y: 0.30 },
      { type: 'campfire', x: 0.28, y: 0.65 },
      { type: 'crate', x: 0.92, y: 0.34 },
      { type: 'crate', x: 0.94, y: 0.36 },

      // Wild Meadow Flower Tufts
      { type: 'flower', x: 0.10, y: 0.48, color: '#f43f5e' },
      { type: 'flower', x: 0.28, y: 0.12, color: '#eab308' },
      { type: 'flower', x: 0.55, y: 0.22, color: '#f43f5e' },
      { type: 'flower', x: 0.72, y: 0.82, color: '#38bdf8' },
      { type: 'flower', x: 0.82, y: 0.68, color: '#ec4899' }
    ]
  },

  // ================= LEVEL 2 =================
  {
    id: 'swamp',
    levelNumber: 2,
    name: 'Level 2: Rawa Mistis Berkelok',
    subtitle: 'Jalur kayu berliku maju mengitari kolam rawa berkabut, jamur berpendar, dan sarang monster racun',
    difficulty: 'Normal',
    totalWaves: 8,
    bossId: 'swamp_treant',
    bossName: 'Pohon Rawa Terkutuk',
    startingGold: 420,
    bgColor: '#112017',
    pathColor: '#5c5240',
    pathBorder: '#291b10',
    waterColor: '#064e3b',
    // Progressive winding path (Bottom-Left to Mid-Right)
    waypoints: [
      { x: 0.0, y: 0.78 },  // Spawn Portal (Bottom Left)
      { x: 0.22, y: 0.78 }, // East
      { x: 0.38, y: 0.38 }, // North-East across peat
      { x: 0.56, y: 0.68 }, // South-East bend
      { x: 0.74, y: 0.28 }, // North-East bend
      { x: 0.88, y: 0.52 }, // Turn toward castle
      { x: 1.0, y: 0.52 }   // Castle Gate (Mid Right)
    ],
    pathWidth: 40,
    scenery: [
      // Bioluminescent Mushrooms
      { type: 'mushroom', x: 0.12, y: 0.62, scale: 1.2 },
      { type: 'mushroom', x: 0.30, y: 0.22, scale: 1.1 },
      { type: 'mushroom', x: 0.62, y: 0.55, scale: 1.3 },
      { type: 'mushroom', x: 0.82, y: 0.15, scale: 1.0 },
      { type: 'mushroom', x: 0.48, y: 0.82, scale: 0.95 },

      // Mystical Glowing Crystals
      { type: 'crystal', x: 0.26, y: 0.50, color: '#a855f7' },
      { type: 'crystal', x: 0.65, y: 0.35, color: '#2dd4bf' },
      { type: 'crystal', x: 0.82, y: 0.68, color: '#a855f7' },

      // Gnarled Swamp Willow Trees
      { type: 'tree', x: 0.08, y: 0.16, scale: 1.25, dead: true },
      { type: 'tree', x: 0.26, y: 0.90, scale: 1.3, dead: true },
      { type: 'tree', x: 0.50, y: 0.20, scale: 1.2, dead: true },
      { type: 'tree', x: 0.86, y: 0.82, scale: 1.25, dead: true },
      { type: 'tree', x: 0.95, y: 0.20, scale: 1.15, dead: true },

      // Mossy Bog Boulders
      { type: 'rock', x: 0.18, y: 0.92 },
      { type: 'rock', x: 0.44, y: 0.52 },
      { type: 'rock', x: 0.70, y: 0.78 },

      // Ancient Runic Obelisk
      { type: 'obelisk', x: 0.40, y: 0.15 },

      // Sunken Cargo & Campfire
      { type: 'crate', x: 0.16, y: 0.70 },
      { type: 'campfire', x: 0.65, y: 0.82 },
      { type: 'signpost', x: 0.12, y: 0.85 },

      // Toxic Swamp Flora
      { type: 'flower', x: 0.32, y: 0.62, color: '#a855f7' },
      { type: 'flower', x: 0.78, y: 0.38, color: '#a855f7' }
    ]
  },

  // ================= LEVEL 3 =================
  {
    id: 'desert',
    levelNumber: 3,
    name: 'Level 3: Gurun Tengkorak Terik',
    subtitle: 'Hamparan bukit pasir gersang, reruntuhan monumen firaun kuno, dan oasis tersembunyi',
    difficulty: 'Sulit',
    totalWaves: 8,
    bossId: 'sand_colossus',
    bossName: 'Raksasa Kolosus Gurun',
    startingGold: 450,
    bgColor: '#78350f', // warm desert sand
    pathColor: '#b45309', // golden sandstone road
    pathBorder: '#451a03',
    waterColor: '#0284c7',
    // Progressive winding path (West to East)
    waypoints: [
      { x: 0.0, y: 0.30 },  // Spawn Portal (Mid-High Left)
      { x: 0.20, y: 0.30 }, // East
      { x: 0.36, y: 0.65 }, // South-East bend
      { x: 0.56, y: 0.28 }, // North-East bend past ruins
      { x: 0.74, y: 0.72 }, // South-East bend past oasis
      { x: 0.88, y: 0.42 }, // East
      { x: 1.0, y: 0.42 }   // Castle Gate (Mid Right)
    ],
    pathWidth: 38,
    scenery: [
      // Saguaro Cacti with Blooms
      { type: 'cactus', x: 0.08, y: 0.18, scale: 1.2 },
      { type: 'cactus', x: 0.28, y: 0.50, scale: 1.3 },
      { type: 'cactus', x: 0.48, y: 0.15, scale: 1.1 },
      { type: 'cactus', x: 0.65, y: 0.50, scale: 1.25 },
      { type: 'cactus', x: 0.88, y: 0.75, scale: 1.15 },
      { type: 'cactus', x: 0.92, y: 0.22, scale: 1.0 },

      // Pharaoh Obelisks & Ruins
      { type: 'obelisk', x: 0.42, y: 0.12 },
      { type: 'obelisk', x: 0.62, y: 0.75 },
      { type: 'obelisk', x: 0.15, y: 0.55 },

      // Prehistoric Fossil Ribs & Skulls
      { type: 'bones', x: 0.12, y: 0.42 },
      { type: 'bones', x: 0.48, y: 0.78 },
      { type: 'bones', x: 0.82, y: 0.25 },
      { type: 'bones', x: 0.30, y: 0.85 },

      // Sunken Rocks & Crates
      { type: 'rock', x: 0.26, y: 0.22 },
      { type: 'rock', x: 0.72, y: 0.45 },
      { type: 'crate', x: 0.85, y: 0.48 },
      { type: 'signpost', x: 0.12, y: 0.38 }
    ]
  },

  // ================= LEVEL 4 =================
  {
    id: 'glacier',
    levelNumber: 4,
    name: 'Level 4: Puncak Gletser Abadi',
    subtitle: 'Lereng es membeku dengan badai salju ekstrem, kristal es berkilau, dan sarang wyvern',
    difficulty: 'Sangat Sulit',
    totalWaves: 10,
    bossId: 'frost_dragon',
    bossName: 'Naga Es Purba Boreas',
    startingGold: 480,
    bgColor: '#082f49', // deep glacial blue
    pathColor: '#e0f2fe', // frosted snow road
    pathBorder: '#0284c7',
    waterColor: '#0369a1',
    // Progressive winding path (Top-Left to Bottom-Right)
    waypoints: [
      { x: 0.0, y: 0.22 },  // Top Left Portal
      { x: 0.22, y: 0.22 }, // East
      { x: 0.40, y: 0.65 }, // South-East glacial slope
      { x: 0.60, y: 0.30 }, // North-East frost ridge
      { x: 0.78, y: 0.75 }, // South-East ice field
      { x: 0.88, y: 0.48 }, // Approaching castle
      { x: 1.0, y: 0.48 }   // Castle Gate (Mid Right)
    ],
    pathWidth: 40,
    scenery: [
      // Sparkling Elemental Frost Crystals
      { type: 'crystal', x: 0.08, y: 0.40, color: '#38bdf8' },
      { type: 'crystal', x: 0.30, y: 0.78, color: '#7dd3fc' },
      { type: 'crystal', x: 0.50, y: 0.20, color: '#bae6fd' },
      { type: 'crystal', x: 0.70, y: 0.55, color: '#38bdf8' },
      { type: 'crystal', x: 0.90, y: 0.30, color: '#bae6fd' },

      // Snow-Laden Frostfang Pines
      { type: 'tree', x: 0.06, y: 0.08, scale: 1.15, snow: true },
      { type: 'tree', x: 0.35, y: 0.10, scale: 1.25, snow: true },
      { type: 'tree', x: 0.88, y: 0.12, scale: 1.2, snow: true },
      { type: 'tree', x: 0.18, y: 0.75, scale: 1.25, snow: true },
      { type: 'tree', x: 0.65, y: 0.85, scale: 1.15, snow: true },

      // Frosted Rocks & Torches
      { type: 'rock', x: 0.28, y: 0.45 },
      { type: 'rock', x: 0.72, y: 0.20 },
      { type: 'lantern', x: 0.24, y: 0.15 },
      { type: 'lantern', x: 0.62, y: 0.22 },
      { type: 'campfire', x: 0.50, y: 0.75 },
      { type: 'signpost', x: 0.10, y: 0.28 }
    ]
  },

  // ================= LEVEL 5 =================
  {
    id: 'inferno',
    levelNumber: 5,
    name: 'Level 5: Benteng Vulkanik Neraka',
    subtitle: 'Kawah neraka dengan sungai magma menggelegak, kawah api obsidian, dan benteng iblis bertanduk',
    difficulty: 'Neraka',
    totalWaves: 12,
    bossId: 'demon_lord',
    bossName: 'Raja Iblis Azazel Sang Penguasa Neraka',
    startingGold: 500,
    bgColor: '#120404', // charred obsidian rock
    pathColor: '#450a0a', // magma-baked volcanic stone
    pathBorder: '#1a0404',
    waterColor: '#ea580c', // molten lava rivers
    // Progressive winding path (Bottom-Left to Mid-Right)
    waypoints: [
      { x: 0.0, y: 0.75 },  // Bottom Left Portal
      { x: 0.22, y: 0.75 }, // East
      { x: 0.38, y: 0.32 }, // North-East past caldera
      { x: 0.58, y: 0.70 }, // South-East through basalt ridge
      { x: 0.76, y: 0.28 }, // North-East past demon torches
      { x: 0.88, y: 0.58 }, // Approach fortress
      { x: 1.0, y: 0.58 }   // Fortress Gate (Mid Right)
    ],
    pathWidth: 38,
    scenery: [
      // Bubbling Molten Lava Pools
      { type: 'lava_pool', x: 0.35, y: 0.55, radius: 18 },
      { type: 'lava_pool', x: 0.65, y: 0.85, radius: 22 },
      { type: 'lava_pool', x: 0.85, y: 0.20, radius: 16 },

      // Demon Horn Brazier Torches
      { type: 'demon_torch', x: 0.22, y: 0.22 },
      { type: 'demon_torch', x: 0.44, y: 0.75 },
      { type: 'demon_torch', x: 0.72, y: 0.20 },
      { type: 'demon_torch', x: 0.94, y: 0.48 },
      { type: 'demon_torch', x: 0.08, y: 0.65 },

      // Charred Dead Spires
      { type: 'tree', x: 0.06, y: 0.45, scale: 1.15, dead: true },
      { type: 'tree', x: 0.48, y: 0.12, scale: 1.25, dead: true },
      { type: 'tree', x: 0.88, y: 0.85, scale: 1.3, dead: true },

      // Obsidian Boulders & Dragon Skeletons
      { type: 'rock', x: 0.18, y: 0.88 },
      { type: 'rock', x: 0.62, y: 0.42 },
      { type: 'bones', x: 0.35, y: 0.75 },
      { type: 'bones', x: 0.80, y: 0.38 }
    ]
  }
];

export function getMapById(mapId) {
  return MAPS.find(m => m.id === mapId) || MAPS[0];
}
