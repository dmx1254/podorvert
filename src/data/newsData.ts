import { ReactNode } from "react";

export type DonationContent = {
  mainTitle: string;
  mainDescription: string;
  monthlySupportTitle: string;
  monthlySupportPoints: string[];
  donorAdvantagesTitle: string;
  donorAdvantagesPoints: string[];
  transparencyTitle: string;
  transparencyDescription: string;
};

export type NewsArticle = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  fullContent?: string[];
  thankYous?: string[];
  personalities?: string[];
  galleryImages?: { id: number; src: string; alt: string }[];
  donationContent?: DonationContent;
};

export const newsList: NewsArticle[] = [
    {
    id: 1,
    image: "/images/blog/blog-1.jpg",
    date: "06 novembre 2024",
    title: "Environnement – Opération de reboisement dans le département : Les plants de «Podor vert» contre le changement climatique",
    description: "Pour la deuxième édition des Journées de reboisement du département, l’Association «Podor vert» avait ciblé des localités dans cinq communes.",
    link: "/actualites/1",
    fullContent: [
        "Environnement – Opération de reboisement dans le département : Les plants de «Podor vert» contre le changement climatique.",
        "Deuxième édition des Journées de reboisement du département, organisée par l’Association «Podor vert» avec le parrainage du chanteur Baaba Maal.",
        "En deux journées, 2 000 arbres ont été plantés dans cinq communes avec l’appui du Conseil départemental, de la Saed et des agents des Eaux et Forêts.",
        "La campagne a démarré à l’hôpital de Ndioum, qui doit retrouver un cadre vert digne d’un centre hospitalier.",
        "Le collège et le poste de santé de Ndiayène Peindao ont bénéficié d’un reboisement ; le personnel s’est engagé à entretenir les plants.",
        "Les membres de l’association, malgré des moyens limités (trois véhicules seulement), ont sillonné plusieurs localités : Nguéndar, Thiangaye (Fanaye), Ouro Madiw, Donaye (Guédé Village), Touldé Gallé (Dodel), Guédé Chantier.",
        "Le deuxième jour, les villages de la commune de Méry – Thioubalel, Souraye, Dioudé Diabé et Fondé Gandé – ont accueilli la caravane de reboisement avec une forte mobilisation.",
        "Mamadou Amadou Ba, président de la Commission de reboisement et de suivi, a salué la réussite de cette édition grâce à l’implication des populations locales.",
        "Message clé : la survie et la protection des arbres dépendront de l’engagement collectif à entretenir les plants jusqu’à maturité.",
        "Clou des journées : passage de la caravane à Diagnoum, avec un concert de Baaba Maal, qui a également offert un soutien financier de 250 000 FCFA."
    ],
    thankYous: [
        "@Conseil départemental de Podor",
        "@SAED",
        "@Service régional des Eaux et Forêts",
        "@Baaba Maal"
    ],
    donationContent: {
        mainTitle: "À quoi sert votre don ?",
        mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
        monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
        monthlySupportPoints: [
            "Vous assurez l'indépendance de nos initiatives.",
            "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
            "Vous contribuez à la diminution de nos frais de gestion.",
            "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
        ],
        donorAdvantagesTitle: "Les avantages pour vous",
        donorAdvantagesPoints: [
            "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
            "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
            "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
        ],
        transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
        transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
    }
},

    {
    id: 2,
    image: "/images/blog/blog-22.jpg",
    date: "07 juin 2022",
    title: "Journée mondiale de l’environnement «Podor vert» fait son bilan et se projette sur le reboisement",
    description: "Cette année encore, l’association environnementale «Podor vert» n’a pas déroulé d’activités de reboisement durant la journée de l’environnement. Habitués à plusieurs journées de reboisement dans...",
    link: "/actualites/2",
    fullContent: [
        "Journée mondiale de l’environnement – «Podor vert» fait son bilan et se projette sur le reboisement.",
        "Cette année encore, l’association «Podor vert» n’a pas organisé de reboisement le jour même, mais a choisi de dresser le bilan de l’édition précédente.",
        "Les membres se sont projetés sur l’organisation de la troisième édition des journées de reboisement prévue pour octobre.",
        "Bilan 2021 : sur 2 000 plants reboisés, seuls dix ont été détruits au poste de santé de Ndiayène Peindao, selon le président Bassirou Hamédine Sy.",
        "Ce succès est attribué à l’approche inclusive de l’association visant à impliquer massivement les populations du département.",
        "En perspective, l’association entend renforcer ses actions en partenariat avec le Conseil départemental, Baaba Maal et de nouveaux alliés institutionnels.",
        "Une convention a été signée avec le service régional des Eaux et Forêts de Saint-Louis, permettant à ses agents de semer, entretenir et fournir les plants pour la campagne d’octobre.",
        "Les chefs d’établissement de Podor et Pété ont été sollicités pour mettre en place des comités environnementaux scolaires.",
        "Nouveauté : mise en place d’un système de parrainage de plants confiés aux populations et aux élèves.",
        "Les élèves qui réussissent la survie et l’entretien de leurs arbres parrainés recevront des encouragements tout au long de leur cursus scolaire.",
        "Autre ambition de «Podor vert» : fédérer toutes les associations environnementales du département pour restaurer la végétation et lutter contre l’avancée du désert."
    ],
    thankYous: [
        "@Conseil départemental de Podor",
        "@Service régional des Eaux et Forêts de Saint-Louis",
        "@Baaba Maal"
    ],
    donationContent: {
        mainTitle: "À quoi sert votre don ?",
        mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
        monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
        monthlySupportPoints: [
            "Vous assurez l'indépendance de nos initiatives.",
            "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
            "Vous contribuez à la diminution de nos frais de gestion.",
            "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
        ],
        donorAdvantagesTitle: "Les avantages pour vous",
        donorAdvantagesPoints: [
            "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
            "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
            "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
        ],
        transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
        transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
    }
},

    {
    id: 3,
    image: "/images/blog/blog-30.jpg",
    date: "19 au 21 Août 2022",
    title: "Mission de plantation à Ndormboss, Médina Ndiathbé, Gamadji Sarré, Tarédji et Thillé Boubacar du 19 au 21 Août 2022",
    description: "Le présent article fait l’état des activités de mission réalisées du 19 au 21 Aout 2022 dans les localités suivantes : Ndormboss, Médina Ndiathbé...",
    link: "/actualites/3",
    fullContent: [
        "Le présent article fait l’état des activités de mission réalisées du 19 au 21 Aout 2022 dans les localités suivantes : Ndormboss, Médina Ndiathbé, Gamadji Sarré, Tarédji et Thillé Boubacar.",
        "L’association Podor Vert a effectué une mission de terrain du 19 au 21/07/2022 dans les localités suivantes : Ndormboss, Médina Ndiathbé, Gamadji Sarré, Tarédji et Thillé Boubacar.",
        "L’objectif de cette dernière était de procéder à la distribution de 325 plants mis à notre disposition par le secteur de Mbao par le biais de Monsieur Amadou Ibra NIANG, Agro forestier, Président de Afrik innovations.",
        "Cette mission a été également de procéder au suivi des plants et niveau d’avancement de pépinière de Fanaye mise en place au courant du mois de juillet.",
        "Etape 1 : Ndormboss, Médina Ndiathbé, Tarédji et Thillé Boubacar - La première étape de la mission a concerné les localités de Ndormboss, Médina Ndiathbé Tarédji et Thillé Boubacar. Au total 330 plants ont été répartis ainsi qui suit : 150 à Ndormboss, 100 à Médina Ndiathbé, 50 à Tarédji et 30 à Thillé Boubacar. Dans les deux premières localités, un fort engagement et des résultats déjà palpables ont été constatés.",
        
        "Etape 2 : Gamadji Sarré et Fanaye - La seconde étape a concerné la localité de Gamadji Sarré en procédant à la plantation de 32 plants tout espèce confondue. Dans cette localité, nous avons procédé à la plantation de deux cocotiers devant la Mairie pour matérialiser l’idée « une Mairie, deux cocotiers » en vue de pousser les autorités locales à intéresser davantage à la lutte contre la désertification. À Fanaye, nous avons procédé à la visite du pépinière mise en place au mois de juillet et distribué 100 méliféra.",
        
        "Contraintes : • La demande était fortement supérieure à l’offre ; • La préférence des plants fruitiers par les populations ; • Le coût de l’acquisition des plantes fruitiers par rapport à nos moyens."
    ],
    
    thankYous: [
        "@SANCOFA Ltd",
        "@Fedde Bambtaaré Leydi",
        "@Baaba Maal"
    ],
    donationContent: {
        mainTitle: "À quoi sert votre don ?",
        mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
        monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
        monthlySupportPoints: [
            "Vous assurez l'indépendance de nos initiatives.",
            "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
            "Vous contribuez à la diminution de nos frais de gestion.",
            "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
        ],
        donorAdvantagesTitle: "Les avantages pour vous",
        donorAdvantagesPoints: [
            "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
            "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
            "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
        ],
        transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
        transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
    }
},

    /*{
        id: 4,
        image: "/images/actu4.jpg",
        date: "22 juillet 2024",
        title: "Visite à la pépinière de Thioubalel",
        description: "Présentation des jeunes plants et rencontre avec les pépiniéristes locaux.",
        link: "/actualites/4",
    },*/
    {
        id: 5,
        image: "/images/blog/financement.jpg",
        date: "27 juillet 2023",
        title: "NANNK Trust | Financement",
        description: "L'association Podor Vert à eu à faire durant deux jours de riches rencontres en vue...",
        link: "/actualites/5",
        fullContent: [
            "L’association Podor Vert a organisé deux journées de riches rencontres pour la mise en place d’une pépinière départementale, financée entièrement par la Fondation NANKK Trust.",
            "Cette initiative marque le début d’un partenariat durable entre l’association Podor Vert et ses partenaires stratégiques."
        ],
        personalities: [
            "Bokar Niass — NANK Trust",
            "Baaba Maal — Parrain Podor Vert",
            "Bassirou Hamedine Sy — Président association Podor Vert",
            "Mamadou Sarr — Podor Vert",
            "Cheikh Oumar Ba — Directeur exécutif IPAR",
            "Ablaye Racine Hanne — Président ISAC Podor"
        ],
        galleryImages: [
            { id: 1, src: "/images/blog/photo-pepiniere.jpg", alt: "Inspection pépinière 1" },
            { id: 2, src: "/images/blog/photo-pepiniere2.jpg", alt: "Inspection pépinière 2" },
            { id: 3, src: "/images/blog/photo-pepiniere3.jpg", alt: "Inspection pépinière 3" },
            { id: 4, src: "/images/blog/photo-pepiniere4.jpg", alt: "Inspection pépinière 4" },
        ]
    },
    {
        id: 6,
        image: "/images/gallery/46.png",
        date: "21 juin 2024",
        title: "Formation en Fabrication de Biopesticides et Présentation",
        description: "Formation en fabrication de bio pesticides, présentation des espèces à planter dans la zone ...",
        link: "/actualites/6",
        fullContent: [
            "Formation en Fabrication de Biopesticides et Présentation des Espèces à Planter : Kadd, Vétiver, Baobab, Palmier à Huile et Neem.",
            
            "Distribution de semences bio pour le maraîchage au profit des groupements féminins de THioubalel."
        ],
        thankYous: [
            "@SANCOFA Ltd",
            "@Fedde Bambtaaré Leydi",
            "@Baaba Maal"
        ],
        donationContent: {
            mainTitle: "À quoi sert votre don ?",
            mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
            monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
            monthlySupportPoints: [
                "Vous assurez l'indépendance de nos initiatives.",
                "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
                "Vous contribuez à la diminution de nos frais de gestion.",
                "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
            ],
            donorAdvantagesTitle: "Les avantages pour vous",
            donorAdvantagesPoints: [
                "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
                "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
                "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
            ],
            transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
            transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
        }
    },
    {
    id: 7,
    image: "/images/blog/Fanaye-commune.png",
    date: "22 juin 2024",
    title: "Formation en fabrication de bio pesticides, présentation ...",
    description: "Formation en fabrication de bio pesticides, présentation des espèces à planter dans la zone...",
    link: "/actualites/7",
    fullContent: [
        "Commune de Fanaye - Formation en fabrication de bio pesticides, présentation des espèces à planter dans la zone notamment le Kadd, le Vétiver, le baobab, le palmier à huile et le Nime.",
        "Distribution de semences bio pour le maraîchage au profit des groupements féminins de la commune de Fanaye."
    ],
    thankYous: [
        "@SANCOFA Ltd",
        "@Fedde Bambtaaré Leydi",
        "@Baaba Maal"
    ],
    donationContent: {
        mainTitle: "À quoi sert votre don ?",
        mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
        monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
        monthlySupportPoints: [
            "Vous assurez l'indépendance de nos initiatives.",
            "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
            "Vous contribuez à la diminution de nos frais de gestion.",
            "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
        ],
        donorAdvantagesTitle: "Les avantages pour vous",
        donorAdvantagesPoints: [
            "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
            "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
            "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
        ],
        transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
        transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
    }
},

   {
    id: 8,
    image: "/images/gallery/85.png",
    date: "30 juin 2024",
    title: "Visite de la bio ferme de l’ONG les villageois de Ndem",
    description: "Visite de la Bio Ferme de l'ONG Les Villageois de Ndem à Mbacké Kadior lors du Forum Paysan...",
    link: "/actualites/8",
    fullContent: [
        "Forum Paysan 30 juin 2024 - Visite de la bio ferme de l’ONG les villageois de Ndem située à Mbacké Kadior à l’occasion du Forum paysan organisé par la dite ONG.",
        "Photo : Journée Forum Paysan lors de la Visite de la Bio Ferme de l'ONG Les Villageois de Ndem à Mbacké Kadior. [Insérer image ici]"
    ],
    thankYous: [
        "@SANCOFA Ltd",
        "@Fedde Bambtaaré Leydi",
        "@Baaba Maal"
    ],
    donationContent: {
        mainTitle: "À quoi sert votre don ?",
        mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
        monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
        monthlySupportPoints: [
            "Vous assurez l'indépendance de nos initiatives.",
            "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
            "Vous contribuez à la diminution de nos frais de gestion.",
            "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
        ],
        donorAdvantagesTitle: "Les avantages pour vous",
        donorAdvantagesPoints: [
            "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
            "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
            "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
        ],
        transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
        transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
    }
},

    {
    id: 9,
    image: "/images/gallery/baba_maal.jpg",
    date: "25 octobre 2025",
    title: "Baaba Maal : 40 ans de musique, d’engagement et de fierté africaine",
    description: "Artiste d’une envergure exceptionnelle, Baaba Maal et le groupe Danndé Léniol (la voix du peuple) célèbrent quatre décennies d'une ...",
    link: "/actualites/9",
    fullContent: [
        "Artiste d’une envergure exceptionnelle, Baaba Maal et le groupe Danndé Léniol (la voix du peuple) célèbrent quatre décennies d'une carrière musicale qui est bien plus qu'une mélodie : c'est un vibrant plaidoyer pour l'unité et la dignité africaine. ",
        "Sa voix singulière et ses compositions poignantes ont fait de lui un ambassadeur mondial de la paix, de la solidarité et du respect interculturel.",
        "Loin des projecteurs, il se consacre au développement, à la culture et à l'autonomisation de la jeunesse. Baaba Maal, figure emblématique du patrimoine peulh, utilise son art comme un pont entre les peuples, un étendard pour les causes justes, et une source d'inspiration inépuisable.",
        "Son œuvre est un phare pour l'Afrique et au-delà.",
        "Longue vie et santé à Monsieur Baaba Maal, une fierté pour toute l’Afrique.",
    ],
    thankYous: [
        "@Baaba Maal",
        "@NANNK Trust",
        "@Fedde Bambtaaré Leydi",
        "@podorvert"
    ],
    donationContent: {
        mainTitle: "À quoi sert votre don ?",
        mainDescription: "Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives, nous permettant ainsi d'être réactifs et indépendants.",
        monthlySupportTitle: "SOUTENEZ-NOUS CHAQUE MOIS",
        monthlySupportPoints: [
            "Vous assurez l'indépendance de nos initiatives.",
            "Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.",
            "Vous contribuez à la diminution de nos frais de gestion.",
            "Vous conservez le pouvoir d'arrêter votre don à tout moment. Il vous suffit de nous informer par courrier, e-mail ou appel."
        ],
        donorAdvantagesTitle: "Les avantages pour vous",
        donorAdvantagesPoints: [
            "Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.",
            "Vous avez la possibilité de modifier ou stopper votre prélèvement automatique à tout moment, par simple contact email ou téléphonique.",
            "Le soutien via prélèvement automatique : une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement."
        ],
        transparencyTitle: "COMMENT VOTRE FINANCEMENT EST-IL EMPLOYÉ ?",
        transparencyDescription: "Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements. Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée aux financements et à télécharger nos rapports d'activités."
    }
},


    
    /*{
        id: 10,
        image: "/images/actu10.jpg",
        date: "10 août 2024",
        title: "Podorvert en action pour la biodiversité",
        description: "Une initiative communautaire pour préserver la faune et la flore locales.",
        link: "/actualites/10",
    }, */
];
