import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans'] text-left">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-md">
        
        {/* Brand Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] mx-auto shadow-sm">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Create Your Account</h2>
          <p className="text-xs text-slate-600 font-medium">Join 32,900+ creators making magical surprises</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full py-3.5 text-xs font-bold justify-center shadow-md shadow-pink-500/20"
          >
            <span>Create My Account ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Already have an account? </span>
          <Link to="/login" className="text-xs font-bold text-pink-600 hover:underline">Log in</Link>
        </div>

      </div>
    </div>
  );
}
