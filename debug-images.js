// Script de débogage pour tester les conversions d'images
// Utilisez ce script dans la console du navigateur

// Test de conversion SVG vers PNG
const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <rect width="100" height="100" fill="#4F46E5"/>
  <circle cx="50" cy="50" r="30" fill="white"/>
  <text x="50" y="55" text-anchor="middle" fill="#4F46E5" font-size="14">TEST</text>
</svg>`;

console.log('Test SVG content:', testSvg);

// Test de création d'image
function testImageConversion() {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  
  // Dessiner un rectangle rouge
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, 100, 100);
  
  // Dessiner un cercle blanc
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, 2 * Math.PI);
  ctx.fill();
  
  // Convertir en data URL
  const dataUrl = canvas.toDataURL('image/png');
  console.log('Generated PNG data URL (first 100 chars):', dataUrl.substring(0, 100));
  
  // Créer une image pour vérifier
  const img = new Image();
  img.onload = () => {
    console.log('Image loaded successfully:', img.width, 'x', img.height);
  };
  img.onerror = () => {
    console.error('Error loading generated image');
  };
  img.src = dataUrl;
  
  return dataUrl;
}

// Exécuter le test
const testResult = testImageConversion();
console.log('Test completed. Check for any errors above.');

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testImageConversion, testSvg };
} 