import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="ConvertFile Logo" 
                width={64} 
                height={64}
                className="h-16 w-16"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ConvertFile</h1>
              <p className="text-xs text-gray-400">Convertisseur de fichiers multi-format</p>
            </div>
          </div>
                 </div>
      </div>
    </nav>
  );
} 