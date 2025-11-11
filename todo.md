# TODO Refactoring

Ce document liste les propositions de refactoring pour réduire les lignes de code dans les fichiers longs du projet `make-pptx`.

## Fichiers analysés

D'après l'analyse des fichiers TypeScript dans le dossier `scripts`, les fichiers les plus longs (plus de 50 lignes) sont :

- `scripts/generator/layout-manager.ts` : 208 lignes
- `scripts/generator/pptx-generator.ts` : 226 lignes
- `scripts/illustrations/illustrations-only.ts` : 121 lignes
- `scripts/utils/searchPSEImage.test.ts` : 91 lignes
- `scripts/utils/downloadImage.test.ts` : 84 lignes
- `scripts/export.ts` : 76 lignes
- `scripts/index.ts` : 74 lignes
- `scripts/pixabay.ts` : 62 lignes
- `scripts/parser/yaml-parser.ts` : 54 lignes

## Propositions de refactoring

### 1. `scripts/generator/pptx-generator.ts` (226 lignes) ✅ FAIT

La fonction `generatePptx` a été refactorisée avec extraction de fonctions modulaires.

- **Extraire une fonction `defineSlidemasters`** : ✅ Créé une fonction séparée pour définir et ajouter les slidemasters au PPTX.
- **Extraire une fonction `addSlideContent`** : ✅ Créé une fonction qui prend un slide et ajoute le contenu selon son type (cover, toc, content, conclusion). Le switch case a été déplacé ici.
- **Extraire une fonction `addSlideImage`** : ✅ La logique d'ajout d'images (recherche de chemin, fallback pixabay, ajout au slide) a été extraite dans une fonction dédiée.

**Résultat** : Le code est maintenant plus modulaire et maintenable. La fonction principale `generatePptx` est simplifiée, bien que le nombre total de lignes ait légèrement augmenté (226 lignes) en raison de la séparation en fonctions.

### 2. `scripts/generator/layout-manager.ts` (208 lignes)

La fonction `createSlidemasters` contient des définitions répétitives pour chaque type de slide.

- **Extraire des fonctions par type de slide** : Créer `createCoverMaster(colors)`, `createTocMaster(colors)`, `createContentMaster(colors)`, `createConclusionMaster(colors)`. Chaque fonction retournerait la définition du slidemaster pour ce type.

Cela éliminera la répétition et rendra le code plus maintenable. La fonction principale `createSlidemasters` deviendrait un simple objet retournant les appels à ces fonctions.

**Résultat estimé** : `createSlidemasters` passerait de 150+ lignes à environ 20-30 lignes, avec des fonctions spécialisées.

### 3. `scripts/illustrations/illustrations-only.ts` (121 lignes)

La fonction `processIllustrationsOnly` contient une boucle avec un switch pour les méthodes.

- **Extraire des fonctions pour chaque méthode** : Créer `handleAIMethod(slide)`, `handlePSEMethod(slide)`, `handlePlaceholderMethod(slide)`. Chaque fonction gérerait la logique spécifique (génération IA, recherche PSE, copie placeholder).

Cela simplifiera la boucle principale, qui ne ferait qu'appeler la fonction appropriée selon la réponse utilisateur.

**Résultat estimé** : La fonction principale passerait de 100+ lignes à environ 30-40 lignes, avec des fonctions modulaires.

### 4. Autres fichiers

- **Pour `scripts/export.ts` (76 lignes) et `scripts/index.ts` (74 lignes)** : Ils sont principalement linéaires ; on pourrait extraire des utilitaires comme `slugify` (déjà présent) ou `getFormationTitle` dans un module partagé.

- **Pour les fichiers de test (`searchPSEImage.test.ts`, `downloadImage.test.ts`)** : Ils sont longs à cause de nombreux cas de test ; envisager de les diviser en fichiers par fonctionnalité testée.

- **Pour `scripts/pixabay.ts` (62 lignes)** : Extraire la logique de téléchargement dans une fonction réutilisable.

Ces refactorisations amélioreraient la lisibilité, la maintenabilité et faciliteraient les tests unitaires.
