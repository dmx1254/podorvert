import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  imageUrl: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, breadcrumb, imageUrl }) => {
  return (
    <section className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div className="absolute inset-0 bg-green-800/70"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <div className="absolute top-6 left-6 text-sm">
          <Link to="/" className="hover:underline">Accueil</Link>
          <span className="mx-2">/</span>
          <span>{breadcrumb}</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
};

export default PageHero;
