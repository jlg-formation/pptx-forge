# 🔧 Spécifications Techniques Détaillées : Outil Générateur PPTX

Ce document détaille les spécifications techniques pour l'implémentation de l'outil Générateur PPTX, basé sur les documents de spécifications précédents (`00-project-brief.md`, `04-functional-specs.md`, etc.). Il couvre l'architecture, les technologies, les modèles de données et les exigences d'implémentation.

## Vue d'ensemble de l'Architecture

L'outil est un script TypeScript exécuté via bun, structuré en modules pour la lisibilité et la maintenabilité. Architecture modulaire avec séparation des préoccupations. Tout le code est inclus dans le répertoire `scripts/`.

### Organisation du Code

- `scripts/index.ts` : Point d'entrée principal (orchestration globale).
- `scripts/cli/args.ts` : Parsing des arguments de ligne de commande.
- `scripts/cli/logger.ts` : Gestion du logging (niveaux info, warn, error).
- `scripts/parser/yaml-parser.ts` : Parsing des fichiers YAML individuels et scan récursif.
- `scripts/parser/slide-loader.ts` : Chargement, validation et tri des données de slides.
- `scripts/generator/pptx-generator.ts` : Orchestration de la génération PPTX.
- `scripts/generator/layout-manager.ts` : Gestion des layouts et slidemasters par type de slide et thème.
- `scripts/generator/slidemasters/` : Définitions des slidemasters pour les thèmes (standard, dark).
- `scripts/illustrations/image-loader.ts` : Chargement des images depuis le système de fichiers.
- `scripts/illustrations/illustrations-only.ts` : Traitement des illustrations en mode interactif ou non.
- `scripts/export.ts` : Export de la formation dans un répertoire dédié.
- `scripts/utils/sort.ts` : Fonctions de tri (slides, chapitres).
- `scripts/utils/validate.ts` : Validation des données YAML et chemins.
- `scripts/utils/downloadImage.ts` : Téléchargement d'images avec timeout.
- `scripts/utils/searchPSEImage.ts` : Recherche d'images via Google PSE.
- `scripts/utils/getImageSize.ts` : Obtention des dimensions d'une image.
- `scripts/pixabay.ts` : Téléchargement d'images depuis l'API Pixabay.

- **Module Principal :** Orchestration (parsing YAML, génération PPTX).
- **Module Illustrations :** Gestion des images (chargement, téléchargement, placeholders).
- **Module CLI :** Interface en ligne de commande (parsing arguments, logging).
- **Module Utils :** Fonctions utilitaires (tri, validation, téléchargements, API externes).

## Technologies et Dépendances

- **Langage :** TypeScript (ES2022+). Tous les scripts sont écrits en TypeScript.
- **Runtime :** Bun (pour exécution rapide et gestion des dépendances, incluant fetch natif pour téléchargements HTTP).
  - `pptxgenjs@4.0.1` : Génération PPTX (layouts, contenu, export).
  - `js-yaml@4.1.0` : Parsing des fichiers YAML.
  - `openai@6.8.1` : Communication avec l'API OpenAI pour génération d'images.
  - `bun:test` : Framework de tests intégré à Bun.
- **Environnement :** Compatible avec Node.js 22+ et bun 1.3.2+.

## Modèles de Données

### Structure YAML Slide

```typescript
interface SlideData {
  chapter: {
    number: number;
    key: string;
    title: string;
  };
  slide: {
    id: string;
    type: "cover" | "toc" | "content" | "conclusion";
    title: string;
    meta: { order: number };
    content: {
      bullets?: string[];
      key_message?: string;
      illustration_prompt?: string;
      speaker_notes?: string;
      items?: string[]; // Pour TOC
    };
  };
}
```

### Modèle PPTX Interne

- Utilise les objets de `pptxgenjs` (Slide, Text, Image, etc.).
- Mappings types :
  - `cover` : Slide avec titre uniquement.
  - `toc` : Slide avec titre et liste d'items.
  - `content`/`conclusion` : Slide avec titre, bullets, key_message.
- Pour tous les types de slide, ajouter les `speaker_notes` du YAML dans les notes du slide via `slide.addNotes(speaker_notes)`.

## Layouts par type :

- `cover` : Slide avec titre uniquement, auteur et année en bas.
- `toc` : Slide avec titre et liste d'items.
- `content` : Slide avec titre, bullets, key_message.
- `conclusion` : Slide avec titre, bullets, key_message.

**Sélection du slidemaster :**
Le choix du slidemaster dépend du type de layout et du thème sélectionné via `--theme`. Les slidemasters sont définis dans `scripts/generator/slidemasters/` pour les thèmes standard et dark.

## Interfaces et APIs

### Interface CLI

- Commande principale : `bun run index.ts [options]`
- Options :
  - `--output <file>` : Chemin de sortie (défaut : `dist/presentation.pptx`).
  - `--theme <theme>` : Thème PPTX (défaut : standard, options : standard, dark).
  - `--illustrations-only` : Mode interactif, génère uniquement les illustrations pour chaque slide YAML.
  - `--illustrations-only=<method>` : Mode non interactif, utilise la méthode spécifiée pour toutes les illustrations manquantes (ex: `--illustrations-only=pse` pour utiliser PSE automatiquement).
- Commande export : `bun run export.ts` : Exporte la formation dans un répertoire nommé d'après le titre de la formation (sans espaces, tirets, minuscules), contenant le PPTX, le dossier slides, et les fichiers de plan.
- Commande pixabay : `bun run pixabay [query]` : Télécharge 30 images depuis Pixabay pour la requête donnée (défaut : "nature"), stockées dans `pixabay/` avec noms 01.ext, 02.ext, etc.
- En mode `--illustrations-only` (interactif), le script propose pour chaque slide sans illustration :
  1. Générer l'illustration par IA (appel OpenAI, stockage dans `illustrations/` ; utilise `illustration_prompt`)
  2. Télécharger une illustration via PSE (appel Google PSE, stockage dans `illustrations/` ; utilise le titre du slide `slide.title` comme terme de recherche)
  3. Utiliser le placeholder (aucune image générée)
- En mode `--illustrations-only=<method>` (non interactif), la méthode spécifiée est appliquée automatiquement à toutes les illustrations manquantes.
- Logging : Console avec niveaux (info, warn, error).

### APIs Internes

- `parseYamlFiles(dir: string): SlideData[]` : Scan récursif et parse tous les fichiers YAML.
- `loadSlides(dir: string): SlideData[]` : Charge, valide et trie les slides.
- `generatePptx(slides: SlideData[], options: { output: string; theme?: string; title?: string }): void` : Génère et sauvegarde PPTX.
- `loadIllustration(path: string): Buffer | null` : Charge image ou retourne null.
- `downloadImage(url: string, destDir: string, baseFileName: string): Promise<string>` : Télécharge image avec timeout de 5s et retourne le chemin complet.
- `processIllustrationsOnly(slides: SlideData[], defaultMethod?: string): Promise<void>` : Traite les illustrations en mode interactif (defaultMethod undefined) ou non interactif (defaultMethod spécifié, ex: "pse").

## Gestion d'Erreurs

- **Types d'Erreurs :**
  - Fichier YAML manquant/invalide : Log warn, skip slide.
  - Image manquante : Log warn, utilise placeholder.
  - Erreur PPTX : Log error, arrêt avec code non-zero.
- **Stratégies :** Validation précoce, try-catch, messages utilisateur clairs.

## Exigences de Performance

- **Temps de Génération :** < 30s pour 5-10 chapitres (90-180 slides).
- **Utilisation Mémoire :** < 512MB pour grandes présentations.
- **Optimisations :** Traitement asynchrone pour chargements d'images, cache si nécessaire.

## Considérations de Sécurité

- **Validation Entrées :** Sanitisation des chemins de fichiers, validation YAML.
- **Accès Fichiers :** Lecture seule pour `slides/` et `illustrations/`, écriture dans `dist/`.
- **Dépendances :** Utiliser versions fixes pour éviter vulnérabilités.

## Tests et Qualité

- **Tests Unitaires :** Couvrir parsing, génération, erreurs (bun:test intégré à Bun).
- **Tests d'Intégration :** Génération PPTX complète avec exemples YAML.
- **Linting :** ESLint, TypeScript strict.

## Déploiement et Maintenance

- **Build :** `bun build` pour bundle optimisé.
- **Documentation :** README avec exemples, API interne commentée.
- **Versioning :** Suivre SemVer, compatibilité avec AGENTS.md.

---

_Ces specs techniques guident l'implémentation. Références : Cahier des charges et specs fonctionnelles._
