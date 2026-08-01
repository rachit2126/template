import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  const userProjects = [
    {
      id: 'proj-1',
      title: "Ananya's Anniversary Surprise 💖",
      occasion: 'Anniversary',
      status: 'Published',
      views: 142,
      lastEdited: '2 hours ago',
      slug: 'ananya-anniversary-demo'
    },
    {
      id: 'proj-2',
      title: "Rahul's Birthday Bash 🎂",
      occasion: 'Birthday',
      status: 'Draft',
      views: 0,
      lastEdited: 'Yesterday',
      slug: 'rahul-birthday'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left font-['Plus_Jakarta_Sans']">
      
      {/* User Welcome Banner */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="User" 
              className="w-full h-full rounded-[14px] object-cover"
            />
          </div>
          <div>
            <span className="text-xs text-pink-600 font-bold uppercase tracking-wider">Pro Creator Member</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">Welcome back, Rahul! ✨</h1>
            <p className="text-xs text-slate-600 font-medium">You have 2 active surprise pages and 142 total views this week.</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/editor')}
          className="btn-primary py-3.5 px-6 text-xs sm:text-sm shadow-md shadow-pink-500/20 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Create New Surprise Page
        </button>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'projects' ? 'border-pink-600 text-pink-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          My Surprises ({userProjects.length})
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'analytics' ? 'border-pink-600 text-pink-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Analytics & Views
        </button>
        <button 
          onClick={() => setActiveTab('billing')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'billing' ? 'border-pink-600 text-pink-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Billing & Subscription
        </button>
      </div>

      {/* Projects List Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProjects.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300'}`}>
                    {p.status}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-2">{p.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Last edited: {p.lastEdited}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-pink-600 font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {p.views} Views
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button 
                  onClick={() => navigate(`/editor/${p.id}`)}
                  className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit in Studio
                </button>

                <button 
                  onClick={() => navigate(`/publish/${p.slug}`)}
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Live Page
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 text-center shadow-sm">
          <BarChart3 className="w-12 h-12 text-pink-600 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Real-Time Link Analytics</h3>
          <p className="text-xs text-slate-600 font-medium">Your surprise pages received 142 opens, 98 audio plays, and 45 letter unseals this week.</p>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 text-left shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Current Plan: Pro Lifetime Access</h3>
              <p className="text-xs text-slate-600 font-medium">Unlimited surprise pages with lifetime updates</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
              Active Lifetime
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
