import React, { useState, useEffect } from 'react';
import { supabase, Partner, Newsletter, MemberCard, Contact, SponsorMessage, QuizResponse, TopSchool } from '../lib/supabase';
import { Users, Mail, CreditCard, MessageSquare, Heart, HelpCircle, GraduationCap, Menu, X, Eye, Trash2, CheckCircle, Download, Image } from 'lucide-react';
import MessageModal from '../components/MessageModal';

type Section = 'partners' | 'newsletter' | 'member_cards' | 'contacts' | 'sponsor_messages' | 'quiz_responses' | 'top_schools';

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('partners');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [partners, setPartners] = useState<Partner[]>([]);
  const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
  const [memberCards, setMemberCards] = useState<MemberCard[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sponsorMessages, setSponsorMessages] = useState<SponsorMessage[]>([]);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [topSchools, setTopSchools] = useState<TopSchool[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const sections = [
    { id: 'partners' as Section, label: 'Devenir partenaire', icon: Users, color: 'green' },
    { id: 'newsletter' as Section, label: 'Newsletter', icon: Mail, color: 'blue' },
    { id: 'member_cards' as Section, label: 'Carte Membre', icon: CreditCard, color: 'purple' },
    { id: 'contacts' as Section, label: 'Contact', icon: MessageSquare, color: 'orange' },
    { id: 'sponsor_messages' as Section, label: 'Messages des Parrains', icon: Heart, color: 'red' },
    { id: 'quiz_responses' as Section, label: 'Quiz CO₂', icon: HelpCircle, color: 'teal' },
    { id: 'top_schools' as Section, label: 'Top Écoles', icon: GraduationCap, color: 'indigo' },
  ];

  const fetchData = async (section: Section) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(section)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      switch (section) {
        case 'partners':
          setPartners(data || []);
          break;
        case 'newsletter':
          setNewsletter(data || []);
          break;
        case 'member_cards':
          setMemberCards(data || []);
          break;
        case 'contacts':
          setContacts(data || []);
          break;
        case 'sponsor_messages':
          setSponsorMessages(data || []);
          break;
        case 'quiz_responses':
          setQuizResponses(data || []);
          break;
        case 'top_schools':
          setTopSchools(data || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeSection);
  }, [activeSection]);

  const handleViewMessage = (contact: Contact) => {
    setSelectedMessage(contact);
    setIsMessageModalOpen(true);
  };

  const handleMarkAsProcessed = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: 'traité' })
        .eq('id', contactId);

      if (error) throw error;

      setContacts(contacts.map(c =>
        c.id === contactId ? { ...c, status: 'traité' } : c
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeleteMessage = async (contactId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      setContacts(contacts.filter(c => c.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Erreur lors de la suppression du message');
    }
  };

  const handlePublishSponsorMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('sponsor_messages')
        .update({ status: 'publié' })
        .eq('id', messageId);

      if (error) throw error;

      setSponsorMessages(sponsorMessages.map(m =>
        m.id === messageId ? { ...m, status: 'publié' } : m
      ));
    } catch (error) {
      console.error('Error publishing sponsor message:', error);
      alert('Erreur lors de la publication du message');
    }
  };

  const handleUnpublishSponsorMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('sponsor_messages')
        .update({ status: 'en_attente' })
        .eq('id', messageId);

      if (error) throw error;

      setSponsorMessages(sponsorMessages.map(m =>
        m.id === messageId ? { ...m, status: 'en_attente' } : m
      ));
    } catch (error) {
      console.error('Error unpublishing sponsor message:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  const handleDeleteSponsorMessage = async (messageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const { error } = await supabase
        .from('sponsor_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setSponsorMessages(sponsorMessages.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Error deleting sponsor message:', error);
      alert('Erreur lors de la suppression du message');
    }
  };

  const handleDeletePartner = async (partnerId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partnerId);

      if (error) throw error;

      setPartners(partners.filter(p => p.id !== partnerId));
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('Erreur lors de la suppression du partenaire');
    }
  };

  const handleDeleteNewsletter = async (newsletterId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;

    try {
      const { error } = await supabase
        .from('newsletter')
        .delete()
        .eq('id', newsletterId);

      if (error) throw error;

      setNewsletter(newsletter.filter(n => n.id !== newsletterId));
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Erreur lors de la suppression de l\'abonné');
    }
  };

  const handleDeleteMemberCard = async (cardId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette carte membre ?')) return;

    try {
      const { error } = await supabase
        .from('member_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;

      setMemberCards(memberCards.filter(c => c.id !== cardId));
    } catch (error) {
      console.error('Error deleting member card:', error);
      alert('Erreur lors de la suppression de la carte membre');
    }
  };

  const handleDeleteQuizResponse = async (responseId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) return;

    try {
      const { error } = await supabase
        .from('quiz_responses')
        .delete()
        .eq('id', responseId);

      if (error) throw error;

      setQuizResponses(quizResponses.filter(q => q.id !== responseId));
    } catch (error) {
      console.error('Error deleting quiz response:', error);
      alert('Erreur lors de la suppression de la réponse');
    }
  };

  const handleDeleteTopSchool = async (schoolId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette école ?')) return;

    try {
      const { error } = await supabase
        .from('top_schools')
        .delete()
        .eq('id', schoolId);

      if (error) throw error;

      setTopSchools(topSchools.filter(s => s.id !== schoolId));
    } catch (error) {
      console.error('Error deleting top school:', error);
      alert('Erreur lors de la suppression de l\'école');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('Aucune donnée à exporter');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      );
    }

    switch (activeSection) {
      case 'partners':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom de l'organisation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type de partenaire</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom et Prénom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'envoi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      Aucune demande de partenariat pour le moment
                    </td>
                  </tr>
                ) : (
                  partners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{partner.company || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {partner.partner_type || 'Entreprise'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{partner.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${partner.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {partner.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{partner.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{partner.message || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(partner.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([partner], 'partenaire')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePartner(partner.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'newsletter':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'inscription</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {newsletter.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      Aucun abonné pour le moment
                    </td>
                  </tr>
                ) : (
                  newsletter.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        <a href={`mailto:${sub.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {sub.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([sub], 'newsletter')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNewsletter(sub.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'member_cards':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Photo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Prénom et Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fonction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Village</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'envoi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {memberCards.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucune demande de carte membre pour le moment
                    </td>
                  </tr>
                ) : (
                  memberCards.map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {card.photo_url ? (
                          <a href={card.photo_url} target="_blank" rel="noopener noreferrer" className="block">
                            <img
                              src={card.photo_url}
                              alt={card.full_name}
                              className="w-20 h-20 object-cover rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-green-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/images/photo-avatar-profil.png';
                              }}
                            />
                          </a>
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex flex-col items-center justify-center text-gray-400 shadow-inner border-2 border-gray-300">
                            <img
                              src="/images/photo-avatar-profil.png"
                              alt="Avatar par défaut"
                              className="w-20 h-20 object-cover rounded-full opacity-60"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{card.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {card.function ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                            {card.function}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.village || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(card.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {card.photo_url && (
                            <>
                              <a
                                href={card.photo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Voir la photo"
                              >
                                <Eye className="w-5 h-5" />
                              </a>
                              <button
                                onClick={() => downloadImage(card.photo_url!, `photo_${card.full_name.replace(/\s+/g, '_')}.jpg`)}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Télécharger la photo"
                              >
                                <Image className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => exportToCSV([card], 'carte_membre')}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Télécharger les données CSV"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMemberCard(card.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'contacts':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Sujet</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'envoi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucun message de contact pour le moment
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {contact.status === 'traité' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center w-fit">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Traité
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            Nouveau
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{contact.subject || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {contact.message.length > 50 ? `${contact.message.substring(0, 50)}...` : contact.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewMessage(contact)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir le message complet"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {contact.status !== 'traité' && (
                            <button
                              onClick={() => handleMarkAsProcessed(contact.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Marquer comme traité"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(contact.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'sponsor_messages':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Localité</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Arbres</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sponsorMessages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucun message de parrain pour le moment
                    </td>
                  </tr>
                ) : (
                  sponsorMessages.map((sponsor) => (
                    <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {sponsor.status === 'publié' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center w-fit">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Publié
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            En attente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{sponsor.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {sponsor.locality ? (
                          <span className="flex items-center">
                            📍 {sponsor.locality}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {sponsor.trees_count && sponsor.trees_count > 0 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center w-fit">
                            🌱 {sponsor.trees_count}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {sponsor.message ? (
                          sponsor.message.length > 50 ? `${sponsor.message.substring(0, 50)}...` : sponsor.message
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(sponsor.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {sponsor.status === 'publié' ? (
                            <button
                              onClick={() => handleUnpublishSponsorMessage(sponsor.id)}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Retirer de la publication"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePublishSponsorMessage(sponsor.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Publier sur le site"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => exportToCSV([sponsor], 'parrain')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSponsorMessage(sponsor.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'quiz_responses':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Question</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Réponse</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Correcte</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quizResponses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Aucune réponse au quiz pour le moment
                    </td>
                  </tr>
                ) : (
                  quizResponses.map((quiz) => (
                    <tr key={quiz.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{quiz.question}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{quiz.answer}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          quiz.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {quiz.is_correct ? 'Oui' : 'Non'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{quiz.user_email || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(quiz.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([quiz], 'quiz_reponse')}
                            className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuizResponse(quiz.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'top_schools':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">École</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ville</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topSchools.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      Aucune école inscrite pour le moment
                    </td>
                  </tr>
                ) : (
                  topSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{school.school_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{school.contact_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${school.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {school.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{school.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{school.city || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{school.message || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(school.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([school], 'ecole')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTopSchool(school.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  const getCurrentCount = () => {
    switch (activeSection) {
      case 'partners': return partners.length;
      case 'newsletter': return newsletter.length;
      case 'member_cards': return memberCards.length;
      case 'contacts': return contacts.length;
      case 'sponsor_messages': return sponsorMessages.length;
      case 'quiz_responses': return quizResponses.length;
      case 'top_schools': return topSchools.length;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600">
            <h1 className="text-2xl font-bold text-white mb-1">Espace Admin</h1>
            <p className="text-green-100 text-sm">Podor Vert</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="lg:ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {sections.find(s => s.id === activeSection)?.label}
            </h2>
            <p className="text-gray-600">
              Total: <span className="font-semibold text-green-600">{getCurrentCount()}</span> enregistrement(s)
            </p>
          </div>

          {renderTable()}
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          isOpen={isMessageModalOpen}
          onClose={() => {
            setIsMessageModalOpen(false);
            setSelectedMessage(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminPage;
