/**
 * Headline Transition Module — Centrifugal Chromatic Push
 *
 * VFX Choreography (replaces the old Dual-Hemisphere Vertical Shear Split):
 *
 * HEMISPHERES (left/right background panels):
 *   EXIT  — LEFT rushes LEFT (-108%), RIGHT rushes RIGHT (+108%). Centrifugal explosion.
 *   ENTER — NEW pair drifts from +/-4% inward offset -> 0. Iris-open convergence.
 *
 * HEADLINE TEXT (left/right clipped copies):
 *   EXIT  — COUNTER to hemispheres: left copy exits RIGHT (+95%), right exits LEFT (-95%).
 *           Multi-layer depth parallax — two trains passing at speed. Cinema premium.
 *   ENTER — Both copies converge from +/-5% outer edges -> 0. Text assembles inward.
 *
 * META / CTA:
 *   EXIT  — snaps upward (y:-10, opacity:0), leads by 50ms.
 *   ENTER — drifts from below (y:14->0, opacity:0->1), staggered 90ms.
 *
 * CHROMATIC FLASH:
 *   At mid-exit, a full-viewport div fires at 18% accent-color opacity for ~160ms.
 *   Scanner flash / cinematic cut-light effect.
 *
 * prefers-reduced-motion: pure opacity crossfade, zero displacement.
 */

function preparePushSplit(headline) {
  if (!headline) return { leftCopy: null, rightCopy: null };

  const existingLeft  = headline.querySelector('.shear-copy--left');
  const existingRight = headline.querySelector('.shear-copy--right');
  if (existingLeft && existingRight) {
    return { leftCopy: existingLeft, rightCopy: existingRight };
  }

  const rawHTML = headline.innerHTML.trim();

  headline.style.position      = 'relative';
  headline.style.display       = 'inline-block';
  headline.style.width         = 'max-content';
  headline.style.maxWidth      = '100vw';
  headline.style.overflow      = 'visible';
  headline.style.whiteSpace    = 'nowrap';
  headline.style.wordBreak     = 'normal';
  headline.style.textAlign     = 'center';
  headline.style.fontFamily    = "'Chakra Petch', 'Space Grotesk', sans-serif";
  headline.style.fontSize      = 'clamp(3.5rem, 8.5vw, 8.2rem)';
  headline.style.fontWeight    = '700';
  headline.style.letterSpacing = '0.04em';
  headline.style.lineHeight    = '0.92';
  headline.style.textTransform = 'uppercase';

  const base  = 'display:block;position:absolute;top:0;left:0;width:100%;height:100%;white-space:nowrap;will-change:transform,opacity;pointer-events:none;';
  const lcClip = 'clip-path:inset(0 50% 0 0);-webkit-clip-path:inset(0 50% 0 0);';
  const rcClip = 'clip-path:inset(0 0 0 50%);-webkit-clip-path:inset(0 0 0 50%);';

  headline.innerHTML =
    '<span class="shear-ghost" style="display:block;visibility:hidden;opacity:0;pointer-events:none;white-space:nowrap;user-select:none;">' + rawHTML + '</span>' +
    '<span class="shear-copy shear-copy--left"  style="' + base + lcClip + '">' + rawHTML + '</span>' +
    '<span class="shear-copy shear-copy--right" style="' + base + rcClip + '">' + rawHTML + '</span>';

  return {
    leftCopy:  headline.querySelector('.shear-copy--left'),
    rightCopy: headline.querySelector('.shear-copy--right')
  };
}

// --- Chromatic Flash overlay -------------------------------------------------
let _flashEl = null;
function getFlashEl() {
  if (_flashEl) return _flashEl;
  _flashEl = document.createElement('div');
  _flashEl.setAttribute('aria-hidden', 'true');
  _flashEl.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0;mix-blend-mode:screen;will-change:opacity;';
  document.body.appendChild(_flashEl);
  return _flashEl;
}

function fireChromaFlash(color) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = getFlashEl();
  el.style.background = color || 'rgba(255,255,255,0.9)';
  gsap.killTweensOf(el);
  gsap.fromTo(el,
    { opacity: 0 },
    {
      opacity:     0.18,
      duration:    0.07,
      ease:        'power1.out',
      yoyo:        true,
      repeat:      1,
      repeatDelay: 0.03,
      onComplete:  () => gsap.set(el, { opacity: 0 })
    }
  );
}

/**
 * Builds the master scrub timeline with the Centrifugal Chromatic Push choreography.
 * @param {gsap.core.Timeline} tl
 * @param {HTMLElement[]} cards
 * @param {number} step
 */
export function buildTimelineTransitions(tl, cards, step = 2.0) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const outDuration = 0.46;
  const inDuration  = 0.72;
  const easeOut     = 'expo.in';
  const easeIn      = 'expo.out';

  const items = cards.map(card => {
    const headline  = card.querySelector('.event-headline');
    const metaBar   = card.querySelector('.event-card__meta-bar');
    const actions   = card.querySelector('.event-card__actions');
    const leftHalf  = card.querySelector('.event-card__half--left');
    const rightHalf = card.querySelector('.event-card__half--right');
    const { leftCopy, rightCopy } = preparePushSplit(headline);
    const accentColor = headline ? headline.style.color : null;
    return { card, headline, metaBar, actions, leftHalf, rightHalf, leftCopy, rightCopy, accentColor };
  });

  // --- Set initial states ---------------------------------------------------
  items.forEach(({ card, leftCopy, rightCopy, leftHalf, rightHalf, metaBar, actions }, i) => {
    const isInitial = (i === 6 || (items.length <= 6 && i === 0));
    if (isInitial) {
      gsap.set(card, { autoAlpha: 1, opacity: 1 });
      if (leftHalf  && rightHalf) gsap.set([leftHalf, rightHalf], { x: '0%', opacity: 1 });
      if (leftCopy  && rightCopy) gsap.set([leftCopy, rightCopy], { x: '0%', opacity: 1 });
      if (metaBar) gsap.set(metaBar, { opacity: 1, y: 0 });
      if (actions) gsap.set(actions, { opacity: 1, y: 0 });
    } else {
      gsap.set(card, { autoAlpha: 0, opacity: 0 });
      if (!prefersReducedMotion) {
        if (leftHalf  && rightHalf) { gsap.set(leftHalf, { x: '4%', opacity: 0 }); gsap.set(rightHalf, { x: '-4%', opacity: 0 }); }
        if (leftCopy  && rightCopy) { gsap.set(leftCopy, { x: '-5%', opacity: 0 }); gsap.set(rightCopy, { x: '5%', opacity: 0 }); }
      } else {
        if (leftHalf  && rightHalf) gsap.set([leftHalf, rightHalf], { x: '0%', opacity: 0 });
        if (leftCopy  && rightCopy) gsap.set([leftCopy, rightCopy], { x: '0%', opacity: 0 });
      }
      if (metaBar) gsap.set(metaBar, { opacity: 0, y: 0 });
      if (actions) gsap.set(actions, { opacity: 0, y: 0 });
    }
  });

  // --- Build sequential transitions -----------------------------------------
  items.forEach((item, i) => {
    const isFirst = (i === 0);
    const isLast  = (i === items.length - 1);

    // ENTRANCE
    if (!isFirst) {
      const inStart = (i - 1) * step + 0.45 + outDuration;
      tl.set(item.card, { autoAlpha: 1, opacity: 1 }, inStart);

      if (!prefersReducedMotion) {
        if (item.leftHalf && item.rightHalf) {
          tl.set(item.leftHalf,  { x: '4%',  opacity: 0 }, inStart);
          tl.set(item.rightHalf, { x: '-4%', opacity: 0 }, inStart);
          tl.to(item.leftHalf,   { x: '0%', opacity: 1, duration: inDuration,        ease: easeIn }, inStart);
          tl.to(item.rightHalf,  { x: '0%', opacity: 1, duration: inDuration,        ease: easeIn }, inStart);
        }
        if (item.leftCopy && item.rightCopy) {
          tl.set(item.leftCopy,  { x: '-5%', opacity: 0 }, inStart);
          tl.set(item.rightCopy, { x: '5%',  opacity: 0 }, inStart);
          tl.to(item.leftCopy,   { x: '0%', opacity: 1, duration: inDuration * 0.88, ease: easeIn }, inStart + 0.08);
          tl.to(item.rightCopy,  { x: '0%', opacity: 1, duration: inDuration * 0.88, ease: easeIn }, inStart + 0.08);
        }
      } else {
        const targets = [item.leftHalf, item.rightHalf, item.leftCopy, item.rightCopy].filter(Boolean);
        if (targets.length > 0) tl.to(targets, { opacity: 1, duration: inDuration, ease: 'power2.inOut' }, inStart);
      }

      const metaTargets = [item.metaBar, item.actions].filter(Boolean);
      if (metaTargets.length > 0) {
        tl.fromTo(metaTargets, { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: inDuration * 0.78, ease: easeIn, stagger: 0.09 },
          inStart + inDuration * 0.28);
      }
    }

    // EXIT
    if (!isLast) {
      const outStart = i * step + 0.45;
      const outEnd   = outStart + outDuration;

      if (!prefersReducedMotion) {
        const metaTargets = [item.metaBar, item.actions].filter(Boolean);
        if (metaTargets.length > 0) {
          tl.to(metaTargets, { opacity: 0, y: -10, duration: outDuration * 0.52, ease: easeOut, stagger: 0.04 }, outStart);
        }
        if (item.leftHalf && item.rightHalf) {
          tl.to(item.leftHalf,  { x: '-108%', opacity: 0, duration: outDuration,        ease: easeOut }, outStart);
          tl.to(item.rightHalf, { x: '108%',  opacity: 0, duration: outDuration,        ease: easeOut }, outStart);
        }
        // Counter-motion: left exits RIGHT, right exits LEFT — multi-layer depth parallax
        if (item.leftCopy && item.rightCopy) {
          tl.to(item.leftCopy,  { x: '95%',  opacity: 0, duration: outDuration * 0.86, ease: easeOut }, outStart + 0.03);
          tl.to(item.rightCopy, { x: '-95%', opacity: 0, duration: outDuration * 0.86, ease: easeOut }, outStart + 0.03);
        }
        // Chromatic flash at mid-exit
        tl.call(() => fireChromaFlash(item.accentColor), [], outStart + outDuration * 0.5);
      } else {
        const metaTargets = [item.metaBar, item.actions].filter(Boolean);
        if (metaTargets.length > 0) tl.to(metaTargets, { opacity: 0, duration: outDuration * 0.6, ease: 'power2.inOut' }, outStart);
        const fadeTargets = [item.leftHalf, item.rightHalf, item.leftCopy, item.rightCopy].filter(Boolean);
        if (fadeTargets.length > 0) tl.to(fadeTargets, { opacity: 0, duration: outDuration, ease: 'power2.inOut' }, outStart);
      }

      tl.set(item.card, { autoAlpha: 0 }, outEnd);
    }
  });
}