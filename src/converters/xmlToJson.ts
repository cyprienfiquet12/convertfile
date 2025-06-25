import { parseString } from 'xml2js';

/**
 * Convertit du XML en JSON
 */
export const xmlToJson = (xmlString: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      parseString(xmlString, {
        explicitArray: false, // Ne pas forcer les tableaux pour un seul élément
        ignoreAttrs: false, // Garder les attributs
        mergeAttrs: true, // Fusionner les attributs avec le contenu
        trim: true, // Supprimer les espaces en début/fin
        normalize: true, // Normaliser les espaces
        normalizeTags: false, // Garder la casse des tags
        explicitRoot: false, // Ne pas envelopper dans un objet racine supplémentaire
      }, (err, result) => {
        if (err) {
          reject(new Error('XML invalide: ' + err.message));
          return;
        }
        
        try {
          const jsonString = JSON.stringify(result, null, 2);
          resolve(jsonString);
        } catch (jsonErr) {
          reject(new Error('Erreur lors de la sérialisation JSON: ' + (jsonErr as Error).message));
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        reject(new Error('Erreur de parsing XML: ' + error.message));
      } else {
        reject(new Error('Erreur inconnue lors de la conversion XML'));
      }
    }
  });
};

/**
 * Convertit du XML en JSON avec options avancées
 */
export const xmlToJsonAdvanced = (
  xmlString: string,
  options: {
    preserveArrays?: boolean;
    includeAttributes?: boolean;
    removeNamespaces?: boolean;
  } = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const parseOptions = {
        explicitArray: options.preserveArrays ?? false,
        ignoreAttrs: !options.includeAttributes,
        mergeAttrs: options.includeAttributes ?? true,
        trim: true,
        normalize: true,
        normalizeTags: false,
        explicitRoot: false,
        stripPrefix: options.removeNamespaces ?? false,
      };
      
      parseString(xmlString, parseOptions, (err, result) => {
        if (err) {
          reject(new Error('XML invalide: ' + err.message));
          return;
        }
        
        try {
          const jsonString = JSON.stringify(result, null, 2);
          resolve(jsonString);
        } catch (jsonErr) {
          reject(new Error('Erreur lors de la sérialisation JSON: ' + (jsonErr as Error).message));
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        reject(new Error('Erreur de parsing XML: ' + error.message));
      } else {
        reject(new Error('Erreur inconnue lors de la conversion XML'));
      }
    }
  });
};

/**
 * Version synchrone simplifiée pour les petits fichiers XML
 */
export const xmlToJsonSync = (xmlString: string): string => {
  // Pour une utilisation synchrone simple, on utilise une version basique
  try {
    // Nettoyer et valider le XML de base
    if (!xmlString.trim().startsWith('<')) {
      throw new Error('Le contenu ne semble pas être du XML valide');
    }
    
    // Pour le moment, on retourne une version basique
    // En production, on utiliserait la version asynchrone
    return JSON.stringify({
      message: "Utilisez la version asynchrone xmlToJson pour un parsing complet",
      preview: xmlString.substring(0, 100) + "..."
    }, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erreur XML: ' + error.message);
    }
    throw new Error('Erreur inconnue lors de la conversion XML');
  }
}; 