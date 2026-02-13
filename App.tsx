
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ActivityLog } from './components/ActivityLog';
import { AddActivityModal } from './components/AddActivityModal';
import { AppView, Activity, Goal, ActivityType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // State Initialization from Local Storage
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('at_activities');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('at_goals');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Daily Exercise', target: 30, current: 0, unit: 'minutes', type: 'fitness' },
      { id: '2', name: 'Water Intake', target: 8, current: 0, unit: 'glasses', type: 'habit' },
      { id: '3', name: 'Deep Work', target: 4, current: 0, unit: 'hours', type: 'task' },
    ];
  });

  // Persist to Local Storage
  useEffect(() => {
    localStorage.setItem('at_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('at_goals', JSON.stringify(goals));
  }, [goals]);

  // Sync Goals with Activities (Simulated simple current sum for the day)
  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayActivities = activities.filter(a => new Date(a.timestamp).setHours(0, 0, 0, 0) === today);
    
    setGoals(prev => prev.map(goal => {
      const current = todayActivities
        .filter(a => a.type === goal.type && a.name.toLowerCase().includes(goal.name.split(' ')[0].toLowerCase()))
        .reduce((sum, a) => sum + a.value, 0);
      return { ...goal, current: current || 0 };
    }));
  }, [activities]);

  const handleAddActivity = (data: { type: ActivityType; name: string; value: number; unit: string }) => {
    const newActivity: Activity = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard activities={activities} goals={goals} />;
      case AppView.LOG:
        return <ActivityLog activities={activities} onDelete={handleDeleteActivity} />;
      case AppView.GOALS:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
            <span className="text-6xl">🎯</span>
            <p className="font-bold text-lg text-slate-600">Advanced Goal Setting coming soon!</p>
            <p className="max-w-md text-center">Track your long-term milestones and habit streaks with our next update.</p>
          </div>
        );
      case AppView.STATS:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
            <span className="text-6xl">📊</span>
            <p className="font-bold text-lg text-slate-600">Analytics Dashboard coming soon!</p>
            <p className="max-w-md text-center">In-depth charts and patterns visualization is currently in development.</p>
          </div>
        );
      case AppView.PROFILE:
        return (
          <div className="bg-white p-10 rounded-3xl border border-slate-100 max-w-2xl mx-auto shadow-sm">
             <div className="flex items-center gap-6 mb-8">
               <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl text-white font-black shadow-xl shadow-blue-200 border-4 border-white">JD</div>
               <div>
                  <h2 className="text-2xl font-black text-slate-900">Jane Doe</h2>
                  <p className="text-slate-500 font-medium italic">"Stronger every day."</p>
               </div>
             </div>
             <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Email</span>
                  <span className="font-bold text-slate-700">jane.doe@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Member Since</span>
                  <span className="font-bold text-slate-700">January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Total Activities</span>
                  <span className="font-bold text-slate-700">{activities.length}</span>
                </div>
             </div>
          </div>
        );
      default:
        return <Dashboard activities={activities} goals={goals} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      onAddClick={() => setIsAddModalOpen(true)}
    >
      {renderContent()}
      
      {isAddModalOpen && (
        <AddActivityModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleAddActivity}
        />
      )}
    </Layout>
  );
};

export default App;
