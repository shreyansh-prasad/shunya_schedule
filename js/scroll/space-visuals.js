/**
 * Space Visuals Generator Module — Cinematic 3D Celestial Architectures & Holographic CAD Blueprints
 * 
 * Spec:
 * Left Hemisphere:  3D Volumetric Celestial Phenomena (Gravitational Eclipse, Gas Giant, Supernova Core, Kerr Singularity, Aurora Rift, Binary Stars)
 * Right Hemisphere: Holographic CAD Schematics & Tactical Telemetry (Isometric Cyber Vault, 3D Swarm Trajectory, 24H Launch Dial, Fibonacci Matrix, Dual Oscilloscope, Venture Growth Constellation)
 */

export function getEventSpaceVisuals(event, index) {
  const localIdx = event._localIndex !== undefined ? event._localIndex : index;
  const paddedIndex = String(localIdx + 1).padStart(2, '0');
  const leftCosmic = getLeftCosmicHTML(event.id, event.leftAccent, paddedIndex);
  const rightHUD = getRightHUDHTML(event.id, event.rightAccent, paddedIndex);
  const telemetry = getTelemetryData(event.id, paddedIndex);

  const leftHTML = `
    <!-- Left Hemisphere: 3D Volumetric Celestial Body with Dynamic Coronal Energy -->
    <div class="event-card__half event-card__half--left event-card__hemisphere event-card__hemisphere--left" data-challenge-id="${event.id}">
      <div class="space-scene space-scene--left">
        ${leftCosmic}
      </div>
      <div class="space-sector-tag">
        <div class="space-sector-tag__badge" style="color: ${event.leftAccent}; border-color: ${event.leftAccent}44;">
          <span class="space-sector-tag__dot" style="background: ${event.leftAccent}; box-shadow: 0 0 10px ${event.leftAccent};"></span>
          <span>${telemetry.sectorBadge}</span>
        </div>
        <span class="space-sector-tag__coord">${telemetry.sectorCoord}</span>
      </div>
    </div>
  `;

  const rightHTML = `
    <!-- Right Hemisphere: Holographic CAD Telemetry HUD & Hologram Deck -->
    <div class="event-card__half event-card__half--right event-card__hemisphere event-card__hemisphere--right" data-challenge-id="${event.id}">
      <div class="space-scene space-scene--right">
        ${rightHUD}
      </div>
      <div class="space-hud-status">
        <span class="space-hud-status__indicator" style="background: ${event.rightAccent}; box-shadow: 0 0 16px ${event.rightAccent};"></span>
        <span class="space-hud-status__text" style="color: ${event.rightAccent};">${telemetry.statusBadge}</span>
      </div>
    </div>
  `;

  return { leftHTML, rightHTML };
}

export function getDualHemisphereHTML(event, index) {
  const { leftHTML, rightHTML } = getEventSpaceVisuals(event, index);
  return `${leftHTML}\n${rightHTML}`;
}

function getTelemetryData(id, paddedIndex) {
  switch (id) {
    case 'zero-day':
      return {
        sectorBadge: 'SECTOR // 01 — BLOOD ECLIPSE HORIZON',
        sectorCoord: `CORONA_TEMP: 8,400K &bull; OBSIDIAN_VOID &bull; 0x9F4C`,
        statusBadge: 'CYBER_VAULT: ENCRYPTED // 4096-BIT'
      };
    case 'autopilot':
      return {
        sectorBadge: 'SECTOR // 02 — CERULEAN ICE GIANT',
        sectorCoord: `ORBITAL_VELOCITY: 32.4 KM/S &bull; RING_SYSTEM &bull; PROBE_02`,
        statusBadge: 'AGENT_SWARM: AUTONOMOUS // ACTIVE'
      };
    case 'devlympics':
      return {
        sectorBadge: 'SECTOR // 03 — SUPERNOVA PLASMA CORE',
        sectorCoord: `ENERGY_FLUX: 99.8% &bull; CORONAL_FLARE &bull; T-24H`,
        statusBadge: 'LAUNCH_RADAR: SPRINT_CLOCK // LIVE'
      };
    case 'flow-in-flux':
      return {
        sectorBadge: 'SECTOR // 04 — GRAVITATIONAL SINGULARITY',
        sectorCoord: `LENSING: &infin; &bull; PHOTON_TORUS &bull; &phi;=1.618`,
        statusBadge: 'DESIGN_MATRIX: GOLDEN_SECTION // FLUID'
      };
    case 'hallucination-hunt':
      return {
        sectorBadge: 'SECTOR // 05 — AURORA QUANTUM RIFT',
        sectorCoord: `COHERENCE: 42.1% &bull; EMERALD_SHARDS &bull; DUAL_WAVE`,
        statusBadge: 'TRUTH_SCANNER: ENGAGED // FILTER_V4'
      };
    case 'case-a-thon':
    default:
      return {
        sectorBadge: 'SECTOR // 06 — SAPPHIRE BINARY HUB',
        sectorCoord: `DUAL_CORE &bull; STARDUST_ACCRETION &bull; +340% ROI`,
        statusBadge: 'MACRO_STRATEGY: ACTIVE // EXECUTIVE'
      };
  }
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LEFT HEMISPHERE: 6 Mind-Boggling 3D Celestial Phenomena
 * ─────────────────────────────────────────────────────────────────────────────
 */
function getLeftCosmicHTML(id, accent, paddedIndex) {
  switch (id) {
    case 'zero-day':
      return `
        <div class="celestial-wrapper eclipse-assembly">
          <!-- Volumetric Atmospheric Corona -->
          <div class="eclipse-corona-outer" style="background: radial-gradient(circle, ${accent}66 0%, ${accent}22 50%, transparent 75%); filter: blur(35px);"></div>
          <div class="eclipse-corona-inner" style="box-shadow: 0 0 160px ${accent}, inset 0 0 70px ${accent}88;"></div>
          
          <!-- Obsidian Planetary Sphere with Glowing Edge Rim -->
          <div class="eclipse-core" style="background: radial-gradient(circle at 45% 45%, #2a000a 0%, #120004 70%, ${accent} 100%);">
            <div class="eclipse-crater" style="top: 25%; left: 30%; width: 64px; height: 64px;"></div>
            <div class="eclipse-crater" style="top: 58%; left: 54%; width: 88px; height: 88px;"></div>
            <div class="eclipse-crater" style="top: 20%; left: 62%; width: 40px; height: 40px;"></div>
            <div class="eclipse-specular-rim" style="border-color: ${accent};"></div>
          </div>
          
          <!-- Counter-rotating Magnetic Solar Flare Arcs -->
          <div class="eclipse-flare-arc" style="border-top-color: ${accent}; border-right-color: ${accent}88;"></div>
          <div class="eclipse-flare-arc eclipse-flare-arc--2" style="border-bottom-color: #ffffff; border-left-color: ${accent}99;"></div>
          
          <!-- Tilted Accretion Debris Ring with Glowing Sparks -->
          <div class="debris-ring" style="border-color: ${accent}44;">
            <span class="debris-chunk debris-chunk--1" style="background: ${accent}; box-shadow: 0 0 16px ${accent}, 0 0 6px #fff;"></span>
            <span class="debris-chunk debris-chunk--2" style="background: #ffffff; box-shadow: 0 0 14px #ffffff;"></span>
            <span class="debris-chunk debris-chunk--3" style="background: ${accent}; box-shadow: 0 0 12px ${accent};"></span>
          </div>

          <!-- Gravitational Energy Streamers towards Center -->
          <div class="cosmic-energy-streamer" style="background: linear-gradient(90deg, ${accent}88, transparent);"></div>
        </div>
      `;

    case 'autopilot':
      return `
        <div class="celestial-wrapper gas-giant-assembly">
          <!-- Bioluminescent Atmosphere Aura -->
          <div class="planet-atmosphere-glow" style="box-shadow: 0 0 160px ${accent}99, inset 0 0 60px ${accent}88;"></div>
          
          <!-- Volumetric Multi-Band Gas Giant Sphere -->
          <div class="gas-giant-sphere" style="background: radial-gradient(circle at 35% 35%, #b3f8ff 0%, #00b4d8 35%, #003049 75%, #00121e 100%);">
            <div class="gas-cloud-band gas-cloud-band--1" style="background: linear-gradient(90deg, transparent, ${accent}66, transparent);"></div>
            <div class="gas-cloud-band gas-cloud-band--2" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);"></div>
            <div class="gas-cloud-band gas-cloud-band--3" style="background: linear-gradient(90deg, transparent, ${accent}55, transparent);"></div>
            <div class="storm-vortex" style="background: radial-gradient(circle, #ffffff 0%, ${accent} 60%, transparent 100%);"></div>
          </div>
          
          <!-- 3D Layered Translucent Planetary Rings -->
          <div class="planetary-ring planetary-ring--outer" style="border-color: ${accent}99; box-shadow: 0 0 45px ${accent}77, inset 0 0 20px ${accent}44;"></div>
          <div class="planetary-ring planetary-ring--inner" style="border-color: rgba(255,255,255,0.5);"></div>
          <div class="planetary-ring-shadow"></div>
          
          <!-- Orbiting Surveyor Satellite Drone with Laser Scanner -->
          <div class="surveyor-probe-orbit">
            <div class="surveyor-probe" style="background: #ffffff; box-shadow: 0 0 20px ${accent}, 0 0 8px #ffffff;">
              <div class="surveyor-beam" style="background: linear-gradient(90deg, ${accent}cc, transparent);"></div>
              <div class="surveyor-scan-cone" style="background: conic-gradient(from 0deg at 0% 50%, ${accent}44, transparent 40deg);"></div>
            </div>
          </div>
        </div>
      `;

    case 'devlympics':
      return `
        <div class="celestial-wrapper solar-star-assembly">
          <!-- Concentric Electromagnetic Shockwaves -->
          <div class="solar-shockwave solar-shockwave--1" style="border-color: ${accent}99; box-shadow: 0 0 30px ${accent}44;"></div>
          <div class="solar-shockwave solar-shockwave--2" style="border-color: ${accent}66;"></div>
          <div class="solar-shockwave solar-shockwave--3" style="border-color: ${accent}33;"></div>
          
          <!-- Blazing High-Energy Solar Core -->
          <div class="solar-star-core" style="background: radial-gradient(circle at 40% 40%, #ffffff 0%, #ffea75 22%, #ff6600 65%, #330d00 98%); box-shadow: 0 0 180px ${accent}, 0 0 320px ${accent}88;">
            <div class="plasma-filament" style="border-color: #ffffff ${accent} transparent transparent;"></div>
            <div class="plasma-filament plasma-filament--2" style="border-color: transparent transparent #ffd000 ${accent};"></div>
            <div class="solar-granulation"></div>
          </div>
          
          <!-- Magnetic Flux Field Rings -->
          <div class="magnetic-field-ring" style="border-color: ${accent}77; box-shadow: 0 0 25px ${accent}55;"></div>
          <div class="magnetic-field-ring magnetic-field-ring--2" style="border-color: #ffd00066;"></div>
        </div>
      `;

    case 'flow-in-flux':
      return `
        <div class="celestial-wrapper singularity-assembly">
          <!-- Gravitational Lensing Halo -->
          <div class="lensing-distortion-field" style="background: radial-gradient(circle, ${accent}55 0%, #9c27b033 45%, transparent 75%);"></div>
          
          <!-- Spacetime Torus Distortion Ribbons -->
          <div class="torus-ribbon torus-ribbon--1" style="border-color: ${accent}dd; box-shadow: 0 0 45px ${accent}aa;"></div>
          <div class="torus-ribbon torus-ribbon--2" style="border-color: #ff80ebbb; box-shadow: 0 0 30px #ff80eb66;"></div>
          
          <!-- High-Density Obsidian Event Horizon with Radiant Photon Ring -->
          <div class="singularity-core" style="background: #010003; box-shadow: inset 0 0 50px #ffffff, 0 0 140px ${accent}ee;">
            <div class="singularity-photon-ring" style="border-color: ${accent};"></div>
          </div>
          
          <!-- Floating Quantum Glyphs / Crystalline Nodes -->
          <div class="floating-node floating-node--1" style="background: ${accent}; box-shadow: 0 0 20px ${accent};"></div>
          <div class="floating-node floating-node--2" style="background: #ff80eb; box-shadow: 0 0 20px #ff80eb;"></div>
          <div class="floating-node floating-node--3" style="background: #ffffff; box-shadow: 0 0 14px #ffffff;"></div>
        </div>
      `;

    case 'hallucination-hunt':
      return `
        <div class="celestial-wrapper quantum-rift-assembly">
          <!-- Multi-Layer Undulating Aurora Atmospheric Curtains -->
          <div class="aurora-curtain aurora-curtain--1" style="background: linear-gradient(135deg, ${accent}88, #00b0ff44, transparent 70%);"></div>
          <div class="aurora-curtain aurora-curtain--2" style="background: linear-gradient(225deg, ${accent}77, #76ff0333, transparent 60%);"></div>
          
          <!-- Rotating 3D Hyper-Dimensional Crystal Shards -->
          <div class="quantum-shard quantum-shard--1" style="border-color: ${accent}ee; box-shadow: 0 0 50px ${accent}99;"></div>
          <div class="quantum-shard quantum-shard--2" style="border-color: ${accent}aa; box-shadow: 0 0 30px ${accent}55;"></div>
          
          <!-- Quantum Truth Pulse Core -->
          <div class="quantum-core" style="background: radial-gradient(circle, #ffffff 0%, ${accent} 45%, #00381e 80%, #000603 100%); box-shadow: 0 0 140px ${accent}cc;"></div>
          
          <!-- Dynamic High-Frequency Glitch Slices -->
          <div class="glitch-slice glitch-slice--1" style="background: ${accent}; box-shadow: 0 0 12px ${accent};"></div>
          <div class="glitch-slice glitch-slice--2" style="background: #ffffff; box-shadow: 0 0 10px #ffffff;"></div>
        </div>
      `;

    case 'case-a-thon':
    default:
      return `
        <div class="celestial-wrapper binary-stars-assembly">
          <div class="binary-orbit-wrapper">
            <!-- Active Stardust Accretion Bridge Transferring Energy -->
            <div class="accretion-bridge" style="background: linear-gradient(90deg, ${accent}99, rgba(255, 179, 0, 0.9)); box-shadow: 0 0 50px ${accent}, 0 0 25px #ffb300;"></div>
            
            <!-- Primary Royal Sapphire Star -->
            <div class="binary-star binary-star--primary" style="background: radial-gradient(circle at 35% 35%, #ffffff 0%, #80b3ff 35%, #0052cc 75%, #001a4d 100%); box-shadow: 0 0 110px ${accent}, 0 0 40px #ffffff;">
              <div class="star-lens-flare" style="background: radial-gradient(circle, #ffffff 0%, transparent 70%);"></div>
            </div>
            
            <!-- Secondary Molten Topaz Star -->
            <div class="binary-star binary-star--secondary" style="background: radial-gradient(circle at 35% 35%, #ffffff 0%, #ffe082 35%, #ff8f00 75%, #4d2600 100%); box-shadow: 0 0 95px #ffb300cc, 0 0 35px #ffe082;">
              <div class="star-lens-flare" style="background: radial-gradient(circle, #ffffff 0%, transparent 70%);"></div>
            </div>
          </div>
          
          <!-- Gravitational Orbit Trail Ripple -->
          <div class="orbit-trail" style="border-color: ${accent}66; box-shadow: 0 0 30px ${accent}33;"></div>
        </div>
      `;
  }
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * RIGHT HEMISPHERE: 6 Precision Holographic CAD Telemetry Blueprints
 * ─────────────────────────────────────────────────────────────────────────────
 */
function getRightHUDHTML(id, accent, paddedIndex) {
  switch (id) {
    case 'zero-day':
      return `
        <div class="hud-schematic-assembly">
          <svg class="hud-vector-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#00F0FF" stop-opacity="0.3"/>
              </linearGradient>
            </defs>
            
            <!-- Outer Geometric Calibration Ring -->
            <circle class="hud-rot-cw-slow" cx="220" cy="220" r="190" stroke="${accent}" stroke-width="1.5" stroke-dasharray="8 12" stroke-opacity="0.65"/>
            <circle class="hud-rot-ccw-mid" cx="220" cy="220" r="160" stroke="${accent}" stroke-width="2" stroke-opacity="0.85"/>
            
            <!-- Hexagonal Defense Fortress Shields -->
            <polygon class="hud-rot-cw-slow" points="220,70 345,142 345,298 220,370 95,298 95,142" stroke="url(#vaultGrad)" stroke-width="2" stroke-opacity="0.85"/>
            <polygon class="hud-rot-ccw-fast" points="220,105 315,160 315,280 220,335 125,280 125,160" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 6" stroke-opacity="0.6"/>
            
            <!-- Laser Radar Crosshair & Coordinate Grid -->
            <g class="hud-radar-pulse">
              <line x1="220" y1="20" x2="220" y2="420" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
              <line x1="20" y1="220" x2="420" y2="220" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
              <circle cx="220" cy="220" r="220" stroke="${accent}" stroke-width="0.5" stroke-opacity="0.2"/>
            </g>
            
            <!-- Rotating Laser Scanner Sweep -->
            <g class="hud-rot-cw-sweep">
              <line x1="220" y1="220" x2="220" y2="35" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="220" cy="35" r="5" fill="#ffffff" filter="drop-shadow(0 0 8px ${accent})"/>
            </g>
            
            <!-- Vault Core Lock & Vulnerability Beacon -->
            <circle class="hud-beacon-ping" cx="220" cy="220" r="22" fill="${accent}" fill-opacity="0.25" stroke="${accent}" stroke-width="2"/>
            <circle cx="220" cy="220" r="6" fill="#ffffff"/>
            
            <!-- Telemetry Hex Stream Display -->
            <text x="35" y="55" fill="${accent}" font-family="Space Mono" font-size="10" font-weight="bold" letter-spacing="1">CIPHER_MATRIX: 0x9F4C7A</text>
            <text x="35" y="72" fill="${accent}" font-family="Space Mono" font-size="8.5" fill-opacity="0.75">SHA3_512 // AES_GCM_256</text>
            <text x="35" y="88" fill="#00FFD1" font-family="Space Mono" font-size="8" font-weight="bold">TARGET_FIREWALL: LOCKED</text>
          </svg>
          
          <!-- Floating Frosted Glass Holo-Deck Terminal Card -->
          <div class="hud-data-callout" style="border-color: ${accent}66; box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${accent}22;">
            <div class="hud-data-callout__title" style="color: ${accent};">
              <span class="hud-data-callout__status-dot" style="background: ${accent}; box-shadow: 0 0 10px ${accent};"></span>
              <span>VAULT_FIREWALL_STATUS</span>
            </div>
            <div class="hud-data-callout__row"><span>ENCRYPTION:</span> <span>RSA-4096 / SHA-3</span></div>
            <div class="hud-data-callout__row"><span>EXPLOIT_VECTOR:</span> <span style="color: #00F0FF; font-weight: 700;">ADVERSARIAL_PROMPT</span></div>
            <div class="hud-data-callout__row"><span>DEFENSE_TIER:</span> <span style="color: #00FFD1; font-weight: 700;">UNBREACHED // LEVEL 5</span></div>
          </div>
        </div>
      `;

    case 'autopilot':
      return `
        <div class="hud-schematic-assembly">
          <svg class="hud-vector-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 3D Gimbal Orbital Navigation Planes -->
            <ellipse class="hud-orbit-wobble-1" cx="220" cy="220" rx="190" ry="70" stroke="${accent}" stroke-width="2" stroke-dasharray="10 8" stroke-opacity="0.75" transform="rotate(-28 220 220)"/>
            <ellipse class="hud-orbit-wobble-2" cx="220" cy="220" rx="150" ry="55" stroke="${accent}" stroke-width="2.5" stroke-opacity="0.9" transform="rotate(38 220 220)"/>
            <circle class="hud-rot-cw-veryslow" cx="220" cy="220" r="180" stroke="${accent}" stroke-width="1" stroke-opacity="0.35"/>
            
            <!-- Curving Spatial Flight Trajectory with Flowing Stardust Dash -->
            <path class="hud-stream-dash" d="M 40 350 Q 220 80 400 190" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-opacity="0.95" filter="drop-shadow(0 0 8px ${accent})"/>
            
            <!-- Autonomous Agent Nodes & Waypoint Beacons -->
            <circle class="hud-beacon-ping" cx="220" cy="180" r="7" fill="${accent}" filter="drop-shadow(0 0 10px ${accent})"/>
            <circle class="hud-beacon-ping" cx="400" cy="190" r="6" fill="#ffffff" style="animation-delay: 0.8s;"/>
            <circle class="hud-beacon-ping" cx="120" cy="260" r="5" fill="${accent}" style="animation-delay: 1.4s;"/>
            
            <!-- Neural Mesh Connection Filaments -->
            <line class="hud-stream-dash" x1="120" y1="260" x2="220" y2="180" stroke="${accent}" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.7"/>
            <line class="hud-stream-dash" x1="220" y1="180" x2="400" y2="190" stroke="${accent}" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.7"/>
            
            <!-- Telemetry Data Overlay -->
            <text x="35" y="55" fill="${accent}" font-family="Space Mono" font-size="10" font-weight="bold" letter-spacing="1">TRAJECTORY_CALC // Z-AXIS</text>
            <text x="35" y="72" fill="${accent}" font-family="Space Mono" font-size="8.5" fill-opacity="0.75">WAYPOINT_DELTA: +0.0042</text>
            <text x="35" y="88" fill="#FFA502" font-family="Space Mono" font-size="8" font-weight="bold">SWARM_SYNC: 16/16 NODES</text>
          </svg>
          
          <!-- Floating Frosted Glass Holo-Deck Terminal Card -->
          <div class="hud-data-callout" style="border-color: ${accent}66; box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${accent}22;">
            <div class="hud-data-callout__title" style="color: ${accent};">
              <span class="hud-data-callout__status-dot" style="background: ${accent}; box-shadow: 0 0 10px ${accent};"></span>
              <span>SWARM_TELEMETRY</span>
            </div>
            <div class="hud-data-callout__row"><span>ACTIVE_AGENTS:</span> <span>16 NEURAL NODES</span></div>
            <div class="hud-data-callout__row"><span>DECISION_ACCURACY:</span> <span style="color: #00FFD1; font-weight: 700;">99.4% VERIFIED</span></div>
            <div class="hud-data-callout__row"><span>LATENCY_SYNC:</span> <span style="color: #FFA502; font-weight: 700;">4MS REAL-TIME</span></div>
          </div>
        </div>
      `;

    case 'devlympics':
      return `
        <div class="hud-schematic-assembly">
          <svg class="hud-vector-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Concentric Launch Progress Rings -->
            <circle class="hud-rot-cw-slow" cx="220" cy="220" r="190" stroke="${accent}" stroke-width="2.5" stroke-opacity="0.8"/>
            <circle class="hud-rot-ccw-mid" cx="220" cy="220" r="155" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 10" stroke-opacity="0.6"/>
            <circle class="hud-rot-cw-fast" cx="220" cy="220" r="120" stroke="${accent}" stroke-width="2" stroke-opacity="0.9"/>
            
            <!-- Diamond Chronometer Frame -->
            <rect class="hud-rot-ccw-slow" x="145" y="145" width="150" height="150" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.65" transform="rotate(45 220 220)"/>
            
            <!-- High-Speed Sweep Radar Needle -->
            <g class="hud-rot-cw-sweep">
              <line x1="220" y1="220" x2="220" y2="30" stroke="${accent}" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 10px ${accent})"/>
              <circle cx="220" cy="30" r="5" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)"/>
            </g>
            
            <!-- Sprint Chronometer Quadrant Ticks -->
            <line x1="220" y1="25" x2="220" y2="65" stroke="${accent}" stroke-width="3.5"/>
            <line x1="415" y1="220" x2="375" y2="220" stroke="${accent}" stroke-width="2.5"/>
            <line x1="220" y1="415" x2="220" y2="375" stroke="${accent}" stroke-width="2.5"/>
            <line x1="25" y1="220" x2="65" y2="220" stroke="${accent}" stroke-width="2.5"/>
            
            <text x="202" y="55" fill="${accent}" font-family="Space Mono" font-size="12" font-weight="bold">T-24H</text>
            <text x="355" y="225" fill="${accent}" font-family="Space Mono" font-size="11">T-18H</text>
            <text x="202" y="395" fill="${accent}" font-family="Space Mono" font-size="11">T-12H</text>
            <text x="45" y="225" fill="${accent}" font-family="Space Mono" font-size="11">T-06H</text>
            
            <!-- Center Tachometer Beacon -->
            <circle class="hud-beacon-ping" cx="220" cy="220" r="26" fill="${accent}" fill-opacity="0.25" stroke="${accent}" stroke-width="2"/>
          </svg>
          
          <!-- Floating Frosted Glass Holo-Deck Terminal Card -->
          <div class="hud-data-callout" style="border-color: ${accent}66; box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${accent}22;">
            <div class="hud-data-callout__title" style="color: ${accent};">
              <span class="hud-data-callout__status-dot" style="background: ${accent}; box-shadow: 0 0 10px ${accent};"></span>
              <span>LAUNCH_COMMAND_HUD</span>
            </div>
            <div class="hud-data-callout__row"><span>COUNTDOWN:</span> <span>24.00 HOURS LIVE</span></div>
            <div class="hud-data-callout__row"><span>PIPELINE:</span> <span style="color: #14FFD8; font-weight: 700;">BUILD &rarr; DEMO &rarr; PITCH</span></div>
            <div class="hud-data-callout__row"><span>VC_MENTORS:</span> <span style="color: #FFB300; font-weight: 700;">TOP-TIER ACTIVE</span></div>
          </div>
        </div>
      `;

    case 'flow-in-flux':
      return `
        <div class="hud-schematic-assembly">
          <svg class="hud-vector-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Golden Spiral Logarithmic Curve with Laser Glow -->
            <path class="hud-spiral-flow" d="M 220 220 A 22 22 0 0 1 242 242 A 44 44 0 0 1 198 286 A 88 88 0 0 1 110 198 A 176 176 0 0 1 286 22 A 352 352 0 0 1 418 374" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-opacity="0.95" filter="drop-shadow(0 0 10px ${accent})"/>
            
            <!-- 12-Column Responsive Matrix Grid -->
            <rect class="hud-grid-pulse" x="35" y="35" width="370" height="370" stroke="${accent}" stroke-width="1.5" stroke-dasharray="8 8" stroke-opacity="0.45"/>
            <line x1="220" y1="35" x2="220" y2="405" stroke="${accent}" stroke-width="1" stroke-opacity="0.35"/>
            <line x1="35" y1="220" x2="405" y2="220" stroke="${accent}" stroke-width="1" stroke-opacity="0.35"/>
            
            <circle class="hud-rot-ccw-slow" cx="220" cy="220" r="160" stroke="${accent}" stroke-width="1.2" stroke-opacity="0.55"/>
            <circle class="hud-beacon-ping" cx="220" cy="220" r="8" fill="${accent}"/>
            
            <!-- Design System Metadata -->
            <text x="45" y="65" fill="${accent}" font-family="Space Mono" font-size="10" font-weight="bold" letter-spacing="1">&phi; RATIO: 1.61803398875</text>
            <text x="45" y="82" fill="${accent}" font-family="Space Mono" font-size="8.5" fill-opacity="0.75">GOLDEN_SECTION // GENERATIVE UI</text>
            <text x="45" y="98" fill="#FFF6DF" font-family="Space Mono" font-size="8" font-weight="bold">FIDELITY: ULTRA HIGH</text>
          </svg>
          
          <!-- Floating Frosted Glass Holo-Deck Terminal Card -->
          <div class="hud-data-callout" style="border-color: ${accent}66; box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${accent}22;">
            <div class="hud-data-callout__title" style="color: ${accent};">
              <span class="hud-data-callout__status-dot" style="background: ${accent}; box-shadow: 0 0 10px ${accent};"></span>
              <span>DESIGN_SYSTEM_MATRIX</span>
            </div>
            <div class="hud-data-callout__row"><span>FRAMEWORK:</span> <span>SPATIAL / GENERATIVE</span></div>
            <div class="hud-data-callout__row"><span>PALETTE:</span> <span style="color: ${accent}; font-weight: 700;">ACID LIME + MAGENTA</span></div>
            <div class="hud-data-callout__row"><span>AESTHETIC:</span> <span style="color: #FFF6DF; font-weight: 700;">STATE_OF_THE_ART</span></div>
          </div>
        </div>
      `;

    case 'hallucination-hunt':
      return `
        <div class="hud-schematic-assembly">
          <svg class="hud-vector-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Oscilloscope Scanline Frame -->
            <rect class="hud-scanline-frame" x="25" y="70" width="390" height="280" rx="12" stroke="${accent}" stroke-width="2" stroke-opacity="0.8"/>
            <line x1="25" y1="210" x2="415" y2="210" stroke="${accent}" stroke-width="1" stroke-dasharray="5 5" stroke-opacity="0.45"/>
            <line x1="220" y1="70" x2="220" y2="350" stroke="${accent}" stroke-width="1" stroke-dasharray="5 5" stroke-opacity="0.45"/>
            
            <!-- Dual Interlaced Truth vs Hallucination Waveforms -->
            <path class="hud-wave-stream-1" d="M 35 210 Q 80 120 125 210 T 220 210 T 315 210 T 405 210" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-opacity="0.95" filter="drop-shadow(0 0 8px ${accent})"/>
            <path class="hud-wave-stream-2" d="M 35 210 Q 70 260 105 210 T 180 140 T 270 280 T 350 160 T 405 210" stroke="#FFEB88" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.9" filter="drop-shadow(0 0 8px #FFEB88)"/>
            
            <circle class="hud-beacon-ping" cx="180" cy="140" r="7" fill="${accent}"/>
            <circle class="hud-beacon-ping" cx="270" cy="280" r="7" fill="#FFEB88" style="animation-delay: 0.6s;"/>
            
            <!-- Telemetry Diagnostics Readout -->
            <text x="40" y="100" fill="${accent}" font-family="Space Mono" font-size="10" font-weight="bold">ANOMALY_DELTA: +8.47%</text>
            <text x="40" y="116" fill="${accent}" font-family="Space Mono" font-size="8.5" fill-opacity="0.75">HALLUCINATION_PROB: 0.012</text>
            <text x="40" y="132" fill="#00FFD1" font-family="Space Mono" font-size="8" font-weight="bold">TRUTH_VERIFIER: OPTIMAL</text>
          </svg>
          
          <!-- Floating Frosted Glass Holo-Deck Terminal Card -->
          <div class="hud-data-callout" style="border-color: ${accent}66; box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${accent}22;">
            <div class="hud-data-callout__title" style="color: ${accent};">
              <span class="hud-data-callout__status-dot" style="background: ${accent}; box-shadow: 0 0 10px ${accent};"></span>
              <span>ADVERSARIAL_DIAGNOSTICS</span>
            </div>
            <div class="hud-data-callout__row"><span>ACCURACY_RATE:</span> <span style="color: #FFEB88; font-weight: 700;">98.8% CLEAN</span></div>
            <div class="hud-data-callout__row"><span>PROBES_FIRED:</span> <span>10,000 SYNTHETIC</span></div>
            <div class="hud-data-callout__row"><span>MODEL_STATE:</span> <span style="color: #00FFD1; font-weight: 700;">SECURED & ALIGNED</span></div>
          </div>
        </div>
      `;

    case 'case-a-thon':
    default:
      return `
        <div class="hud-schematic-assembly">
          <svg class="hud-vector-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Strategic Coordinate Grid -->
            <line x1="50" y1="370" x2="390" y2="370" stroke="${accent}" stroke-width="2"/>
            <line x1="50" y1="370" x2="50" y2="50" stroke="${accent}" stroke-width="2"/>
            
            <!-- Exponential ROI Growth Curve with Laser Trend Glow -->
            <polyline class="hud-trend-stream" points="60,350 130,300 200,230 280,140 370,70" fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="drop-shadow(0 0 12px ${accent})"/>
            
            <!-- Strategic Venture Star Nodes -->
            <circle class="hud-beacon-ping" cx="60" cy="350" r="6" fill="${accent}" style="animation-delay: 0.2s;"/>
            <circle class="hud-beacon-ping" cx="130" cy="300" r="6" fill="${accent}" style="animation-delay: 0.5s;"/>
            <circle class="hud-beacon-ping" cx="200" cy="230" r="6" fill="${accent}" style="animation-delay: 0.8s;"/>
            <circle class="hud-beacon-ping" cx="280" cy="140" r="7" fill="${accent}" style="animation-delay: 1.1s;"/>
            <circle class="hud-beacon-ping" cx="370" cy="70" r="9" fill="#ffffff" filter="drop-shadow(0 0 16px ${accent})" style="animation-delay: 1.4s;"/>
            
            <!-- Predictive Venture Projection Dashes -->
            <line class="hud-stream-dash" x1="60" y1="350" x2="200" y2="230" stroke="${accent}" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.7"/>
            <line class="hud-stream-dash" x1="130" y1="300" x2="370" y2="70" stroke="${accent}" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.7"/>
            
            <!-- Telemetry ROI Display -->
            <text x="65" y="55" fill="${accent}" font-family="Space Mono" font-size="11" font-weight="bold">ROI_PREDICT: +340% EXPONENTIAL</text>
            <text x="65" y="72" fill="${accent}" font-family="Space Mono" font-size="8.5" fill-opacity="0.75">MACRO_STRATEGY // STRATEGIC_AI</text>
          </svg>
          
          <!-- Floating Frosted Glass Holo-Deck Terminal Card -->
          <div class="hud-data-callout" style="border-color: ${accent}66; box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${accent}22;">
            <div class="hud-data-callout__title" style="color: ${accent};">
              <span class="hud-data-callout__status-dot" style="background: ${accent}; box-shadow: 0 0 10px ${accent};"></span>
              <span>VENTURE_STRATEGY_DECK</span>
            </div>
            <div class="hud-data-callout__row"><span>MARKET_TAM:</span> <span>$42.8B ENTERPRISE</span></div>
            <div class="hud-data-callout__row"><span>TRANSFORMATION:</span> <span style="color: #FFB300; font-weight: 700;">AI AUTOMATION</span></div>
            <div class="hud-data-callout__row"><span>EXECUTIVE_GRADE:</span> <span style="color: #00FFD1; font-weight: 700;">BOARD-READY</span></div>
          </div>
        </div>
      `;
  }
}
