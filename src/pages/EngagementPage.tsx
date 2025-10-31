import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import PageHero from '../components/PageHero';
import { Sprout, Sparkles, Gem, Heart } from 'lucide-react';
import AmbassadorPodium from '../components/AmbassadorPodium';
import SponsorMessages from '../components/SponsorMessages';

const EngagementPage: React.FC = () => {
  const objectif = 10000;
  const realisation = 7532;
  const pourcentage = (realisation / objectif) * 100;

  const badges = [
    { icon: Sprout, title: 'Ambassadeur Vert', description: 'Participe aux campagnes', color: 'text-green-600' },
    { icon: Sparkles, title: 'Ambassadeur Or', description: '+100 arbres plantés', color: 'text-yellow-500' },
    { icon: Gem, title: 'Ambassadeur Platine', description: 'Leader d’équipe', color: 'text-purple-600' },
    { icon: Heart, title: 'Donateur Engagé', description: 'Soutien mensuel', color: 'text-red-500' },
  ];

  return (
    <div className="bg-white">
      <PageHero 
        title="Engagement & Gamification" 
        breadcrumb="Engagement" 
        imageUrl="/images/background-banner.jpg" 
      />

      {/* Annual Challenge Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            🎯 Challenge 2025 : Planter 10 000 arbres
          </motion.h2>
          <motion.div 
            className="bg-green-50 rounded-2xl shadow-lg p-8 mt-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-between items-center text-green-800 font-semibold mb-2">
              <span>
                <CountUp end={realisation} duration={3} separator=" " /> / {objectif.toLocaleString()} arbres
              </span>
              <span>{pourcentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-green-600 h-4 rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: `${pourcentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            🏅 Badges d'Ambassadeurs & Donateurs
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.title}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100`}>
                  <badge.icon className={`w-10 h-10 ${badge.color}`} />
                </div>
                <h3 className={`text-xl font-bold ${badge.color}`}>{badge.title}</h3>
                <p className="text-gray-600 mt-2">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <AmbassadorPodium />

      {/* Sponsor Messages Section */}
      <SponsorMessages />
      
    </div>
  );
};

export default EngagementPage;
