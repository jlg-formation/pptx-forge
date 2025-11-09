# 🗺️ Cartes du Parcours Client pour l'Outil Générateur PPTX

Ce document décrit les parcours clients pour les deux personas définis dans `01-personas.md`, en se basant sur le cahier des charges (`00-project-brief.md`). Chaque carte couvre les étapes clés du parcours utilisateur avec l'outil Générateur PPTX, incluant les actions, points de contact, émotions et points de douleur. L'objectif est d'identifier les opportunités d'amélioration pour une meilleure expérience utilisateur.

## Méthodologie

- **Étapes du parcours :** Découverte, Configuration, Utilisation, Itération, Support.
- **Éléments par étape :** Actions de l'utilisateur, Points de contact (outils/interfaces), Émotions, Points de douleur.
- **Basé sur :** Workflow `make-pptx` (AGENTS.md), génération de PPTX via bun et pptxgenjs.

## Parcours pour Persona 1 : Marie Dubois (Créateur de Contenu de Formation)

Marie utilise l'outil pour créer des présentations PPTX à partir de slides YAML, en se concentrant sur l'efficacité et la qualité visuelle.

| Étape             | Actions                                                              | Points de Contact                        | Émotions                     | Points de Douleur                                     |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------- | ---------------------------- | ----------------------------------------------------- |
| **Découverte**    | Entend parler de l'outil via un collègue ou documentation JLG.       | Email interne, documentation AGENTS.md   | Curiosité, espoir            | Manque d'exemples visuels initiaux.                   |
| **Configuration** | Installe bun, clone le repo `make-pptx`, configure les dépendances.  | Terminal, README du repo                 | Excitation, stress           | Complexité de l'installation si débutante.            |
| **Utilisation**   | Exécute `xxxSlides` pour générer YAML, puis `xxxPptx` pour PPTX.     | Ligne de commande, fichiers slides/      | Satisfaction                 | Erreurs si YAML invalide ou illustrations manquantes. |
| **Itération**     | Modifie YAML pour ajuster contenu, régénère PPTX avec illustrations. | Éditeur de texte, script PSE pour images | Accomplissement              | Temps perdu sur téléchargements d'images coûteux.     |
| **Support**       | Contacte Antoine pour dépannage ou demandes de fonctionnalités.      | Chat interne, issues GitHub              | Frustration puis soulagement | Retards dans les réponses de support.                 |

**Insights :** Prioriser la simplicité de la ligne de commande et des tutoriels pour réduire le stress initial. Améliorer la gestion des illustrations pour éviter les frustrations.

## Parcours pour Persona 2 : Antoine Leroy (Intégrateur Technique)

Antoine gère la maintenance et la personnalisation de l'outil pour l'équipe.

| Étape             | Actions                                                                | Points de Contact                    | Émotions        | Points de Douleur                                     |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------ | --------------- | ----------------------------------------------------- |
| **Découverte**    | Assigné à intégrer l'outil dans le workflow équipe.                    | Réunions équipe, cahier des charges  | Motivation      | Pression pour livrer rapidement.                      |
| **Configuration** | Configure bun, pptxgenjs, teste avec exemples YAML.                    | Terminal, code source TypeScript     | Concentration   | Débogage des dépendances incompatibles.               |
| **Utilisation**   | Personnalise thèmes/layouts, exécute `bun run pptx-generator.ts`.      | Éditeur de code, paramètres CLI      | Fierté          | Performances lentes pour grandes présentations.       |
| **Itération**     | Met à jour le script basé sur retours utilisateurs, gère mises à jour. | Git, tests unitaires                 | Accomplissement | Gestion des changements sans casser la compatibilité. |
| **Support**       | Fournit assistance à Marie, documente bugs et améliorations.           | Issues GitHub, documentation interne | Responsabilité  | Charge de travail accrue avec demandes multiples.     |

**Insights :** Mettre l'accent sur la robustesse du code et les outils de débogage pour faciliter la maintenance. Encourager la collaboration via des canaux clairs pour réduire la charge.

---

_Ces cartes aident à optimiser l'outil en se concentrant sur les besoins des personas. Prochaines étapes : Intégrer ces insights dans les spécifications techniques._
