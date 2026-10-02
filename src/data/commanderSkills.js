// Commander Global Active Spells

export const COMMANDER_SKILLS = [
  {
    id: 'meteor',
    name: 'Hujan Meteor',
    cooldown: 25,
    icon: 'Flame',
    color: '#ef4444',
    desc: 'Menjatuhkan batu meteor panas di lokasi kursor, menghasilkan 450 Kerusakan Area dan efek bakar!',
    needsTarget: true,
    radius: 75
  },
  {
    id: 'freeze',
    name: 'Pembekuan Total',
    cooldown: 30,
    icon: 'Snowflake',
    color: '#38bdf8',
    desc: 'Mengunci dan membekukan SELURUH musuh yang ada di peta selama 4 detik!',
    needsTarget: false
  },
  {
    id: 'overdrive',
    name: 'Adrenalin Pasukan',
    cooldown: 35,
    icon: 'Zap',
    color: '#eab308',
    desc: 'Menyuntikkan daya tempur: Kecepatan tembak SEMUA menara berlipat ganda (+100%) selama 8 detik!',
    needsTarget: false
  },
  {
    id: 'gold_transmute',
    name: 'Sentuhan Midas',
    cooldown: 45,
    icon: 'Coins',
    color: '#f59e0b',
    desc: 'Langsung menghasilkan +180 Koin Emas instan untuk kas pertahananmu!',
    needsTarget: false
  }
];
