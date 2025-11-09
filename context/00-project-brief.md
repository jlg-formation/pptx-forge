# 📋 Cahier des Charges : Outil Générateur PPTX

## 🎯 Vue d'ensemble du projet

**Nom du projet :** Générateur PPTX  
**Version :** 1.0  
**Date :** 2025-11-15  
**Auteur :** Jean-Louis GUENEGO

### Objectif

Développer un outil en ligne de commande qui génère automatiquement une présentation Microsoft PowerPoint (.pptx) à partir d'un répertoire `slides/` structuré. Ce répertoire contient des fichiers YAML (un par slide) générés par la commande `xxxSlides` existante, chacun définissant les métadonnées, le contenu et les ressources de la slide. L'outil doit produire un fichier PPTX professionnel, imprimable et prêt pour la présentation, en respectant les conventions décrites dans `AGENTS.md`.

### Périmètre

- **Entrée :** Le répertoire `slides/` avec des sous-répertoires par chapitre (ex. : `slides/01-introduction/`), chacun contenant des fichiers YAML (ex. : `01-01-cover.yaml`).
- **Sortie :** Un fichier `.pptx` unique (ex. : `presentation.pptx`) à la racine du projet, avec les slides ordonnés par chapitre et ID de slide.
- **Fonctionnalités clés :**
  - Analyser les fichiers YAML pour extraire les données de slide (titre, type, puces, message clé, prompt d'illustration, notes orales).
  - Générer des slides PPTX avec des layouts appropriés (ex. : slide titre pour la couverture, liste à puces pour le contenu, table des matières pour TOC).
  - Intégrer des illustrations pour chaque slide (une par slide souhaitée).
  - Inclure les notes orales dans la section notes du PPTX.
  - Prendre en charge 18 slides par chapitre, avec séquençage correct.
  - Fournir deux scripts de gestion des illustrations (IA et Google Images) lancés à la demande.
- **Hors périmètre :** Pas d'édition des fichiers YAML, pas d'intégration d'APIs externes pour la génération d'images en temps réel (utiliser des placeholders ou des ressources pré-générées), pas d'animations avancées ou de thèmes au-delà des défauts PPTX standard.

### Parties prenantes

- **Utilisateur principal :** Créateurs de contenu de formation utilisant le workflow `make-pptx`.
- **Responsable technique :** Développeur chargé de l'implémentation.
- **Propriétaire métier :** JLG Consulting (Jean-Louis Guénégo).

### Contraintes

- **Pile technologique :** TypeScript avec bun (recommandé pour la manipulation PPTX via la bibliothèque `pptxgenjs`).
- **Dépendances :** Doit être compatible avec la structure YAML existante de `AGENTS.md`.
- **Calendrier :** Phase 1 : Conception et spécifications (actuelle) ; Phase 2 : Implémentation (à déterminer).
- **Hypothèses :** Les fichiers YAML sont valides et complets ; les illustrations sont gérées via l'une des deux méthodes : 1) Génération IA (coûteuse, ~0,50 $/image, 1 min/image) ou 2) Script PSE pour recherche Google Images et téléchargement (limité à 100 images/jour), stocké dans le répertoire `illustrations/` sous `<CC>-<NN>-<motcleslide>.<ext>` (ex. : `01-01-cover.jpg`).

### Critères de succès

- L'outil génère un PPTX avec toutes les slides du répertoire `slides/`.
- La sortie est visuellement cohérente, avec les types de slides et le contenu corrects.
- Interface en ligne de commande : ex. : `bun run pptx-generator.ts --output presentation.pptx`.
- Gestion d'erreurs pour les fichiers manquants ou YAML invalides.

### Prochaines étapes

- Affiner les spécifications détaillées dans les documents suivants (ex. : `01-technical-specs.md`, `02-ui-specs.md`).
- Prototypage d'une génération PPTX d'exemple pour un chapitre.
- Discuter de l'intégration avec le workflow `xxxSlides` existant.

---

_Ce cahier des charges constitue la base des spécifications détaillées. Retours et itérations bienvenus._
