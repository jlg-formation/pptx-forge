# 👥 Personas Utilisateurs pour l'Outil Générateur PPTX

Ce document définit les personas utilisateurs clés pour l'outil Générateur PPTX, basé sur le cahier des charges et le workflow AGENTS.md. Les personas aident à s'assurer que l'outil répond aux besoins réels des utilisateurs. Nous nous limitons à 2 personas pour la simplicité.

## Persona 1 : Créateur de Contenu de Formation (Utilisateur Principal)

**Nom :** Marie Dubois  
**Âge :** 42  
**Profession :** Consultante en Formation Indépendante chez JLG Consulting  
**Contexte :** Marie a plus de 10 ans d'expérience en formation d'entreprise, spécialisée en cybersécurité et sécurité mobile. Elle utilise quotidiennement des outils comme PowerPoint, mais trouve la création manuelle de slides chronophage. Elle est technophile mais préfère les workflows automatisés.

**Objectifs :**

- Générer rapidement des présentations PPTX professionnelles à partir de contenu structuré (slides YAML) pour les sessions de formation client.
- Assurer que les présentations sont visuellement attrayantes avec des illustrations, sans passer des heures sur la conception.
- Maintenir la cohérence entre chapitres et slides pour les programmes de formation importants (ex. : 5-10 chapitres avec 18 slides chacun).

**Comportements :**

- Utilise la commande `xxxSlides` pour générer des fichiers YAML, puis exécute `xxxPptx` pour produire le PPTX final.
- Préfère les méthodes d'illustration économiques (ex. : téléchargement Google Images via script PSE) plutôt que la génération IA coûteuse.
- Itère sur les présentations en ajustant le contenu YAML et en régénérant le PPTX.

**Points de douleur :**

- Frustration face à l'édition manuelle PPTX pour les tâches répétitives.
- Préoccupations sur la qualité et le coût des illustrations si utilisation de l'IA.
- Besoin d'une gestion d'erreurs fiable pour les fichiers YAML manquants ou données invalides.

**Motivations :**

- Gagner du temps pour se concentrer sur la qualité du contenu et la livraison client.
- Produire des présentations de haute qualité, imprimables, qui impressionnent les clients.

**Maîtrise technique :** Moyenne (utilise des outils en ligne de commande mais évite le codage complexe).

## Persona 2 : Intégrateur Technique (Utilisateur Secondaire)

**Nom :** Antoine Leroy  
**Âge :** 35  
**Profession :** Développeur IT chez JLG Consulting  
**Contexte :** Antoine est un développeur full-stack qui soutient les outils internes pour les consultants. Il intègre des scripts dans les workflows et gère les personnalisations.

**Objectifs :**

- Configurer et maintenir le script générateur PPTX dans le repo `make-pptx`.
- Personnaliser l'outil pour les besoins spécifiques des clients (ex. : thèmes, layouts).
- Assurer la compatibilité avec les conventions AGENTS.md existantes et gérer les mises à jour.

**Comportements :**

- Exécute `bun run pptx-generator.ts` avec des paramètres pour la sortie et les thèmes.
- Dépanne les problèmes comme les illustrations manquantes ou les erreurs d'analyse YAML.
- Collabore avec les créateurs de contenu pour affiner l'outil basé sur les retours.

**Points de douleur :**

- Gestion des dépendances (ex. : `pptxgenjs`, analyseurs YAML) et des problèmes d'exécution dans bun.
- Équilibrer les performances pour les présentations importantes sans surcompliquer le code.
- Gérer les téléchargements d'illustrations ou les placeholders lorsque les ressources ne sont pas disponibles.

**Motivations :**

- Livrer des outils fiables qui améliorent la productivité de l'équipe.
- Éviter les retravaux en construisant des scripts évolutifs et maintenables.

**Maîtrise technique :** Élevée (à l'aise avec TypeScript, bun et les bibliothèques PPTX).

---

_Ces personas guident les décisions de conception, comme prioriser la facilité d'utilisation pour Marie et la robustesse pour Antoine. Retours bienvenus pour les raffinements._
