const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Try with regular chrome-headless-shell instead
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  
  const results = [];
  
  const test = (name, passed, details = '') => {
    results.push({ name, passed, details });
    console.log(`${passed ? '✅ PASS' : '❌ FAIL'}: ${name}${details ? '\n   ' + details : ''}`);
  };

  // Test 1: Page loads without errors
  let page;
  try {
    page = await browser.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    
    if (errors.length === 0) {
      test('Page loads without errors', true);
    } else {
      test('Page loads without errors', false, errors.join('; '));
    }
  } catch (e) {
    test('Page loads without errors', false, e.message);
  }

  // Test 2: Flame is visible on initial load
  try {
    const flame = await page.$('#flame');
    const isVisible = await flame.isVisible();
    const hasExtinguished = await flame.evaluate(el => el.classList.contains('extinguished'));
    test('Flame is visible on initial load', isVisible && !hasExtinguished, 
      `visible=${isVisible}, has extinguished class=${hasExtinguished}`);
  } catch (e) {
    test('Flame is visible on initial load', false, e.message);
  }

  // Test 3: "Put Out" button extinguishes the flame
  try {
    await page.click('#toggleBtn');
    await page.waitForTimeout(800);
    const hasExtinguished = await page.$eval('#flame', el => el.classList.contains('extinguished'));
    const btnText = await page.$eval('#toggleBtn', el => el.textContent);
    test('"Put Out" button extinguishes the flame', hasExtinguished,
      `has extinguished class=${hasExtinguished}, button text="${btnText}"`);
  } catch (e) {
    test('"Put Out" button extinguishes the flame', false, e.message);
  }

  // Test 4: "Light Candle" button reignites the flame
  try {
    await page.click('#toggleBtn');
    await page.waitForTimeout(800);
    const stillExtinguished = await page.$eval('#flame', el => el.classList.contains('extinguished'));
    const btnText = await page.$eval('#toggleBtn', el => el.textContent);
    test('"Light Candle" button reignites the flame', !stillExtinguished,
      `still has extinguished class=${stillExtinguished}, button text="${btnText}"`);
  } catch (e) {
    test('"Light Candle" button reignites the flame', false, e.message);
  }

  // Test 5: Smoke particles are spawned after extinguishing
  try {
    const isBurning = await page.$eval('#flame', el => !el.classList.contains('extinguished'));
    if (!isBurning) {
      await page.click('#toggleBtn');
      await page.waitForTimeout(800);
    }
    
    await page.click('#toggleBtn');
    await page.waitForTimeout(300);
    const smokeCount = await page.$$eval('#smokeContainer .smoke-particle', els => els.length);
    test('Smoke particles are spawned after extinguishing', smokeCount > 0,
      `found ${smokeCount} smoke particles`);
  } catch (e) {
    test('Smoke particles are spawned after extinguishing', false, e.message);
  }

  // Test 6: No console errors
  try {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.reload();
    await page.waitForTimeout(500);
    test('No console errors', errors.length === 0, errors.length > 0 ? errors.join('; ') : '');
  } catch (e) {
    test('No console errors', false, e.message);
  }

  // Test 7a: Responsive layout - desktop
  try {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForTimeout(500);
    const candleVisible = await page.$eval('.candle-container', el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    test('Responsive layout - desktop (1280x800)', candleVisible);
  } catch (e) {
    test('Responsive layout - desktop (1280x800)', false, e.message);
  }

  // Test 7b: Responsive layout - mobile
  try {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForTimeout(500);
    const candleVisible = await page.$eval('.candle-container', el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    test('Responsive layout - mobile (375x667)', candleVisible);
  } catch (e) {
    test('Responsive layout - mobile (375x667)', false, e.message);
  }

  await browser.close();

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log('\n═══════════════════════════════════════');
  console.log(`SUMMARY: ${passed} passed, ${failed} failed out of ${results.length} tests`);
  console.log('═══════════════════════════════════════');
  
  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter(r => !r.passed).forEach(r => console.log(`  - ${r.name}`));
  }

  process.exit(failed > 0 ? 1 : 0);
})();
