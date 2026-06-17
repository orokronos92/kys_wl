// Offre fondateurs : les premières places reçoivent un diagnostic dentaire offert.
// Le seuil, l'avance marketing et l'activation sont pilotés en base (table parametres_offre).

// Examens inclus dans le diagnostic offert (affichés en puces).
export const DIAGNOSTIC_INCLUS = [
  "Usure dentaire",
  "Récession gingivale",
  "Caries de surface",
  "Plaque dentaire",
] as const;

// Valeurs de repli si la ligne de paramètres est absente (base non seedée).
export const OFFRE_DEFAUTS = {
  seuil: 100,
  placesOffset: 0,
  offreActive: true,
} as const;

// État de l'offre exposé au client pour le compteur.
export interface OffreState {
  seuil: number;
  placesRestantes: number;
  offreActive: boolean;
}
