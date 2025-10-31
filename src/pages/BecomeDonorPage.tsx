import React, { useState } from "react";
import BackgroundImagePageLayout from "../components/BackgroundImagePageLayout";
import DonationModal from "../components/DonationModal";

// Typage explicite des méthodes de dons
type DonationMethod = "wave" | "orange";

const BecomeDonorPage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<DonationMethod | null>(null);

  const handleOpenDonationModal = (method: DonationMethod) => {
    setSelectedMethod(method);
    setIsDonationModalOpen(true);
  };

  // Composant boutons de dons
  const DonationButtons: React.FC = () => (
    <div className="flex flex-col sm:flex-row justify-center gap-4 my-8">
      <button
        onClick={() => handleOpenDonationModal("wave")}
        className="flex-1 flex items-center justify-center px-6 py-3 
                   bg-wave-blue text-white font-semibold rounded-xl shadow-md 
                   hover:scale-105 transition-transform"
      >
        <img src="/images/logos/wave-logo.png" alt="Wave" className="w-7 h-7 mr-2" />
        Je fais un don
      </button>
      <button
        onClick={() => handleOpenDonationModal("orange")}
        className="flex-1 flex items-center justify-center px-6 py-3 
                   bg-orange-money-black text-white font-semibold rounded-xl shadow-md 
                   hover:scale-105 transition-transform"
      >
        <img src="/images/logos/orange-money-logo.png" alt="Orange Money" className="w-7 h-7 mr-2" />
        Je fais un don
      </button>
    </div>
  );

  return (
    <>
      <BackgroundImagePageLayout>
        <div className="w-full max-w-5xl mx-auto text-center px-4 md:px-8 py-12">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-10 
                         bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 
                         bg-clip-text text-transparent drop-shadow-lg">
            🌱 Devenir donateur
          </h1>

          {/* Bloc principal */}
          <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl space-y-10 text-gray-800 text-justify">
            
            {/* Intro */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">
                Contribuez à la préservation des forêts au Sénégal et à travers le monde
              </h2>
              <p className="text-lg text-green-600 font-medium">
                UN DON DE 5.000F, VOUS PROTÉGEZ 10 HECTARES DE FORÊT.
              </p>
            </div>

            {/* Image */}
            <img
              src="/images/fair_don.jpg"
              alt="Journée d'inauguration de la Pépinière départementale"
              className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg"
            />

            {/* Boutons de dons */}
            <DonationButtons />

            <hr className="border-green-400" />

            {/* Pourquoi donner */}
            <section>
              <h3 className="text-xl font-bold text-green-700 mb-3">Pourquoi les dons comptent tant pour nous ?</h3>
              <p>
                Nous sommes une petite organisation réactive et efficace qui concentre 100% de ses moyens sur la
                protection des forêts et des communautés qui en dépendent.
              </p>
            </section>

            {/* À quoi sert le don */}
            <section>
              <h3 className="text-xl font-bold text-green-700 mb-3">À quoi sert votre don ?</h3>
              <p className="mb-4">
                Votre générosité a un impact significatif, car elle est entièrement dédiée à nos initiatives,
                nous permettant ainsi d'être réactifs et indépendants.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-green-600 mr-2">✅</span> 100% des dons sont dédiés à nos actions</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✅</span> Soutenez-nous chaque mois</li>
              </ul>
            </section>

            {/* Contribution régulière */}
            <section className="bg-green-100 p-6 rounded-lg shadow-inner">
              <h4 className="font-semibold text-green-800 mb-3">En contribuant de manière régulière :</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Vous assurez l'indépendance de nos initiatives.</li>
                <li>Vous nous permettez de planifier plus efficacement nos ressources, améliorant ainsi l'organisation de nos activités et renforçant leur impact.</li>
                <li>Vous contribuez à la diminution de nos frais de gestion.</li>
                <li>Vous conservez le pouvoir d'arrêter votre don à tout moment (par courrier, e-mail ou appel).</li>
              </ol>
            </section>

            <hr className="border-green-400" />

            {/* Avantages */}
            <section>
              <h3 className="text-xl font-bold text-green-700 mb-3">Les avantages pour vous</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Vous répartissez votre don sur toute l’année, en donnant une plus petite somme chaque mois.</li>
                <li>Vous pouvez modifier ou stopper votre prélèvement automatique à tout moment par simple contact email ou téléphonique.</li>
                <li>Le soutien via prélèvement automatique est une approche privilégiée pour intensifier votre engagement en faveur de la préservation de l'environnement.</li>
              </ul>
            </section>

            {/* Boutons de dons */}
            <DonationButtons />

            <hr className="border-green-400" />

            {/* Transparence */}
            <section>
              <h3 className="text-xl font-bold text-green-700 mb-3">Comment votre financement est-il employé ?</h3>
              <p>
                Nous sommes entièrement transparents quant à l'utilisation de vos dons et de nos financements.
                Pour obtenir davantage d'informations, nous vous encourageons à consulter notre page dédiée
                aux financements et à télécharger nos rapports d'activités.
              </p>
            </section>

          </div>
        </div>
      </BackgroundImagePageLayout>

      {/* Modal de don */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        method={selectedMethod}
      />
    </>
  );
};

export default BecomeDonorPage;
