/**
 * Encode du texte en URL encoding
 */
export const textToUrlEncoded = (text: string): string => {
  try {
    return encodeURIComponent(text);
  } catch (error) {
    throw new Error('Erreur d\'encodage URL: ' + (error as Error).message);
  }
};

/**
 * Décode de l'URL encoding en texte
 */
export const urlEncodedToText = (urlEncodedString: string): string => {
  try {
    return decodeURIComponent(urlEncodedString);
  } catch (error) {
    throw new Error('Erreur de décodage URL: ' + (error as Error).message);
  }
};

/**
 * Convertit un objet JSON en query string (paramètres URL)
 */
export const jsonToQueryString = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    
    if (typeof jsonData !== 'object' || jsonData === null) {
      throw new Error('Le JSON doit être un objet pour la conversion en query string');
    }
    
    const params = new URLSearchParams();
    
    // Aplatir l'objet pour créer les paramètres
    flattenObject(jsonData).forEach((value, key) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });
    
    return params.toString();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de conversion JSON vers query string: ' + (error as Error).message);
  }
};

/**
 * Convertit une query string en JSON
 */
export const queryStringToJson = (queryString: string): string => {
  try {
    // Nettoyer la query string (supprimer le ? initial si présent)
    const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    
    const params = new URLSearchParams(cleanQuery);
    const result: Record<string, any> = {};
    
    // Convertir les paramètres en objet
    params.forEach((value, key) => {
      // Essayer de parser les valeurs numériques et booléennes
      let parsedValue: any = value;
      
      if (value === 'true') {
        parsedValue = true;
      } else if (value === 'false') {
        parsedValue = false;
      } else if (value === 'null') {
        parsedValue = null;
      } else if (!isNaN(Number(value)) && value.trim() !== '') {
        parsedValue = Number(value);
      }
      
      // Gérer les clés dupliquées (créer un tableau)
      if (result[key] !== undefined) {
        if (Array.isArray(result[key])) {
          result[key].push(parsedValue);
        } else {
          result[key] = [result[key], parsedValue];
        }
      } else {
        result[key] = parsedValue;
      }
    });
    
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error('Erreur de conversion query string vers JSON: ' + (error as Error).message);
  }
};

/**
 * Aplatit un objet pour la conversion en paramètres URL
 */
const flattenObject = (obj: any, prefix: string = ''): Map<string, any> => {
  const result = new Map<string, any>();
  
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}[${key}]` : key;
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Objet imbriqué - aplatir récursivement
      const flattened = flattenObject(value, newKey);
      flattened.forEach((v, k) => result.set(k, v));
    } else if (Array.isArray(value)) {
      // Tableau - ajouter chaque élément avec un index
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          const flattened = flattenObject(item, `${newKey}[${index}]`);
          flattened.forEach((v, k) => result.set(k, v));
        } else {
          result.set(`${newKey}[${index}]`, item);
        }
      });
    } else {
      // Valeur primitive
      result.set(newKey, value);
    }
  });
  
  return result;
}; 