/**
 * Convertit du JSON en instructions SQL INSERT
 */
export const jsonToSql = (jsonString: string, options: { tableName?: string } = {}): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    const tableName = options.tableName || 'table_data';
    
    // Si c'est un objet unique, le mettre dans un tableau
    const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
    
    if (dataArray.length === 0) {
      throw new Error('Aucune donnée à convertir');
    }
    
    // Extraire toutes les colonnes possibles
    const allColumns = new Set<string>();
    dataArray.forEach(row => {
      if (typeof row === 'object' && row !== null) {
        Object.keys(row).forEach(key => allColumns.add(key));
      }
    });
    
    const columns = Array.from(allColumns);
    
    if (columns.length === 0) {
      throw new Error('Aucune colonne trouvée dans les données');
    }
    
    let sql = `-- Instructions SQL INSERT générées depuis JSON\n`;
    sql += `-- Table: ${tableName}\n`;
    sql += `-- Colonnes: ${columns.join(', ')}\n\n`;
    
    // Créer la structure de table (commentée)
    sql += `-- Structure de table suggérée:\n`;
    sql += `-- CREATE TABLE ${tableName} (\n`;
    columns.forEach((col, index) => {
      const sqlColumnName = sanitizeSqlIdentifier(col);
      sql += `--   ${sqlColumnName} VARCHAR(255)${index < columns.length - 1 ? ',' : ''}\n`;
    });
    sql += `-- );\n\n`;
    
    // Générer les instructions INSERT
    dataArray.forEach((row, index) => {
      if (typeof row !== 'object' || row === null) {
        sql += `-- Ligne ${index + 1} ignorée: type de données non supporté\n`;
        return;
      }
      
      const values = columns.map(col => {
        const value = row[col];
        return formatSqlValue(value);
      });
      
      const columnNames = columns.map(col => sanitizeSqlIdentifier(col));
      
      sql += `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${values.join(', ')});\n`;
    });
    
    return sql;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de conversion JSON vers SQL: ' + (error as Error).message);
  }
};

/**
 * Formate une valeur pour SQL
 */
const formatSqlValue = (value: any): string => {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  if (typeof value === 'number') {
    return value.toString();
  }
  
  if (typeof value === 'boolean') {
    return value ? '1' : '0'; // ou TRUE/FALSE selon le SGBD
  }
  
  if (typeof value === 'object') {
    // Sérialiser les objets/tableaux en JSON
    return `'${escapeSqlString(JSON.stringify(value))}'`;
  }
  
  // String par défaut
  return `'${escapeSqlString(String(value))}'`;
};

/**
 * Échappe les chaînes pour SQL
 */
const escapeSqlString = (str: string): string => {
  return str
    .replace(/\\/g, '\\\\')  // Échapper les backslashes
    .replace(/'/g, "''")     // Échapper les apostrophes
    .replace(/"/g, '\\"')    // Échapper les guillemets
    .replace(/\n/g, '\\n')   // Échapper les sauts de ligne
    .replace(/\r/g, '\\r')   // Échapper les retours chariot
    .replace(/\t/g, '\\t');  // Échapper les tabulations
};

/**
 * Nettoie les identifiants SQL
 */
const sanitizeSqlIdentifier = (identifier: string): string => {
  // Remplacer les caractères non alphanumériques par des underscores
  let sanitized = identifier
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^[^a-zA-Z_]/, '_'); // S'assurer que ça commence par une lettre ou underscore
  
  // Éviter les noms vides
  if (!sanitized || sanitized === '_') {
    sanitized = 'column';
  }
  
  return sanitized;
}; 