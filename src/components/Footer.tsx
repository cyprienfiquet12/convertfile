import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">ConvertFile</h3>
            <p className="text-gray-400 text-sm">
              Convertisseur de fichiers universel en ligne. 
              Gratuit, sécurisé et respectueux de votre vie privée.
            </p>
            <p className="text-xs text-gray-500">
              Toutes les conversions sont effectuées localement dans votre navigateur.
            </p>
          </div>

          {/* Legal links */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-white">Légal</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/conditions-utilisation" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d&apos;utilisation
              </Link>
            </nav>
          </div>

          {/* Technical */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-white">Technique</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/api" className="text-gray-400 hover:text-white text-sm transition-colors">
                API Documentation (A venir)
              </Link>
              <a 
                href="https://github.com/cyprienfiquet12/convertfile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Code source
              </a>
            </nav>
          </div>
        </div>

        {/* Legal notice */}
        <div className="border-t border-gray-700 pt-6 space-y-4">
          <div className="text-xs text-gray-500 space-y-2">
            <p>
              <strong>Éditeur :</strong>Memento ConvertFile - SIRET : 98806365700015
            </p>
            <p>
              <strong>Directeur de publication :</strong> Cyprien Fiquet
            </p>
            <p>
              <strong>Hébergement :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
            </p>
            <p>
              <strong>Protection des données :</strong> Conformément au RGPD, vos données personnelles sont traitées de manière sécurisée. 
              Aucune donnée n&apos;est stockée sur nos serveurs lors des conversions.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            © {currentYear} ConvertFile. Tous droits réservés.
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Made in France 🇫🇷</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Sécurisé par</span>
              <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-green-400">HTTPS</span>
            </div>
          </div>
        </div>

        {/* RGPD Compliance notice */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-xs text-blue-300">
              <p className="font-medium mb-1">Respect de votre vie privée</p>
              <p>
                ConvertFile traite vos fichiers localement dans votre navigateur. 
                Aucune donnée n&apos;est envoyée à nos serveurs. Conformité RGPD garantie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 