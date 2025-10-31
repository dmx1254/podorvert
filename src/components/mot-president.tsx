import React from "react";

export default function MotPresidentPage() {
  return (
    <div className="bg-gradient-to-b from-green-100 via-white to-green-50 min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 md:p-16 relative overflow-hidden">
        
        {/* Décoration */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-20 -z-10"></div>

        {/* Photo + Titre */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src="/images/president.jpg" // 👉 ajoute la vraie photo ici
            alt="Président Podor Vert"
            className="w-44 h-44 object-cover rounded-full border-4 border-green-600 shadow-xl transition-transform duration-300 hover:scale-105"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 bg-clip-text text-transparent">
                BASSIROU HAMEDINE SY
            </h1>
            <p className="text-lg text-gray-600">
              Président & Membre Fondateur –{" "}
              <span className="text-green-700 font-semibold">Podor Vert</span>
            </p>
            <div className="mt-4 h-1 w-20 bg-green-500 rounded-full mx-auto md:mx-0"></div>
          </div>
        </div>

        {/* Texte du mot du Président */}
        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed text-lg text-justify">
          <p className="italic text-green-700 text-xl">
            🌿 Chers membres, partenaires et amis de Podor Vert,
          </p>
          <p>
            Lorsque nous avons fondé <strong>Podor Vert</strong>, notre ambition
            était claire : protéger notre environnement, redonner vie à nos
            terres, et bâtir une communauté engagée pour un avenir durable.
            Aujourd’hui, grâce à votre soutien et à votre implication, cette
            vision devient réalité.
          </p>
          <p>
            Face aux défis climatiques et sociaux, nous avons le devoir
            collectif d’agir avec courage et détermination. Ensemble, nous
            pouvons transformer nos villages, nos villes et nos habitudes pour
            léguer aux générations futures un environnement plus sain, plus vert
            et plus juste.
          </p>
          <p>
            Je vous invite à continuer ce chemin avec nous, à être acteurs du
            changement et à faire de <strong>Podor Vert</strong> un modèle de
            réussite écologique et humaine.
          </p>
          <p className="font-semibold text-green-700 text-xl">
            Merci pour votre confiance et votre engagement. 🌍💚
          </p>
        </div>
      </div>
    </div>
  );
}
