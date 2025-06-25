/**
 * Convertit du YAML en JSON
 * Note: Implémentation basique sans dépendance externe
 */
export const yamlToJson = (yamlString: string): string => {
  try {
    // Implémentation basique pour les cas simples de YAML
    const lines = yamlString.trim().split('\n');
    const result: any = {};
    let currentIndent = 0;
    let currentObj = result;
    const stack: any[] = [result];
    const indentStack: number[] = [0];
    
    for (let line of lines) {
      // Ignorer les commentaires et lignes vides
      if (line.trim().startsWith('#') || line.trim() === '') continue;
      
      const indent = line.length - line.trimStart().length;
      const trimmedLine = line.trim();
      
      // Gérer l'indentation
      while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) {
        indentStack.pop();
        stack.pop();
      }
      
      currentObj = stack[stack.length - 1];
      
      if (trimmedLine.includes(':')) {
        const [key, ...valueParts] = trimmedLine.split(':');
        const value = valueParts.join(':').trim();
        const cleanKey = key.trim().replace(/["']/g, '');
        
        if (value === '' || value === '{}' || value === '[]') {
          // Objet ou tableau vide, ou début d'objet imbriqué
          currentObj[cleanKey] = value === '[]' ? [] : {};
          stack.push(currentObj[cleanKey]);
          indentStack.push(indent);
        } else if (trimmedLine.startsWith('- ')) {
          // Élément de liste
          if (!Array.isArray(currentObj)) {
            currentObj = [];
            stack[stack.length - 1] = currentObj;
          }
          currentObj.push(parseYamlValue(value));
        } else {
          // Valeur simple
          currentObj[cleanKey] = parseYamlValue(value);
        }
      } else if (trimmedLine.startsWith('- ')) {
        // Élément de liste
        const value = trimmedLine.substring(2).trim();
        if (!Array.isArray(currentObj)) {
          currentObj = [];
          stack[stack.length - 1] = currentObj;
        }
        currentObj.push(parseYamlValue(value));
      }
    }
    
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error('Erreur de conversion YAML: ' + (error as Error).message);
  }
};

/**
 * Parse une valeur YAML en type JavaScript approprié
 */
const parseYamlValue = (value: string): any => {
  if (!value || value === 'null' || value === '~') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value)) && value.trim() !== '') return Number(value);
  
  // Supprimer les guillemets
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  
  return value;
}; 