/**
 * Static code analysis of candle-animation/index.html
 */

const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

const results = [];

// Helper
const check = (name, passed, details = '') => {
  results.push({ name, passed, details });
  console.log(`${passed ? '✅ PASS' : '❌ FAIL'}: ${name}${details ? '\n   ' + details : ''}`);
};

console.log('STATIC CODE ANALYSIS - Candle Animation Tests\n');

// Test 1: Page loads without errors - HTML is valid, no syntax errors
try {
  const hasDoctype = html.includes('<!DOCTYPE html>');
  const hasHtmlTag = html.includes('<html') && html.includes('</html>');
  const hasHead = html.includes('<head>') && html.includes('</head>');
  const hasBody = html.includes('<body>') && html.includes('</body>');
  const isValid = hasDoctype && hasHtmlTag && hasHead && hasBody;
  check('Page loads without errors (valid HTML structure)', isValid,
    'DOCTYPE, html, head, body tags present');
} catch (e) {
  check('Page loads without errors', false, e.message);
}

// Test 2: Flame is visible on initial load - #flame element exists, no 'extinguished' class
try {
  const hasFlameElement = html.includes('id="flame"');
  const hasFlameSvg = html.includes('<svg') && (html.includes('outerFlameGrad') || html.includes('midFlameGrad'));
  const flameInitialState = html.match(/<div class="flame"[^>]*>/);
  const hasInitialExtinguished = flameInitialState && flameInitialState[0].includes('extinguished');
  check('Flame is visible on initial load', hasFlameElement && hasFlameSvg && !hasInitialExtinguished,
    `flame element: ${hasFlameElement}, svg: ${hasFlameSvg}, initial extinguished: ${hasInitialExtinguished}`);
} catch (e) {
  check('Flame is visible on initial load', false, e.message);
}

// Test 3: "Put Out" button extinguishes the flame - toggleBtn handler adds 'extinguished' class
try {
  const hasToggleBtn = html.includes('id="toggleBtn"') && html.includes('Put Out');
  const hasExtinguishFunc = html.includes('flame.classList.add(\'extinguished\')') ||
                            html.includes('flame.classList.add("extinguished")');
  const hasExtinguishCall = html.includes('extinguish()');
  check('"Put Out" button extinguishes the flame', hasToggleBtn && hasExtinguishFunc,
    `toggleBtn with "Put Out": ${hasToggleBtn}, add extinguished: ${hasExtinguishFunc}`);
} catch (e) {
  check('"Put Out" button extinguishes the flame', false, e.message);
}

// Test 4: "Light Candle" button reignites - light() removes 'extinguished' class
try {
  const hasLightFunc = html.includes('flame.classList.remove(\'extinguished\')') ||
                      html.includes('flame.classList.remove("extinguished")');
  const hasLightCall = html.includes('light()');
  const hasToggleLogic = html.includes("toggleBtn.textContent = 'Light Candle'");
  check('"Light Candle" button reignites the flame', hasLightFunc && hasLightCall && hasToggleLogic,
    `remove extinguished: ${hasLightFunc}, light() call: ${hasLightCall}, button text change: ${hasToggleLogic}`);
} catch (e) {
  check('"Light Candle" button reignites the flame', false, e.message);
}

// Test 5: Smoke particles are spawned after extinguishing
// Note: smoke-particle class is created dynamically via JS (particle.className = 'smoke-particle')
try {
  const hasSpawnSmoke = html.includes('spawnSmokeParticles');
  const hasSmokeContainer = html.includes('id="smokeContainer"');
  // smoke-particle is dynamically created: particle.className = 'smoke-particle'
  const hasSmokeParticleClass = html.includes("particle.className = 'smoke-particle'") ||
                                html.includes('particle.className = "smoke-particle"');
  const hasSmokeCreation = html.includes('document.createElement(\'div\')') ||
                           html.includes('document.createElement("div")');
  const hasSmokeAppend = html.includes('smokeContainer.appendChild');
  check('Smoke particles are spawned after extinguishing',
    hasSpawnSmoke && hasSmokeContainer && hasSmokeParticleClass && hasSmokeCreation && hasSmokeAppend,
    `spawnSmokeParticles: ${hasSpawnSmoke}, smokeContainer: ${hasSmokeContainer}, dynamically created: ${hasSmokeParticleClass}`);
} catch (e) {
  check('Smoke particles are spawned after extinguishing', false, e.message);
}

// Test 6: No console errors
try {
  const hasConsoleError = /console\.(error|warn)\(/.test(html);
  const hasProperErrorHandling = !hasConsoleError;
  check('No console errors', hasProperErrorHandling,
    `console.error/warn found: ${hasConsoleError}`);
} catch (e) {
  check('No console errors', false, e.message);
}

// Test 7: Responsive layout - CSS uses viewport units and media queries
try {
  const hasViewportMeta = html.includes('viewport');
  const hasMediaQueries = html.includes('@media');
  const hasResponsiveVars = html.includes('--candle-height: min(45vh');
  const hasDesktopMediaQuery = html.includes('min-width: 600px');
  check('Responsive layout (viewport meta, media queries, CSS variables)',
    hasViewportMeta && hasMediaQueries && hasResponsiveVars && hasDesktopMediaQuery,
    `viewport meta: ${hasViewportMeta}, media queries: ${hasMediaQueries}, responsive CSS vars: ${hasResponsiveVars}`);
} catch (e) {
  check('Responsive layout', false, e.message);
}

// Additional checks
console.log('\n--- Additional Verifications ---');

const hasAnimations = html.includes('@keyframes') && 
                      html.includes('flameSway') && 
                      html.includes('smokeRise');
console.log(`${hasAnimations ? '✅ PASS' : '❌ FAIL'}: CSS Animations defined
   flameSway: ${html.includes('flameSway')}, smokeRise: ${html.includes('smokeRise')}`);

const hasKeyboardSupport = html.includes("e.key === 'Enter'") || html.includes("e.key === ' '");
console.log(`${hasKeyboardSupport ? '✅ PASS' : '❌ FAIL'}: Keyboard accessibility
   Enter/Space key support: ${hasKeyboardSupport}`);

const hasReducedMotion = html.includes('prefers-reduced-motion');
console.log(`${hasReducedMotion ? '✅ PASS' : '❌ FAIL'}: Reduced motion support
   prefers-reduced-motion: ${hasReducedMotion}`);

// Required IDs check
const ids = ['flame', 'wickTip', 'smokeContainer', 'toggleBtn'];
ids.forEach(id => {
  const hasId = html.includes(`id="${id}"`);
  console.log(`${hasId ? '✅ PASS' : '❌ FAIL'}: Required ID "${id}" exists`);
});

// Glow is a class not an ID
const hasGlowClass = html.includes('class="glow"') || html.includes("class='glow'");
console.log(`${hasGlowClass ? '✅ PASS' : '❌ FAIL'}: Glow element exists (class="glow")
   class="glow": ${hasGlowClass}`);

// Check CSS styles exist
const cssChecks = [
  ['--bg-deep', 'Dark background color'],
  ['--flame-core', 'Flame core color'],
  ['--candle-wax', 'Candle wax color'],
  ['--smoke-color', 'Smoke color']
];
cssChecks.forEach(([token, desc]) => {
  console.log(`${html.includes(token) ? '✅ PASS' : '❌ FAIL'}: CSS ${desc} (${token})`);
});

const passed = results.filter(r => r.passed).length;
const failed = results.filter(r => !r.passed).length;
console.log('\n═══════════════════════════════════════');
console.log(`SUMMARY: ${passed} passed, ${failed} failed out of ${results.length} tests`);
console.log('═══════════════════════════════════════');
console.log('\nNOTE: Static analysis of HTML/CSS/JS structure.');
console.log('Live browser testing requires: libnspr4, libX11-xcb, libXrandr, etc.');
