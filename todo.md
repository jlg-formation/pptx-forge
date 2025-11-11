# TODO Refactoring

Ce document liste les propositions de refactoring pour réduire les lignes de code dans les fichiers longs du projet `make-pptx`.

## Fichiers analysés

D'après l'analyse des fichiers TypeScript dans le dossier `scripts`, les fichiers les plus longs (plus de 50 lignes) sont :

- `scripts/generator/layout-manager.ts` : 236 lignes
- `scripts/generator/pptx-generator.ts` : 216 lignes
- `scripts/illustrations/illustrations-only.ts` : 146 lignes
- `scripts/utils/searchPSEImage.test.ts` : 91 lignes
- `scripts/utils/downloadImage.test.ts` : 84 lignes
- `scripts/pixabay.ts` : 66 lignes
- `scripts/index.ts` : 63 lignes
- `scripts/export.ts` : 54 lignes
- `scripts/parser/yaml-parser.ts` : 54 lignes

## Propositions de refactoring

### 1. `scripts/generator/pptx-generator.ts` (226 lignes) ✅ FAIT

La fonction `generatePptx` a été refactorisée avec extraction de fonctions modulaires.

- **Extraire une fonction `defineSlidemasters`** : ✅ Créé une fonction séparée pour définir et ajouter les slidemasters au PPTX.
- **Extraire une fonction `addSlideContent`** : ✅ Créé une fonction qui prend un slide et ajoute le contenu selon son type (cover, toc, content, conclusion). Le switch case a été déplacé ici.
- **Extraire une fonction `addSlideImage`** : ✅ La logique d'ajout d'images (recherche de chemin, fallback pixabay, ajout au slide) a été extraite dans une fonction dédiée.

**Résultat** : Le code est maintenant plus modulaire et maintenable. La fonction principale `generatePptx` est simplifiée, bien que le nombre total de lignes ait légèrement augmenté (226 lignes) en raison de la séparation en fonctions.

### 2. `scripts/generator/layout-manager.ts` (224 lignes) ✅ FAIT

La fonction `createSlidemasters` a été refactorisée avec extraction de fonctions spécialisées.

- **Extraire des fonctions par type de slide** : ✅ Créé `createCoverMaster(colors, theme)`, `createTocMaster(colors, theme)`, `createContentMaster(colors, theme)`, `createConclusionMaster(colors, theme)`. Chaque fonction retourne la définition du slidemaster pour ce type.

Cela élimine la répétition et rend le code plus maintenable. La fonction principale `createSlidemasters` est maintenant un simple objet retournant les appels à ces fonctions.

**Résultat** : Le code est plus modulaire et maintenable. La fonction principale est réduite à 4 lignes, bien que le nombre total de lignes ait légèrement augmenté (208 → 224) en raison de la séparation en fonctions.

### 3. `scripts/illustrations/illustrations-only.ts` (140 lignes) ✅ FAIT

La fonction `processIllustrationsOnly` a été refactorisée avec extraction de fonctions pour chaque méthode.

- **Extraire des fonctions pour chaque méthode** : ✅ Créé `handleAIMethod(slide, imgDir)`, `handlePSEMethod(slide, imgDir)`, `handlePlaceholderMethod(slide, imgDir)`. Chaque fonction gère la logique spécifique (génération IA, recherche PSE, copie placeholder).

Cela simplifie la boucle principale, qui appelle maintenant la fonction appropriée selon la réponse utilisateur.

**Résultat** : La boucle principale est réduite et plus lisible. Le nombre total de lignes a légèrement augmenté (121 → 140) en raison de la séparation en fonctions, mais le code est plus modulaire et maintenable.

### 4. Autres fichiers ✅ FAIT

- **Création d'un module partagé `scripts/utils/common.ts`** : ✅ Créé avec `getFormationTitle()` et `slugify()` pour éviter la duplication.
- **Refactorisation de `scripts/export.ts` (76 → 54 lignes)** : ✅ Suppression des fonctions dupliquées, import depuis `common.ts`.
- **Refactorisation de `scripts/index.ts` (74 → 63 lignes)** : ✅ Suppression de la fonction `slugify` locale, import depuis `common.ts`.
- **Refactorisation de `scripts/pixabay.ts` (62 → 66 lignes)** : ✅ Extraction de la logique de téléchargement dans `downloadPixabayImages()`.

**Résultat** : Code plus modulaire avec des utilitaires partagés. Réduction significative des lignes dans `export.ts` et `index.ts`.
