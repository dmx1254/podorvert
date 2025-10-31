import React from 'react';
import { TreePine, Globe, Leaf, Handshake } from 'lucide-react';
import BackgroundImagePageLayout from '../components/BackgroundImagePageLayout';

const ContextPage: React.FC = () => {
  return (
    <BackgroundImagePageLayout imageUrl="/images/background-banner.jpg">
      {/* Titre principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
         Contexte et justification
      </h1>


      {/* 1. Situation générale */}
      <div className="flex items-start mb-10">
        <Globe className="text-green-300 text-3xl mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Situation générale</h2>
          <p className="text-gray-100 leading-relaxed">
            Le Sénégal, comme d’autres pays de la sous-région, fait face à de nombreux problèmes environnementaux malgré les efforts déployés pour protéger les écosystèmes forestiers.
          </p>
        </div>
      </div>

      {/* 2. Enjeu majeur */}
      <div className="flex items-start mb-10">
        <Leaf className="text-green-300 text-3xl mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Enjeu majeur du 21ème siècle</h2>
          <p className="text-gray-100 leading-relaxed">
            La dégradation globale et locale, causée par les activités humaines polluantes, a rendu <span className="font-semibold text-green-300">la préservation de l’environnement un enjeu crucial</span> et l’un des trois piliers du développement durable.
          </p>
        </div>
      </div>

      {/* 3. Engagement de l'État */}
      <div className="flex items-start mb-10">
        <Handshake className="text-green-300 text-3xl mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Engagement de l’État</h2>
          <p className="text-gray-100 leading-relaxed">
            L’État du Sénégal, signataire de la plupart des accords internationaux sur l’environnement et la biodiversité, veille à articuler tous les programmes et projets de développement avec la protection de la nature.
            <br />
            <span className="italic font-semibold text-green-300">Cette volonté est inscrite dans l’article L4 du code de l’environnement (loi 2001-01 du 15 janvier 2001).</span>
          </p>
        </div>
      </div>

      {/* 4. Importance des forêts */}
      <div className="flex items-start mb-10">
        <TreePine className="text-green-300 text-3xl mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Importance des forêts</h2>
          <ul className="list-disc list-inside text-gray-100 leading-relaxed">
            <li>Régulent le climat et les ressources en eau</li>
            <li>Fournissent un habitat pour la flore et la faune</li>
            <li>Contribuent à la qualité de vie et à la biodiversité</li>
          </ul>
        </div>
      </div>

      {/* 5. Pression actuelle */}
      <div className="flex items-start mb-10">
        <Globe className="text-green-300 text-3xl mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Pression actuelle sur les écosystèmes</h2>
          <ul className="list-disc list-inside text-gray-100 leading-relaxed">
            <li>Pâturage intensif</li>
            <li>Défrichement</li>
            <li>Exploitation pour le bois de chauffage ou l’agriculture</li>
          </ul>
        </div>
      </div>

      {/* 6. Action de PODOR VERT */}
      <div className="flex items-start mb-12">
        <Leaf className="text-green-300 text-3xl mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Action de PODOR VERT</h2>
          <p className="text-gray-100 leading-relaxed">
            Dans ce contexte, <span className="font-semibold text-green-300">PODOR VERT privilégie le reboisement</span> comme stratégie pour :
          </p>
          <ul className="list-disc list-inside text-gray-100 leading-relaxed ml-4 mt-2">
            <li>Lutter contre la désertification</li>
            <li>Réduire la pauvreté</li>
            <li>Préserver l’environnement pour les générations futures</li>
          </ul>
        </div>
      </div>
    </BackgroundImagePageLayout>
  );
};

export default ContextPage;
