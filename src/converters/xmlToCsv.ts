import { parseString } from 'xml2js';
import Papa from 'papaparse';

/**
 * Convertit du XML en CSV
 */
export const xmlToCsv = (xmlString: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      parseString(xmlString, {
        explicitArray: false,
        ignoreAttrs: false,
        mergeAttrs: true,
        trim: true,
        normalize: true,
        normalizeTags: false,
        explicitRoot: false,
      }, (err, result) => {
        if (err) {
          reject(new Error('XML invalide: ' + err.message));
          return;
        }
        
        try {
          // Convertir le résultat XML en structure tabulaire
          const flattenedData = xmlToFlatArray(result);
          
          if (flattenedData.length === 0) {
            reject(new Error('Aucune donnée tabulaire trouvée dans le XML'));
            return;
          }
          
          // Utiliser Papa Parse pour générer le CSV
          const csvResult = Papa.unparse(flattenedData, {
            header: true,
            delimiter: ',',
            newline: '\n'
          });
          
          resolve(csvResult);
        } catch (csvErr) {
          reject(new Error('Erreur lors de la conversion en CSV: ' + (csvErr as Error).message));
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        reject(new Error('Erreur de parsing XML: ' + error.message));
      } else {
        reject(new Error('Erreur inconnue lors de la conversion XML vers CSV'));
      }
    }
  });
};

/**
 * Convertit une structure XML parsée en tableau d'objets plats pour CSV
 */
const xmlToFlatArray = (xmlData: any): any[] => {
  // D'abord, essayer de détecter une structure répétitive (liste d'éléments)
  const repeatingData = findRepeatingStructure(xmlData);
  if (repeatingData.length > 0) {
    return repeatingData;
  }
  
  // Sinon, traiter comme un objet unique
  const flattened = flattenObject(xmlData, '');
  return Object.keys(flattened).length > 0 ? [flattened] : [];
};

/**
 * Trouve une structure répétitive dans le XML (comme une liste d'éléments)
 */
const findRepeatingStructure = (xmlData: any): any[] => {
  const results: any[] = [];
  
  // Fonction récursive pour chercher des tableaux
  const searchArrays = (obj: any, path: string = ''): any[] => {
    if (Array.isArray(obj)) {
      // Trouvé un tableau - chaque élément devient une ligne
      return obj.map(item => flattenObject(item, ''));
    }
    
    if (typeof obj === 'object' && obj !== null) {
      // Chercher dans les propriétés de l'objet
      for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value) && value.length > 0) {
          // Trouvé un tableau non vide
          return value.map(item => {
            const flattened = flattenObject(item, '');
            // Ajouter le type d'élément si ce n'est pas déjà présent
            if (!flattened['type'] && !flattened['_type']) {
              flattened['element_type'] = key;
            }
            return flattened;
          });
        } else if (typeof value === 'object' && value !== null) {
          // Continuer la recherche récursivement
          const found = searchArrays(value, path ? `${path}_${key}` : key);
          if (found.length > 0) {
            return found;
          }
        }
      }
    }
    
    return [];
  };
  
  return searchArrays(xmlData);
};



/**
 * Aplatit un objet complexe en propriétés simples
 */
const flattenObject = (obj: any, prefix: string = ''): any => {
  const flattened: any = {};
  
  const flatten = (current: any, propPath: string) => {
    if (current === null || current === undefined) {
      flattened[propPath || 'value'] = '';
      return;
    }
    
    if (typeof current === 'string' || typeof current === 'number' || typeof current === 'boolean') {
      flattened[propPath || 'value'] = current;
      return;
    }
    
    if (Array.isArray(current)) {
      // Pour les tableaux, soit joindre les valeurs simples, soit aplatir les objets
      if (current.length === 0) {
        flattened[propPath || 'array'] = '';
      } else if (current.every(item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')) {
        // Tableau de valeurs primitives - joindre avec des virgules
        flattened[propPath || 'array'] = current.join(', ');
      } else {
        // Tableau d'objets - aplatir chaque objet avec un index
        current.forEach((item, index) => {
          const itemPath = propPath ? `${propPath}_${index}` : `item_${index}`;
          flatten(item, itemPath);
        });
      }
      return;
    }
    
    if (typeof current === 'object') {
      // Objet - aplatir récursivement chaque propriété
      Object.keys(current).forEach(key => {
        const value = current[key];
        const newPath = propPath ? `${propPath}_${key}` : key;
        flatten(value, newPath);
      });
      return;
    }
    
    // Fallback pour les types non gérés
    flattened[propPath || 'unknown'] = String(current);
  };
  
  flatten(obj, prefix);
  return flattened;
}; 