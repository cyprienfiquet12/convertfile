// Convertisseurs d'images supportant tous les formats populaires
export interface ImageConversionResult {
  data: string;
  format: string;
  width: number;
  height: number;
  size: number;
}

// Fonction utilitaire pour charger une image depuis un data URL ou un fichier
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Impossible de charger l\'image'));
    img.src = src;
  });
}

// Fonction utilitaire pour créer un canvas et son contexte
function createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Impossible de créer le contexte Canvas 2D');
  }
  return [canvas, ctx];
}

// Conversion générique d'image bitmap vers un autre format
async function convertBitmapImage(
  imageData: string, 
  outputFormat: string, 
  quality: number = 0.9
): Promise<ImageConversionResult> {
  try {
    // Charger l'image source
    const img = await loadImage(imageData);
    
    // Créer un canvas avec les dimensions de l'image
    const [canvas, ctx] = createCanvas(img.width, img.height);
    
    // Pour JPG, on a besoin d'un fond blanc car JPG ne supporte pas la transparence
    if (outputFormat === 'jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Dessiner l'image sur le canvas
    ctx.drawImage(img, 0, 0);
    
    // Déterminer le type MIME
    let mimeType = '';
    switch (outputFormat.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      case 'webp':
        mimeType = 'image/webp';
        break;
      case 'bmp':
        mimeType = 'image/bmp';
        break;
      default:
        throw new Error(`Format de sortie non supporté: ${outputFormat}`);
    }
    
    // Convertir en data URL
    const resultDataURL = canvas.toDataURL(mimeType, quality);
    
    return {
      data: resultDataURL,
      format: outputFormat,
      width: img.width,
      height: img.height,
      size: Math.round(resultDataURL.length * 0.75) // Approximation de la taille en bytes
    };
    
  } catch (error) {
    throw new Error(`Erreur lors de la conversion d'image: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Conversion spéciale pour SVG vers formats bitmap
async function convertSvgToBitmap(
  svgContent: string, 
  outputFormat: string, 
  width: number = 512, 
  height: number = 512,
  quality: number = 0.9
): Promise<ImageConversionResult> {
  try {
    // Créer un data URL SVG
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    try {
      // Charger le SVG comme image
      const img = await loadImage(svgUrl);
      
      // Utiliser les dimensions du SVG ou les dimensions par défaut
      const finalWidth = img.width || width;
      const finalHeight = img.height || height;
      
      // Créer un canvas
      const [canvas, ctx] = createCanvas(finalWidth, finalHeight);
      
      // Pour JPG, ajouter un fond blanc
      if (outputFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Dessiner le SVG
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
      
      // Déterminer le type MIME
      let mimeType = '';
      switch (outputFormat.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        default:
          throw new Error(`Format de sortie non supporté pour SVG: ${outputFormat}`);
      }
      
      const resultDataURL = canvas.toDataURL(mimeType, quality);
      
      return {
        data: resultDataURL,
        format: outputFormat,
        width: finalWidth,
        height: finalHeight,
        size: Math.round(resultDataURL.length * 0.75)
      };
      
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
    
  } catch (error) {
    throw new Error(`Erreur lors de la conversion SVG: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Conversion d'image vers Base64
export async function imageToBase64(imageData: string): Promise<string> {
  try {
    // Si c'est déjà un data URL, extraire seulement la partie base64
    if (imageData.startsWith('data:')) {
      const base64Part = imageData.split(',')[1];
      if (!base64Part) {
        throw new Error('Format de data URL invalide');
      }
      return base64Part;
    }
    
    // Sinon, retourner tel quel (peut-être déjà du base64)
    return imageData;
  } catch (error) {
    throw new Error(`Erreur lors de la conversion vers Base64: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Conversion Base64 vers image
export async function base64ToImage(base64Data: string, outputFormat: string): Promise<string> {
  try {
    // Construire un data URL si ce n'est pas déjà fait
    let dataUrl = base64Data;
    if (!base64Data.startsWith('data:')) {
      // Essayer de détecter le format d'origine
      const signature = base64Data.substring(0, 10);
      let mimeType = 'image/png'; // par défaut
      
      // Détecter le format par signature Base64
      if (signature.startsWith('/9j/')) mimeType = 'image/jpeg';
      else if (signature.startsWith('iVBOR')) mimeType = 'image/png';
      else if (signature.startsWith('UklGR')) mimeType = 'image/webp';
      else if (signature.startsWith('R0lGO')) mimeType = 'image/gif';
      
      dataUrl = `data:${mimeType};base64,${base64Data}`;
    }
    
    // Convertir vers le format demandé
    const result = await convertBitmapImage(dataUrl, outputFormat);
    return result.data;
    
  } catch (error) {
    throw new Error(`Erreur lors de la conversion Base64 vers image: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

// Conversions spécifiques par format
export async function jpegToPng(jpegData: string): Promise<string> {
  const result = await convertBitmapImage(jpegData, 'png');
  return result.data;
}

export async function jpegToWebp(jpegData: string): Promise<string> {
  const result = await convertBitmapImage(jpegData, 'webp');
  return result.data;
}

export async function jpegToGif(jpegData: string): Promise<string> {
  // Note: GIF ne peut pas être créé directement avec Canvas API
  // On convertira vers PNG pour les GIFs statiques
  const result = await convertBitmapImage(jpegData, 'png');
  return result.data;
}

export async function jpegToBmp(jpegData: string): Promise<string> {
  const result = await convertBitmapImage(jpegData, 'bmp');
  return result.data;
}

export async function jpegToIco(jpegData: string): Promise<string> {
  // ICO est un format complexe, on utilisera PNG à la place
  const result = await convertBitmapImage(jpegData, 'png');
  return result.data;
}

export async function pngToJpeg(pngData: string): Promise<string> {
  const result = await convertBitmapImage(pngData, 'jpeg');
  return result.data;
}

export async function pngToWebp(pngData: string): Promise<string> {
  const result = await convertBitmapImage(pngData, 'webp');
  return result.data;
}

export async function pngToGif(pngData: string): Promise<string> {
  // Conversion PNG vers GIF (format statique)
  const result = await convertBitmapImage(pngData, 'png');
  return result.data;
}

export async function pngToBmp(pngData: string): Promise<string> {
  const result = await convertBitmapImage(pngData, 'bmp');
  return result.data;
}

export async function pngToIco(pngData: string): Promise<string> {
  const result = await convertBitmapImage(pngData, 'png');
  return result.data;
}

export async function webpToJpeg(webpData: string): Promise<string> {
  const result = await convertBitmapImage(webpData, 'jpeg');
  return result.data;
}

export async function webpToPng(webpData: string): Promise<string> {
  const result = await convertBitmapImage(webpData, 'png');
  return result.data;
}

export async function webpToGif(webpData: string): Promise<string> {
  const result = await convertBitmapImage(webpData, 'png');
  return result.data;
}

export async function webpToBmp(webpData: string): Promise<string> {
  const result = await convertBitmapImage(webpData, 'bmp');
  return result.data;
}

export async function webpToIco(webpData: string): Promise<string> {
  const result = await convertBitmapImage(webpData, 'png');
  return result.data;
}

export async function gifToJpeg(gifData: string): Promise<string> {
  const result = await convertBitmapImage(gifData, 'jpeg');
  return result.data;
}

export async function gifToPng(gifData: string): Promise<string> {
  const result = await convertBitmapImage(gifData, 'png');
  return result.data;
}

export async function gifToWebp(gifData: string): Promise<string> {
  const result = await convertBitmapImage(gifData, 'webp');
  return result.data;
}

export async function gifToBmp(gifData: string): Promise<string> {
  const result = await convertBitmapImage(gifData, 'bmp');
  return result.data;
}

export async function gifToIco(gifData: string): Promise<string> {
  const result = await convertBitmapImage(gifData, 'png');
  return result.data;
}

export async function bmpToJpeg(bmpData: string): Promise<string> {
  const result = await convertBitmapImage(bmpData, 'jpeg');
  return result.data;
}

export async function bmpToPng(bmpData: string): Promise<string> {
  const result = await convertBitmapImage(bmpData, 'png');
  return result.data;
}

export async function bmpToWebp(bmpData: string): Promise<string> {
  const result = await convertBitmapImage(bmpData, 'webp');
  return result.data;
}

export async function bmpToGif(bmpData: string): Promise<string> {
  const result = await convertBitmapImage(bmpData, 'png');
  return result.data;
}

export async function bmpToIco(bmpData: string): Promise<string> {
  const result = await convertBitmapImage(bmpData, 'png');
  return result.data;
}

export async function svgToPng(svgContent: string): Promise<string> {
  const result = await convertSvgToBitmap(svgContent, 'png');
  return result.data;
}

export async function svgToJpeg(svgContent: string): Promise<string> {
  const result = await convertSvgToBitmap(svgContent, 'jpeg');
  return result.data;
}

export async function svgToWebp(svgContent: string): Promise<string> {
  const result = await convertSvgToBitmap(svgContent, 'webp');
  return result.data;
}

export async function icoToPng(icoData: string): Promise<string> {
  const result = await convertBitmapImage(icoData, 'png');
  return result.data;
}

export async function icoToJpeg(icoData: string): Promise<string> {
  const result = await convertBitmapImage(icoData, 'jpeg');
  return result.data;
}

export async function icoToWebp(icoData: string): Promise<string> {
  const result = await convertBitmapImage(icoData, 'webp');
  return result.data;
}

export async function icoToGif(icoData: string): Promise<string> {
  const result = await convertBitmapImage(icoData, 'png');
  return result.data;
}

export async function icoToBmp(icoData: string): Promise<string> {
  const result = await convertBitmapImage(icoData, 'bmp');
  return result.data;
}

export async function tiffToJpeg(tiffData: string): Promise<string> {
  const result = await convertBitmapImage(tiffData, 'jpeg');
  return result.data;
}

export async function tiffToPng(tiffData: string): Promise<string> {
  const result = await convertBitmapImage(tiffData, 'png');
  return result.data;
}

export async function tiffToWebp(tiffData: string): Promise<string> {
  const result = await convertBitmapImage(tiffData, 'webp');
  return result.data;
}

export async function tiffToBmp(tiffData: string): Promise<string> {
  const result = await convertBitmapImage(tiffData, 'bmp');
  return result.data;
}

// Fonction utilitaire pour obtenir les informations d'une image
export async function getImageInfo(imageData: string): Promise<{
  width: number;
  height: number;
  format: string;
  size: number;
}> {
  try {
    const img = await loadImage(imageData);
    
    // Déterminer le format depuis le data URL
    let format = 'unknown';
    if (imageData.startsWith('data:image/')) {
      const mimeType = imageData.split(';')[0].split(':')[1];
      format = mimeType.split('/')[1];
    }
    
    return {
      width: img.width,
      height: img.height,
      format,
      size: Math.round(imageData.length * 0.75)
    };
  } catch (error) {
    throw new Error(`Impossible d'obtenir les informations de l'image: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
} 