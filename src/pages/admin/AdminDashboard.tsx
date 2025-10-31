import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardPage from './DashboardPage';
import PlantRequestsAdminPage from './PlantRequestsAdminPage';
import PartnersAdminPage from './PartnersAdminPage';
import NewsletterAdminPage from './NewsletterAdminPage';
import MemberCardsAdminPage from './MemberCardsAdminPage';
import ContactsAdminPage from './ContactsAdminPage';
import SponsorMessagesAdminPage from './SponsorMessagesAdminPage';
import QuizAdminPage from './QuizAdminPage';
import TopSchoolsAdminPage from './TopSchoolsAdminPage';
import ManageAdminsPage from './ManageAdminsPage';

interface AdminSession {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<AdminSession | null>(null);

  const section = searchParams.get('section') || 'dashboard';

  useEffect(() => {
    const sessionData = localStorage.getItem('admin_session');
    if (!sessionData) {
      navigate('/admin/login');
      return;
    }
    setSession(JSON.parse(sessionData));
  }, [navigate]);

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <DashboardPage />;
      case 'plant-requests':
        return <PlantRequestsAdminPage />;
      case 'partners':
        return <PartnersAdminPage />;
      case 'newsletter':
        return <NewsletterAdminPage />;
      case 'member-cards':
        return <MemberCardsAdminPage />;
      case 'contacts':
        return <ContactsAdminPage />;
      case 'sponsor-messages':
        return <SponsorMessagesAdminPage />;
      case 'quiz':
        return <QuizAdminPage />;
      case 'schools':
        return <TopSchoolsAdminPage />;
      case 'manage-admins':
        if (session?.role === 'super_admin') {
          return <ManageAdminsPage />;
        }
        return <DashboardPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return <>{renderSection()}</>;
};

export default AdminDashboard;
