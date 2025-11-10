# 🔧 Spécifications Techniques Détaillées : Outil Générateur PPTX

Ce document détaille les spécifications techniques pour l'implémentation de l'outil Générateur PPTX, basé sur les documents de spécifications précédents (`00-project-brief.md`, `04-functional-specs.md`, etc.). Il couvre l'architecture, les technologies, les modèles de données et les exigences d'implémentation.

## Vue d'ensemble de l'Architecture

L'outil est un script TypeScript exécuté via bun, structuré en modules pour la lisibilité et la maintenabilité. Architecture modulaire avec séparation des préoccupations. Tout le code est inclus dans le répertoire `scripts/`.

### Organisation du Code

- `scripts/index.ts` : Point d'entrée principal (orchestration globale).
- `scripts/cli/args.ts` : Parsing des arguments de ligne de commande.
- `scripts/cli/logger.ts` : Gestion du logging (niveaux info, warn, error).
- `scripts/parser/yaml-parser.ts` : Parsing des fichiers YAML individuels.
- `scripts/parser/slide-loader.ts` : Chargement et tri des données de slides.
- `scripts/generator/pptx-generator.ts` : Orchestration de la génération PPTX.
- `scripts/generator/layout-manager.ts` : Gestion des layouts par type de slide.
- `scripts/generator/slide-builder.ts` : Construction des slides individuelles.
- `scripts/illustrations/image-loader.ts` : Chargement des images depuis le système de fichiers.
- `scripts/illustrations/downloader.ts` : Téléchargement d'images via fetch.
- `scripts/illustrations/placeholder.ts` : Gestion des placeholders d'images.
- `scripts/utils/sort.ts` : Fonctions de tri (slides, chapitres).
- `scripts/utils/validate.ts` : Validation des données YAML et chemins.
- `scripts/utils/helpers.ts` : Fonctions utilitaires diverses (hash, formatage).

- **Module Principal :** Orchestration (parsing YAML, génération PPTX).
- **Module Illustrations :** Gestion des images (chargement, placeholders).
- **Module CLI :** Interface en ligne de commande (parsing arguments, logging).
- **Module Utils :** Fonctions utilitaires (tri slides, validation).

## Technologies et Dépendances

- **Langage :** TypeScript (ES2022+). Tous les scripts sont écrits en TypeScript.
- **Runtime :** Bun (pour exécutionl rapide et gestion des dépendances, incluant fetch natif pour téléchargements HTTP).
  - `pptxgenjs@4.0.1` : Génération PPTX (layouts, contenu, export).
  - `js-yaml@4.1.0` : Parsing des fichiers YAML.
  - `fs` (Node.js) : Accès aux fichiers système.
  - `path` (Node.js) : Gestion des chemins de fichiers.
  - `crypto` (Node.js) : Hash SHA1 pour sélection de template.
  - `openai@6.8.1` : Communication avec l'API OpenAI, notamment pour générer une image à partir d'un prompt (utilisé pour les illustrations générées automatiquement).
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

- `cover` : Slide avec titre uniquement.
- `toc` : Slide avec titre et liste d'items. slide (pour cohérence et variété).
- `content` : Slide avec titre, bullets, key_message ; 3 variantes (rotation basée sur slide.order % 3).
- `conclusion` : Slide avec titre, bullets, key_message.

**Sélection du slidemaster :**
Le choix du slidemaster (template graphique) pour chaque slide doit dépendre à la fois du type de layout (cover, toc, content, conclusion) et du thème sélectionné via l'option CLI `--theme`. Le module de génération doit permettre un mapping dynamique `{layout, theme} → slidemaster` pour garantir la cohérence visuelle et la personnalisation des présentations.

## Interfaces et APIs

### Interface CLI

- Commande principale : `bun run pptx-generator.ts [options]`
- Options :
  - `--output <file>` : Chemin de sortie (défaut : `dist/presentation.pptx`).
  - `--theme <theme>` : Thème PPTX (défaut : standard).
  - `--illustrations-only` : Mode interactif, génère uniquement les illustrations pour chaque slide YAML.
- En mode `--illustrations-only`, le script principal ne propose ces choix (IA, PSE, placeholder) que pour les slides dont l'illustration est absente (non présente dans le dossier `illustrations/`). Les illustrations déjà présentes ne sont pas remplacées ni modifiées.
  Pour chaque slide sans illustration, l'utilisateur choisit :
  1. Générer l'illustration par IA (appel du module IA, stockage dans `illustrations/`)
  2. Télécharger une illustration via PSE (appel du module PSE, stockage dans `illustrations/` ; utilise le titre du slide `slide.title` comme terme de recherche au lieu du `illustration_prompt`)
  3. Utiliser le placeholder (aucune image générée, le placeholder est utilisé)
     Le choix est fait via prompt CLI (ex : readline ou enquirer). Aucun PPTX n'est généré dans ce mode.
- Logging : Console avec niveaux (info, warn, error).

### APIs Internes

- `parseYamlFiles(dir: string): SlideData[]` : Scan et parse YAML.
- `generatePptx(slides: SlideData[], options: Options): void` : Génère et sauvegarde PPTX.
- `loadIllustration(path: string): Buffer | null` : Charge image ou retourne null.
- `downloadImage(url: string): Promise<Buffer>` : Télécharge image via fetch de bun (pour scripts illustrations).

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

- **Tests Unitaires :** Couvrir parsing, génération, erreurs (Jest ou Vitest).
- **Tests d'Intégration :** Génération PPTX complète avec exemples YAML.
- **Linting :** ESLint, TypeScript strict.

## Déploiement et Maintenance

- **Build :** `bun build` pour bundle optimisé.
- **Documentation :** README avec exemples, API interne commentée.
- **Versioning :** Suivre SemVer, compatibilité avec AGENTS.md.

---

_Ces specs techniques guident l'implémentation. Références : Cahier des charges et specs fonctionnelles._
