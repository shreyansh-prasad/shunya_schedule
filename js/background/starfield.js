/**
 * Starfield Background Module — Minimal, Aesthetic & Multi-Depth Parallax
 * Renders a refined, luxury-grade cosmic starlight field across 3 depth tiers with
 * smooth scroll parallax and interactive mouse perspective inertia.
 */

import { parallaxState, initParallax, updateParallax } from './parallax.js';

let canvas, ctx;
let width, height;
let particles = { far: [], mid: [], near: [] };
let colors = {};
let lastTime = 0;

// Dual atmospheric nebula accent colors
let targetLeftAccent = '#FF1E4B';
let targetRightAccent = '#00F0FF';
let leftRGB = { r: 255, g: 30, b: 75 };
let rightRGB = { r: 0, g: 240, b: 255 };

function hexToRgb(hex) {
  if (!hex) return { r: 100, g: 150, b: 255 };
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function initColors() {
  const style = getComputedStyle(document.documentElement);
  colors.dim = style.getPropertyValue('--star-dim').trim() || '#8E95B8';
  colors.navy = style.getPropertyValue('--void-navy').trim() || '#070914';
  colors.white = style.getPropertyValue('--star-white').trim() || '#F5F7FF';
  colors.voidBlack = style.getPropertyValue('--void-black').trim() || '#030407';
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

function generateParticles() {
  particles = { far: [], mid: [], near: [] };

  const starTints = [
    '#FFFFFF', // Diamond White
    '#EBF2FF', // Soft Celestial Ice
    '#FFF8EE', // Warm Starlight
    '#E2E8F8', // Subtle Periwinkle
    '#F2F4FF'  // Pure Luminous Starlight
  ];

  // 1. Far Layer: 220 minimal, crisp stardust micro-points (Deep Space Depth)
  for (let i = 0; i < 220; i++) {
    particles.far.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 0.45 + 0.5, // 0.5px - 0.95px
      baseOpacity: Math.random() * 0.4 + 0.35,
      twinkleSpeed: Math.random() * 1.8 + 0.6,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.005,
      driftY: (Math.random() - 0.5) * 0.005,
      color: starTints[Math.floor(Math.random() * starTints.length)]
    });
  }

  // 2. Mid Layer: 70 luminous specular stars (Medium Parallax Depth)
  for (let i = 0; i < 70; i++) {
    particles.mid.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 0.6 + 1.0, // 1.0px - 1.6px
      baseOpacity: Math.random() * 0.3 + 0.6,
      twinkleSpeed: Math.random() * 2.2 + 0.8,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.008,
      driftY: (Math.random() - 0.5) * 0.008,
      color: starTints[Math.floor(Math.random() * starTints.length)],
      hasHalo: Math.random() > 0.65
    });
  }

  // 3. Near Layer: 24 prominent foreground stars (Highest Parallax Depth & Subtle Needle Glint)
  for (let i = 0; i < 24; i++) {
    const isHeroSparkle = i < 8; // Only 8 stars have a subtle, elegant micro-glint
    particles.near.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 0.5 + 1.6, // 1.6px - 2.1px
      baseOpacity: Math.random() * 0.2 + 0.75,
      twinkleSpeed: Math.random() * 1.8 + 1.0,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.012,
      driftY: (Math.random() - 0.5) * 0.012,
      color: '#FFFFFF',
      isHeroSparkle,
      glintLength: Math.random() * 4 + 6 // 6px - 10px delicate glint
    });
  }
}

function drawMicroGlint(cx, cy, radius, length, opacity, color) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 0.85;

  // Ultra-fine horizontal & vertical needle rays
  ctx.beginPath();
  ctx.moveTo(cx - length, cy);
  ctx.lineTo(cx + length, cy);
  ctx.moveTo(cx, cy - length);
  ctx.lineTo(cx, cy + length);
  ctx.stroke();

  // Core bright pinpoint
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function draw(time) {
  if (!lastTime) lastTime = time;
  const dt = Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time;

  const seconds = time * 0.001;
  updateParallax(dt);

  const prefersReducedMotion = parallaxState.isReducedMotion;

  // Smoothly interpolate dual-hemisphere atmospheric nebula colors
  const targetL = hexToRgb(targetLeftAccent);
  const targetR = hexToRgb(targetRightAccent);
  leftRGB.r = lerp(leftRGB.r, targetL.r, 0.04);
  leftRGB.g = lerp(leftRGB.g, targetL.g, 0.04);
  leftRGB.b = lerp(leftRGB.b, targetL.b, 0.04);

  rightRGB.r = lerp(rightRGB.r, targetR.r, 0.04);
  rightRGB.g = lerp(rightRGB.g, targetR.g, 0.04);
  rightRGB.b = lerp(rightRGB.b, targetR.b, 0.04);

  // Clear canvas with deep void obsidian
  ctx.fillStyle = colors.voidBlack || '#030407';
  ctx.fillRect(0, 0, width, height);

  // ── 1. Left Hemisphere Ambient Nebula Glow ────────────────────────────────
  const leftGrad = ctx.createRadialGradient(
    width * 0.25, height * 0.5, 0,
    width * 0.25, height * 0.5, Math.max(width, height) * 0.5
  );
  leftGrad.addColorStop(0, `rgba(${Math.round(leftRGB.r)}, ${Math.round(leftRGB.g)}, ${Math.round(leftRGB.b)}, 0.12)`);
  leftGrad.addColorStop(0.5, `rgba(${Math.round(leftRGB.r)}, ${Math.round(leftRGB.g)}, ${Math.round(leftRGB.b)}, 0.03)`);
  leftGrad.addColorStop(1, 'rgba(3, 4, 7, 0)');
  ctx.fillStyle = leftGrad;
  ctx.fillRect(0, 0, width, height);

  // ── 2. Right Hemisphere Ambient Telemetry Glow ─────────────────────────────
  const rightGrad = ctx.createRadialGradient(
    width * 0.75, height * 0.5, 0,
    width * 0.75, height * 0.5, Math.max(width, height) * 0.5
  );
  rightGrad.addColorStop(0, `rgba(${Math.round(rightRGB.r)}, ${Math.round(rightRGB.g)}, ${Math.round(rightRGB.b)}, 0.10)`);
  rightGrad.addColorStop(0.5, `rgba(${Math.round(rightRGB.r)}, ${Math.round(rightRGB.g)}, ${Math.round(rightRGB.b)}, 0.02)`);
  rightGrad.addColorStop(1, 'rgba(3, 4, 7, 0)');
  ctx.fillStyle = rightGrad;
  ctx.fillRect(0, 0, width, height);

  // Parallax displacement offsets
  const farScrollShift = prefersReducedMotion ? 0 : parallaxState.scrollY * parallaxState.farScrollFactor;
  const farMouseXShift = prefersReducedMotion ? 0 : parallaxState.mouseX * parallaxState.farMouseShift;
  const farMouseYShift = prefersReducedMotion ? 0 : parallaxState.mouseY * parallaxState.farMouseShift;

  const midScrollShift = prefersReducedMotion ? 0 : parallaxState.scrollY * parallaxState.midScrollFactor;
  const midMouseXShift = prefersReducedMotion ? 0 : parallaxState.mouseX * parallaxState.midMouseShift;
  const midMouseYShift = prefersReducedMotion ? 0 : parallaxState.mouseY * parallaxState.midMouseShift;

  const nearScrollShift = prefersReducedMotion ? 0 : parallaxState.scrollY * parallaxState.nearScrollFactor;
  const nearMouseXShift = prefersReducedMotion ? 0 : parallaxState.mouseX * parallaxState.nearMouseShift;
  const nearMouseYShift = prefersReducedMotion ? 0 : parallaxState.mouseY * parallaxState.nearMouseShift;

  // Helper for seamless wrapping
  const wrap = (val, max) => (((val % max) + max) % max);

  // ── 3. Render Far Layer (Stardust Micro-Stars) ─────────────────────────────
  for (let p of particles.far) {
    if (!prefersReducedMotion) {
      p.x += p.driftX * dt;
      p.y += p.driftY * dt;
      p.x = (p.x % 1 + 1) % 1;
      p.y = (p.y % 1 + 1) % 1;
    }

    const rawX = p.x * width + farMouseXShift;
    const rawY = p.y * height - farScrollShift + farMouseYShift;
    const px = wrap(rawX, width);
    const py = wrap(rawY, height);

    const twinkle = Math.sin(seconds * p.twinkleSpeed + p.twinklePhase) * 0.25 + 0.75;
    const opacity = Math.min(1, p.baseOpacity * twinkle);

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── 4. Render Mid Layer (Specular Stars with Parallax Depth) ───────────────
  for (let p of particles.mid) {
    if (!prefersReducedMotion) {
      p.x += p.driftX * dt;
      p.y += p.driftY * dt;
      p.x = (p.x % 1 + 1) % 1;
      p.y = (p.y % 1 + 1) % 1;
    }

    const rawX = p.x * width + midMouseXShift;
    const rawY = p.y * height - midScrollShift + midMouseYShift;
    const px = wrap(rawX, width);
    const py = wrap(rawY, height);

    const twinkle = Math.sin(seconds * p.twinkleSpeed + p.twinklePhase) * 0.25 + 0.75;
    const opacity = Math.min(1, p.baseOpacity * twinkle);

    ctx.save();
    ctx.globalAlpha = opacity;

    if (p.hasHalo) {
      ctx.fillStyle = 'rgba(245, 247, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(px, py, p.size * 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── 5. Render Near Layer (Foreground Diamond Stars with Subtle Glint) ──────
  for (let p of particles.near) {
    if (!prefersReducedMotion) {
      p.x += p.driftX * dt;
      p.y += p.driftY * dt;
      p.x = (p.x % 1 + 1) % 1;
      p.y = (p.y % 1 + 1) % 1;
    }

    const rawX = p.x * width + nearMouseXShift;
    const rawY = p.y * height - nearScrollShift + nearMouseYShift;
    const px = wrap(rawX, width);
    const py = wrap(rawY, height);

    const twinkle = Math.sin(seconds * p.twinkleSpeed + p.twinklePhase) * 0.2 + 0.8;
    const opacity = Math.min(1, p.baseOpacity * twinkle);

    if (p.isHeroSparkle && !prefersReducedMotion) {
      const glintPulse = Math.sin(seconds * p.twinkleSpeed * 1.5 + p.twinklePhase) * 0.25 + 0.75;
      drawMicroGlint(px, py, p.size, p.glintLength * glintPulse, opacity, p.color);
    } else {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  requestAnimationFrame(draw);
}

export function init() {
  initParallax();

  canvas = document.getElementById('starfield');
  if (!canvas) {
    console.error('[Starfield] Canvas #starfield not found!');
    return;
  }

  ctx = canvas.getContext('2d');
  
  initColors();
  resize();
  window.addEventListener('resize', resize);

  generateParticles();

  // Listen to active event changes to softly tint the background nebula atmosphere
  window.addEventListener('shunya:event-change', (e) => {
    if (e.detail && e.detail.event) {
      targetLeftAccent = e.detail.event.leftAccent || e.detail.event.accent || '#FF1E4B';
      targetRightAccent = e.detail.event.rightAccent || e.detail.event.accent || '#00F0FF';
    }
  });

  console.log(`[Starfield] Initialized with minimal aesthetic starlight & 3-depth parallax.`);
  requestAnimationFrame(draw);
}
