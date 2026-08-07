import { init as initStarfield } from './background/starfield.js';
import { init as initScroll } from './scroll/scroll-controller.js';
import { init as initTransition } from './transition/details-transition.js';
import { init as initDynamicIsland } from './scroll/dynamic-island.js';

// Top-level orchestration
function bootstrap() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize subsystems
  initStarfield();
  initScroll();
  initTransition();
  initDynamicIsland();

  // Header active tracker orchestration
  const trackerLabel = document.getElementById('header-tracker-label');
  const trackerDot = document.querySelector('.header__tracker-dot');

  window.addEventListener('shunya:event-change', (e) => {
    if (!e.detail || !e.detail.event) return;
    const { index, event } = e.detail;
    const paddedIndex = String(index + 1).padStart(2, '0');
    const color = event.headlineColor || event.accent || 'var(--star-white)';

    if (trackerLabel) {
      trackerLabel.textContent = `${paddedIndex} // 06 — ${event.name}`;
      trackerLabel.style.color = color;
    }

    if (trackerDot) {
      trackerDot.style.backgroundColor = color;
      trackerDot.style.boxShadow = `0 0 12px ${color}`;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

