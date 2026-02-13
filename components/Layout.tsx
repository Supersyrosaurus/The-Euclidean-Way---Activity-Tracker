
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { AppView } from '../types';

interface LayoutProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  children: React.ReactNode;
  onAddClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ activeView, onNavigate, children, onAddClick }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col z-20">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="bg-blue-600 p-1.5 rounded-lg text-sm tracking-tighter">AT</span>
            ActivityTrack
          </h1>
          <p className="text-xs text-slate-500 mt-1">Daily Companion</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                activeView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={onAddClick}
            className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl shadow-md hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Log Activity
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
              JD
            </div>
            <div className="text-xs truncate">
              <p className="text-white font-semibold">Jane Doe</p>
              <p className="text-slate-500">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">
            {NAV_ITEMS.find(n => n.id === activeView)?.label}
          </h2>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Cloud Synced
             </div>
             <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               <span className="text-xl">🔔</span>
             </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>

        <footer className="py-4 px-10 bg-white border-t text-xs text-slate-400 flex justify-between items-center">
          <span>&copy; 2024 ActivityTrack Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
          </div>
        </footer>
      </main>
    </div>
  );
};
