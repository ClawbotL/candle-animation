# Burning Candle Animation — SPEC.md

## 1. Concept & Vision

A meditative, ambient candle experience that captures the quiet beauty of a real burning candle. The aesthetic is warm, intimate, and slightly cinematic — like a candle on a dark windowsill at night. Users can extinguish and relight the flame, creating a small moment of interaction that feels deliberate and satisfying.

## 2. Design Language

### Aesthetic Direction
Dark ambient scene with warm candlelight. Inspired by chiaroscuro painting and ASMR candle videos. The candle is the sole light source, casting a subtle ambient glow onto the surrounding darkness.

### Color Palette
| Role        | Color     | Hex       |
|-------------|-----------|-----------|
| Background  | Deep Night | `#0d0a0e` |
| Candle Wax  | Warm Ivory | `#f5e6d3` |
| Wax Shadow  | Soft Taupe | `#d4c4b0` |
| Flame Core  | Bright Ember | `#fff4d6` |
| Flame Mid   | Warm Orange | `#ff9d3a` |
| Flame Outer | Deep Orange | `#e85a1a` |
| Flame Edge  | Dark Red    | `#8b2500` |
| Wick       | Charcoal    | `#2a2016` |
| Glow       | Amber Light | `rgba(255, 180, 80, 0.15)` |
| Smoke      | Cool Gray   | `rgba(180, 170, 160, 0.4)` |
| Button BG  | Dark Slate  | `#1a1520` |
| Button Text | Warm Cream | `#f0e4d4` |

### Typography
- **Primary Font**: `'Cormorant Garamond', Georgia, serif` — elegant, slightly classical
- **Button Font**: `'DM Sans', system-ui, sans-serif` — clean, legible at small sizes
- **Font Sizes**: Button text 14px, minimal UI — the candle is the focus

### Spatial System
- Candle centered vertically and horizontally
- Candle occupies ~40-50% of viewport height on desktop
- Minimal UI: two buttons positioned below the candle, centered
- Generous negative space around the candle to emphasize the glow

### Motion Philosophy
- **Organic over mechanical**: All motion uses easing curves that feel natural, not robotic
- **Layered animation**: Multiple simultaneous animations create complexity (flame sway, intensity flicker, glow pulse)
- **State transitions**: Extinguishing and lighting are deliberate, ~800ms transitions with satisfying easing
- **Ambient life**: Even when "still," the candle breathes — subtle, continuous micro-movements

### Visual Assets
- No external images or icons
- All visuals constructed with CSS (gradients, box-shadows, border-radius) and inline SVG
- Decorative: subtle radial glow behind flame, wax drips as CSS shapes

## 3. Layout & Structure

### Page Structure
```
[Full Viewport — Dark Background]
    [Ambient Glow Layer — radial gradient behind candle]
    [Candle Assembly — centered]
        [Smoke/Smolder Particles — positioned above flame]
        [Flame — SVG/CSS composite]
        [Wick — small dark element]
        [Wax Body — gradient-filled rectangle]
        [Wax Drips — CSS pseudo-elements]
        [Melt Pool — ellipse at top of candle]
    [Controls — two minimal buttons below]
```

### Responsive Strategy
- Candle scales proportionally: `min(40vh, 300px)` height on mobile, `max(50vh, 400px)` on desktop
- Buttons stack vertically on very narrow screens (<360px)
- Glow radius scales with candle size
- Touch targets minimum 44px for mobile accessibility

## 4. Features & Interactions

### Core Features

#### Burning State (Default)
- Flame flickers with organic multi-layer animation (position sway + intensity pulse + color shift)
- Wick tip glows with ember orange
- Subtle ambient glow pulses slowly (~4s cycle)
- Wax drips animate downward very slowly (CSS keyframes, ~20s cycle)
- Smoke wisps (when extinguished) are hidden

#### Extinguish Interaction
- Trigger: Click "Put Out" button
- Flame fades out over 600ms with ease-out curve
- Wick ember fades from orange → dark over 400ms (starts at 200ms)
- Smoke particles appear at wick position, float upward with random drift, fade over 2s
- Ambient glow dims over 800ms
- Button text changes to "Light Candle"

#### Re-light Interaction
- Trigger: Click "Light Candle" button
- Wick ember glows from dark → orange over 300ms
- Flame grows from wick tip over 500ms with ease-out (scale 0 → 1 + opacity)
- Ambient glow returns to full over 600ms
- Button text changes to "Put Out"

### Edge Cases
- Clicking buttons rapidly: debounced — state changes complete before accepting new input
- Smoke particles: auto-removed from DOM after animation completes to prevent memory accumulation
- Reduced motion preference: respect `prefers-reduced-motion` — flame becomes static, transitions instant

## 5. Component Inventory

### Candle Body
- **Appearance**: Rounded rectangle, ivory gradient (lighter left edge, darker right for 3D depth)
- **Size**: Width ~40% of height, height ~3x width
- **States**: Default only (static element)
- **Details**: Subtle inner shadow at top for depth

### Wax Drips (3 drips)
- **Appearance**: Teardrop shapes along top edge of candle body
- **Animation**: Each drip animates downward over 15-25s (staggered start times)
- **States**: Animating / reset (on page load, drips start mid-animation for immediate visual interest)

### Flame
- **Appearance**: SVG teardrop shape with layered gradients (core white → mid orange → outer dark)
- **Size**: ~15-20% of candle height
- **States**: Burning (default), Extinguishing (fade out), Lit (grow in)
- **Animation layers**:
  - Sway: `translateX` oscillation, 2-4s random cycle
  - Flicker: `scaleY` + `scaleX` micro-pulses, 0.5-2s cycle
  - Color shift: hue-rotate subtle variation, 3s cycle
  - Glow intensity: box-shadow pulse, 4s cycle

### Wick
- **Appearance**: Small dark rounded rectangle, slightly darker than flame color
- **Position**: Centered at top of candle body, ~8px below flame base
- **States**: Burning (tip glows orange), Extinguished (no glow), Relighting (ember animation)

### Smoke Particles
- **Appearance**: Small translucent circles/ellipses, gray-white gradient
- **Behavior**: Spawn at wick position, float upward with `translateY` + slight `translateX` drift, fade out
- **Lifecycle**: Created on extinguish, auto-removed after 2.5s
- **Count**: 8-12 particles per extinguish event

### Control Buttons
- **Appearance**: Rounded pill shape, dark semi-transparent background, warm cream text
- **Size**: Padding 12px 24px, font-size 14px
- **Position**: Centered below candle, gap 16px between buttons
- **States**:
  - Default: Dark background, cream text
  - Hover: Slightly lighter background, subtle glow
  - Active: Pressed-in effect (scale 0.97)
  - Disabled: N/A (always interactive)

### Ambient Glow
- **Appearance**: Large radial gradient centered on flame position
- **Color**: Amber-orange fading to transparent
- **Size**: ~3x candle width radius
- **States**: Full (burning), Dim (extinguished), Pulsing (subtle 4s animation when burning)

## 6. Technical Approach

### Stack
- Single `index.html` file
- Vanilla CSS with CSS custom properties for theming
- Vanilla JavaScript for state management and DOM manipulation
- Inline SVG for flame shape
- No external dependencies or images

### Architecture
```
CSS Variables (colors, timing, sizing)
├── Global Reset + Body Styles
├── Candle Container (centered flex)
├── Candle Body (gradient, drips)
├── Flame (SVG with CSS animations)
├── Wick (positioned element)
├── Smoke (dynamically created particles)
├── Glow (pseudo-element or div)
└── Buttons (minimal UI)

JavaScript State Machine
├── state: 'burning' | 'extinguished'
├── toggleCandle() — primary interaction handler
├── extinguish() — orchestrator: flame fade → smoke spawn → state update
├── light() — orchestrator: ember glow → flame grow → state update
├── spawnSmokeParticles() — creates and animates smoke DOM elements
└── Debounce/throttle on rapid clicks
```

### Performance Targets
- 60fps for all CSS animations (GPU-accelerated properties where possible)
- Flame animations use `transform` and `opacity` only (no layout-triggering properties)
- Smoke particles are DOM elements but limited in count and auto-removed
- `will-change: transform` on flame element to hint browser optimization

### Accessibility
- `prefers-reduced-motion`: disable CSS animations, instant state transitions
- Buttons have clear focus states and labels
- No flashing or high-contrast strobing (all motion is slow and organic)
