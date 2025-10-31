import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, SponsorMessage } from "../lib/supabase";

const SponsorMessages: React.FC = () => {
  const [messages, setMessages] = useState<SponsorMessage[]>([]);
  const [newMessage, setNewMessage] = useState({
    name: "",
    email: "",
    locality: "",
    trees_count: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('sponsor_messages')
        .select('*')
        .eq('status', 'publié')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching sponsor messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.name.trim() === "" || newMessage.message.trim() === "") return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('sponsor_messages').insert([
        {
          name: newMessage.name,
          email: newMessage.email,
          locality: newMessage.locality || null,
          trees_count: newMessage.trees_count ? parseInt(newMessage.trees_count) : null,
          message: newMessage.message,
          status: 'en_attente'
        }
      ]);

      if (error) throw error;

      alert('Merci pour votre message de soutien! Il sera publié après validation.');
      setNewMessage({ name: "", email: "", locality: "", trees_count: "", message: "" });
    } catch (error) {
      console.error('Error submitting sponsor message:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
            className="text-3xl font-bold text-green-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
              💬 Messages des Parrains
          </h2>
        </motion.h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Votre nom et prénom"
              value={newMessage.name}
              onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition"
              required
            />
            <input
              type="email"
              placeholder="Votre email"
              value={newMessage.email}
              onChange={(e) => setNewMessage({...newMessage, email: e.target.value})}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Votre localité / ville"
              value={newMessage.locality}
              onChange={(e) => setNewMessage({...newMessage, locality: e.target.value})}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition"
            />
            <input
              type="number"
              placeholder="Nombre d'arbres parrainés"
              value={newMessage.trees_count}
              onChange={(e) => setNewMessage({...newMessage, trees_count: e.target.value})}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <textarea
            placeholder="Écrivez votre message de soutien..."
            value={newMessage.message}
            onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
            className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-green-400 transition"
            rows={3}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>

        <div ref={messagesContainerRef} className="space-y-4 max-h-96 overflow-y-auto p-4 bg-white/50 rounded-lg border border-green-200">
          {messages.length === 0 ? (
            <p className="text-gray-500 py-8">Aucun message publié pour le moment</p>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="bg-white p-4 rounded-lg shadow text-left hover:bg-green-50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-green-700">{msg.name}</div>
                      {msg.locality && (
                        <div className="text-sm text-gray-500">📍 {msg.locality}</div>
                      )}
                    </div>
                    {msg.trees_count && msg.trees_count > 0 && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        🌱 {msg.trees_count} arbre{msg.trees_count > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  {msg.message && (
                    <div className="text-gray-700 mt-2">{msg.message}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsorMessages;
