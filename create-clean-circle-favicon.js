import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImage = path.join(__dirname, 'public', 'images', 'projects', 'profile.jpg');
const outputDir = path.join(__dirname, 'public');

const sizes = [16, 32, 48, 64, 128, 256];

const createCircularFavicon = async (size) => {
  const outputPath = path.join(outputDir, `favicon-${size}.png`);

  // Create a circular mask
  const circle = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/>
    </svg>`
  );

  await sharp(sourceImage)
    .resize(size, size, {
      fit: 'cover',
      position: 'center'
    })
    .composite([
      {
        input: circle,
        blend: 'dest-in'
      }
    ])
    .toFile(outputPath);

  console.log(`Created favicon-${size}.png`);
};

// Create all sizes
Promise.all(sizes.map(createCircularFavicon))
  .then(() => {
    // Create default favicon.png (32x32)
    return sharp(path.join(outputDir, 'favicon-32.png'))
      .toFile(path.join(outputDir, 'favicon.png'));
  })
  .then(() => {
    console.log('All favicons created successfully!');
  })
  .catch(err => {
    console.error('Error creating favicons:', err);
  });
