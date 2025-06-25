/**
 * Convertit du JSON en YAML
 */
export const jsonToYaml = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    return objectToYaml(jsonData, 0);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de conversion JSON vers YAML: ' + (error as Error).message);
  }
};

/**
 * Convertit un objet JavaScript en format YAML
 */
const objectToYaml = (obj: any, indent: number = 0): string => {
  const spaces = '  '.repeat(indent);
  
  if (obj === null || obj === undefined) {
    return 'null';
  }
  
  if (typeof obj === 'string') {
    // Échapper les caractères spéciaux si nécessaire
    if (obj.includes('\n') || obj.includes('"') || obj.includes("'") || obj.includes(':')) {
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    return obj;
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  }
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    
    return obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        const yamlObj = objectToYaml(item, indent + 1);
        return `${spaces}- ${yamlObj.replace(/\n/g, `\n${spaces}  `)}`;
      } else {
        return `${spaces}- ${objectToYaml(item, 0)}`;
      }
    }).join('\n');
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    
    return keys.map(key => {
      const value = obj[key];
      const yamlKey = key.includes(' ') || key.includes(':') ? `"${key}"` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const yamlValue = objectToYaml(value, indent + 1);
        return `${spaces}${yamlKey}:\n${yamlValue}`;
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          return `${spaces}${yamlKey}: []`;
        }
        const yamlValue = objectToYaml(value, indent + 1);
        return `${spaces}${yamlKey}:\n${yamlValue}`;
      } else {
        return `${spaces}${yamlKey}: ${objectToYaml(value, 0)}`;
      }
    }).join('\n');
  }
  
  return obj.toString();
}; 