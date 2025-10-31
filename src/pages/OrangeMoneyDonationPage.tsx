import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Euro, Send, CheckCircle } from 'lucide-react';
import PageHero from '../components/PageHero';

const OrangeMoneyDonationPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', amount: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to Orange Money
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Orange Money donation submitted:', formData);
    }, 2000);
  };

  return (
    <div className="bg-white">
      <PageHero 
        title="Don via Orange Money" 
        breadcrumb="Don via Orange Money" 
        imageUrl="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop" 
      />

      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 p-8 rounded-xl shadow-lg"
          >
            <div className="text-center mb-8">
              <img src="/images/logos/orange-money-logo.png" alt="Orange Money Logo" className="w-16 h-16 mx-auto mb-4"/>
              <h2 className="text-3xl font-bold text-gray-900">Soutenir avec Orange Money</h2>
              <p className="text-gray-600 mt-2">Effectuez votre don en toute simplicité.</p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-r-lg flex items-center">
                <CheckCircle className="w-10 h-10 mr-4"/>
                <div>
                  <h3 className="font-bold text-lg">Merci pour votre soutien !</h3>
                  <p>Votre don a été initié. Veuillez valider la transaction sur votre téléphone.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2"/>
                  <input type="text" name="name" placeholder="Votre nom complet" required value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-money-orange"/>
                </div>
                <div className="relative">
                  <Euro className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2"/>
                  <input type="number" name="amount" placeholder="Montant (EUR)" required value={formData.amount} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-money-orange"/>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-orange-money-black text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Traitement en cours...' : 'Procéder avec Orange Money'}
                  <Send className="w-5 h-5 ml-2"/>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OrangeMoneyDonationPage;
