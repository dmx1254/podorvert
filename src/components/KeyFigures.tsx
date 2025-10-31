import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TreePine, GraduationCap, Users, Award } from 'lucide-react';

// Define the structure for each figure
interface Figure {
  icon: React.ElementType;
  end: number;
  suffix: string;
  label: string;
  color: string;
  progressColor: string;
}

const figures: Figure[] = [
  {
    icon: TreePine,
    end: 15000,
    suffix: '+',
    label: 'Arbres plantés',
    color: 'text-green-600',
    progressColor: 'bg-gradient-to-r from-green-400 to-emerald-600'
  },
  {
    icon: GraduationCap,
    end: 250,
    suffix: '+',
    label: 'Élèves parrainés',
    color: 'text-blue-600',
    progressColor: 'bg-gradient-to-r from-blue-400 to-indigo-600'
  },
  {
    icon: Users,
    end: 120,
    suffix: '+',
    label: 'Sessions de formation',
    color: 'text-emerald-600',
    progressColor: 'bg-gradient-to-r from-emerald-400 to-green-600'
  },
  {
    icon: Award,
    end: 8,
    suffix: '+',
    label: 'Partenaires actifs',
    color: 'text-yellow-600',
    progressColor: 'bg-gradient-to-r from-yellow-400 to-orange-500'
  }
];

const KeyFigures: React.FC = () => {
  return (
    <section id="objectifs" className="relative py-20 bg-gradient-to-b from-white to-green-50 overflow-hidden">
      {/* Effet décoratif d’arrière-plan */}
      <div className="absolute inset-0 opacity-10 bg-[url('/leaf-pattern.png')] bg-cover bg-center pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
         <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
            🌿 NOS RÉALISATIONS EN CHIFFRES 🌿

          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez l’impact concret de nos actions sur le terrain depuis notre création.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {figures.map((figure, index) => (
            <motion.div
              key={figure.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: '0 25px 40px -10px rgba(0,0,0,0.25)',
              }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-8 flex flex-col items-center text-center border border-green-100 relative overflow-hidden group"
            >
              {/* Glow animé au hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-100 via-transparent to-white opacity-0 group-hover:opacity-60 transition duration-500"></div>

              <motion.div 
                className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-green-50 to-white shadow-inner mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, transition: { type: 'spring', stiffness: 200, damping: 10, delay: index * 0.2 + 0.2 } }}
                viewport={{ once: true }}
              >
                <figure.icon className={`w-10 h-10 ${figure.color} drop-shadow-lg`} />
              </motion.div>
              
              <div className={`text-5xl font-extrabold ${figure.color} relative z-10`}>
                <CountUp end={figure.end} duration={2.5} separator=" " enableScrollSpy scrollSpyOnce />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 drop-shadow-md">
                  {figure.suffix}
                </span>
              </div>
              
              <p className="text-gray-700 mt-3 font-semibold relative z-10 tracking-wide">
                {figure.label}
              </p>

              {/* Progress bar avec dégradé animé */}
              <div className="w-full bg-gray-200 h-2.5 rounded-full mt-6 overflow-hidden relative z-10">
                <motion.div
                  className={`${figure.progressColor} h-2.5 rounded-full`}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeOut', delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;
