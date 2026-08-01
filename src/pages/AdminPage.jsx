import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Users, Eye, TrendingUp, Search, CheckCircle, 
  MessageCircle, ExternalLink, ShieldCheck, Lock, RefreshCw, 
  Database, Plus, Trash2, ArrowUpRight, Edit3, Settings, DollarSign, Image as ImageIcon
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState('orders'); // orders, projects, templates
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Modals state
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New Order Form state
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newTemplateTitle, setNewTemplateTitle] = useState('Sweet Birthday');
  const [newPrice, setNewPrice] = useState('₹79 INR');

  // New Product Form state
  const [prodTitle, setProdTitle] = useState('');
  const [prodSlug, setProdSlug] = useState('');
  const [prodCategory, setProdCategory] = useState('love');
  const [prodPrice, setProdPrice] = useState('₹399');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('₹798');
  const [prodDiscount, setProdDiscount] = useState('50% OFF');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80');
  const [prodDesc, setProdDesc] = useState('');

  // Initial Templates Catalog state
  const [templatesList, setTemplatesList] = useState([
    { _id: 'sweet-birthday', title: 'Sweet Birthday', category: 'birthday', price: '₹79', originalPrice: '₹419', discount: '81% OFF', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80', status: 'Active' },
    { _id: 'cutie-pack-bundle', title: 'Cutie Pack (All 17 Templates)', category: 'love', price: '₹999', originalPrice: '₹2,583', discount: 'SAVE ₹1,584', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80', status: 'Active' },
    { _id: 'friendship-day', title: 'Friendship Day', category: 'friendship', price: '₹309', originalPrice: '₹618', discount: '50% OFF', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80', status: 'Active' },
    { _id: 'romantic-sky-lanterns', title: 'Romantic Sky Lanterns', category: 'love', price: '₹399', originalPrice: '₹798', discount: '50% OFF', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80', status: 'Active' },
    { _id: 'netflix-style-memory-lane', title: 'Netflix Style Love Story', category: 'love', price: '₹449', originalPrice: '₹898', discount: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80', status: 'Active' }
  ]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.log('MongoDB server offline or no orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setTemplatesList(data);
        }
      }
    } catch (err) {
      console.log('MongoDB products API offline:', err);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleWhatsAppContact = (phone, title) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hi! Order update from Cutiepage Admin regarding your template "${title}". How can we help you? 💖`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const toggleOrderStatus = async (orderId) => {
    const target = orders.find(o => o._id === orderId);
    if (!target) return;
    const nextStatus = target.status === 'Completed' ? 'Pending WhatsApp' : 'Completed';

    setOrders(prev => prev.map(ord => ord._id === orderId ? { ...ord, status: nextStatus } : ord));

    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm(`Delete order ${orderId}?`)) {
      setOrders(prev => prev.filter(ord => ord._id !== orderId));
      try {
        await fetch(`http://localhost:5000/api/orders/${orderId}`, { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (window.confirm(`Delete product?`)) {
      setTemplatesList(prev => prev.filter(t => t._id !== prodId));
      try {
        await fetch(`http://localhost:5000/api/products/${prodId}`, { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClearAllOrders = () => {
    if (window.confirm("Are you sure you want to clear all orders?")) {
      setOrders([]);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    if (!newCustomerName || !newCustomerPhone) return;

    const newOrd = {
      customerName: newCustomerName,
      customerPhone: newCustomerPhone,
      templateTitle: newTemplateTitle,
      price: newPrice,
      status: 'Pending WhatsApp'
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrd)
      });
      if (res.ok) {
        const data = await res.json();
        setOrders([data.order, ...orders]);
      } else {
        const localOrd = { _id: `ORD-${Date.now().toString().slice(-4)}`, ...newOrd };
        setOrders([localOrd, ...orders]);
      }
    } catch (err) {
      const localOrd = { _id: `ORD-${Date.now().toString().slice(-4)}`, ...newOrd };
      setOrders([localOrd, ...orders]);
    }

    setNewCustomerName('');
    setNewCustomerPhone('');
    setShowAddOrderModal(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!prodTitle) return;

    const slug = prodSlug || prodTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newProd = {
      title: prodTitle,
      slug: slug,
      category: prodCategory,
      price: prodPrice,
      originalPrice: prodOriginalPrice,
      discount: prodDiscount,
      image: prodImage || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80',
      description: prodDesc,
      status: 'Active'
    };

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });
      if (res.ok) {
        const data = await res.json();
        setTemplatesList([data.product, ...templatesList]);
      } else {
        const localProd = { _id: slug, ...newProd };
        setTemplatesList([localProd, ...templatesList]);
      }
    } catch (err) {
      const localProd = { _id: slug, ...newProd };
      setTemplatesList([localProd, ...templatesList]);
    }

    setProdTitle('');
    setProdSlug('');
    setProdDesc('');
    setShowAddProductModal(false);
  };

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

            <button type="submit" className="btn-primary w-full py-3.5 text-xs font-bold justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
              Access Admin Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Plus_Jakarta_Sans'] text-left">
      
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
            <p className="text-xs text-slate-600 font-medium">Manage customer orders, live hosted surprise pages, and catalog products with images.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => setShowAddOrderModal(true)}
            className="btn-primary text-xs py-2 px-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Order
          </button>

          <button 
            onClick={() => setShowAddProductModal(true)}
            className="btn-primary text-xs py-2 px-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button 
            onClick={fetchOrders}
            className="btn-secondary text-xs py-2 px-3 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="btn-secondary text-xs py-2 px-3 bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI Overview Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>TOTAL ORDERS</span>
            <ShoppingBag className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{orders.length}</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Live Orders Count
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>TOTAL PRODUCTS</span>
            <span className="text-xs font-bold text-pink-600">INR ₹</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{templatesList.length}</div>
          <div className="text-[11px] text-purple-600 font-bold">Active Templates in Catalog</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ACTIVE SURPRISE PAGES</span>
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{hostedProjects.length}</div>
          <div className="text-[11px] text-purple-600 font-bold">Hosted on Cutiepage Cloud</div>
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

      {/* Admin Control Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'orders' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Customer Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'projects' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Live Hosted Pages ({hostedProjects.length})
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'templates' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Templates Catalog ({templatesList.length})
        </button>
      </div>

      {/* TAB 1: Customer Orders with Working Delete */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders or customer..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>
            
            {orders.length > 0 && (
              <button 
                onClick={handleClearAllOrders}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200"
              >
                Clear All Orders
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto text-xl font-bold">
                🛍️
              </div>
              <h4 className="font-bold text-slate-900">No Orders Available</h4>
              <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                Click "+ Add Order" above to add a real customer order record.
              </p>
            </div>
          ) : (
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
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">{ord._id}</td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{ord.customerName}</div>
                        <div className="text-xs text-slate-500 font-medium">{ord.customerPhone}</div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-purple-700">{ord.templateTitle}</td>
                      <td className="py-4 px-4 font-black text-slate-900">{ord.price}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleOrderStatus(ord._id)}
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                            ord.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          {ord.status} ⚡
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleWhatsAppContact(ord.customerPhone, ord.templateTitle)}
                          className="btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </button>

                        <button 
                          onClick={() => handleDeleteOrder(ord._id)}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Live Hosted Pages */}
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
                        className="btn-secondary text-xs py-1.5 px-3 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 ml-auto flex items-center gap-1 font-bold"
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

      {/* TAB 3: Templates Catalog with Working Add Product & Delete Product */}
      {activeTab === 'templates' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Manage Product Catalog & Pricing</span>
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="btn-primary text-xs py-1.5 px-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Template Title</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Discount Badge</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {templatesList.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">{t.title}</td>
                    <td className="py-4 px-4 font-black text-purple-700">{t.price}</td>
                    <td className="py-4 px-4">
                      <span className="text-[10px] font-extrabold bg-pink-100 text-pink-800 px-2.5 py-0.5 rounded-full">
                        {t.discount}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/products/${t._id}`)}
                        className="btn-secondary text-xs py-1.5 px-3 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 font-bold flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Details
                      </button>

                      <button 
                        onClick={() => handleDeleteProduct(t._id)}
                        className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">Add New Customer Order</h3>
            
            <form onSubmit={handleAddOrder} className="space-y-3 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="e.g. Roshni"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-600"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="space-y-1">
                <label>Template Title</label>
                <select 
                  value={newTemplateTitle}
                  onChange={(e) => setNewTemplateTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-600"
                >
                  <option>Sweet Birthday</option>
                  <option>Cutie Pack (All 17 Templates)</option>
                  <option>Romantic Sky Lanterns</option>
                  <option>Friendship Day</option>
                </select>
              </div>

              <div className="space-y-1">
                <label>Price INR</label>
                <input 
                  type="text" 
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddOrderModal(false)}
                  className="btn-secondary py-2 px-4 text-xs font-bold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs font-bold bg-purple-600 text-white"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product / Template Modal with Image */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">Add New Product / Template</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label>Product Title</label>
                <input 
                  type="text" 
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  placeholder="e.g. Valentine Surprise Card"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-600"
                />
              </div>

              <div className="space-y-1">
                <label>Category</label>
                <select 
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-600"
                >
                  <option value="love">Love & Romance</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="friendship">Friendship</option>
                  <option value="apology">Apology</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label>Price INR</label>
                  <input 
                    type="text" 
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-600"
                  />
                </div>
                <div className="space-y-1">
                  <label>Discount Badge</label>
                  <input 
                    type="text" 
                    value={prodDiscount}
                    onChange={(e) => setProdDiscount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label>Product Image URL</label>
                <input 
                  type="text" 
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="Image URL (e.g. https://images.unsplash.com/...)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddProductModal(false)}
                  className="btn-secondary py-2 px-4 text-xs font-bold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs font-bold bg-pink-600 text-white"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
