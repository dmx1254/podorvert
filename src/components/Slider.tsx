import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
  {
    id: 1,
    image: '/images/slidepodorvert4.jpeg',
    title: '🌿 Bienvenue sur le site officiel de Podor Vert',
    subtitle: 'Un avenir vert commence ici',
    description: 'Découvrez nos actions, nos projets et comment vous pouvez contribuer à un Sénégal durable',
    animated: true // 👉 effet mot par mot activé
  },
  {
    id: 2,
    image: '/images/slidepodorvert1.png',
    title: 'Reboisement Communautaire',
    subtitle: 'Ensemble, nous plantons l\'avenir du Sénégal',
    description: 'Plus de 15,000 arbres plantés avec la participation active des communautés locales',
    animated: true // 👉 maintenant animé
  },
  {
    id: 3,
    image: '/images/slidepodorvert2.jpg',
    title: 'Éducation Environnementale',
    subtitle: 'Former les leaders de demain',
    description: 'Sessions de formation et sensibilisation pour 250+ jeunes et agriculteurs',
    animated: true // 👉 maintenant animé
  },
  {
    id: 4,
    image: '/images/slidepodorvert3.png',
    title: 'Parrainage Scolaire',
    subtitle: 'L\'éducation, clé du développement durable',
    description: 'Soutien à la scolarité de centaines d\'enfants défavorisés',
    animated: true // 👉 maintenant animé
  }
];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // ✅ Typage correct pour éviter le soulignement rouge
  const wordAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <section className="relative h-[850px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
          />
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-green-600/40"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                {slides[currentSlide].animated ? (
                  // 👉 Texte avec effet mot par mot
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="mb-6"
                  >
                    {slides[currentSlide].title.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={wordAnimation}
                        initial="hidden"
                        animate="visible"
                        className="inline-block text-5xl md:text-6xl font-extrabold text-white mr-3 drop-shadow-lg"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                ) : (
                  // 👉 Texte normal
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                )}

                <p className="text-2xl md:text-3xl text-yellow-300 mb-6 font-semibold drop-shadow-md">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
                  {slides[currentSlide].description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/devenir-partenaire">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center px-8 py-4 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 shadow-lg"
                    >
                      Devenir Partenaire
                    </motion.div>
                  </Link>

                  <Link to="/devenir-donateur">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg"
                    >
                      Soutenir nos actions
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 z-20"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 z-20"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div
          key={currentSlide}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-full bg-white"
        />
      </div>
    </section>
  );
};

export default Slider;
