import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Users, Map, FileText, HandHelping } from 'lucide-react';
import PageHero from '../components/PageHero';

const AboutPage: React.FC = () => {
  const missions = [
    {
      icon: Sprout,
      title: 'Reboisement',
      description: 'Planter des arbres pour restaurer les écosystèmes et lutter contre la désertification.'
    },
    {
      icon: Users,
      title: 'Sensibilisation',
      description: 'Éduquer les communautés locales, en particulier les jeunes, aux enjeux environnementaux.'
    },
    {
      icon: HandHelping,
      title: 'Lutte contre les inégalités',
      description: 'Promouvoir l\'accès des femmes au foncier et leur autonomisation économique.'
    }
  ];

  const localities = ['Podor', 'Golléré', 'Ndioum', 'Guédé', 'Dodel', 'Mboumba'];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Qui sommes-nous ?" 
        breadcrumb="Qui sommes-nous ?" 
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
            Podor Vert est une association de jeunes volontaires engagés pour la protection de l’environnement et le reboisement dans le département de Podor. Notre initiative est née d'un désir commun de créer un impact positif et durable face aux défis écologiques du Sahel.
          </motion.p>
        </div>
      </section>

      {/* History & Context */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
           <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
            Historique & Contexte
           </h2>

            <p className="text-gray-600 mb-4">
              Lancée en 2020, notre première campagne de reboisement a marqué le début de notre engagement. Face à l'enthousiasme local, une seconde campagne a été menée en 2021, étendant notre impact à de nouvelles localités.
            </p>
            <p className="text-gray-600 font-semibold mb-4">Localités impactées :</p>
            <div className="flex flex-wrap gap-3">
              {localities.map((loc, i) => (
                <div key={i} className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
                  <Sprout className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">{loc}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-80 rounded-lg overflow-hidden shadow-xl"
          >
            <img src="/images/carte-senegal.png" alt="Carte du Sénégal" className="w-full h-full object-cover"/>
          </motion.div>
        </div>
      </section>

      {/* Our Members */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-yellow-50/50 border-l-4 border-yellow-400 p-8 rounded-lg text-center"
            >
                <Users className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <div className="text-6xl font-bold text-green-800">124</div>
                <div className="text-2xl font-semibold text-gray-800 mt-2">Ambassadeurs</div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                  Nos Membres
                </h2>
                <p className="text-gray-600">
                Notre force réside dans la diversité de nos membres : enseignants, experts en environnement, jeunes leaders, femmes engagées... Chacun apporte sa pierre à l'édifice, créant une dynamique communautaire riche et inclusive.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Our Missions */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
               Nos Missions
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {missions.map((mission, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <mission.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{mission.title}</h3>
                <p className="text-gray-600">{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives & Field Missions */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
            {/* Objectives */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                   Nos Objectifs
                </h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">▶</span>Contribuer à la reforestation et à la préservation de la biodiversité.</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">▶</span>Assurer un suivi rigoureux des plants pour garantir leur survie.</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">▶</span>Adopter une approche communautaire pour une appropriation locale des projets.</li>
                </ul>
            </motion.div>
            {/* Field Missions */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="flex items-center text-3xl font-bold text-gray-900 mb-6">
                    <Map className="w-10 h-10 text-green-600 mr-4"/>
                   <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                      Missions de Terrain
                    </h2>
                </div>
                <p className="text-gray-700 mb-6">
                    Nos actions sont guidées par des données précises. Nous réalisons des cartographies des zones d'intervention et publions des rapports de suivi détaillés pour garantir la transparence et l'efficacité de notre stratégie.
                </p>
                <a href="/images/pdf/RAPPORT_ACTIVITE_PODOR_VERT.pdf" className="inline-flex items-center px-6 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 shadow-sm">
                    <FileText className="w-5 h-5 mr-2" />
                    Consulter nos rapports
                </a>
            </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
            <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Ensemble pour un Sénégal plus vert 🌍
            </motion.h2>
            <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <a href="/devenir-donateur" className="px-8 py-4 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg">
                    Faire un don
                </a>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
