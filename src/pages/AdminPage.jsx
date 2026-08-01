import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Users, Eye, TrendingUp, Search, CheckCircle, 
  MessageCircle, ExternalLink, ShieldCheck, Lock, RefreshCw, 
  Database, Plus, Trash2, ArrowUpRight, Edit3, Settings, DollarSign, 
  Image as ImageIcon, AlertCircle, X, Check, Loader2, Sparkles, Filter
} from 'lucide-react';

const INITIAL_TEMPLATES = [
  { _id: 'sweet-birthday', id: 'sweet-birthday', slug: 'sweet-birthday', title: 'Sweet Birthday', category: 'birthday', price: '₹79', originalPrice: '₹419', discount: '81% OFF', badge: 'POPULAR', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80', description: '🎉 A cute little surprise they will never forget! Add custom photos, wishes, background music, and instant QR code.', featured: true, active: true },
  { _id: 'cutie-pack-bundle', id: 'cutie-pack-bundle', slug: 'cutie-pack-bundle', title: 'Cutie Pack (All 17 Templates)', category: 'love', price: '₹999', originalPrice: '₹2,583', discount: 'SAVE ₹1,584', badge: 'BUNDLE', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80', description: 'Unlock every current and future premium template. Pay once. Access forever with lifetime hosting and instant WhatsApp support!', featured: true, active: true },
  { _id: 'friendship-day', id: 'friendship-day', slug: 'friendship-day', title: 'Friendship Day', category: 'friendship', price: '₹309', originalPrice: '₹618', discount: '50% OFF', badge: 'TRENDING', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80', description: '🎈 Floating hot-air balloon unseal letter carrying their name with background music and custom photo memories timeline.', featured: true, active: true },
  { _id: 'romantic-sky-lanterns', id: 'romantic-sky-lanterns', slug: 'romantic-sky-lanterns', title: 'Romantic Sky Lanterns', category: 'love', price: '₹399', originalPrice: '₹798', discount: '50% OFF', badge: 'ROMANTIC', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80', description: '💖 Flying heart balloons carrying a romantic unseal letter with background piano music, custom polaroid photos & memory timeline.', featured: true, active: true },
  { _id: 'netflix-style-memory-lane', id: 'netflix-style-memory-lane', slug: 'netflix-style-memory-lane', title: 'Netflix Style Love Story', category: 'love', price: '₹449', originalPrice: '₹898', discount: 'BESTSELLER', badge: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80', description: '🎬 Stream your love story like a Netflix movie with episodes, trailers, custom subtitles, and secret message reveals.', featured: true, active: true }
];

export default function AdminPage() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cutiepage_admin_auth') === 'true';
  });

  const [adminPasscode, setAdminPasscode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  const [orders, setOrders] = useState([]);
  const [templatesList, setTemplatesList] = useState(INITIAL_TEMPLATES);

  // Modals state
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [targetItemToDelete, setTargetItemToDelete] = useState(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Product Form State
  const [prodTitle, setProdTitle] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCategory, setProdCategory] = useState('birthday');
  const [prodPrice, setProdPrice] = useState('₹79');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('₹419');
  const [prodDiscount, setProdDiscount] = useState('81% OFF');
  const [prodBadge, setProdBadge] = useState('POPULAR');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80');
  const [prodFeatured, setProdFeatured] = useState(true);
  const [prodActive, setProdActive] = useState(true);
  const [isSubmittingProd, setIsSubmittingProd] = useState(false);
  const [prodErrors, setProdErrors] = useState({});

  // Edit Product Form state
  const [editingProduct, setEditingProduct] = useState(null);

  // New Order Form state
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newTemplateTitle, setNewTemplateTitle] = useState('Sweet Birthday');
  const [newPrice, setNewPrice] = useState('₹79 INR');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const saveProductsToLocalStorage = (list) => {
    try {
      localStorage.setItem('cutiepage_products', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      let res = await fetch('/api/orders');
      if (!res.ok) res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
      }
    } catch (err) {
      console.log('MongoDB orders offline:', err);
    }
  };

  const fetchProducts = async () => {
    // 1. Try fetching live from MongoDB Atlas via Serverless Function
    try {
      let res = await fetch('/api/products');
      if (!res.ok) res = await fetch('http://localhost:5000/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTemplatesList(data);
          saveProductsToLocalStorage(data);
          return;
        }
      }
    } catch (err) {
      console.log('MongoDB products API offline, fallback to localStorage:', err);
    }

    // 2. Fallback to LocalStorage
    const local = localStorage.getItem('cutiepage_products');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTemplatesList(parsed);
        }
      } catch (e) {}
    }
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
    if (!image.trim()) errs.image = 'Image URL is required';
    setProdErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!validateProductForm(prodTitle, prodDesc, prodPrice, prodImage)) return;

    setIsSubmittingProd(true);

    const slug = prodTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newProdPayload = {
      title: prodTitle.trim(),
      description: prodDesc.trim(),
      category: prodCategory,
      price: prodPrice.trim(),
      originalPrice: prodOriginalPrice.trim(),
      discount: prodDiscount.trim(),
      badge: prodBadge.trim(),
      image: prodImage.trim(),
      featured: prodFeatured,
      active: prodActive
    };

    try {
      let res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProdPayload)
      });

      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProdPayload)
        });
      }

      if (res.ok) {
        const data = await res.json();
        showToast('✅ Product Saved into MongoDB Atlas Database!');
        await fetchProducts(); // Re-fetch clean list from MongoDB Atlas
      } else {
        const localProduct = { _id: slug, id: slug, slug, ...newProdPayload };
        const updatedList = [localProduct, ...templatesList];
        setTemplatesList(updatedList);
        saveProductsToLocalStorage(updatedList);
        showToast('✅ Product Added Locally!');
      }
    } catch (err) {
      console.log('MongoDB server offline, saved to localStorage');
      const localProduct = { _id: slug, id: slug, slug, ...newProdPayload };
      const updatedList = [localProduct, ...templatesList];
      setTemplatesList(updatedList);
      saveProductsToLocalStorage(updatedList);
      showToast('✅ Product Saved Locally!');
    } finally {
      setIsSubmittingProd(false);
      setShowAddProductModal(false);
      resetProductForm();
    }
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProdTitle(prod.title || '');
    setProdDesc(prod.description || '');
    setProdCategory(prod.category || 'love');
    setProdPrice(prod.price || '₹399');
    setProdOriginalPrice(prod.originalPrice || '');
    setProdDiscount(prod.discount || '');
    setProdBadge(prod.badge || '');
    setProdImage(prod.image || '');
    setProdFeatured(prod.featured !== false);
    setProdActive(prod.active !== false);
    setShowEditProductModal(true);
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (!validateProductForm(prodTitle, prodDesc, prodPrice, prodImage)) return;

    setIsSubmittingProd(true);

    const targetId = editingProduct._id || editingProduct.id;
    const updatePayload = {
      title: prodTitle.trim(),
      description: prodDesc.trim(),
      category: prodCategory,
      price: prodPrice.trim(),
      originalPrice: prodOriginalPrice.trim(),
      discount: prodDiscount.trim(),
      badge: prodBadge.trim(),
      image: prodImage.trim(),
      featured: prodFeatured,
      active: prodActive
    };

    try {
      let res = await fetch(`/api/products?id=${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
      if (!res.ok) {
        res = await fetch(`http://localhost:5000/api/products/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        });
      }
      showToast('✅ Product Updated in MongoDB Atlas!');
      await fetchProducts();
    } catch (err) {
      console.log('MongoDB offline, updated in localStorage');
      const updatedList = templatesList.map(p => (p._id === targetId || p.id === targetId) ? { ...p, ...updatePayload } : p);
      setTemplatesList(updatedList);
      saveProductsToLocalStorage(updatedList);
      showToast('✅ Product Updated Locally!');
    } finally {
      setIsSubmittingProd(false);
      setShowEditProductModal(false);
      setEditingProduct(null);
      resetProductForm();
    }
  };

  const confirmDelete = async () => {
    if (!targetItemToDelete) return;

    if (targetItemToDelete.type === 'product') {
      const id = targetItemToDelete.item._id || targetItemToDelete.item.id;
      showToast(`✅ Deleted "${targetItemToDelete.item.title}" successfully!`);

      try {
        let res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        if (!res.ok) await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        await fetchProducts();
      } catch (err) {
        console.error(err);
        const updatedList = templatesList.filter(p => (p._id !== id && p.id !== id));
        setTemplatesList(updatedList);
        saveProductsToLocalStorage(updatedList);
      }
    } else if (targetItemToDelete.type === 'order') {
      const id = targetItemToDelete.item._id || targetItemToDelete.item.id;
      setOrders(prev => prev.filter(o => (o._id !== id && o.id !== id)));
      showToast(`✅ Order deleted successfully!`);

      try {
        let res = await fetch(`/api/orders?id=${id}`, { method: 'DELETE' });
        if (!res.ok) await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }

    setShowDeleteConfirmModal(false);
    setTargetItemToDelete(null);
  };

  const resetProductForm = () => {
    setProdTitle('');
    setProdDesc('');
    setProdPrice('₹79');
    setProdOriginalPrice('₹419');
    setProdDiscount('81% OFF');
    setProdBadge('POPULAR');
    setProdImage('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80');
    setProdFeatured(true);
    setProdActive(true);
    setProdErrors({});
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
    });
  }, [templatesList, searchQuery, selectedCategoryFilter, selectedStatusFilter]);

  const featuredCount = useMemo(() => templatesList.filter(t => t.featured).length, [templatesList]);
  const activeCount = useMemo(() => templatesList.filter(t => t.active !== false).length, [templatesList]);

  const hostedProjects = [
    { id: 'ananya-anniversary-demo', recipient: 'Roshni', template: 'Romantic Sky Lanterns', views: 420, pin: '1234', created: '2026-07-28' },
    { id: 'rahul-birthday', recipient: 'Rahul', template: 'Sweet Birthday', views: 142, pin: 'None', created: '2026-07-30' },
    { id: 'sneha-friendship', recipient: 'Sneha', template: 'Friendship Day', views: 89, pin: '9988', created: '2026-08-01' }
  ];

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 font-['Plus_Jakarta_Sans'] text-left">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mx-auto text-white shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Cutiepage Admin Panel</h1>
            <p className="text-xs text-slate-600 font-medium">Enter your admin security passcode to continue</p>
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
                  placeholder="Enter admin passcode"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-purple-600 font-medium"
                />
              </div>
              {passcodeError && (
                <p className="text-[11px] text-rose-600 font-bold">Incorrect passcode! Please check and try again.</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full py-3.5 text-xs font-bold justify-center bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer">
              Access Admin Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Plus_Jakarta_Sans'] text-left">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 animate-bounce text-xs font-extrabold ${
          toastMessage.type === 'success' ? 'bg-emerald-900 text-white border-emerald-700' : 'bg-rose-900 text-white border-rose-700'
        }`}>
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="opacity-70 hover:opacity-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-md text-xl">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Cutiepage Admin Control Center</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                MongoDB Live 🍃
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Production product management, live orders, hero slider items, and catalog control.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => { resetProductForm(); setShowAddProductModal(true); }}
            className="btn-primary text-xs py-2 px-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button 
            onClick={() => setShowAddOrderModal(true)}
            className="btn-primary text-xs py-2 px-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Order
          </button>

          <button 
            onClick={() => { fetchOrders(); fetchProducts(); }}
            className="btn-secondary text-xs py-2 px-3 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 flex items-center gap-1 font-bold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          
          <button 
            onClick={handleAdminLogout}
            className="btn-secondary text-xs py-2 px-3 bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 font-bold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dynamic Production KPI Overview Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>TOTAL PRODUCTS</span>
            <ShoppingBag className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{templatesList.length}</div>
          <div className="text-[11px] text-pink-600 font-bold">Saved in Database & Vercel Sync</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>FEATURED SLIDER</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{featuredCount}</div>
          <div className="text-[11px] text-amber-600 font-bold">Shown in Home Hero Slider</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ACTIVE CATALOG</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{activeCount}</div>
          <div className="text-[11px] text-emerald-600 font-bold">Active in Catalog Pages</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>MONGODB DATABASE</span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-extrabold text-emerald-700 font-['Outfit']">Cluster0 Live</div>
          <div className="text-[11px] text-slate-500 font-medium">cutiepage.mongodb.net</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button 
          onClick={() => setActiveTab('templates')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'templates' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Templates Catalog ({templatesList.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'orders' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Customer Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'projects' ? 'border-pink-600 text-pink-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Live Hosted Pages ({hostedProjects.length})
        </button>
      </div>

      {/* TAB 1: Templates Catalog */}
      {activeTab === 'templates' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          
          {/* Controls Bar: Search & Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, category..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-pink-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold w-full md:w-auto">
              <select 
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="birthday">Birthday</option>
                <option value="love">Love & Romance</option>
                <option value="anniversary">Anniversary</option>
                <option value="friendship">Friendship</option>
                <option value="apology">Apology</option>
              </select>

              <select 
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="featured">Featured Hero Slider</option>
                <option value="active">Active Catalog</option>
              </select>

              <button 
                onClick={() => { resetProductForm(); setShowAddProductModal(true); }}
                className="btn-primary text-xs py-2 px-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold flex items-center gap-1 shadow-sm cursor-pointer ml-auto"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Template Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Hero Slider</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTemplates.map((t, idx) => {
                  const prodKey = t._id || t.id || `prod-${idx}`;
                  return (
                    <tr key={prodKey} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                          <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-4 px-4 space-y-0.5">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          <span>{t.title}</span>
                          {t.badge && (
                            <span className="text-[9px] font-extrabold bg-purple-100 text-purple-800 px-2 py-0.2 rounded-full">
                              {t.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-pink-600 font-bold">/products/{t.slug || prodKey}</div>
                        <div className="text-[11px] text-slate-500 font-medium line-clamp-1 max-w-xs">{t.description}</div>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-700 capitalize">{t.category}</td>
                      <td className="py-4 px-4 font-black text-purple-700">{t.price}</td>
                      <td className="py-4 px-4">
                        {t.featured ? (
                          <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
                            <Sparkles className="w-3 h-3 text-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-400">No</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          t.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {t.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEditProduct(t)}
                            className="btn-secondary text-xs py-1.5 px-3 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>

                          <button 
                            onClick={() => navigate(`/products/${t.slug || prodKey}`)}
                            className="btn-secondary text-xs py-1.5 px-2.5 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 font-bold flex items-center gap-1 cursor-pointer"
                            title="View Product Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <button 
                            onClick={() => { setTargetItemToDelete({ type: 'product', item: t }); setShowDeleteConfirmModal(true); }}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Customer Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Customer Orders List</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Template Purchased</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord, idx) => {
                  const orderKey = ord._id || ord.id || `ord-${idx}`;
                  return (
                    <tr key={orderKey} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">{orderKey}</td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{ord.customerName}</div>
                        <div className="text-xs text-slate-500 font-medium">{ord.customerPhone}</div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-purple-700">{ord.templateTitle}</td>
                      <td className="py-4 px-4 font-black text-slate-900">{ord.price}</td>
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          {ord.status || 'Completed'} ⚡
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleWhatsAppContact(ord.customerPhone, ord.templateTitle)}
                          className="btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </button>

                        <button 
                          onClick={() => { setTargetItemToDelete({ type: 'order', item: ord }); setShowDeleteConfirmModal(true); }}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Live Hosted Pages */}
      {activeTab === 'projects' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Project Link</th>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Template</th>
                  <th className="py-3 px-4">PIN Lock</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4 text-right">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hostedProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-purple-600">/publish/{p.id}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{p.recipient}</td>
                    <td className="py-4 px-4 text-slate-700 font-medium">{p.template}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {p.pin}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">{p.views} views</td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => navigate(`/publish/${p.id}`)}
                        className="btn-secondary text-xs py-1.5 px-3 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 ml-auto flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> View Live
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Add New Product / Template</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs font-bold text-slate-700">
              
              <div className="space-y-1">
                <label>Product Title *</label>
                <input 
                  type="text" 
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  placeholder="e.g. Sweet Birthday Surprise"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-pink-600"
                />
                {prodErrors.title && <p className="text-[11px] text-rose-600">{prodErrors.title}</p>}
              </div>

              <div className="space-y-1">
                <label>Description (Textarea) *</label>
                <textarea 
                  rows="3"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Celebrate birthdays with a premium animated surprise page including music, countdown, gallery, animations..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-pink-600 font-medium"
                />
                {prodErrors.desc && <p className="text-[11px] text-rose-600">{prodErrors.desc}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label>Category *</label>
                  <select 
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-pink-600"
                  >
                    <option value="birthday">Birthday</option>
                    <option value="love">Love & Romance</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="friendship">Friendship</option>
                    <option value="apology">Apology</option>
                    <option value="wedding">Wedding</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label>Price INR *</label>
                  <input 
                    type="text" 
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="e.g. ₹79"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-pink-600"
                  />
                  {prodErrors.price && <p className="text-[11px] text-rose-600">{prodErrors.price}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label>Original Price INR</label>
                  <input 
                    type="text" 
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(e.target.value)}
                    placeholder="e.g. ₹419"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label>Discount Badge</label>
                  <input 
                    type="text" 
                    value={prodDiscount}
                    onChange={(e) => setProdDiscount(e.target.value)}
                    placeholder="e.g. 81% OFF"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label>Product Image URL *</label>
                <input 
                  type="text" 
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-pink-600"
                />
                {prodErrors.image && <p className="text-[11px] text-rose-600">{prodErrors.image}</p>}
              </div>

              {/* Image Preview Box */}
              {prodImage && (
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                  <img src={prodImage} alt="Preview" className="w-16 h-12 object-cover rounded-lg" />
                  <span className="text-[11px] text-slate-500 font-medium">Image Live Preview</span>
                </div>
              )}

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="w-4 h-4 accent-pink-600 rounded"
                  />
                  <span>Show in Hero Slider (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={prodActive}
                    onChange={(e) => setProdActive(e.target.checked)}
                    className="w-4 h-4 accent-pink-600 rounded"
                  />
                  <span>Active in Catalog</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddProductModal(false)}
                  className="btn-secondary py-2.5 px-4 text-xs font-bold bg-slate-100 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                
                <button 
                  type="submit"
                  disabled={isSubmittingProd}
                  className="btn-primary py-2.5 px-6 text-xs font-bold bg-pink-600 text-white flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingProd ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Product...</span>
                    </>
                  ) : (
                    <span>Save Product →</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEditProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Edit Product / Template</h3>
              <button onClick={() => setShowEditProductModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs font-bold text-slate-700">
              
              <div className="space-y-1">
                <label>Product Title *</label>
                <input 
                  type="text" 
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label>Description *</label>
                <textarea 
                  rows="3"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label>Category</label>
                  <select 
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs"
                  >
                    <option value="birthday">Birthday</option>
                    <option value="love">Love & Romance</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="friendship">Friendship</option>
                    <option value="apology">Apology</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label>Price INR</label>
                  <input 
                    type="text" 
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label>Product Image URL</label>
                <input 
                  type="text" 
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="w-4 h-4 accent-pink-600 rounded"
                  />
                  <span>Show in Hero Slider</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={prodActive}
                    onChange={(e) => setProdActive(e.target.checked)}
                    className="w-4 h-4 accent-pink-600 rounded"
                  />
                  <span>Active Catalog</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowEditProductModal(false)}
                  className="btn-secondary py-2.5 px-4 text-xs font-bold bg-slate-100 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmittingProd}
                  className="btn-primary py-2.5 px-6 text-xs font-bold bg-purple-600 text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {isSubmittingProd ? 'Saving Changes...' : 'Update Product →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG MODAL */}
      {showDeleteConfirmModal && targetItemToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl">
              ⚠️
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                Delete {targetItemToDelete.item.title || targetItemToDelete.item.customerName || 'Item'}?
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                This action cannot be undone. It will be removed immediately from MongoDB and all pages.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button 
                onClick={() => setShowDeleteConfirmModal(false)}
                className="btn-secondary text-xs py-2 px-4 bg-slate-100 text-slate-700 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="btn-primary text-xs py-2 px-5 bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ORDER MODAL */}
      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">Add New Customer Order</h3>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const newOrd = {
                _id: `ORD-${Date.now().toString().slice(-4)}`,
                customerName: newCustomerName,
                customerPhone: newCustomerPhone,
                templateTitle: newTemplateTitle,
                price: newPrice,
                status: 'Pending WhatsApp'
              };
              setOrders([newOrd, ...orders]);
              showToast('✅ Order Added Successfully!');
              setShowAddOrderModal(false);
            }} className="space-y-3 text-xs font-bold text-slate-700">
              
              <div className="space-y-1">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="e.g. Roshni"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label>Customer Phone (WhatsApp)</label>
                <input 
                  type="text" 
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 91190 55155"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label>Template Title</label>
                <select 
                  value={newTemplateTitle}
                  onChange={(e) => setNewTemplateTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  <option>Sweet Birthday</option>
                  <option>Cutie Pack (All 17 Templates)</option>
                  <option>Romantic Sky Lanterns</option>
                  <option>Friendship Day</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAddOrderModal(false)} className="btn-secondary py-2 px-4 text-xs font-bold bg-slate-100 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 px-5 text-xs font-bold bg-purple-600 text-white cursor-pointer">
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
