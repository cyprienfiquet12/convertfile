/**
 * Encode du texte en Base64
 */
export const textToBase64 = (text: string): string => {
  try {
    // Utiliser btoa pour l'encodage Base64 (navigateur)
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    throw new Error('Erreur d\'encodage Base64: ' + (error as Error).message);
  }
};

/**
 * Décode du Base64 en texte
 */
export const base64ToText = (base64String: string): string => {
  try {
    // Nettoyer la chaîne Base64 (supprimer espaces, retours à la ligne)
    const cleanBase64 = base64String.replace(/[\s\n\r]/g, '');
    
    // Valider le format Base64
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanBase64)) {
      throw new Error('Format Base64 invalide');
    }
    
    // Utiliser atob pour le décodage Base64 (navigateur)
    return decodeURIComponent(escape(atob(cleanBase64)));
  } catch (error) {
    throw new Error('Erreur de décodage Base64: ' + (error as Error).message);
  }
};

/**
 * Encode un JSON en Base64
 */
export const jsonToBase64 = (jsonString: string): string => {
  try {
    // Valider que c'est du JSON valide
    JSON.parse(jsonString);
    return textToBase64(jsonString);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur d\'encodage JSON vers Base64: ' + (error as Error).message);
  }
};

/**
 * Décode du Base64 en JSON
 */
export const base64ToJson = (base64String: string): string => {
  try {
    const decodedText = base64ToText(base64String);
    
    // Valider que le résultat est du JSON valide
    const jsonData = JSON.parse(decodedText);
    
    // Retourner du JSON formaté
    return JSON.stringify(jsonData, null, 2);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Le contenu décodé n\'est pas du JSON valide: ' + error.message);
    }
    throw new Error('Erreur de décodage Base64 vers JSON: ' + (error as Error).message);
  }
}; 