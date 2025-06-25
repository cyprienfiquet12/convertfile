import Papa from 'papaparse';

/**
 * Convertit un JSON en CSV
 */
export const jsonToCsv = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    
    // Si c'est un objet unique, le mettre dans un tableau
    const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
    
    // Vérifier que les données ne sont pas vides
    if (dataArray.length === 0) {
      throw new Error('Aucune donnée à convertir');
    }
    
    // Convertir en CSV avec Papa Parse
    const csv = Papa.unparse(dataArray, {
      header: true,
      skipEmptyLines: true,
    });
    
    return csv;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw error;
  }
};

/**
 * Convertit un tableau d'objets JSON en CSV avec gestion des objets imbriqués
 */
export const jsonToCsvAdvanced = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
    
    if (dataArray.length === 0) {
      throw new Error('Aucune donnée à convertir');
    }
    
    // Aplatir les objets imbriqués
    const flattenedData = dataArray.map(item => flattenObject(item));
    
    const csv = Papa.unparse(flattenedData, {
      header: true,
      skipEmptyLines: true,
    });
    
    return csv;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw error;
  }
};

/**
 * Aplatit un objet imbriqué en utilisant la notation par points
 */
const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  const flattened: Record<string, any> = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else if (Array.isArray(obj[key])) {
        flattened[newKey] = JSON.stringify(obj[key]);
      } else {
        flattened[newKey] = obj[key];
      }
    }
  }
  
  return flattened;
}; 