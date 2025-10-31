import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const impactData = [
  { 
    location: 'BELEL KELLÉ', 
    description: 'Une pépinière communautaire où plus de 2 000 plants sont préparés pour reverdir la zone.', 
    image: '/images/gallery/pepi1.jpeg' 
  },
  { 
    location: 'BELEL KELLÉ', 
    description: 'Des jeunes mobilisés pour planter et entretenir des arbres afin de lutter contre la désertification.', 
    image: '/images/gallery/pepi2.jpeg' 
  },
  { 
    location: 'BELEL KELLÉ', 
    description: 'Un projet qui redonne espoir aux communautés locales avec la culture de nouvelles essences d’arbres.', 
    image: '/images/gallery/pepi3.jpeg' 
  },
  { 
    location: 'BELEL KELLÉ', 
    description: 'Une dynamique locale forte pour un avenir plus vert et durable.', 
    image: '/images/gallery/pepi4.jpeg' 
  },
  { 
    location: 'BELEL KELLÉ', 
    description: 'Des actions concrètes menées par podor vert pour restaurer l\'environnement.', 
    image: '/images/gallery/pepi5.jpeg' 
  },
  { 
    location: 'BELEL KELLÉ', 
    description: 'Une mobilisation exemplaire pour reverdir la vallée et renforcer la biodiversité.', 
    image: '/images/gallery/pepi6.jpeg' 
  },
  { 
    location: 'MBIDDI', 
    description: 'Suivi reboisement à MBIDDI (dans le Diery)', 
    image: '/images/gallery/pepi7.jpeg' 
  },
  { 
    location: 'MBIDDI', 
    description: 'Suivi reboisement à MBIDDI (dans le Diery)', 
    image: '/images/gallery/pepi8.jpeg' 
  },
  { 
    location: 'MBIDDI', 
    description: 'Suivi reboisement à MBIDDI (dans le Diery)', 
    image: '/images/gallery/pepi9.jpeg' 
  },
  { 
    location: 'MBIDDI', 
    description: 'Suivi reboisement à MBIDDI (dans le Diery)', 
    image: '/images/gallery/pepi10.jpeg' 
  },
  { 
    location: 'MBIDDI', 
    description: 'Suivi reboisement à MBIDDI (dans le Diery)', 
    image: '/images/gallery/pepi11.jpeg' 
  },
  { 
    location: 'MBIDDI', 
    description: 'Suivi reboisement à MBIDDI (dans le Diery)', 
    image: '/images/gallery/pepi12.jpeg' 
  },
  { 
    location: 'SALNDÉ FANAYE', 
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY', 
    image: '/images/gallery/1reboisement-salnde-fanaye.jpg'
  },
  { 
    location: 'SALNDÉ FANAYE', 
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY', 
    image: '/images/gallery/2reboisement-salnde-fanaye.jpg' 
  },
  { 
    location: 'SALNDÉ FANAYE', 
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY', 
    image: '/images/gallery/3reboisement-salnde-fanaye.jpg' 
  },
  { 
    location: 'SALNDÉ FANAYE', 
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY', 
    image: '/images/gallery/4reboisement-salnde-fanaye.jpg' 
  },
  { 
    location: 'SALNDÉ FANAYE', 
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY', 
    image: '/images/gallery/5reboisement-salnde-fanaye.jpg' 
  },
  { 
    location: 'SALNDÉ FANAYE', 
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY', 
    image: '/images/gallery/6reboisement-salnde-fanaye.jpg' 
  },
];

const ImpactCarousel: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 via-white to-green-50 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-yellow-500 to-green-700 drop-shadow-lg mb-6">
            🌱 Nos Nouvelles Pépinières
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez les pépinières communautaires qui redonnent vie à nos territoires
          </p>
        </motion.div>

        <div className="impact-carousel">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!bg-green-600',
            }}
            navigation={true}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="!pb-16"
          >
            {impactData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[450px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-500">
                      {item.location}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                  {/* Glow hover border */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-green-400/70 transition duration-500"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ImpactCarousel;
