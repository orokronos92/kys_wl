# Visuels de la landing KYS

Emplacements (slots) où viennent les visuels générés par le client (Ouro/Mathieu).
Tant que le fichier final n'est pas livré, le composant `VisuelPlaceholder` affiche
un bloc dégradé neutre de la charte, aux bonnes dimensions (aucun décalage de mise en page).

Format final attendu : **WebP**, lazy loading, `alt` descriptif en français déjà câblé dans le code.

| Slot | Section | Ratio | Dimensions cibles | Fichier à déposer | Contenu |
| --- | --- | --- | --- | --- | --- |
| `VISUEL_HERO_FAMILLE` | 1 — Hero | 4 / 5 (portrait) | 1080 × 1350 | `hero-famille.webp` | Famille (2 parents + 2 enfants), sourires naturels dents visibles, lumière douce, intérieur clair bleu/blanc flou. Cohérent avec l'affiche. |
| `VISUEL_EMPREINTE_DATA` | 2 — Problème | 1 / 1 (carré) | 1200 × 1200 | `empreinte-data.webp` | Empreinte/scan dentaire 3D bleuté sur fond sombre dégradé, points/données lumineux qui émanent. Esthétique tech-santé. Pas de visage. |
| `LOGO_KYS` | Header + Section 5 | — | SVG/PNG | `logo-kys.svg` | Dent stylisée avec sourire intégré + « Kys ». **Fourni par le client** ; en attendant, logo provisoire dans `components/KysLogo.tsx`. |

Les **pictogrammes des 4 piliers** (Section 3) ne sont pas des visuels IA : ils sont
réalisés en SVG directement dans le code (cf. PRD §7, Lot 2).

## Intégration d'un visuel final
1. Déposer le fichier WebP dans ce dossier (`public/visuels/`).
2. Remplacer le `VisuelPlaceholder` correspondant par `next/image` (`fill` + ratio identique, `loading="lazy"`), en conservant le même texte `alt`.
