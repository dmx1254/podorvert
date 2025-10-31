import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Users, Mail, CreditCard, MessageSquare, Heart, HelpCircle, GraduationCap, Shield, Sprout } from 'lucide-react';

interface AdminSession {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);

  const currentSection = searchParams.get('section') || 'dashboard';

  useEffect(() => {
    const sessionData = localStorage.getItem('admin_session');
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const handleNavigation = (section: string) => {
    setSearchParams({ section });
    setSidebarOpen(false);
  };

  const menuItems = [
    { section: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { section: 'plant-requests', label: 'Demandes de Plants', icon: Sprout },
    { section: 'partners', label: 'Partenaires', icon: Users },
    { section: 'newsletter', label: 'Newsletter', icon: Mail },
    { section: 'member-cards', label: 'Cartes Membre', icon: CreditCard },
    { section: 'contacts', label: 'Messages Contact', icon: MessageSquare },
    { section: 'sponsor-messages', label: 'Messages Parrains', icon: Heart },
    { section: 'quiz', label: 'Quiz CO₂', icon: HelpCircle },
    { section: 'schools', label: 'Top Écoles', icon: GraduationCap },
  ];

  if (session?.role === 'super_admin') {
    menuItems.push({ section: 'manage-admins', label: 'Gérer Admins', icon: Shield });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <img
                  src="/images/logo-podorvert.png"
                  alt="Podor Vert"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Espace Admin</h1>
                <p className="text-green-100 text-sm">Podor Vert</p>
              </div>
            </div>
            {session && (
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-white text-sm font-medium">{session.full_name}</p>
                <p className="text-green-100 text-xs">{session.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  {session.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.section;
              return (
                <button
                  key={item.section}
                  onClick={() => handleNavigation(item.section)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-72 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
