# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] - 2026-04-26

### Added

- **Candle animation** — SVG-based flame with realistic layered gradients (core, mid, outer, edge colors)
- **Flame effects** — Glow filter, sway animation, flicker animation, and color pulsing
- **Wick** — Gradient wick with glowing ember tip that responds to flame state
- **Candle body** — Textured wax appearance with gradient shading and realistic shadows
- **Melt pool** — Animated wax pool at the top of the candle
- **Wax drips** — Three animated wax drips with staggered timing
- **Ambient glow** — Radial glow behind the candle that pulses and dims when extinguished
- **Smoke particles** — Particle-based smoke effect when candle is extinguished
- **Toggle interaction** — Button to light/extinguish candle with smooth transitions
- **Responsive design** — Viewport-relative sizing that adapts from mobile to desktop
- **Reduced motion support** — Respects `prefers-reduced-motion` for accessibility
- **Keyboard accessibility** — Full keyboard navigation with visible focus states
- **Typography** — Google Fonts (Cormorant Garamond, DM Sans) with `preconnect` optimization
- **SPEC.md** — Design specification document

### Technical

- Pure vanilla HTML, CSS, and JavaScript — no dependencies
- Single-file architecture (`index.html`)
- CSS custom properties for theming
- Hardware-accelerated animations (`will-change`, `transform`)
- IIFE-scoped JavaScript to avoid global pollution
