import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Existing Website Layout Components
import AnnouncementBanner from './components/AnnouncementBanner';
import FloatingNavbar from './components/FloatingNavbar';
import FooterNav from './components/FooterNav';

// Existing Website Pages (No Changes)
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

// Memory Vault Independent Module
import MemoryVaultApp from './modules/memory-vault/MemoryVaultApp';
import MemoryVaultAdmin from './modules/memory-vault/editor/MemoryVaultAdmin';
import StoryViewer from './modules/memory-vault/pages/StoryViewer';
import StoryEditor from './modules/memory-vault/editor/StoryEditor';

function AnimatedRoutes() {
  const location = useLocation();

  const isStandalone = location.pathname.startsWith('/editor') || 
                       location.pathname.startsWith('/preview') || 
                       location.pathname.startsWith('/publish') ||
                       location.pathname.startsWith('/admin') ||
                       location.pathname.startsWith('/memory-vault') ||
                       location.pathname.startsWith('/story');

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
              {/* Existing Website Routes (Untouched) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/templates/:slug" element={<TemplateDetailPage />} />
              <Route path="/products" element={<TemplatesPage />} />
              <Route path="/products/:slug" element={<TemplateDetailPage />} />

              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminPage />} />

              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/editor" element={<StoryEditor />} />
              <Route path="/editor/:id" element={<StoryEditor />} />
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

              {/* Memory Vault Modular Product Routes */}
              <Route path="/memory-vault/*" element={<MemoryVaultApp />} />
              <Route path="/memory-vault/editor" element={<MemoryVaultApp initialAdminOpen={true} />} />
              <Route path="/memory-vault/editor/:id" element={<MemoryVaultApp initialAdminOpen={true} />} />
              <Route path="/admin/memory-vault/*" element={<MemoryVaultAdmin />} />
              <Route path="/story/:id" element={<StoryViewer />} />
              <Route path="/editor/:id" element={<StoryEditor />} />

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
