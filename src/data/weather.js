// Dynamic Weather System with Gameplay Modifiers and Visual Effects

export const WEATHERS = [
  {
    id: 'sunny',
    name: 'Cerah Berawan',
    title: 'Langit Terang',
    icon: 'Sun',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    overlayGradient: 'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
    description: 'Cuaca tenang dengan visibilitas sempurna. Jangkauan menara +15% dan api membakar lebih dahsyat (+25%).',
    duration: 45, // seconds
    modifiers: {
      rangeMultiplier: 1.15,
      enemySpeedMultiplier: 1.0,
      fireBurnBonus: 1.25,
      thunderBonusDmg: 1.0,
      frostFreezeBonus: 0,
      critChanceBonus: 0.05,
      passiveEnemyDPS: 0
    },
    particleType: 'sunbeam'
  },
  {
    id: 'rain',
    name: 'Hujan Badai',
    title: 'Petir & Hujan',
    icon: 'CloudLightning',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    overlayGradient: 'linear-gradient(180deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.35) 100%)',
    description: 'Jalanan becek memperlambat musuh 10%. Menara Petir mendapat dorongan konduksi: +35% Damage & rantai +2 target ekstra!',
    duration: 45,
    modifiers: {
      rangeMultiplier: 1.0,
      enemySpeedMultiplier: 0.90, // slows all enemies
      fireBurnBonus: 0.85,        // fire is slightly damp
      thunderBonusDmg: 1.35,      // thunder supercharged
      chainExtra: 2,
      frostFreezeBonus: 0.10,
      critChanceBonus: 0,
      passiveEnemyDPS: 0
    },
    particleType: 'rain'
  },
  {
    id: 'snow',
    name: 'Badai Salju',
    title: 'Kutub Beku',
    icon: 'Snowflake',
    color: '#bae6fd',
    glowColor: 'rgba(186, 230, 253, 0.4)',
    overlayGradient: 'radial-gradient(circle, rgba(224, 242, 254, 0.18) 0%, rgba(14, 165, 233, 0.12) 100%)',
    description: 'Hawa beku ekstrem memperlambat SEMUA musuh sebesar 25%! Menara Es berpeluang membekukan target seketika (+35% Freeze).',
    duration: 45,
    modifiers: {
      rangeMultiplier: 0.95,
      enemySpeedMultiplier: 0.75, // 25% slower!
      fireBurnBonus: 0.8,
      thunderBonusDmg: 1.0,
      frostFreezeBonus: 0.35,     // extra freeze chance
      critChanceBonus: 0,
      passiveEnemyDPS: 0
    },
    particleType: 'snow'
  },
  {
    id: 'fog',
    name: 'Kabut Misterius',
    title: 'Malam Berkabut',
    icon: 'CloudFog',
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    overlayGradient: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, rgba(15, 23, 42, 0.5) 100%)',
    description: 'Penglihatan berkurang (-15% Jarak serang), namun serangan menyelinap memberi +35% Peluang Kritis dan Ninja Racun menyerang 30% lebih cepat!',
    duration: 40,
    modifiers: {
      rangeMultiplier: 0.85,      // reduced range
      enemySpeedMultiplier: 1.0,
      fireBurnBonus: 1.0,
      thunderBonusDmg: 1.0,
      frostFreezeBonus: 0,
      critChanceBonus: 0.35,      // high critical chance
      ninjaSpeedMultiplier: 1.30,
      passiveEnemyDPS: 0
    },
    particleType: 'fog'
  },
  {
    id: 'heatwave',
    name: 'Gelombang Panas',
    title: 'Hawa Api Gurun',
    icon: 'Flame',
    color: '#fb923c',
    glowColor: 'rgba(251, 146, 60, 0.4)',
    overlayGradient: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, rgba(180, 83, 9, 0.25) 100%)',
    description: 'Suhu ekstrem membakar semua musuh di peta (5 DPS terus menerus). Adrenalin meningkatkan kecepatan serang semua menara +20%!',
    duration: 40,
    modifiers: {
      rangeMultiplier: 1.0,
      enemySpeedMultiplier: 1.05,  // slightly restless
      fireBurnBonus: 1.40,
      thunderBonusDmg: 1.0,
      frostFreezeBonus: -0.15,
      critChanceBonus: 0.1,
      towerSpeedMultiplier: 1.20,
      passiveEnemyDPS: 5          // 5 damage/sec to all enemies on track!
    },
    particleType: 'heat'
  }
];
