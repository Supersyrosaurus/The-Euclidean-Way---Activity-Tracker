import React, { useState } from 'react';
import { EXERCISE_CATALOGUE } from '../constants';

interface ExerciseCatalogueProps {
  onSelect: (exercise: any) => void;
}

export const ExerciseCatalogue: React.FC<ExerciseCatalogueProps> = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(EXERCISE_CATALOGUE.map(e => e.category)))];

  const filtered = EXERCISE_CATALOGUE.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || e.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search exercises..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                category === cat 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(exercise => (
          <div 
            key={exercise.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
            onClick={() => onSelect(exercise)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                🏋️
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {exercise.category}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">{exercise.name}</h3>
            <p className="text-sm text-slate-500 mb-4">Burn rate: <span className="font-bold text-slate-700">{exercise.met} METs</span></p>
            <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              Log Activity
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
