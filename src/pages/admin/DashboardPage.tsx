import React, { useState, useEffect } from 'react';
import { Users, Mail, CreditCard, MessageSquare, Heart, HelpCircle, GraduationCap, TrendingUp, Sprout } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    partners: 0,
    newsletter: 0,
    memberCards: 0,
    contacts: 0,
    sponsorMessages: 0,
    quizResponses: 0,
    topSchools: 0,
    admins: 0,
    plantRequests: 0,
  });

  const [partnersByType, setPartnersByType] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        partnersRes,
        newsletterRes,
        memberCardsRes,
        contactsRes,
        sponsorMessagesRes,
        quizResponsesRes,
        topSchoolsRes,
        adminsRes,
        plantRequestsRes
      ] = await Promise.all([
        supabase.from('partners').select('*', { count: 'exact' }),
        supabase.from('newsletter').select('*', { count: 'exact' }),
        supabase.from('member_cards').select('*', { count: 'exact' }),
        supabase.from('contacts').select('*', { count: 'exact' }),
        supabase.from('sponsor_messages').select('*', { count: 'exact' }),
        supabase.from('quiz_responses').select('*', { count: 'exact' }),
        supabase.from('top_schools').select('*', { count: 'exact' }),
        supabase.from('admins').select('*', { count: 'exact' }),
        supabase.from('plant_requests').select('*', { count: 'exact' })
      ]);

      setStats({
        partners: partnersRes.count || 0,
        newsletter: newsletterRes.count || 0,
        memberCards: memberCardsRes.count || 0,
        contacts: contactsRes.count || 0,
        sponsorMessages: sponsorMessagesRes.count || 0,
        quizResponses: quizResponsesRes.count || 0,
        topSchools: topSchoolsRes.count || 0,
        admins: adminsRes.count || 0,
        plantRequests: plantRequestsRes.count || 0,
      });

      const partners = partnersRes.data || [];
      const typeCount: Record<string, number> = {};
      partners.forEach((p: any) => {
        const type = p.partner_type || 'Entreprise';
        typeCount[type] = (typeCount[type] || 0) + 1;
      });

      setPartnersByType(
        Object.entries(typeCount).map(([name, value]) => ({ name, value }))
      );

      const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
      const monthCounts: Record<number, number> = {};

      partners.forEach((p: any) => {
        const month = new Date(p.created_at).getMonth();
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      setMonthlyData(
        monthNames.map((name, index) => ({
          name,
          inscriptions: monthCounts[index] || 0
        }))
      );
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Demandes de Plants', value: stats.plantRequests, icon: Sprout, color: 'emerald', bgColor: 'bg-emerald-100', textColor: 'text-emerald-600' },
    { label: 'Partenaires', value: stats.partners, icon: Users, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-600' },
    { label: 'Newsletter', value: stats.newsletter, icon: Mail, color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { label: 'Cartes Membre', value: stats.memberCards, icon: CreditCard, color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
    { label: 'Messages', value: stats.contacts, icon: MessageSquare, color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-600' },
    { label: 'Parrains', value: stats.sponsorMessages, icon: Heart, color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-600' },
    { label: 'Quiz', value: stats.quizResponses, icon: HelpCircle, color: 'teal', bgColor: 'bg-teal-100', textColor: 'text-teal-600' },
    { label: 'Écoles', value: stats.topSchools, icon: GraduationCap, color: 'indigo', bgColor: 'bg-indigo-100', textColor: 'text-indigo-600' },
    { label: 'Admins', value: stats.admins, icon: TrendingUp, color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-600' },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#f97316', '#ef4444', '#14b8a6', '#6366f1'];

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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
          <p className="text-gray-600">Vue d'ensemble de l'activité Podor Vert</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Répartition des Partenaires</h2>
            {partnersByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={partnersByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {partnersByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-20">Aucune donnée disponible</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Inscriptions Mensuelles</h2>
            {monthlyData.some(d => d.inscriptions > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="inscriptions" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-20">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Bienvenue sur votre Tableau de Bord</h2>
          <p className="text-green-100">
            Gérez efficacement toutes les activités de Podor Vert depuis cet espace administrateur.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
