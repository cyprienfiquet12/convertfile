/**
 * Convertit du JSON en XML
 */
export const jsonToXml = (jsonString: string, options: { rootElement?: string } = {}): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    const rootElement = options.rootElement || 'root';
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += objectToXml(jsonData, rootElement, 0);
    
    return xml;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de conversion JSON vers XML: ' + (error as Error).message);
  }
};

/**
 * Convertit un objet JavaScript en XML
 */
const objectToXml = (obj: any, tagName: string, indent: number = 0): string => {
  const spaces = '  '.repeat(indent);
  
  if (obj === null || obj === undefined) {
    return `${spaces}<${tagName}/>\n`;
  }
  
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    const escapedValue = escapeXml(obj.toString());
    return `${spaces}<${tagName}>${escapedValue}</${tagName}>\n`;
  }
  
  if (Array.isArray(obj)) {
    let xml = '';
    obj.forEach((item, index) => {
      const itemTagName = tagName.endsWith('s') ? tagName.slice(0, -1) : `${tagName}_item`;
      xml += objectToXml(item, itemTagName, indent);
    });
    return xml;
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    
    if (keys.length === 0) {
      return `${spaces}<${tagName}/>\n`;
    }
    
    let xml = `${spaces}<${tagName}>\n`;
    
    keys.forEach(key => {
      const cleanKey = sanitizeTagName(key);
      xml += objectToXml(obj[key], cleanKey, indent + 1);
    });
    
    xml += `${spaces}</${tagName}>\n`;
    return xml;
  }
  
  return `${spaces}<${tagName}>${escapeXml(obj.toString())}</${tagName}>\n`;
};

/**
 * Échappe les caractères spéciaux XML
 */
const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Nettoie les noms de balises pour qu'ils soient valides en XML
 */
const sanitizeTagName = (name: string): string => {
  // Remplacer les caractères non valides par des underscores
  let sanitized = name.replace(/[^a-zA-Z0-9\-_.]/g, '_');
  
  // S'assurer que le nom commence par une lettre ou underscore
  if (!/^[a-zA-Z_]/.test(sanitized)) {
    sanitized = 'item_' + sanitized;
  }
  
  return sanitized;
}; 