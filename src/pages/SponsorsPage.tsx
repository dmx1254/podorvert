import React from 'react';
import BackgroundImagePageLayout from '../components/BackgroundImagePageLayout';

const SponsorsPage: React.FC = () => {
  return (
    <BackgroundImagePageLayout imageUrl="/images/background-banner.jpg">
      <div className="text-center">
         <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
            🌟 Grands parrains
         </h1>

        <div className="max-w-3xl mx-auto text-gray-100 leading-relaxed space-y-6 text-lg">
          <p className="text-xl font-semibold text-green-300">
            Rien ne serait possible sans votre soutien
          </p>

          <p>
            Plus qu’une participation financière, <span className="font-semibold text-green-300">le don est un geste solidaire</span>, 
            un engagement social, environnemental et économique.
          </p>

          <p>
            Ces dons permettent la création et le soutien des parrains, la préservation de l’environnement et le développement durable.
          </p>

          <p>
            Merci de contribuer à cette mission d’intérêt général qui nous tient tous à cœur.
          </p>

          <blockquote className="italic text-green-200 border-l-4 border-green-400 pl-6 py-2 text-left">
            « Ensemble plantons pour l'avenir afin que notre forêt se renouvelle et continue à jouer son rôle multifonctionnel indispensable à la protection de l'environnement et à la vie sociale et économique de nos territoires. »
          </blockquote>
        </div>
      </div>
    </BackgroundImagePageLayout>
  );
};

export default SponsorsPage;
