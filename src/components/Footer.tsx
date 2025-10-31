import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Youtube, Instagram, Linkedin, FileText, Download, Mail } from 'lucide-react';
import DonationModal from './DonationModal';
import MemberCardModal from './MemberCardModal';
import PlantRequestModal from './PlantRequestModal';

const Footer: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'wave' | 'orange' | null>(null);

  const handleOpenDonationModal = (method: 'wave' | 'orange') => {
    setSelectedMethod(method);
    setIsDonationModalOpen(true);
  };

  const resourcesLinks = [
    { to: '/mot-president', label: 'LE MOT DU PRÉSIDENT' },
    { to: '/qui-sommes-nous', label: 'QUI SOMMES-NOUS' },
    { to: '/notre-equipe', label: 'NOTRE ÉQUIPE' },
    { to: '/actualites', label: 'NOS ACTUALITÉS' },
    { to: '/grands-parrains', label: 'GRANDS PARRAINS' },
    { to: '/medias-sociaux', label: 'MÉDIAS SOCIAUX' },
    { to: '/galerie', label: 'NOTRE MÉDIATHÈQUE' },
    { to: '/contexte-et-justification', label: 'CONTEXTE & JUSTIFICATION' },
    { to: '/engagement', label: 'ENGAGEMENT & GAMIFICATION' },
    { to: '/espace-ecoles', label: 'ESPACE ÉCOLES & JEUNES' },
  ];

  const reportsLinks = [
    { href: '/images/pdf/PODOR-VERT-EN-CHIFFRE.pdf', label: 'PODOR VERT EN CHIFFRE' },
    { href: '/images/pdf/RAPPORT _Version 06012022.pdf', label: 'RAPPORT D’ACTIVITÉS 2021' },
    { href: '/images/pdf/RAPPORT-MISSION-AOUT-2022.pdf', label: 'RAPPORT DE MISSION 2022' },
    { href: '/images/pdf/RAPPORT-Aout.pdf', label: 'RAPPORT MISSION AOÛT 2022' },
    { href: '/images/pdf/RAPPORT_2023.pdf', label: 'RAPPORT D’ACTIVITÉS PODOR VERT 2023' },
    { href: '/images/pdf/RAPPORT_ACTIVITE_PODOR_VERT.pdf', label: 'RAPPORT ACTIVITÉS DU PROJET PODOR VERT' },
    { href: '/images/pdf/RAPPORT_2025_FBL.pdf', label: 'RAPPORT D’ACTIVITÉS PODOR VERT 2025' },
  ];

  const socialIcons = [
    { icon: Twitter, href: 'https://twitter.com/podorvert' },
    { icon: Facebook, href: 'https://web.facebook.com/profile.php?id=61577577172091' },
    { icon: Youtube, href: 'https://www.youtube.com/@podorvert' },
    { icon: Instagram, href: 'https://www.instagram.com/podorvert' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/podorvert' },
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Colonne 1 : Logo + Présentation */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"></div>
                <img
                  src="/images/logo-podorvert.png"
                  alt="Podor Vert"
                  className="h-24 w-24 rounded-full bg-white object-contain shadow-2xl p-2 ring-4 ring-white/30 relative z-10 hover:ring-yellow-400/50 transition-all duration-300"
                />
              </div>

              <p className="text-lg leading-relaxed max-w-xs text-green-50/90 font-light">
                🌱 Podor Vert agit pour la protection de l'environnement et le développement durable dans notre communauté.
              </p>

              <Link
                to="/devenir-donateur"
                className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400"
              >
                Faire un don à Podor Vert
              </Link>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleOpenDonationModal('wave')}
                  className="h-14 w-14 rounded-full bg-white p-2.5 shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-yellow-400"
                >
                  <img src="/images/logos/wave-logo.png" alt="Wave" className="object-contain" />
                </button>
                <button
                  onClick={() => handleOpenDonationModal('orange')}
                  className="h-14 w-14 rounded-full bg-white p-2.5 shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-yellow-400"
                >
                  <img src="/images/logos/orange-money-logo.png" alt="Orange Money" className="object-contain" />
                </button>
              </div>
            </div>

            {/* Colonne 2 : Ressources */}
            <div className="space-y-5">
              <h3 className="font-bold text-xl mb-6 uppercase tracking-wider text-yellow-300 relative">
                Ressources
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                {resourcesLinks.map(link => (
                  <li key={link.label} className="group">
                    <Link
                      to={link.to}
                      className="text-green-50/90 hover:text-yellow-300 transition-all duration-200 hover:translate-x-1 inline-block group-hover:font-medium"
                    >
                      <span className="inline-block mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 : Rapports */}
            <div className="space-y-5">
              <h3 className="font-bold text-xl mb-6 uppercase tracking-wider text-yellow-300 relative">
                Rapports
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                {reportsLinks.map(link => (
                  <li key={link.label} className="group">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-50/90 hover:text-yellow-300 transition-all duration-200 group-hover:translate-x-1"
                    >
                      <FileText size={14} className="mr-2 flex-shrink-0 text-yellow-300/70 group-hover:text-yellow-300" />
                      <span className="group-hover:font-medium">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/images/pdf/rapports-podor-vert.pdf"
                download
                className="inline-flex items-center mt-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Download size={16} className="mr-2" />
                Télécharger rapports ✅
              </a>
            </div>

            {/* Colonne 4 : Contact */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <h3 className="font-bold text-xl mb-6 uppercase tracking-wider text-yellow-300 relative">
                Contactez-nous
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></div>
              </h3>

              <div className="flex gap-4">
                {socialIcons.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-green-900 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-green-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Mail size={18} className="mr-2" />
                Contact
              </Link>

              <div className="w-full space-y-3">
                <MemberCardModal />
                <PlantRequestModal />
              </div>
            </div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="border-t border-white/10 bg-green-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center text-green-50/80 text-sm space-y-2">
              <p className="font-medium">© 2025 Podor Vert Association de jeunes volontaires – Tous droits réservés.</p>
              <Link
                to="/politique-de-confidentialite"
                className="inline-block text-yellow-300/80 hover:text-yellow-300 underline underline-offset-4 transition-colors duration-200 font-medium"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        method={selectedMethod}
      />
    </>
  );
};

export default Footer;
