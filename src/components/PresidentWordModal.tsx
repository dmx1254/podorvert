import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PresidentWordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PresidentWordModal: React.FC<PresidentWordModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1005] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Le mot du Président</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                aria-label="Fermer la modale"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Card */}
                <div className="flex-shrink-0 text-center">
                  <img 
                    src="/images/logos/president-placeholder.png" 
                    alt="BASSIROU HAMADINE SY" 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-white"
                  />
                  <h3 className="text-lg font-bold text-gray-900">BASSIROU HAMADINE SY</h3>
                  <p className="text-sm text-green-700 font-medium">Membre Fondateur Podor Vert – Président</p>
                </div>

                {/* President's Message */}
                <div className="text-gray-600 leading-relaxed italic border-l-2 border-green-200 pl-8">
                  <p>"Chers visiteurs et soutiens de Podor Vert,</p>
                  <p className="mt-4">
                    Notre mission est de bâtir un avenir durable et prospère pour notre communauté. Chaque action, chaque initiative que nous menons vise à protéger notre environnement et à favoriser le bien-être de tous.
                  </p>
                  <p className="mt-4">
                    Votre soutien et votre engagement sont essentiels pour faire de notre vision une réalité. Ensemble, faisons la différence pour Podor et pour les générations à venir."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PresidentWordModal;
