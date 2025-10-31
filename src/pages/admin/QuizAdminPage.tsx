import React, { useState, useEffect } from 'react';
import { HelpCircle, Trash2, Search, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';

interface QuizResponse {
  id: string;
  question: string;
  answer: string;
  is_correct: boolean;
  user_email: string;
  created_at: string;
}

const QuizAdminPage: React.FC = () => {
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<QuizResponse | null>(null);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Error fetching quiz responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réponse?')) return;

    try {
      const { error } = await supabase
        .from('quiz_responses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchResponses();
    } catch (error) {
      console.error('Error deleting response:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const filteredResponses = responses.filter(resp =>
    resp.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resp.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const correctCount = filteredResponses.filter(r => r.is_correct).length;
  const totalCount = filteredResponses.length;
  const successRate = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : 0;

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz CO₂</h1>
          <p className="text-gray-600">Gérer les réponses au quiz sur le CO₂</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par question ou email..."
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
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Réponse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Résultat
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
                {filteredResponses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <HelpCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>Aucune réponse au quiz trouvée</p>
                    </td>
                  </tr>
                ) : (
                  filteredResponses.map((response) => (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{response.question}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {response.answer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {response.user_email || 'Anonyme'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          response.is_correct
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {response.is_correct ? 'Correct' : 'Incorrect'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(response.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedResponse(response)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(response.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm mb-1">Réponses totales</p>
            <p className="font-bold text-3xl">{filteredResponses.length}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm mb-1">Réponses correctes</p>
            <p className="font-bold text-3xl">{correctCount}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm mb-1">Taux de réussite</p>
            <p className="font-bold text-3xl">{successRate}%</p>
          </div>
        </div>
      </div>

      {selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Détails de la réponse</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <p className="text-gray-900">{selectedResponse.question}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Réponse</label>
                <p className="text-gray-900">{selectedResponse.answer}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedResponse.user_email || 'Anonyme'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Résultat</label>
                <p className={`text-2xl font-bold ${selectedResponse.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedResponse.is_correct ? 'Correct ✓' : 'Incorrect ✗'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <p className="text-gray-900">
                  {new Date(selectedResponse.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedResponse(null)}
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

export default QuizAdminPage;
