import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { Award, BrainCircuit, Play } from 'lucide-react';
import Quiz from '../components/Quiz';
import { supabase } from '../lib/supabase';

interface PublishedSchool {
  id: string;
  school_name: string;
  plants_count: number;
  rank_position: number;
}

const SchoolsSpacePage: React.FC = () => {
  const [schoolForm, setSchoolForm] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    message: '',
    plantsCount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [publishedSchools, setPublishedSchools] = useState<PublishedSchool[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(true);

  useEffect(() => {
    fetchPublishedSchools();

    const channel = supabase
      .channel('top_schools_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'top_schools'
        },
        () => {
          fetchPublishedSchools();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPublishedSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('top_schools')
        .select('id, school_name, plants_count, rank_position')
        .eq('status', 'publié')
        .order('plants_count', { ascending: false });

      if (error) throw error;

      const sortedData = (data || []).sort((a, b) => {
        if (a.rank_position && b.rank_position) {
          return a.rank_position - b.rank_position;
        }
        if (a.rank_position && !b.rank_position) {
          return -1;
        }
        if (!a.rank_position && b.rank_position) {
          return 1;
        }
        return b.plants_count - a.plants_count;
      });

      setPublishedSchools(sortedData);
    } catch (error) {
      console.error('Error fetching published schools:', error);
    } finally {
      setLoadingSchools(false);
    }
  };

  const handleSchoolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const plantsCountValue = parseInt(schoolForm.plantsCount) || 0;

      const { error } = await supabase.from('top_schools').insert([
        {
          school_name: schoolForm.schoolName,
          contact_name: schoolForm.contactName,
          email: schoolForm.email,
          phone: schoolForm.phone,
          city: schoolForm.city,
          message: schoolForm.message,
          plants_count: plantsCountValue
        }
      ]);

      if (error) throw error;

      alert('Votre école a été inscrite avec succès! ✅');
      setSchoolForm({
        schoolName: '',
        contactName: '',
        email: '',
        phone: '',
        city: '',
        message: '',
        plantsCount: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting school registration:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const videos = [
    { id: '7CYRsv3leEA', title: 'Comment planter un arbre ? 🌱' },
    { id: 'SEVTh-GkQWo', title: 'Comment entretenir un jeune arbre ? 🌳' },
    { id: 'T3OCHN0dYOo', title: 'Comment fabriquer du compost naturel ? 🌱' }
  ];

  return (
    <div className="bg-yellow-50/50">
      <PageHero 
        title="Espace Écoles & Jeunes" 
        breadcrumb="Espace Écoles" 
        imageUrl="/images/background-banner.jpg" 
      />

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-yellow-800 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
               Vidéos Pédagogiques
             </h1> 
          </motion.h2>

          {/* Vidéos pédagogiques */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {videos.map((video, index) => (
              <motion.div 
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative aspect-video group">
                  <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-yellow-700 ml-1" />
                    </a>
                  </div>
                </div>
                <p className="p-4 font-semibold text-gray-800">{video.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Quiz interactif */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Quiz />
          </motion.div>

          {/* Classement des écoles */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-yellow-800 p-6 border-b border-gray-200 flex items-center justify-center gap-3">
              <Award className="w-8 h-8" />
              Top Écoles
            </h3>
            <ul>
              {loadingSchools ? (
                <li className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
                  <p className="mt-2">Chargement...</p>
                </li>
              ) : publishedSchools.length === 0 ? (
                <li className="p-8 text-center text-gray-500">
                  <p>Aucune école publiée pour le moment</p>
                </li>
              ) : (
                publishedSchools.map((ecole, index) => (
                  <li key={ecole.id} className="flex justify-between items-center p-4 border-b last:border-none hover:bg-yellow-50/50 transition-colors">
                    <div className="flex items-center">
                      <span className="font-bold text-lg text-gray-700 w-8">{index + 1}.</span>
                      <span className="font-semibold text-gray-800">{ecole.school_name}</span>
                    </div>
                    <span className="font-bold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-sm">{ecole.plants_count} plants</span>
                  </li>
                ))
              )}
            </ul>
            <div className="p-6 bg-gray-50">
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {showForm ? 'Masquer le formulaire' : 'Inscrire votre école'}
              </button>
            </div>
          </motion.div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mt-8"
            >
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                Inscription de votre école
              </h3>
              <form onSubmit={handleSchoolSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom de l'école *"
                  value={schoolForm.schoolName}
                  onChange={(e) => setSchoolForm({...schoolForm, schoolName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Nom du contact *"
                  value={schoolForm.contactName}
                  onChange={(e) => setSchoolForm({...schoolForm, contactName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={schoolForm.email}
                    onChange={(e) => setSchoolForm({...schoolForm, email: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={schoolForm.phone}
                    onChange={(e) => setSchoolForm({...schoolForm, phone: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Ville"
                  value={schoolForm.city}
                  onChange={(e) => setSchoolForm({...schoolForm, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="number"
                  placeholder="Nombre de plants plantés par votre école *"
                  value={schoolForm.plantsCount}
                  onChange={(e) => setSchoolForm({...schoolForm, plantsCount: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  min="0"
                  required
                />
                <textarea
                  placeholder="Message (optionnel)"
                  value={schoolForm.message}
                  onChange={(e) => setSchoolForm({...schoolForm, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  rows={3}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Inscription en cours...' : 'Inscrire l\'école'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SchoolsSpacePage;
