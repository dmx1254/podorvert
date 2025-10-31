import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import BackgroundImagePageLayout from '../components/BackgroundImagePageLayout';

const SocialMediaPage: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', name: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', name: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
  ];

  return (
    <BackgroundImagePageLayout imageUrl="/images/background-banner.jpg">
      <div className="text-center">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
               Médias sociaux – Restez connectés !
          </h1>

          {/* Texte principal */}
          <div className="max-w-3xl mx-auto text-gray-100 leading-relaxed mb-10 text-lg space-y-4">
            <p>
              Tout soutien ne se limite pas à planter un arbre !
            </p>
            <p>
              Vos <span className="font-semibold text-green-300">partages, commentaires et interactions sur nos réseaux sociaux</span> sont précieux. Chaque message laissé sur nos articles, chaque contact via <a href="mailto:contact@podorvert.org" className="font-semibold text-green-300 hover:underline">contact@podorvert.org</a>, et chaque geste pour faire connaître nos actions autour de vous compte énormément.
            </p>
            <p>
              Grâce à votre engagement, nous pouvons tous contribuer à <span className="font-semibold text-green-300">préserver nos arbres et notre environnement</span>.
            </p>
            <p>
              Ensemble, continuons à agir pour rendre notre monde plus vert et meilleur !
            </p>
          </div>

          {/* Icônes réseaux sociaux */}
          <div className="flex justify-center space-x-6 mb-12 text-white text-3xl">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-green-300 transition-colors duration-300 transform hover:scale-110"
                aria-label={`Suivez-nous sur ${social.name}`}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
    </BackgroundImagePageLayout>
  );
};

export default SocialMediaPage;
