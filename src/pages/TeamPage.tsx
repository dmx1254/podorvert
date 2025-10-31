// ✅ React doit être importé correctement
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHero from '../components/PageHero';
import { JSX } from "react/jsx-runtime";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

// Bureau exécutif
const executive: TeamMember[] = [
  { name: "BASSIROU HAMEDINE SY", role: "Président", image: "/images/president.jpg", description: "Membre Fondateur Podor Vert Président" },
  { name: "BAABA MAAL", role: "PARRAIN SPIRITUEL", image: "/images/Baba-Maal.jpg", description: "Ambassadeur du Système des nations unies dans le cadre de la lutte contre la désertification, PARRAIN SPIRITUEL du projet podorvert" },
  { name: "IBRAHIMA DJIGO", role: "Trésorier", image: "/images/Ibrahima-Djigo.jpeg", description: "Ambassadeur Podorvert Trésorier général." },
  { name: "AMADOU HANNE", role: "Secrétaire Général", image: "/images/amadou-hanne.jpg", description: "Ambassadeur Podorvert Membre Fondateur Secrétaire Général" },
  { name: "MAMADOU SARR DIT MARA", role: "Responsable Communication", image: "/images/mara-niasse.jpeg", description: "Ambassadeur Podorvert Responsable Communication" },
  { name: "MAMADOU AMADOU BA", role: "President Commission Reboisement et Suivi", image: "/images/Mamadou-Amadou-BA.jpeg", description: "Ambassadeur Podorvert President Commission Reboisement et Suivi" },
  { name: "AMADOU DIALLO", role: "Responsable pépinière Belel Gawdi", image: "/images/Amadou-Diallo.jpeg", description: "Ambassadeur Podorvert Responsable pépinière Belel Gawdi" },
  { name: "Dr RAMATA TALLA", role: "Présidente Commission Scientifique", image: "/images/photo-avatar-profil.png", description: "Présidente Commission Scientifique" },
  { name: "Nom Prénom", role: "Chargé des Partenariats", image: "/images/photo-avatar-profil.png", description: "Développe les alliances et financements." },
];

// Ambassadeurs
const ambassadors: TeamMember[] = [
  { name: "MAMADOU BA", role: "Ambassadeur Podorvert", image: "/images/photo-avatar-profil.png", description: "Ambassadeur Podorvert" },
  { name: "Aminata Sow", role: "Ambassadrice Podor", image: "/images/photo-avatar-profil.png", description: "Mobilise les jeunes et anime la communauté de Podor pour les actions écologiques." },
  { name: "Ibrahima Ba", role: "Ambassadeur Golléré", image: "/images/photo-avatar-profil.png", description: "Encadre les activités locales de plantation et de sensibilisation à Golléré." },
  { name: "Fatou Gueye", role: "Ambassadrice Guédé", image: "/images/photo-avatar-profil.png", description: "Promotrice de l’écologie et coordinatrice des activités à Guédé." },
  { name: "Ousmane Kane", role: "Ambassadeur Dodel", image: "/images/photo-avatar-profil.png", description: "Anime la communauté de Dodel et favorise la mobilisation pour les actions écologiques." },
  { name: "Awa Thiam", role: "Ambassadrice Mboumba", image: "/images/photo-avatar-profil.png", description: "Contribue au développement durable de Mboumba à travers les programmes verts." },
  { name: "Cheikh Fall", role: "Ambassadeur", image: "/images/photo-avatar-profil.png", description: "Engagé dans la sensibilisation des plus jeunes à l'importance de la biodiversité." },
  { name: "Mariama Sarr", role: "Ambassadrice", image: "/images/photo-avatar-profil.png", description: "Spécialiste du suivi des plants et de la collecte de données sur le terrain." },
  { name: "Abdoulaye Diop", role: "Ambassadeur", image: "/images/photo-avatar-profil.png", description: "Organise les ateliers de formation sur les techniques de compostage." },
  { name: "Khadija N'diaye", role: "Ambassadrice", image: "/images/photo-avatar-profil.png", description: "Mobilise les groupements de femmes pour les projets de pépinières." },
  { name: "Pape Diouf", role: "Ambassadeur", image: "/images/photo-avatar-profil.png", description: "Expert en agroécologie, il conseille les agriculteurs locaux." },
  { name: "Samba Cissé", role: "Ambassadeur", image: "/images/photo-avatar-profil.png", description: "Photographe et vidéaste, il documente toutes les actions de l'association." }
];

function ProfileCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-md hover:shadow-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300 border border-gray-100"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Photo avec effets */}
      <motion.div
        className="w-36 h-36 overflow-hidden rounded-full border-4 border-green-100 shadow-lg mb-5 relative ring-4 ring-green-50 hover:ring-green-200 transition-all duration-500"
        whileHover={{ scale: 1.1 }}
        style={{
          boxShadow: "0 0 30px rgba(34, 197, 94, 0.15), 0 10px 25px rgba(0, 0, 0, 0.1)"
        }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <h3 className="text-lg font-bold text-gray-800 mb-1.5 tracking-tight">
        {member.name}
      </h3>
      <p className="text-green-600 font-semibold text-sm tracking-wide uppercase mb-3">{member.role}</p>

      {/* Description avec animation */}
      {member.description && (
        <motion.p
          className="text-sm text-gray-600 mt-2 max-w-[280px] leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {member.description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function TeamPage(): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 8;
  const start = page * itemsPerPage;
  const paginatedAmbassadors = ambassadors.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(ambassadors.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-green-50/20 to-white">
      <PageHero
        title="Notre Équipe"
        breadcrumb="Notre équipe"
        imageUrl="/images/background-banner.jpg"
      />

      <div className="max-w-7xl mx-auto py-20 px-6">
        {/* Bureau exécutif */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-4 text-gray-800 tracking-tight">
              Bureau Exécutif
            </h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Les membres clés qui dirigent nos actions pour un avenir plus vert
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {executive.map((m, i) => (
              <ProfileCard key={i} member={m} />
            ))}
          </div>
        </motion.div>

        {/* Ambassadeurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-4 text-gray-800 tracking-tight">
              Nos Ambassadeurs
            </h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Nos représentants sur le terrain qui portent nos valeurs
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12">
            {paginatedAmbassadors.map((m, i) => (
              <ProfileCard key={i} member={m} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Précédent
              </button>
              <button
                onClick={() =>
                  setPage((p) =>
                    start + itemsPerPage < ambassadors.length ? p + 1 : p
                  )
                }
                disabled={start + itemsPerPage >= ambassadors.length}
                className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Suivant
              </button>
            </div>

            <span className="text-gray-600 font-medium text-sm">
              Page {page + 1} / {totalPages}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
