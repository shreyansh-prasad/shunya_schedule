/**
 * Parallax Module — Multi-Depth Scroll & Interactive Cursor Parallax
 * Manages scroll-linked depth offsets and smooth mouse perspective inertia for the starfield.
 */

export const parallaxState = {
  scrollY: 0,
  targetScrollY: 0,
  mouseX: 0,
  mouseY: 0,
  targetMouseX: 0,
  targetMouseY: 0,
  isReducedMotion: false,

  // Scroll parallax depth multipliers
  farScrollFactor: 0.04,
  midScrollFactor: 0.16,
  nearScrollFactor: 0.36,

  // Interactive mouse perspective pixel shifts
  farMouseShift: 10,
  midMouseShift: 24,
  nearMouseShift: 48
};

export function updateParallax(dt = 0.016) {
  if (parallaxState.isReducedMotion) return;

  // Frame-rate-independent exponential smoothing (half-life ~0.12s for mouse, ~0.2s for scroll)
  // Factor = 1 - exp(-dt / halfLife)
  const mouseHalfLife = 0.12;
  const mouseFactor = 1 - Math.exp(-dt / mouseHalfLife);
  parallaxState.mouseX += (parallaxState.targetMouseX - parallaxState.mouseX) * mouseFactor;
  parallaxState.mouseY += (parallaxState.targetMouseY - parallaxState.mouseY) * mouseFactor;
}

export function initParallax() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  parallaxState.isReducedMotion = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
    parallaxState.isReducedMotion = e.matches;
  });

  // Track window scroll through GSAP ScrollTrigger if available, with standard scroll fallback
  if (window.ScrollTrigger) {
    window.ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        parallaxState.scrollY = self.scroll();
      }
    });
  } else {
    window.addEventListener('scroll', () => {
      parallaxState.scrollY = window.scrollY || window.pageYOffset;
    }, { passive: true });
  }

  // Track subtle mouse movement for organic 3D depth perspective
  window.addEventListener('mousemove', (e) => {
    if (parallaxState.isReducedMotion) return;
    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;
    parallaxState.targetMouseX = (e.clientX - centerX) / centerX; // -1.0 to +1.0
    parallaxState.targetMouseY = (e.clientY - centerY) / centerY; // -1.0 to +1.0
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    parallaxState.targetMouseX = 0;
    parallaxState.targetMouseY = 0;
  });
}
