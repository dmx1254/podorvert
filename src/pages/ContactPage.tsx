import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, CheckCircle, User, Mail as MailIcon, MessageSquare } from 'lucide-react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactDetails = [
    {
      icon: MapPin,
      title: 'Adresse',
      value: '118 Hlm Fass, Dakar-Sénégal'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+221 77 403 13 05 / +221 77 365 06 13'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@podor-vert.org/podorvert@gmail.com',
      href: 'mailto:contact@podorvert.org'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contacts').insert([formData]);
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Contactez-nous" 
        breadcrumb="Contactez-nous" 
        imageUrl="/images/background-banner.jpg" 
      />

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed"
          >
            Avoir une communication ouverte est fondamental pour Podor Vert. Vous avez une question, besoin d’une information ou souhaitez rejoindre nos actions ? Contactez-nous, nous vous répondrons rapidement.
          </motion.p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactDetails.map((detail, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <detail.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{detail.title}</h3>
                {detail.href ? (
                  <a href={detail.href} className="text-gray-600 hover:text-green-700 transition-colors">{detail.value}</a>
                ) : (
                  <p className="text-gray-600">{detail.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form and Map */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            {isSubmitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-r-lg flex items-center">
                <CheckCircle className="w-10 h-10 mr-4"/>
                <div>
                  <h3 className="font-bold text-lg">Merci !</h3>
                  <p>Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2"/>
                  <input type="text" name="name" placeholder="Votre nom" required value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
                </div>
                <div className="relative">
                  <MailIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2"/>
                  <input type="email" name="email" placeholder="Votre email" required value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
                </div>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2"/>
                  <input type="text" name="subject" placeholder="Sujet" required value={formData.subject} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <textarea name="message" placeholder="Votre message" required rows={5} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-green-400"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  <Send className="w-5 h-5 ml-2"/>
                </button>
              </form>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            className="h-96 lg:h-full w-full rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.034719582153!2d-17.4610136851586!3d14.71077598973167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173b9e7c5e26b%3A0x7d67a78a48b59a63!2sHLM%20Fass%2C%20Dakar%2C%20Senegal!5e0!3m2!1sen!2s!4v1672578891543!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de localisation de Podor Vert"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
            <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Votre voix compte. Ensemble, faisons de Podor un territoire plus vert !
            </motion.h2>
            <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Link to="/qui-sommes-nous" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg">
                    Rejoindre nos actions
                </Link>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
