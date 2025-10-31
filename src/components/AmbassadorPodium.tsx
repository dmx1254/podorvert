import React from "react";
import { motion } from "framer-motion";

interface Ambassadeur {
  id: number;
  nom: string;
  image: string;
  arbres: number;
}

// Data is sorted for podium display: #2, #1, #3
const topDuMois: Ambassadeur[] = [
  { id: 2, nom: "Ibrahima Djigo", image: "/images/Ibrahima-Djigo.jpeg", arbres: 110 },
  { id: 1, nom: "Pathé Hanne", image: "/images/Pathe-Hanne.jpeg", arbres: 120 },
   { id: 3, nom: "AMADOU DIALLO", image: "/images/Amadou-Diallo.jpeg", arbres: 95 },
];

const AmbassadorPodium: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-700 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          🏅 Top Ambassadeurs du Mois
        </motion.h2>

        <div className="flex justify-center items-end gap-4 md:gap-8">
          {/* #2 Ambassadeur */}
          <motion.div 
            className="flex flex-col items-center bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-2xl font-bold text-gray-500">#2</span>
            <div className="relative mt-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-300 via-yellow-200 to-green-500 animate-pulse blur-xl opacity-30"></div>
              <img 
                src={topDuMois[0].image} 
                alt={topDuMois[0].nom} 
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-slate-300 shadow-xl transform hover:scale-110 hover:rotate-2 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 font-semibold text-lg text-gray-800">{topDuMois[0].nom}</h3>
            <p className="text-green-700 font-bold">{topDuMois[0].arbres.toLocaleString()} 🌱</p>
          </motion.div>

          {/* #1 Ambassadeur (podium central) */}
          <motion.div 
            className="flex flex-col items-center bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-3xl font-bold text-yellow-500">#1</span>
            <div className="relative mt-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-500 to-green-400 animate-pulse blur-xl opacity-40"></div>
              <img 
                src={topDuMois[1].image} 
                alt={topDuMois[1].nom} 
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-yellow-400 shadow-2xl transform hover:scale-110 hover:rotate-2 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 font-semibold text-xl text-gray-900">{topDuMois[1].nom}</h3>
            <p className="text-green-700 font-bold text-lg">{topDuMois[1].arbres.toLocaleString()} 🌱</p>
          </motion.div>

          {/* #3 Ambassadeur */}
          <motion.div 
            className="flex flex-col items-center bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-xl font-bold text-orange-500">#3</span>
            <div className="relative mt-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-300 via-yellow-200 to-green-400 animate-pulse blur-xl opacity-30"></div>
              <img 
                src={topDuMois[2].image} 
                alt={topDuMois[2].nom} 
                className="relative w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-orange-400 shadow-xl transform hover:scale-110 hover:rotate-2 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 font-semibold text-md text-gray-800">{topDuMois[2].nom}</h3>
            <p className="text-green-700 font-bold">{topDuMois[2].arbres.toLocaleString()} 🌱</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbassadorPodium;
