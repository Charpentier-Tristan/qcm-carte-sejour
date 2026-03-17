var soins_NAT = [
  {
    "id": "soins_nat_001",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "Auprès de quel organisme faut-il demander le remboursement des frais de santé ?",
    "answers": [
      { "id": "cai", "label": "Caisse primaire d'assurance maladie" },
      { "id": "cen", "label": "Centre Communal d'Action Sociale" },
      { "id": "pro", "label": "Protection Universelle Maladie" },
      { "id": "aid", "label": "Aide Médicale d'État" },
      { "id": "fra", "label": "France Services" }
      ],
    "correct": ["cai"],
    "explanation": "C'est auprès de la caisse primaire d'Assurance maladie qu'il faut demander le remboursement des frais de santé. Normalement, le professionnel de santé insère votre carte Vitale dans son lecteur et transmet une feuille de soins électronique à l’Assurance maladie. Ceci permet de constater la facturation des soins et d'enclencher leur remboursement."
  },
  {
    "id": "soins_nat_002",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "La contraception :",
    "answers": [
      { "id": "tou", "label": "est accessible à toutes et à tous" },
      { "id": "fem", "label": "est réservée aux femmes" },
      { "id": "hom", "label": "est réservée aux hommes" },
      { "id": "vis", "label": "est destinée aux personnes de moins de 26 ans" },
      { "id": "qua", "label": "est interdite aux personnes âgées de plus de 40 ans" }
      ],
    "correct": ["tou"],
    "explanation": "Le 19 décembre 1967, l'Assemblée nationale adoptait une loi autorisant la vente et l'usage des méthodes de contraception en France. Les médecins, sages-femmes et centres de santé sexuelle sont habilités à prescrire tous les modes de contraception à toutes et à tous, y compris aux mineures sans le consentement de leurs parents. Certains dispositifs sont intégralement remboursés aux personnes de moins de 26 ans."
  },
  {
    "id": "soins_nat_003",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "Qu'est-ce que le principe de confidentialité dans le domaine de la santé ?",
    "answers": [
      { "id": "sec", "label": "Le médecin doit garder secrètes les informations médicales d'un patient" },
      { "id": "eco", "label": "Le médecin doit écouter les confidences du patient" },
      { "id": "con", "label": "Le patient doit se confier au médecin" },
      { "id": "pat", "label": "Le patient ne doit pas transmettre d'information confidentielle au médecin" },
      { "id": "med", "label": "Le médecin ne doit pas transmettre d'informations confidentielles au patient" }
      ],
    "correct": ["sec"],
    "explanation": "Le principe de confidentialité fait que le médecin est obligé de garder secrètes les informations médicales d'un patient. Le secret médical protège toutes les informations connues par le professionnel de santé : état de santé, identité, ainsi que tout ce qui a été vu, entendu ou compris lors de la consultation. Le secret médical continue, même après la mort du patient."
  },
  {
    "id": "soins_nat_004",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "À quoi sert la carte Vitale ?",
    "answers": [
      { "id": "rem", "label": "Au remboursement des frais de santé" },
      { "id": "per", "label": "À remplacer le permis de conduire" },
      { "id": "ide", "label": "À prouver son identité" },
      { "id": "vac", "label": "À prouver qu'on est vacciné" },
      { "id": "med", "label": "À éviter l'attente chez le médecin" }
      ],
    "correct": ["rem"],
    "explanation": "La carte Vitale et sa version dématérialisée l’appli carte Vitale contiennent tous les renseignements nécessaires au remboursement des frais de santé."
  },
  {
    "id": "soins_nat_005",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "À quoi sert une mutuelle santé ?",
    "answers": [
      { "id": "com", "label": "À compléter la couverture médicale de base" },
      { "id": "sec", "label": "À remplacer la Sécurité Sociale" },
      { "id": "cho", "label": "À payer les indemnités de chômage" },
      { "id": "imp", "label": "À payer les impôts" },
      { "id": "epi", "label": "À protéger contre les épidémies" }
      ],
    "correct": ["com"],
    "explanation": "La mutuelle santé complète la couverture de base assurée par la protection universelle maladie (PUMa). Elle n’est pas obligatoire mais elle est recommandée afin de compléter la prise en charge financière des soins, des médicaments, des indemnités en cas d’arrêt de travail, etc."
  },
  {
    "id": "soins_nat_006",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "Qu'est-ce que le tiers payant ?",
    "answers": [
      { "id": "dir", "label": "Le fait que l'Assurance maladie puisse payer directement les soins" },
      { "id": "fam", "label": "Le fait de faire payer ses soins par un membre de sa famille" },
      { "id": "cre", "label": "Le fait de payer comptant le tiers des soins, le reste étant payé à crédit" },
      { "id": "tie", "label": "Le fait de payer le tiers des soins, les deux tiers restant étant à la charge de l'Assurance maladie" },
      { "id": "deu", "label": "Le fait de payer les deux tiers des soins, le tiers restant étant à la charge de l'Assurance maladie" }
      ],
    "correct": ["dir"],
    "explanation": "Le tiers payant consiste pour l'Assurance maladie à payer directement le professionnel de santé. Ainsi, le patient n'avance pas de frais sur la part des soins remboursés par l'Assurance maladie."
  },
  {
    "id": "soins_nat_007",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "L'inscription à l'Assurance maladie est :",
    "answers": [
      { "id": "tou", "label": "obligatoire pour tous" },
      { "id": "rec", "label": "recommandée pour ceux qui travaillent" },
      { "id": "cit", "label": "obligatoire pour les citoyens français" },
      { "id": "etr", "label": "obligatoire seulement pour les étrangers" },
      { "id": "fem", "label": "obligatoire pour les femmes" }
      ],
    "correct": ["tou"],
    "explanation": "L'affiliation en France auprès d'un organisme de santé est obligatoire. Toute personne qui refuse délibérément de s'affilier ou qui persiste à ne pas engager les démarches pour son affiliation obligatoire à un régime de Sécurité sociale est passible d'une peine de prison assortie d'une amende."
  },
  {
    "id": "soins_nat_008",
    "theme": "soins",
    "level": "NAT",
    "type": "single",
    "question": "L'avortement est-il possible en France ?",
    "answers": [
      { "id": "reg", "label": "Oui, sans condition, mais dans un cadre règlementé" },
      { "id": "cla", "label": "Oui, clandestinement, à ses risques et périls" },
      { "id": "etr", "label": "Oui dans un pays étranger, mais pas en France" },
      { "id": "sem", "label": "Oui, toujours, quel que soit le nombre de semaines de grossesse" },
      { "id": "med", "label": "Oui, même sans avoir recours à un médecin" }
      ],
    "correct": ["reg"],
    "explanation": "Chaque femme, sans condition d'âge, peut avoir recours à l'IVG (Interruption Volontaire de Grossesse) dans un cadre réglementé. Le droit à l'avortement permet aux femmes d'interrompre une grossesse sans risque d'être punies par la loi. Le 4 mars 2024, le Parlement a inscrit dans la Constitution le droit des femmes à recourir à l'IVG."
  }
];
