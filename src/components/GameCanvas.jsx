import React, { useRef, useEffect } from 'react';
import {
  drawPixelMapTerrain,
  drawPixelPath,
  drawPixelPortal,
  drawPixelCastle,
  drawPixelSceneryItem,
  drawRetroMapFrame,
  drawTower,
  drawEnemy,
  drawProjectile,
  drawFloatingText
} from '../utils/pixelRenderer';
import { WeatherSystem } from '../utils/weatherRenderer';
import { sound } from '../utils/soundEngine';

export default function GameCanvas({
  gameState,
  activeMap,
  weather,
  selectedTowerType,
  selectedPlacedTower,
  onSelectPlacedTower,
  onPlaceTower,
  activeSpell,
  onCastSpellAt,
  gameSpeed,
  isPaused
}) {
  const canvasRef = useRef(null);
  const weatherSystemRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, isHovering: false });
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  // Fixed internal virtual resolution for pixel-perfect retro aesthetics
  const VIRTUAL_WIDTH = 960;
  const VIRTUAL_HEIGHT = 600;

  // Initialize weather system
  useEffect(() => {
    weatherSystemRef.current = new WeatherSystem(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
  }, []);

  // Update weather particles on weather change
  useEffect(() => {
    if (weatherSystemRef.current && weather) {
      weatherSystemRef.current.initParticles(weather.id);
    }
  }, [weather?.id]);

  // Convert client mouse coordinates to canvas virtual coordinates
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = VIRTUAL_WIDTH / rect.width;
    const scaleY = VIRTUAL_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseMove = (e) => {
    const coords = getCanvasCoords(e);
    mousePosRef.current = { ...coords, isHovering: true };
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isHovering = false;
  };

  const handleClick = (e) => {
    const coords = getCanvasCoords(e);

    // 1. If casting a targeted spell (e.g. Meteor)
    if (activeSpell && activeSpell.needsTarget) {
      onCastSpellAt(coords.x, coords.y);
      return;
    }

    // 2. Check if clicked an existing placed tower
    const clickedTower = gameState.towers.find(t => {
      const dist = Math.hypot(t.x - coords.x, t.y - coords.y);
      return dist <= 22;
    });

    if (clickedTower) {
      onSelectPlacedTower(clickedTower);
      return;
    }

    // 3. If placing a new tower from shop
    if (selectedTowerType) {
      onPlaceTower(coords.x, coords.y);
    } else {
      // Deselect placed tower if clicked empty ground
      onSelectPlacedTower(null);
    }
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Keep pixel art crisp and disable bilinear blurring
      ctx.imageSmoothingEnabled = false;

      // 1. Procedural 16-Bit Biome Terrain & Natural Water/Lava Bodies
      drawPixelMapTerrain(ctx, activeMap, VIRTUAL_WIDTH, VIRTUAL_HEIGHT, now * 0.001);

      // 2. Chunky Pixel Cobblestone Road
      const scaledWaypoints = activeMap.waypoints.map(wp => ({
        x: wp.x * VIRTUAL_WIDTH,
        y: wp.y * VIRTUAL_HEIGHT
      }));
      drawPixelPath(
        ctx,
        scaledWaypoints,
        activeMap.pathWidth || 38,
        activeMap.pathColor,
        activeMap.pathBorder,
        activeMap.id,
        now * 0.001
      );

      // 3. Void Spawner Portal & Grand Fortress Castle
      const startWp = scaledWaypoints[0];
      const endWp = scaledWaypoints[scaledWaypoints.length - 1];
      drawPixelPortal(ctx, startWp.x, startWp.y, now * 0.001, activeMap.id);
      drawPixelCastle(ctx, endWp.x, endWp.y, gameState.baseHp, gameState.maxBaseHp, now * 0.001, activeMap.id);

      // 4. Handcrafted Thematic Pixel Scenery Props
      if (activeMap.scenery) {
        activeMap.scenery.forEach(item => {
          drawPixelSceneryItem(
            ctx,
            {
              ...item,
              x: item.x * VIRTUAL_WIDTH,
              y: item.y * VIRTUAL_HEIGHT
            },
            now * 0.001,
            activeMap.id
          );
        });
      }


      // 5. Active Lava / Trap Hazards on Ground
      if (gameState.hazards) {
        gameState.hazards.forEach(h => {
          ctx.save();
          ctx.translate(h.x, h.y);
          if (h.type === 'lava') {
            const glow = Math.sin(now * 0.01 + h.x) * 2;
            const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, h.radius + glow);
            grad.addColorStop(0, '#f97316');
            grad.addColorStop(0.7, '#dc2626');
            grad.addColorStop(1, 'rgba(220, 38, 38, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, h.radius + glow, 0, Math.PI * 2);
            ctx.fill();
          } else if (h.type === 'toxic_mist') {
            const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, h.radius);
            grad.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
            grad.addColorStop(1, 'rgba(88, 28, 135, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });
      }

      // 6. Placed Towers
      gameState.towers.forEach(t => {
        const isSelected = selectedPlacedTower && selectedPlacedTower.id === t.id;
        drawTower(ctx, t, now * 0.001, isSelected);

        // Draw Holy Paladin Aura indicator if active
        if (t.type === 'holy_paladin') {
          const auraRadius = t.currentRankConfig.auraRange || 130;
          ctx.save();
          ctx.strokeStyle = 'rgba(250, 204, 21, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(t.x, t.y, auraRadius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      });

      // 7. Selected Tower Range Circle & Stats Overlay
      if (selectedPlacedTower) {
        const range = selectedPlacedTower.currentRange || 140;
        ctx.save();
        ctx.strokeStyle = selectedPlacedTower.currentRankConfig.color || '#38bdf8';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.06)';
        ctx.beginPath();
        ctx.arc(selectedPlacedTower.x, selectedPlacedTower.y, range, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Line to target if locking on an enemy
        if (selectedPlacedTower.currentTarget) {
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(selectedPlacedTower.x, selectedPlacedTower.y);
          ctx.lineTo(selectedPlacedTower.currentTarget.x, selectedPlacedTower.currentTarget.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 8. Enemies
      gameState.enemies.forEach(e => {
        drawEnemy(ctx, e, now * 0.001);
      });

      // 9. Projectiles
      gameState.projectiles.forEach(p => {
        drawProjectile(ctx, p);
      });

      // 10. Floating Damage Numbers & Combat Text
      if (gameState.floatingTexts) {
        gameState.floatingTexts.forEach(ft => {
          drawFloatingText(ctx, ft);
        });
      }

      // 11. Weather Particles & Screen Ambient Lighting
      if (weatherSystemRef.current && weather) {
        if (!isPaused) {
          weatherSystemRef.current.update(weather.id, dt * gameSpeed);
        }
        weatherSystemRef.current.draw(ctx, weather);
      }

      // 12. Mouse Hover & Placement Preview
      const mouse = mousePosRef.current;
      if (mouse.isHovering) {
        // A) If placing a tower
        if (selectedTowerType) {
          // Check placement validity
          const isValid = gameState.isValidPlacement(mouse.x, mouse.y, scaledWaypoints, activeMap.pathWidth || 38);
          const range = selectedTowerType.ranks[0].range;

          ctx.save();
          // Range Circle
          ctx.strokeStyle = isValid ? '#22c55e' : '#ef4444';
          ctx.fillStyle = isValid ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.15)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, range, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Silhouette / Placement footprint (crisp retro pixel pad)
          ctx.fillStyle = isValid ? 'rgba(34, 197, 94, 0.75)' : 'rgba(239, 68, 68, 0.75)';
          ctx.fillRect(Math.floor(mouse.x - 14), Math.floor(mouse.y - 14), 28, 28);
          ctx.strokeStyle = isValid ? '#4ade80' : '#f87171';
          ctx.lineWidth = 2;
          ctx.strokeRect(Math.floor(mouse.x - 14), Math.floor(mouse.y - 14), 28, 28);
          // Center pixel crosshair
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(Math.floor(mouse.x - 1), Math.floor(mouse.y - 4), 2, 8);
          ctx.fillRect(Math.floor(mouse.x - 4), Math.floor(mouse.y - 1), 8, 2);
          ctx.restore();
        }

        // B) If casting targetable spell (Meteor)
        if (activeSpell && activeSpell.needsTarget) {
          ctx.save();
          ctx.strokeStyle = '#f97316';
          ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, activeSpell.radius || 75, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Reticle
          ctx.beginPath();
          ctx.moveTo(mouse.x - 15, mouse.y);
          ctx.lineTo(mouse.x + 15, mouse.y);
          ctx.moveTo(mouse.x, mouse.y - 15);
          ctx.lineTo(mouse.x + 15, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 13. Retro Arcade Frame / Bezel
      drawRetroMapFrame(ctx, VIRTUAL_WIDTH, VIRTUAL_HEIGHT, activeMap);

      animFrameRef.current = requestAnimationFrame(render);
    };


    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [gameState, activeMap, weather, selectedTowerType, selectedPlacedTower, activeSpell, gameSpeed, isPaused]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950 p-2 overflow-hidden select-none">
      <div className="relative rounded-lg overflow-hidden border-4 border-slate-700 shadow-2xl bg-black">
        <canvas
          ref={canvasRef}
          width={VIRTUAL_WIDTH}
          height={VIRTUAL_HEIGHT}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="cursor-crosshair block"
          style={{
            width: '100%',
            maxWidth: '960px',
            aspectRatio: '960 / 600',
            imageRendering: 'pixelated'
          }}
        />
      </div>
    </div>
  );
}
