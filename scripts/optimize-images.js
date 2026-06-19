/**
 * Simple image optimizer script using sharp if available.
 * Run: `node scripts/optimize-images.js` (install sharp first: `npm i sharp`)
 */
const fs = require('fs');
const path = require('path');

async function run() {
  const sharpAvailable = (() => {
    try { require.resolve('sharp'); return true; } catch { return false; }
  })();

  const src = path.join(__dirname, '..', 'public');
  const files = fs.readdirSync(src).filter(f => /png|jpg|jpeg$/i.test(f));
  if (!sharpAvailable) {
    console.log('sharp not installed. Install with `npm i sharp` to enable optimization.');
    console.log('Files found:', files);
    return;
  }

  const sharp = require('sharp');
  for (const file of files) {
    const inPath = path.join(src, file);
    const outName = path.basename(file, path.extname(file)) + '.webp';
    const outPath = path.join(src, outName);
    console.log('Optimizing', inPath, '->', outPath);
    await sharp(inPath).resize(800, 800, { fit: 'cover' }).webp({ quality: 85 }).toFile(outPath);
  }
  console.log('Done');
}

run().catch(err => { console.error(err); process.exit(1); });
