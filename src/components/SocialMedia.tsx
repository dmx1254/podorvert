import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Share2 } from 'lucide-react';

const SocialMedia: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <section id="medias-sociaux" className="py-20 bg-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Colonne de gauche : Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🌱 Restez connectés et soutenez-nous !
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Tout soutien ne se limite pas à planter un arbre !
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Vos <strong>partages, commentaires et interactions sur nos réseaux sociaux</strong> sont précieux. Chaque message laissé sur nos articles, chaque contact via <a href="mailto:contact@podorvert.org" className="text-green-600 font-semibold hover:underline">contact@podorvert.org</a>, et chaque geste pour faire connaître nos actions autour de vous compte énormément.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Grâce à votre engagement, nous pouvons tous contribuer à <strong>préserver nos arbres et notre environnement</strong>. Ensemble, continuons à agir pour rendre notre monde plus vert et meilleur !
            </p>
          </motion.div>

          {/* Colonne de droite : Icônes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={`Suivez-nous sur ${social.name}`}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-8 h-8" />
                </motion.a>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg"
            >
              <Share2 className="w-5 h-5 mr-3" />
              Partagez nos actions
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
