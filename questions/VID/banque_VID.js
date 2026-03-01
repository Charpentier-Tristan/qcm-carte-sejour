let banque_VID = [
  {
    "id": "banque_vid_001",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Que signifie RIB ?",
    "answers": [
      { "id": "idban", "label": "Relevé d'Identité Bancaire" },
      { "id": "rib1", "label": "Rendu d'Intérêts Bancaires" },
      { "id": "rib2", "label": "Relevé d'Intérêts Bancaires" },
      { "id": "rib3", "label": "Récapitulation d'Injustices Bancaires" },
      { "id": "rib4", "label": "Restitution d'Informations Bancaires" },
      { "id": "rib5", "label": "Retour d'Instruction Bancaire" },
      { "id": "rib6", "label": "Rappel d'Immunité Bancaire" }
    ],
    "correct": ["idban"],
    "explanation": "Le RIB (Relevé d'Identité Bancaire) est un document qui contient l'identité du titulaire d'un compte bancaire, avec des numéros (BIC et IBAN) qui l'identifient de manière unique. Il permet au titulaire de communiquer sans risque d'erreur sa domiciliation bancaire, pour recevoir des virements ou régler des factures. "
  },
  {
    "id": "banque_vid_002",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Pour vivre en France, avoir un compte bancaire est :",
    "answers": [
      { "id": "indis", "label": "indispensable" },
      { "id": "obli", "label": "obligatoire" },
      { "id": "peuu", "label": "peu utile" },
      { "id": "peun", "label": "peu nécessaire" },
      { "id": "inut", "label": "inutile" },
      { "id": "inte", "label": "interdit" },
      { "id": "impr", "label": "improductif" }
    ],
    "correct": ["indis"],
    "explanation": "Avoir un compte bancaire n'est pas une obligation légale, mais c'est indispensable dans la vie de tous les jours, aussi bien pour recevoir (un salaire, une indemnité), que pour payer (des factures, un loyer)."
  },
  {
    "id": "banque_vid_003",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Combien y a-t-il de sortes de banques ?",
    "answers": [
      { "id": "trois", "label": "Trois" },
      { "id": "tre", "label": "Trente" },
      { "id": "trc", "label": "Trois cents" },
      { "id": "deux", "label": "Deux" },
      { "id": "un", "label": "Une seule" },
      { "id": "douze", "label": "Douze" },
      { "id": "quatre", "label": "Quatre" }
    ],
    "correct": ["trois"],
    "explanation": "On distingue trois sortes de banques : les banques traditionnelles ont des guichets avec des employés, les banques en ligne sont adossées à des banques traditionnelles mais n'ont pas de succursale et les néobanques qui n'ont pas de guichets et ne sont pas affiliées à des banques traditionnelles."
  },
  {
    "id": "banque_vid_004",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Avec quelle sorte de banque pouvez-vous demander des renseignements à un.e employé.e ?",
    "answers": [
      { "id": "tradi", "label": "Une banque traditionnelle" },
      { "id": "ligne", "label": "Une banque en ligne" },
      { "id": "neo", "label": "Une néobanque" },
      { "id": "impo", "label": "N'importe quelle banque" },
      { "id": "aucu", "label": "Plus aucune banque" },
      { "id": "siege", "label": "Une banque dont le siège est en France" }
    ],
    "correct": ["tradi"],
    "explanation": "Seule une banque traditionnelle maintient des succursales ou des agences physiques."
  },
  {
    "id": "banque_vid_005",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Quelles banques proposent des services en ligne pour la gestion des comptes ?",
    "answers": [
      { "id": "tout", "label": "Toutes" },
      { "id": "ligne", "label": "Seulement les banques en ligne" },
      { "id": "neo", "label": "Seulement les néobanques" },
      { "id": "aucu", "label": "Aucune" },
      { "id": "deux", "label": "Les banques en ligne et les néobanques" },
      { "id": "tradi", "label": "Seulement les banques traditionnelles" }
    ],
    "correct": ["tout"],
    "explanation": "Toutes les banques, même les banques traditionnelles permettent la gestion à distance des comptes, par l'intermédiaire d'un site internet ou d'une application mobile."
  },
  {
    "id": "banque_vid_006",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Quelle autorité de contrôle surveille les banques ?",
    "answers": [
      { "id": "acpr", "label": "L'Autorité de Contrôle Prudentiel et de Résolution (ACPR)" },
      { "id": "acdc", "label": "L'Autorité de Contrôle des Chèques (ACDC)" },
      { "id": "hatvp", "label": "La Haute Autorité pour la Transparence de la Vie Publique (HATVP)" },
      { "id": "hapa", "label": "La Haute Autorité de la Presse et de l'Audiovisuel" (HAPA)},
      { "id": "ccom", "label": "La Cour des Comptes" },
      { "id": "consco", "label": "Le Conseil Constitutionnel" }
    ],
    "correct": ["acpr"],
    "explanation": "Adossée à la Banque de France, l'Autorité de contrôle prudentiel et de résolution (ACPR) est en charge de l'agrément et de la surveillance des établissements bancaires."
  },
  {
    "id": "banque_vid_007",
    "theme": "banque",
    "level": "VID",
    "type": "multi",
    "question": "Quelle opération peut-on réaliser avec une carte bancaire ?",
    "answers": [
      { "id": "ret", "label": "Retirer de l'argent" },
      { "id": "pay", "label": "Payer un achat" },
      { "id": "vis", "label": "Obtenir un visa de séjour" },
      { "id": "heb", "label": "Obtenir un hébergement" },
      { "id": "let", "label": "Retirer une lettre recommandée" },
      { "id": "paq", "label": "Recevoir un paquet à la poste" },
      { "id": "eco", "label": "Inscrire un enfant à l'école" }
    ],
    "correct": ["ret","pay"],
    "explanation": "La carte bancaire permet les retraits d'argent dans les distributeurs automatiques. Elle permet aussi de régler des achats à distance (internet, téléphone ou correspondance) ou chez un commerçant qui l'autorise."
  },
  {
    "id": "banque_vid_008",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Avec une carte bancaire on peut dépenser :",
    "answers": [
      { "id": "plaf", "label": "jusqu'au plafond fixé" },
      { "id": "aut", "label": "autant qu'on veut" },
      { "id": "com", "label": "autant que le total du compte" },
      { "id": "mil", "label": "pas plus de 1000 euros par semaine" },
      { "id": "cen", "label": "pas plus de cent euros à la fois" },
      { "id": "agre", "label": "uniquement les montants agréés par la banque" }
    ],
    "correct": ["plaf"],
    "explanation": "Le montant des achats par carte est limité par un montant maximum, le \"plafond\". Ce plafond est fixé par contrat et il est indiqué dans votre convention de compte. Il peut être relevé ponctuellement sur demande."
  },
  {
    "id": "banque_vid_009",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "En cas de découvert bancaire :",
    "answers": [
      { "id": "agio", "label": "Votre banque vous fera payer des agios" },
      { "id": "inter", "label": "Vous serez frappé d'interdit bancaire" },
      { "id": "ferm", "label": "La banque fermera votre compte" },
      { "id": "aver", "label": "Vous aurez droit à un avertissement sans frais" },
      { "id": "doub", "label": "Vous devrez rembourser le double du découvert" },
      { "id": "regu", "label": "La banque vous demandera de régulariser sous huitaine" }
    ],
    "correct": ["agio"],
    "explanation": "Les agios désignent les intérêts débiteurs facturés en cas de solde négatif sur le compte courant. Leur montant se compose d'une somme forfaitaire à laquelle s'ajoute une somme proportionnelle au montant et à la durée du découvert."
  },
  {
    "id": "banque_vid_010",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Le droit au compte bancaire est",
    "answers": [
      { "id": "loi", "label": "Garanti par la loi" },
      { "id": "const", "label": "Un droit constitutionnel" },
      { "id": "rich", "label": "Réservé aux riches" },
      { "id": "pauv", "label": "Interdit à ceux qui n'ont pas de revenu fixe" },
      { "id": "irr", "label": "Interdit aux étrangers en situation irrégulière" },
      { "id": "eur", "label": "Réservé aux citoyens européens" }
    ],
    "correct": ["loi"],
    "explanation": "Une banque peut vous refuser l'ouverture d'un compte. Si une banque ne répond pas à votre demande d'ouverture de compte dans un délai de 15 jours, cela est considéré comme un refus. La banque doit alors vous fournir une lettre de refus en y précisant le motif. Elle doit aussi vous informer sur la possibilité de saisir la Banque de France pour bénéficier de la procédure de droit au compte."
  },
  {
    "id": "banque_vid_011",
    "theme": "banque",
    "level": "VID",
    "type": "single",
    "question": "Si une banque refuse de vous ouvrir un compte, vous pouvez déposer un recours auprès de :",
    "answers": [
      { "id": "banf", "label": "la Banque de France" },
      { "id": "couco", "label": "la Cour des Comptes" },
      { "id": "vois", "label": "la banque voisine" },
      { "id": "ligne", "label": "une banque en ligne" },
      { "id": "neo", "label": "une néobanque" },
      { "id": "eur", "label": "la Banque Centrale Européenne" }
    ],
    "correct": ["banf"],
    "explanation": "Si une banque refuse de vous ouvrir un compte bancaire, vous pouvez saisir la Banque de France pour bénéficier de la procédure du droit au compte. La Banque de France désigne alors une banque, proche de votre domicile ou du lieu de votre choix, qui doit vous ouvrir un compte avec des services bancaires de base."
  }
]
