import { marked } from 'marked';

/**
 * Convertit du Markdown en HTML
 */
export const markdownToHtml = (markdownString: string): string => {
  try {
    // Configuration des options de marked
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Conversion des retours à la ligne
    });
    
    // Convertir le markdown en HTML
    const html = marked(markdownString);
    
    if (typeof html !== 'string') {
      throw new Error('Erreur lors de la conversion markdown');
    }
    
    return html;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erreur de conversion Markdown: ' + error.message);
    }
    throw new Error('Erreur inconnue lors de la conversion Markdown');
  }
};

/**
 * Convertit du Markdown en HTML avec style CSS intégré
 */
export const markdownToStyledHtml = (markdownString: string): string => {
  try {
    const html = markdownToHtml(markdownString);
    
    // CSS intégré pour un rendu élégant
    const styledHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Converti</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #2d3748;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        
        h1 { border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
        h2 { border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; }
        
        code {
            background-color: #f7fafc;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9em;
        }
        
        pre {
            background-color: #f7fafc;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            border: 1px solid #e2e8f0;
        }
        
        pre code {
            background: none;
            padding: 0;
        }
        
        blockquote {
            border-left: 4px solid #3182ce;
            margin: 1em 0;
            padding-left: 1em;
            color: #4a5568;
            font-style: italic;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        
        th, td {
            border: 1px solid #e2e8f0;
            padding: 0.5em;
            text-align: left;
        }
        
        th {
            background-color: #f7fafc;
            font-weight: 600;
        }
        
        a {
            color: #3182ce;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
        }
        
        ul, ol {
            padding-left: 1.5em;
        }
        
        li {
            margin: 0.25em 0;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;
    
    return styledHtml;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erreur de conversion Markdown stylé: ' + error.message);
    }
    throw new Error('Erreur inconnue lors de la conversion Markdown stylé');
  }
}; 