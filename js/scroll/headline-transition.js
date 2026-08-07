/**
 * Headline Transition Module — Dual-Hemisphere Vertical Shear Split
 * 
 * Spec:
 * 1. Two full, non-wrapping, pixel-identical copies of the complete headline text,
 *    absolutely positioned in the exact same spot.
 * 2. Left copy: clip-path: inset(0 50% 0 0) (shows left half only).
 *    Right copy: clip-path: inset(0 0 0 50%) (shows right half only).
 * 3. Left Hemisphere (Cosmic Atmosphere) & Left Copy exit UP (translateY(-100%)).
 * 4. Right Hemisphere (Telemetry HUD) & Right Copy exit DOWN (translateY(100%)).
 * 5. Incoming Left Hemisphere/Copy arrive from translateY(-100%) and Right Hemisphere/Copy from translateY(100%),
 *    converging to translateY(0) with elastic springy wobble.
 * 6. prefers-reduced-motion: clean opacity crossfade with zero vertical displacement.
 */

/**
 * Prepares a headline element for the vertical shear split by generating two full,
 * non-wrapping, pixel-identical clipped copies stacked at the exact same coordinates.
 * 
 * @param {HTMLElement} headline - The .event-headline element
 * @returns {{ leftCopy: HTMLElement, rightCopy: HTMLElement }} The two clipped copy elements
 */
function prepareShearSplit(headline) {
  if (!headline) return { leftCopy: null, rightCopy: null };

  // If already prepared, return existing copies
  const existingLeft = headline.querySelector('.shear-copy--left');
  const existingRight = headline.querySelector('.shear-copy--right');
  if (existingLeft && existingRight) {
    return { leftCopy: existingLeft, rightCopy: existingRight };
  }

  const rawHTML = headline.innerHTML.trim();

  // Enforce inline-block max-content dimensions so 50% clip-path matches exact center of text
  headline.style.position = 'relative';
  headline.style.display = 'inline-block';
  headline.style.width = 'max-content';
  headline.style.maxWidth = '100vw';
  headline.style.overflow = 'visible';
  headline.style.whiteSpace = 'nowrap';
  headline.style.wordBreak = 'normal';
  headline.style.textAlign = 'center';
  headline.style.fontFamily = "'Chakra Petch', 'Space Grotesk', sans-serif";
  headline.style.fontSize = 'clamp(3.5rem, 8.5vw, 8.2rem)';
  headline.style.fontWeight = '700';
  headline.style.letterSpacing = '0.04em';
  headline.style.lineHeight = '0.92';
  headline.style.textTransform = 'uppercase';

  // Structure:
  // 1. Ghost copy: invisible in document flow to size the headline to the exact text width
  // 2. Left copy: absolute, stacked on top, inset(0 50% 0 0) shows exact left half
  // 3. Right copy: absolute, stacked on top, inset(0 0 0 50%) shows exact right half
  headline.innerHTML = `
    <span class="shear-ghost" style="display: block; visibility: hidden; opacity: 0; pointer-events: none; white-space: nowrap; user-select: none;">${rawHTML}</span>
    <span class="shear-copy shear-copy--left" style="display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; white-space: nowrap; clip-path: inset(0 50% 0 0); -webkit-clip-path: inset(0 50% 0 0); will-change: transform, opacity; pointer-events: none;">${rawHTML}</span>
    <span class="shear-copy shear-copy--right" style="display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; white-space: nowrap; clip-path: inset(0 0 0 50%); -webkit-clip-path: inset(0 0 0 50%); will-change: transform, opacity; pointer-events: none;">${rawHTML}</span>
  `;

  return {
    leftCopy: headline.querySelector('.shear-copy--left'),
    rightCopy: headline.querySelector('.shear-copy--right')
  };
}

/**
 * Builds the timeline animations for all event cards on the master scrub timeline
 * using the Dual-Hemisphere Vertical Shear Split choreography.
 * 
 * @param {gsap.core.Timeline} tl - The master GSAP scrub timeline.
 * @param {HTMLElement[]} cards - Array of .event-card DOM elements.
 * @param {number} step - Timeline duration units per event step (default 2.0).
 */
export function buildTimelineTransitions(tl, cards, step = 2.0) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const outDuration = 0.50;                    // 500ms outgoing — weighted, deliberate exit
  const inDuration = 0.70;                     // 700ms incoming — confident entrance
  const easeOut = "expo.in";                   // fast acceleration into exit (decisive)
  const easeIn = "expo.out";                   // ultra-smooth deceleration to rest (cinematic)

  const shearItems = cards.map(card => {
    const headline = card.querySelector('.event-headline');
    const metaBar = card.querySelector('.event-card__meta-bar');
    const actions = card.querySelector('.event-card__actions');
    const leftHalf = card.querySelector('.event-card__half--left');
    const rightHalf = card.querySelector('.event-card__half--right');
    const { leftCopy, rightCopy } = prepareShearSplit(headline);

    return {
      card,
      headline,
      metaBar,
      actions,
      leftHalf,
      rightHalf,
      leftCopy,
      rightCopy
    };
  });

  // Initialize initial states at time 0
  shearItems.forEach(({ card, leftCopy, rightCopy, leftHalf, rightHalf, metaBar, actions }, i) => {
    const isInitial = (i === 6 || (shearItems.length <= 6 && i === 0));
    if (isInitial) {
      gsap.set(card, { autoAlpha: 1, opacity: 1 });
      if (leftHalf && rightHalf) {
        gsap.set([leftHalf, rightHalf], { yPercent: 0, opacity: 1 });
      }
      if (leftCopy && rightCopy) {
        gsap.set([leftCopy, rightCopy], { yPercent: 0, opacity: 1 });
      }
      if (metaBar) gsap.set(metaBar, { opacity: 1 });
      if (actions) gsap.set(actions, { opacity: 1 });
    } else {
      gsap.set(card, { autoAlpha: 0, opacity: 0 });
      if (leftHalf && rightHalf) {
        if (!prefersReducedMotion) {
          gsap.set(leftHalf, { yPercent: -100, opacity: 0 });
          gsap.set(rightHalf, { yPercent: 100, opacity: 0 });
        } else {
          gsap.set([leftHalf, rightHalf], { yPercent: 0, opacity: 0 });
        }
      }
      if (leftCopy && rightCopy) {
        if (!prefersReducedMotion) {
          gsap.set(leftCopy, { yPercent: -100, opacity: 0 });
          gsap.set(rightCopy, { yPercent: 100, opacity: 0 });
        } else {
          gsap.set([leftCopy, rightCopy], { yPercent: 0, opacity: 0 });
        }
      }
      if (metaBar) gsap.set(metaBar, { opacity: 0 });
      if (actions) gsap.set(actions, { opacity: 0 });
    }
  });

  // Build sequential shear transitions
  shearItems.forEach((item, i) => {
    const isFirst = (i === 0);
    const isLast = (i === shearItems.length - 1);

    // 1. Entrance animation (cards 1..N-1)
    if (!isFirst) {
      // Incoming begins as soon as outgoing clears
      const inStartTime = (i - 1) * step + 0.45 + outDuration;

      // Reveal card container at transition start
      tl.set(item.card, { autoAlpha: 1, opacity: 1 }, inStartTime);

      if (!prefersReducedMotion) {
        // Hemispheres Entrance
        if (item.leftHalf && item.rightHalf) {
          tl.set(item.leftHalf, { yPercent: -100, opacity: 0 }, inStartTime);
          tl.set(item.rightHalf, { yPercent: 100, opacity: 0 }, inStartTime);

          tl.to(item.leftHalf, {
            yPercent: 0,
            opacity: 1,
            duration: inDuration,
            ease: "expo.out"
          }, inStartTime);

          tl.to(item.rightHalf, {
            yPercent: 0,
            opacity: 1,
            duration: inDuration,
            ease: "expo.out"
          }, inStartTime);
        }

        // Headline Text Elastic Entrance
        if (item.leftCopy && item.rightCopy) {
          tl.set(item.leftCopy, { yPercent: -100, opacity: 0 }, inStartTime);
          tl.set(item.rightCopy, { yPercent: 100, opacity: 0 }, inStartTime);

          // Left copy translates downward to 0
          tl.to(item.leftCopy, {
            yPercent: 0,
            opacity: 1,
            duration: inDuration,
            ease: easeIn
          }, inStartTime);

          // Right copy translates upward to 0
          tl.to(item.rightCopy, {
            yPercent: 0,
            opacity: 1,
            duration: inDuration,
            ease: easeIn
          }, inStartTime);
        }
      } else {
        // Reduced motion: opacity crossfade
        const fadeTargets = [item.leftHalf, item.rightHalf, item.leftCopy, item.rightCopy].filter(Boolean);
        if (fadeTargets.length > 0) {
          tl.to(fadeTargets, {
            opacity: 1,
            duration: inDuration,
            ease: "power2.inOut"
          }, inStartTime);
        }
      }

      // Fade in meta bar and action button — staggered for elegance
      const metaTargets = [item.metaBar, item.actions].filter(Boolean);
      if (metaTargets.length > 0) {
        tl.fromTo(metaTargets,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: inDuration * 0.75, ease: "expo.out", stagger: 0.08 },
          inStartTime + inDuration * 0.25
        );
      }
    }

    // 2. Exit animation (cards 0..N-2)
    if (!isLast) {
      const outStartTime = i * step + 0.45;
      const outEndTime = outStartTime + outDuration;

      if (!prefersReducedMotion) {
        // Hemispheres Exit
        if (item.leftHalf && item.rightHalf) {
          tl.to(item.leftHalf, {
            yPercent: -100,
            opacity: 0,
            duration: outDuration,
            ease: easeOut
          }, outStartTime);

          tl.to(item.rightHalf, {
            yPercent: 100,
            opacity: 0,
            duration: outDuration,
            ease: easeOut
          }, outStartTime);
        }

        // Headline Text Shear Exit
        if (item.leftCopy && item.rightCopy) {
          tl.to(item.leftCopy, {
            yPercent: -100,
            opacity: 0,
            duration: outDuration,
            ease: easeOut
          }, outStartTime);

          tl.to(item.rightCopy, {
            yPercent: 100,
            opacity: 0,
            duration: outDuration,
            ease: easeOut
          }, outStartTime);
        }
      } else {
        // Reduced motion: opacity crossfade
        const fadeTargets = [item.leftHalf, item.rightHalf, item.leftCopy, item.rightCopy].filter(Boolean);
        if (fadeTargets.length > 0) {
          tl.to(fadeTargets, {
            opacity: 0,
            duration: outDuration,
            ease: "power2.inOut"
          }, outStartTime);
        }
      }

      // Fade out meta bar and action button — quick, snappy
      const metaTargets = [item.metaBar, item.actions].filter(Boolean);
      if (metaTargets.length > 0) {
        tl.to(metaTargets, {
          opacity: 0,
          y: -8,
          duration: outDuration * 0.6,
          ease: "expo.in",
          stagger: 0.04
        }, outStartTime);
      }

      // Hide card completely once exit finishes
      tl.set(item.card, { autoAlpha: 0 }, outEndTime);
    }
  });
}
