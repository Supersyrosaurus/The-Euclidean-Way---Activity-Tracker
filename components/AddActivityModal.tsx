
import React, { useState } from 'react';
import { ActivityType } from '../types';

interface AddActivityModalProps {
  onClose: () => void;
  onSave: (activity: { type: ActivityType; name: string; value: number; unit: string }) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({ onClose, onSave }) => {
  const [type, setType] = useState<ActivityType>('fitness');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  
  const getUnit = () => {
    switch(type) {
      case 'fitness': return 'minutes';
      case 'habit': return 'count';
      case 'task': return 'count';
      default: return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;
    onSave({
      type,
      name,
      value: parseFloat(value),
      unit: getUnit()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-slate-900">Log Activity</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Category</label>
              <div className="grid grid-cols-3 gap-3">
                {(['fitness', 'habit', 'task'] as ActivityType[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-3 rounded-2xl border-2 transition-all font-bold text-xs capitalize ${
                      type === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {t === 'fitness' ? '🏃' : t === 'habit' ? '💎' : '📝'}<br/>{t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Activity Name</label>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Morning Run, Drink Water..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Quantity / Value ({getUnit()})</label>
              <input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium text-slate-800"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all transform active:scale-95"
              >
                Save Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
