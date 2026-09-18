import React from 'react';
import { Shield, ArrowRight, HeartPulse, Droplets, CloudSun, CheckCircle2, TrendingUp, Sparkles, MapPin, Layers } from 'lucide-react';

interface LandingPageProps {
  onOpenDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenDashboard }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200/80 mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-semibold text-forest-800 tracking-wide uppercase">
                Purpose-Built for Small & Marginal Farmers
              </span>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-700 via-forest-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-forest-900/15">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                AgriShield <span className="text-forest-600">AI</span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-medium text-forest-800/90 mb-6">
              AI-powered agricultural intelligence for smarter farming decisions.
            </p>

            {/* Problem & Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left my-8">
              
              {/* Problem Statement */}
              <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400"></div>
                <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
                  The Problem
                </div>
                <h2 className="text-base font-semibold text-slate-900 mb-2">
                  Uncertainty & Costly Information Asymmetry
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Smallholder farmers lack affordable tools to anticipate moisture stress, emerging crop diseases, and shifting weather patterns, leading to preventable yield loss and water wastage.
                </p>
              </div>

              {/* Solution Statement */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-forest-500"></div>
                <div className="text-xs font-bold uppercase tracking-wider text-forest-600 mb-1">
                  The Solution
                </div>
                <h2 className="text-base font-semibold text-slate-900 mb-2">
                  Deterministic, Actionable Intelligence
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  AgriShield AI translates microclimate conditions into clear 0–100 health metrics, early irrigation cues, and interactive climate simulation so farmers act proactively.
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenDashboard}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 shadow-lg shadow-forest-800/25 hover:shadow-xl hover:shadow-forest-800/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-xs text-slate-500 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
                <span>Zero setup • Local simulation • Instant insights</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3 Key Feature Cards Section */}
      <section className="py-12 bg-white/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Three Pillars of Intelligent Field Protection
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Precision decision support designed to be clear, understandable, and immediately actionable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Crop Health */}
            <div className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-forest-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Crop Health Monitoring
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Unified vitality score (0–100) calculating vegetative biomass health, nutrient response, and canopy vigour across wheat, rice, and maize.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-forest-700">
                <span>Vegetative Vigor • Biomass Rating</span>
              </div>
            </div>

            {/* Card 2: Smart Irrigation */}
            <div className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Smart Irrigation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Calculates real-time water stress to prevent both wilt strain and over-irrigation. Informs farmers exactly when and how much water is needed.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-sky-700">
                <span>Moisture Deficit • Soil Stress Index</span>
              </div>
            </div>

            {/* Card 3: Disease & Weather Risk */}
            <div className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Disease & Weather Risk
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Early detection of microclimates favorable to fungal sporulation, heatwaves, and rain deficits before symptoms visually appear.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-700">
                <span>7-Day Microclimate • Spore Threat Warning</span>
              </div>
            </div>

          </div>

          {/* Quick Stats Banner */}
          <div className="mt-12 bg-forest-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Active Prototype Deployment</span>
              </div>
              <h4 className="text-xl font-bold">
                Ready for Live Exploration: Green Valley Farm
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                3 dedicated field plots • 6.3 hectares under active observation • Interactive Climate What-If Simulator
              </p>
            </div>
            <button
              onClick={onOpenDashboard}
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>Explore Farm Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};