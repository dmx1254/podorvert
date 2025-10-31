import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Share2, Handshake, Image as ImageIcon, ArrowLeft, Heart } from 'lucide-react';
import { newsList } from '../data/newsData';
import DonationModal from '../components/DonationModal';

const ArticleDonationBlock: React.FC<{
  content: any;
  onDonate: (method: 'wave' | 'orange' | 'paypal') => void;
}> = ({ content, onDonate }) => {
  return (
    <div className="bg-green-50 rounded-2xl p-8 shadow-md my-10">
      <div className="text-center mb-6">
        <Heart className="text-green-700 mx-auto mb-2" size={32} />
        <h3 className="text-2xl font-semibold text-green-700">{content.mainTitle}</h3>
        <p className="text-gray-600 mt-2">{content.mainDescription}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => onDonate('wave')}
          className="bg-wave-blue text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition"
        >
          Wave – Je fais un don
        </button>
        <button
          onClick={() => onDonate('orange')}
          className="bg-orange-money-black text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition"
        >
          Orange Money – Je fais un don
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-inner">
        <h4 className="text-xl font-semibold text-green-700 mb-4">{content.monthlySupportTitle}</h4>
        <ul className="space-y-2 text-gray-700">
          {content.monthlySupportPoints.map((point: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="font-bold text-green-600 mr-2">#{i + 1}</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h4 className="text-xl font-semibold text-green-700 mb-4">{content.donorAdvantagesTitle}</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {content.donorAdvantagesPoints.map((point: string, i: number) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <h4 className="text-xl font-semibold text-green-700 mb-4">{content.transparencyTitle}</h4>
        <p className="text-gray-600 mb-4">{content.transparencyDescription}</p>
        <Link
          to="/source-de-financement"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-800 transition"
        >
          Voir nos financements →
        </Link>
      </div>
    </div>
  );
};

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = newsList.find(item => item.id === Number(id));
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'wave' | 'orange' | 'paypal' | null>(null);

  const handleOpenDonationModal = (method: 'wave' | 'orange' | 'paypal') => {
    if (method === 'paypal') {
      alert('Le paiement par PayPal sera bientôt disponible.');
      return;
    }
    setSelectedMethod(method);
    setIsDonationModalOpen(true);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
        <p className="text-gray-600 mb-8">Désolé, l'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link to="/actualites" className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
          <ArrowLeft className="mr-2" />
          Retour aux actualités
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white min-h-screen font-sans">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold max-w-4xl drop-shadow-lg tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {article.title}
            </motion.h1>
            <motion.div
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-200 text-sm backdrop-blur-sm px-4 py-2 rounded-full bg-white/10 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-2"><Calendar size={16} className="text-green-400" /><span>{article.date}</span></div>
              <div className="flex items-center gap-2"><User size={16} className="text-green-400" /><span>by Podor Vert</span></div>
              <button className="flex items-center gap-2 cursor-pointer hover:text-green-300 transition"><Share2 size={16} /><span>Partager</span></button>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Body */}
            <main className="lg:col-span-3 space-y-10">
              <motion.div
                className="prose max-w-none text-gray-700 leading-relaxed text-lg tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {article.fullContent?.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}

                {article.thankYous && (
                  <p className="text-sm text-gray-500 italic mt-8 border-l-4 border-green-400 pl-4">
                    Merci à : {article.thankYous.join(' — ')}
                  </p>
                )}
              </motion.div>

              {/* Donation Block */}
              {article.donationContent && (
                <ArticleDonationBlock content={article.donationContent} onDonate={handleOpenDonationModal} />
              )}

              {/* Personalities */}
              {article.personalities && (
                <motion.div
                  id="personnalites"
                  className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 shadow-md border border-green-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                    <Handshake size={28} className="mr-3 text-green-600" />
                    Personnalités présentes
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                    {article.personalities.map((person: string, index: number) => (
                      <li key={index} className="flex items-center gap-2"><span className="text-green-500">✔</span>{person}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Gallery */}
              {article.galleryImages && (
                <motion.div
                  id="galerie"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <ImageIcon size={28} className="mr-3 text-green-600" />
                    Galerie photos
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {article.galleryImages.map((photo: any) => (
                      <div key={photo.id} className="relative overflow-hidden rounded-xl shadow-lg group">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-medium">
                          {photo.alt}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </main>

            {/* Sidebar */}
            {/* Sidebar */}
<aside className="hidden lg:block">
  <div className="sticky top-28 bg-green-50/80 backdrop-blur-sm p-6 rounded-xl shadow-inner border border-green-200">
    <h3 className="font-bold text-xl mb-4 text-green-700">Sommaire</h3>
    <ul className="space-y-3 text-gray-700">

    </ul>

    {/* 👉 Bloc Actualités récentes */}
    <div className="mt-8">
      <h4 className="font-semibold text-lg text-green-700 mb-3">📌 Autres actualités</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {newsList.slice(0, 5).map((item) => (
          <li key={item.id}>
            <Link
              to={`/actualites/${item.id}`}
              className="hover:text-green-600 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <Link
      to="/actualites"
      className="inline-block mt-8 text-green-600 font-semibold hover:text-green-800 transition"
    >
      ← Toutes les actualités
    </Link>
  </div>
</aside>

          </div>
        </div>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        method={selectedMethod as 'wave' | 'orange' | null}
      />
    </>
  );
};

export default ArticlePage;
