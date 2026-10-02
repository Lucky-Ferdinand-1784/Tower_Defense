// Procedural Pixel Art Drawing Routines for Towers, Enemies, Maps, and Effects

// Helper to draw a pixel block
export function drawPixelRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

import {
  drawPixelMapTerrain,
  drawPixelPath,
  drawPixelPortal,
  drawPixelCastle,
  drawPixelSceneryItem,
  drawRetroMapFrame
} from './pixelMapRenderer';

export {
  drawPixelMapTerrain,
  drawPixelPath,
  drawPixelPortal,
  drawPixelCastle,
  drawPixelSceneryItem,
  drawRetroMapFrame
};

// Delegated wrappers for backward compatibility:
export function drawPath(ctx, waypoints, pathWidth, pathColor, borderColor, mapId = 'valley', time = 0) {
  drawPixelPath(ctx, waypoints, pathWidth, pathColor, borderColor, mapId, time);
}

export function drawPortal(ctx, x, y, time, mapId = 'valley') {
  drawPixelPortal(ctx, x, y, time, mapId);
}

export function drawCastle(ctx, x, y, hp, maxHp, time = 0, mapId = 'valley') {
  drawPixelCastle(ctx, x, y, hp, maxHp, time, mapId);
}

export function drawSceneryItem(ctx, item, time, mapId = 'valley') {
  drawPixelSceneryItem(ctx, item, time, mapId);
}


// Draw Towers with Rank details and aiming
export function drawTower(ctx, tower, time, isSelected) {
  const { x, y, type, rank, targetAngle = 0 } = tower;
  ctx.save();
  ctx.translate(x, y);

  // Mythic Rank Aura (Rank 5)
  if (rank === 5) {
    const pulse = Math.sin(time * 5) * 4;
    const auraGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 32 + pulse);
    auraGrad.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
    auraGrad.addColorStop(0.7, 'rgba(236, 72, 153, 0.2)');
    auraGrad.addColorStop(1, 'rgba(244, 63, 94, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 32 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Orbiting sparks
    for (let i = 0; i < 3; i++) {
      const angle = time * 3 + (i * Math.PI * 2) / 3;
      const ox = Math.cos(angle) * 24;
      const oy = Math.sin(angle) * 24;
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(ox - 2, oy - 2, 4, 4);
    }
  }

  // Base platform (Stone Pedestal)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-16, 6, 32, 12);
  ctx.fillStyle = '#334155';
  ctx.fillRect(-14, 8, 28, 8);

  // Rank badge ring on pedestal
  const rankColors = ['#cd7f32', '#cbd5e1', '#f59e0b', '#38bdf8', '#f43f5e'];
  ctx.fillStyle = rankColors[rank - 1] || '#cd7f32';
  ctx.fillRect(-10, 12, 20, 3);

  // Character body based on class
  ctx.save();
  // Aim weapon direction towards target
  if (type === 'archer') {
    // Green cloak archer
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-7, -10, 14, 18);
    // Face
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(-4, -14, 8, 6);
    // Archer Hat / Hood
    ctx.fillStyle = rank >= 4 ? '#3b82f6' : '#166534';
    ctx.fillRect(-6, -17, 12, 5);
    // Bow
    ctx.save();
    ctx.rotate(targetAngle);
    ctx.strokeStyle = rank >= 3 ? '#f59e0b' : '#78350f';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(12, 0, 10, -Math.PI / 2.5, Math.PI / 2.5);
    ctx.stroke();
    // Arrow
    ctx.strokeStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();
    ctx.restore();
  } else if (type === 'fire_mage') {
    // Red Mage
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(-8, -10, 16, 18);
    // Face
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(-4, -14, 8, 6);
    // Wizard Hat
    ctx.fillStyle = rank >= 4 ? '#7f1d1d' : '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-9, -15);
    ctx.lineTo(9, -15);
    ctx.lineTo(0, -28);
    ctx.closePath();
    ctx.fill();
    // Fire staff
    ctx.save();
    ctx.rotate(targetAngle);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();
    // Glowing fire gem
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(17, 0, 4 + Math.sin(time * 6) * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (type === 'frost_mage') {
    // Cyan Frost Mage
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-8, -10, 16, 18);
    // Face
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(-4, -14, 8, 6);
    // Ice Tiara / Crown
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(-7, -18, 14, 5);
    // Ice Wand
    ctx.save();
    ctx.rotate(targetAngle);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();
    // Crystal tip
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(14, -3, 6, 6);
    ctx.restore();
  } else if (type === 'thunder_golem') {
    // Heavy Thunder Cannon / Golem
    ctx.fillStyle = '#475569';
    ctx.fillRect(-10, -12, 20, 20);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-4, -6, 8, 8); // Power core
    // Cannon barrel
    ctx.save();
    ctx.rotate(targetAngle);
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, -5, 18, 10);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(14, -6, 4, 12);
    ctx.restore();
  } else if (type === 'poison_ninja') {
    // Purple Shinobi
    ctx.fillStyle = '#581c87';
    ctx.fillRect(-7, -10, 14, 18);
    // Face mask
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(-5, -14, 10, 5);
    ctx.fillStyle = '#fcd34d'; // Eyes
    ctx.fillRect(-3, -12, 2, 2);
    ctx.fillRect(1, -12, 2, 2);
    // Dual Shuriken
    ctx.save();
    ctx.rotate(targetAngle);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(10, -2, 6, 4);
    ctx.restore();
  } else if (type === 'holy_paladin') {
    // Golden Holy Paladin
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-9, -10, 18, 18);
    // Winged Helm
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-6, -17, 12, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-3, -13, 6, 2); // Visor
    // Holy Hammer
    ctx.save();
    ctx.rotate(targetAngle);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(15, 0);
    ctx.stroke();
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(13, -5, 6, 10);
    ctx.restore();
  }
  ctx.restore();

  // Rank Stars / Level Indicators above tower
  ctx.fillStyle = rankColors[rank - 1];
  for (let s = 0; s < rank; s++) {
    const sx = (s - (rank - 1) / 2) * 6;
    ctx.fillRect(sx - 1.5, -28, 4, 4);
  }

  // Selection ring
  if (isSelected) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, 4, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

// Draw Enemies with Rich Pixel Art, Dynamic Aerial Shadows, Status Animations & Boss Crests
export function drawEnemy(ctx, enemy, time) {
  const { x, y, typeConfig, hp, maxHp, isFrozen, isSlowed, isBurning, isPoisoned, isStunned, sandShieldHp } = enemy;
  ctx.save();
  ctx.translate(x, y);

  const size = typeConfig.size || 22;
  const isFlying = !!typeConfig.isFlying;
  const isBoss = !!typeConfig.isBoss;

  // Flight elevation & walk bobbing physics
  const altitude = isFlying ? (14 + Math.sin(time * 6 + x) * 3) : 0;
  const walkBob = isFlying ? 0 : Math.sin(time * 9 + x) * 2;
  const squash = (!isFlying && (typeConfig.id === 'slime' || typeConfig.id === 'mini_slime' || typeConfig.id === 'king_slime' || typeConfig.id === 'toxic_slime'))
    ? Math.sin(time * 10) * 0.15
    : 0;

  // 1. Dynamic Drop Shadow on Ground (stays at y = 0 even when flying)
  ctx.save();
  const shadowScale = isFlying ? Math.max(0.6, 1 - altitude / 40) : 1.0;
  const shadowOpacity = isFlying ? 0.22 : 0.35;
  ctx.fillStyle = `rgba(0, 0, 0, ${shadowOpacity})`;
  ctx.beginPath();
  ctx.ellipse(0, 4, (size * 0.55) * shadowScale, (size * 0.25) * shadowScale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Elevate monster body to flight altitude or ground walk bob
  ctx.save();
  ctx.translate(0, -altitude + walkBob);
  if (enemy.facing === 'left') {
    ctx.scale(-1, 1);
  }
  if (squash !== 0) {
    ctx.scale(1 + squash, 1 - squash);
  }

  // 2. Boss Glowing Aura Ring
  if (isBoss) {
    const auraPulse = Math.sin(time * 5) * 4;
    const auraGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, size * 0.9 + auraPulse);
    if (typeConfig.id === 'demon_lord') {
      auraGrad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
      auraGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.2)');
      auraGrad.addColorStop(1, 'rgba(185, 28, 28, 0)');
    } else if (typeConfig.id === 'frost_dragon') {
      auraGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      auraGrad.addColorStop(0.7, 'rgba(14, 165, 233, 0.2)');
      auraGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    } else if (typeConfig.id === 'sand_colossus') {
      auraGrad.addColorStop(0, 'rgba(234, 179, 8, 0.45)');
      auraGrad.addColorStop(0.7, 'rgba(202, 138, 4, 0.2)');
      auraGrad.addColorStop(1, 'rgba(161, 98, 7, 0)');
    } else if (typeConfig.id === 'swamp_treant') {
      auraGrad.addColorStop(0, 'rgba(34, 197, 94, 0.45)');
      auraGrad.addColorStop(0.7, 'rgba(22, 101, 52, 0.2)');
      auraGrad.addColorStop(1, 'rgba(20, 83, 45, 0)');
    } else {
      auraGrad.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
      auraGrad.addColorStop(0.7, 'rgba(5, 150, 105, 0.2)');
      auraGrad.addColorStop(1, 'rgba(4, 120, 87, 0)');
    }
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.9 + auraPulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Render Pixel Character Model by Type
  const id = typeConfig.id;

  // --- SLIMES ---
  if (id === 'slime' || id === 'mini_slime') {
    const r = size * 0.55;
    ctx.fillStyle = isFrozen ? '#38bdf8' : (isPoisoned ? '#a855f7' : typeConfig.color);
    ctx.beginPath();
    ctx.ellipse(0, 2, r, r * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner nucleus core
    ctx.fillStyle = typeConfig.innerColor || '#15803d';
    ctx.beginPath();
    ctx.ellipse(0, 3, r * 0.45, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Specular highlight gleam
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fillRect(-r * 0.5, -r * 0.4, 3, 2);

    // Expressive cute eyes
    ctx.fillStyle = typeConfig.eyeColor || '#052e16';
    ctx.fillRect(-4, 0, 3, 4);
    ctx.fillRect(2, 0, 3, 4);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-3, 0, 1, 2);
    ctx.fillRect(3, 0, 1, 2);

  } else if (id === 'toxic_slime') {
    const r = size * 0.55;
    // Outer radioactive purple jelly
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#a855f7';
    ctx.beginPath();
    ctx.ellipse(0, 2, r, r * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing acidic lime core
    ctx.fillStyle = '#84cc16';
    ctx.beginPath();
    ctx.ellipse(0, 3, r * 0.4, r * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Acidic surface bubbles
    const bubbleOff = Math.sin(time * 12) * 2;
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(-6, -r * 0.5 + bubbleOff, 3, 3);
    ctx.fillRect(4, -r * 0.6 - bubbleOff, 2, 2);

    // Slanted evil glowing eyes
    ctx.fillStyle = '#e9d5ff';
    ctx.fillRect(-5, 0, 3, 3);
    ctx.fillRect(2, 0, 3, 3);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-4, 1, 1, 2);
    ctx.fillRect(3, 1, 1, 2);

  } else if (id === 'king_slime') {
    // === BOSS 1: KING SLIME ===
    const r = size * 0.58;
    // Giant translucent emerald jelly
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#10b981';
    ctx.beginPath();
    ctx.ellipse(0, 4, r, r * 0.82, 0, 0, Math.PI * 2);
    ctx.fill();

    // Deep inner jelly core
    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.ellipse(0, 6, r * 0.55, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Specular shine curve
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(-r * 0.6, -r * 0.3, 6, 3);
    ctx.fillRect(-r * 0.3, -r * 0.5, 4, 2);

    // Smug royal eyes & mouth
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-8, 2, 5, 4);
    ctx.fillRect(3, 2, 5, 4);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-6, 3, 2, 3);
    ctx.fillRect(5, 3, 2, 3);
    // Royal mustache/smile
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-5, 9, 10, 2);

    // Grand Gold Royal Crown with Rubies
    const crownY = -r * 0.82;
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(-14, crownY + 4);
    ctx.lineTo(14, crownY + 4);
    ctx.lineTo(16, crownY - 12); // Right spire
    ctx.lineTo(8, crownY - 4);
    ctx.lineTo(0, crownY - 16);  // Center tall spire
    ctx.lineTo(-8, crownY - 4);
    ctx.lineTo(-16, crownY - 12); // Left spire
    ctx.closePath();
    ctx.fill();

    // Inset rubies on crown
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-1, crownY - 13, 3, 3);
    ctx.fillRect(-14, crownY - 9, 2, 2);
    ctx.fillRect(12, crownY - 9, 2, 2);
    // Crown base gold band
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(-13, crownY + 2, 26, 3);

  // --- GOBLINS & ROGUES ---
  } else if (id === 'goblin') {
    // Green body
    ctx.fillStyle = isFrozen ? '#38bdf8' : typeConfig.color;
    ctx.fillRect(-6, -7, 12, 14);

    // Long pointy ears
    ctx.fillRect(-10, -5, 4, 3);
    ctx.fillRect(6, -5, 4, 3);

    // Red bandana with trailing knot
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-7, -10, 14, 4);
    ctx.fillRect(-9, -8, 3, 4); // Knot tail

    // Sharp eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(-4, -4, 3, 2);
    ctx.fillRect(1, -4, 3, 2);
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(-3, -4, 1, 2);
    ctx.fillRect(2, -4, 1, 2);

    // Leather belt & bronze dagger
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-6, 2, 12, 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(4, 0, 3, 6);

  } else if (id === 'goblin_assassin') {
    // Midnight dark shinobi shroud
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#1e1b4b';
    ctx.fillRect(-7, -8, 14, 15);

    // Ninja cowl mask
    ctx.fillStyle = '#312e81';
    ctx.fillRect(-6, -11, 12, 5);

    // Forehead metal plate
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-4, -10, 8, 2);

    // Piercing crimson glowing eyes
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-4, -5, 3, 2);
    ctx.fillRect(1, -5, 3, 2);

    // Dual poisoned kunai daggers
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(-9, -2, 2, 6);
    ctx.fillRect(7, -2, 2, 6);

    // Trailing shadow smoke specks
    ctx.fillStyle = 'rgba(79, 70, 229, 0.4)';
    const smokeX = Math.sin(time * 14) * 3;
    ctx.fillRect(-smokeX - 2, 6, 4, 3);

  // --- ORCS ---
  } else if (id === 'orc') {
    // Muscular green orc body
    ctx.fillStyle = isFrozen ? '#38bdf8' : typeConfig.color;
    ctx.fillRect(-9, -10, 18, 18);

    // Iron Helmet with horn attachments
    ctx.fillStyle = '#475569';
    ctx.fillRect(-10, -14, 20, 6);
    ctx.fillStyle = '#e2e8f0'; // Horns
    ctx.fillRect(-12, -18, 3, 6);
    ctx.fillRect(9, -18, 3, 6);

    // Glowing yellow eye slit
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-5, -7, 3, 2);
    ctx.fillRect(2, -7, 3, 2);

    // White protruding tusks from lower jaw
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-6, 0, 2, 3);
    ctx.fillRect(4, 0, 2, 3);

    // Studded iron shield on left arm
    ctx.fillStyle = '#334155';
    ctx.fillRect(-13, -4, 4, 10);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-12, -1, 2, 4);

  } else if (id === 'orc_warlord') {
    // Hulking dark-green war chief
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#14532d';
    ctx.fillRect(-12, -12, 24, 22);

    // Spiked iron war plate & pauldrons
    ctx.fillStyle = '#334155';
    ctx.fillRect(-14, -11, 4, 10); // Left shoulder spike
    ctx.fillRect(10, -11, 4, 10);  // Right shoulder spike
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-15, -13, 3, 4);
    ctx.fillRect(12, -13, 3, 4);

    // Two-horned great war helm with red plumage
    ctx.fillStyle = '#475569';
    ctx.fillRect(-11, -17, 22, 6);
    ctx.fillStyle = '#ef4444'; // Red crest
    ctx.fillRect(-3, -20, 6, 4);
    ctx.fillStyle = '#f8fafc'; // Giant curved horns
    ctx.fillRect(-15, -21, 4, 7);
    ctx.fillRect(11, -21, 4, 7);

    // Red warpaint across eyes
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(-9, -9, 18, 3);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-6, -9, 3, 2);
    ctx.fillRect(3, -9, 3, 2);

    // Giant double-bitted battle axe mounted on back
    ctx.fillStyle = '#78350f'; // Shaft
    ctx.fillRect(6, -22, 2, 26);
    ctx.fillStyle = '#cbd5e1'; // Axe blade
    ctx.fillRect(3, -24, 8, 6);

  // --- DESERT & UNDEAD ---
  } else if (id === 'sand_scorpion') {
    // Golden segmented chitin shell
    ctx.fillStyle = isFrozen ? '#38bdf8' : typeConfig.color;
    ctx.fillRect(-8, -5, 16, 12);

    // Segmented carapace ridges
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(-7, -3, 14, 2);
    ctx.fillRect(-7, 1, 14, 2);

    // Animated walking legs (3 pairs)
    const legWiggle = Math.sin(time * 16) * 2;
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(-12, -4 + legWiggle, 4, 2);
    ctx.fillRect(-12, 0 - legWiggle, 4, 2);
    ctx.fillRect(-12, 4 + legWiggle, 4, 2);
    ctx.fillRect(8, -4 - legWiggle, 4, 2);
    ctx.fillRect(8, 0 + legWiggle, 4, 2);
    ctx.fillRect(8, 4 - legWiggle, 4, 2);

    // Curved tail with venomous stinger
    const stingerWiggle = Math.sin(time * 8) * 3;
    ctx.fillStyle = '#a16207';
    ctx.fillRect(-2, -9, 4, 4);
    ctx.fillRect(stingerWiggle - 1, -14, 3, 6);
    // Green venom tip
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(stingerWiggle, -16, 3, 3);

    // Dual front snapping pincers
    ctx.fillStyle = '#713f12';
    ctx.fillRect(-7, -8, 3, 4);
    ctx.fillRect(4, -8, 3, 4);

  } else if (id === 'cursed_skeleton') {
    // Bleached bone skull
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#f1f5f9';
    ctx.fillRect(-6, -11, 12, 9);

    // Hollow eye sockets with turquoise soul flames
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-4, -8, 3, 3);
    ctx.fillRect(1, -8, 3, 3);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(-3, -7, 2, 2);
    ctx.fillRect(2, -7, 2, 2);

    // Exposed ribcage & spine
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-1, -2, 2, 8); // Spine
    ctx.fillRect(-5, 0, 10, 2); // Rib 1
    ctx.fillRect(-4, 3, 8, 2);  // Rib 2

    // Cracked ancient iron shield on arm
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(-8, 1, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-9, 0, 2, 2);

  } else if (id === 'shadow_wraith') {
    // Ethereal floating specter
    const ripple = Math.sin(time * 8 + y) * 2;
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#0284c7';
    // Flowing translucent shroud
    ctx.beginPath();
    ctx.moveTo(-7, -10);
    ctx.lineTo(7, -10);
    ctx.lineTo(8 + ripple, 8);
    ctx.lineTo(3, 4);
    ctx.lineTo(-2 + ripple, 9);
    ctx.lineTo(-8, 5);
    ctx.closePath();
    ctx.fill();

    // Dark empty hood
    ctx.fillStyle = '#0c4a6e';
    ctx.fillRect(-5, -9, 10, 6);

    // Glowing spectral cyan/purple eyes
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-3, -7, 2, 2);
    ctx.fillRect(1, -7, 2, 2);

    // Spectral mist floating around
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.fillRect(-6, 8, 12, 3);

  // --- FLYING BEASTS ---
  } else if (id === 'shadow_bat') {
    const flap = Math.sin(time * 16) * 7;
    // Purple furry body
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#4338ca';
    ctx.fillRect(-4, -4, 8, 8);

    // Articulated leathery bat wings
    ctx.fillStyle = '#312e81';
    ctx.beginPath();
    ctx.moveTo(-4, -1);
    ctx.lineTo(-16, -10 + flap);
    ctx.lineTo(-8, 5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(4, -1);
    ctx.lineTo(16, -10 + flap);
    ctx.lineTo(8, 5);
    ctx.closePath();
    ctx.fill();

    // Vampire fangs & ruby red eyes
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-3, -3, 2, 2);
    ctx.fillRect(1, -3, 2, 2);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-2, 1, 1, 2);
    ctx.fillRect(1, 1, 1, 2);

  } else if (id === 'frost_wyvern') {
    const flap = Math.sin(time * 12) * 9;
    // Ice-blue wyvern torso
    ctx.fillStyle = isFrozen ? '#bae6fd' : '#0284c7';
    ctx.fillRect(-7, -7, 14, 14);

    // Wide jagged crystal wings
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-5, -2);
    ctx.lineTo(-22, -14 + flap);
    ctx.lineTo(-14, 0 + flap * 0.5);
    ctx.lineTo(-7, 8);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(5, -2);
    ctx.lineTo(22, -14 + flap);
    ctx.lineTo(14, 0 + flap * 0.5);
    ctx.lineTo(7, 8);
    ctx.closePath();
    ctx.fill();

    // Horned dragon head & long spiked tail
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(-4, -12, 8, 6);
    ctx.fillStyle = '#e0f2fe'; // Ice horns
    ctx.fillRect(-5, -15, 2, 4);
    ctx.fillRect(3, -15, 2, 4);
    // Glowing frost eyes
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-3, -10, 2, 2);
    ctx.fillRect(1, -10, 2, 2);
    // Barbed tail
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-2, 7, 4, 8);

  } else if (id === 'infernal_gargoyle') {
    const flap = Math.sin(time * 14) * 8;
    // Obsidian stone body
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#7f1d1d';
    ctx.fillRect(-7, -7, 14, 14);

    // Stone wings with molten edges
    ctx.fillStyle = '#450a0a';
    ctx.beginPath();
    ctx.moveTo(-5, -2);
    ctx.lineTo(-20, -12 + flap);
    ctx.lineTo(-6, 7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f97316'; // Molten edge
    ctx.fillRect(-18, -11 + flap, 3, 3);

    ctx.fillStyle = '#450a0a';
    ctx.beginPath();
    ctx.moveTo(5, -2);
    ctx.lineTo(20, -12 + flap);
    ctx.lineTo(6, 7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f97316';
    ctx.fillRect(16, -11 + flap, 3, 3);

    // Horned gargoyle face with fiery eyes
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-5, -12, 10, 6);
    ctx.fillStyle = '#ef4444'; // Horns
    ctx.fillRect(-6, -15, 2, 4);
    ctx.fillRect(4, -15, 2, 4);
    // Fiery slit eyes
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-3, -10, 2, 2);
    ctx.fillRect(1, -10, 2, 2);

  // --- GOLEMS ---
  } else if (id === 'stone_golem') {
    // Massive granite plates
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#475569';
    ctx.fillRect(-14, -16, 28, 26);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-11, -13, 22, 20);

    // Pulsing cyan runic glyphs carved in chest
    const runePulse = Math.sin(time * 6) * 0.3;
    ctx.fillStyle = `rgba(56, 189, 248, ${0.7 + runePulse})`;
    ctx.fillRect(-8, -8, 16, 3);
    ctx.fillRect(-2, -5, 4, 8);

    // Boulder shoulder pads
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-17, -15, 4, 8);
    ctx.fillRect(13, -15, 4, 8);

  } else if (id === 'magma_golem') {
    // Charcoal basalt rock
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#1c0a0a';
    ctx.fillRect(-15, -17, 30, 28);

    // Molten lava fissures crackling across body
    const lavaFlicker = Math.sin(time * 10) * 0.2;
    ctx.fillStyle = `rgba(249, 115, 22, ${0.8 + lavaFlicker})`;
    ctx.fillRect(-12, -10, 24, 3);
    ctx.fillRect(-4, -14, 4, 16);
    ctx.fillRect(-10, 2, 8, 3);
    ctx.fillRect(3, 2, 8, 3);

    // Blazing white/yellow lava core
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-3, -6, 6, 6);

    // Smoke embers rising from stone shoulders
    ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
    const emberY = Math.sin(time * 8) * 3;
    ctx.fillRect(-14, -20 + emberY, 2, 2);
    ctx.fillRect(12, -22 - emberY, 2, 2);

  // --- LEVEL 2 BOSS: SWAMP TREANT ---
  } else if (id === 'swamp_treant') {
    // Massive gnarled oak trunk
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#3f2e18';
    ctx.fillRect(-16, -18, 32, 32);
    ctx.fillStyle = '#271b0d';
    ctx.fillRect(-13, -15, 26, 26);

    // Gnarled wood grain bark lines
    ctx.fillStyle = '#1c1309';
    ctx.fillRect(-10, -10, 3, 16);
    ctx.fillRect(4, -12, 3, 14);

    // Ancient wooden amber heart pulsing
    const heartPulse = Math.sin(time * 4) * 2;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 6 + heartPulse, 0, Math.PI * 2);
    ctx.fill();

    // Moss & leaf canopy on crown
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.arc(0, -20, 16, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(-12, -22, 24, 4);

    // Glowing green ancient eyes
    ctx.fillStyle = '#84cc16';
    ctx.fillRect(-8, -10, 4, 3);
    ctx.fillRect(4, -10, 4, 3);

  // --- LEVEL 3 BOSS: SAND COLOSSUS ---
  } else if (id === 'sand_colossus') {
    // Colossal sandstone temple titan
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#b45309';
    ctx.fillRect(-18, -20, 36, 36);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(-15, -17, 30, 30);

    // Sandstone hammer fists
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-22, -10, 6, 14);
    ctx.fillRect(16, -10, 6, 14);

    // Glowing Ra Solar Sun Disc Glyph
    const sunPulse = Math.sin(time * 5) * 2;
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, -2, 7 + sunPulse, 0, Math.PI * 2);
    ctx.fill();

    // Pharaoh crown headdress
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(-14, -26, 28, 8);
    ctx.fillStyle = '#0284c7'; // Turquoise inlay stripes
    ctx.fillRect(-10, -26, 3, 8);
    ctx.fillRect(0, -26, 3, 8);
    ctx.fillRect(8, -26, 3, 8);

    // Glowing cyan eyes
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-8, -14, 4, 3);
    ctx.fillRect(4, -14, 4, 3);

  // --- LEVEL 4 BOSS: FROST DRAGON BOREAS ---
  } else if (id === 'frost_dragon') {
    const flap = Math.sin(time * 10) * 12;
    // Colossal ice dragon body
    ctx.fillStyle = isFrozen ? '#bae6fd' : '#0369a1';
    ctx.fillRect(-12, -12, 24, 24);

    // Enormous glacial wings spanning wide
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-10, -4);
    ctx.lineTo(-32, -22 + flap);
    ctx.lineTo(-20, 2 + flap * 0.5);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, -4);
    ctx.lineTo(32, -22 + flap);
    ctx.lineTo(20, 2 + flap * 0.5);
    ctx.lineTo(10, 10);
    ctx.closePath();
    ctx.fill();

    // Spiked crystal spine ridge
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(-2, -24, 4, 32);

    // Dragon head with icy horns
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-6, -18, 12, 8);
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(-8, -24, 3, 8);
    ctx.fillRect(5, -24, 3, 8);

    // Golden menacing dragon eyes
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-4, -15, 3, 3);
    ctx.fillRect(2, -15, 3, 3);

  // --- LEVEL 5 FINAL BOSS: DEMON LORD AZAZEL ---
  } else if (id === 'demon_lord') {
    // Towering Demonic Overlord
    ctx.fillStyle = isFrozen ? '#38bdf8' : '#7f1d1d';
    ctx.fillRect(-18, -20, 36, 36);
    ctx.fillStyle = '#450a0a';
    ctx.fillRect(-15, -17, 30, 30);

    // Giant sweeping obsidian horns with molten red tips
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-12, -20);
    ctx.lineTo(-26, -38);
    ctx.lineTo(-8, -24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ef4444'; // Molten tip
    ctx.fillRect(-27, -40, 4, 4);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(12, -20);
    ctx.lineTo(26, -38);
    ctx.lineTo(8, -24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(24, -40, 4, 4);

    // Giant spreading dark bat wings
    const wingFlap = Math.sin(time * 8) * 6;
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.moveTo(-16, -6);
    ctx.lineTo(-34, -24 + wingFlap);
    ctx.lineTo(-20, 8);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(16, -6);
    ctx.lineTo(34, -24 + wingFlap);
    ctx.lineTo(20, 8);
    ctx.closePath();
    ctx.fill();

    // Internal blazing hellfire furnace chest
    const fireFlicker = Math.sin(time * 14) * 2;
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-8, -4, 16, 10);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-5, -2 + fireFlicker, 10, 6);

    // Glowing yellow demonic eyes
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-10, -14, 5, 4);
    ctx.fillRect(5, -14, 5, 4);
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(-8, -13, 2, 2);
    ctx.fillRect(7, -13, 2, 2);

  } else {
    // Fallback Monster
    ctx.fillStyle = isFrozen ? '#38bdf8' : (typeConfig.color || '#ef4444');
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.fillStyle = typeConfig.eyeColor || '#fff';
    ctx.fillRect(-4, -4, 2, 2);
    ctx.fillRect(2, -4, 2, 2);
  }

  // 4. Status Effects Visual Overlays
  if (isFrozen) {
    // Crystalline polygonal ice block encasing monster
    ctx.fillStyle = 'rgba(186, 230, 253, 0.45)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(-size * 0.65, -size * 0.7, size * 1.3, size * 1.35);
    ctx.fill();
    ctx.stroke();

    // Ice crystal glints
    ctx.fillStyle = '#fff';
    ctx.fillRect(-size * 0.5, -size * 0.6, 3, 3);
    ctx.fillRect(size * 0.3, -size * 0.2, 2, 2);
  } else if (isBurning) {
    // Multi-tiered animated flickering flames dancing above monster
    const flameH = 6 + Math.sin(time * 16) * 3;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.5);
    ctx.lineTo(size * 0.4, -size * 0.5);
    ctx.lineTo(0, -size * 0.5 - flameH);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#f97316';
    ctx.fillRect(-3, -size * 0.5 - flameH * 0.6, 6, 4);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-1, -size * 0.5 - flameH * 0.3, 2, 3);
  }

  if (isPoisoned) {
    // Rising bubbling purple droplets
    const dropY = (time * 20) % 12;
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(-4, -size * 0.4 - dropY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, -size * 0.3 - (12 - dropY), 2, 0, Math.PI * 2);
    ctx.fill();
  }

  if (isStunned) {
    // Golden dizzy stars orbiting monster head
    for (let s = 0; s < 3; s++) {
      const sAngle = time * 8 + (s * Math.PI * 2) / 3;
      const starX = Math.cos(sAngle) * (size * 0.6);
      const starY = -size * 0.7 + Math.sin(sAngle) * 3;
      ctx.fillStyle = '#facc15';
      ctx.fillRect(starX - 2, starY - 2, 4, 4);
    }
  }

  ctx.restore(); // Restore elevation & scale

  // 5. Boss Floating Crest & Health Bar
  const barW = isBoss ? Math.max(46, size * 1.2) : Math.max(24, size);
  const barH = isBoss ? 6 : 4;
  const hpRatio = Math.max(0, hp / maxHp);
  const barY = -altitude - size * 0.7 - 8;

  // Boss Golden Crown / Skull Crest Banner
  if (isBoss) {
    ctx.save();
    // Crown / Skull icon badge
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-6, barY - 10, 12, 3);
    ctx.fillRect(-8, barY - 14, 16, 4);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-4, barY - 13, 2, 2);
    ctx.fillRect(2, barY - 13, 2, 2);

    // Glowing "BOSS" text
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.fillText('BOSS', 0, barY - 15);
    ctx.restore();
  }

  // Health Bar Background
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(-barW / 2 - 1, barY - 1, barW + 2, barH + 2);

  // Health Fill with dynamic gradient color
  let barColor = '#22c55e'; // Green
  if (isBoss) {
    barColor = hpRatio > 0.5 ? '#f43f5e' : '#e11d48';
  } else if (hpRatio <= 0.25) {
    barColor = '#ef4444'; // Red
  } else if (hpRatio <= 0.6) {
    barColor = '#facc15'; // Amber
  }

  ctx.fillStyle = barColor;
  ctx.fillRect(-barW / 2, barY, barW * hpRatio, barH);

  // Border outline
  ctx.strokeStyle = isBoss ? '#f59e0b' : '#334155';
  ctx.lineWidth = isBoss ? 1.5 : 1;
  ctx.strokeRect(-barW / 2 - 1, barY - 1, barW + 2, barH + 2);

  // Armor Indicator (Little Shield Icon on left of health bar)
  if (typeConfig.armor && typeConfig.armor > 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-barW / 2 - 5, barY, 4, 4);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-barW / 2 - 4, barY + 1, 2, 2);
  }

  ctx.restore();
}

// Draw Projectile
export function drawProjectile(ctx, proj) {
  const { x, y, type, targetX, targetY } = proj;
  ctx.save();
  ctx.translate(x, y);

  const angle = Math.atan2(targetY - y, targetX - x);
  ctx.rotate(angle);

  if (type.includes('arrow')) {
    // Arrow
    ctx.strokeStyle = type.includes('celestial') ? '#fef08a' : '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(8, 0);
    ctx.stroke();

    // Arrowhead
    ctx.fillStyle = type.includes('celestial') ? '#38bdf8' : '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(4, -3);
    ctx.lineTo(4, 3);
    ctx.closePath();
    ctx.fill();
  } else if (type.includes('fire')) {
    // Fireball
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(2, 0, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (type.includes('ice')) {
    // Ice shard
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-6, -4);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-6, 4);
    ctx.closePath();
    ctx.fill();
  } else if (type.includes('lightning')) {
    // Lightning spark
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-6, -3);
    ctx.lineTo(0, 3);
    ctx.lineTo(6, -2);
    ctx.stroke();
  } else if (type.includes('poison')) {
    // Shuriken
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(-4, -4, 8, 8);
    ctx.fillStyle = '#581c87';
    ctx.fillRect(-2, -2, 4, 4);
  } else if (type.includes('holy')) {
    // Holy orb
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// Draw Floating Damage Text
export function drawFloatingText(ctx, item) {
  const { x, y, text, color, isCrit, opacity } = item;
  ctx.save();
  ctx.globalAlpha = Math.max(0, opacity);
  ctx.font = isCrit ? 'bold 13px "Press Start 2P"' : '10px "Press Start 2P"';
  ctx.fillStyle = '#0f172a';
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = color || '#fff';
  ctx.fillText(text, x, y);
  ctx.restore();
}
