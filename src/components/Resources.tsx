import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Download, ExternalLink } from 'lucide-react';

const Resources: React.FC = () => {
  const documents = [
    {
      title: 'Rapport d\'activités 2023',
      type: 'PDF',
      size: '2.3 MB',
      description: 'Bilan complet de nos actions et réalisations de l\'année écoulée'
    },
    {
      title: 'Guide de plantation',
      type: 'PDF',
      size: '1.8 MB',
      description: 'Manuel pratique pour la plantation et l\'entretien des arbres'
    },
    {
      title: 'Statuts de l\'association',
      type: 'PDF',
      size: '0.9 MB',
      description: 'Documents officiels et règlement intérieur'
    }
  ];

  const galleries = [
    {
      title: 'Campagne de reboisement 2024',
      images: 8,
      thumbnail: 'https://images.unsplash.com/photo-1574263867128-b9dbf5ad4b95?q=80&w=400'
    },
    {
      title: 'Formation en agroécologie',
      images: 12,
      thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400'
    },
    {
      title: 'Remise de bourses scolaires',
      images: 6,
      thumbnail: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=400'
    },
    {
      title: 'Pépinières communautaires',
      images: 15,
      thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400'
    }
  ];

  return (
    <section id="ressources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ressources & Documentation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consultez nos rapports, guides pratiques et galeries photos pour mieux comprendre nos actions
          </p>
        </motion.div>

        {/* Documents */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Documents à télécharger</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {doc.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {doc.type} • {doc.size}
                      </span>
                      <button className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-200">
                        <Download className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Télécharger</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Galeries photos */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Galeries photos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleries.map((gallery, index) => (
              <motion.div
                key={gallery.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={gallery.thumbnail}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                    {gallery.images} photos
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Image className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {gallery.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Voir la galerie
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
