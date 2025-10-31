import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const cards = [
    {
      image: '/images/gallery/Notre-Mission.png',
      title: 'Notre Mission',
      description: 'Contribuer significativement à la reforestation et à la lutte contre les changements climatiques.',
    },
    {
      image: '/images/gallery/Notre-Vision.png',
      title: 'Notre Vision',
      description: 'Faire de Podor un département vert, en harmonie avec son environnement.',
    },
    {
      image: '/images/gallery/nos-valeur.png',
      title: 'Nos Valeurs',
      description: 'Innovation, adaptabilité et transparence guident toutes nos actions.',
    },
    {
      image: '/images/gallery/reboiser.png',
      title: 'Reboiser',
      description: 'Mobiliser les jeunes et étudiants pour reboiser les villages et assurer le suivi des plants.',
    },
    {
      image: '/images/sensibiliser-former.png',
      title: 'Sensibiliser et Former',
      description: 'Organiser des ateliers, formations et journées thématiques pour renforcer la conscience écologique.',
    },
    {
      image: '/images/gallery/parrainage.png',
      title: 'Parrainage',
      description: 'Chaque bénévole parraine un élève pour suivre et entretenir plusieurs plants attribués.',
    },
  ];

  return (
    <section id="qui-sommes-nous" className="relative py-24 md:py-36 overflow-hidden">
      {/* Modern gradient background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"></div>

      {/* Subtle animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-400/20 to-green-500/20 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Subtle decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-teal-400/20 blur-2xl rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-yellow-500 to-green-700 drop-shadow-lg mb-6">
            🌱 PODOR VERT
          </h2>

            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Une association de jeunes volontaires engagés pour la protection de l'environnement et le reboisement dans le département de Podor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Glassmorphism card */}
              <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/60 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-green-500/5 group-hover:via-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500"></div>

                {/* Glow effect on hover */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

                {/* Large centered image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className="relative text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-600 leading-relaxed text-base">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
