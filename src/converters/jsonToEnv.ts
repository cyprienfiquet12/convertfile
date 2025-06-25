/**
 * Convertit du JSON en fichier .env (variables d'environnement)
 */
export const jsonToEnv = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    
    let envContent = '# Variables d\'environnement générées depuis JSON\n';
    envContent += `# Généré le ${new Date().toLocaleString()}\n\n`;
    
    const envLines = flattenObjectToEnv(jsonData);
    envContent += envLines.join('\n');
    
    return envContent;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de conversion JSON vers .env: ' + (error as Error).message);
  }
};

/**
 * Aplatit un objet JSON en variables d'environnement
 */
const flattenObjectToEnv = (obj: any, prefix: string = ''): string[] => {
  const envLines: string[] = [];
  
  if (typeof obj !== 'object' || obj === null) {
    const envKey = prefix || 'VALUE';
    envLines.push(`${envKey}=${formatEnvValue(obj)}`);
    return envLines;
  }
  
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const newPrefix = prefix ? `${prefix}_${index}` : `ITEM_${index}`;
      envLines.push(...flattenObjectToEnv(item, newPrefix));
    });
    return envLines;
  }
  
  Object.keys(obj).forEach(key => {
    const envKey = prefix 
      ? `${prefix}_${sanitizeEnvKey(key)}` 
      : sanitizeEnvKey(key);
    
    const value = obj[key];
    
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        // Pour les tableaux, on peut soit les aplatir soit les sérialiser
        if (value.every(item => typeof item !== 'object')) {
          // Tableau de primitives - joindre avec des virgules
          envLines.push(`${envKey}=${value.map(item => formatEnvValue(item)).join(',')}`);
        } else {
          // Tableau d'objets - aplatir
          envLines.push(...flattenObjectToEnv(value, envKey));
        }
      } else {
        // Objet - aplatir récursivement
        envLines.push(...flattenObjectToEnv(value, envKey));
      }
    } else {
      // Valeur primitive
      envLines.push(`${envKey}=${formatEnvValue(value)}`);
    }
  });
  
  return envLines;
};

/**
 * Formate une valeur pour un fichier .env
 */
const formatEnvValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  
  if (typeof value === 'number') {
    return value.toString();
  }
  
  const stringValue = String(value);
  
  // Échapper les valeurs qui contiennent des espaces, guillemets, etc.
  if (stringValue.includes(' ') || 
      stringValue.includes('"') || 
      stringValue.includes("'") ||
      stringValue.includes('\n') ||
      stringValue.includes('=')) {
    return `"${stringValue.replace(/"/g, '\\"')}"`;
  }
  
  return stringValue;
};

/**
 * Nettoie une clé pour qu'elle soit valide comme variable d'environnement
 */
const sanitizeEnvKey = (key: string): string => {
  return key
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, '_')
    .replace(/^[^A-Z_]/, '_')
    .replace(/_+/g, '_'); // Remplacer les underscores multiples par un seul
}; 