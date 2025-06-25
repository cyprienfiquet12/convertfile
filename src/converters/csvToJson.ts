import Papa from 'papaparse';

/**
 * Convertit un CSV en JSON
 */
export const csvToJson = (csvString: string): string => {
  try {
    const result = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      transform: (value, field) => {
        // Tenter de parser les valeurs numériques
        if (value && !isNaN(Number(value)) && value.trim() !== '') {
          return Number(value);
        }
        // Tenter de parser les booléens
        if (value === 'true') return true;
        if (value === 'false') return false;
        // Tenter de parser les objets/tableaux JSON
        if (value && (value.startsWith('{') || value.startsWith('['))) {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    });
    
    if (result.errors.length > 0) {
      const errorMessages = result.errors.map(error => error.message).join(', ');
      throw new Error('Erreurs lors du parsing CSV: ' + errorMessages);
    }
    
    return JSON.stringify(result.data, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erreur de conversion CSV: ' + error.message);
    }
    throw new Error('Erreur inconnue lors de la conversion CSV');
  }
};

/**
 * Convertit un CSV en JSON avec options avancées
 */
export const csvToJsonAdvanced = (
  csvString: string, 
  options: {
    delimiter?: string;
    skipEmptyLines?: boolean;
    trimHeaders?: boolean;
  } = {}
): string => {
  try {
    const parseOptions = {
      header: true,
      skipEmptyLines: options.skipEmptyLines ?? true,
      delimiter: options.delimiter || ',',
      transformHeader: options.trimHeaders 
        ? (header: string) => header.trim()
        : undefined,
      transform: (value: string, field: string) => {
        // Nettoyer les valeurs
        const cleanValue = value?.trim();
        
        if (!cleanValue) return null;
        
        // Parser les nombres
        if (!isNaN(Number(cleanValue))) {
          return Number(cleanValue);
        }
        
        // Parser les booléens
        if (cleanValue.toLowerCase() === 'true') return true;
        if (cleanValue.toLowerCase() === 'false') return false;
        
        // Parser les dates (format ISO)
        if (cleanValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
          return new Date(cleanValue).toISOString();
        }
        
        return cleanValue;
      }
    };
    
    const result = Papa.parse(csvString, parseOptions);
    
    if (result.errors.length > 0) {
      const errorMessages = result.errors.map(error => error.message).join(', ');
      throw new Error('Erreurs lors du parsing CSV: ' + errorMessages);
    }
    
    return JSON.stringify(result.data, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erreur de conversion CSV: ' + error.message);
    }
    throw new Error('Erreur inconnue lors de la conversion CSV');
  }
}; 