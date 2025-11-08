# 🤖 AGENTS.md

## Commandes : `xxxSlides` & `xxxSlidemap`

---

## Commande : `xxxSlidemap`

### 🎯 Objectif

Générer un fichier `01-slidemap.md` à partir du plan de formation `00-plan-formation.md`.  
Ce fichier sert de **carte de production des slides**. Il répertorie tous les chapitres et toutes les slides à générer, avec leurs numéros, titres, fichiers cibles et **statuts**.  
Il permet ensuite à la commande `xxxSlides` de savoir **où elle s’est arrêtée** et de **reprendre automatiquement**.

### ⚙️ Fonctionnement

Quand tu exécutes :

```
xxxSlidemap
```

L’agent doit :

1. Lire `00-plan-formation.md`.
2. Lister les chapitres du plan.
3. Pour chaque chapitre, produire 18 entrées (01 à 18) avec : _type_, _titre de slide_, _chemin de fichier cible_ et _statut initial_ `⏳` (sauf si le fichier existe déjà → `✅`).
4. Écrire/mettre à jour `01-slidemap.md` à la racine du repo.

### 📁 Exemple de structure `01-slidemap.md`

```markdown
# 🗺️ Slide Map – <Titre de la formation>

Ce document répertorie l’ensemble des slides à générer à partir de `00-plan-formation.md`.
Chaque slide correspond à un fichier `.md` dans `slides/<chapitre-simplifie>/`.
La colonne “Statut” est mise à jour automatiquement par `xxxSlides` à chaque exécution.

---

## Chapitre 1 — Introduction à la sécurité mobile

| Ordre | Type               | Fichier cible                                                        | Titre du slide                    | Statut |
| ----: | ------------------ | -------------------------------------------------------------------- | --------------------------------- | :----: |
|    01 | Page de garde      | slides/01-introduction-a-la-securite-mobile/01-page-de-garde.md      | Introduction à la sécurité mobile |   ✅   |
|    02 | Table des matières | slides/01-introduction-a-la-securite-mobile/02-table-des-matieres.md | Sommaire du chapitre              |   ✅   |
|    03 | Contenu            | slides/01-introduction-a-la-securite-mobile/03-contexte.md           | Contexte de la sécurité mobile    |   ⏳   |
|    04 | Contenu            | slides/01-introduction-a-la-securite-mobile/04-risques-principaux.md | Principaux risques mobiles        |   ⏳   |
|     … | …                  | …                                                                    | …                                 |   …    |
|    18 | Conclusion         | slides/01-introduction-a-la-securite-mobile/18-conclusion.md         | Conclusion du chapitre            |   ⏳   |

---

### 🧩 Légende

| Symbole | Signification                           |
| ------: | --------------------------------------- |
|      ✅ | Slide déjà généré                       |
|      ⏳ | Slide à générer                         |
|      ⚠️ | Slide partiellement généré / à réviser  |
|      ❌ | Erreur lors d’une génération précédente |

### Règles

- 18 slides par chapitre : `01` (page de garde) · `02` (table des matières) · `03–17` (contenu) · `18` (conclusion).
- Noms de dossiers/fichiers : `slides/<chapitre-simplifie>/<NN-*.md>`, minuscules, espaces → tirets, accents supprimés.
- Chemins **relatifs** au repo.
- `xxxSlides` **lit** ce fichier pour savoir quelles entrées passer de `⏳` à `✅`.
```

---

## Commande : `xxxSlides`

### 🎯 Objectif

Générer automatiquement le répertoire `slides/` contenant un sous-dossier par chapitre,  
chaque dossier comprenant **18 slides** cohérents et complets, en se basant sur `01-slidemap.md` (s’il existe) ou, à défaut, sur `00-plan-formation.md`.

### ⚙️ Description

Pour **chaque chapitre**, créer un sous-dossier :

```
slides/<chapitre-simplifie>/
```

Dans chaque dossier, **18 fichiers Markdown** :

- **01 – Page de garde** : **uniquement le titre du chapitre** (aucun bullet, message clé, prompt ni note orale)
- **02 – Table des matières** : liste des **15 titres** des slides de contenu (03–17), message clé global + prompt simple + courte note
- **03 à 17 – Slides de contenu (x15)** : gabarit complet
- **18 – Conclusion** : gabarit complet (synthèse)

### 🧱 Gabarits

#### 1) Page de garde (slide 01)

```markdown
---
id: slide-<chapitre>-01
chapter: "<Titre du chapitre>"
order: 1
type: cover
---

# <Titre du chapitre>
```

#### 2) Table des matières (slide 02)

```markdown
---
id: slide-<chapitre>-02
chapter: "<Titre du chapitre>"
order: 2
type: toc
---

# Sommaire du chapitre — <Titre du chapitre>

1. <Titre du slide 03>
2. <Titre du slide 04>
   ...
3. <Titre du slide 17>

**Message clé :** Vue d’ensemble du chapitre et des notions abordées.

**Illustration — prompt :**
Illustration vectorielle sans texte, fond blanc (#ffffff), montrant une arborescence de concepts reliés. Style minimal, composition claire et équilibrée, format 16:9, sans watermark.

---

## 🎤 Note orale

_Ce sommaire situe les étapes du chapitre et les attentes pédagogiques principales._
```

#### 3) Slides de contenu (slides 03–17) — gabarit commun

```markdown
---
id: slide-<chapitre>-<NN>
chapter: "<Titre du chapitre>"
order: <NN>
type: content
---

# <Titre du slide>

- <Bullet 1, ≤ 12 mots>
- <Bullet 2, ≤ 12 mots>
- <Bullet 3, ≤ 12 mots>
- <Bullet 4, ≤ 12 mots>
- <Bullet 5, ≤ 12 mots>

**Message clé :** <phrase percutante ≤ 120 caractères>

**Illustration — prompt :**
<3–6 phrases, image vectorielle sans texte, fond blanc pur (#ffffff), format 16:9, style plat/isométrique, composition simple, lisible et imprimable, sans watermark.>

---

## 🎤 Note orale

<Texte fluide (250–500 mots), en plusieurs paragraphes avec **gras**, _italique_ ou citation. Ton pédagogique et concret.>
```

#### 4) Conclusion (slide 18)

```markdown
---
id: slide-<chapitre>-18
chapter: "<Titre du chapitre>"
order: 18
type: conclusion
---

# Conclusion — <Titre du chapitre>

- <Synthèse 1>
- <Synthèse 2>
- <Synthèse 3>
- <Synthèse 4>
- <Synthèse 5>

**Message clé :** <résumé fort et inspirant du chapitre.>

**Illustration — prompt :**
Illustration symbolique de clôture du thème, fond blanc pur (#ffffff), style plat et épuré, composition centrée, sans texte.

---

## 🎤 Note orale

<Conclusion orale de 250–400 mots, reformulant les idées clés et ouvrant vers la suite.>
```

### 🔁 Reprise automatique & pagination

- `xxxSlides` **lit d’abord** `01-slidemap.md`.
- Il détecte la **première ligne** en statut `⏳` et **génère par lot de 5 slides** (ou une valeur configurable).
- Après génération, il met à jour les lignes correspondantes en `✅` et s’arrête.
- Au prochain appel, il reprend au prochain `⏳`.

**Paramètres optionnels :**

```
xxxSlides chapitre="<nom|numéro>" start=<NN> count=<K>
```

- `chapitre` : restreindre à un chapitre.
- `start` : numéro de slide de départ (défaut = premier `⏳`).
- `count` : nombre de slides à générer (défaut = 5).

### 🧠 Règles générales

- 5 bullets **exactement** pour les slides de contenu et de conclusion.
- Message clé ≤ 120 caractères.
- Prompt d’illustration **en texte fluide**, jamais en bloc de code, **fond blanc #ffffff**, **sans texte**, **16:9**.
- Note orale 250–500 mots, fluide, avec Markdown enrichi.
- Numérotation : 01 à 18 par chapitre.
- Langue : **français**. Ton : **formateur humain** (oral, concret, professionnel).
- Noms de dossiers/fichiers : minuscules, espaces → tirets, accents supprimés.

### 🧾 Sortie attendue

- Dossiers `slides/<chapitre-simplifie>/`
- Fichiers `01-*.md` … `18-*.md`
- Mise à jour de `01-slidemap.md` (statuts).
- Journal de fin :

```
✅ Slides 03–07 générés pour « Introduction à la sécurité mobile »
↪ Prochain slide en attente : 08
```

---

### 🪶 Auteur

Jean-Louis Guénégo — JLG Consulting  
(version 2.0, novembre 2025)
