import React, { useState, useEffect } from 'react';
import { Eye, Download, Trash2 } from 'lucide-react';
import { supabase, Partner } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import PartnerDetailsModal from '../../components/admin/PartnerDetailsModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PartnersAdminPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (partnerId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;

    try {
      const { error } = await supabase.from('partners').delete().eq('id', partnerId);
      if (error) throw error;
      setPartners(partners.filter(p => p.id !== partnerId));
      alert('Partenaire supprimé avec succès');
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const exportToPDF = (partner: Partner) => {
    const doc = new jsPDF();

    // En-tête
    doc.setFontSize(18);
    doc.setTextColor(22, 163, 74);
    doc.text('PODOR VERT', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Détails du Partenaire', 105, 30, { align: 'center' });

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 105, 38, { align: 'center' });

    // Informations du partenaire
    const data = [
      ['Type de Partenaire', partner.partner_type || 'Entreprise'],
      ['Nom & Prénom', partner.name],
      ['Email', partner.email],
      ['Téléphone', partner.phone || '-'],
      ['Organisation', partner.company || '-'],
      ['Message', partner.message || '-'],
      ['Date d\'envoi', new Date(partner.created_at).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })]
    ];

    autoTable(doc, {
      startY: 45,
      head: [['Champ', 'Valeur']],
      body: data,
      theme: 'grid',
      headStyles: {
        fillColor: [22, 163, 74],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { cellWidth: 120 }
      }
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} sur ${pageCount} - PODOR VERT`,
        105,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    doc.save(`partenaire_${partner.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Partenaires</h1>
          <p className="text-gray-600">Total: <span className="font-semibold text-green-600">{partners.length}</span> partenaire(s)</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nom & Prénom</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Téléphone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date d'envoi</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {partners.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        Aucun partenaire pour le moment
                      </td>
                    </tr>
                  ) : (
                    partners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            {partner.partner_type || 'Entreprise'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{partner.name}</td>
                        <td className="px-6 py-4 text-sm">
                          <a href={`mailto:${partner.email}`} className="text-blue-600 hover:underline">
                            {partner.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{partner.phone || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {partner.message ? partner.message.substring(0, 50) + '...' : '-'}
                        </td>
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
                              onClick={() => {
                                setSelectedPartner(partner);
                                setShowModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir les détails"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => exportToPDF(partner)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Télécharger PDF"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(partner.id)}
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
          </div>
        )}
      </div>

      {selectedPartner && (
        <PartnerDetailsModal
          partner={selectedPartner}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedPartner(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default PartnersAdminPage;
