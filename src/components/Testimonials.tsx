import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Grâce à Podor Vert, notre village a pu bénéficier de plants et d’une vraie formation en reboisement. Aujourd’hui, les jeunes sont engagés et motivés.",
      name: "Aïssatou Ndiaye",
      designation: "Membre bénévole",
      src: "/images/photo-avatar-profil.png",
    },
    {
      quote:
        "L’association nous a permis de mieux comprendre l’importance de la protection de l’environnement. Je suis fier d’y contribuer activement.",
      name: "Mamadou Ba",
      designation: "Enseignant à Podor",
      src: "/images/photo-avatar-profil.png",
    },
    {
      quote:
        "Podor Vert m’a donné l’opportunité de participer à des actions concrètes pour ma communauté. Planter un arbre aujourd’hui, c’est protéger demain.",
      name: "Fatou Sow",
      designation: "Jeune volontaire",
      src: "/images/photo-avatar-profil.png",
    },
    {
      quote:
        "Avec Podor Vert, nous avons appris à fabriquer des bio-pesticides naturels. Cela a réduit nos dépenses et protégé nos cultures.",
      name: "Oumar Sy",
      designation: "Agriculteur local",
      src: "/images/photo-avatar-profil.png",
    },
    {
      quote:
        "C’est une grande fierté de voir notre commune reverdir grâce aux initiatives de Podor Vert. L’impact est déjà visible.",
      name: "Aminata Diallo",
      designation: "Conseillère municipale",
      src: "/images/photo-avatar-profil.png",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-green-50 via-white to-green-100">
      {/* Élément décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[60%] bg-green-200/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
           CE QU'ILS PENSENT DE PODOR VERT
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Témoignages inspirants de ceux qui participent activement à la transformation écologique.
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
