import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Data Structures ---
interface NewsArticle {
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
}

interface Video {
  title: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  views: string;
}

// --- Mock Data ---
const newsData: NewsArticle[] = [ 
  {
    title: 'Baaba Maal : 40 ans de musique, d’engagement et de fierté...',
    description: 'Artiste d’une envergure exceptionnelle, Baaba Maal et le groupe Danndé Léniol (la voix du peuple) célèbrent quatre décennies d\'une ...',
    date: '25 octobre 2025',
    image: '/images/gallery/baba_maal.jpg',
    link: "/actualites/9",
  }, 
  
  {
    title: 'Visite de la bio ferme de l’ONG les villageois de Ndem',
    description: 'Visite de la Bio Ferme de l\'ONG Les Villageois de Ndem à Mbacké Kadior lors du Forum Paysan...',
    date: '30 juin 2024',
    image: "/images/gallery/85.png",
    link: "/actualites/8",
  },
  {
    title: 'Formation en fabrication de bio pesticides, présentation ...',
    description: 'Formation en fabrication de bio pesticides, présentation des espèces à planter dans la zone...',
    date: '22 juin 2024',
    image: '/images/blog/Fanaye-commune.png',
    link: "/actualites/7",
  },
];

const videosData: Video[] = [
  {
    title: 'Intervention du Président de l’association Podorvert , M. Bassirou Hamedine Sy à l’occasion de la journée de l’arbre organisée par son Honorable député Monsieur Ismaël Wone le 31 août 2025',
    thumbnail: '/images/blog/podorvertmbolo-biran.png',
    youtubeId: 'Ncm8vbyD2Fo',
    duration: '3:45',
    views: '1.5K',
  },
  {
    title: 'Le President Bassirou Hamedine Sy prend la parole lors de la Journée de Reboisement organisée par le Maire Oumar Baaba Ba ',
    thumbnail: '/images/blog/discours-prsident-podorvert.png',
    youtubeId: 'Ncm8vbyD2Fo',
    duration: '3:45',
    views: '1.7K',
  },
  {
    title: 'Découvrez les Réalisations de PODOR VERT : Un Reportage Inspirant',
    thumbnail: '/images/blog/Visite-bio-ong-mbacke.jpg',
    youtubeId: 'QZi4RCKuOdo',
    duration: '3:45',
    views: '2.5K',
  },
  {
    title: 'À la rencontre de Podor Vert 🌿 | Épisode 1 – Kora Digital Solutions)',
    thumbnail: '/images/gallery/54.png',
    youtubeId: 'pyvxriS5-gs',
    duration: '5:20',
    views: '5.8K',
  },
  {
    title: 'Podor vert était de la partie 🌱',
    thumbnail: '/images/gallery/amadousy.png',
    youtubeId: 'IRcJNHm96YA',
    duration: '5:20',
    views: '1.8K',
  },
  {
    title: 'Podor vert était de la partie 🌱',
    thumbnail: '/images/gallery/proteger.png',
    youtubeId: '6ohvPfNDyco',
    duration: '5:20',
    views: '1.2K',
  },
];

// --- Video Card Component ---
const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
      <div className="relative aspect-video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-t-2xl"
          ></iframe>
        ) : (
          <div
            className="relative h-full cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 group-hover:from-black/70 transition-all duration-500 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-green-600 ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
              {video.duration}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
          {video.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500">{video.views} vues</p>
      </div>
    </div>
  );
};

// --- Main Component ---
const News: React.FC = () => {
  return (
    <section id="resultats" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
           ACTUALITÉS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Suivez nos dernières actions et découvrez l'impact de nos interventions sur le terrain.
          </p>
        </motion.div>

        {/* Actualités */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 pl-4 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
              Dernières actualités
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {newsData.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span className="line-clamp-1">{article.date}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3 min-h-[3.75rem]">
                    {article.description}
                  </p>
                  <Link
                    to={article.link}
                    className="inline-block w-full sm:w-auto text-center font-semibold text-green-600 hover:text-white hover:bg-green-600 border border-green-600 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Vidéos */}
        <div>
          <h3 className="text-3xl font-bold mb-12 border-l-4 border-green-600 pl-4 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
          Nos Vidéos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {videosData.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>

          {/* Bouton Découvrir plus de vidéos */}
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@podorvert/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all duration-300"
            >
              🎬 Découvrir plus de vidéos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
