/**
 * Orbit Accent Module — Celestial Coordinate Disc & Orbital Nodes
 * Renders a delicate, futuristic orbital coordinate ring in the event's accent color.
 */

export function createOrbitAccentHTML(accent) {
  const width = 280;
  const height = 180;
  const cx = width / 2;
  const cy = height / 2;
  const rx = 105;
  const ry = 48;
  const tiltRad = (-22 * Math.PI) / 180;

  const cosTilt = Math.cos(tiltRad);
  const sinTilt = Math.sin(tiltRad);

  const dotCount = 16;
  let dotsSVG = '';

  for (let i = 0; i < dotCount; i++) {
    const angle = (i / dotCount) * 2 * Math.PI;
    const rawX = rx * Math.cos(angle);
    const rawY = ry * Math.sin(angle);

    const x = cx + rawX * cosTilt - rawY * sinTilt;
    const y = cy + rawX * sinTilt + rawY * cosTilt;

    const r = (1.2 + Math.sin(angle * 3) * 0.4).toFixed(1);
    const opacity = (0.35 + Math.cos(angle) * 0.2).toFixed(2);

    dotsSVG += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${accent}" opacity="${opacity}" />`;
  }

  // Add 2 glowing orbital marker nodes
  const nodeAngles = [0.4, 3.6];
  let nodesSVG = '';
  nodeAngles.forEach(ang => {
    const rawX = rx * Math.cos(ang);
    const rawY = ry * Math.sin(ang);
    const x = cx + rawX * cosTilt - rawY * sinTilt;
    const y = cy + rawX * sinTilt + rawY * cosTilt;

    nodesSVG += `
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${accent}" opacity="0.85" />
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${accent}" opacity="0.2" />
    `;
  });

  return `
    <div class="orbit-accent" aria-hidden="true">
      <svg class="orbit-accent__svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Thin elliptical guide path -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(-22 ${cx} ${cy})" stroke="${accent}" stroke-width="0.75" stroke-dasharray="3 5" opacity="0.25" />
        <!-- Inner coordinate ring -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.65}" ry="${ry * 0.65}" transform="rotate(-22 ${cx} ${cy})" stroke="${accent}" stroke-width="0.5" opacity="0.15" />
        <!-- Dots along orbit -->
        ${dotsSVG}
        <!-- Glowing Nodes -->
        ${nodesSVG}
      </svg>
    </div>
  `;
}
