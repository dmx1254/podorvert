import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Handshake } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const Partners: React.FC = () => {
  const partners = [
    {
      name: 'NANKK Trust',
      logo: '/images/logos/logo-nannk.png',
      description: 'Partenaire financier principal',
      url: '#'
    },
    {
      name: 'CDP',
      logo: '/images/logos/client-1.png',
      description: 'Partenaire',
      url: '#'
    },
    {
      name: 'EFC',
      logo: '/images/logos/client-3.png',
      description: 'Partenaire',
      url: '#'
    },
    {
      name: 'DEEC',
      logo: '/images/logos/client-6.png',
      description: 'Partenaire',
      url: '#'
    },
    {
      name: 'SANKOFA',
      logo: '/images/logos/client-9.webp',
      description: 'Partenaire',
      url: '#'
    },
    {
      name: 'Axiomtext.com',
      logo: '/images/logos/axiomtext.png',
      description: 'Partenaire technique',
      url: 'https://www.axiomtext.com/en'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Effets décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
            NOS PARTENAIRES & RÉSEAUX
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ensemble, nous construisons un réseau solide pour maximiser notre impact environnemental et social.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Swiper amélioré */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="!py-6"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index} className="h-full">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-110 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-100 h-full border border-gray-100">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="h-20 mb-5 object-contain transition-transform duration-300 hover:scale-110"
                  />
                  <h3 className="font-bold text-gray-800 text-lg">{partner.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{partner.description}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call-to-action amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-600 to-emerald-600 p-12 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <h3 className="text-3xl font-extrabold text-white mb-4 drop-shadow">
            REJOIGNEZ NOTRE RÉSEAU DE PARTENAIRES
          </h3>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Que vous soyez une entreprise, une institution ou une organisation, nous recherchons des partenaires partageant notre vision d'un développement durable.
          </p>
          <Link
            to="/devenir-partenaire"
            className="inline-flex items-center px-8 py-4 text-lg text-white font-semibold bg-gradient-to-r from-emerald-500 to-green-700 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transform transition duration-300"
          >
            <Handshake className="w-6 h-6 mr-3" />
            Devenir partenaire
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
