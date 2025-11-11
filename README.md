# PPTX-Forge

Un outil en ligne de commande pour générer automatiquement des présentations PowerPoint (.pptx) à partir de fichiers YAML structurés. Idéal pour créer des formations professionnelles avec illustrations intégrées.

## Fonctionnalités

- Génération de PPTX à partir de slides YAML
- Intégration d'illustrations (via téléchargement ou IA)
- Gestion des notes orales et layouts personnalisés
- Support pour thèmes (standard, dark)
- Mode interactif pour les illustrations

## Installation

1. Clonez le repository :

   ```bash
   git clone https://github.com/jlg-formation/pptx-forge.git
   cd pptx-forge
   ```

2. Installez les dépendances avec Bun :

   ```bash
   bun install
   ```

3. Créez un fichier `.env` à la racine du projet avec les clés API nécessaires :

   ```bash
   cat > .env << 'EOF'
   # utile pour chercher des images d'illustrations sur GOOGLE IMAGES
   # gratuit pour 100 images par jour.
   GOOGLE_CX=votre-google-cx-ici
   GOOGLE_API_KEY=votre-google-api-key-ici

   # utile pour chercher des images d'illustrations sur PIXABAY
   # gratuit pour 60 images par minute
   PIXABAY_API_KEY=votre-pixabay-api-key-ici

   AUTHOR=Jean-Louis GUENEGO
   COMPANY=JLG Consulting
   EOF
   ```

   Remplacez les valeurs `votre-*` par vos vraies clés API.

   - `GOOGLE_CX` : ID de votre moteur de recherche personnalisé Google (Custom Search Engine)
   - `GOOGLE_API_KEY` : Clé API Google pour accéder à l'API Custom Search (utilisée pour rechercher des images via Google PSE)
   - `PIXABAY_API_KEY` : Clé API Pixabay pour télécharger des images depuis Pixabay

## Créer une Formation avec VSCode et GitHub Copilot

1. Ouvrez le projet dans VSCode :

   - Lancez VSCode
   - Ouvrez le dossier `pptx-forge` que vous venez de cloner

2. Activez GitHub Copilot dans VSCode (assurez-vous qu'il est installé et configuré)

3. Créez vos slides :

   - Utilisez les commandes définies dans `agents-pour-formateur.md` pour générer automatiquement les fichiers YAML des slides.
   - Précisez dans votre prompt que vous êtes formateur pour activer ces commandes.
   - Étapes :
     - Exécutez `xxxPF` pour générer le plan de formation (`00-plan-formation.md`).
     - Exécutez `xxxSlidemap` pour créer la carte des slides (`01-slidemap.md`).
   - Exécutez `xxxSlides` pour générer les fichiers YAML dans `slides/` (génère 6 slides par défaut, paramétrable avec `count=<K>` ; relancez autant de fois que nécessaire pour compléter tous les slides).

4. Préparez les illustrations (optionnel) :

   - Téléchargez des images depuis Pixabay pour avoir des options par défaut (30 images) :
     ```bash
     bun run pixabay "votre-sujet"
     ```

5. Générez la présentation PPTX :

   ```bash
   bun run pptx
   ```

6. Exportez la formation complète :
   ```bash
   bun run export
   ```

## Exemples d'Utilisation

- Générer une présentation basique :

  ```bash
  bun run pptx
  ```

- Avec thème personnalisé :

  ```bash
  bun run pptx --theme dark --output presentation.pptx
  ```

- Télécharger des images depuis Pixabay :

  ```bash
  bun run pixabay "intelligence artificielle"
  ```

- Mode illustrations interactif :

  ```bash
  bun run illustrations-only
  ```

- Mode illustrations non interactif (PSE automatique) :
  ```bash
  bun run illustrations-only-pse
  ```

## Gestion des Illustrations

Pour préparer les illustrations avant la génération PPTX (optionnel) :

1. Téléchargez des images depuis Pixabay pour avoir des options par défaut (30 images) :

   ```bash
   bun run pixabay "votre-sujet"
   ```

2. Exécutez le mode illustrations interactif :
   ```bash
   bun run illustrations-only
   ```
   - Choisissez pour chaque slide : génération IA, téléchargement PSE, ou placeholder.

Ou en mode non interactif :

```bash
bun run illustrations-only-pse
```

- Applique automatiquement la méthode PSE à toutes les illustrations manquantes.

## Structure du Projet

- `slides/` : Fichiers YAML des slides
- `illustrations/` : Images pour les slides
- `scripts/` : Code source TypeScript
- `dist/` : Sortie des présentations générées

## Prérequis

- Bun (recommandé) ou Node.js 22+
- VSCode avec GitHub Copilot
- Git

## Contribution

Les contributions sont les bienvenues ! Ouvrez une issue ou une pull request sur GitHub.

## Licence

MIT
