/**
 * Détecte le type de fichier basé sur l'extension ou le contenu
 */
export const detectFileType = (fileName: string, content?: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  // Détection par extension
  switch (extension) {
    case 'json':
      return 'json';
    case 'csv':
      return 'csv';
    case 'md':
    case 'markdown':
      return 'markdown';
    case 'xml':
      return 'xml';
    case 'txt':
      return detectTextContent(content || '');
    case 'html':
    case 'htm':
      return 'html';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'env':
      return 'env';
    case 'sql':
      return 'sql';
    case 'jpg':
    case 'jpeg':
      return 'jpeg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    case 'gif':
      return 'gif';
    case 'bmp':
      return 'bmp';
    case 'svg':
      return 'svg';
    case 'ico':
      return 'ico';
    case 'tiff':
    case 'tif':
      return 'tiff';
    default:
      return detectTextContent(content || '');
  }
};

/**
 * Détecte le type de contenu textuel
 */
const detectTextContent = (content: string): string => {
  const trimmedContent = content.trim();
  
  if (!trimmedContent) return 'text';
  
  // Détecter Base64
  if (/^[A-Za-z0-9+/]*={0,2}$/.test(trimmedContent) && trimmedContent.length % 4 === 0) {
    return 'base64';
  }
  
  // Détecter URL encoded
  if (trimmedContent.includes('%') && /^[A-Za-z0-9%._~:/?#[\]@!$&'()*+,;=-]*$/.test(trimmedContent)) {
    return 'url-encoded';
  }
  
  // Détecter query string
  if (trimmedContent.includes('=') && trimmedContent.includes('&')) {
    return 'querystring';
  }
  
  // Détecter JSON
  if ((trimmedContent.startsWith('{') && trimmedContent.endsWith('}')) ||
      (trimmedContent.startsWith('[') && trimmedContent.endsWith(']'))) {
    try {
      JSON.parse(trimmedContent);
      return 'json';
    } catch {
      // Pas du JSON valide
    }
  }
  
  // Détecter XML
  if (trimmedContent.startsWith('<') && trimmedContent.includes('>')) {
    return 'xml';
  }
  
  // Détecter YAML
  if (trimmedContent.includes(':') && !trimmedContent.includes('<') && !trimmedContent.includes('{')) {
    const lines = trimmedContent.split('\n');
    const hasYamlStructure = lines.some(line => 
      /^\s*[\w\-_]+\s*:\s*.+/.test(line) || /^\s*-\s+/.test(line)
    );
    if (hasYamlStructure) {
      return 'yaml';
    }
  }
  
  return 'text';
};

/**
 * Obtient les formats de sortie possibles pour un type de fichier donné
 */
export const getAvailableOutputFormats = (inputType: string): string[] => {
  const formatMap: Record<string, string[]> = {
    json: ['csv', 'xml', 'yaml', 'base64', 'sql', 'env', 'querystring', 'formatted', 'minified'],
    csv: ['json', 'xml'],
    markdown: ['html', 'text'],
    xml: ['json', 'csv'],
    text: ['markdown', 'html', 'base64', 'url-encoded', 'uppercase', 'lowercase', 'titlecase', 'camelcase', 'snakecase', 'kebabcase', 'stats'],
    yaml: ['json', 'xml'],
    html: ['markdown'],
    base64: ['text', 'json', 'png', 'jpeg', 'webp', 'gif', 'bmp'],
    'url-encoded': ['text'],
    querystring: ['json', 'text', 'xml'],
    jpeg: ['png', 'webp', 'gif', 'bmp', 'ico', 'base64'],
    png: ['jpeg', 'webp', 'gif', 'bmp', 'ico', 'base64'],
    webp: ['jpeg', 'png', 'gif', 'bmp', 'ico', 'base64'],
    gif: ['jpeg', 'png', 'webp', 'bmp', 'ico', 'base64'],
    bmp: ['jpeg', 'png', 'webp', 'gif', 'ico', 'base64'],
    svg: ['png', 'jpeg', 'webp', 'base64'],
    ico: ['png', 'jpeg', 'webp', 'gif', 'bmp', 'base64'],
    tiff: ['jpeg', 'png', 'webp', 'bmp', 'base64'],
  };
  
  return formatMap[inputType] || [];
};

/**
 * Vérifie si un fichier est supporté pour la conversion
 */
export const isSupportedFile = (fileName: string): boolean => {
  const fileType = detectFileType(fileName);
  return fileType !== 'unknown';
};

/**
 * Obtient l'icône appropriée pour un type de fichier
 */
export const getFileTypeIcon = (fileType: string): string => {
  const iconMap: Record<string, string> = {
    json: '{ }',
    csv: '📊',
    markdown: '📝',
    xml: '🏷️',
    text: '📄',
    html: '🌐',
    yaml: '⚙️',
    base64: '🔒',
    'url-encoded': '🔗',
    querystring: '❓',
    sql: '🗄️',
    env: '⚙️',
    formatted: '✨',
    minified: '📦',
    uppercase: 'A',
    lowercase: 'a',
    titlecase: 'Aa',
    camelcase: 'aA',
    snakecase: 'a_a',
    kebabcase: 'a-a',
    stats: '📈',
    jpeg: '🖼️',
    png: '🖼️',
    webp: '🖼️',
    gif: '🎞️',
    bmp: '🖼️',
    svg: '🎨',
    ico: '🔸',
    tiff: '🖼️',
    unknown: '❓',
  };
  
  return iconMap[fileType] || iconMap.unknown;
}; 