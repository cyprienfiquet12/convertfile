import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import TextInput from '@/components/TextInput';
import FormatSelector from '@/components/FormatSelector';
import OutputViewer from '@/components/OutputViewer';
import Footer from '@/components/Footer';

// Imports des convertisseurs
import { 
  jsonToCsv, csvToJson, markdownToHtml, xmlToJson,
  yamlToJson, jsonToYaml, htmlToMarkdown, jsonToXml, csvToXml, xmlToCsv,
  jsonToSql, jsonToEnv, textToBase64, base64ToText, jsonToBase64, base64ToJson,
  textToUrlEncoded, urlEncodedToText, jsonToQueryString, queryStringToJson,
  queryStringToText, queryStringToXml,
  formatJson, minifyJson, textToUpperCase, textToLowerCase, textToTitleCase,
  textToCamelCase, textToSnakeCase, textToKebabCase, textToMarkdown, textToHtml, markdownToText, getTextStats
} from '@/converters';

// Import des convertisseurs d'images
import {
  jpegToPng, jpegToWebp, jpegToGif, jpegToBmp, jpegToIco,
  pngToJpeg, pngToWebp, pngToGif, pngToBmp, pngToIco,
  webpToJpeg, webpToPng, webpToGif, webpToBmp, webpToIco,
  gifToJpeg, gifToPng, gifToWebp, gifToBmp, gifToIco,
  bmpToJpeg, bmpToPng, bmpToWebp, bmpToGif, bmpToIco,
  svgToPng, svgToJpeg, svgToWebp,
  icoToPng, icoToJpeg, icoToWebp, icoToGif, icoToBmp,
  tiffToJpeg, tiffToPng, tiffToWebp, tiffToBmp,
  imageToBase64, base64ToImage
} from '@/converters/imageConverters';

interface FileData {
  file: File;
  content: string;
  type: string;
}

interface TextData {
  content: string;
  type: string;
}

type InputMode = 'file' | 'text';

export default function Home() {
  const [inputMode, setInputMode] = useState<InputMode>('file');
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [textData, setTextData] = useState<TextData | null>(null);
  const [selectedOutputFormat, setSelectedOutputFormat] = useState<string>('');
  const [outputContent, setOutputContent] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (file: File, content: string, fileType: string) => {
    setFileData({ file, content, type: fileType });
    setTextData(null);
    setSelectedOutputFormat('');
    setOutputContent('');
    setError('');
  };

  const handleTextSelect = (content: string, textType: string) => {
    setTextData({ content, type: textType });
    setFileData(null);
    setSelectedOutputFormat('');
    setOutputContent('');
    setError('');
  };

  const handleFileError = (errorMessage: string) => {
    setError(errorMessage);
    setFileData(null);
    setOutputContent('');
  };

  const handleTextError = (errorMessage: string) => {
    setError(errorMessage);
    setTextData(null);
    setOutputContent('');
  };

  const handleFormatChange = (format: string) => {
    setSelectedOutputFormat(format);
    setError('');
    
    const currentData = fileData || textData;
    if (currentData && format) {
      convertContent(currentData, format);
    }
  };

  const handleModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setFileData(null);
    setTextData(null);
    setSelectedOutputFormat('');
    setOutputContent('');
    setError('');
  };

  const convertContent = async (data: FileData | TextData, outputFormat: string) => {
    setIsConverting(true);
    setError('');
    
    try {
      let result: string;
      
      switch (`${data.type}-${outputFormat}`) {
        // Conversions JSON
        case 'json-csv':
          result = jsonToCsv(data.content);
          break;
        case 'json-xml':
          result = jsonToXml(data.content);
          break;
        case 'json-yaml':
          result = jsonToYaml(data.content);
          break;
        case 'json-base64':
          result = jsonToBase64(data.content);
          break;
        case 'json-sql':
          result = jsonToSql(data.content);
          break;
        case 'json-env':
          result = jsonToEnv(data.content);
          break;
        case 'json-querystring':
          result = jsonToQueryString(data.content);
          break;
        case 'json-formatted':
          result = formatJson(data.content);
          break;
        case 'json-minified':
          result = minifyJson(data.content);
          break;
          
        // Conversions CSV
        case 'csv-json':
          result = csvToJson(data.content);
          break;
        case 'csv-xml':
          result = csvToXml(data.content);
          break;
          
        // Conversions Markdown
        case 'markdown-html':
          result = markdownToHtml(data.content);
          break;
        case 'markdown-text':
          result = markdownToText(data.content);
          break;
          
        // Conversions XML
        case 'xml-json':
          result = await xmlToJson(data.content);
          break;
        case 'xml-csv':
          result = await xmlToCsv(data.content);
          break;
          
        // Conversions YAML
        case 'yaml-json':
          result = yamlToJson(data.content);
          break;
        case 'yaml-xml':
          const jsonFromYaml = yamlToJson(data.content);
          result = jsonToXml(jsonFromYaml);
          break;
          
        // Conversions HTML
        case 'html-markdown':
          result = htmlToMarkdown(data.content);
          break;
          
        // Conversions Base64
        case 'base64-text':
          result = base64ToText(data.content);
          break;
        case 'base64-json':
          result = base64ToJson(data.content);
          break;
          
        // Conversions Base64 vers images
        case 'base64-png':
          result = await base64ToImage(data.content, 'png');
          break;
        case 'base64-jpeg':
          result = await base64ToImage(data.content, 'jpeg');
          break;
        case 'base64-webp':
          result = await base64ToImage(data.content, 'webp');
          break;
        case 'base64-gif':
          result = await base64ToImage(data.content, 'gif');
          break;
        case 'base64-bmp':
          result = await base64ToImage(data.content, 'bmp');
          break;
          
        // Conversions URL
        case 'url-encoded-text':
          result = urlEncodedToText(data.content);
          break;
          
        // Conversions Query String
        case 'querystring-json':
          result = queryStringToJson(data.content);
          break;
        case 'querystring-text':
          result = queryStringToText(data.content);
          break;
        case 'querystring-xml':
          result = queryStringToXml(data.content);
          break;
          
        // Conversions de texte
        case 'text-markdown':
          result = textToMarkdown(data.content);
          break;
        case 'text-html':
          result = textToHtml(data.content);
          break;
        case 'text-base64':
          result = textToBase64(data.content);
          break;
        case 'text-url-encoded':
          result = textToUrlEncoded(data.content);
          break;
        case 'text-uppercase':
          result = textToUpperCase(data.content);
          break;
        case 'text-lowercase':
          result = textToLowerCase(data.content);
          break;
        case 'text-titlecase':
          result = textToTitleCase(data.content);
          break;
        case 'text-camelcase':
          result = textToCamelCase(data.content);
          break;
        case 'text-snakecase':
          result = textToSnakeCase(data.content);
          break;
        case 'text-kebabcase':
          result = textToKebabCase(data.content);
          break;
        case 'text-stats':
          result = JSON.stringify(getTextStats(data.content), null, 2);
          break;
  
        // Conversions d'images JPEG
        case 'jpeg-png':
          result = await jpegToPng(data.content);
          break;
        case 'jpeg-webp':
          result = await jpegToWebp(data.content);
          break;
        case 'jpeg-gif':
          result = await jpegToGif(data.content);
          break;
        case 'jpeg-bmp':
          result = await jpegToBmp(data.content);
          break;
        case 'jpeg-ico':
          result = await jpegToIco(data.content);
          break;
        case 'jpeg-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images PNG
        case 'png-jpeg':
          result = await pngToJpeg(data.content);
          break;
        case 'png-webp':
          result = await pngToWebp(data.content);
          break;
        case 'png-gif':
          result = await pngToGif(data.content);
          break;
        case 'png-bmp':
          result = await pngToBmp(data.content);
          break;
        case 'png-ico':
          result = await pngToIco(data.content);
          break;
        case 'png-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images WebP
        case 'webp-jpeg':
          result = await webpToJpeg(data.content);
          break;
        case 'webp-png':
          result = await webpToPng(data.content);
          break;
        case 'webp-gif':
          result = await webpToGif(data.content);
          break;
        case 'webp-bmp':
          result = await webpToBmp(data.content);
          break;
        case 'webp-ico':
          result = await webpToIco(data.content);
          break;
        case 'webp-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images GIF
        case 'gif-jpeg':
          result = await gifToJpeg(data.content);
          break;
        case 'gif-png':
          result = await gifToPng(data.content);
          break;
        case 'gif-webp':
          result = await gifToWebp(data.content);
          break;
        case 'gif-bmp':
          result = await gifToBmp(data.content);
          break;
        case 'gif-ico':
          result = await gifToIco(data.content);
          break;
        case 'gif-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images BMP
        case 'bmp-jpeg':
          result = await bmpToJpeg(data.content);
          break;
        case 'bmp-png':
          result = await bmpToPng(data.content);
          break;
        case 'bmp-webp':
          result = await bmpToWebp(data.content);
          break;
        case 'bmp-gif':
          result = await bmpToGif(data.content);
          break;
        case 'bmp-ico':
          result = await bmpToIco(data.content);
          break;
        case 'bmp-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images SVG
        case 'svg-png':
          result = await svgToPng(data.content);
          break;
        case 'svg-jpeg':
          result = await svgToJpeg(data.content);
          break;
        case 'svg-webp':
          result = await svgToWebp(data.content);
          break;
        case 'svg-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images ICO
        case 'ico-png':
          result = await icoToPng(data.content);
          break;
        case 'ico-jpeg':
          result = await icoToJpeg(data.content);
          break;
        case 'ico-webp':
          result = await icoToWebp(data.content);
          break;
        case 'ico-gif':
          result = await icoToGif(data.content);
          break;
        case 'ico-bmp':
          result = await icoToBmp(data.content);
          break;
        case 'ico-base64':
          result = await imageToBase64(data.content);
          break;
          
        // Conversions d'images TIFF
        case 'tiff-jpeg':
          result = await tiffToJpeg(data.content);
          break;
        case 'tiff-png':
          result = await tiffToPng(data.content);
          break;
        case 'tiff-webp':
          result = await tiffToWebp(data.content);
          break;
        case 'tiff-bmp':
          result = await tiffToBmp(data.content);
          break;
        case 'tiff-base64':
          result = await imageToBase64(data.content);
          break;
          
        default:
          throw new Error(`Conversion de ${data.type} vers ${outputFormat} non supportée`);
      }
      
      setOutputContent(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la conversion';
      setError(errorMessage);
      console.error('Erreur de conversion:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const currentData = fileData || textData;

  return (
    <>
      <Head>
        <title>ConvertFile - Convertisseur de fichiers universel</title>
        <meta name="description" content="Convertissez facilement vos fichiers entre différents formats : JSON, CSV, XML, YAML, Markdown, HTML, Base64, images et plus encore." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Switch Mode */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gray-800/50 rounded-lg p-1 border border-gray-600">
              <button
                onClick={() => handleModeChange('file')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  inputMode === 'file'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                📁 Mode Fichier
              </button>
              <button
                onClick={() => handleModeChange('text')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  inputMode === 'text'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                ✏️ Mode Texte
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {inputMode === 'file' ? (
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onError={handleFileError}
                />
              ) : (
                <TextInput
                  onTextSelect={handleTextSelect}
                  onError={handleTextError}
                />
              )}

              {currentData && (
                <FormatSelector
                  inputType={currentData.type}
                  onFormatChange={handleFormatChange}
                  selectedOutputFormat={selectedOutputFormat}
                />
              )}
            </div>
            
            {/* Output Section */}
            <div>
              <OutputViewer
                outputContent={outputContent}
                outputFormat={selectedOutputFormat}
                originalFileName={fileData?.file?.name || 'converted'}
                isLoading={isConverting}
                error={error}
              />
            </div>
          </div>
          
          {/* Conversions supportées */}
          <div className="mt-16 bg-gray-800/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ✨ Conversions supportées
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center">
                  📊 Formats de données
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• JSON ↔ CSV, XML, YAML</li>
                  <li>• CSV ↔ JSON, XML</li>
                  <li>• XML ↔ JSON, CSV</li>
                  <li>• YAML ↔ JSON, XML</li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center">
                  🌐 Web & Markup
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• HTML ↔ Markdown</li>
                  <li>• Markdown → Text</li>
                  <li>• Query String → JSON, Text, XML</li>
                  <li>• Text → HTML, Markdown</li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center">
                  🔒 Encodage
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Base64 ↔ Text, JSON</li>
                  <li>• URL Encoding ↔ Text</li>
                  <li>• JSON → Query String</li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center">
                  🗄️ Base de données
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• JSON → SQL INSERT</li>
                  <li>• JSON → Variables d&apos;environnement</li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center">
                  ✏️ Formatage
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• JSON Pretty Print / Minify</li>
                  <li>• Text Case Transformations</li>
                  <li>• Text Statistics</li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center">
                  🖼️ Images
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• JPEG, PNG, WebP, GIF</li>
                  <li>• BMP, SVG, ICO, TIFF</li>
                  <li>• Images ↔ Base64</li>
                  <li>• Toutes conversions croisées</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 