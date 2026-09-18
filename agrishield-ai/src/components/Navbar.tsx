import React from 'react';
import { Shield, Sparkles, LayoutDashboard, SlidersHorizontal, Home, Sprout } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  onOpenSimulator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, onOpenSimulator }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-forest-700 via-forest-600 to-emerald-500 flex items-center justify-center shadow-md shadow-forest-900/10 group-hover:scale-105 transition-transform duration-200">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                AgriShield <span className="text-forest-600 font-black">AI</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Decision Support for Smallholder Farmers
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'landing'
                ? 'bg-forest-50 text-forest-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'dashboard'
                ? 'bg-forest-600 text-white shadow-sm shadow-forest-600/30 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {currentView === 'dashboard' && onOpenSimulator && (
            <button
              onClick={onOpenSimulator}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>What-If Simulator</span>
            </button>
          )}

          {/* Demo Mode Badge */}
          <div className="flex items-center space-x-1.5 pl-2 sm:pl-3 border-l border-slate-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide bg-slate-100 text-slate-700 border border-slate-200">
              Demo Mode
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};