import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public', 'images', 'projects');

// List of posters to convert to horizontal
const postersToConvert = [
  'kia-bbb-poster.png',
  'mercedes-new-car-poster.png',
  'classic-mercedes-poster.png',
  'murko-poster.png'
];

const targetAspectRatio = 16 / 9; // 16:9 horizontal format

postersToConvert.forEach(posterName => {
  const inputPath = path.join(publicDir, posterName);
  const outputPath = path.join(publicDir, posterName.replace('.png', '-horizontal.png'));
  
  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${posterName}`);
    return;
  }

  sharp(inputPath)
    .metadata()
    .then(metadata => {
      const { width, height } = metadata;
      const currentRatio = width / height;
      
      let newWidth, newHeight;
      
      if (currentRatio > targetAspectRatio) {
        // Image is already horizontal or too wide
        newWidth = width;
        newHeight = Math.round(width / targetAspectRatio);
      } else {
        // Image is vertical or too tall
        newHeight = height;
        newWidth = Math.round(height * targetAspectRatio);
      }
      
      return sharp(inputPath)
        .resize(newWidth, newHeight, {
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);
    })
    .then(() => {
      console.log(`Converted ${posterName} to horizontal format`);
      // Replace original with horizontal version
      fs.copyFileSync(outputPath, inputPath);
      fs.unlinkSync(outputPath);
    })
    .catch(err => {
      console.error(`Error converting ${posterName}:`, err);
    });
});