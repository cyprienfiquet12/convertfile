import { useState } from 'react';
import Image from 'next/image';
import { 
  DocumentArrowDownIcon, 
  ClipboardDocumentIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface OutputViewerProps {
  outputContent: string;
  outputFormat: string;
  originalFileName: string;
  isLoading: boolean;
  error?: string;
}

export default function OutputViewer({
  outputContent,
  outputFormat,
  originalFileName,
  isLoading,
  error
}: OutputViewerProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const downloadFile = () => {
    if (!outputContent || !outputFormat) return;

    const fileName = generateFileName(originalFileName, outputFormat);
    
    // Vérifier si c'est un format d'image
    const imageFormats = ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'ico', 'tiff'];
    const isImageFormat = imageFormats.includes(outputFormat.toLowerCase());
    
    if (isImageFormat && outputContent.startsWith('data:')) {
      // Pour les images (data URLs), utiliser directement le data URL
      const link = document.createElement('a');
      link.href = outputContent;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Pour les autres formats, utiliser Blob
      const mimeType = getMimeType(outputFormat);
      const blob = new Blob([outputContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const copyToClipboard = async () => {
    try {
      // Pour les images, on copie seulement l'URL data, pas l'image elle-même
      const imageFormats = ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'ico', 'tiff'];
      if (imageFormats.includes(outputFormat.toLowerCase()) && outputContent.startsWith('data:')) {
        await navigator.clipboard.writeText(outputContent);
      } else {
        await navigator.clipboard.writeText(outputContent);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const generateFileName = (originalName: string, format: string): string => {
    const baseName = originalName.split('.').slice(0, -1).join('.') || 'converted';
    return `${baseName}_converted.${format}`;
  };

  const getMimeType = (format: string): string => {
    const mimeTypes: Record<string, string> = {
      json: 'application/json',
      csv: 'text/csv',
      xml: 'application/xml',
      html: 'text/html',
      yaml: 'application/x-yaml',
      txt: 'text/plain',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
      gif: 'image/gif',
      bmp: 'image/bmp',
      ico: 'image/x-icon',
      tiff: 'image/tiff',
      svg: 'image/svg+xml',
    };
    return mimeTypes[format] || 'text/plain';
  };

  const formatContentForDisplay = (content: string, format: string): string => {
    // Pour HTML, on affiche le code source plutôt que le rendu
    if (format === 'html' && content.includes('<!DOCTYPE html>')) {
      return content;
    }
    
    // Pour les images, on ne va pas afficher le data URL complet (trop long)
    const imageFormats = ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'ico', 'tiff'];
    if (imageFormats.includes(format.toLowerCase()) && content.startsWith('data:')) {
      return `[Image convertie en format ${format.toUpperCase()}]\n\nData URL: ${content.substring(0, 100)}...\n\nTaille: ${Math.round(content.length * 0.75)} bytes (approximatif)`;
    }
    
    // Pour les autres formats, on retourne tel quel
    return content;
  };

  const getLanguageForSyntaxHighlighting = (format: string): string => {
    const languageMap: Record<string, string> = {
      json: 'json',
      xml: 'xml',
      html: 'html',
      yaml: 'yaml',
      csv: 'csv',
    };
    return languageMap[format] || 'text';
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
          <p className="text-gray-400">Conversion en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-red-300 mb-2">
              Erreur de conversion
            </h3>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!outputContent) {
    return (
      <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-8">
        <div className="text-center text-gray-500">
          <DocumentArrowDownIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Le fichier converti apparaîtra ici</p>
        </div>
      </div>
    );
  }

  const displayContent = formatContentForDisplay(outputContent, outputFormat);
  
  // Calcul de la taille de fichier approprié
  const imageFormats = ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'ico', 'tiff'];
  const isImageFormat = imageFormats.includes(outputFormat.toLowerCase());
  
  let fileSize;
  if (isImageFormat && outputContent.startsWith('data:')) {
    // Pour les images data URL, calculer la taille réelle des données
    const base64Data = outputContent.split(',')[1] || '';
    fileSize = Math.round(base64Data.length * 0.75); // Conversion base64 vers bytes
  } else {
    fileSize = new Blob([outputContent]).size;
  }
  
  const formattedSize = fileSize > 1024 
    ? (fileSize / 1024).toFixed(2) + ' KB'
    : fileSize + ' bytes';

  return (
    <div className="bg-gray-800/50 border border-gray-600 rounded-lg overflow-hidden">
      {/* En-tête avec actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600 bg-gray-800/80">
        <div>
          <h3 className="text-lg font-medium text-white">
            Fichier converti ({outputFormat.toUpperCase()})
          </h3>
          <p className="text-sm text-gray-400">
            {generateFileName(originalFileName, outputFormat)} • {formattedSize}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
          >
            {isPreviewVisible ? (
              <>
                <EyeSlashIcon className="h-4 w-4" />
                <span>Masquer</span>
              </>
            ) : (
              <>
                <EyeIcon className="h-4 w-4" />
                <span>Afficher</span>
              </>
            )}
          </button>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
          >
            {isCopied ? (
              <>
                <CheckIcon className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Copié!</span>
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="h-4 w-4" />
                <span>Copier</span>
              </>
            )}
          </button>
          
          <button
            onClick={downloadFile}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>Télécharger</span>
          </button>
        </div>
      </div>
      
      {/* Aperçu du contenu */}
      {isPreviewVisible && (
        <div className="relative">
          {/* Affichage spécial pour les images */}
          {outputFormat && ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'ico', 'tiff'].includes(outputFormat.toLowerCase()) && outputContent.startsWith('data:') ? (
            <div className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative max-w-full max-h-96 border border-gray-600 rounded-lg shadow-lg overflow-hidden">
                  <Image 
                    src={outputContent} 
                    alt="Image convertie"
                    width={500}
                    height={400}
                    className="object-contain w-full h-full"
                    unoptimized={true}
                  />
                </div>
                <div className="text-sm text-gray-400 text-center">
                  <p>Image convertie en format {outputFormat.toUpperCase()}</p>
                  <p className="text-xs mt-1">Cliquez sur &quot;Télécharger&quot; pour sauvegarder l&apos;image</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                {getLanguageForSyntaxHighlighting(outputFormat)}
              </div>
              
              <pre className="p-4 text-sm text-gray-300 bg-gray-900/50 overflow-auto max-h-96 whitespace-pre-wrap">
                <code>{displayContent}</code>
              </pre>
              
              {displayContent.length > 5000 && (
                <div className="p-3 bg-yellow-900/20 border-t border-yellow-500/30 text-yellow-200 text-sm">
                  ⚠️ Aperçu tronqué - Le fichier complet sera disponible au téléchargement
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Statistiques */}
      <div className="px-4 py-3 bg-gray-800/30 border-t border-gray-600">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {outputContent.split('\n').length} lignes • {outputContent.length} caractères
          </span>
          <span>
            Format: {outputFormat.toUpperCase()} • Taille: {formattedSize}
          </span>
        </div>
      </div>
    </div>
  );
} 