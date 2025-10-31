import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout, Megaphone, School, Warehouse, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const ObjectivesPage: React.FC = () => {
  const specificObjectives = [
    {
      icon: Megaphone,
      title: 'OS1: Construire une éco-citoyenneté',
      description: 'Sensibiliser et communiquer avec la population pour encourager des comportements respectueux de l\'environnement.'
    },
    {
      icon: Sprout,
      title: 'OS2: Organiser le reboisement',
      description: 'Mener des séances de reboisement au niveau des sites publics (écoles, postes de santé) et privés.'
    },
    {
      icon: School,
      title: 'OS3: Former les jeunes',
      description: 'Sensibiliser les élèves des écoles primaires et secondaires à l\'éducation environnementale à travers des clubs.'
    },
    {
      icon: Warehouse,
      title: 'OS4: Mettre en place des pépinières',
      description: 'Créer des pépinières communautaires pour faciliter l\'accès aux plants et soutenir les activités de reboisement.'
    },
    {
      icon: ShieldCheck,
      title: 'OS5: Parrainer les arbres plantés',
      description: 'Assurer un suivi rigoureux de chaque arbre planté pour garantir un taux de survie maximal.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Nos Objectifs" 
        breadcrumb="Objectifs" 
        imageUrl="/images/background-banner.jpg" 
      />

      {/* Main Objective */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-lg"
          >
            <div className="flex items-center mb-4">
              <Target className="w-10 h-10 text-green-600 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                 Objectif Général
              </h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Contribuer à la reforestation et à la revalorisation des ressources naturelles du département de Podor, en impliquant activement les communautés locales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specific Objectives */}
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
               Nos Objectifs Spécifiques
            </h2>
            <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Chaque action est guidée par une vision claire pour un impact mesurable et durable.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specificObjectives.map((obj, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <obj.icon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <span className="text-5xl font-bold text-gray-200 group-hover:text-yellow-300 transition-colors">0{i+1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{obj.title}</h3>
                <p className="text-gray-600">{obj.description}</p>
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
                Chaque objectif est une étape vers un Sénégal plus vert.
            </motion.h2>
            <motion.p 
                className="text-green-200 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                Ensemble, nous pouvons les atteindre.
            </motion.p>
            <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Link to="/devenir-donateur" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg">
                    Faire un don
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors duration-300">
                    Participer à une action
                </Link>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ObjectivesPage;
