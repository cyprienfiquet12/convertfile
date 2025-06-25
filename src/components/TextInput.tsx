import { useState, ChangeEvent } from 'react';
import { 
  DocumentTextIcon,
  XMarkIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { detectFileType, getFileTypeIcon } from '@/utils/detectFileType';

interface TextInputProps {
  onTextSelect: (content: string, textType: string) => void;
  onError: (error: string) => void;
}

export default function TextInput({ onTextSelect, onError }: TextInputProps) {
  const [inputText, setInputText] = useState('');
  const [detectedType, setDetectedType] = useState<string>('text');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    
    if (text.trim()) {
      try {
        const detected = detectFileType('input.txt', text);
        setDetectedType(detected);
        onTextSelect(text, detected);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'analyse du texte';
        onError(errorMessage);
      }
    } else {
      setDetectedType('text');
    }
  };

  const clearText = () => {
    setInputText('');
    setDetectedType('text');
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      if (text.trim()) {
        const detected = detectFileType('input.txt', text);
        setDetectedType(detected);
        onTextSelect(text, detected);
      }
    } catch (error) {
      onError('Impossible d\'accéder au presse-papiers');
    }
  };

  const formatTextSize = (text: string): string => {
    const bytes = new Blob([text]).size;
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Zone de saisie */}
      <div className="bg-gray-800/30 border-2 border-dashed border-gray-600 rounded-lg overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600 bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="h-6 w-6 text-primary-400" />
            <div>
              <h3 className="text-lg font-medium text-white">
                Saisie de texte
              </h3>
              <p className="text-sm text-gray-400">
                Collez ou tapez votre contenu à convertir
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={pasteFromClipboard}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
            >
              Coller
            </button>
            {inputText && (
              <button
                onClick={clearText}
                className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                aria-label="Effacer le texte"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Zone de texte */}
        <div className="p-4">
          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder="Collez ou tapez votre contenu ici...&#10;&#10;Formats supportés:&#10;• JSON, XML, CSV, YAML&#10;• Markdown, HTML&#10;• Base64, URL encoded&#10;• Query strings&#10;• Texte simple"
            className="w-full h-64 bg-gray-900/50 border border-gray-600 rounded-lg p-4 text-gray-300 placeholder-gray-500 resize-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Informations sur le contenu */}
        {inputText && (
          <div className="px-4 pb-4">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileTypeIcon(detectedType)}</span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Type détecté: {detectedType.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatTextSize(inputText)} • {inputText.split('\n').length} lignes • {inputText.length} caractères
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-green-400">✓ Prêt à convertir</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


    </div>
  );
} 