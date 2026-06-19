// Contenu de la section « Pourquoi agir tôt ? » (4 cartes chiffrées).
// ⚠️ Chiffres et sources à FAIRE VALIDER par le client avant publication
// (provenance maquettes GPT). Marqués « à confirmer » en attendant.

export interface WhyStat {
  key: "caries" | "suivi" | "usure" | "plaque";
  titre: string;
  soustitre: string;
  /** Valeur numérique pour les jauges/count-up (en %). Absente pour la carte « 1/an ». */
  valeur?: number;
  /** Mise en avant textuelle (ex. « 1/an ») quand ce n'est pas un %. */
  valeurTexte?: string;
  accroche: string;
  pourquoi: string;
  points: string[];
  source: string;
}

export const whyStats: Record<WhyStat["key"], WhyStat> = {
  caries: {
    key: "caries",
    titre: "Caries chez l'enfant",
    soustitre: "Dents de lait & dents définitives",
    valeur: 33,
    accroche: "des enfants de 6 ans ont déjà une carie, souvent indolore au départ.",
    pourquoi:
      "L'émail des dents de lait est plus fin et plus fragile : la carie y progresse plus vite, parfois sans aucune douleur visible.",
    points: [
      "Repérage avant l'apparition de douleur ou d'infection",
      "Protège la dent définitive qui se développe juste dessous",
      "Évite les soins en urgence, souvent plus stressants",
    ],
    source: "Source : à confirmer (HAS / UFSBD)",
  },
  suivi: {
    key: "suivi",
    titre: "Suivi régulier oublié",
    soustitre: "Empreinte numérique & continuité",
    valeurTexte: "1/an",
    accroche: "visite recommandée, même sans douleur ni signe visible.",
    pourquoi:
      "Beaucoup de familles ne consultent qu'en cas de douleur, quand le problème est déjà installé. Une empreinte déjà réalisée peut pourtant être conservée et comparée dans le temps.",
    points: [
      "Sauvegarder l'empreinte déjà réalisée, sans rien refaire",
      "Comparer sa forme dans le temps pour repérer un changement",
      "Garder une trace fiable, même entre deux dentistes",
    ],
    source: "Source : à confirmer (Ameli / Assurance Maladie)",
  },
  usure: {
    key: "usure",
    titre: "Usure dentaire",
    soustitre: "Érosion de l'émail",
    valeur: 38,
    accroche: "des adultes ont déjà au moins une dent atteinte d'usure dentaire.",
    pourquoi:
      "L'usure progresse silencieusement, souvent sans douleur, jusqu'à exposer la dentine. Une fois l'émail perdu, il ne se régénère jamais.",
    points: [
      "Détection visuelle avant l'apparition de la sensibilité",
      "Suivi de la progression entre deux consultations",
      "Une prise en charge précoce évite des soins plus lourds",
    ],
    source: "Source : à confirmer (étude clinique)",
  },
  plaque: {
    key: "plaque",
    titre: "Plaque dentaire",
    soustitre: "Biofilm bactérien",
    valeur: 50,
    accroche:
      "des adultes de 35 ans et plus présentent un problème parodontal lié à la plaque.",
    pourquoi:
      "Non éliminée, la plaque évolue vers la gingivite puis la parodontite, principale cause de perte de dents chez l'adulte.",
    points: [
      "Visualisation directe, sans produit colorant ni inconfort",
      "Détection avant l'inflammation visible des gencives",
      "Suivi des progrès d'hygiène d'une visite à l'autre",
    ],
    source: "Source : à confirmer (ARS / Inserm)",
  },
};
