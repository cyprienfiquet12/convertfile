import { ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { getAvailableOutputFormats, getFileTypeIcon } from '@/utils/detectFileType';

interface FormatSelectorProps {
  inputType: string;
  selectedOutputFormat: string;
  onFormatChange: (format: string) => void;
  isDisabled?: boolean;
}

export default function FormatSelector({ 
  inputType, 
  selectedOutputFormat, 
  onFormatChange, 
  isDisabled = false 
}: FormatSelectorProps) {
  const availableFormats = getAvailableOutputFormats(inputType);

  if (availableFormats.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
        <div className="text-center">
          <div className="text-yellow-400 text-4xl mb-2">⚠️</div>
          <h3 className="text-lg font-medium text-white mb-2">
            Aucune conversion disponible
          </h3>
          <p className="text-gray-400 text-sm">
            Le format {inputType.toUpperCase()} n'a pas de conversions supportées pour le moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        Choisir le format de sortie
      </h3>
      
      {/* Indicateur de conversion */}
      <div className="flex items-center justify-center mb-6 text-sm text-gray-400">
        <span className="flex items-center bg-gray-700 px-3 py-2 rounded-lg">
          {getFileTypeIcon(inputType)}
          <span className="ml-2 font-medium">{inputType.toUpperCase()}</span>
        </span>
        <ArrowRightIcon className="h-5 w-5 mx-4 text-primary-400" />
        <span className="flex items-center bg-primary-600 px-3 py-2 rounded-lg text-white">
          {selectedOutputFormat && getFileTypeIcon(selectedOutputFormat)}
          <span className="ml-2 font-medium">
            {selectedOutputFormat ? selectedOutputFormat.toUpperCase() : '?'}
          </span>
        </span>
      </div>
      
      {/* Sélecteur de format */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Format de destination
        </label>
        
        <div className="relative">
          <select
            value={selectedOutputFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            disabled={isDisabled}
            className={`
              w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              transition-colors appearance-none cursor-pointer
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'}
            `}
          >
            <option value="">Sélectionner un format...</option>
            {availableFormats.map((format) => (
              <option key={format} value={format}>
                {getFileTypeIcon(format)} {format.toUpperCase()}
              </option>
            ))}
          </select>
          
          <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        
        {/* Grille des options alternatives */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-3">Ou cliquez sur un format :</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableFormats.map((format) => (
              <button
                key={format}
                onClick={() => onFormatChange(format)}
                disabled={isDisabled}
                className={`
                  flex items-center justify-center p-3 border rounded-lg transition-all
                  ${selectedOutputFormat === format
                    ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700/50'}
                `}
              >
                <span className="text-lg mr-2">{getFileTypeIcon(format)}</span>
                <span className="text-sm font-medium">{format.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Informations sur le format sélectionné */}
        {selectedOutputFormat && (
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-lg">{getFileTypeIcon(selectedOutputFormat)}</span>
              <div>
                <h4 className="text-sm font-medium text-white">
                  Format {selectedOutputFormat.toUpperCase()}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {getFormatDescription(selectedOutputFormat)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Obtient une description du format de fichier
 */
function getFormatDescription(format: string): string {
  const descriptions: Record<string, string> = {
    json: 'JavaScript Object Notation - Format d\'échange de données léger',
    csv: 'Comma-Separated Values - Format tabulaire compatible Excel',
    xml: 'eXtensible Markup Language - Format de données structuré',
    html: 'HyperText Markup Language - Format de page web',
    yaml: 'YAML Ain\'t Markup Language - Format de configuration lisible',
    markdown: 'Format de texte avec syntaxe de formatage simple',
  };
  
  return descriptions[format] || 'Format de fichier';
} 