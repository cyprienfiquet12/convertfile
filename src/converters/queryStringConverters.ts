/**
 * Convertit une query string en texte lisible
 */
export const queryStringToText = (queryString: string): string => {
  try {
    // Nettoyer la query string (supprimer le ? initial si présent)
    const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    
    const params = new URLSearchParams(cleanQuery);
    let text = 'Paramètres URL:\n\n';
    
    // Convertir chaque paramètre en ligne lisible
    params.forEach((value, key) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);
      text += `${decodedKey}: ${decodedValue}\n`;
    });
    
    // Ajouter des statistiques
    const paramCount = Array.from(params.keys()).length;
    text += `\n--- Statistiques ---\n`;
    text += `Nombre de paramètres: ${paramCount}\n`;
    text += `Taille totale: ${queryString.length} caractères\n`;
    
    return text;
  } catch (error) {
    throw new Error('Erreur de conversion query string vers texte: ' + (error as Error).message);
  }
};

/**
 * Convertit une query string en XML
 */
export const queryStringToXml = (queryString: string): string => {
  try {
    // Nettoyer la query string
    const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    
    const params = new URLSearchParams(cleanQuery);
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<parameters>\n';
    
    // Convertir chaque paramètre en élément XML
    params.forEach((value, key) => {
      const cleanKey = sanitizeXmlTagName(key);
      const escapedValue = escapeXmlValue(value);
      xml += `  <${cleanKey}>${escapedValue}</${cleanKey}>\n`;
    });
    
    xml += '</parameters>\n';
    
    return xml;
  } catch (error) {
    throw new Error('Erreur de conversion query string vers XML: ' + (error as Error).message);
  }
};

/**
 * Nettoie les noms de paramètres pour qu'ils soient des balises XML valides
 */
const sanitizeXmlTagName = (name: string): string => {
  // Remplacer les caractères non valides par des underscores
  let sanitized = name
    .replace(/[^a-zA-Z0-9\-_.]/g, '_')
    .replace(/^[^a-zA-Z_]/, '_'); // S'assurer que ça commence par une lettre ou underscore
  
  // Éviter les noms vides
  if (!sanitized || sanitized === '_') {
    sanitized = 'param';
  }
  
  return sanitized;
};

/**
 * Échappe les valeurs pour XML
 */
const escapeXmlValue = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}; 