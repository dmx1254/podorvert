import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'wave' | 'orange' | null;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, method }) => {
  const [formData, setFormData] = useState({ name: '', amount: '' });

  useEffect(() => {
    // Reset form when modal opens for a new method
    if (isOpen) {
      setFormData({ name: '', amount: '' });
    }
  }, [isOpen, method]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🚧 Le service ${method === 'wave' ? 'Wave' : 'Orange Money'} sera bientôt disponible.`);
    onClose();
  };

  const config = {
    wave: {
      title: 'Faire un don via Wave',
      buttonClass: 'bg-wave-blue text-white hover:bg-blue-500',
      buttonText: 'Procéder avec Wave',
    },
    orange: {
      title: 'Faire un don via Orange Money',
      buttonClass: 'bg-orange-money-black text-white hover:bg-gray-800',
      buttonText: 'Procéder avec Orange Money',
    },
  };

  const currentConfig = method ? config[method] : null;

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
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">{currentConfig?.title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                aria-label="Fermer la modale"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-3.5 transform -translate-y-1/2"/>
                    <input
                        id="name"
                        type="text"
                        placeholder="Entrez votre nom"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Montant du don (FCFA)
                </label>
                <div className="relative">
                    <span className="text-gray-400 absolute top-1/2 left-3.5 transform -translate-y-1/2 font-semibold">CFA</span>
                    <input
                        id="amount"
                        type="number"
                        placeholder="Ex: 5000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                        className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className={cn(
                    'w-full flex items-center justify-center font-bold px-4 py-3 rounded-lg transition-colors duration-300',
                    currentConfig?.buttonClass
                  )}
                >
                  {currentConfig?.buttonText}
                  <Send className="w-5 h-5 ml-2"/>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
