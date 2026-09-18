import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { INITIAL_FIELDS } from './data/mockData';
import { FieldId } from './types/farm';
import { Shield, Heart, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>('field-a');

  const handleOpenDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSimulator = () => {
    setCurrentView('dashboard');
    setTimeout(() => {
      const el = document.getElementById('simulator-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenSimulator={handleOpenSimulator}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage onOpenDashboard={handleOpenDashboard} />
        ) : (
          <Dashboard
            fields={fields}
            selectedFieldId={selectedFieldId}
            onSelectField={setSelectedFieldId}
          />
        )}
      </main>

      {/* Clean Modern Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-forest-600 flex items-center justify-center text-white">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">AgriShield AI</span>
            <span>— AI-powered agricultural intelligence for smarter farming decisions.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Demo Mode • Deterministic Decision Engine
            </span>
            <span>Built for Small & Marginal Farmers</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;