# ConvertFile - Convertisseur de Fichiers Multi-Format

Une application web moderne pour convertir des fichiers entre différents formats (JSON, CSV, Markdown, XML, etc.).

## 🚀 Fonctionnalités

- **Upload drag & drop** ou sélection de fichiers
- **Conversion en temps réel** entre formats
- **Aperçu en direct** du fichier converti
- **Téléchargement direct** du résultat
- **Interface sombre moderne** avec TailwindCSS
- **Traitement local** - aucune donnée envoyée sur serveur

## 📋 Formats Supportés

### Conversions Disponibles

- **JSON** → CSV, XML, YAML
- **CSV** → JSON, XML
- **Markdown** → HTML (avec style)
- **XML** → JSON, CSV

## 🛠️ Technologies

- **Next.js 14** (TypeScript)
- **React 18** (Hooks)
- **TailwindCSS** (Styling)
- **Heroicons** (Icons)
- **PapaParse** (CSV processing)
- **Marked** (Markdown parsing)
- **xml2js** (XML parsing)

## 📦 Installation

### 1. Cloner le projet

\`\`\`bash
git clone <repository-url>
cd convertfile
\`\`\`

### 2. Installer les dépendances

\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

### 3. Lancer en mode développement

\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du Projet

\`\`\`
src/
├── components/           # Composants React
│   ├── FileUpload.tsx   # Upload avec drag & drop
│   ├── FormatSelector.tsx # Sélection de format
│   ├── OutputViewer.tsx # Affichage du résultat
│   └── Navbar.tsx       # Navigation
├── converters/          # Modules de conversion
│   ├── jsonToCsv.ts    # JSON → CSV
│   ├── csvToJson.ts    # CSV → JSON
│   ├── markdownToHtml.ts # Markdown → HTML
│   └── xmlToJson.ts    # XML → JSON
├── utils/              # Utilitaires
│   └── detectFileType.ts # Détection de type
├── pages/              # Pages Next.js
│   ├── _app.tsx        # Configuration app
│   └── index.tsx       # Page principale
└── styles/             # Styles globaux
    └── globals.css     # TailwindCSS
\`\`\`

## 🎯 Utilisation

1. **Téléverser** : Glissez-déposez votre fichier ou cliquez pour le sélectionner
2. **Convertir** : Choisissez le format de sortie désiré
3. **Télécharger** : Téléchargez votre fichier converti

## 🔧 Développement

### Ajouter un nouveau convertisseur

1. Créer le fichier dans \`src/converters/\`
2. Implémenter la fonction de conversion
3. Ajouter l'export dans \`src/converters/index.ts\`
4. Mettre à jour \`src/utils/detectFileType.ts\`
5. Ajouter le cas dans \`src/pages/index.tsx\`

### Exemple de convertisseur

\`\`\`typescript
// src/converters/jsonToYaml.ts
export const jsonToYaml = (jsonString: string): string => {
  try {
    const jsonData = JSON.parse(jsonString);
    // Logique de conversion vers YAML
    return yamlString;
  } catch (error) {
    throw new Error('Erreur de conversion JSON → YAML');
  }
};
\`\`\`

## 📱 Build et Déploiement

### Build de production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Analyse du bundle

\`\`\`bash
npm run build
# Puis analyser les fichiers dans .next/
\`\`\`

## 🎨 Personnalisation

### Thème et couleurs

Modifiez \`tailwind.config.js\` pour personnaliser les couleurs :

\`\`\`javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Vos couleurs personnalisées
      }
    }
  }
}
\`\`\`

### Formats de fichiers

Ajoutez de nouveaux formats dans \`src/utils/detectFileType.ts\` :

\`\`\`typescript
const formatMap: Record<string, string[]> = {
  // Ajouter vos nouveaux formats
  newformat: ['csv', 'json'],
};
\`\`\`

## 🧪 Tests

\`\`\`bash
# Tests unitaires (à implémenter)
npm run test

# Tests E2E (à implémenter)
npm run test:e2e
\`\`\`

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créer une branche feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit les changements (\`git commit -m 'Add AmazingFeature'\`)
4. Push sur la branche (\`git push origin feature/AmazingFeature\`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :

- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les formats supportés

---

**ConvertFile** - Convertisseur de fichiers moderne et sécurisé 🚀 