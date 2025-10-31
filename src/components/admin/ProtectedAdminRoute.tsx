import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminSession {
  id: string;
  email: string;
  full_name: string;
  role: string;
  logged_in_at: string;
}

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
  requireSuperAdmin = false
}) => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionData = localStorage.getItem('admin_session');
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        setSession(parsed);
      } catch (error) {
        console.error('Error parsing session:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireSuperAdmin && session.role !== 'super_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions nécessaires.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
