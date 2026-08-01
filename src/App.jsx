import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components & Layouts
import AnnouncementBanner from './components/AnnouncementBanner';
import FloatingNavbar from './components/FloatingNavbar';
import FooterNav from './components/FooterNav';

// Pages
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateDetailPage from './pages/TemplateDetailPage';
import FeaturesPage from './pages/FeaturesPage';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';
import PublishPage from './pages/PublishPage';
import PricingPage from './pages/PricingPage';
import ReviewsPage from './pages/ReviewsPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import DocsPage from './pages/DocsPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

// Animated Route Wrapper
function AnimatedRoutes() {
  const location = useLocation();

  // Standalone routes without landing header/footer
  const isStandalone = location.pathname.startsWith('/editor') || 
                       location.pathname.startsWith('/preview') || 
                       location.pathname.startsWith('/publish') ||
                       location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FE] text-slate-900 selection:bg-pink-500 selection:text-white font-['Plus_Jakarta_Sans']">
      {!isStandalone && (
        <>
          <AnnouncementBanner onExplore={() => {}} />
          <FloatingNavbar />
        </>
      )}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              
              {/* Templates & Products Catalog */}
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/templates/:slug" element={<TemplateDetailPage />} />
              <Route path="/products" element={<TemplatesPage />} />
              <Route path="/products/:slug" element={<TemplateDetailPage />} />

              {/* Admin Panel */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminPage />} />

              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:projectId" element={<EditorPage />} />
              <Route path="/preview/:slug" element={<PreviewPage />} />
              <Route path="/publish/:slug" element={<PublishPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!isStandalone && <FooterNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
