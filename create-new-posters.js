import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public', 'images', 'projects');

// List of new projects that need posters
const newProjects = [
  'kia-bbb-poster.jpg',
  'mercedes-new-car-poster.jpg', 
  'medved123-poster.jpg',
  'murko-poster.jpg'
];

// Create placeholder posters (since we can't generate real images without video files)
// This will create simple text-based placeholder images
newProjects.forEach(posterName => {
  const posterPath = path.join(publicDir, posterName);
  
  // Create a minimal placeholder if it doesn't exist
  if (!fs.existsSync(posterPath)) {
    // For now, copy an existing poster as placeholder
    const existingPoster = path.join(publicDir, 'duster-poster.jpg');
    if (fs.existsSync(existingPoster)) {
      fs.copyFileSync(existingPoster, posterPath);
      console.log(`Created placeholder: ${posterName}`);
    } else {
      console.log(`Could not create placeholder for ${posterName} - source not found`);
    }
  } else {
    console.log(`Poster already exists: ${posterName}`);
  }
});

console.log('Poster generation complete!');
console.log('Note: These are placeholder posters. You should replace them with actual video screenshots.');