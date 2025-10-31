import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Trees, Wheat, Warehouse, ShieldCheck, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const ExpectedResultsPage: React.FC = () => {
  const results = [
    {
      icon: Globe,
      title: 'Une éco-citoyenneté construite',
      description: 'Les communautés locales adoptent des comportements durables et participent activement à la protection de leur environnement.'
    },
    {
      icon: Trees,
      title: 'Reboisement des sites effectué',
      description: 'Les espaces publics et privés ciblés sont reboisés, contribuant à la lutte contre la désertification et à l’amélioration du cadre de vie.'
    },
    {
      icon: Wheat,
      title: 'Promotion de l’agroécologie',
      description: 'Les pratiques agricoles durables sont adoptées, améliorant la gestion des ressources naturelles et la sécurité alimentaire.'
    },
    {
      icon: Warehouse,
      title: 'Pépinières communautaires mises en place',
      description: 'Des pépinières fonctionnelles fournissent des plants de qualité et renforcent l’autonomie des communautés locales.'
    },
    {
      icon: ShieldCheck,
      title: 'Parrainage réussi',
      description: 'Un système de suivi efficace garantit un taux de survie élevé des arbres plantés, assurant la pérennité de nos actions.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Résultats attendus" 
        breadcrumb="Résultats attendus" 
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
            L’association Podor Vert vise à obtenir des résultats concrets et durables à travers ses actions de sensibilisation, de reboisement et de promotion de l’agroécologie.
          </motion.p>
        </div>
      </section>

      {/* Expected Results Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {results.map((result, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-start space-x-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-yellow-400">R{i + 1}</div>
                  <div className="mt-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <result.icon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{result.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{result.description}</p>
                </div>
              </motion.div>
            ))}
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
                Ces résultats sont les premières étapes vers un Podor plus vert.
            </motion.h2>
            <motion.p 
                className="text-green-200 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                Avec vous, nous irons encore plus loin !
            </motion.p>
            <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Link to="/qui-sommes-nous" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg">
                    Soutenir nos actions
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/devenir-donateur" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors duration-300">
                    Faire un don
                </Link>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExpectedResultsPage;
