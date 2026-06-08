// Questionnaire de qualification — ordre et formulations imposés par le PRD §4.
// Chaque réponse est stockée en base sous son `code` (valeur documentée ici),
// le `label` sert uniquement à l'affichage.

export type QuestionId = "q1" | "q2" | "q3";

export interface AnswerOption {
  code: string;
  label: string;
}

export interface Question {
  id: QuestionId;
  title: string;
  options: AnswerOption[];
}

export const questions: Question[] = [
  {
    id: "q1",
    title:
      "Une empreinte dentaire contient des données sur votre santé qui ne sont jamais analysées, ni transmises, ni conservées de façon accessible. Quelle est votre première réaction ?",
    options: [
      {
        code: "dommage",
        label:
          "Je trouve ça dommage : si ces données existent, j'aimerais qu'elles soient utiles pour ma santé et celle de mes enfants",
      },
      {
        code: "surpris",
        label:
          "Je suis surpris(e), je ne savais pas qu'une empreinte pouvait contenir ce type d'informations",
      },
      {
        code: "a_expliquer",
        label:
          "Ça m'intéresse, mais j'aurais besoin qu'on m'explique de quelles données il s'agit et à quoi elles servent",
      },
    ],
  },
  {
    id: "q2",
    title:
      "Faites-vous une différence entre la santé de vos enfants et la vôtre dans votre vie quotidienne ?",
    options: [
      {
        code: "enfants_plus",
        label: "Oui, je suis plus vigilant(e) pour mes enfants que pour moi",
      },
      {
        code: "un_peu",
        label:
          "Un peu : je fais attention à eux mais je devrais appliquer les mêmes réflexes pour moi",
      },
      {
        code: "identique",
        label: "Non, je gère leur santé et la mienne de la même façon",
      },
    ],
  },
  {
    id: "q3",
    title:
      "Dans votre vie de famille, que faites-vous concrètement pour prévenir les problèmes de santé ?",
    options: [
      {
        code: "rdv_annuel",
        label: "Je prends rendez-vous une fois par an chez le dentiste",
      },
      {
        code: "carnet_sante",
        label: "Je suis les préconisations du carnet de santé",
      },
      {
        code: "attentif_douleur",
        label: "Je suis attentif(ve) à ma douleur et à celle de mon entourage",
      },
      {
        code: "action",
        label: "Je suis plutôt dans l'action que dans la prévention",
      },
    ],
  },
];
