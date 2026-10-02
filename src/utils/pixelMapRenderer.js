// ============================================================================
// PIXEL MAP RENDERER - Pure Retro 16-Bit / Arcade Map Graphics Engine
// Handcrafted procedural pixel art for terrains, cobblestone paths, void portal,
// grand fortress castle, and biome-specific scenery props.
// ============================================================================

// Deterministic fast integer hash for procedural tile details (seed-based, zero lag)
export function tileHash(x, y) {
  let h = ((x | 0) * 374761393) ^ ((y | 0) * 668265263);
  h = (h ^ (h >>> 13)) * 1274126177;
  return (h ^ (h >>> 16)) >>> 0;
}

// ----------------------------------------------------------------------------
// 1. BIOME TERRAIN TILES (40x25 grid of 24x24 pixel tiles)
// ----------------------------------------------------------------------------
const TILE_SIZE = 24;

export function drawPixelMapTerrain(ctx, map, width, height, time) {
  const cols = Math.ceil(width / TILE_SIZE);
  const rows = Math.ceil(height / TILE_SIZE);
  const mapId = map.id || 'valley';

  // Base background fill
  ctx.fillStyle = map.bgColor || '#142a19';
  ctx.fillRect(0, 0, width, height);

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const tx = c * TILE_SIZE;
      const ty = r * TILE_SIZE;
      const h = tileHash(c, r);

      switch (mapId) {
        case 'valley':
          drawValleyTile(ctx, tx, ty, c, r, h, time);
          break;
        case 'swamp':
          drawSwampTile(ctx, tx, ty, c, r, h, time);
          break;
        case 'desert':
          drawDesertTile(ctx, tx, ty, c, r, h, time);
          break;
        case 'glacier':
          drawGlacierTile(ctx, tx, ty, c, r, h, time);
          break;
        case 'inferno':
          drawInfernoTile(ctx, tx, ty, c, r, h, time);
          break;
        default:
          drawValleyTile(ctx, tx, ty, c, r, h, time);
      }
    }
  }

  // Draw natural water bodies (like the Valley stream or Swamp bogs or Desert oasis)
  drawBiomeWaterBodies(ctx, mapId, width, height, time);
}

// LEVEL 1: VALLEY (Verdant Dragon Meadow)
function drawValleyTile(ctx, x, y, c, r, h, time) {
  // 3-tone grass checker pattern
  const isAlt = (c + r) % 2 === 0;
  ctx.fillStyle = isAlt ? '#1a4325' : '#15381f';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

  // Micro pixel dither dots
  ctx.fillStyle = '#1e522d';
  if ((h % 5) === 0) {
    ctx.fillRect(x + 4, y + 4, 3, 3);
    ctx.fillRect(x + 14, y + 16, 2, 2);
  } else if ((h % 5) === 1) {
    ctx.fillRect(x + 16, y + 6, 3, 2);
    ctx.fillRect(x + 6, y + 14, 2, 3);
  }

  // Grass blade tufts
  if ((h % 7) === 0) {
    const gx = x + (h % 14) + 4;
    const gy = y + ((h >> 4) % 12) + 6;
    ctx.fillStyle = '#2fb356';
    ctx.fillRect(gx, gy, 2, 4);
    ctx.fillRect(gx + 2, gy - 2, 2, 6);
    ctx.fillRect(gx + 4, gy + 1, 2, 3);
    ctx.fillStyle = '#0f2916';
    ctx.fillRect(gx, gy + 4, 6, 1);
  }

  // Clover clusters
  if ((h % 19) === 0) {
    const cx = x + 8;
    const cy = y + 8;
    ctx.fillStyle = '#34d399';
    ctx.fillRect(cx - 2, cy - 1, 2, 2);
    ctx.fillRect(cx + 1, cy - 1, 2, 2);
    ctx.fillRect(cx - 1, cy + 1, 3, 2);
    ctx.fillStyle = '#065f46';
    ctx.fillRect(cx, cy, 1, 3);
  }

  // Tiny wild blossoms (daisies & buttercups)
  if ((h % 23) === 0) {
    const fx = x + 10;
    const fy = y + 10;
    const fColor = (h % 2 === 0) ? '#fef08a' : '#ffffff';
    ctx.fillStyle = fColor;
    ctx.fillRect(fx - 1, fy - 2, 3, 1);
    ctx.fillRect(fx - 2, fy - 1, 1, 3);
    ctx.fillRect(fx + 2, fy - 1, 1, 3);
    ctx.fillRect(fx - 1, fy + 2, 3, 1);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(fx - 1, fy - 1, 3, 3);
  }

  // Tiny pebble
  if ((h % 31) === 0) {
    const px = x + 6;
    const py = y + 16;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(px, py, 4, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(px, py, 2, 1);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px, py + 3, 4, 1);
  }
}

// LEVEL 2: SWAMP (Mystic Bog)
function drawSwampTile(ctx, x, y, c, r, h, time) {
  // Dark peat mud tones
  const isAlt = (c + r) % 2 === 0;
  ctx.fillStyle = isAlt ? '#16281e' : '#112017';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

  // Murky slime patches
  if ((h % 4) === 0) {
    ctx.fillStyle = '#1c3629';
    ctx.fillRect(x + 2, y + 2, 12, 10);
    ctx.fillRect(x + 6, y + 12, 14, 8);
  }

  // Sunken rotten wood / roots
  if ((h % 13) === 0) {
    ctx.fillStyle = '#3b2f1e';
    ctx.fillRect(x + 2, y + 10, 16, 3);
    ctx.fillStyle = '#221910';
    ctx.fillRect(x + 2, y + 13, 16, 1);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(x + 6, y + 9, 4, 2);
  }

  // Glowing fungal spore mycelium
  if ((h % 17) === 0) {
    const pulse = Math.sin(time * 3 + c * 0.5) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(168, 85, 247, ${pulse * 0.7})`;
    ctx.fillRect(x + 4, y + 6, 2, 2);
    ctx.fillRect(x + 7, y + 7, 2, 2);
    ctx.fillRect(x + 14, y + 14, 3, 2);
  }

  // Swamp mire bubbles (popping in time)
  if ((h % 29) === 0) {
    const bubbleTime = (time * 1.5 + (h % 10)) % 3;
    if (bubbleTime < 2) {
      const bx = x + 8;
      const by = y + 10;
      const bSize = Math.floor(bubbleTime * 2) + 2;
      ctx.fillStyle = '#065f46';
      ctx.fillRect(bx - 1, by - 1, bSize + 2, bSize + 2);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(bx, by, bSize, bSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(bx, by, 1, 1);
    }
  }
}

// LEVEL 3: DESERT (Ancient Pharaoh Dunes)
function drawDesertTile(ctx, x, y, c, r, h, time) {
  // Rich golden sandstone hues
  const dVal = (c * 2 + r) % 4;
  const colors = ['#9a5108', '#a75b0b', '#8f4705', '#b4630e'];
  ctx.fillStyle = colors[dVal];
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

  // Stepped windblown sand ripple ridges (diagonal pixel steps)
  ctx.fillStyle = '#d97706';
  ctx.fillRect(x + 2, y + 4, 6, 2);
  ctx.fillRect(x + 8, y + 6, 6, 2);
  ctx.fillRect(x + 14, y + 8, 8, 2);

  // Sand ridge bright highlight
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(x + 2, y + 3, 6, 1);
  ctx.fillRect(x + 8, y + 5, 6, 1);
  ctx.fillRect(x + 14, y + 7, 8, 1);

  // Sand shadow drop
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x + 2, y + 6, 6, 1);
  ctx.fillRect(x + 8, y + 8, 6, 1);

  // Sun-cracked clay fractures
  if ((h % 11) === 0) {
    ctx.fillStyle = '#451a03';
    ctx.fillRect(x + 4, y + 14, 12, 1);
    ctx.fillRect(x + 9, y + 10, 1, 8);
    ctx.fillRect(x + 14, y + 12, 1, 5);
  }

  // Ancient hieroglyphic sandstone tile
  if ((h % 37) === 0) {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(x + 2, y + 2, 20, 20);
    ctx.fillStyle = '#78350f';
    ctx.strokeRect(x + 2.5, y + 2.5, 19, 19);
    // Gold glyph
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x + 8, y + 6, 8, 2);
    ctx.fillRect(x + 11, y + 8, 2, 8);
    ctx.fillRect(x + 7, y + 12, 10, 2);
  }

  // Prehistoric bone shard / tooth
  if ((h % 27) === 0) {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x + 6, y + 12, 5, 2);
    ctx.fillRect(x + 9, y + 10, 3, 2);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x + 6, y + 14, 6, 1);
  }
}

// LEVEL 4: GLACIER (Crystal Frostfang Peak)
function drawGlacierTile(ctx, x, y, c, r, h, time) {
  // Deep glacial blue & frosted pack ice
  const isAlt = (c + r) % 2 === 0;
  ctx.fillStyle = isAlt ? '#0369a1' : '#0284c7';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

  // Snowdrift crust
  if ((h % 3) === 0) {
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(x + 2, y + 2, 16, 8);
    ctx.fillRect(x + 8, y + 10, 12, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 4, y + 3, 10, 4);
  }

  // Deep ice fissures / geometric frost cracks
  if ((h % 9) === 0) {
    ctx.fillStyle = '#082f49';
    ctx.fillRect(x + 2, y + 6, 6, 2);
    ctx.fillRect(x + 8, y + 8, 4, 3);
    ctx.fillRect(x + 12, y + 11, 8, 2);
    ctx.fillRect(x + 16, y + 13, 6, 3);
    // Cyan ice refraction edge
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(x + 2, y + 5, 6, 1);
    ctx.fillRect(x + 8, y + 7, 4, 1);
    ctx.fillRect(x + 12, y + 10, 8, 1);
  }

  // Twinkling ice crystals (periodic glint)
  if ((h % 17) === 0) {
    const glintPhase = (time * 2 + c) % 4;
    if (glintPhase < 1.2) {
      const ix = x + 12;
      const iy = y + 12;
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(ix - 2, iy, 5, 1);
      ctx.fillRect(ix, iy - 2, 1, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ix, iy, 1, 1);
    }
  }

  // Frosted stone embedded in snow
  if ((h % 23) === 0) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 6, y + 12, 6, 4);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x + 6, y + 11, 6, 2);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x + 7, y + 10, 4, 2);
  }
}

// LEVEL 5: INFERNO (Demon Caldera)
function drawInfernoTile(ctx, x, y, c, r, h, time) {
  // Pitch obsidian stone
  const isAlt = (c + r) % 2 === 0;
  ctx.fillStyle = isAlt ? '#1a0707' : '#120404';
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

  // Basalt slab edges
  ctx.fillStyle = '#2a0e0e';
  ctx.fillRect(x + 1, y + 1, TILE_SIZE - 2, 1);
  ctx.fillRect(x + 1, y + 1, 1, TILE_SIZE - 2);
  ctx.fillStyle = '#0a0202';
  ctx.fillRect(x + 1, y + TILE_SIZE - 1, TILE_SIZE - 1, 1);
  ctx.fillRect(x + TILE_SIZE - 1, y + 1, 1, TILE_SIZE - 1);

  // Magma cracks threading across tiles
  if ((h % 5) === 0) {
    const heatGlow = Math.sin(time * 4 + c + r) * 0.2 + 0.8;
    // Dark red fracture rim
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(x + 2, y + 10, 18, 3);
    ctx.fillRect(x + 10, y + 4, 3, 16);
    // Fiery orange core
    ctx.fillStyle = `rgba(249, 115, 22, ${heatGlow})`;
    ctx.fillRect(x + 4, y + 11, 14, 2);
    ctx.fillRect(x + 11, y + 6, 2, 12);
    // Blazing yellow heart
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 8, y + 11, 6, 1);
    ctx.fillRect(x + 11, y + 9, 1, 5);
  }

  // Brimstone sulfur deposit
  if ((h % 21) === 0) {
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(x + 6, y + 6, 4, 3);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(x + 7, y + 7, 2, 1);
  }

  // Floating red embers rising
  if ((h % 13) === 0) {
    const emberY = (y + TILE_SIZE - ((time * 25 + h * 7) % (TILE_SIZE + 20))) | 0;
    const emberX = x + ((h >> 3) % 18) + 3;
    ctx.fillStyle = '#f97316';
    ctx.fillRect(emberX, emberY, 2, 2);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(emberX, emberY, 1, 1);
  }
}

// ----------------------------------------------------------------------------
// 2. BIOME WATER BODIES & RIVERS (Dynamic pixel rivers, bogs, and pools)
// ----------------------------------------------------------------------------
function drawBiomeWaterBodies(ctx, mapId, width, height, time) {
  if (mapId === 'valley') {
    // Beautiful winding brook flowing from top center to bottom left
    drawPixelRiver(ctx, [
      { x: 340, y: 0 },
      { x: 360, y: 150 },
      { x: 260, y: 280 },
      { x: 290, y: 440 },
      { x: 240, y: 600 }
    ], 30, '#0284c7', '#0369a1', '#38bdf8', time);

    // Lily pad with pink water lotus
    drawLilyPad(ctx, 350, 120, time);
    drawLilyPad(ctx, 275, 330, time);
    drawLilyPad(ctx, 280, 480, time);
  } else if (mapId === 'swamp') {
    // Murky poisonous swamp bog pond in center-north and bottom-right
    drawSwampBog(ctx, 380, 160, 65, 45, time);
    drawSwampBog(ctx, 620, 460, 75, 50, time);
  } else if (mapId === 'desert') {
    // Hidden Desert Oasis at top-right
    drawDesertOasis(ctx, 740, 110, 60, 42, time);
  } else if (mapId === 'inferno') {
    // Molten lava calderas with bubbling magma
    drawLavaCaldera(ctx, 380, 240, 55, 38, time);
    drawLavaCaldera(ctx, 680, 450, 65, 42, time);
  }
}

// Pixel River with flow shimmer
function drawPixelRiver(ctx, points, width, waterColor, deepColor, waveColor, time) {
  if (points.length < 2) return;

  // Riverbed deep water
  ctx.save();
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';

  // Bank dark edge
  ctx.lineWidth = width + 8;
  ctx.strokeStyle = '#0f2916';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  // Shore teal edge
  ctx.lineWidth = width + 4;
  ctx.strokeStyle = '#0f766e';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  // Water core
  ctx.lineWidth = width;
  ctx.strokeStyle = waterColor;
  ctx.stroke();

  // Deep trench
  ctx.lineWidth = width - 12;
  ctx.strokeStyle = deepColor;
  ctx.stroke();

  // Shimmering pixel current waves
  ctx.fillStyle = waveColor;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const segDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.floor(segDist / 18);
    for (let s = 0; s < steps; s++) {
      const t = (s / steps + (time * 0.4) % 1) % 1;
      const wx = p1.x + (p2.x - p1.x) * t;
      const wy = p1.y + (p2.y - p1.y) * t;
      ctx.fillRect(Math.floor(wx - 4), Math.floor(wy - 1), 8, 2);
    }
  }

  ctx.restore();
}

function drawLilyPad(ctx, x, y, time) {
  ctx.save();
  ctx.translate(x, y);
  // Pad green disk
  ctx.fillStyle = '#15803d';
  ctx.fillRect(-6, -4, 12, 8);
  ctx.fillRect(-4, -6, 8, 12);
  // Cutout notch
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, -6, 2, 6);
  // Pink lotus blossom
  const bloom = Math.sin(time * 2 + x) * 0.15 + 0.85;
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(-2, -2, 4, 4);
  ctx.fillStyle = '#fbcfe8';
  ctx.fillRect(-1, -1, 2, 2);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(0, 0, 1, 1);
  ctx.restore();
}

function drawSwampBog(ctx, cx, cy, rx, ry, time) {
  ctx.save();
  // Dark shore
  ctx.fillStyle = '#062013';
  ctx.fillRect(cx - rx - 4, cy - ry - 4, (rx + 4) * 2, (ry + 4) * 2);
  // Toxic green water
  ctx.fillStyle = '#04422b';
  ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
  ctx.fillStyle = '#065f46';
  ctx.fillRect(cx - rx + 4, cy - ry + 4, (rx - 4) * 2, (ry - 4) * 2);

  // Toxic floating scum
  ctx.fillStyle = '#10b981';
  ctx.fillRect(cx - 15, cy - 8, 12, 3);
  ctx.fillRect(cx + 8, cy + 6, 14, 4);
  ctx.fillRect(cx - 20, cy + 10, 8, 2);

  // Poisonous gas bubble
  const bPhase = (time * 1.8 + cx) % 3;
  if (bPhase < 2) {
    const bx = cx - 5;
    const by = cy - 2;
    const bRad = Math.floor(bPhase * 3) + 2;
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(bx, by, bRad, bRad);
    ctx.fillStyle = '#f3e8ff';
    ctx.fillRect(bx + 1, by + 1, 1, 1);
  }
  ctx.restore();
}

function drawDesertOasis(ctx, cx, cy, rx, ry, time) {
  ctx.save();
  // Sand shore rim
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - rx - 4, cy - ry - 4, (rx + 4) * 2, (ry + 4) * 2);
  // Lush green grass rim around oasis
  ctx.fillStyle = '#166534';
  ctx.fillRect(cx - rx - 2, cy - ry - 2, (rx + 2) * 2, (ry + 2) * 2);
  // Crystal turquoise water
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(cx - rx + 4, cy - ry + 4, (rx - 4) * 2, (ry - 4) * 2);
  // Sun glint
  const glint = (time * 1.5) % 2;
  if (glint < 1) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 6, cy - 4, 8, 2);
  }
  ctx.restore();
}

function drawLavaCaldera(ctx, cx, cy, rx, ry, time) {
  ctx.save();
  // Charred black crust rim
  ctx.fillStyle = '#0a0202';
  ctx.fillRect(cx - rx - 4, cy - ry - 4, (rx + 4) * 2, (ry + 4) * 2);
  // Dark crimson edge
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
  // Molten fiery core
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(cx - rx + 4, cy - ry + 4, (rx - 4) * 2, (ry - 4) * 2);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(cx - rx + 8, cy - ry + 8, (rx - 8) * 2, (ry - 8) * 2);
  // Searing yellow heart
  const pulse = Math.sin(time * 5 + cx) * 2;
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 10 + pulse, cy - 5, 20, 8);

  // Popping lava bubble
  const bub = (time * 2.2 + cx) % 2;
  if (bub < 1.2) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx + 6, cy - 8, 4, 3);
  }
  ctx.restore();
}

// ----------------------------------------------------------------------------
// 3. CHUNKY PIXEL COBBLESTONE PATH
// Renders authentic hand-laid pixel cobblestones along the winding road!
// ----------------------------------------------------------------------------
export function drawPixelPath(ctx, waypoints, pathWidth, pathColor, borderColor, mapId, time) {
  if (!waypoints || waypoints.length < 2) return;

  const w = pathWidth || 38;
  const id = mapId || 'valley';

  // Palette based on biome
  let curbDark = '#3d2614';
  let stoneBase = '#a38a67';
  let stoneLight = '#c9b18c';
  let stoneDark = '#786245';
  let mortarColor = '#2b1b0d';
  let mossColor = 'rgba(34, 197, 94, 0.4)';

  if (id === 'swamp') {
    // Weathered timber plank road
    curbDark = '#1f1a12';
    stoneBase = '#4d4233';
    stoneLight = '#6b5e4c';
    stoneDark = '#2d251a';
    mortarColor = '#14100b';
    mossColor = 'rgba(74, 222, 128, 0.35)';
  } else if (id === 'desert') {
    // Sun-baked sandstone pavers
    curbDark = '#5c2b09';
    stoneBase = '#b45309';
    stoneLight = '#d97706';
    stoneDark = '#78350f';
    mortarColor = '#451a03';
    mossColor = 'rgba(253, 224, 71, 0.25)';
  } else if (id === 'glacier') {
    // Frosted glacial ice bricks
    curbDark = '#075985';
    stoneBase = '#bae6fd';
    stoneLight = '#e0f2fe';
    stoneDark = '#0284c7';
    mortarColor = '#0369a1';
    mossColor = 'rgba(255, 255, 255, 0.6)';
  } else if (id === 'inferno') {
    // Basalt magma pavers
    curbDark = '#1a0404';
    stoneBase = '#450a0a';
    stoneLight = '#7f1d1d';
    stoneDark = '#240606';
    mortarColor = '#ea580c'; // glowing lava mortar!
    mossColor = 'rgba(249, 115, 22, 0.5)';
  }

  ctx.save();

  // PASS 1: Stepped Dark Underbed / Border
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.lineWidth = w + 8;
  ctx.strokeStyle = curbDark;
  ctx.beginPath();
  ctx.moveTo(waypoints[0].x, waypoints[0].y);
  for (let i = 1; i < waypoints.length; i++) {
    ctx.lineTo(waypoints[i].x, waypoints[i].y);
  }
  ctx.stroke();

  // PASS 2: Roadbed Base
  ctx.lineWidth = w;
  ctx.strokeStyle = stoneDark;
  ctx.beginPath();
  ctx.moveTo(waypoints[0].x, waypoints[0].y);
  for (let i = 1; i < waypoints.length; i++) {
    ctx.lineTo(waypoints[i].x, waypoints[i].y);
  }
  ctx.stroke();

  // PASS 3: Hand-Laid Pixel Cobblestones along each segment
  const stoneW = 14;
  const stoneH = 9;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const p1 = waypoints[i];
    const p2 = waypoints[i + 1];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 1) continue;

    const angle = Math.atan2(dy, dx);
    const steps = Math.floor(dist / 12);

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const midX = p1.x + dx * t;
      const midY = p1.y + dy * t;
      const normalX = -Math.sin(angle);
      const normalY = Math.cos(angle);

      // Draw 3 lanes of cobblestones across the road width
      const laneOffsets = [-w * 0.28, 0, w * 0.28];
      laneOffsets.forEach((laneOff, laneIdx) => {
        // Stagger every other stone
        const stagger = (s % 2 === 0) ? 0 : 5;
        const stoneX = Math.floor(midX + normalX * laneOff + Math.cos(angle) * stagger);
        const stoneY = Math.floor(midY + normalY * laneOff + Math.sin(angle) * stagger);

        ctx.save();
        ctx.translate(stoneX, stoneY);
        ctx.rotate(angle);

        // Cobblestone shadow / mortar
        ctx.fillStyle = mortarColor;
        ctx.fillRect(-stoneW / 2 - 1, -stoneH / 2 - 1, stoneW + 2, stoneH + 2);

        // Cobblestone main body
        ctx.fillStyle = (s + laneIdx) % 2 === 0 ? stoneBase : stoneDark;
        ctx.fillRect(-stoneW / 2, -stoneH / 2, stoneW, stoneH);

        // Highlight bevel (top & left edge)
        ctx.fillStyle = stoneLight;
        ctx.fillRect(-stoneW / 2, -stoneH / 2, stoneW, 2);
        ctx.fillRect(-stoneW / 2, -stoneH / 2, 2, stoneH);

        // Bottom shadow bevel
        ctx.fillStyle = curbDark;
        ctx.fillRect(-stoneW / 2, stoneH / 2 - 2, stoneW, 2);
        ctx.fillRect(stoneW / 2 - 2, -stoneH / 2, 2, stoneH);

        // Occasional moss or crack on stone
        if ((s + laneIdx) % 5 === 0) {
          ctx.fillStyle = mossColor;
          ctx.fillRect(-2, -1, 4, 3);
        }

        ctx.restore();
      });
    }

    // Wooden curbing stakes / stones along segment edges
    const stakeSteps = Math.floor(dist / 22);
    for (let ss = 0; ss < stakeSteps; ss++) {
      const st = ss / stakeSteps;
      const sx = p1.x + dx * st;
      const sy = p1.y + dy * st;
      const nx = -Math.sin(angle);
      const ny = Math.cos(angle);

      // Left & right edge posts
      [-w / 2 - 2, w / 2 + 2].forEach(side => {
        const px = Math.floor(sx + nx * side);
        const py = Math.floor(sy + ny * side);

        if (id === 'swamp') {
          // Wooden log post
          ctx.fillStyle = '#291b10';
          ctx.fillRect(px - 2, py - 3, 4, 6);
          ctx.fillStyle = '#6b4f2c';
          ctx.fillRect(px - 1, py - 2, 2, 4);
        } else if (id === 'inferno') {
          // Obsidian horn tooth
          ctx.fillStyle = '#0a0202';
          ctx.fillRect(px - 2, py - 3, 4, 6);
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(px - 1, py - 3, 2, 2);
        } else {
          // Rough stone marker
          ctx.fillStyle = '#475569';
          ctx.fillRect(px - 2, py - 2, 4, 4);
          ctx.fillStyle = '#94a3b8';
          ctx.fillRect(px - 1, py - 2, 2, 2);
        }
      });
    }
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 4. RETRO PIXEL VOID PORTAL (Spawn Gate)
// ----------------------------------------------------------------------------
export function drawPixelPortal(ctx, x, y, time, mapId) {
  ctx.save();
  ctx.translate(Math.floor(x), Math.floor(y));

  // A) Ground Corruption / Ritual Circle
  ctx.fillStyle = 'rgba(15, 6, 32, 0.7)';
  ctx.fillRect(-22, -8, 44, 16);
  ctx.fillRect(-16, -14, 32, 28);
  ctx.fillStyle = '#7e22ce';
  ctx.fillRect(-18, -2, 36, 4);
  ctx.fillRect(-2, -18, 4, 36);

  // B) Stepped Pixel Vortex Rings
  const spin = time * 3;
  const pulse = Math.sin(time * 5) * 2;

  // Ring 1: Deep shadow purple
  ctx.fillStyle = '#3b0764';
  ctx.fillRect(-18 - pulse, -22 - pulse, 36 + pulse * 2, 44 + pulse * 2);

  // Ring 2: Electric Violet / Magenta
  ctx.fillStyle = '#9333ea';
  ctx.fillRect(-14, -18, 28, 36);
  ctx.fillStyle = '#c084fc';
  // Rotating pixel notches
  for (let a = 0; a < 6; a++) {
    const ang = spin + (a * Math.PI) / 3;
    const px = Math.floor(Math.cos(ang) * 14);
    const py = Math.floor(Math.sin(ang) * 18);
    ctx.fillRect(px - 2, py - 2, 4, 4);
  }

  // Ring 3: Planar Rift Light (Cyan & White)
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-9, -12, 18, 24);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-5, -8, 10, 16);

  // Ring 4: Abyssal Black Singularity Core
  ctx.fillStyle = '#05020a';
  ctx.fillRect(-3, -6, 6, 12);
  // Demon eye slit in the rift
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(-1, -3, 2, 6);

  // C) Left Obsidian Spire Pillar
  drawPortalPillar(ctx, -24, -28, time);

  // D) Right Obsidian Spire Pillar
  drawPortalPillar(ctx, 18, -28, time + 1);

  // E) Archway Crossbeam with Skull / Horn
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(-22, -32, 44, 6);
  ctx.fillStyle = '#4338ca';
  ctx.fillRect(-20, -31, 40, 2);
  // Center gem
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(-3, -34, 6, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-1, -33, 2, 2);

  // F) Orbiting Magic Motes / Energy Sparks
  for (let i = 0; i < 6; i++) {
    const mAngle = -time * 4 + (i * Math.PI) / 3;
    const mx = Math.floor(Math.cos(mAngle) * (20 + (i % 3) * 3));
    const my = Math.floor(Math.sin(mAngle) * (14 + (i % 2) * 4));
    ctx.fillStyle = (i % 2 === 0) ? '#e879f9' : '#38bdf8';
    ctx.fillRect(mx - 1, my - 1, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mx, my, 1, 1);
  }

  ctx.restore();
}

function drawPortalPillar(ctx, px, py, time) {
  // Base pedestal
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py + 34, 10, 8);
  // Main spire shaft
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px, py + 4, 6, 32);
  // Bevel highlight
  ctx.fillStyle = '#4338ca';
  ctx.fillRect(px, py + 4, 2, 32);
  // Spire cap
  ctx.fillStyle = '#312e81';
  ctx.fillRect(px - 1, py, 8, 5);
  ctx.fillRect(px + 1, py - 4, 4, 4);

  // Carved glowing rune symbols on pillar
  const runePulse = Math.sin(time * 6) * 0.4 + 0.6;
  ctx.fillStyle = `rgba(192, 132, 252, ${runePulse})`;
  ctx.fillRect(px + 2, py + 10, 3, 2);
  ctx.fillRect(px + 2, py + 18, 3, 2);
  ctx.fillRect(px + 2, py + 26, 3, 2);
}

// ----------------------------------------------------------------------------
// 5. RETRO PIXEL FORTRESS CASTLE (Player Base)
// ----------------------------------------------------------------------------
export function drawPixelCastle(ctx, x, y, hp, maxHp, time) {
  ctx.save();
  ctx.translate(Math.floor(x - 28), Math.floor(y - 32));

  // A) Moat / Stone Foundation Base
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(2, 46, 52, 10);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 54, 56, 4);

  // B) Main Wall Masonry Body
  ctx.fillStyle = '#475569';
  ctx.fillRect(8, 16, 40, 32);

  // Individual Pixel Brick Detail & Shading
  ctx.fillStyle = '#64748b';
  ctx.fillRect(10, 18, 8, 3);
  ctx.fillRect(22, 18, 8, 3);
  ctx.fillRect(34, 18, 8, 3);
  ctx.fillRect(14, 24, 8, 3);
  ctx.fillRect(26, 24, 8, 3);
  ctx.fillRect(38, 24, 8, 3);
  ctx.fillRect(10, 30, 8, 3);
  ctx.fillRect(34, 30, 8, 3);

  // Brick Mortar Shadow Lines
  ctx.fillStyle = '#334155';
  ctx.fillRect(8, 22, 40, 1);
  ctx.fillRect(8, 28, 40, 1);
  ctx.fillRect(8, 34, 40, 1);

  // C) Left Watchtower
  ctx.fillStyle = '#334155';
  ctx.fillRect(2, 8, 12, 40);
  ctx.fillStyle = '#475569';
  ctx.fillRect(4, 10, 8, 36);
  // Left Crenellations
  ctx.fillStyle = '#64748b';
  ctx.fillRect(2, 2, 4, 6);
  ctx.fillRect(10, 2, 4, 6);
  // Left Arrow Slit
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(7, 20, 2, 6);

  // D) Right Watchtower
  ctx.fillStyle = '#334155';
  ctx.fillRect(42, 8, 12, 40);
  ctx.fillStyle = '#475569';
  ctx.fillRect(44, 10, 8, 36);
  // Right Crenellations
  ctx.fillStyle = '#64748b';
  ctx.fillRect(42, 2, 4, 6);
  ctx.fillRect(50, 2, 4, 6);
  // Right Arrow Slit
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(47, 20, 2, 6);

  // E) Central High Keep & Roof
  ctx.fillStyle = '#334155';
  ctx.fillRect(18, 2, 20, 16);
  // High Battlements
  ctx.fillStyle = '#64748b';
  ctx.fillRect(18, -2, 4, 5);
  ctx.fillRect(26, -2, 4, 5);
  ctx.fillRect(34, -2, 4, 5);

  // Pitched Royal Slate Roof Shingles
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(20, -10, 16, 8);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(22, -14, 12, 5);
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(24, -18, 8, 5);
  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(26, -20, 4, 3);

  // F) Reinforced Oak Portcullis Gate
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(20, 32, 16, 18);
  // Stone Gate Archway
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(19, 31, 18, 2);
  ctx.fillRect(18, 33, 2, 17);
  ctx.fillRect(36, 33, 2, 17);
  // Oak Door Planks
  ctx.fillStyle = '#78350f';
  ctx.fillRect(21, 34, 14, 16);
  // Iron Straps & Studs
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(21, 38, 14, 2);
  ctx.fillRect(21, 45, 14, 2);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(23, 38, 1, 1);
  ctx.fillRect(31, 38, 1, 1);
  // Portcullis iron teeth
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(23, 32, 1, 4);
  ctx.fillRect(27, 32, 1, 4);
  ctx.fillRect(31, 32, 1, 4);

  // G) Wall Sconce Torches with Animated Pixel Flame
  [-1, 1].forEach(side => {
    const tx = 28 + side * 14;
    const ty = 36;
    // Sconce bracket
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(tx - 1, ty, 3, 5);
    // Flickering Flame
    const flameH = (Math.sin(time * 12 + side) * 2 + 4) | 0;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(tx - 1, ty - flameH, 3, flameH);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(tx, ty - flameH + 1, 2, flameH - 1);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(tx, ty - 2, 1, 2);
  });

  // H) Animated Royal Banner waving in wind
  const wave = Math.sin(time * 6) * 3;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(27, -28, 2, 9); // Flagpole
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(29, -28);
  ctx.lineTo(43 + wave, -24 + wave * 0.5);
  ctx.lineTo(41 + wave, -18);
  ctx.lineTo(29, -20);
  ctx.closePath();
  ctx.fill();
  // Gold emblem cross on banner
  ctx.fillStyle = '#facc15';
  ctx.fillRect(32, -25, 4, 2);
  ctx.fillRect(33, -27, 2, 6);

  // I) Retro Pixel Health Bar & Shield Crest
  const hpRatio = Math.max(0, hp / maxHp);
  const barW = 50;
  const barH = 7;
  const bx = 3;
  const by = -36;

  // Dark border frame
  ctx.fillStyle = '#090d16';
  ctx.fillRect(bx - 1, by - 1, barW + 2, barH + 2);
  // Empty bar background
  ctx.fillStyle = '#3f1111';
  ctx.fillRect(bx, by, barW, barH);
  // Filled HP color
  const hpColor = hpRatio > 0.5 ? '#22c55e' : (hpRatio > 0.25 ? '#eab308' : '#ef4444');
  ctx.fillStyle = hpColor;
  ctx.fillRect(bx, by, Math.floor(barW * hpRatio), barH);
  // Top specular highlight line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fillRect(bx, by, Math.floor(barW * hpRatio), 2);

  // Segment pips on HP bar
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  for (let p = 1; p < 5; p++) {
    ctx.fillRect(bx + (barW / 5) * p, by, 1, barH);
  }

  // Heart Crest icon
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(bx - 8, by - 1, 7, 7);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bx - 6, by, 2, 2);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 6. SCENERY PROPS (100% Genuine Handcrafted Pixel Sprites)
// ----------------------------------------------------------------------------
export function drawPixelSceneryItem(ctx, item, time, mapId) {
  const { type, x, y, scale = 1, color = '#22c55e' } = item;
  ctx.save();
  ctx.translate(Math.floor(x), Math.floor(y));
  ctx.scale(scale, scale);

  switch (type) {
    case 'tree':
      drawPixelTree(ctx, item, time);
      break;
    case 'rock':
      drawPixelRock(ctx, item);
      break;
    case 'cactus':
      drawPixelCactus(ctx, item);
      break;
    case 'lantern':
      drawPixelLantern(ctx, item, time);
      break;
    case 'flower':
      drawPixelFlower(ctx, item, color);
      break;
    case 'crystal':
      drawPixelCrystal(ctx, item, time, color);
      break;
    case 'mushroom':
      drawPixelMushroom(ctx, item, time);
      break;
    case 'obelisk':
      drawPixelObelisk(ctx, item, time);
      break;
    case 'bones':
      drawPixelBones(ctx, item);
      break;
    case 'demon_torch':
      drawPixelDemonTorch(ctx, item, time);
      break;
    case 'lava_pool':
      drawPixelLavaPool(ctx, item, time);
      break;
    case 'signpost':
      drawPixelSignpost(ctx, item);
      break;
    case 'crate':
      drawPixelCrate(ctx, item);
      break;
    case 'campfire':
      drawPixelCampfire(ctx, item, time);
      break;
    default:
      drawPixelRock(ctx, item);
  }

  ctx.restore();
}

// LUSH OAK / DEAD WILLOW / FROST PINE
function drawPixelTree(ctx, item, time) {
  const sway = Math.sin(time * 2 + (item.x || 0)) * 1.5;

  if (item.dead) {
    // Gnarled Swamp Willow / Burnt Spire
    ctx.fillStyle = '#1c150c';
    ctx.fillRect(-3, 0, 7, 18);
    ctx.fillRect(-5, 14, 11, 4); // Root base
    ctx.fillStyle = '#3a2e1d';
    ctx.fillRect(-2, -8, 5, 20);
    // Hollow knot
    ctx.fillStyle = '#0a0805';
    ctx.fillRect(-1, 4, 3, 4);
    // Twisted branches
    ctx.fillStyle = '#2b2113';
    ctx.fillRect(-12, -4, 11, 3);
    ctx.fillRect(-14, -10, 4, 8);
    ctx.fillRect(3, -6, 12, 3);
    ctx.fillRect(12, -12, 3, 8);
    // Hanging swamp moss strands
    ctx.fillStyle = '#14532d';
    ctx.fillRect(-10, 0, 2, 9);
    ctx.fillRect(-8, 2, 2, 12);
    ctx.fillRect(8, -2, 2, 10);
    ctx.fillRect(11, 0, 2, 14);
  } else if (item.snow) {
    // Frostfang Pine with Chunky Snow Blankets
    // Pine trunk
    ctx.fillStyle = '#334155';
    ctx.fillRect(-3, 6, 6, 14);

    // Pine needle tiers (dark blue-green)
    const tiers = [
      { y: 6, w: 26, h: 8 },
      { y: -2, w: 20, h: 8 },
      { y: -10, w: 14, h: 8 },
      { y: -18, w: 8, h: 8 }
    ];
    tiers.forEach(t => {
      ctx.fillStyle = '#0f3a28';
      ctx.fillRect(-t.w / 2, t.y, t.w, t.h);
      ctx.fillStyle = '#165e3f';
      ctx.fillRect(-t.w / 2 + 2, t.y + 1, t.w - 4, t.h - 2);

      // Fluffy Snow Blanket on each tier
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(-t.w / 2, t.y, t.w, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-t.w / 2 + 2, t.y, t.w - 4, 3);
      // Hanging icicles
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(-t.w / 4, t.y + 4, 2, 4);
      ctx.fillRect(t.w / 4 - 2, t.y + 4, 2, 3);
    });
  } else {
    // Verdant Lush Oak Tree (Multi-tier volumetric pixel canopy)
    // Sturdy Oak Trunk
    ctx.fillStyle = '#451a03';
    ctx.fillRect(-4, 4, 8, 16);
    ctx.fillRect(-7, 16, 14, 4); // Root flares
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-2, 4, 4, 14);

    // Tree Foliage with Sway
    ctx.save();
    ctx.translate(sway, 0);

    // Deep shadow canopy
    ctx.fillStyle = '#052e16';
    ctx.fillRect(-18, -18, 36, 26);
    ctx.fillRect(-14, -24, 28, 36);

    // Midtone green foliage
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-16, -16, 32, 22);
    ctx.fillRect(-12, -22, 24, 32);

    // Bright sunlit foliage clusters (Top-left lighting)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(-14, -20, 16, 12);
    ctx.fillRect(-6, -24, 14, 8);
    ctx.fillRect(4, -16, 10, 8);

    // High specular leaf highlights
    ctx.fillStyle = '#86efac';
    ctx.fillRect(-12, -18, 8, 4);
    ctx.fillRect(-4, -22, 6, 3);

    // Little red apple / berry pixels
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-8, -10, 3, 3);
    ctx.fillRect(8, -8, 3, 3);
    ctx.fillRect(0, -14, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-8, -10, 1, 1);
    ctx.fillRect(8, -8, 1, 1);

    ctx.restore();
  }
}

// CHISELED FACETED PIXEL BOULDER
function drawPixelRock(ctx, item) {
  // Shadow facet
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-10, -4, 20, 12);
  ctx.fillRect(-8, -8, 16, 16);

  // Midtone slate facet
  ctx.fillStyle = '#475569';
  ctx.fillRect(-9, -6, 16, 11);

  // Lit facet (top-left)
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(-8, -7, 10, 6);

  // High edge gleam
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(-7, -7, 5, 2);

  // Moss patch on rock
  ctx.fillStyle = '#15803d';
  ctx.fillRect(-4, -2, 5, 3);
}

// DESERT SAGUARO CACTUS
function drawPixelCactus(ctx, item) {
  // Main stem
  ctx.fillStyle = '#14532d';
  ctx.fillRect(-4, -20, 8, 26);
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(-3, -19, 6, 24);
  // Vertical ridge highlights
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(-2, -18, 2, 22);

  // Left arm
  ctx.fillStyle = '#14532d';
  ctx.fillRect(-12, -10, 8, 5);
  ctx.fillRect(-12, -18, 5, 9);
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(-11, -9, 7, 3);
  ctx.fillRect(-11, -17, 3, 8);

  // Right arm
  ctx.fillStyle = '#14532d';
  ctx.fillRect(4, -6, 8, 5);
  ctx.fillRect(7, -14, 5, 9);
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(4, -5, 7, 3);
  ctx.fillRect(8, -13, 3, 8);

  // Vibrant Pink Blossom on top
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(-3, -24, 6, 4);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-1, -23, 2, 2);
}

// STREET LANTERN / TORCH POST
function drawPixelLantern(ctx, item, time) {
  // Ground light halo
  const flicker = Math.sin(time * 8 + (item.x || 0)) * 0.15;
  ctx.fillStyle = `rgba(250, 204, 21, ${0.18 + flicker})`;
  ctx.fillRect(-16, -6, 32, 16);

  // Stone base pedestal
  ctx.fillStyle = '#334155';
  ctx.fillRect(-4, 6, 8, 4);

  // Wrought iron lamp post
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-2, -12, 4, 18);
  ctx.fillStyle = '#475569';
  ctx.fillRect(-1, -12, 2, 18);

  // Lantern cage
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-5, -20, 10, 9);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-4, -22, 8, 2); // Cap

  // Glowing lantern glass
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-3, -18, 6, 6);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(-1, -16, 2, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, -17, 1, 2);
}

// FLOWER TUFT
function drawPixelFlower(ctx, item, color) {
  // Green stem & leaves
  ctx.fillStyle = '#15803d';
  ctx.fillRect(-1, 0, 2, 6);
  ctx.fillRect(-3, 2, 2, 2);
  ctx.fillRect(1, 2, 2, 2);

  // Flower petals
  ctx.fillStyle = color;
  ctx.fillRect(-3, -4, 6, 4);
  ctx.fillRect(-2, -5, 4, 6);

  // Center pistil
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-1, -3, 2, 2);
}

// FACETED ELEMENTAL CRYSTAL
function drawPixelCrystal(ctx, item, time, color) {
  const c = color || '#38bdf8';
  // Central Crystal spire
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(-4, -14, 8, 20);
  ctx.fillStyle = c;
  ctx.fillRect(-3, -12, 6, 16);
  // Specular facet
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(-3, -12, 2, 16);

  // Left smaller crystal
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(-8, -6, 4, 12);
  ctx.fillStyle = c;
  ctx.fillRect(-7, -5, 3, 10);

  // Right crystal
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(4, -8, 4, 14);
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(5, -7, 2, 12);

  // Animated sparkle ping
  const sparkle = (time * 3 + (item.x || 0)) % 3;
  if (sparkle < 0.6) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -16, 3, 3);
    ctx.fillRect(-3, -15, 7, 1);
    ctx.fillRect(0, -18, 1, 7);
  }
}

// SPOTTED TOADSTOOL / MUSHROOM CLUSTER
function drawPixelMushroom(ctx, item, time) {
  // Big Mushroom
  // Stem
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(-3, 0, 6, 8);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(-3, 0, 2, 8);

  // Red cap
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(-8, -6, 16, 7);
  ctx.fillRect(-6, -9, 12, 4);

  // White polka dots
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-5, -6, 2, 2);
  ctx.fillRect(3, -6, 2, 2);
  ctx.fillRect(-1, -8, 2, 2);

  // Little baby mushroom
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(5, 2, 3, 5);
  ctx.fillStyle = '#9333ea';
  ctx.fillRect(4, -1, 6, 4);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(6, 0, 1, 1);
}

// SANDSTONE OBELISK
function drawPixelObelisk(ctx, item, time) {
  // Base
  ctx.fillStyle = '#78350f';
  ctx.fillRect(-8, 8, 16, 6);
  // Column
  ctx.fillStyle = '#92400e';
  ctx.fillRect(-6, -20, 12, 28);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(-5, -19, 6, 26);
  // Pyramidion cap
  ctx.fillStyle = '#d97706';
  ctx.fillRect(-4, -24, 8, 4);
  ctx.fillRect(-2, -28, 4, 4);
  ctx.fillRect(-1, -30, 2, 2);

  // Glowing carved hieroglyphs
  const pulse = Math.sin(time * 4) * 0.3 + 0.7;
  ctx.fillStyle = `rgba(253, 224, 71, ${pulse})`;
  ctx.fillRect(-2, -14, 4, 2);
  ctx.fillRect(-2, -8, 4, 2);
  ctx.fillRect(-2, -2, 4, 2);
  ctx.fillRect(-1, 4, 2, 2);
}

// PREHISTORIC SKELETON BONES
function drawPixelBones(ctx, item) {
  // Beast Skull
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-8, -4, 12, 8);
  ctx.fillRect(-10, -2, 4, 4);
  // Eye sockets
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-6, -2, 3, 3);
  ctx.fillRect(-1, -2, 3, 3);
  // Horn
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(2, -8, 3, 5);
  ctx.fillRect(4, -11, 2, 4);

  // Rib cage arches
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(6, 0, 2, 6);
  ctx.fillRect(10, -1, 2, 7);
  ctx.fillRect(14, 0, 2, 6);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(6, 6, 10, 2); // Embedded in dirt
}

// DEMON HORN BRAZIER TORCH
function drawPixelDemonTorch(ctx, item, time) {
  // Obsidian Horn Pedestal
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-5, 6, 10, 8);
  ctx.fillRect(-3, -2, 6, 8);
  // Horn Prongs
  ctx.fillRect(-7, -6, 3, 6);
  ctx.fillRect(4, -6, 3, 6);

  // Flickering Demon Fire
  const fHeight = (Math.sin(time * 14 + (item.x || 0)) * 3 + 8) | 0;
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(-4, -6 - fHeight, 8, fHeight);
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(-3, -4 - fHeight, 6, fHeight - 2);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-1, -4 - fHeight, 2, fHeight - 4);
}

// BUBBLING LAVA POOL
function drawPixelLavaPool(ctx, item, time) {
  const r = item.radius || 18;
  // Basalt rim
  ctx.fillStyle = '#0a0202';
  ctx.fillRect(-r - 3, -r - 3, (r + 3) * 2, (r + 3) * 2);
  // Red edge
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(-r, -r, r * 2, r * 2);
  // Molten core
  ctx.fillStyle = '#f97316';
  ctx.fillRect(-r + 3, -r + 3, (r - 3) * 2, (r - 3) * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-r + 7, -r + 7, (r - 7) * 2, (r - 7) * 2);

  // Popping bubble
  const bub = (time * 3 + (item.x || 0)) % 2;
  if (bub < 1) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, -3, 4, 3);
  }
}

// DIRECTIONAL WOODEN SIGNPOST
function drawPixelSignpost(ctx, item) {
  // Post
  ctx.fillStyle = '#451a03';
  ctx.fillRect(-2, -6, 4, 16);
  // Arrow Plank
  ctx.fillStyle = '#78350f';
  ctx.fillRect(-10, -12, 18, 7);
  ctx.fillRect(8, -11, 4, 5); // Arrow tip
  ctx.fillStyle = '#b45309';
  ctx.fillRect(-9, -11, 16, 5);
}

// WOODEN CRATE / BARREL
function drawPixelCrate(ctx, item) {
  ctx.fillStyle = '#451a03';
  ctx.fillRect(-7, -7, 14, 14);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(-6, -6, 12, 12);
  // X-brace
  ctx.fillStyle = '#78350f';
  ctx.fillRect(-6, -6, 2, 12);
  ctx.fillRect(4, -6, 2, 12);
  ctx.fillRect(-6, -6, 12, 2);
  ctx.fillRect(-6, 4, 12, 2);
}

// CAMPFIRE WITH WOOD & EMBERS
function drawPixelCampfire(ctx, item, time) {
  // Stone circle
  ctx.fillStyle = '#475569';
  ctx.fillRect(-9, -3, 18, 8);
  ctx.fillRect(-6, -6, 12, 14);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-5, -2, 10, 6);

  // Firewood logs
  ctx.fillStyle = '#78350f';
  ctx.fillRect(-6, 0, 12, 3);

  // Crackling Flame
  const fHeight = (Math.sin(time * 15) * 3 + 7) | 0;
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(-4, -fHeight, 8, fHeight);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(-3, -fHeight + 2, 6, fHeight - 2);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-1, -fHeight + 4, 2, 3);
}

// ----------------------------------------------------------------------------
// 7. RETRO ARCADE BEZEL & BORDER FRAME
// ----------------------------------------------------------------------------
export function drawRetroMapFrame(ctx, width, height, map) {
  ctx.save();
  const borderThick = 4;

  // Dark metallic bezel
  ctx.strokeStyle = '#090d16';
  ctx.lineWidth = borderThick;
  ctx.strokeRect(borderThick / 2, borderThick / 2, width - borderThick, height - borderThick);

  // Inner 1px gold/cyan highlight frame
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(borderThick, borderThick, width - borderThick * 2, height - borderThick * 2);

  // Corner brass rivets
  const rivetColor = '#ca8a04';
  const rivetOffset = 7;
  const corners = [
    [rivetOffset, rivetOffset],
    [width - rivetOffset, rivetOffset],
    [rivetOffset, height - rivetOffset],
    [width - rivetOffset, height - rivetOffset]
  ];
  ctx.fillStyle = rivetColor;
  corners.forEach(([cx, cy]) => {
    ctx.fillRect(cx - 2, cy - 2, 4, 4);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(cx - 1, cy - 1, 2, 2);
    ctx.fillStyle = rivetColor;
  });

  ctx.restore();
}
