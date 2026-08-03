import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Users, Eye, TrendingUp, Search, CheckCircle, 
  MessageCircle, ExternalLink, ShieldCheck, Lock, RefreshCw, 
  Database, Plus, Trash2, ArrowUpRight, Edit3, Settings, DollarSign, 
  Image as ImageIcon, AlertCircle, X, Check, Loader2, Sparkles, Filter,
  Layers, Package, Sliders, Tag, BarChart3, Copy, Download, Upload,
  Grid, ListFilter, HelpCircle, Calendar, Shield, Zap, Globe, FileText,
  ChevronRight, ArrowUpDown, MoreHorizontal, Layers3, CheckSquare,
  Activity, Cloud, HardDrive, Smartphone, Monitor
} from 'lucide-react';
import { fetchApi } from '../utils/api';

export default function AdminPage() {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cutiepage_admin_auth') === 'true';
  });

  const [adminPasscode, setAdminPasscode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [passcodeError, setPasscodeError] = useState(false);

  // Tab & Filter States
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'orders' | 'projects' | 'media'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Data States
  const [orders, setOrders] = useState([]);
  const [templatesList, setTemplatesList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals & Drawers
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showProductDrawer, setShowProductDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState('create'); // 'create' | 'edit'
  const [drawerActiveTab, setDrawerActiveTab] = useState('general');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [targetItemToDelete, setTargetItemToDelete] = useState(null); // { type: 'product' | 'order', item }
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Product Form State (Enterprise Multi-Step Form)
  const [prodTitle, setProdTitle] = useState('');
  const [prodSlug, setProdSlug] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodCategory, setProdCategory] = useState('birthday');
  const [prodSubCategory, setProdSubCategory] = useState('Digital Card');
  const [prodTags, setProdTags] = useState('surprise, love, birthday');
  const [prodSKU, setProdSKU] = useState('');
  const [prodBarcode, setProdBarcode] = useState('');
  const [prodPrice, setProdPrice] = useState('₹79');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('₹419');
  const [prodDiscount, setProdDiscount] = useState('81% OFF');
  const [prodCostPrice, setProdCostPrice] = useState('₹20');
  const [prodBadge, setProdBadge] = useState('POPULAR');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80');
  const [prodGallery, setProdGallery] = useState([
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80'
  ]);
  const [prodNewImageUrl, setProdNewImageUrl] = useState('');
  const [prodStock, setProdStock] = useState(100);
  const [prodUnlimitedStock, setProdUnlimitedStock] = useState(true);
  const [prodLowStockAlert, setProdLowStockAlert] = useState(5);
  const [prodFeatured, setProdFeatured] = useState(true);
  const [prodActive, setProdActive] = useState(true);
  const [prodAttributes, setProdAttributes] = useState([
    { key: 'Music Option', value: 'Custom Background Music' },
    { key: 'QR Code', value: 'Instant Download' }
  ]);
  const [prodVariants, setProdVariants] = useState([
    { name: 'Standard Edition', price: '₹79', stock: 100 },
    { name: 'VIP Customization', price: '₹149', stock: 50 }
  ]);
  const [prodMetaTitle, setProdMetaTitle] = useState('');
  const [prodMetaDesc, setProdMetaDesc] = useState('');
  const [prodKeywords, setProdKeywords] = useState('');

  const [isSubmittingProd, setIsSubmittingProd] = useState(false);
  const [prodErrors, setProdErrors] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    const result = await fetchApi('/api/orders');
    if (result.success && Array.isArray(result.data)) {
      setOrders(result.data);
    }
  };

  const fetchProducts = async () => {
    const result = await fetchApi('/api/products');
    if (result.success && Array.isArray(result.data)) {
      console.log(`[AdminPage] Loaded ${result.data.length} products from MongoDB API.`);
      setTemplatesList(result.data);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchOrders(), fetchProducts()]);
    setIsRefreshing(false);
    showToast('✅ Refreshed live data from MongoDB Atlas!');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError(false);
      if (rememberMe) {
        localStorage.setItem('cutiepage_admin_auth', 'true');
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cutiepage_admin_auth');
  };

  const validateProductForm = (title, desc, price, image) => {
    const errs = {};
    if (!title.trim()) errs.title = 'Product title is required';
    if (!desc.trim()) errs.desc = 'Description is required';
    if (!price.trim()) errs.price = 'Price is required';
    if (!image.trim()) errs.image = 'Primary image URL is required';
    setProdErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenAddProduct = () => {
    resetProductForm();
    setDrawerMode('create');
    setEditingProduct(null);
    setDrawerActiveTab('general');
    setShowProductDrawer(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setDrawerMode('edit');
    setProdTitle(prod.title || '');
    setProdSlug(prod.slug || '');
    setProdDesc(prod.description || '');
    setProdShortDesc(prod.shortDesc || prod.description?.slice(0, 80) || '');
    setProdCategory(prod.category || 'love');
    setProdSubCategory(prod.subCategory || 'Interactive Story');
    setProdTags(Array.isArray(prod.tags) ? prod.tags.join(', ') : (prod.tags || 'love, surprise'));
    setProdSKU(prod.sku || `CP-${Math.floor(1000 + Math.random() * 9000)}`);
    setProdBarcode(prod.barcode || `890${Math.floor(100000000 + Math.random() * 900000000)}`);
    setProdPrice(prod.price || '₹399');
    setProdOriginalPrice(prod.originalPrice || '₹799');
    setProdDiscount(prod.discount || '50% OFF');
    setProdCostPrice(prod.costPrice || '₹40');
    setProdBadge(prod.badge || 'POPULAR');
    setProdImage(prod.image || '');
    setProdGallery(Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : [prod.image]);
    setProdStock(prod.stock !== undefined ? prod.stock : 100);
    setProdUnlimitedStock(prod.unlimitedStock !== false);
    setProdLowStockAlert(prod.lowStockAlert || 5);
    setProdFeatured(prod.featured !== false);
    setProdActive(prod.active !== false);
    setProdMetaTitle(prod.metaTitle || prod.title || '');
    setProdMetaDesc(prod.metaDesc || prod.description || '');
    setProdKeywords(prod.keywords || 'gift, memory, cutiepage');
    setDrawerActiveTab('general');
    setShowProductDrawer(true);
  };

  // Single Reusable Delete Trigger Handler
  const handlePromptDelete = (type, item) => {
    if (!item) return;
    setTargetItemToDelete({ type, item });
    setShowDeleteConfirmModal(true);
  };

  // Robust Permanent Deletion with Optimistic UI & Sync
  const confirmDelete = async () => {
    if (!targetItemToDelete || isDeleting) return;

    const { type, item } = targetItemToDelete;
    const targetId = item._id || item.id || item.slug;

    if (!targetId) {
      showToast('❌ Invalid item ID', 'error');
      setShowDeleteConfirmModal(false);
      setTargetItemToDelete(null);
      return;
    }

    setIsDeleting(true);

    try {
      if (type === 'product') {
        // Optimistic UI update: Remove product immediately from local state
        setTemplatesList(prev => prev.filter(p => (p._id || p.id || p.slug) !== targetId));

        // If editing this product in drawer, close drawer
        if (editingProduct && (editingProduct._id || editingProduct.id || editingProduct.slug) === targetId) {
          setShowProductDrawer(false);
          setEditingProduct(null);
        }

        // Call backend API (DELETE /api/products?id=...)
        const result = await fetchApi(`/api/products?id=${targetId}`, { method: 'DELETE' });

        if (result && result.success) {
          showToast(`✓ Product "${item.title || 'Item'}" deleted successfully.`);
        } else {
          showToast(`❌ Could not verify database delete: ${result?.error || 'Server error'}`, 'error');
        }

        // Refetch to ensure backend synchronization
        await fetchProducts();

      } else if (type === 'order') {
        // Optimistic UI update for orders
        setOrders(prev => prev.filter(o => (o._id || o.id) !== targetId));

        const result = await fetchApi(`/api/orders?id=${targetId}`, { method: 'DELETE' });
        if (result && result.success) {
          showToast('✓ Order deleted successfully.');
        } else {
          showToast(`❌ Error deleting order: ${result?.error || 'Server error'}`, 'error');
        }

        await fetchOrders();
      }
    } catch (err) {
      console.error("Delete exception:", err);
      showToast(`❌ Delete failed: ${err.message}`, 'error');
      await fetchProducts();
      await fetchOrders();
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmModal(false);
      setTargetItemToDelete(null);
    }
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!validateProductForm(prodTitle, prodDesc, prodPrice, prodImage)) return;

    setIsSubmittingProd(true);

    const newProdPayload = {
      title: prodTitle.trim(),
      slug: prodSlug.trim() || undefined,
      description: prodDesc.trim(),
      shortDesc: prodShortDesc.trim(),
      category: prodCategory,
      subCategory: prodSubCategory,
      tags: prodTags.split(',').map(t => t.trim()).filter(Boolean),
      sku: prodSKU,
      barcode: prodBarcode,
      price: prodPrice.trim(),
      originalPrice: prodOriginalPrice.trim(),
      discount: prodDiscount.trim(),
      costPrice: prodCostPrice.trim(),
      badge: prodBadge.trim(),
      image: prodImage.trim(),
      images: prodGallery.filter(Boolean),
      stock: Number(prodStock),
      unlimitedStock: prodUnlimitedStock,
      lowStockAlert: Number(prodLowStockAlert),
      featured: prodFeatured,
      active: prodActive,
      attributes: prodAttributes,
      variants: prodVariants,
      metaTitle: prodMetaTitle,
      metaDesc: prodMetaDesc,
      keywords: prodKeywords
    };

    try {
      let result;
      if (drawerMode === 'create') {
        result = await fetchApi('/api/products', {
          method: 'POST',
          body: JSON.stringify(newProdPayload)
        });
      } else if (editingProduct) {
        const targetId = editingProduct._id || editingProduct.id;
        result = await fetchApi(`/api/products?id=${targetId}`, {
          method: 'PUT',
          body: JSON.stringify(newProdPayload)
        });
      }

      if (result && result.success) {
        showToast(drawerMode === 'create' ? '✓ Product Created in MongoDB!' : '✓ Product Updated!');
        await fetchProducts();
        setShowProductDrawer(false);
        resetProductForm();
      } else {
        showToast(`❌ Error: ${result?.error || 'Server Error'}`, 'error');
      }
    } catch (err) {
      console.error("Error saving product", err);
      showToast(`❌ Exception: ${err.message}`, 'error');
    } finally {
      setIsSubmittingProd(false);
    }
  };

  const handleDuplicateProduct = async (prod) => {
    const dupPayload = {
      ...prod,
      title: `${prod.title} (Copy)`,
      slug: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    delete dupPayload._id;
    delete dupPayload.id;

    try {
      const res = await fetchApi('/api/products', {
        method: 'POST',
        body: JSON.stringify(dupPayload)
      });
      if (res.success) {
        showToast(`✓ Duplicated product: "${dupPayload.title}"`);
        await fetchProducts();
      }
    } catch (err) {
      showToast(`❌ Duplicate error: ${err.message}`, 'error');
    }
  };

  const handleExportCSV = () => {
    if (templatesList.length === 0) {
      showToast('No products to export!', 'error');
      return;
    }
    const headers = ['Title', 'Category', 'Price', 'Original Price', 'Badge', 'Featured', 'Active', 'Image URL'];
    const csvRows = [
      headers.join(','),
      ...templatesList.map(p => [
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        `"${p.price}"`,
        `"${p.originalPrice || ''}"`,
        `"${p.badge || ''}"`,
        p.featured ? 'TRUE' : 'FALSE',
        p.active !== false ? 'TRUE' : 'FALSE',
        `"${p.image}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cutiepage_catalog_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('📊 Catalog CSV Exported!');
  };

  const resetProductForm = () => {
    setProdTitle('');
    setProdSlug('');
    setProdDesc('');
    setProdShortDesc('');
    setProdCategory('birthday');
    setProdSubCategory('Digital Card');
    setProdTags('surprise, love, birthday');
    setProdSKU('');
    setProdBarcode('');
    setProdPrice('₹79');
    setProdOriginalPrice('₹419');
    setProdDiscount('81% OFF');
    setProdCostPrice('₹20');
    setProdBadge('POPULAR');
    setProdImage('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80');
    setProdGallery(['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80']);
    setProdStock(100);
    setProdUnlimitedStock(true);
    setProdLowStockAlert(5);
    setProdFeatured(true);
    setProdActive(true);
    setProdAttributes([
      { key: 'Music Option', value: 'Custom Background Music' },
      { key: 'QR Code', value: 'Instant Download' }
    ]);
    setProdVariants([
      { name: 'Standard Edition', price: '₹79', stock: 100 }
    ]);
    setProdMetaTitle('');
    setProdMetaDesc('');
    setProdKeywords('');
    setProdErrors({});
  };

  const handleAddGalleryImage = () => {
    if (!prodNewImageUrl.trim()) return;
    setProdGallery(prev => [...prev, prodNewImageUrl.trim()]);
    setProdNewImageUrl('');
  };

  const handleRemoveGalleryImage = (index) => {
    setProdGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddAttribute = () => {
    setProdAttributes(prev => [...prev, { key: 'Custom Field', value: 'Value' }]);
  };

  const handleRemoveAttribute = (idx) => {
    setProdAttributes(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddVariant = () => {
    setProdVariants(prev => [...prev, { name: 'New Edition', price: '₹199', stock: 50 }]);
  };

  const handleRemoveVariant = (idx) => {
    setProdVariants(prev => prev.filter((_, i) => i !== idx));
  };

  const handleWhatsAppContact = (phone, title) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hi! Order update from Cutiepage Admin regarding your template "${title}". How can we help you? 💖`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const filteredTemplates = useMemo(() => {
    return templatesList.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;

      let matchesStatus = true;
      if (selectedStatusFilter === 'featured') matchesStatus = item.featured === true;
      if (selectedStatusFilter === 'active') matchesStatus = item.active !== false;
      if (selectedStatusFilter === 'inactive') matchesStatus = item.active === false;

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const pA = parseInt((a.price || '0').replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt((b.price || '0').replace(/[^0-9]/g, '')) || 0;
        return pA - pB;
      }
      if (sortBy === 'price-high') {
        const pA = parseInt((a.price || '0').replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt((b.price || '0').replace(/[^0-9]/g, '')) || 0;
        return pB - pA;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [templatesList, searchQuery, selectedCategoryFilter, selectedStatusFilter, sortBy]);

  const featuredCount = useMemo(() => templatesList.filter(t => t.featured).length, [templatesList]);
  const activeCount = useMemo(() => templatesList.filter(t => t.active !== false).length, [templatesList]);

  const totalRevenueCalc = useMemo(() => {
    return orders.reduce((sum, order) => {
      const priceNum = parseInt((order.price || '0').replace(/[^0-9]/g, '')) || 0;
      return sum + priceNum;
    }, 0);
  }, [orders]);

  const hostedProjects = [
    { id: 'ananya-anniversary-demo', recipient: 'Roshni', template: 'Romantic Sky Lanterns', views: 420, pin: '1234', created: '2026-07-28' },
    { id: 'rahul-birthday', recipient: 'Rahul', template: 'Sweet Birthday', views: 142, pin: 'None', created: '2026-07-30' },
    { id: 'sneha-friendship', recipient: 'Sneha', template: 'Friendship Day', views: 89, pin: '9988', created: '2026-08-01' }
  ];

  // Admin Login Screen (Light Theme)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 font-['Plus_Jakarta_Sans'] text-left bg-slate-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-xl"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto text-white shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Cutiepage Admin Control Panel</h1>
            <p className="text-xs text-slate-600 font-medium">Enter your administrative passcode to manage products & orders</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Admin Passcode</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin123)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-purple-600 font-medium"
                />
              </div>
              {passcodeError && (
                <p className="text-[11px] text-rose-600 font-bold">Incorrect passcode! Try "admin123".</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
                <span>Remember session on this browser</span>
              </label>
            </div>

            <button type="submit" className="w-full py-3.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2">
              <span>Access Admin Panel</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans'] text-left pb-16">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-extrabold ${
              toastMessage.type === 'error' ? 'bg-rose-900 text-white border-rose-700' : 'bg-emerald-900 text-white border-emerald-700'
            }`}
          >
            <span>{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="opacity-70 hover:opacity-100 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md text-2xl">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Cutiepage Admin Control Center</h1>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  MongoDB Atlas Live 🍃
                </span>
                <span className="bg-purple-50 text-purple-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-purple-200">
                  Cloudinary Ready ☁️
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Enterprise product catalog management, order processing, and live static deployment control.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button 
              onClick={handleOpenAddProduct}
              className="py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 
              <span>Add Product</span>
            </button>

            <button 
              onClick={handleExportCSV}
              className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> 
              <span>Export CSV</span>
            </button>

            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} /> 
              <span>{isRefreshing ? 'Syncing...' : 'Sync Data'}</span>
            </button>
            
            <button 
              onClick={handleAdminLogout}
              className="py-2.5 px-3.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs rounded-xl font-bold transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dynamic KPI Metrics Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>TOTAL PRODUCTS</span>
              <ShoppingBag className="w-4 h-4 text-pink-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{templatesList.length}</div>
            <div className="text-[11px] text-pink-600 font-bold flex items-center justify-between">
              <span>Saved in MongoDB</span>
              <span className="text-slate-500 font-medium">Live Active</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>CUSTOMER ORDERS</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{orders.length}</div>
            <div className="text-[11px] text-purple-600 font-bold flex items-center justify-between">
              <span>Total Revenue</span>
              <span className="font-bold text-emerald-600">₹{totalRevenueCalc}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>FEATURED SLIDER</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{featuredCount}</div>
            <div className="text-[11px] text-amber-600 font-bold">Hero Carousel Items</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>DATABASE & SERVER</span>
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-extrabold text-emerald-700 font-['Outfit'] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Cluster0 Live
            </div>
            <div className="text-[11px] text-slate-500 font-medium">cutiepage.mongodb.net</div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold overflow-x-auto">
          <button 
            onClick={() => setActiveTab('templates')}
            className={`pb-3.5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'templates' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <Package className="w-4 h-4" />
            <span>Templates Catalog ({templatesList.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-3.5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'orders' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`pb-3.5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'projects' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <Globe className="w-4 h-4" />
            <span>Live Hosted Pages ({hostedProjects.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('media')}
            className={`pb-3.5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'media' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media Library</span>
          </button>
        </div>

        {/* TAB 1: Templates Catalog Table */}
        {activeTab === 'templates' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by title, category..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-600 font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold w-full md:w-auto">
                <select 
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="birthday">Birthday</option>
                  <option value="love">Love & Romantic</option>
                  <option value="friendship">Friendship</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="proposal">Proposal</option>
                </select>

                <select 
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="featured">Featured Slider</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Title: A-Z</option>
                </select>

                <button 
                  onClick={handleOpenAddProduct}
                  className="py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ml-auto md:ml-0"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[11px] tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4">Thumbnail</th>
                    <th className="py-3.5 px-4">Template Title & Slug</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Hero Slider</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredTemplates.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500 space-y-2">
                        <Package className="w-10 h-10 mx-auto text-slate-400" />
                        <div className="font-bold text-sm">No templates found</div>
                        <p className="text-xs text-slate-500">Try adjusting your search query or filters.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredTemplates.map((prod) => (
                      <tr key={prod._id || prod.slug} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-sm"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>{prod.title}</span>
                            {prod.badge && (
                              <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full border border-purple-200 font-extrabold uppercase">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-pink-600 font-mono">/products/{prod.slug}</div>
                          {prod.description && (
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{prod.description}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="capitalize font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px]">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 font-['Outfit'] text-sm">
                          <div className="text-purple-700">{prod.price}</div>
                          {prod.originalPrice && (
                            <div className="text-[10px] text-slate-400 line-through font-normal">{prod.originalPrice}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {prod.featured ? (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                              <Sparkles className="w-3 h-3" /> Featured
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {prod.active !== false ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDuplicateProduct(prod)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                              title="Duplicate Product"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handlePromptDelete('product', prod)}
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        {/* TAB 2: Customer Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">Customer Orders List</h2>
              <button 
                onClick={() => setShowAddOrderModal(true)}
                className="py-2 px-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Order
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[11px] tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">Template Title</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-slate-500 font-medium">
                        No customer orders recorded yet. Click "Add Order" above to create one.
                      </td>
                    </tr>
                  ) : (
                    orders.map((ord) => (
                      <tr key={ord._id || ord.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{ord.customerName}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{ord.customerPhone}</td>
                        <td className="py-3.5 px-4 font-semibold text-purple-700">{ord.templateTitle}</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700 font-['Outfit']">{ord.price}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                            {ord.status || 'Pending WhatsApp'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleWhatsAppContact(ord.customerPhone, ord.templateTitle)}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </button>
                            <button 
                              onClick={() => handlePromptDelete('order', ord)}
                              className="p-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        {/* TAB 3: Live Hosted Pages */}
        {activeTab === 'projects' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">Live Hosted Projects & Surprises</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {hostedProjects.map((p) => (
                <div key={p.id} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{p.template}</span>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
                      Live
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">Recipient: {p.recipient}</div>
                  <div className="text-xs text-slate-600 flex items-center justify-between">
                    <span>PIN Code: <strong className="text-slate-900 font-mono">{p.pin}</strong></span>
                    <span>Views: <strong className="text-pink-600">{p.views}</strong></span>
                  </div>
                  <button 
                    onClick={() => window.open(`/view/${p.id}`, '_blank')}
                    className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer shadow-sm"
                  >
                    <span>View Surprise Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Media Library */}
        {activeTab === 'media' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">Media Library Assets</h2>
                <p className="text-xs text-slate-500">Direct CDN image links stored across products & templates</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {templatesList.map((prod, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl space-y-2 group relative">
                  <img src={prod.image} alt={prod.title} className="w-full aspect-square object-cover rounded-xl border border-slate-200" />
                  <div className="text-[11px] font-bold text-slate-900 truncate">{prod.title}</div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(prod.image);
                      showToast('📋 Image URL copied to clipboard!');
                    }}
                    className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    <Copy className="w-3 h-3" /> Copy URL
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ==================================================
          ENTERPRISE MULTI-STEP PRODUCT DRAWER (LIGHT THEME)
      ================================================== */}
      <AnimatePresence>
        {showProductDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden text-slate-900">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProductDrawer(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-4xl bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between font-['Plus_Jakarta_Sans']">
                
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                        {drawerMode === 'create' ? 'Create New Product' : `Edit "${editingProduct?.title}"`}
                      </h2>
                      <p className="text-xs text-slate-500">Configure product details, pricing, inventory, and dynamic attributes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {drawerMode === 'edit' && editingProduct && (
                      <button 
                        type="button"
                        onClick={() => handlePromptDelete('product', editingProduct)}
                        className="py-2 px-3 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                    <button 
                      onClick={() => setShowProductDrawer(false)}
                      className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Drawer Navigation Tabs */}
                <div className="flex border-b border-slate-200 px-6 bg-slate-50 overflow-x-auto text-xs font-bold">
                  {[
                    { id: 'general', label: 'General', icon: Layers },
                    { id: 'media', label: 'Media & Gallery', icon: ImageIcon },
                    { id: 'pricing', label: 'Pricing & Profit', icon: DollarSign },
                    { id: 'inventory', label: 'Inventory', icon: Package },
                    { id: 'attributes', label: 'Custom Attributes', icon: Sliders },
                    { id: 'variants', label: 'Variants', icon: Layers3 },
                    { id: 'seo', label: 'SEO & Social', icon: Globe }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setDrawerActiveTab(t.id)}
                      className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                        drawerActiveTab === t.id ? 'border-pink-600 text-pink-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <t.icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Drawer Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                  
                  {/* TAB 1: General */}
                  {drawerActiveTab === 'general' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Product Title *</label>
                          <input 
                            type="text"
                            value={prodTitle}
                            onChange={(e) => setProdTitle(e.target.value)}
                            placeholder="e.g. Sweet Birthday Surprise"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                          />
                          {prodErrors.title && <p className="text-[11px] text-rose-600 font-bold">{prodErrors.title}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Custom URL Slug</label>
                          <input 
                            type="text"
                            value={prodSlug}
                            onChange={(e) => setProdSlug(e.target.value)}
                            placeholder="e.g. sweet-birthday-surprise"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Category *</label>
                          <select 
                            value={prodCategory}
                            onChange={(e) => setProdCategory(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none cursor-pointer"
                          >
                            <option value="birthday">Birthday</option>
                            <option value="love">Love & Romantic</option>
                            <option value="friendship">Friendship</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="proposal">Proposal</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Badge Label</label>
                          <input 
                            type="text"
                            value={prodBadge}
                            onChange={(e) => setProdBadge(e.target.value)}
                            placeholder="e.g. POPULAR, BESTSELLER, BUNDLE"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Full Description *</label>
                        <textarea 
                          rows={4}
                          value={prodDesc}
                          onChange={(e) => setProdDesc(e.target.value)}
                          placeholder="Detailed product features, instructions, and surprise details..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                        />
                        {prodErrors.desc && <p className="text-[11px] text-rose-600 font-bold">{prodErrors.desc}</p>}
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                          <input 
                            type="checkbox"
                            checked={prodFeatured}
                            onChange={(e) => setProdFeatured(e.target.checked)}
                            className="w-4 h-4 accent-pink-600 rounded cursor-pointer"
                          />
                          <span>Show in Home Hero Slider</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                          <input 
                            type="checkbox"
                            checked={prodActive}
                            onChange={(e) => setProdActive(e.target.checked)}
                            className="w-4 h-4 accent-pink-600 rounded cursor-pointer"
                          />
                          <span>Active in Catalog Pages</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Media & Gallery */}
                  {drawerActiveTab === 'media' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Primary Cover Image URL *</label>
                        <input 
                          type="text"
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                        />
                      </div>

                      {prodImage && (
                        <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-md">
                          <img src={prodImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="pt-4 space-y-3 border-t border-slate-200">
                        <label className="text-xs font-bold text-slate-700 block">Additional Gallery Image URLs</label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            value={prodNewImageUrl}
                            onChange={(e) => setProdNewImageUrl(e.target.value)}
                            placeholder="Enter additional image URL..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                          />
                          <button 
                            type="button"
                            onClick={handleAddGalleryImage}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold cursor-pointer border border-slate-200"
                          >
                            Add URL
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-3 pt-2">
                          {prodGallery.map((url, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square">
                              <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Pricing */}
                  {drawerActiveTab === 'pricing' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Selling Price *</label>
                          <input 
                            type="text"
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            placeholder="e.g. ₹79"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none font-bold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Original Price (Strikethrough)</label>
                          <input 
                            type="text"
                            value={prodOriginalPrice}
                            onChange={(e) => setProdOriginalPrice(e.target.value)}
                            placeholder="e.g. ₹419"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Discount Badge Text</label>
                          <input 
                            type="text"
                            value={prodDiscount}
                            onChange={(e) => setProdDiscount(e.target.value)}
                            placeholder="e.g. 81% OFF"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Estimated Cost Price</label>
                          <input 
                            type="text"
                            value={prodCostPrice}
                            onChange={(e) => setProdCostPrice(e.target.value)}
                            placeholder="e.g. ₹20"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Inventory */}
                  {drawerActiveTab === 'inventory' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">SKU Code</label>
                          <input 
                            type="text"
                            value={prodSKU}
                            onChange={(e) => setProdSKU(e.target.value)}
                            placeholder="e.g. CP-8849"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Barcode</label>
                          <input 
                            type="text"
                            value={prodBarcode}
                            onChange={(e) => setProdBarcode(e.target.value)}
                            placeholder="e.g. 890123456789"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input 
                          type="checkbox"
                          checked={prodUnlimitedStock}
                          onChange={(e) => setProdUnlimitedStock(e.target.checked)}
                          className="w-4 h-4 accent-pink-600 rounded cursor-pointer"
                        />
                        <label className="text-xs font-bold text-slate-700">Unlimited Digital Stock Available</label>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: Attributes */}
                  {drawerActiveTab === 'attributes' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">Dynamic Key-Value Custom Specifications</label>
                        <button 
                          type="button" 
                          onClick={handleAddAttribute}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Attribute
                        </button>
                      </div>

                      <div className="space-y-2">
                        {prodAttributes.map((attr, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input 
                              type="text"
                              value={attr.key}
                              onChange={(e) => {
                                const newAttrs = [...prodAttributes];
                                newAttrs[idx].key = e.target.value;
                                setProdAttributes(newAttrs);
                              }}
                              placeholder="Key Name"
                              className="w-1/3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                            />
                            <input 
                              type="text"
                              value={attr.value}
                              onChange={(e) => {
                                const newAttrs = [...prodAttributes];
                                newAttrs[idx].value = e.target.value;
                                setProdAttributes(newAttrs);
                              }}
                              placeholder="Specification Value"
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                            />
                            <button 
                              type="button"
                              onClick={() => handleRemoveAttribute(idx)}
                              className="p-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl hover:bg-rose-100 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: Variants */}
                  {drawerActiveTab === 'variants' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">Product Editions & Variations</label>
                        <button 
                          type="button" 
                          onClick={handleAddVariant}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Variant
                        </button>
                      </div>

                      <div className="space-y-2">
                        {prodVariants.map((v, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input 
                              type="text"
                              value={v.name}
                              onChange={(e) => {
                                const newV = [...prodVariants];
                                newV[idx].name = e.target.value;
                                setProdVariants(newV);
                              }}
                              placeholder="Variant Name"
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                            />
                            <input 
                              type="text"
                              value={v.price}
                              onChange={(e) => {
                                const newV = [...prodVariants];
                                newV[idx].price = e.target.value;
                                setProdVariants(newV);
                              }}
                              placeholder="Price"
                              className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-pink-600 focus:outline-none font-bold"
                            />
                            <button 
                              type="button"
                              onClick={() => handleRemoveVariant(idx)}
                              className="p-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl hover:bg-rose-100 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 7: SEO */}
                  {drawerActiveTab === 'seo' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">SEO Meta Title</label>
                        <input 
                          type="text"
                          value={prodMetaTitle}
                          onChange={(e) => setProdMetaTitle(e.target.value)}
                          placeholder="e.g. Cutiepage - Sweet Birthday Surprise Card"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">SEO Meta Description</label>
                        <textarea 
                          rows={3}
                          value={prodMetaDesc}
                          onChange={(e) => setProdMetaDesc(e.target.value)}
                          placeholder="Brief description for Google Search snippets..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:border-pink-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                  <button 
                    type="button"
                    onClick={() => setShowProductDrawer(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button 
                    type="button"
                    onClick={handleAddProductSubmit}
                    disabled={isSubmittingProd}
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmittingProd && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{drawerMode === 'create' ? 'Save Product into MongoDB' : 'Update Product'}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
              onClick={() => !isDeleting && setShowDeleteConfirmModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-md w-full bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-2xl z-10 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Permanently Delete {targetItemToDelete?.type === 'product' ? 'Product' : 'Order'}?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-slate-900">{targetItemToDelete?.item?.title || targetItemToDelete?.item?.customerName || 'this item'}</strong>? This action will permanently remove it from MongoDB and cannot be undone.
                </p>
              </div>

              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-[11px] text-rose-800 font-medium">
                ⚠️ Warning: Associated catalog links & database references will be permanently removed.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteConfirmModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isDeleting ? 'Deleting...' : 'Delete Item'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
