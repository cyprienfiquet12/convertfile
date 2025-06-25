/**
 * Convertit du HTML en Markdown
 */
export const htmlToMarkdown = (htmlString: string): string => {
  try {
    let markdown = htmlString;
    
    // Nettoyer le HTML
    markdown = markdown.replace(/<!DOCTYPE[^>]*>/gi, '');
    markdown = markdown.replace(/<html[^>]*>/gi, '');
    markdown = markdown.replace(/<\/html>/gi, '');
    markdown = markdown.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
    markdown = markdown.replace(/<body[^>]*>/gi, '');
    markdown = markdown.replace(/<\/body>/gi, '');
    markdown = markdown.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    markdown = markdown.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Conversion des éléments HTML vers Markdown
    
    // Headers
    markdown = markdown.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
    markdown = markdown.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
    markdown = markdown.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
    markdown = markdown.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');
    markdown = markdown.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n');
    markdown = markdown.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n');
    
    // Paragraphes
    markdown = markdown.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');
    
    // Emphasis
    markdown = markdown.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
    markdown = markdown.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
    markdown = markdown.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
    
    // Code
    markdown = markdown.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
    markdown = markdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '\n```\n$1\n```\n');
    
    // Links
    markdown = markdown.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
    
    // Images
    markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi, '![$1]($2)');
    markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '![]($1)');
    
    // Lists
    markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
      return '\n' + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1') + '\n';
    });
    
    markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
      let counter = 1;
      return '\n' + content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${counter++}. $1`) + '\n';
    });
    
    // Blockquotes
    markdown = markdown.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
      return '\n> ' + content.trim().split('\n').join('\n> ') + '\n';
    });
    
         // Tables (basique)
     markdown = markdown.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match: string, content: string) => {
       let tableMarkdown = '\n';
       const rows = content.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
       
       rows.forEach((row: string, index: number) => {
         const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
         const cellContents = cells.map((cell: string) => 
           cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi, '$1').trim()
         );
         
         tableMarkdown += '| ' + cellContents.join(' | ') + ' |\n';
         
         // Ajouter la ligne de séparation après le header
         if (index === 0) {
           tableMarkdown += '|' + cellContents.map(() => ' --- ').join('|') + '|\n';
         }
       });
       
       return tableMarkdown + '\n';
     });
    
    // Horizontal rules
    markdown = markdown.replace(/<hr[^>]*>/gi, '\n---\n');
    
    // Line breaks
    markdown = markdown.replace(/<br[^>]*>/gi, '\n');
    
    // Supprimer les balises restantes
    markdown = markdown.replace(/<[^>]*>/g, '');
    
    // Nettoyer les espaces multiples et les sauts de ligne
    markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
    markdown = markdown.replace(/^\s+|\s+$/g, '');
    
    // Décoder les entités HTML
    markdown = markdown.replace(/&amp;/g, '&');
    markdown = markdown.replace(/&lt;/g, '<');
    markdown = markdown.replace(/&gt;/g, '>');
    markdown = markdown.replace(/&quot;/g, '"');
    markdown = markdown.replace(/&#39;/g, "'");
    markdown = markdown.replace(/&nbsp;/g, ' ');
    
    return markdown;
  } catch (error) {
    throw new Error('Erreur de conversion HTML vers Markdown: ' + (error as Error).message);
  }
}; 