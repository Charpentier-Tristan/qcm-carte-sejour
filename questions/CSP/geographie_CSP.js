/*----------------------------------------------------------------*/
/*       Examen civique niveau carte de séjour pluriannuelle      */
/*                  Bernard Ycart 20 janvier 2026                 */
/* https://formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-csp/                                */
/*            Arrêté publié au J.O. du 12 octobre 2025            */
/*                   Territoire et géographie                     */
/*----------------------------------------------------------------*/

/*-------------------------- donnees -----------------------------*/
/* geographie_CSP : liste des questions (liste de listes)         */
/* Chaque question est constituée de :                            */
/* "question" : string (énoncé de la question)                    */
/* "answers" : vector of strings (réponses proposées)             */
/* "correct" : vector of integers (indices des réponses correctes)*/
/* "explanation" : string (détails de la réponse)
/*----------------------------------------------------------------*/

let geographie_CSP = [
  {
    "question": "Quel fleuve coule en France ?",
    "answers": [
      { "id": "seine", "label": "La Seine" },
      { "id": "garonne", "label": "La Garonne" },
      { "id": "loire", "label": "La Loire" },
      { "id": "rhone", "label": "Le Rhône" },
      { "id": "rhin", "label": "Le Rhin" },
      { "id": "po", "label": "Le Pô" },
      { "id": "tamise", "label": "La Tamise" },
      { "id": "tage", "label": "Le Tage" },
      { "id": "ebre", "label": "L’Èbre" },
      { "id": "gange", "label": "Le Gange" },
      { "id": "amazone", "label": "L’Amazone" },
      { "id": "nil", "label": "Le Nil" },
      { "id": "senegal", "label": "Le Sénégal" }
    ],
    "correct": ["seine", "garonne", "loire", "rhone", "rhin"],
    "explanation": "La Seine et la Loire coulent entièrement en France. Une partie du Rhin est frontière avec l’Allemagne. Le Rhône prend sa source en Suisse, la Garonne dans les Pyrénées espagnoles."
  },

  {
    "question": "Quelle ville est française ?",
    "answers": [
      { "id": "paris", "label": "Paris" },
      { "id": "lyon", "label": "Lyon" },
      { "id": "marseille", "label": "Marseille" },
      { "id": "lille", "label": "Lille" },
      { "id": "toulouse", "label": "Toulouse" },
      { "id": "bordeaux", "label": "Bordeaux" },
      { "id": "hambourg", "label": "Hambourg" },
      { "id": "londres", "label": "Londres" },
      { "id": "naples", "label": "Naples" },
      { "id": "barcelone", "label": "Barcelone" },
      { "id": "rome", "label": "Rome" },
      { "id": "bruxelles", "label": "Bruxelles" },
      { "id": "gand", "label": "Gand" },
      { "id": "anvers", "label": "Anvers" },
      { "id": "genes", "label": "Gênes" },
      { "id": "geneve", "label": "Genève" }
    ],
    "correct": ["paris", "lyon", "marseille", "lille", "toulouse", "bordeaux"],
    "explanation": "Les villes françaises dont l’agglomération approche ou dépasse le million d’habitants sont Paris, Lyon, Marseille, Lille, Bordeaux et Toulouse."
  },

  {
    "question": "Quel océan borde la côte ouest française ?",
    "answers": [
      { "id": "atlantique", "label": "Atlantique" },
      { "id": "pacifique", "label": "Pacifique" },
      { "id": "indien", "label": "Indien" },
      { "id": "arctique", "label": "Arctique" },
      { "id": "mediterranee", "label": "Méditerranée" },
      { "id": "adriatique", "label": "Adriatique" }
    ],
    "correct": ["atlantique"],
    "explanation": "L’océan Atlantique borde la côte ouest. Il prend le nom de Manche au nord-ouest, entre la France et l’Angleterre, puis de mer du Nord."
  },

  {
    "question": "Qu’est-ce que Paris ?",
    "answers": [
      { "id": "capitale_fr", "label": "La capitale de la France" },
      { "id": "parlement_eu", "label": "Le siège du parlement européen" },
      { "id": "capitale_eu", "label": "La capitale de l’Europe" },
      { "id": "club_foot", "label": "Un club de football" },
      { "id": "aeroport", "label": "Le nom d’un aéroport" },
      { "id": "parc", "label": "Un parc d’attraction" }
    ],
    "correct": ["capitale_fr"],
    "explanation": "Paris est la capitale de la France. C’est le siège du parlement et de la présidence de la République."
  },

  {
    "question": "Quelle est la capitale de la France ?",
    "answers": [
      { "id": "paris", "label": "Paris" },
      { "id": "lyon", "label": "Lyon" },
      { "id": "vichy", "label": "Vichy" },
      { "id": "marseille", "label": "Marseille" },
      { "id": "bruxelles", "label": "Bruxelles" },
      { "id": "newyork", "label": "New-York" }
    ],
    "correct": ["paris"],
    "explanation": "Paris est la capitale de la France."
  },

  {
    "question": "Sur quel continent se situe la France métropolitaine ?",
    "answers": [
      { "id": "europe", "label": "Le continent européen" },
      { "id": "afrique", "label": "Le continent africain" },
      { "id": "amerique", "label": "Le continent américain" },
      { "id": "asie", "label": "Le continent asiatique" },
      { "id": "oceanie", "label": "Le continent océanien" }
    ],
    "correct": ["europe"],
    "explanation": "La France métropolitaine se situe à l’extrémité ouest du continent européen."
  },

  {
    "question": "Quelle île est un département d’outre-mer français ?",
    "answers": [
      { "id": "guadeloupe", "label": "La Guadeloupe" },
      { "id": "martinique", "label": "La Martinique" },
      { "id": "mayotte", "label": "Mayotte" },
      { "id": "reunion", "label": "La Réunion" },
      { "id": "guyane", "label": "La Guyane" },
      { "id": "spm", "label": "Saint-Pierre-et-Miquelon" },
      { "id": "tahiti", "label": "Tahiti" },
      { "id": "nouvelle_caledonie", "label": "La Nouvelle-Calédonie" },
      { "id": "corse", "label": "La Corse" }
    ],
    "correct": ["guadeloupe", "martinique", "mayotte", "reunion"],
    "explanation": "Il existe cinq départements d’outre-mer. La Guyane n’est pas une île."
  },

  {
    "question": "Quelle ville est située au bord de la mer Méditerranée ?",
    "answers": [
      { "id": "marseille", "label": "Marseille" },
      { "id": "toulon", "label": "Toulon" },
      { "id": "nice", "label": "Nice" },
      { "id": "montpellier", "label": "Montpellier" },
      { "id": "beziers", "label": "Béziers" },
      { "id": "narbonne", "label": "Narbonne" },
      { "id": "perpignan", "label": "Perpignan" },
      { "id": "bordeaux", "label": "Bordeaux" },
      { "id": "lehavre", "label": "Le Havre" },
      { "id": "larochelle", "label": "La Rochelle" }
    ],
    "correct": ["marseille", "toulon", "nice"],
    "explanation": "Marseille, Toulon et Nice sont situées directement sur le littoral méditerranéen."
  },

  {
    "question": "Quelle chaîne de montagnes est située entre la France et l’Italie ?",
    "answers": [
      { "id": "alpes", "label": "Les Alpes" },
      { "id": "pyrenees", "label": "Les Pyrénées" },
      { "id": "jura", "label": "Le Jura" },
      { "id": "vosges", "label": "Les Vosges" },
      { "id": "massif_central", "label": "Le Massif central" },
      { "id": "appenins", "label": "Les Appenins" },
      { "id": "carpates", "label": "Les Carpates" },
      { "id": "oural", "label": "L’Oural" }
    ],
    "correct": ["alpes"],
    "explanation": "Les Alpes sont situées entre la France et l’Italie."
  }
];
