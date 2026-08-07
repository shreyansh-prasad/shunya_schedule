/**
 * Dynamic Island Module — Days-Only Edition
 * A single liquid glass-metal pill, always visible at bottom center.
 * Shows DAY 01, DAY 02, DAY 03 — active day highlighted with liquid glider.
 * Click a day to navigate. Scroll auto-syncs the active day.
 */

const DAYS_DATA = [
  { day: 1, title: 'DAY 01', accent: '#FF1E4B', eventIndices: [0, 1] },
  { day: 2, title: 'DAY 02', accent: '#FF6B00', eventIndices: [2, 3] },
  { day: 3, title: 'DAY 03', accent: '#00E676', eventIndices: [4, 5] }
];

export function init() {
  let root = document.getElementById('dynamic-island-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'dynamic-island-root';
    document.body.appendChild(root);
  }

  // Build markup — always-visible 3-day pill
  root.innerHTML = `
    <nav class="dynamic-island" id="dynamic-island" aria-label="Day Navigation">
      <div class="dynamic-island__gloss" aria-hidden="true"></div>
      <div class="dynamic-island__shimmer" aria-hidden="true"></div>
      <div class="dynamic-island__glider" id="island-glider" aria-hidden="true"></div>

      <div class="dynamic-island__days" id="island-days">
        ${DAYS_DATA.map((d, i) => `
          <button
            class="dynamic-island__day-btn${i === 0 ? ' is-active' : ''}"
            data-day="${d.day}"
            data-nav-event="${d.eventIndices[0]}"
            style="--day-accent: ${d.accent};"
            type="button"
            aria-label="Navigate to ${d.title}"
          >
            <span class="dynamic-island__day-dot"></span>
            <span class="dynamic-island__day-label">${d.title}</span>
          </button>
        `).join('')}
      </div>
    </nav>
  `;

  const island    = document.getElementById('dynamic-island');
  const glider    = document.getElementById('island-glider');
  const dayBtns   = Array.from(island.querySelectorAll('.dynamic-island__day-btn'));

  let currentDay  = 1;

  // ── Position the liquid glider under the active day button ────────────────
  // Use GSAP quickTo for fluid, spring-like glider movement
  const gliderTo = {
    left: gsap.quickTo(glider, 'x', { duration: 0.5, ease: 'expo.out' }),
    width: gsap.quickTo(glider, 'width', { duration: 0.5, ease: 'expo.out' })
  };

  function positionGlider(dayNum, immediate = false) {
    const btn = island.querySelector(`.dynamic-island__day-btn[data-day="${dayNum}"]`);
    if (!btn || !glider) return;

    const islandRect = island.getBoundingClientRect();
    const btnRect    = btn.getBoundingClientRect();

    if (islandRect.width === 0) return;

    const left  = btnRect.left  - islandRect.left;
    const width = btnRect.width;

    if (immediate) {
      gsap.set(glider, { x: left, width });
    } else {
      gliderTo.left(left);
      gliderTo.width(width);
    }
  }

  // ── Update the active day visuals ─────────────────────────────────────────
  function setActiveDay(dayNum, playShimmer = false) {
    if (dayNum === currentDay && !playShimmer) return;
    currentDay = dayNum;

    const dayData = DAYS_DATA[dayNum - 1];
    const color   = dayData ? dayData.accent : '#00F0FF';

    // Update island ambient glow colour to active day's accent
    island.style.setProperty('--island-active-color', color);
    island.style.setProperty('--island-glow', `${color}55`);

    // Flip is-active on buttons
    dayBtns.forEach(btn => {
      const isActive = parseInt(btn.dataset.day, 10) === dayNum;
      btn.classList.toggle('is-active', isActive);
    });

    // Slide the glider
    positionGlider(dayNum);

    // Shimmer effect on day change
    if (playShimmer) {
      island.classList.remove('is-liquid-morph');
      void island.offsetWidth; // reflow to restart animation
      island.classList.add('is-liquid-morph');
    }
  }

  // ── Listen for scroll-driven event changes ────────────────────────────────
  window.addEventListener('shunya:event-change', (e) => {
    if (!e.detail || typeof e.detail.index !== 'number') return;
    const localIndex = e.detail.index;
    const newDay     = Math.floor(localIndex / 2) + 1;
    const dayChanged = newDay !== currentDay;
    setActiveDay(newDay, dayChanged);
  });

  // ── Click navigation ──────────────────────────────────────────────────────
  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetEventIdx = parseInt(btn.dataset.navEvent, 10);
      window.dispatchEvent(new CustomEvent('shunya:navigate-to-event', {
        detail: { index: targetEventIdx }
      }));
    });
  });

  // ── Hover micro-lift with GSAP ─────────────────────────────────────────────
  island.addEventListener('mouseenter', () => {
    island.classList.add('is-hovered');
    gsap.to(island, { y: -4, duration: 0.35, ease: 'expo.out' });
  });
  island.addEventListener('mouseleave', () => {
    island.classList.remove('is-hovered');
    gsap.to(island, { y: 0, duration: 0.5, ease: 'expo.out' });
  });

  // ── Initial setup ─────────────────────────────────────────────────────────
  setActiveDay(1, false);
  // Defer glider positioning until layout is painted
  requestAnimationFrame(() => {
    setTimeout(() => positionGlider(1, true), 100);
  });

  console.log('[DynamicIsland] Days-only liquid glass island ready.');
}
