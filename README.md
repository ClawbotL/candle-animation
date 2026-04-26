# Burning Candle

An elegant, animated candle with realistic flame, wax drips, and ambient glow — built with pure HTML, CSS, and JavaScript.

**Open `index.html` in any modern browser to view.**

---

## Features

- **Realistic flame animation** — SVG-based flame with layered gradients, glow filter, and subtle sway
- **Candle body** — Wax texture with gradient shading, melt pool, and animated wax drips
- **Ambient glow** — Pulsing radial glow that responds to flame state
- **Smoke effect** — Particle-based smoke rises when candle is extinguished
- **Toggle interaction** — Click "Put Out" / "Light Candle" to toggle flame state
- **Responsive design** — Adapts candle size based on viewport (vh-based sizing)
- **Reduced motion support** — Respects `prefers-reduced-motion` for accessibility
- **Keyboard accessible** — Full keyboard navigation and focus states

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full |
| Firefox | 85+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 88+ | ✅ Full |

**Requirements:**
- CSS Custom Properties (variables)
- CSS Grid/Flexbox
- SVG support
- `prefers-reduced-motion` media query

---

## Accessibility

- **Keyboard navigation** — Toggle button is fully focusable and operable via keyboard (Enter/Space)
- **Reduced motion** — Disables animations for users with vestibular disorders when `prefers-reduced-motion: reduce` is set
- **Semantic HTML** — Uses `<button>` for interactive controls with proper focus-visible styles
- **Color contrast** — High contrast between interactive elements and background
- **ARIA** — Uses native `<button>` element (no ARIA attributes needed for simple toggle)

---

## Technical Details

- **No dependencies** — Pure vanilla HTML/CSS/JS
- **Single file** — All code contained in `index.html`
- **Google Fonts** — Uses Cormorant Garamond and DM Sans (loaded via Google Fonts CDN)
- **Responsive** — Uses `vh`, `dvh`, and `clamp()` for fluid sizing

---

## License

MIT
