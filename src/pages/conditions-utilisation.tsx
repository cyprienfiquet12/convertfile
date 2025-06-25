import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ConditionsUtilisation() {
  return (
    <>
      <Head>
        <title>Conditions d&apos;utilisation - ConvertFile</title>
        <meta name="description" content="Conditions d&apos;utilisation du service ConvertFile" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-600">
            <h1 className="text-3xl font-bold text-white mb-8">Conditions d&apos;utilisation</h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              
              {/* Introduction */}
              <section>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 font-medium">
                    📋 En utilisant ConvertFile, vous acceptez les présentes conditions d&apos;utilisation. 
                    Veuillez les lire attentivement.
                  </p>
                </div>
                
                <p>
                  Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;utilisation 
                  du service ConvertFile fourni par Memento ConvertFile.
                </p>
                <p className="text-sm text-gray-400">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </section>

              {/* Description du service */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Description du service</h2>
                <div className="space-y-4">
                  <p>
                    ConvertFile est un service gratuit de conversion de fichiers en ligne qui permet :
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>La conversion entre plus de 65 formats de fichiers</li>
                    <li>Le traitement local des fichiers dans votre navigateur</li>
                    <li>La conversion de données structurées (JSON, CSV, XML, YAML)</li>
                    <li>La conversion d&apos;images entre différents formats</li>
                    <li>Les transformations de texte et d&apos;encodage</li>
                  </ul>
                  
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-300">
                      <strong>Sécurité :</strong> Toutes les conversions sont effectuées localement 
                      dans votre navigateur. Aucun fichier n&apos;est envoyé à nos serveurs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Responsabilités */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Responsabilités</h2>
                <div className="space-y-4">
                  <p>En utilisant le Service, vous vous engagez à :</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Respecter la législation en vigueur</li>
                    <li>Ne convertir que des fichiers dont vous détenez les droits</li>
                    <li>Vérifier l&apos;exactitude des conversions avant utilisation</li>
                    <li>Ne pas tenter de surcharger ou endommager le Service</li>
                  </ul>
                  
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-yellow-300">
                      <strong>Important :</strong> Vous restez seul responsable du contenu de vos fichiers 
                      et de l&apos;usage que vous faites des fichiers convertis.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation de responsabilité */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Limitation de responsabilité</h2>
                <div className="space-y-4">
                  <p>
                    Le Service est fourni &quot;en l&apos;état&quot; sans garantie d&apos;aucune sorte.
                  </p>
                  <p>
                    En aucun cas ConvertFile ne pourra être tenu responsable de dommages directs, 
                    indirects, accessoires ou consécutifs résultant de l&apos;utilisation du Service.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Contact</h2>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p><strong>Memento ConvertFile</strong></p>
                    <p>SIRET : 98806365700015</p>
                    <p>Email : <a href="mailto:contact@convertfile.fr" className="text-blue-400 hover:underline">contact@convertfile.fr</a></p>
                    <p>Directeur : Cyprien Fiquet</p>
                  </div>
                </div>
              </section>

            </div>

            {/* Navigation */}
            <div className="mt-12 pt-6 border-t border-gray-600">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
                  ← Retour à l&apos;accueil
                </Link>
                <Link href="/mentions-legales" className="text-blue-400 hover:text-blue-300 text-sm">
                  Mentions légales
                </Link>
                <Link href="/politique-confidentialite" className="text-blue-400 hover:text-blue-300 text-sm">
                  Politique de confidentialité
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