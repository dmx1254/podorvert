import React from "react";
import BackgroundImagePageLayout from "../components/BackgroundImagePageLayout";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <BackgroundImagePageLayout>
      <div className="w-full text-center px-4 md:px-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
          🔒 Politique de confidentialité
        </h1>

        <div className="bg-white/80 backdrop-blur-md shadow-2xl p-8 md:p-12 rounded-2xl text-gray-800 text-left space-y-10 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              MENTIONS LÉGALES
            </h2>
            <p>Association Podor Vert</p>
            <p>Récépissé n°00068/GRD/AA/BAG</p>
            <p>118 Hlm Fass</p>
            <p>Dakar-Sénégal</p>
            <p>Tel : 77 403 13 05 - 77 385 06 13</p>
            <p>Email : contact@podorvert.org</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              COORDONNÉES DE L’HÉBERGEUR :
            </h2>
            <p>
              Le site internet de Podor Vert www.podorvert.org est hébergé chez
              MEGALOGIE, au Maroc 6, Rue Mly iDriss, Appt. N°11, Hassan, Rabat
              dont les serveurs sont basés en Allemagne.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Propriétaire du site :
            </h2>
            <p>
              Le site internet www.podorvert.org est édité de l'association
              Podor Vert dont le siège est situé à 118 Hlm Fass, Dakar-Sénégal
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Responsable publication :
            </h2>
            <p>Bassirou Hamadine SY, Président de l'association Podor Vert</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              DROITS D’AUTEUR, DROITS DE REPRODUCTION, DROITS DE MARQUE
            </h2>
            <p>
              L’ensemble de ce site relève de la législation sénégalaise sur le
              droit d’auteur et la propriété intellectuelle. Tous les droits de
              reproduction sont réservés pour tous les éléments du présent site
              internet (textes, photographie, illustrations, logos, fichiers
              disponibles en téléchargement, sur le site, clips vidéo ou
              sonores, charte graphique, structure générale du site, etc.).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              POLITIQUE DE CONFIDENTIALITÉ
            </h2>
            <p>
              Cette politique de protection des données à caractère personnel
              décrit la façon dont nous collectons, utilisons, traitons,
              protégeons et sécurisons vos données à caractère personnel.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              SÉCURITÉ DES DONNÉES PERSONNELLES
            </h2>
            <p>
              Podor Vert accorde la plus haute importance à la sécurité et à
              l’intégrité de vos données personnelles. Ainsi, et conformément au
              RGPD, Podor Vert s’engage à prendre toutes précautions utiles afin
              de préserver la sécurité des données et notamment de les protéger
              contre toute destruction accidentelle ou illicite, perte
              accidentelle, altération, diffusion ou accès non autorisés, ainsi
              que contre toute autre forme de traitement illicite ou
              communication à des personnes non autorisées.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              CONTACTEZ-NOUS
            </h2>
            <p>
              Si vous avez des questions, vous pouvez directement nous contacter
              par email à l’adresse contact@podorvert.org ou par courrier à :
              l’association Podor Vert, Keur Massar, Dakar-Sénégal.
            </p>
          </div>
        </div>
      </div>
    </BackgroundImagePageLayout>
  );
};

export default PrivacyPolicyPage;
