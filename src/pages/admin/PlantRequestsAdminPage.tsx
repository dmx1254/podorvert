import React, { useState, useEffect } from 'react';
import { Eye, Download, Trash2, Search, Filter, FileDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PlantRequest {
  id: string;
  organization_name: string;
  groupment_type: string;
  responsible_name: string;
  email: string;
  phone: string;
  location: string;
  planned_date: string;
  quantity_requested: number;
  plant_species: string;
  activity_objective: string;
  additional_message: string | null;
  status: string;
  created_at: string;
}

const PlantRequestsAdminPage: React.FC = () => {
  const [requests, setRequests] = useState<PlantRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PlantRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PlantRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState<keyof PlantRequest>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterAndSortRequests();
  }, [requests, searchTerm, filterType, sortField, sortDirection]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('plant_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching plant requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRequests = () => {
    let filtered = [...requests];

    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.responsible_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(req => req.groupment_type === filterType);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredRequests(filtered);
  };

  const handleSort = (field: keyof PlantRequest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (requestId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;

    try {
      const { error } = await supabase.from('plant_requests').delete().eq('id', requestId);
      if (error) throw error;
      setRequests(requests.filter(r => r.id !== requestId));
      alert('Demande supprimée avec succès');
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const exportSingleRequestToPDF = (request: PlantRequest) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34);
    doc.text('PODOR VERT', 105, 20, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Demande de Plants', 105, 35, { align: 'center' });

    doc.setDrawColor(34, 139, 34);
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    const statusText = request.status === 'pending' ? 'En attente' :
                       request.status === 'approved' ? 'Approuvée' : 'Rejetée';

    const data = [
      ['Organisation / Groupement', request.organization_name],
      ['Type de groupement', request.groupment_type],
      ['Responsable', request.responsible_name],
      ['Email', request.email],
      ['Téléphone', request.phone],
      ['Lieu / Commune', request.location],
      ['Date prévue de plantation', formatDate(request.planned_date)],
      ['Quantité demandée', `${request.quantity_requested} plants`],
      ['Espèces d\'arbres/plantes', request.plant_species],
      ['Objectif de l\'activité', request.activity_objective],
      ['Message complémentaire', request.additional_message || 'N/A'],
      ['Statut', statusText],
      ['Date de demande', formatDate(request.created_at)]
    ];

    autoTable(doc, {
      startY: 50,
      head: [],
      body: data,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [240, 248, 255], cellWidth: 60 },
        1: { cellWidth: 110 }
      }
    });

    const fileName = `demande_${request.organization_name.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const exportAllRequestsToPDF = () => {
    if (filteredRequests.length === 0) {
      alert('Aucune demande à exporter');
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34);
    doc.text('PODOR VERT', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Liste des Demandes de Plants', 105, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Total: ${filteredRequests.length} demande(s)`, 105, 37, { align: 'center' });
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 42, { align: 'center' });

    const headers = [[
      'Organisation',
      'Type',
      'Responsable',
      'Lieu',
      'Date',
      'Quantité',
      'Statut'
    ]];

    const rows = filteredRequests.map(req => [
      req.organization_name,
      req.groupment_type,
      req.responsible_name,
      req.location,
      new Date(req.planned_date).toLocaleDateString('fr-FR'),
      `${req.quantity_requested}`,
      req.status === 'pending' ? 'En attente' :
      req.status === 'approved' ? 'Approuvée' : 'Rejetée'
    ]);

    autoTable(doc, {
      startY: 50,
      head: headers,
      body: rows,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [34, 139, 34],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 25 }
      }
    });

    const fileName = `toutes_demandes_plants_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const exportToCSV = () => {
    if (filteredRequests.length === 0) return;

    const headers = [
      'Organisation',
      'Type de groupement',
      'Responsable',
      'Email',
      'Téléphone',
      'Lieu',
      'Date prévue',
      'Quantité',
      'Espèces',
      'Objectif',
      'Message',
      'Statut',
      'Date de demande'
    ];

    const rows = filteredRequests.map(req => [
      req.organization_name,
      req.groupment_type,
      req.responsible_name,
      req.email,
      req.phone,
      req.location,
      new Date(req.planned_date).toLocaleDateString('fr-FR'),
      req.quantity_requested,
      req.plant_species,
      req.activity_objective,
      req.additional_message || '',
      req.status,
      new Date(req.created_at).toLocaleDateString('fr-FR')
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demandes_plants_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const uniqueTypes = Array.from(new Set(requests.map(r => r.groupment_type)));

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Demandes de Plants</h1>
          <p className="text-gray-600">Total: <span className="font-semibold text-green-600">{filteredRequests.length}</span> demande(s)</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par organisation, responsable, email ou lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Tous les types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={exportAllRequestsToPDF}
                disabled={filteredRequests.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                title="Exporter toutes les demandes en PDF"
              >
                <FileDown className="h-4 w-4" />
                <span className="hidden sm:inline">Exporter PDF</span>
              </button>

              <button
                onClick={exportToCSV}
                disabled={filteredRequests.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                title="Exporter toutes les demandes en CSV"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exporter CSV</span>
              </button>
            </div>
          </div>
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
                    <th
                      onClick={() => handleSort('organization_name')}
                      className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-green-700"
                    >
                      Organisation {sortField === 'organization_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('groupment_type')}
                      className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-green-700"
                    >
                      Type {sortField === 'groupment_type' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Responsable</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Lieu</th>
                    <th
                      onClick={() => handleSort('quantity_requested')}
                      className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-green-700"
                    >
                      Quantité {sortField === 'quantity_requested' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('created_at')}
                      className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-green-700"
                    >
                      Date {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        {searchTerm || filterType !== 'all' ? 'Aucune demande ne correspond à vos critères' : 'Aucune demande pour le moment'}
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {request.organization_name}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            {request.groupment_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{request.responsible_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{request.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{request.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          {request.quantity_requested} plants
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatDate(request.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir les détails"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(request.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="h-5 w-5" />
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

      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1005] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Détails de la demande</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Organisation</label>
                  <p className="text-gray-900">{selectedRequest.organization_name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type de groupement</label>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {selectedRequest.groupment_type}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Responsable</label>
                  <p className="text-gray-900">{selectedRequest.responsible_name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedRequest.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone</label>
                  <p className="text-gray-900">{selectedRequest.phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Lieu / Commune</label>
                  <p className="text-gray-900">{selectedRequest.location}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date prévue de plantation</label>
                  <p className="text-gray-900">{formatDate(selectedRequest.planned_date)}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Quantité demandée</label>
                  <p className="text-gray-900 font-bold text-lg">{selectedRequest.quantity_requested} plants</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Espèces d'arbres/plantes</label>
                  <p className="text-gray-900">{selectedRequest.plant_species}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Objectif de l'activité</label>
                  <p className="text-gray-900">{selectedRequest.activity_objective}</p>
                </div>

                {selectedRequest.additional_message && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Message complémentaire</label>
                    <p className="text-gray-900">{selectedRequest.additional_message}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedRequest.status === 'pending' ? 'En attente' :
                     selectedRequest.status === 'approved' ? 'Approuvée' : 'Rejetée'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date de demande</label>
                  <p className="text-gray-900">{formatDate(selectedRequest.created_at)}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => exportSingleRequestToPDF(selectedRequest)}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Télécharger PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PlantRequestsAdminPage;
