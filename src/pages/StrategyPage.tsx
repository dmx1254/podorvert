import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Sprout, ClipboardCheck, Map, Wheat, ArrowRight, Eye } from 'lucide-react';
import PageHero from '../components/PageHero';

const StrategyPage: React.FC = () => {
  const strategies = [
    {
      icon: Users,
      title: 'Sensibilisation de la communauté',
      description: 'Mobilisation des jeunes et des femmes à travers des ateliers et des campagnes d\'information pour une prise de conscience collective.'
    },
    {
      icon: Sprout,
      title: 'Activités de reboisement',
      description: 'Organisation de plantations ciblées dans les concessions, écoles, lieux de culte et espaces publics pour un impact maximal.'
    },
    {
      icon: ClipboardCheck,
      title: 'Suivi permanent via parrainage',
      description: 'Mise en place d\'un système de parrainage pour assurer un suivi individuel et rigoureux de chaque plant et garantir sa survie.'
    },
    {
      icon: Map,
      title: 'Suivi périodique de terrain',
      description: 'Missions régulières pour évaluer la croissance, cartographier les zones reboisées et ajuster nos actions sur le long terme.'
    },
    {
      icon: Wheat,
      title: 'Promotion de l’agroécologie',
      description: 'Formation aux pratiques agricoles durables pour une meilleure gestion des ressources naturelles et une sécurité alimentaire accrue.'
    }
  ];

  const timelineSteps = [
    { title: 'Sensibilisation' },
    { title: 'Reboisement' },
    { title: 'Suivi' },
    { title: 'Agroécologie' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Notre Stratégie" 
        breadcrumb="Notre Stratégie" 
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
            Notre stratégie repose sur une approche communautaire, mobilisant la jeunesse, les associations locales et les groupements de femmes pour construire un avenir plus vert.
          </motion.p>
        </div>
      </section>

      {/* Strategies Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategies.map((strategy, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <strategy.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{strategy.title}</h3>
                <p className="text-gray-600">{strategy.description}</p>
              </motion.div>
            ))}
             <motion.div
                className="bg-green-600 text-white p-8 rounded-xl shadow-lg flex flex-col justify-center items-center text-center lg:col-span-1 md:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: strategies.length * 0.1 }}
              >
                 <Eye className="w-12 h-12 mb-4"/>
                <h3 className="text-2xl font-bold mb-3">Une vision intégrée</h3>
                <p>Chaque action renforce la suivante, créant un cycle vertueux pour un impact durable.</p>
              </motion.div>
          </div>
        </div>
      </section>
      
      {/* Timeline Infographic */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                   Notre approche progressive
                </h2>
                <p className="text-lg text-gray-600 mt-2">Une stratégie continue pour des résultats concrets.</p>
            </motion.div>
            <div className="relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
                
                <div className="relative flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                    {timelineSteps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center text-center w-full md:w-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                        >
                            <div className="w-20 h-20 bg-yellow-100 border-4 border-white rounded-full flex items-center justify-center shadow-lg z-10">
                                <span className="text-3xl font-bold text-yellow-600">{i + 1}</span>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">{step.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
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
                Notre stratégie est simple : mobiliser, planter, protéger.
            </motion.h2>
            <motion.p 
                className="text-green-200 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                Ensemble, faisons grandir la forêt de Podor.
            </motion.p>
            <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Link to="/qui-sommes-nous" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg">
                    Découvrir nos actions
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors duration-300">
                    Rejoindre nos ambassadeurs
                </Link>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StrategyPage;
