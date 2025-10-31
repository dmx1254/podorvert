import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, BookOpen, Heart, Users, Sprout, Handshake } from 'lucide-react';

const Activities: React.FC = () => {
  const activities = [
    {
      icon: TreePine,
      title: 'Reboisement',
      description: 'Plantation d\'arbres indigènes, création de pépinières communautaires et restauration des écosystèmes dégradés.',
      points: ['Pépinières communautaires', 'Espèces indigènes', 'Suivi à long terme'],
      image: '/images/gallery/100.png'
    },
    {
      icon: BookOpen,
      title: 'Sensibilisation & Formation',
      description: 'Programmes éducatifs sur l\'environnement, formations aux métiers verts et ateliers de sensibilisation.',
      points: ['Ateliers pratiques', 'Formation métiers verts', 'Sensibilisation scolaire'],
      image: '/images/gallery/58.png'
    },
    {
      icon: Heart,
      title: 'Parrainage Scolaire',
      description: 'Soutien financier aux élèves défavorisés pour leur permettre de poursuivre leur scolarité.',
      points: ['Frais de scolarité', 'Fournitures scolaires', 'Suivi personnalisé'],
      image: '/images/gallery/13.png'
    }
  ];

  const strategies = [
    {
      icon: Users,
      title: 'Approche communautaire',
      description: 'Implication directe des communautés locales dans tous nos projets'
    },
    {
      icon: Sprout,
      title: 'Développement durable',
      description: 'Solutions respectueuses de l\'environnement et économiquement viables'
    },
    {
      icon: Handshake,
      title: 'Partenariats stratégiques',
      description: 'Collaboration avec institutions locales et internationales'
    }
  ];

  return (
    <section id="strategie" className="relative py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-5 bg-[url('/leaf-pattern.png')] bg-cover bg-center pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Activités principales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
             🌍 NOS ACTIVITÉS PRINCIPALES
        </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trois axes d'intervention pour un impact durable sur l'environnement et l'éducation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-24">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 relative group"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 w-14 h-14 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <activity.icon className="w-7 h-7 text-green-600" />
                </div>
              </div>
              
              <div className="p-4 sm:p-6 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  {activity.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full mr-3 flex-shrink-0"></div>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stratégies */}
        <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                 🚀 NOTRE STRATÉGIE D'ACTION
              </h2>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-12"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Une approche méthodique basée sur l'engagement communautaire et la durabilité
            </motion.p>

            <div className="flex flex-col md:flex-row gap-8">
                {strategies.map((strategy, index) => (
                    <motion.div
                        key={strategy.title}
                        className="bg-white/95 backdrop-blur-lg shadow-lg rounded-2xl p-8 text-center w-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-green-100"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex justify-center mb-5">
                          <div className="bg-gradient-to-tr from-green-100 to-emerald-200 p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-inner">
                              <strategy.icon className="text-green-600 w-7 h-7" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{strategy.title}</h3>
                        <p className="text-sm text-gray-600 mt-3">{strategy.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
