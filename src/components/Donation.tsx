import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, TreePine, GraduationCap, Users, X, User as UserIcon, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type DonationOption = {
  id: number;
  amount: number;
  label: string;
  description: string;
  icon: React.ElementType;
};

const donationOptions: DonationOption[] = [
  {
    id: 1,
    amount: 3250,
    label: "Planter un arbre",
    description: "Financez la plantation et l'entretien d'un arbre pendant 3 ans",
    icon: TreePine,
  },
  {
    id: 2,
    amount: 32500,
    label: "Parrainer un élève",
    description: "Soutenez la scolarité d'un enfant pendant un mois",
    icon: GraduationCap,
  },
  {
    id: 3,
    amount: 130000,
    label: "Formation complète",
    description: "Financez une session de formation pour 10 personnes",
    icon: Users,
  },
];

const Donation: React.FC = () => {
  const [selectedDonation, setSelectedDonation] = useState<DonationOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange' | null>(null);

  const handleSelectDonation = (donation: DonationOption) => {
    setSelectedDonation(donation);
    setPaymentMethod(null);
  };
  
  const handleCloseModal = () => {
    setSelectedDonation(null);
    setPaymentMethod(null);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🚧 Le service de paiement via ${paymentMethod === 'wave' ? 'Wave' : 'Orange Money'} sera bientôt disponible.`);
    handleCloseModal();
  };

  return (
    <section id="donation" className="relative py-24 bg-gradient-to-b from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Effets décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
             SOUTENEZ NOS ACTIONS
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre contribution, quelle qu'elle soit, nous aide à poursuivre notre mission pour un environnement plus vert et une éducation accessible à tous.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Options de dons */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {donationOptions.map((donation, index) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-8 flex flex-col items-center text-center transition transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-5 shadow-inner">
                <donation.icon className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-3xl font-extrabold text-green-600">
                {donation.amount.toLocaleString("fr-FR")} FCFA
              </div>
              <h3 className="text-xl font-semibold mt-3 text-gray-800">{donation.label}</h3>
              <p className="text-gray-600 mt-2 flex-grow">{donation.description}</p>
              <button
                onClick={() => handleSelectDonation(donation)}
                className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Choisir ce don
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Fermer la modale"
              >
                <X className="w-7 h-7" />
              </button>
              
              <AnimatePresence mode="wait">
                {!paymentMethod ? (
                  <motion.div
                    key="payment-selection"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-5 text-center">
                      Choisissez votre moyen de paiement
                    </h3>
                    <p className="text-gray-600 mb-6 text-center">
                      Vous avez choisi : <span className="font-semibold text-green-700">{selectedDonation.label}</span> ({selectedDonation.amount.toLocaleString("fr-FR")} FCFA)
                    </p>
                    <div className="flex justify-center items-center gap-8">
                      <button onClick={() => setPaymentMethod("wave")} className="transition transform hover:scale-110">
                        <img src="/images/logos/wave-logo.png" alt="Payer avec Wave" className="h-16" />
                      </button>
                      <button onClick={() => setPaymentMethod("orange")} className="transition transform hover:scale-110">
                        <img src="/images/logos/orange-money-logo.png" alt="Payer avec Orange Money" className="h-16" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Paiement via {paymentMethod === "wave" ? "Wave" : "Orange Money"}
                    </h3>
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div>
                        <label className="block text-gray-700 font-medium text-sm mb-1">Nom complet</label>
                        <div className="relative">
                           <UserIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-3.5 -translate-y-1/2" />
                           <input type="text" className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Votre nom" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium text-sm mb-1">Montant (FCFA)</label>
                        <div className="relative">
                           <span className="text-gray-500 absolute top-1/2 left-3.5 -translate-y-1/2 font-semibold text-sm">CFA</span>
                           <input type="number" defaultValue={selectedDonation.amount} className="w-full border rounded-lg pl-12 pr-3 py-2 focus:ring-2 focus:ring-green-500" required />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={cn(
                          "w-full flex items-center justify-center text-white py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105",
                          paymentMethod === 'wave'
                            ? 'bg-[#1E90FF] hover:bg-[#187bcd]'
                            : 'bg-[#FF6600] hover:bg-[#e65c00]'
                        )}
                      >
                        Envoyer le paiement
                        <Send className="w-5 h-5 ml-2" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Donation;
