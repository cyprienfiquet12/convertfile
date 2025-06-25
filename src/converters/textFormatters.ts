/**
 * Formate (pretty-print) du JSON
 */
export const formatJson = (jsonString: string, indent: number = 2): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData, null, indent);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de formatage JSON: ' + (error as Error).message);
  }
};

/**
 * Minifie du JSON (supprime espaces et indentation)
 */
export const minifyJson = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON invalide: ' + error.message);
    }
    throw new Error('Erreur de minification JSON: ' + (error as Error).message);
  }
};

/**
 * Convertit du texte en majuscules
 */
export const textToUpperCase = (text: string): string => {
  return text.toUpperCase();
};

/**
 * Convertit du texte en minuscules
 */
export const textToLowerCase = (text: string): string => {
  return text.toLowerCase();
};

/**
 * Convertit du texte en Title Case
 */
export const textToTitleCase = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Convertit du texte en camelCase
 */
export const textToCamelCase = (text: string): string => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
};

/**
 * Convertit du texte en snake_case
 */
export const textToSnakeCase = (text: string): string => {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
};

/**
 * Convertit du texte en kebab-case
 */
export const textToKebabCase = (text: string): string => {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');
};

/**
 * Supprime les espaces en début et fin de chaque ligne
 */
export const trimLines = (text: string): string => {
  return text
    .split('\n')
    .map(line => line.trim())
    .join('\n');
};

/**
 * Supprime les lignes vides
 */
export const removeEmptyLines = (text: string): string => {
  return text
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n');
};

/**
 * Ajoute des numéros de ligne
 */
export const addLineNumbers = (text: string, startFrom: number = 1): string => {
  const lines = text.split('\n');
  const maxDigits = String(lines.length + startFrom - 1).length;
  
  return lines
    .map((line, index) => {
      const lineNumber = (index + startFrom).toString().padStart(maxDigits, ' ');
      return `${lineNumber}: ${line}`;
    })
    .join('\n');
};

/**
 * Convertit du texte brut en Markdown
 */
export const textToMarkdown = (text: string): string => {
  if (!text || text.trim() === '') {
    return text;
  }
  
  // Conversion simple de texte vers Markdown
  let markdown = text;
  
  // Détecter et formater les titres (lignes isolées qui semblent être des titres)
  const lines = markdown.split('\n');
  const processedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Vérifier si c'est un titre potentiel
    if (trimmedLine && 
        !trimmedLine.includes('.') && 
        !trimmedLine.includes(',') &&
        !trimmedLine.includes(':') &&
        trimmedLine.length < 100 &&
        (i === 0 || lines[i-1].trim() === '') &&
        (i === lines.length - 1 || lines[i+1].trim() === '')) {
      
      // Détecter le niveau de titre
      if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3) {
        processedLines.push(`# ${trimmedLine}`);
      } else if (trimmedLine[0] === trimmedLine[0].toUpperCase()) {
        processedLines.push(`## ${trimmedLine}`);
      } else {
        processedLines.push(line);
      }
    } else {
      processedLines.push(line);
    }
  }
  
  markdown = processedLines.join('\n');
  
  // Détecter les listes simples (lignes qui commencent par -, *, ou des numéros)
  markdown = markdown.replace(/^[\s]*[-*+]\s+(.+)$/gm, '- $1');
  markdown = markdown.replace(/^[\s]*(\d+)[.)]\s+(.+)$/gm, '$1. $2');
  
  // Convertir les URLs en liens Markdown
  markdown = markdown.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)');
  
  // Mettre en évidence les mots en MAJUSCULES (les convertir en gras)
  markdown = markdown.replace(/\b[A-Z]{3,}\b/g, '**$&**');
  
  // Détecter et formater les sections (mots suivis de ":")
  markdown = markdown.replace(/^([A-Za-z][^:\n]{2,})\s*:\s*$/gm, '### $1');
  
  // Normaliser les sauts de ligne (max 2 sauts consécutifs)
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  
  return markdown;
};

/**
 * Convertit du texte brut en HTML
 */
export const textToHtml = (text: string): string => {
  let html = text;
  
  // Échapper les caractères HTML
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  
  // Convertir les URLs en liens
  html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
  
  // Convertir les sauts de ligne en <br> et les paragraphes en <p>
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs
    .map(paragraph => {
      if (paragraph.trim()) {
        const formattedParagraph = paragraph.replace(/\n/g, '<br>');
        return `<p>${formattedParagraph}</p>`;
      }
      return '';
    })
    .filter(p => p)
    .join('\n');
  
  // Ajouter une structure HTML basique
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Texte converti</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        p { margin-bottom: 1em; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
${html}
</body>
</html>`;
};

/**
 * Convertit du Markdown en texte brut
 */
export const markdownToText = (markdown: string): string => {
  if (!markdown || markdown.trim() === '') {
    return markdown;
  }
  
  let text = markdown;
  
  // Supprimer les balises HTML qui peuvent être dans le Markdown
  text = text.replace(/<[^>]*>/g, '');
  
  // Supprimer les titres Markdown (# ## ###)
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '$1');
  
  // Supprimer la syntaxe des liens [texte](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Supprimer la syntaxe des images ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  
  // Supprimer l'emphase (gras et italique)
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1'); // **gras**
  text = text.replace(/\*([^*]+)\*/g, '$1'); // *italique*
  text = text.replace(/__([^_]+)__/g, '$1'); // __gras__
  text = text.replace(/_([^_]+)_/g, '$1'); // _italique_
  
  // Supprimer les blocs de code ```
  text = text.replace(/```[\s\S]*?```/g, '');
  
  // Supprimer le code inline `code`
  text = text.replace(/`([^`]+)`/g, '$1');
  
  // Supprimer les blockquotes (>)
  text = text.replace(/^>\s*/gm, '');
  
  // Supprimer les marqueurs de liste (- * +)
  text = text.replace(/^[\s]*[-*+]\s+/gm, '');
  
  // Supprimer les listes numérotées
  text = text.replace(/^[\s]*\d+\.\s+/gm, '');
  
  // Supprimer les lignes horizontales
  text = text.replace(/^[-*_]{3,}$/gm, '');
  
  // Supprimer les tableaux Markdown
  text = text.replace(/^\|.*\|$/gm, ''); // Lignes de tableau
  text = text.replace(/^\|[-\s|:]*\|$/gm, ''); // Séparateurs de tableau
  
  // Nettoyer les espaces multiples
  text = text.replace(/\s+/g, ' ');
  
  // Nettoyer les sauts de ligne multiples
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Nettoyer les espaces en début et fin
  text = text.trim();
  
  return text;
};

/**
 * Compte les mots, lignes et caractères dans un texte
 */
export const getTextStats = (text: string): string => {
  const lines = text.split('\n').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
  
  const stats = {
    lines,
    words,
    characters,
    charactersNoSpaces,
    paragraphs,
    analysis: {
      averageWordsPerLine: lines > 0 ? (words / lines).toFixed(2) : '0',
      averageCharactersPerWord: words > 0 ? (charactersNoSpaces / words).toFixed(2) : '0'
    }
  };
  
  return JSON.stringify(stats, null, 2);
}; 