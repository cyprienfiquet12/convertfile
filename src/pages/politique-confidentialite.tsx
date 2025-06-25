import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité - ConvertFile</title>
        <meta name="description" content="Politique de confidentialité et protection des données de ConvertFile" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-600">
            <h1 className="text-3xl font-bold text-white mb-8">Politique de confidentialité</h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              
              {/* Introduction */}
              <section>
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-300 font-medium">
                    🔒 ConvertFile respecte votre vie privée. Aucune donnée personnelle n&apos;est collectée 
                    et toutes les conversions sont effectuées localement dans votre navigateur.
                  </p>
                </div>
                
                <p>
                  La présente politique de confidentialité décrit comment Memento ConvertFile 
                  traite vos données personnelles dans le cadre de l&apos;utilisation du service ConvertFile.
                </p>
                <p className="text-sm text-gray-400">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </section>

              {/* Responsable du traitement */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Responsable du traitement</h2>
                <div className="space-y-2">
                  <p><strong>Memento ConvertFile</strong></p>
                  <p>SIRET : 98806365700015</p>
                  <p>Email : contact@convertfile.fr</p>
                  <p>Représentant : Cyprien Fiquet</p>
                </div>
              </section>

              {/* Données collectées */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Données collectées</h2>
                
                <h3 className="text-lg font-medium text-white mb-3">2.1 Données de conversion</h3>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                  <p className="text-blue-300">
                    <strong>Important :</strong> ConvertFile ne collecte AUCUNE donnée lors des conversions. 
                    Tous les fichiers sont traités localement dans votre navigateur et ne sont jamais 
                    envoyés à nos serveurs.
                  </p>
                </div>

                <h3 className="text-lg font-medium text-white mb-3">2.2 Données techniques</h3>
                <p>Pour assurer le bon fonctionnement du service, nous collectons automatiquement :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Adresse IP (anonymisée)</li>
                  <li>Type de navigateur et version</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Résolution d&apos;écran</li>
                  <li>Statistiques d&apos;utilisation anonymes</li>
                </ul>

                <h3 className="text-lg font-medium text-white mb-3">2.3 Données de contact</h3>
                <p>Si vous nous contactez, nous collectons :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nom et prénom (optionnel)</li>
                  <li>Adresse email</li>
                  <li>Contenu de votre message</li>
                </ul>
              </section>

              {/* Finalités */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Finalités du traitement</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">3.1 Fonctionnement du service</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Fournir le service de conversion de fichiers</li>
                      <li>Assurer la sécurité et la stabilité du site</li>
                      <li>Améliorer les performances</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">3.2 Statistiques anonymes</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Analyser l&apos;utilisation du service</li>
                      <li>Identifier les formats les plus utilisés</li>
                      <li>Détecter les erreurs techniques</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">3.3 Support client</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Répondre à vos questions</li>
                      <li>Résoudre les problèmes techniques</li>
                      <li>Améliorer le service</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Base légale */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Base légale du traitement</h2>
                <div className="space-y-4">
                  <p><strong>Intérêt légitime :</strong> Amélioration du service et statistiques anonymes</p>
                  <p><strong>Consentement :</strong> Utilisation de cookies non essentiels</p>
                  <p><strong>Exécution du contrat :</strong> Fourniture du service de conversion</p>
                </div>
              </section>

              {/* Conservation */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Durée de conservation</h2>
                <div className="space-y-4">
                  <p><strong>Données de navigation :</strong> 13 mois maximum</p>
                  <p><strong>Données de contact :</strong> 3 ans après le dernier contact</p>
                  <p><strong>Fichiers convertis :</strong> Jamais stockés (traitement local)</p>
                </div>
              </section>

              {/* Partage des données */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Partage des données</h2>
                <div className="space-y-4">
                  <p>
                    ConvertFile ne vend, ne loue ni ne partage vos données personnelles avec des tiers, 
                    sauf dans les cas suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Prestataires techniques :</strong> Vercel (hébergement), services d&apos;analyse anonyme</li>
                    <li><strong>Obligations légales :</strong> Sur demande des autorités compétentes</li>
                    <li><strong>Protection de nos droits :</strong> En cas de fraude ou d&apos;abus</li>
                  </ul>
                </div>
              </section>

              {/* Vos droits */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Vos droits (RGPD)</h2>
                <div className="space-y-4">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Droit d&apos;accès :</strong> Obtenir une copie de vos données</li>
                    <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
                    <li><strong>Droit à l&apos;effacement :</strong> Supprimer vos données</li>
                    <li><strong>Droit d&apos;opposition :</strong> Refuser le traitement</li>
                  </ul>
                  
                  <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
                    <p className="font-medium">Pour exercer vos droits :</p>
                    <p>Email : <a href="mailto:contact@convertfile.fr" className="text-blue-400 hover:underline">contact@convertfile.fr</a></p>
                    <p className="text-sm text-gray-400 mt-2">
                      Nous vous répondrons dans un délai maximum de 30 jours.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Cookies</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white mb-2">8.1 Cookies essentiels</h3>
                  <p>Cookies techniques nécessaires au fonctionnement du site (pas de consentement requis).</p>
                  
                  <h3 className="text-lg font-medium text-white mb-2">8.2 Cookies d&apos;analyse</h3>
                  <p>Cookies pour mesurer l&apos;audience (avec votre consentement uniquement).</p>
                  
                  <p className="text-sm">
                    Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté 
                    de leur dépôt.
                  </p>
                </div>
              </section>

              {/* Sécurité */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Sécurité</h2>
                <div className="space-y-4">
                  <p>Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données :</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Chiffrement HTTPS pour toutes les communications</li>
                    <li>Traitement local des fichiers (pas de transfert)</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Surveillance constante de la sécurité</li>
                    <li>Mise à jour régulière des systèmes</li>
                  </ul>
                </div>
              </section>

              {/* Transferts internationaux */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">10. Transferts internationaux</h2>
                <div className="space-y-4">
                  <p>
                    Nos serveurs sont hébergés aux États-Unis (Vercel). Ce transfert est encadré par 
                    des garanties appropriées conformes au RGPD.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Contact</h2>
                <div className="space-y-4">
                  <p>Email : <a href="mailto:contact@convertfile.fr" className="text-blue-400 hover:underline">contact@convertfile.fr</a></p>
                  
                  <p className="mt-4">
                    <strong>Autorité de contrôle :</strong> Vous pouvez également introduire une réclamation 
                    auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).
                  </p>
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