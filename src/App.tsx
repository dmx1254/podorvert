import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, User, Target, Compass, CheckCircle, DollarSign, Users, Mail,Send, Trophy, School, Image, Newspaper } from 'lucide-react';
import { pageview } from './lib/analytics';

import AutoHidingNavbar from './components/AutoHidingNavbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ObjectivesPage from './pages/ObjectivesPage';
import StrategyPage from './pages/StrategyPage';
import ExpectedResultsPage from './pages/ExpectedResultsPage';
import FundingPage from './pages/FundingPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import SocialMediaPage from './pages/SocialMediaPage';
import ContextPage from './pages/ContextPage';
import SponsorsPage from './pages/SponsorsPage';
import GalleryPage from './pages/GalleryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BecomeDonorPage from './pages/BecomeDonorPage';
import BecomePartnerPage from './pages/BecomePartnerPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import EngagementPage from './pages/EngagementPage';
import SchoolsSpacePage from './pages/SchoolsSpacePage';
import MotPresidentPage from './components/mot-president';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

const navItems = [
  { name: 'ACCUEIL', to: '/', icon: Home },
  { name: 'QUI SOMMES-NOUS', to: '/qui-sommes-nous', icon: User },
  { name: 'OBJECTIFS', to: '/nos-objectifs', icon: Target },
  { name: 'STRATÉGIE', to: '/notre-strategie', icon: Compass },
  { name: 'RÉSULTATS', to: '/resultats-attendus', icon: CheckCircle },
  { name: 'FINANCEMENT', to: '/source-de-financement', icon: DollarSign },
  { name: 'ACTUALITÉS', to: '/actualites', icon: Newspaper },
  { name: 'NOTRE MÉDIATHÈQUE', to: '/galerie', icon: Image },
];

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') &&
                       location.pathname !== '/admin' &&
                       location.pathname !== '/admin/login';

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {!isAdminRoute && <AutoHidingNavbar items={navItems} />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/qui-sommes-nous" element={<AboutPage />} />
            <Route path="/nos-objectifs" element={<ObjectivesPage />} />
            <Route path="/notre-strategie" element={<StrategyPage />} />
            <Route path="/resultats-attendus" element={<ExpectedResultsPage />} />
            <Route path="/source-de-financement" element={<FundingPage />} />
            <Route path="/notre-equipe" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/medias-sociaux" element={<SocialMediaPage />} />
            <Route path="/contexte-et-justification" element={<ContextPage />} />
            <Route path="/grands-parrains" element={<SponsorsPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
            <Route path="/devenir-donateur" element={<BecomeDonorPage />} />
            <Route path="/devenir-partenaire" element={<BecomePartnerPage />} />
            <Route path="/actualites" element={<NewsPage />} />
            <Route path="/actualites/:id" element={<ArticlePage />} />
            <Route path="/engagement" element={<EngagementPage />} />
            <Route path="/espace-ecoles" element={<SchoolsSpacePage />} />
            <Route path="/mot-president" element={<MotPresidentPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
