
import React from 'react';
import { PageBlueprint } from '../types';

interface BlueprintViewProps {
  page: PageBlueprint;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({ page }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Purpose Header */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Goal</h3>
        <p className="text-lg text-slate-700 leading-relaxed font-medium">{page.purpose}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Key Sections */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
            <span className="text-blue-600">01</span> Page Sections / Components
          </h3>
          <div className="space-y-4">
            {page.sections.map((section, idx) => (
              <div key={idx} className="p-4 bg-white border-l-4 border-blue-500 shadow-sm rounded-r-lg">
                <h4 className="font-bold text-slate-800 mb-2">{section.title}</h4>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="mt-1 text-blue-400 text-xs">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Hierarchy */}
        <div className="space-y-8">
          {page.actions && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
                <span className="text-blue-600">02</span> User Actions
              </h3>
              <div className="flex flex-wrap gap-2">
                {page.actions.map((action, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold border border-slate-200">
                    {action}
                  </span>
                ))}
              </div>
            </div>
          )}

          {page.dataHierarchy && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
                <span className="text-blue-600">03</span> Data Hierarchy
              </h3>
              <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm leading-6">
                {page.dataHierarchy.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-emerald-400">➤</span> {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scalability note */}
          <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="text-amber-800 font-bold text-sm mb-2 flex items-center gap-2">
              ⚠️ Technical Consideration
            </h4>
            <p className="text-xs text-amber-700 leading-normal">
              Ensure this view utilizes lazy loading for data intensive lists. 
              The activity log should implement windowing (virtual list) if the record count exceeds 1000 items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
