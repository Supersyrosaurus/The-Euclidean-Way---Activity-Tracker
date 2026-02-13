
import React, { useState } from 'react';
import { Activity } from '../types';

interface ActivityLogProps {
  activities: Activity[];
  onDelete: (id: string) => void;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activities, onDelete }) => {
  const [filter, setFilter] = useState<'all' | 'fitness' | 'habit' | 'task'>('all');

  const filteredActivities = activities
    .filter(a => filter === 'all' || a.type === filter)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-black text-slate-800">Full History</h2>
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          {['all', 'fitness', 'habit', 'task'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 sm:px-4 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Activity</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Value</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic">
                    No activities found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredActivities.map(activity => (
                  <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          activity.type === 'fitness' ? 'bg-orange-100 text-orange-600' :
                          activity.type === 'habit' ? 'bg-emerald-100 text-emerald-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'fitness' ? '🏃' : activity.type === 'habit' ? '💎' : '📝'}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800">{activity.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-700">{activity.value}</span>
                      <span className="ml-1 text-xs text-slate-400 uppercase">{activity.unit}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                      {new Date(activity.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onDelete(activity.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete entry"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
