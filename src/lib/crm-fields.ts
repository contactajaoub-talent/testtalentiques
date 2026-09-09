export const crmFields = {
  "SERVICE": [
    {
      "id": "sf-nom",
      "key": "full_name",
      "label": "Nom complet",
      "type": "text",
      "required": true,
      "options": []
    },
    {
      "id": "sf-email",
      "key": "email",
      "label": "E-mail",
      "type": "email",
      "required": true,
      "options": []
    },
    {
      "id": "sf-phone",
      "key": "phone",
      "label": "Téléphone",
      "type": "tel",
      "required": false,
      "options": []
    },
    {
      "id": "sf-country",
      "key": "country",
      "label": "Pays",
      "type": "select",
      "required": true,
      "options": [
        "France",
        "Belgique",
        "Suisse",
        "Canada",
        "Luxembourg",
        "Maroc",
        "Tunisie",
        "Autre"
      ]
    },
    {
      "id": "sf-statut",
      "key": "professional_status",
      "label": "Statut actuel",
      "type": "select",
      "required": true,
      "options": [
        "Étudiant",
        "En poste",
        "En recherche d’emploi",
        "En recherche de stage",
        "En recherche d’alternance",
        "Alternant",
        "Freelance"
      ]
    },
    {
      "id": "sf-objectif",
      "key": "objective",
      "label": "Décrivez votre objectif professionnel",
      "type": "textarea",
      "required": true,
      "options": []
    },
    {
      "id": "sf-difficulte",
      "key": "difficulty",
      "label": "Difficulté principale",
      "type": "select",
      "required": false,
      "options": [
        "Je postule sans reponses",
        "Je debute et je suis perdu",
        "CV LinkedIn peu valorisant",
        "Reconversion en cours",
        "Optimisation positionnement",
        "Autre raison"
      ]
    },
    {
      "id": "sf-linkedin",
      "key": "linkedin",
      "label": "Profil LinkedIn",
      "type": "url",
      "required": false,
      "options": []
    },
    {
      "id": "sf-cv-upload",
      "key": "cv_file_id",
      "label": "Télécharger votre CV (PDF ou Word)",
      "type": "file",
      "required": false,
      "options": []
    },
    {
      "id": "sf-infos",
      "key": "notes",
      "label": "Informations complémentaires",
      "type": "textarea",
      "required": false,
      "options": []
    }
  ],
  "ACCOMPAGNEMENT": [
    {
      "id": "accomp-nom",
      "key": "full_name",
      "label": "Nom complet",
      "type": "text",
      "required": true,
      "options": []
    },
    {
      "id": "accomp-email",
      "key": "email",
      "label": "E-mail",
      "type": "email",
      "required": true,
      "options": []
    },
    {
      "id": "accomp-phone",
      "key": "phone",
      "label": "Téléphone",
      "type": "tel",
      "required": true,
      "options": []
    },
    {
      "id": "accomp-linkedin",
      "key": "linkedin",
      "label": "Profil LinkedIn",
      "type": "url",
      "required": false,
      "options": []
    },
    {
      "id": "accomp-statut",
      "key": "professional_status",
      "label": "Statut actuel",
      "type": "select",
      "required": true,
      "options": [
        "Salarié en poste",
        "Cadre / Manager",
        "En recherche emploi",
        "En reconversion",
        "Etudiant",
        "Freelance",
        "Autre"
      ]
    },
    {
      "id": "accomp-experience",
      "key": "experience",
      "label": "Années d'expérience",
      "type": "select",
      "required": false,
      "options": [
        "Moins de 2 ans",
        "2 à 5 ans",
        "5 à 10 ans",
        "Plus de 10 ans"
      ]
    },
    {
      "id": "accomp-secteur",
      "key": "sector",
      "label": "Secteur d'activité actuel / cible",
      "type": "text",
      "required": true,
      "options": []
    },
    {
      "id": "accomp-marche",
      "key": "target_market",
      "label": "Marché géographique ciblé",
      "type": "select",
      "required": true,
      "options": [
        "France",
        "Belgique",
        "Suisse",
        "Canada",
        "Luxembourg",
        "France + International",
        "Europe",
        "International"
      ]
    },
    {
      "id": "accomp-poste",
      "key": "target_role",
      "label": "Poste / Fonction visé(e)",
      "type": "text",
      "required": true,
      "options": []
    },
    {
      "id": "accomp-objectif",
      "key": "objective",
      "label": "Décrivez votre objectif en détail",
      "type": "textarea",
      "required": true,
      "options": []
    },
    {
      "id": "accomp-duree",
      "key": "duration",
      "label": "Durée d'accompagnement souhaitée",
      "type": "select",
      "required": false,
      "options": [
        "3 mois",
        "6 mois",
        "Jusqu'au résultat",
        "A définir ensemble"
      ]
    },
    {
      "id": "budget",
      "key": "budget",
      "label": "Budget d’investissement",
      "type": "radio",
      "required": true,
      "options": [
        "200-350€ — Accessible",
        "Moins de 200€ — Si possible",
        "Budget flexible — À discuter"
      ]
    },
    {
      "id": "accomp-blocage",
      "key": "blockage",
      "label": "Qu'est-ce qui bloque votre progression actuellement ?",
      "type": "select",
      "required": false,
      "options": [
        "Manque de réponses aux candidatures",
        "CV et profil peu valorisants",
        "Manque de réseau",
        "Reconversion difficile",
        "Manque de confiance",
        "Objectif pas clair",
        "Autre"
      ]
    },
    {
      "id": "accomp-infos",
      "key": "notes",
      "label": "Informations complémentaires",
      "type": "textarea",
      "required": false,
      "options": []
    }
  ],
  "COURT": [
    {
      "id": "nom_complet",
      "key": "full_name",
      "label": "Nom complet",
      "type": "text",
      "required": true,
      "options": []
    },
    {
      "id": "email",
      "key": "email",
      "label": "Adresse e-mail",
      "type": "email",
      "required": true,
      "options": []
    },
    {
      "id": "pays_residence",
      "key": "country",
      "label": "Pays de résidence",
      "type": "select",
      "required": true,
      "options": [
        "France",
        "Belgique",
        "Suisse",
        "Canada",
        "Luxembourg",
        "Maroc",
        "Tunisie",
        "Autre"
      ]
    },
    {
      "id": "statut_professionnel",
      "key": "professional_status",
      "label": "Situation actuelle",
      "type": "select",
      "required": false,
      "options": [
        "Étudiant",
        "En poste",
        "En recherche d’emploi",
        "En recherche de stage",
        "En recherche d’alternance",
        "Alternant",
        "En reconversion",
        "Freelance",
        "Autre"
      ]
    },
    {
      "id": "objectif",
      "key": "objective",
      "label": "Votre objectif professionnel",
      "type": "text",
      "required": false,
      "options": []
    },
    {
      "id": "marche_cible",
      "key": "target_market",
      "label": "Marché ciblé",
      "type": "select",
      "required": false,
      "options": [
        "France",
        "Belgique",
        "Suisse",
        "Canada",
        "Luxembourg",
        "Plusieurs pays",
        "Autre"
      ]
    },
    {
      "id": "telephone",
      "key": "phone",
      "label": "Téléphone (facultatif)",
      "type": "tel",
      "required": false,
      "options": []
    },
    {
      "id": "consent_marketing",
      "key": "marketing_consent",
      "label": "Recevoir des conseils et offres Talentiques",
      "type": "checkbox",
      "required": false,
      "options": []
    }
  ]
} as const;
