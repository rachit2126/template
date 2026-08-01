import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Users, Eye, TrendingUp, Search, CheckCircle, 
  MessageCircle, ExternalLink, ShieldCheck, Lock, RefreshCw, 
  Database, Plus, Trash2, ArrowUpRight 
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setFallbackOrders();
      }
    } catch (err) {
      setFallbackOrders();
    } finally {
      setLoadingOrders(false);
    }
  };

  const setFallbackOrders = () => {
    setOrders([
      {
        _id: 'ORD-9821',
        customerName: 'Rahul Sharma',
        customerPhone: '+91 98765 43210',
        templateTitle: 'Sweet Birthday',
        price: '₹79 INR',
        status: 'Completed',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'ORD-9822',
        customerName: 'Priya Verma',
        customerPhone: '+91 99887 76655',
        templateTitle: 'Romantic Sky Lanterns',
        price: '₹399 INR',
        status: 'Pending WhatsApp',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        _id: 'ORD-9823',
        customerName: 'Aman Deep',
        customerPhone: '+91 97112 23344',
        templateTitle: 'Cutie Pack (All 17 Templates)',
        price: '₹999 INR',
        status: 'Completed',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        _id: 'ORD-9824',
        customerName: 'Sneha Kapoor',
        customerPhone: '+91 98111 55443',
        templateTitle: 'Friendship Day Special',
        price: '₹309 INR',
        status: 'Completed',
        createdAt: new Date(Date.now() - 14400000).toISOString()
      }
    ]);
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

  const hostedProjects = [
    { id: 'ananya-anniversary-demo', recipient: 'Ananya', template: 'Romantic Sky Lanterns', views: 420, pin: '1234', created: '2026-07-28' },
    { id: 'rahul-birthday', recipient: 'Rahul', template: 'Sweet Birthday', views: 142, pin: 'None', created: '2026-07-30' },
    { id: 'sneha-friendship', recipient: 'Sneha', template: 'Friendship Day', views: 89, pin: '9988', created: '2026-08-01' }
  ];

  // Admin Login Screen without passcode hint in placeholder or error text
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Cutiepage Admin Control Center</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                MongoDB Live 🍃
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Manage orders, user surprise pages, and live MongoDB Atlas data.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchOrders}
            className="btn-secondary text-xs py-2 px-4 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 flex items-center gap-1.5 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="btn-secondary text-xs py-2 px-4 bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 font-bold"
          >
            Logout Admin
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
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">13,420</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% this month
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>TOTAL REVENUE</span>
            <span className="text-xs font-bold text-pink-600">INR ₹</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">₹3,45,800</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24.2% growth
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ACTIVE SURPRISE PAGES</span>
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">40,290</div>
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

      {/* Admin Tabs */}
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
      </div>

      {/* TAB 1: Customer Orders */}
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
            <span className="text-xs text-slate-500 font-medium">Showing recent customer orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Template</th>
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
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        ord.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => handleWhatsAppContact(ord.customerPhone, ord.templateTitle)}
                        className="btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 ml-auto shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

    </div>
  );
}
