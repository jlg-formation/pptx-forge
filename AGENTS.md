# 🤖 AGENTS.md — Convention **fichiers par slide** (v3.2)

## Commandes : `xxxPF` & `xxxSlidemap` & `xxxSlides` & `xxxPptx`

---

## Commande : `xxxPF`

Tu es un formateur travaillant pour ORSYS.
Tu connais bien le milieu de la formation professionnelle.

Ton objectif est de concevoir et rédiger un plan de cours type ORSYS sur le sujet qui t'es donné sur une durée exprimée en jour.

Le plan devra être présenté avec la structure suivante :

- 1 titre (max 100 caractères)
- 1 introduction (max 500 caractères)
- 1 liste d'objectifs pédagogiques (1 par demi-journée de formation)
- Public concerné
- Prérequis
- Méthode et moyen pédagogique
- Modalité d'évaluation
- Programme de la formation
  - note : il est constitué d'un chapitre par demi-journée avec 5 bullets points et 1 sujet de travaux pratique.

Exemples de plan accessible à :

- https://www.orsys.fr/formation/ail
- https://www.orsys.fr/formation/tsr
- https://www.orsys.fr/formation/gia

Le fichier de sortie s'appelle `00-plan-formation.md`

---

## Commande : `xxxSlidemap`

### 🎯 Objectif

Générer/mettre à jour un fichier `01-slidemap.md` à partir du plan de formation `00-plan-formation.md` **pour piloter la production YAML**.
Ce fichier répertorie tous les chapitres et toutes les _slides logiques_ (01–18), avec leur numéro, titre, **référence YAML cible (1 fichier par slide)** et **statut**.
Il permet ensuite à la commande `xxxSlides` de savoir **où elle s’est arrêtée** et de **reprendre automatiquement**.

Avant le premier chapitre, un **slide de page de garde de la formation** est ajouté automatiquement.
Il contient :

- le **titre complet de la formation** (issu du `00-plan-formation.md`),
- le **nom de l’auteur** (par défaut : _Jean-Louis Guénégo_),
- et **l’année de production du contenu** (par défaut : année en cours).

Ce slide est enregistré dans `slides/00-cover.yaml` et ajouté en tête du fichier `01-slidemap.md`.

### ⚙️ Fonctionnement

Quand tu exécutes :

```
xxxSlidemap
```

L’agent doit :

1. Lire `00-plan-formation.md`.
2. Lister les chapitres du plan.
3. Pour chaque chapitre, produire 18 entrées (01 à 18) avec : _type_, _titre de slide_, **référence YAML (chemin de fichier)** et _statut initial_ `⏳` (sauf si le fichier YAML existe déjà → `✅`).
4. Ajouter une entrée spéciale en tête du fichier pour la **page de garde de la formation**.
5. Écrire/mettre à jour `01-slidemap.md` à la racine du repo.

### 📁 Références YAML et nouvelle convention de nommage (fichier **par slide**)

- **Un fichier YAML par slide** :
  `slides/<CC>-<chapitre-simplifie>/<CC>-<NN>-<motcleslide>.yaml`

  **Définitions :**

  - `CC` = numéro du chapitre sur 2 chiffres (`01`, `02`, …).
  - `NN` = numéro de la slide logique (01..18).
  - `<chapitre-simplifie>` = **un seul mot-clé** du titre du chapitre, minuscule, sans accents/ponctuation (les espaces et ponctuations → tirets si nécessaire, mais privilégier **un seul mot**).
  - `<motcleslide>` = **un seul mot-clé** représentatif du titre de la slide, minuscule, sans accents/ponctuation (mêmes règles que ci‑dessus).

- **Exemples :**

  - Chapitre 1 « Introduction » → répertoire : `slides/01-introduction/`

    - Slide 01 (page de garde) → `slides/01-introduction/01-01-cover.yaml`
    - Slide 02 (sommaire) → `slides/01-introduction/01-02-toc.yaml`
    - Slide 05 « Principaux risques » → `slides/01-introduction/01-05-risques.yaml`

- **Référence complète** utilisée dans `01-slidemap.md` :
  `slides/01-introduction/01-05-risques.yaml`

### 🧱 Exemple de structure `01-slidemap.md` (extrait)

```markdown
# 🗺️ Slide Map – <Titre de la formation>

Ce document répertorie l’ensemble des slides logiques (01–18) par chapitre.
Chaque slide logique correspond à **un fichier YAML** dans `slides/<CC>-<chapitre-simplifie>/<CC>-<NN>-<motcleslide>.yaml`.

---

## Page de garde de la formation

| Ordre | Type          | Référence YAML       | Titre du slide                  | Statut |
| ----: | ------------- | -------------------- | ------------------------------- | :----: |
|     0 | Page de garde | slides/00-cover.yaml | <Titre complet de la formation> |   ⏳   |

---

## Chapitre 1 — Introduction à la sécurité mobile

| Ordre | Type               | Référence YAML                               | Titre du slide                    | Statut |
| ----: | ------------------ | -------------------------------------------- | --------------------------------- | :----: |
|    01 | Page de garde      | slides/01-introduction/01-01-cover.yaml      | Introduction à la sécurité mobile |   ✅   |
|    02 | Table des matières | slides/01-introduction/01-02-toc.yaml        | Sommaire du chapitre              |   ✅   |
|    03 | Contenu            | slides/01-introduction/01-03-contexte.yaml   | Contexte de la sécurité mobile    |   ⏳   |
|    04 | Contenu            | slides/01-introduction/01-04-risques.yaml    | Principaux risques mobiles        |   ⏳   |
|     … | …                  | …                                            | …                                 |   …    |
|    18 | Conclusion         | slides/01-introduction/01-18-conclusion.yaml | Conclusion du chapitre            |   ⏳   |

---

### 🧩 Légende

| Symbole | Signification                           |
| ------: | --------------------------------------- |
|      ✅ | Fichier YAML déjà généré                |
|      ⏳ | Fichier YAML à générer                  |
|      ⚠️ | Entrée partiellement générée / à revoir |
|      ❌ | Erreur lors d’une génération précédente |

### Règles

- 18 _slides logiques_ par chapitre : `01` (page de garde) · `02` (table des matières) · `03–17` (contenu) · `18` (conclusion).
- 1 slide **global** avant tout le reste : la **page de garde de la formation**, stockée dans `slides/00-cover.yaml`.
- Dossiers/fichiers : `slides/<CC>-<chapitre-simplifie>/<CC>-<NN>-<motcleslide>.yaml`, minuscules, accents supprimés, **un seul mot** pour `<chapitre-simplifie>` et `<motcleslide>`.
- Chemins **relatifs** au repo.
- `xxxSlides` **lit** ce fichier pour savoir quelles entrées passer de `⏳` à `✅`.
```

---

## Commande : `xxxSlides`

### 🎯 Objectif

Générer automatiquement le répertoire `slides/` contenant **un fichier YAML par slide**,
à partir de `01-slidemap.md` (s’il existe) ou, à défaut, de `00-plan-formation.md`.

### 📄 Schéma YAML — **spécification (fichier par slide)**

Chaque fichier YAML contient les métadonnées du chapitre et **une unique slide**.

```yaml
chapter:
  number: 1 # entier, 1-indexé, aussi préfixé CC pour l'affichage
  key: "introduction" # mot-clé unique, minuscule, sans accent (du chapitre)
  title: "Introduction à la sécurité mobile"

slide:
  id: "05" # "01" à "18" (chaîne à deux chiffres)
  type: "content" # cover | toc | content | conclusion
  title: "Principaux risques mobiles"
  meta:
    order: 5 # 1..18 (entier)
  content:
    bullets: # 5 bullets exactement pour content & conclusion
      - "<Bullet 1, ≤ 12 mots>"
      - "<Bullet 2, ≤ 12 mots>"
      - "<Bullet 3, ≤ 12 mots>"
      - "<Bullet 4, ≤ 12 mots>"
      - "<Bullet 5, ≤ 12 mots>"
    key_message: "<phrase percutante ≤ 120 caractères>"
    illustration_prompt: >
      <3–6 phrases, image vectorielle sans texte, fond blanc pur (#ffffff),
      format 16:9, style plat/isométrique, composition simple, lisible et
      imprimable, sans watermark.>
    speaker_notes: |
      <Texte au format Markdown, présenté comme une prose fluide (250 à 500 mots).
      Le ton est formateur, concret et professionnel.  
      Le texte peut utiliser des **mises en valeur** (gras, italique), des listes à
      puces ou numérotées si besoin, mais **aucun titre de chapitre**.  
      Il doit être structuré naturellement, clair et agréable à lire, tout en
      restant dans la limite de 500 mots.>
```

**Spécificités par type :**

- `cover` : `bullets`, `key_message`, `illustration_prompt`, `speaker_notes` → vides.

- `toc` :

  ```yaml
  slide:
    id: "02"
    type: "toc"
    title: "Sommaire du chapitre — Introduction à la sécurité mobile"
    meta: { order: 2 }
    content:
      items: # 15 éléments : titres des slides 03..17
        - "Contexte de la sécurité mobile"
        - "..."
      key_message: "Vue d’ensemble du chapitre et des notions abordées."
      illustration_prompt: >
        Illustration vectorielle sans texte, fond blanc (#ffffff), montrant une
        arborescence de concepts reliés. Style minimal, composition claire et
        équilibrée, format 16:9, sans watermark.
      speaker_notes: >
        Ce sommaire situe les étapes du chapitre et les attentes pédagogiques principales.
  ```

- `conclusion` : même structure que `content` avec notes 250–400 mots.

### ⚙️ Description

Pour **chaque slide**, créer un fichier :

```
slides/<CC>-<chapitre-simplifie>/<CC>-<NN>-<motcleslide>.yaml
```

- `motcleslide` est dérivé du titre de la slide (un seul mot, minuscule, sans accents/ponctuation). Exemples : `cover`, `toc`, `contexte`, `risques`, `mesures`, `demo`, `exemple`, `atelier`, `conclusion`.
- Si un fichier existe déjà, **le mettre à jour** sans casser la structure.

### 🔁 Reprise automatique & pagination

- `xxxSlides` **lit d’abord** `01-slidemap.md`.
- Il détecte la **première ligne** en statut `⏳` et **(ré)génère par lot de fichiers YAML** (par défaut 6).
- Après génération, il met à jour les lignes correspondantes en `✅` et s’arrête.
- Au prochain appel, il reprend au prochain `⏳`.

**Paramètres optionnels :**

```
xxxSlides chapitre="<nom|numéro>" start=<NN> count=<K>
```

- `chapitre` : restreindre à un chapitre.
- `start` : numéro de slide logique de départ (défaut = premier `⏳`).
- `count` : nombre de **fichiers** à générer (défaut = 6).

### 🧠 Règles générales

- 5 bullets **exactement** pour les slides de contenu et de conclusion.
- Message clé ≤ 120 caractères.
- Prompt d’illustration **en texte fluide**, **fond blanc #ffffff**, **sans texte**, **16:9**.
- Notes orales : 250–500 mots (conclusion : 250–400), ton **formateur humain** (oral, concret, pro).
- Numérotation par chapitre : `01` à `18`.
- Noms de dossiers/fichiers : minuscules, accents supprimés, **un seul mot** pour `<chapitre-simplifie>` et `<motcleslide>`.

### 🧾 Sortie attendue

- Dossiers `slides/<CC>-<chapitre-simplifie>/`
- **Fichiers YAML** : `slides/<CC>-<chapitre-simplifie>/<CC>-<NN>-<motcleslide>.yaml`
- Mise à jour de `01-slidemap.md` (statuts).
- Journal de fin :

```
✅ YAML 03–08 générés pour « Introduction à la sécurité mobile » (files 01-03..01-08)
↪ Prochaine entrée en attente : 09
```

---

## Commande : `xxxPptx`

### 🎯 Objectif

Générer un fichier Microsoft PowerPoint (.pptx) à partir du répertoire `slides/` contenant les fichiers YAML des slides, en produisant une présentation professionnelle et prête à l'emploi.

### ⚙️ Fonctionnement

Quand tu exécutes :

```
xxxPptx
```

L’agent doit :

1. Scanner le répertoire `slides/` et lire tous les fichiers YAML (un par slide).
2. Trier les slides par numéro de chapitre (chapter.number) puis par ordre de slide (slide.meta.order).
3. Pour chaque slide, appliquer le layout PPTX approprié selon le type (cover, toc, content, conclusion).
4. Intégrer le contenu : titre, bullets (pour content/conclusion), key_message, speaker_notes (dans les notes du slide), et illustrations (placeholders ou images liées).
5. Générer et sauvegarder le fichier PPTX dans le répertoire `dist/` (par défaut : `dist/presentation.pptx`).

### 📄 Détails techniques

- **Bibliothèque recommandée :** `pptxgenjs` avec `bun` pour la manipulation PPTX.
- **Layouts par type :**
  - `cover` : Layout titre principal (title slide).
  - `toc` : Layout titre et contenu (title and content), avec liste des items.
  - `content` : Layout titre et contenu avec 3 variantes pour varier le visuel (sélection via hash SHA1 du nom du slide).
  - `conclusion` : Layout titre et contenu, avec bullets et key_message en sous-titre.
- **Illustrations :** Utiliser des placeholders ou intégrer des images depuis un dossier `illustrations/` avec la même structure de sous-répertoires et noms que les slides YAML (ex. : `illustrations/01-introduction/01-01-cover.jpg` pour `slides/01-introduction/01-01-cover.yaml`).
- **Speaker Notes :** Ajouter le texte dans la section notes de chaque slide.
- **Paramètres optionnels :**
  ```
  xxxPptx output="<nom-fichier>.pptx" theme="<theme-pptx>"
  ```
  - `output` : Nom du fichier de sortie (défaut = `dist/presentation.pptx`).
  - `theme` : Appliquer un thème PPTX personnalisé (défaut = thème standard).

### 🧠 Règles générales

- Assurer la compatibilité avec la structure YAML de `AGENTS.md`.
- Gestion d'erreurs : Signaler les fichiers YAML manquants ou invalides.
- Performance : Optimiser pour des présentations avec plusieurs chapitres (e.g., 5-10 chapitres x 18 slides).
- Sortie : Journal console avec statut (e.g., "✅ PPTX généré : presentation.pptx").

### 🧾 Sortie attendue

- Fichier PPTX généré dans `dist/`.
- Message de confirmation :
  ```
  ✅ PPTX généré avec succès : dist/presentation.pptx (X slides)
  ```
- En cas d'erreur : Liste des problèmes (e.g., "⚠️ Slide 01-03 manquant").

---

## Conventions de Commit Git

Tous les commits Git doivent suivre le format **Conventional Commits**.

---

## Conventions de Développement

Lors de l'implémentation du code, il est obligatoire de lire les spécifications dans le répertoire `context/`, en particulier tous les fichiers numérotés (e.g., `00-project-brief.md`, `04-functional-specs.md`, `05-technical-spec.md`).

---

### 🪶 Auteur

Jean-Louis Guénégo — JLG Consulting
(version 3.2, novembre 2025)
