// genere un test unitaire simple pour le fichier scripts/utils/extractPromptFromAI.test.ts
import { describe, expect, it } from "bun:test";
import { extractPromptFromAI } from "./extractPromptFromAI";

const content = `
---
id: slide-1-03
chapter: "Comprendre l’IA dans le design"
order: 3
type: content
---

# Les bases de l’intelligence artificielle

- L’IA simule l’intelligence humaine
- Apprentissage automatique et données
- Algorithmes et modèles prédictifs
- Applications dans divers domaines
- Évolution rapide des technologies

**Message clé :** Comprendre les fondements de l’IA pour l’intégrer au design.

**Illustration — prompt :**
Illustration vectorielle montrant un cerveau humain connecté à des circuits électroniques, avec des flèches représentant l’apprentissage. Fond blanc pur (#ffffff), style épuré et minimal, composition centrée et équilibrée, format 16:9, sans watermark.
`;

const result = `Illustration vectorielle montrant un cerveau humain connecté à des circuits électroniques, avec des flèches représentant l’apprentissage. Fond blanc pur (#ffffff), style épuré et minimal, composition centrée et équilibrée, format 16:9, sans watermark.`;

describe("extractPromptFromAI", () => {
  it("should extract the illustration prompt from the AI response", async () => {
    const fileContent = content;
    const prompt = await extractPromptFromAI(fileContent);
    expect(prompt).toBe(result);
  });
});
