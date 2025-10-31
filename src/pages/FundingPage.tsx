import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Handshake, Sprout, Truck, Wrench, ShoppingCart, Droplets, Building } from 'lucide-react';
import PageHero from '../components/PageHero';

const FundingPage: React.FC = () => {
  const financialPartners = [
    {
      logo: '/images/logos/logo-fedde-bamtaare-leydi.jpg',
      name: 'Féddé Bamtaare Leydi',
      description: 'Appui financier récurrent essentiel à la continuité de nos opérations sur le terrain.'
    },
    {
      logo: '/images/logos/logo-nannk.png',
      name: 'Fondation NANKK Trust',
      description: 'Financement intégral de la pépinière départementale, un pilier de notre stratégie de reboisement.'
    }
  ];

  const concreteSupport = [
    { icon: Sprout, value: '10 000', label: 'gaines' },
    { icon: ShoppingCart, value: '6', label: 'brouettes' },
    { icon: Droplets, value: '6', label: 'arrosoirs' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Sources de Financement" 
        breadcrumb="Source de financement" 
        imageUrl="/images/background-banner.jpg" 
      />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed"
          >
            Depuis sa création, Podor Vert bénéficie du soutien de partenaires institutionnels, techniques et financiers, qui rendent possibles ses actions de reboisement et de sensibilisation.
          </motion.p>
        </div>
      </section>

      {/* Financial Support */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
               Nos Appuis Financiers
            </h2>
            <p className="text-lg text-gray-600 mt-2">Des partenaires engagés pour un impact durable.</p>
          </motion.div>

          {/* Cartes partenaires centrées */}
          <div className="flex flex-wrap justify-center gap-8">
            {financialPartners.map((partner, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center max-w-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <img src={partner.logo} alt={`Logo ${partner.name}`} className="mx-auto h-20 mb-6 rounded"/>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical & Logistical Support */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
              Appuis Techniques & Logistiques
           </h2>
            <p className="text-gray-600 mb-6">
              Nous bénéficions de l'appui constant du Ministère de l’Environnement et du Développement durable, notamment pour l’acheminement des plants à travers le pays, un soutien crucial pour nos campagnes de reboisement.
            </p>
            <div className="flex space-x-6">
              <div className="flex flex-col items-center text-center text-green-700">
                <Truck className="w-12 h-12"/>
                <span className="mt-2 font-semibold">Transport</span>
              </div>
              <div className="flex flex-col items-center text-center text-green-700">
                <Sprout className="w-12 h-12"/>
                <span className="mt-2 font-semibold">Plants</span>
              </div>
              <div className="flex flex-col items-center text-center text-green-700">
                <Wrench className="w-12 h-12"/>
                <span className="mt-2 font-semibold">Expertise</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500"
          >
            <div className="flex items-center text-2xl font-bold text-gray-900 mb-4">
              <Building className="w-8 h-8 text-green-600 mr-3"/>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                Partenaire Institutionnel Clé
             </h2>
            </div>
            <p className="text-gray-700">
              Le Ministère de l'Environnement est un allié stratégique qui nous fournit une expertise technique et un soutien logistique indispensable à la réussite de nos missions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Concrete Example 2021 */}
      <section className="py-16 md:py-24 bg-yellow-50/70">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                   Exemple Concret : Soutien 2021
                </h2>

                <p className="text-lg text-gray-600 mt-2">Un appui matériel décisif pour nos premières pépinières.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {concreteSupport.map((item, i) => (
                    <motion.div
                        key={i}
                        className="bg-white p-6 rounded-xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                    >
                        <item.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4"/>
                        <div className="text-4xl font-bold text-green-800">{item.value}</div>
                        <div className="text-lg font-medium text-gray-700">{item.label}</div>
                    </motion.div>
                ))}
            </div>
            <motion.p 
              className="mt-8 text-gray-600 italic max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Offerts par l’Agence de la Grande Muraille Verte et de la Reforestation, pour les pépinières de Thioubalel, Bodé Lao et Fanaye.
            </motion.p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
            <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Chaque appui reçu est une graine d’espoir pour l’avenir.
            </motion.h2>
            <motion.p 
                className="text-green-200 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                Ensemble, faisons grandir Podor Vert !
            </motion.p>
            <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Link to="/devenir-partenaire" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg">
                    Devenir partenaire
                    <Handshake className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/devenir-donateur" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors duration-300">
                    Soutenir nos actions
                </Link>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FundingPage;
