import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MentionsLegales() {
  return (
    <>
      <Head>
        <title>Mentions légales - ConvertFile</title>
        <meta name="description" content="Mentions légales et informations légales de ConvertFile" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-600">
            <h1 className="text-3xl font-bold text-white mb-8">Mentions légales</h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              
              {/* Éditeur */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Éditeur du site</h2>
                <div className="space-y-2">
                  <p><strong>Dénomination sociale :</strong> Memento ConvertFile</p>
                  <p><strong>SIRET :</strong> 98806365700015</p>
                  <p><strong>Email :</strong> contact@convertfile.fr</p>
                  <p><strong>Directeur de publication :</strong> Cyprien Fiquet</p>
                </div>
              </section>

              {/* Hébergeur */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Hébergement</h2>
                <div className="space-y-2">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p><strong>Site web :</strong> <a href="https://vercel.com" className="text-blue-400 hover:underline">https://vercel.com</a></p>
                </div>
              </section>

              {/* Propriété intellectuelle */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Propriété intellectuelle</h2>
                <div className="space-y-4">
                  <p>
                    L&apos;ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d&apos;auteur. 
                    Toute reproduction, même partielle, est interdite sans autorisation préalable.
                  </p>
                  <p>
                    Le nom &quot;ConvertFile&quot; et le logo sont des marques déposées de Memento ConvertFile.
                  </p>
                  <p>
                    Le code source de l&apos;application est disponible sous licence MIT sur 
                    <a href="https://github.com/cyprienfiquet12/convertfile" className="text-blue-400 hover:underline ml-1">
                      GitHub
                    </a>.
                  </p>
                </div>
              </section>

              {/* Limitation de responsabilité */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Limitation de responsabilité</h2>
                <div className="space-y-4">
                  <p>
                    ConvertFile met tout en œuvre pour fournir un service de qualité, mais ne peut garantir 
                    la disponibilité permanente du service ni l&apos;exactitude des conversions.
                  </p>
                  <p>
                    L&apos;utilisateur reste seul responsable de l&apos;utilisation qu&apos;il fait du service et des 
                    fichiers qu&apos;il traite.
                  </p>
                  <p>
                    En aucun cas ConvertFile ne pourra être tenu responsable des dommages directs ou indirects 
                    résultant de l&apos;utilisation du service.
                  </p>
                </div>
              </section>

              {/* Protection des données */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Protection des données personnelles</h2>
                <div className="space-y-4">
                  <p>
                    ConvertFile respecte votre vie privée et ne collecte aucune donnée personnelle lors 
                    de l&apos;utilisation du service de conversion.
                  </p>
                  <p>
                    Toutes les conversions sont effectuées localement dans votre navigateur. Aucun fichier 
                    n&apos;est envoyé à nos serveurs.
                  </p>
                  <p>
                    Pour plus d&apos;informations, consultez notre 
                    <Link href="/politique-confidentialite" className="text-blue-400 hover:underline">
                      politique de confidentialité
                    </Link>.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Cookies</h2>
                <div className="space-y-4">
                  <p>
                    Ce site utilise uniquement des cookies techniques nécessaires au bon fonctionnement 
                    de l&apos;application.
                  </p>
                  <p>
                    Aucun cookie de suivi ou publicitaire n&apos;est utilisé sans votre consentement explicite.
                  </p>
                </div>
              </section>

              {/* Droit applicable */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Droit applicable</h2>
                <div className="space-y-4">
                  <p>
                    Les présentes mentions légales sont régies par le droit français.
                  </p>
                  <p>
                    Tout litige sera de la compétence exclusive des tribunaux français.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Contact</h2>
                <div className="space-y-4">
                  <p>
                    Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Par email : <a href="mailto:contact@convertfile.fr" className="text-blue-400 hover:underline">contact@convertfile.fr</a></li>
                  </ul>
                </div>
              </section>

            </div>

            {/* Navigation */}
            <div className="mt-12 pt-6 border-t border-gray-600">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
                  ← Retour à l&apos;accueil
                </Link>
                <Link href="/politique-confidentialite" className="text-blue-400 hover:text-blue-300 text-sm">
                  Politique de confidentialité
                </Link>
                <Link href="/conditions-utilisation" className="text-blue-400 hover:text-blue-300 text-sm">
                  Conditions d&apos;utilisation
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 