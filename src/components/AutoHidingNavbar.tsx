import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LucideIcon, User, Briefcase, Phone, MapPin, Camera, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "../lib/supabase";

interface NavItem {
  name: string;
  to: string;
  icon: LucideIcon;
}

interface AutoHidingNavbarProps {
  items: NavItem[];
}

const AutoHidingNavbar: React.FC<AutoHidingNavbarProps> = ({ items }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMemberCardModalOpen, setIsMemberCardModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    function: "",
    phone: "",
    village: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY.current && currentY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    setTimeout(() => {
      if (window.scrollY < 50) {
        setIsHidden(false);
      }
    }, 500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navContainerVariants = {
    hidden: { y: '-70%', opacity: 0.25 },
    visible: { y: 0, opacity: 1 },
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors px-3 py-2 rounded-md",
      isActive && "text-green-700 bg-green-500/10"
    );

  const handleMemberCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMemberCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = null;

      if (photoFile) {
        try {
          const fileExt = photoFile.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('member-photos')
            .upload(filePath, photoFile);

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('member-photos')
              .getPublicUrl(filePath);
            photoUrl = publicUrl;
          }
        } catch (uploadError) {
          console.warn('Photo upload exception:', uploadError);
        }
      }

      const insertData = {
        full_name: formData.fullname,
        function: formData.function,
        phone: formData.phone,
        village: formData.village,
        photo_url: photoUrl
      };

      const { error, data } = await supabase.from('member_cards').insert([insertData]).select();

      if (error) {
        alert(`❌ Erreur: ${error.message}`);
        throw error;
      }

      if (!data || data.length === 0) {
        alert('❌ Erreur lors de l\'enregistrement.');
        throw new Error('Aucune donnée retournée');
      }

      const message = photoUrl
        ? "✅ Votre demande avec photo a bien été envoyée!"
        : "✅ Votre demande a bien été envoyée!";

      alert(message);
      setFormData({ fullname: "", function: "", phone: "", village: "" });
      setPhotoFile(null);
      setPhotoPreview(null);
      setIsMemberCardModalOpen(false);

      const fileInput = document.getElementById('header-photo-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      alert(`❌ Erreur: ${error?.message || 'Erreur inconnue'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hot zone to reveal nav on hover */}
      <div
        id="nav-hover-zone"
        className="fixed top-0 left-0 right-0 h-3 z-[1003]"
        onMouseEnter={() => setIsHidden(false)}
        aria-hidden="true"
      />

      {/* Navigation Bar */}
      <motion.header
        className="fixed top-2 left-0 right-0 flex justify-center z-[1002]"
        variants={navContainerVariants}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseLeave={() => {
          if (window.scrollY > 50) setIsHidden(true);
        }}
        onFocus={() => setIsHidden(false)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsHidden(true);
          }
        }}
      >
        <nav className="flex justify-between items-center w-[min(92vw,1280px)] px-6 py-3
        bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-200">
          {/* Brand/Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 mr-6">
            <img
              src="/images/favicon.png"
              alt="Podor Vert Logo"
              className="h-12 w-auto object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-2 list-none m-0 p-0 whitespace-nowrap">
            {items.map((item) => (
              <li key={item.name}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={() => setIsMemberCardModalOpen(true)}
                className="text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors px-3 py-2 rounded-md"
              >
                MA CARTE
              </button>
            </li>
          </ul>

          {/* CTA and Mobile Burger */}
          <div className="flex items-center gap-2">
            <Link
              to="/devenir-donateur"
              className="hidden lg:inline-block text-sm font-semibold bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
             DON
            </Link>
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1004] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <img
                  src="/images/logo-podorvert.png"
                  alt="Podor Vert Logo"
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={`mobile-${item.name}`}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-4 w-full p-3 rounded-lg text-gray-700 font-semibold",
                          isActive ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
                        )
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMemberCardModalOpen(true);
                    }}
                    className="flex items-center gap-4 w-full p-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100"
                  >
                    DEMANDE DE CARTE MEMBRE
                  </button>
                </li>
              </ul>
              <Link
                to="/devenir-donateur"
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 w-full flex items-center justify-center text-sm font-semibold bg-green-600 text-white px-4 py-3 rounded-full hover:bg-green-700 transition-colors"
              >
                FAIRE UN DON
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member Card Modal */}
      <Dialog open={isMemberCardModalOpen} onOpenChange={setIsMemberCardModalOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:max-w-lg max-h-[90vh] p-0 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border-0">
          <div className="bg-white flex flex-col max-h-[90vh]">
            <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-700">
                  Demande de Carte Membre
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Remplissez le formulaire
                </p>
              </div>
              <button
                onClick={() => setIsMemberCardModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
              <form onSubmit={handleMemberCardSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Prénom et Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Votre prénom et nom"
                      value={formData.fullname}
                      onChange={handleMemberCardChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Fonction
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-4 w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="function"
                      placeholder="Ex: Agriculteur, Étudiant..."
                      value={formData.function}
                      onChange={handleMemberCardChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Votre numéro de téléphone"
                      value={formData.phone}
                      onChange={handleMemberCardChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Village
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="village"
                      placeholder="Votre village"
                      value={formData.village}
                      onChange={handleMemberCardChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Photo
                  </label>
                  <div className="relative">
                    <input
                      id="header-photo-input"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="header-photo-input"
                      className="block w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-all overflow-hidden"
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-32 sm:h-40 p-2">
                          <img
                            src={photoPreview}
                            alt="Prévisualisation"
                            className="w-full h-full object-contain rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                            <span className="text-xs text-white bg-green-600/90 px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                              Cliquez pour changer
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                          <div className="w-12 h-12 mb-2 rounded-full bg-green-100 flex items-center justify-center">
                            <Upload className="h-6 w-6 text-green-600" />
                          </div>
                          <p className="mb-1 text-xs sm:text-sm font-medium text-gray-700">
                            Cliquez pour importer
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG ou WEBP
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                  {photoFile && (
                    <div className="mt-2 flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 min-w-0">
                        <Camera className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-green-800 truncate">
                          {photoFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoFile(null);
                          setPhotoPreview(null);
                          const fileInput = document.getElementById('header-photo-input') as HTMLInputElement;
                          if (fileInput) fileInput.value = '';
                        }}
                        className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium transition-colors ml-2 flex-shrink-0"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">Envoi...</span>
                    </span>
                  ) : (
                    'Envoyer ma demande'
                  )}
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoHidingNavbar;
