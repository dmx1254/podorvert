import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { newsList } from '../data/newsData';

type ContentBlock =
  | string
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

const isImageBlock = (block: ContentBlock): block is Extract<ContentBlock, { type: "image" }> => {
  return typeof block === "object" && block !== null && "type" in block && block.type === "image";
};

const ArticlePage: React.FC<{ article: { fullContent?: ContentBlock[] } }> = ({ article }) => {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {article.fullContent?.map((block: ContentBlock, index) => {
        if (typeof block === "string") {
          return (
            <p key={index} className="mb-4">
              {block}
            </p>
          );
        }

        if (isImageBlock(block)) {
          return (
            <figure key={index} className="my-8 text-center">
              <img
                src={block.src}
                alt={block.alt}
                className="mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              {block.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </article>
  );
};

const NewsPage: React.FC = () => {
  return (
    <section className="py-20 min-h-screen pt-32 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Header */}
      <motion.div 
        className="text-center mb-16 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
           Nos Actualités
        </h2>
        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
          Restez informé de toutes nos initiatives, campagnes et événements en
          temps réel, incluant les activités de Podor Vert.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {newsList.map((news, index) => (
          <motion.div
            key={news.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-200/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <div className="overflow-hidden h-60">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2 text-green-500" />
                <span>{news.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-2 min-h-[3.5rem] group-hover:text-green-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed flex-grow">
                {news.description}
              </p>
              <Link
                to={news.link}
                className="inline-flex items-center mt-4 text-green-600 font-semibold hover:text-green-700 transition-colors self-start group"
              >
                Lire plus
                <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
