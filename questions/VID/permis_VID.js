let permis_VID = [
  {
    "id": "permis_vid_001",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Quel est l'âge minimum pour commencer à conduire ?",
    "answers": [
      { "id": "qua", "label": "15 ans en conduite accompagnée" },
      { "id": "qut", "label": "15 ans pour tous" },
      { "id": "sea", "label": "16 ans en conduite accompagnée" },
      { "id": "set", "label": "16 ans pour tous" },
      { "id": "dis", "label": "17 ans" },
      { "id": "dih", "label": "18 ans" }
    ],
    "correct": ["qua"],
    "explanation": "En cas de conduite accompagnée, l'âge minimum pour commencer les leçons de conduite est 15 ans."
  },
  {
    "id": "permis_vid_002",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Quel est l'âge minimum pour passer l'examen du code ?",
    "answers": [
      { "id": "qua", "label": "15 ans en conduite accompagnée" },
      { "id": "qut", "label": "15 ans pour tous" },
      { "id": "sea", "label": "16 ans en conduite accompagnée" },
      { "id": "set", "label": "16 ans pour tous" },
      { "id": "dis", "label": "17 ans" },
      { "id": "dih", "label": "18 ans" }
    ],
    "correct": ["qua"],
    "explanation": "L'examen du code peut être passé à partir de 15 ans en conduite accompagnée, ou 16 ans en formule classique. L'âge d'obtention de l'examen du permis de conduire a été abaissé à 17 ans au lieu de 18 ans."
  },
  {
    "id": "permis_vid_003",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "L'examen de code de la route peut se passer :",
    "answers": [
      { "id": "pos", "label": "à la Poste" },
      { "id": "sup", "label": "au supermarché" },
      { "id": "mai", "label": "à la mairie" },
      { "id": "pre", "label": "à la préfecture" },
      { "id": "int", "label": "sur internet" },
      { "id": "frt", "label": "sur France titres" }
    ],
    "correct": ["pos"],
    "explanation": "L'examen du code peut se passer à la Poste, moyennant 30 euros."
  },
  {
    "id": "permis_vid_004",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Pour s'inscrire à l'épreuve pratique il faut :",
    "answers": [
      { "id": "cod", "label": "réussir l'examen du code" },
      { "id": "vid", "label": "regarder des vidéos sur internet" },
      { "id": "dej", "label": "suivre quelqu'un qui a déjà le permis" },
      { "id": "sim", "label": "conduire sur un simulateur" },
      { "id": "con", "label": "acheter un jeu de course sur console" },
      { "id": "cen", "label": "avoir conduit au moins 100 heures en auto-école" }
    ],
    "correct": ["cod"],
    "explanation": "Il n'est pas obligatoire d'avoir réussi l'examen du code pour commencer les heures de conduite, mais ça l'est pour s'inscrire à l'épreuve pratique."
  },
  {
    "id": "permis_vid_005",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Le permis de ce pays est échangeable avec le permis Français :",
    "answers": [
      { "id": "coi", "label": "Côte d'Ivoire" },
      { "id": "nigr", "label": "Niger" },
      { "id": "niga", "label": "Nigeria" },
      { "id": "sen", "label": "Sénégal" },
      { "id": "som", "label": "Somalie" },
      { "id": "bur", "label": "Burkina Faso" }
    ],
    "correct": ["coi","nigr"],
    "explanation": "La liste des pays qui ont un accord de réciprocité permettant d'échanger son permis contre un permis français inclut la Côte d'Ivoire et le Niger."
  },
  {
    "id": "permis_vid_006",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Le permis de ce pays n'est pas échangeable avec le permis Français :",
    "answers": [
      { "id": "sen", "label": "Sénégal" },
      { "id": "guic", "label": "Nigeria" },
      { "id": "guib", "label": "Guinée Bissau" },
      { "id": "mal", "label": "Mali" },
      { "id": "mau", "label": "Mauritanie" },
      { "id": "nig", "label": "Niger" },
      { "id": "tch", "label": "Tchad" },
      { "id": "nam", "label": "Namibie" }
    ],
    "correct": ["sen","guic"],
    "explanation": "La liste des pays qui ont un accord de réciprocité permettant d'échanger son permis contre un permis français n'inclut ni le Sénégal, ni la Guinée (Conakry), ni le Nigeria."
  },
  {
    "id": "permis_vid_007",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "L'échange avec un permis Français est possible :",
    "answers": [
      { "id": "rec", "label": "si le pays a un accord de réciprocité avec la France" },
      { "id": "afr", "label": "pour tous les pays d'Afrique francophone" },
      { "id": "gvi", "label": "pour tous les pays du G20" },
      { "id": "asi", "label": "pour tous les pays d'Asie" },
      { "id": "uan", "label": "après un an de conduite sans accident en France" }
    ],
    "correct": ["rec"],
    "explanation": "L'échange d'un permis étranger avec un permis français est possible pour tous les pays ayant un accord de réciprocité avec la France. C'est le cas pour tous les pays de l'UE, et pour certains pays hors UE."
  },
  {
    "id": "permis_vid_008",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Quelqu'un qui n'a pas le permis peut conduire :",
    "answers": [
      { "id": "pui", "label": "une voiture électrique de puissance inférieure à 1000 W" },
      { "id": "imp", "label": "n'importe quelle voiture électrique" },
      { "id": "ccc", "label": "une moto de 500 cc" },
      { "id": "aut", "label": "un autobus " },
      { "id": "tra", "label": "un tramway" },
      { "id": "hyb", "label": "une voiture hybride" }
    ],
    "correct": ["pui"],
    "explanation": "La puissance des voitures que l'on peut conduire sans permis est limitée à 1000 watts pour les voitures électriques. En théorie, une voiture ou un cyclomoteur sans permis ne doit pas pouvoir dépasser les 45 km/h. On peut conduire aussi dans un circuit fermé à la circulation publique. Il n'y a pas besoin de permis non plus pour conduire un tracteur."
  },
  {
    "id": "permis_vid_009",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Avant de passer le permis il faut avoir conduit au moins :",
    "answers": [
      { "id": "vin", "label": "20 heures" },
      { "id": "deu", "label": "2 heures" },
      { "id": "qua", "label": "40 heures" },
      { "id": "dec", "label": "200 heures" },
      { "id": "cen", "label": "100 heures" }
    ],
    "correct": ["vin"],
    "explanation": "La durée minimale de formation requise pour passer le permis est fixée à 20 heures de conduite. En pratique, la durée moyenne de formation à la conduite se situe désormais entre 28 et 35 heures."
  },
  {
    "id": "permis_vid_010",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Passer le permis de conduire coûte :",
    "answers": [
      { "id": "mil", "label": "au moins de l'ordre de 1000 euros" },
      { "id": "tre", "label": "30 euros" },
      { "id": "cic", "label": "500 euros" },
      { "id": "dim", "label": "10 000 euros" },
      { "id": "vim", "label": "20 000 euros" }
    ],
    "correct": ["mil"],
    "explanation": "Passer le permis, depuis les premières leçons jusqu'à l'obtention définitive, coûte au moins de l'ordre de 1000 euros, souvent 2000, et en général beaucoup plus que les tarifs minimaux affichés par certaines auto-écoles en ligne. La durée minimale de formation requise pour passer le permis est fixée à 20 heures de conduite. Mais la durée moyenne réelle de formation à la conduite se situe désormais entre 28 et 35 heures."
  },
  {
    "id": "permis_vid_011",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Pour passer le permis, il faut s'inscrire sur :",
    "answers": [
      { "id": "tit", "label": "France Titres" },
      { "id": "tra", "label": "France Travail" },
      { "id": "cho", "label": "Choose France" },
      { "id": "per", "label": "France Permis" },
      { "id": "ftv", "label": "France TV" },
      { "id": "aut", "label": "France Auto" }
    ],
    "correct": ["tit"],
    "explanation": "Les démarches d'inscription se font sur France Titres. Elles commencent par l'obtention d'un NEPH (Numéro d'Enregistrement Préfectoral Harmonisé).
  },
  {
    "id": "permis_vid_012",
    "theme": "permis",
    "level": "VID",
    "type": "single",
    "question": "Dans une auto-école en ligne, on conduit :",
    "answers": [
      { "id": "dou", "label": "une voiture double commandes" },
      { "id": "sim", "label": "sur un simulateur de conduite" },
      { "id": "con", "label": "sur une console de jeu" },
      { "id": "agg", "label": "en dehors des agglomérations" },
      { "id": "jam", "label": "jamais sur auto-route" },
      { "id": "sma", "label": "sur un smartphone" }
    ],
    "correct": ["dou"],
    "explanation": "Une auto-école en ligne n'a pas d'agence physique, et donne ses rendez-vous au moyen d'une application mobile. C'est ce qui lui permet d\'annoncer des tarifs moins élevés. Mais elle est tenue au même apprentissage que les auto-écoles classiques : conduite avec un moniteur diplômé dans une voiture double commande."
  }
]
