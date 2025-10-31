import React, { useState, useEffect } from 'react';
import { GraduationCap, Trash2, Search, Eye, Award, Send, X as XIcon, Edit2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';

interface TopSchool {
  id: string;
  school_name: string;
  contact_name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  status: string;
  plants_count: number;
  rank_position: number;
  created_at: string;
}

const TopSchoolsAdminPage: React.FC = () => {
  const [schools, setSchools] = useState<TopSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<TopSchool | null>(null);
  const [editingSchool, setEditingSchool] = useState<TopSchool | null>(null);
  const [editForm, setEditForm] = useState({ plants_count: 0, rank_position: 0 });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('top_schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchools(data || []);
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette école?')) return;

    try {
      const { error } = await supabase
        .from('top_schools')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchSchools();
    } catch (error) {
      console.error('Error deleting school:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('top_schools')
        .update({ status: 'publié' })
        .eq('id', id);

      if (error) throw error;
      alert('École publiée avec succès!');
      fetchSchools();
    } catch (error) {
      console.error('Error publishing school:', error);
      alert('Erreur lors de la publication');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('top_schools')
        .update({ status: 'en_attente' })
        .eq('id', id);

      if (error) throw error;
      alert('École dépubliée avec succès!');
      fetchSchools();
    } catch (error) {
      console.error('Error unpublishing school:', error);
      alert('Erreur lors de la dépublication');
    }
  };

  const handleEditSchool = (school: TopSchool) => {
    setEditingSchool(school);
    setEditForm({
      plants_count: school.plants_count || 0,
      rank_position: school.rank_position || 0
    });
  };

  const handleSaveEdit = async () => {
    if (!editingSchool) return;

    try {
      const { error } = await supabase
        .from('top_schools')
        .update({
          plants_count: editForm.plants_count,
          rank_position: editForm.rank_position
        })
        .eq('id', editingSchool.id);

      if (error) throw error;
      alert('Informations mises à jour avec succès!');
      setEditingSchool(null);
      fetchSchools();
    } catch (error) {
      console.error('Error updating school:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const filteredSchools = schools.filter(school =>
    school.school_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.contact_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Écoles</h1>
          <p className="text-gray-600">Gérer les écoles participantes au programme</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une école ou un contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-900"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    École
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ville
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>Aucune école trouvée</p>
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-yellow-500 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{school.school_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.contact_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.city || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {school.plants_count || 0} plants
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          school.status === 'publié'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {school.status === 'publié' ? '✓ Publié' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(school.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedSchool(school)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditSchool(school)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                            title="Modifier plants et rang"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {school.status === 'publié' ? (
                            <button
                              onClick={() => handleUnpublish(school.id)}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                              title="Dépublier"
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePublish(school.id)}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                              title="Publier sur le site"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(school.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
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

        <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm mb-1">Écoles participantes</p>
          <p className="font-bold text-3xl">{filteredSchools.length}</p>
        </div>
      </div>

      {editingSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Modifier {editingSchool.school_name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de plants</label>
                <input
                  type="number"
                  value={editForm.plants_count}
                  onChange={(e) => setEditForm({...editForm, plants_count: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position dans le classement</label>
                <input
                  type="number"
                  value={editForm.rank_position}
                  onChange={(e) => setEditForm({...editForm, rank_position: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  min="0"
                  placeholder="0 = ordre par nombre de plants"
                />
                <p className="text-xs text-gray-500 mt-1">Laisser à 0 pour trier automatiquement par nombre de plants</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setEditingSchool(null)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{selectedSchool.school_name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du contact</label>
                <p className="text-gray-900">{selectedSchool.contact_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedSchool.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <p className="text-gray-900">{selectedSchool.phone || 'Non spécifié'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <p className="text-gray-900">{selectedSchool.city || 'Non spécifiée'}</p>
              </div>
              {selectedSchool.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedSchool.message}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
                <p className="text-gray-900">
                  {new Date(selectedSchool.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedSchool(null)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default TopSchoolsAdminPage;
