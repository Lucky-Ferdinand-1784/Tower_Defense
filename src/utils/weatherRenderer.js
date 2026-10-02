// Weather Particle and Ambient Effects Renderer

export class WeatherSystem {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.lightningTimer = 0;
    this.isFlashing = false;
    this.initParticles('sunny');
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
  }

  initParticles(weatherId) {
    this.particles = [];
    const count = weatherId === 'rain' ? 120 : (weatherId === 'snow' ? 90 : (weatherId === 'heatwave' ? 45 : 30));

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: weatherId === 'rain' ? 3 + Math.random() * 2 : (Math.random() - 0.5) * 1.5,
        vy: weatherId === 'rain' ? 14 + Math.random() * 6 : (weatherId === 'snow' ? 1.5 + Math.random() * 2 : (weatherId === 'heatwave' ? -1 - Math.random() * 2 : (Math.random() - 0.5) * 0.8)),
        size: weatherId === 'snow' ? 2 + Math.random() * 3 : (weatherId === 'fog' ? 30 + Math.random() * 40 : 2 + Math.random() * 3),
        alpha: 0.3 + Math.random() * 0.6,
        life: Math.random() * 100
      });
    }
  }

  update(weatherId, dt) {
    // Random lightning flash in rain
    if (weatherId === 'rain') {
      this.lightningTimer -= dt;
      if (this.lightningTimer <= 0) {
        if (Math.random() < 0.25) {
          this.isFlashing = true;
          setTimeout(() => { this.isFlashing = false; }, 80);
        }
        this.lightningTimer = 6 + Math.random() * 8; // Every 6-14 seconds
      }
    }

    // Update particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (weatherId === 'snow') {
        p.x += Math.sin(p.y * 0.05) * 0.8;
      }

      // Wrap around
      if (p.y > this.height + 20) {
        p.y = -10;
        p.x = Math.random() * this.width;
      } else if (p.y < -20) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      if (p.x > this.width + 20) {
        p.x = -10;
      } else if (p.x < -20) {
        p.x = this.width + 10;
      }
    }
  }

  draw(ctx, weatherConfig) {
    const { id } = weatherConfig;

    ctx.save();

    // 1. Ambient lighting / Vignette
    if (id === 'rain') {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, this.width, this.height);
    } else if (id === 'snow') {
      ctx.fillStyle = 'rgba(224, 242, 254, 0.12)';
      ctx.fillRect(0, 0, this.width, this.height);
    } else if (id === 'fog') {
      ctx.fillStyle = 'rgba(58, 20, 90, 0.22)';
      ctx.fillRect(0, 0, this.width, this.height);
    } else if (id === 'heatwave') {
      ctx.fillStyle = 'rgba(234, 88, 12, 0.15)';
      ctx.fillRect(0, 0, this.width, this.height);
    } else if (id === 'sunny') {
      // Golden sunbeam overlay
      const grad = ctx.createLinearGradient(0, 0, this.width, this.height);
      grad.addColorStop(0, 'rgba(254, 240, 138, 0.08)');
      grad.addColorStop(1, 'rgba(254, 240, 138, 0.01)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    // 2. Lightning flash
    if (this.isFlashing) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.fillRect(0, 0, this.width, this.height);
    }

    // 3. Particles
    if (id === 'rain') {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      for (const p of this.particles) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.vx * 1.5, p.y + p.vy * 1.5);
        ctx.stroke();
      }
    } else if (id === 'snow') {
      ctx.fillStyle = '#ffffff';
      for (const p of this.particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    } else if (id === 'fog') {
      for (const p of this.particles) {
        const grad = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, p.size);
        grad.addColorStop(0, 'rgba(192, 132, 252, 0.18)');
        grad.addColorStop(1, 'rgba(147, 51, 234, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (id === 'heatwave') {
      for (const p of this.particles) {
        ctx.fillStyle = p.vy < -1.8 ? '#f97316' : '#facc15';
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    }

    ctx.restore();
  }
}
