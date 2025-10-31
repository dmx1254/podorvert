import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Shield, User, Mail, Lock, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';

interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

const ManageAdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'admin'
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      alert('Erreur lors du chargement des administrateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingAdmin && !formData.password) {
      alert('Le mot de passe est requis pour un nouvel administrateur');
      return;
    }

    try {
      if (editingAdmin) {
        const updateData: any = {
          email: formData.email,
          full_name: formData.full_name,
          role: formData.role,
          updated_at: new Date().toISOString()
        };

        if (formData.password) {
          updateData.password_hash = formData.password;
        }

        const { error } = await supabase
          .from('admins')
          .update(updateData)
          .eq('id', editingAdmin.id);

        if (error) throw error;
        alert('Administrateur mis à jour avec succès');
      } else {
        const { error } = await supabase.from('admins').insert([{
          email: formData.email,
          full_name: formData.full_name,
          password_hash: formData.password,
          role: formData.role,
          is_active: true
        }]);

        if (error) throw error;
        alert('Administrateur créé avec succès');
      }

      setShowModal(false);
      setEditingAdmin(null);
      setFormData({ email: '', full_name: '', password: '', role: 'admin' });
      fetchAdmins();
    } catch (error: any) {
      console.error('Error saving admin:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormData({
      email: admin.email,
      full_name: admin.full_name,
      password: '',
      role: admin.role
    });
    setShowModal(true);
  };

  const handleDelete = async (adminId: string, adminEmail: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'administrateur ${adminEmail} ?`)) return;

    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      alert('Administrateur supprimé avec succès');
      fetchAdmins();
    } catch (error: any) {
      console.error('Error deleting admin:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const toggleActive = async (admin: Admin) => {
    try {
      const { error } = await supabase
        .from('admins')
        .update({ is_active: !admin.is_active })
        .eq('id', admin.id);

      if (error) throw error;

      alert(`Administrateur ${!admin.is_active ? 'activé' : 'désactivé'} avec succès`);
      fetchAdmins();
    } catch (error: any) {
      console.error('Error toggling admin status:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Gérer les Administrateurs</h1>
            <p className="text-gray-600">Total: <span className="font-semibold text-green-600">{admins.length}</span> administrateur(s)</p>
          </div>
          <button
            onClick={() => {
              setEditingAdmin(null);
              setFormData({ email: '', full_name: '', password: '', role: 'admin' });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvel Admin</span>
          </button>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nom</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rôle</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Dernière connexion</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {admins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        Aucun administrateur
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleActive(admin)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              admin.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {admin.is_active ? 'Actif' : 'Inactif'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{admin.full_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1 ${
                            admin.role === 'super_admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {admin.role === 'super_admin' ? (
                              <>
                                <Shield className="w-3 h-3" />
                                Super Admin
                              </>
                            ) : (
                              <>
                                <User className="w-3 h-3" />
                                Admin
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {admin.last_login
                            ? new Date(admin.last_login).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'Jamais connecté'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(admin)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(admin.id, admin.email)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingAdmin ? 'Modifier Admin' : 'Nouvel Admin'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAdmin(null);
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Jean Dupont"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="admin@podorvert.org"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe {editingAdmin && '(laisser vide pour ne pas modifier)'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingAdmin}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rôle
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAdmin(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{editingAdmin ? 'Mettre à jour' : 'Créer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageAdminsPage;
