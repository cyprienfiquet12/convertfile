import Papa from 'papaparse';

/**
 * Convertit du CSV en XML
 */
export const csvToXml = (csvString: string, options: { rootElement?: string; rowElement?: string } = {}): string => {
  try {
    const result = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      transform: (value: string) => {
        // Parser les valeurs numériques et booléennes
        if (value && !isNaN(Number(value)) && value.trim() !== '') {
          return Number(value);
        }
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
      }
    });
    
    if (result.errors.length > 0) {
      const errorMessages = result.errors.map(error => error.message).join(', ');
      throw new Error('Erreurs lors du parsing CSV: ' + errorMessages);
    }
    
    const rootElement = options.rootElement || 'data';
    const rowElement = options.rowElement || 'row';
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<${rootElement}>\n`;
    
    result.data.forEach((row: any) => {
      xml += `  <${rowElement}>\n`;
      
      Object.keys(row).forEach(key => {
        const cleanKey = sanitizeXmlTagName(key);
        const value = row[key];
        const escapedValue = escapeXmlValue(value);
        xml += `    <${cleanKey}>${escapedValue}</${cleanKey}>\n`;
      });
      
      xml += `  </${rowElement}>\n`;
    });
    
    xml += `</${rootElement}>\n`;
    
    return xml;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erreur de conversion CSV vers XML: ' + error.message);
    }
    throw new Error('Erreur inconnue lors de la conversion CSV vers XML');
  }
};

/**
 * Nettoie les noms de colonnes pour qu'ils soient des balises XML valides
 */
const sanitizeXmlTagName = (name: string): string => {
  // Remplacer les espaces et caractères spéciaux par des underscores
  let sanitized = name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\-_.]/g, '_')
    .replace(/^[^a-zA-Z_]/, '_'); // S'assurer que ça commence par une lettre ou underscore
  
  // Éviter les noms vides
  if (!sanitized || sanitized === '_') {
    sanitized = 'column';
  }
  
  return sanitized;
};

/**
 * Échappe les valeurs pour XML
 */
const escapeXmlValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}; 