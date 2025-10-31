import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { href: '/', label: 'Accueil' },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
    { href: '/nos-objectifs', label: 'Objectifs' },
    { href: '/notre-strategie', label: 'Stratégie' },
    { href: '/resultats-attendus', label: 'Résultats' },
    { href: '/source-de-financement', label: 'Financement' },
    { href: '/notre-equipe', label: 'Notre équipe' },
    
  ];

  const renderLink = (item: { href: string, label: string }, isMobile: boolean) => {
    const className = isMobile 
      ? "block text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium py-2"
      : "text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium";

    // Handle anchor links for specific homepage sections if needed
    if (item.href.startsWith('/#')) {
        if (location.pathname === '/') {
            return (
                <a href={item.href.substring(1)} onClick={() => isMobile && setIsMenuOpen(false)} className={className}>
                    {item.label}
                </a>
            );
        }
        return (
            <Link to={item.href} onClick={() => isMobile && setIsMenuOpen(false)} className={className}>
                {item.label}
            </Link>
        );
    }

    return (
      <Link to={item.href} onClick={() => isMobile && setIsMenuOpen(false)} className={className}>
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-6">
            <motion.img
              src="/images/logo-podorvert.png"
              alt="Podor Vert Logo"
              className="h-14 w-auto object-contain"
              style={{ imageRendering: 'crisp-edges' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {renderLink(item, false)}
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.a
            href="/#donation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            FAIRE UN DON
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderLink(item, true)}
                </motion.div>
              ))}
              <motion.a
                href="/#donation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium mt-4"
              >
                Faire un don
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
