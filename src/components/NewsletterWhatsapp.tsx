import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const NewsletterWhatsapp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('newsletter').insert([{ email }]);
      if (error) throw error;
      setSubmitted(true);
      setEmail("");
    } catch (error: any) {
      if (error.code === '23505') {
        alert('Cet email est déjà inscrit à notre newsletter.');
      } else {
        console.error('Error subscribing to newsletter:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "221774031305";
  const whatsappMessage =
    "Bonjour, je veux recevoir les alertes de reboisement et les résultats des missions terrain";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="text-4xl font-extrabold text-blue-800 mb-6 tracking-tight drop-shadow-sm"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
             📢 ABONNEZ-VOUS À NOTRE NEWSLETTER
          </h2>
        </motion.h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Recevez en avant-première nos actualités 🌱, les campagnes de
          reboisement 🌳 et les résultats de nos missions sur le terrain 📊, directement dans votre boîte mail.
        </p>

        {submitted ? (
          <motion.p
            className="text-green-600 font-bold text-xl bg-green-100 rounded-lg py-3 px-6 inline-block shadow-md"
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            ✅ Merci ! Vous êtes inscrit(e) avec succès.
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-2xl mx-auto"
          >
            <input
              type="email"
              placeholder="✉️ Votre adresse email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 w-full sm:flex-grow focus:ring-2 focus:ring-blue-400 transition text-gray-800 shadow-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '⏳ Inscription...' : '🚀 S\'inscrire'}
            </button>
          </form>
        )}
      </div>

      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-green-200/40 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl"
        title="Recevoir les alertes WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 12 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircle size={30} />
      </motion.a>
    </section>
  );
};

export default NewsletterWhatsapp;
