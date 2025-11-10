# 🔧 Spécifications Fonctionnelles : Outil Générateur PPTX

Ce document décrit les spécifications fonctionnelles de l'outil Générateur PPTX, basé sur le cahier des charges (`00-project-brief.md`), les personas (`01-personas.md`), la carte du parcours client (`02-customer-journey-map.md`) et les user stories (`03-user-stories.md`). Il définit les fonctionnalités requises pour répondre aux besoins des utilisateurs.

## Vue d'ensemble

L'outil est un script TypeScript exécuté via bun, qui transforme des fichiers YAML de slides en un fichier PPTX. Il prend en entrée le répertoire `slides/` et produit `presentation.pptx` à la racine.

## Exigences Fonctionnelles

### 1. Génération de PPTX

- **Description :** Scanner `slides/`, lire les YAML, trier par chapitre et ordre, générer slides PPTX avec layouts appropriés.
- **User Stories :** US1.1, US2.1.
- **Critères d'acceptation :** PPTX valide avec toutes les slides, layouts corrects (titre, contenu, TOC).

### 2. Gestion des Contenus

- **Description :** Intégrer titre, bullets (5 max pour content/conclusion), key_message, speaker_notes.
- **User Stories :** US1.1, US1.4.
- **Critères :** Contenu exact des YAML, notes dans la section PPTX.

### 3. Gestion des Illustrations

- **Description :** Intégrer images depuis `illustrations/` avec la même structure de sous-répertoires et noms que les slides YAML (ex. : `illustrations/01-introduction/01-01-cover.jpg` pour `slides/01-introduction/01-01-cover.yaml`). Les illustrations ne sont pas générées par l'outil ; elles sont préparées en amont via méthodes externes (ex. : script PSE pour téléchargement Google Images ou génération IA manuelle). L'outil recherche le fichier image correspondant à chaque slide et l'embarque si disponible, sinon utilise un placeholder.
- **Méthodes de préparation externes :**
  - Méthode 1 : Génération IA (coûteuse, ~0,50 $/image, 1 min/image) – non intégrée à l'outil.
  - Méthode 2 : Script PSE pour recherche Google Images et téléchargement automatique (limité à 100 images/jour), stocké dans `illustrations/` avec la même structure que les YAML.
- **User Stories :** US1.2.
- **Critères :** Images chargées si disponibles, sinon placeholder sans erreur ; pas de génération en temps réel dans l'outil.

### 4. Gestion interactive des Illustrations

- **Description :** L'utilisateur peut lancer le script principal (`scripts/index.ts`) en mode "illustrations uniquement" (ex : argument CLI `--illustrations-only`). Dans ce mode, pour chaque slide YAML, l'utilisateur choisit interactivement :
  1. Générer l'illustration par IA (utilise le prompt du YAML, stockée dans `illustrations/`)
  2. Télécharger une illustration via PSE (recherche web, stockée dans `illustrations/`)
  3. Utiliser le placeholder (aucune image générée, le placeholder est utilisé)
     En mode `illustrations-only`, le programme ne propose ces choix que pour les slides dont l'illustration est absente (manquante dans le dossier `illustrations/`). Les illustrations déjà présentes ne sont pas remplacées ni modifiées.
     Le script ne génère pas le PPTX dans ce mode. Les modules IA et PSE sont appelés selon le choix utilisateur uniquement pour les slides sans illustration.
- **User Stories :** US1.2 (pour Marie), US2.5 (pour Antoine).
- **Critères :** Mode CLI interactif, compatible bun/TypeScript, gestion des erreurs, stockage des images selon la structure `<CC>-<chapitre-simplifie>/<CC>-<NN>-<motcleslide>.<ext>`.

### 5. Gestion d'Erreurs

- **Description :** Signaler YAML manquants/invalides, illustrations absentes.
- **User Stories :** US1.3, US2.4.
- **Critères :** Messages clairs en console, poursuite si possible.

### 6. Personnalisation

- **Description :** Paramètres CLI pour output, thème.
- **User Stories :** US2.2.
- **Critères :** Thèmes appliqués, fichiers nommés correctement.

### 7. Performance

- **Description :** Optimiser pour 5-10 chapitres x 18 slides.
- **User Stories :** US2.3.
- **Critères :** Génération < 30s pour moyennes présentations.

## Cas d'Utilisation

### Cas 1 : Génération Standard (Marie)

1. Marie exécute `xxxPptx`.
2. Outil scanne slides/, génère PPTX avec illustrations.
3. Succès : PPTX créé, message de confirmation.

### Cas 2 : Personnalisation (Antoine)

1. Antoine exécute `xxxPptx output="custom.pptx" theme="dark"`.
2. Outil applique thème, sauvegarde sous nom personnalisé.

### Cas 3 : Erreur (Marie/Antoine)

1. YAML manquant détecté.
2. Outil logge erreur, continue avec slides valides.

## Interfaces

- **Interface Utilisateur :** Ligne de commande (CLI) avec arguments optionnels.
- **Entrées :** Répertoire `slides/`, paramètres CLI.
- **Sorties :** Fichier PPTX dans `dist/`, logs console.

## Modèle de Données

- **YAML Slide :** Structure définie dans AGENTS.md (chapter, slide avec type, content).
- **PPTX :** Slides avec texte, images, notes.

## Règles Métier

- Slides triés par chapter.number puis slide.meta.order.
- Types : cover (titre seul), toc (liste items), content/conclusion (bullets + key_message).
- Illustrations : Priorité à fichiers locaux, fallback placeholder.

---

_Ces specs guident l'implémentation. Prochaines étapes : Spécifications techniques._
