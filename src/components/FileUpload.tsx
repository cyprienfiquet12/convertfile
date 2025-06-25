import { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  XMarkIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { detectFileType, isSupportedFile, getFileTypeIcon } from '@/utils/detectFileType';

interface FileUploadProps {
  onFileSelect: (file: File, content: string, fileType: string) => void;
  onError: (error: string) => void;
}

export default function FileUpload({ onFileSelect, onError }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prévenir le comportement par défaut du navigateur pour le drag & drop
  useEffect(() => {
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalDrop = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Événements globaux pour empêcher le navigateur d'ouvrir le fichier
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.addEventListener(eventName, preventDefaults, false);
    });

    document.addEventListener('drop', handleGlobalDrop, false);

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.removeEventListener(eventName, preventDefaults, false);
      });
      document.removeEventListener('drop', handleGlobalDrop, false);
    };
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Vérifier si on quitte vraiment la zone de drop
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = async (file: File) => {
    setIsLoading(true);
    setSelectedFile(file);
    
    try {
      // Vérifier si le fichier est supporté
      if (!isSupportedFile(file.name)) {
        throw new Error(`Type de fichier non supporté: ${file.name.split('.').pop()}`);
      }
      
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Le fichier est trop volumineux (max 10MB)');
      }
      
      // Lire le contenu du fichier
      const content = await readFileContent(file);
      const fileType = detectFileType(file.name, content);
      
      onFileSelect(file, content, fileType);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la lecture du fichier';
      onError(errorMessage);
      setSelectedFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          resolve(content);
        } else {
          reject(new Error('Impossible de lire le contenu du fichier'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      
      // Détecter si c'est un fichier image
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension && imageExtensions.includes(fileExtension)) {
        // Pour les images, lire comme data URL
        reader.readAsDataURL(file);
      } else {
        // Pour les autres fichiers, lire comme texte
        reader.readAsText(file);
      }
    });
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Zone de drop */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-primary-400 bg-primary-400/10 scale-105 shadow-lg shadow-primary-400/20' 
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/40'
          }
          ${selectedFile ? 'bg-gray-800/50' : 'bg-gray-800/30'}
        `}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
            <p className="text-gray-400">Lecture du fichier...</p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-4 w-full max-w-md">
              <DocumentIcon className="h-8 w-8 text-primary-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatFileSize(selectedFile.size)} • {getFileTypeIcon(detectFileType(selectedFile.name))} {detectFileType(selectedFile.name).toUpperCase()}
                </p>
              </div>
              <button
                onClick={clearFile}
                className="p-1 hover:bg-gray-600 rounded transition-colors"
                aria-label="Supprimer le fichier"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            </div>
            <p className="text-sm text-green-400">✓ Fichier chargé avec succès</p>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center space-y-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudArrowUpIcon className={`h-16 w-16 transition-colors ${isDragOver ? 'text-primary-400' : 'text-gray-500'}`} />
            <div>
              <p className={`text-lg font-medium mb-2 transition-colors ${isDragOver ? 'text-primary-400' : 'text-white'}`}>
                {isDragOver ? 'Relâchez pour téléverser' : 'Glissez-déposez votre fichier ici'}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                ou cliquez pour sélectionner un fichier
              </p>
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                type="button"
              >
                Choisir un fichier
              </button>
            </div>
          </div>
        )}
        
        {/* Input caché */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept=".json,.csv,.md,.markdown,.xml,.txt,.html,.htm,.yaml,.yml"
        />
      </div>
      
      {/* Informations sur les formats supportés */}
      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Formats supportés</h4>
            <p className="text-xs text-gray-400">
              JSON, CSV, Markdown (.md), XML, TXT, HTML, YAML • Taille max: 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 