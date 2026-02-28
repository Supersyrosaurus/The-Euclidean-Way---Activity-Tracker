
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ActivityLog } from './components/ActivityLog';
import { AddActivityModal } from './components/AddActivityModal';
import { Auth } from './components/Auth';
import { ProfileView } from './components/ProfileView';
import { ExerciseCatalogue } from './components/ExerciseCatalogue';
import { ChallengesView } from './components/ChallengesView';
import { StatsView } from './components/StatsView';
import { AppView, Activity, Goal, ActivityType, User, StepEntry } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('at_token'));
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [steps, setSteps] = useState<StepEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const [actData, goalData, stepData] = await Promise.all([
        api.getActivities(),
        api.getGoals(),
        api.getSteps()
      ]);
      setActivities(actData);
      setGoals(goalData);
      setSteps(stepData);
    } catch (e) {
      console.error('Failed to fetch data', e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const savedUser = localStorage.getItem('at_user');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token, fetchData]);

  const handleAuthSuccess = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('at_token', authToken);
    localStorage.setItem('at_user', JSON.stringify(userData));
    setActiveView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('at_token');
    localStorage.removeItem('at_user');
    setActiveView(AppView.LOGIN);
  };

  const calculateCalories = (type: ActivityType, value: number, name: string) => {
    if (type !== 'fitness' || !user?.profile) return 0;
    // Simple MET mapping
    const metMap: Record<string, number> = { 'running': 8, 'walking': 3.5, 'cycling': 7.5, 'swimming': 7, 'yoga': 2.5 };
    const met = metMap[name.toLowerCase()] || 4; // Default MET
    const weight = user.profile.weight || 70;
    return Math.round(met * weight * (value / 60));
  };

  const handleAddActivity = async (data: { type: ActivityType; name: string; value: number; unit: string }) => {
    if (data.type === 'steps') {
      const newStep = await api.addSteps({ count: data.value });
      setSteps(prev => [newStep, ...prev]);
    } else {
      const caloriesBurned = calculateCalories(data.type, data.value, data.name);
      const newActivity = await api.addActivity({ ...data, caloriesBurned });
      setActivities(prev => [newActivity, ...prev]);
    }
    fetchData(); // Refresh to update goals
  };

  const renderContent = () => {
    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!user) return <Auth onAuthSuccess={handleAuthSuccess} />;

    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard activities={activities} goals={goals} />;
      case AppView.LOG:
        return <ActivityLog activities={activities} onDelete={() => fetchData()} />;
      case AppView.GOALS:
        return <div className="py-20 text-center">Goal management coming soon!</div>;
      case AppView.CHALLENGES:
        return <ChallengesView />;
      case AppView.CATALOGUE:
        return <ExerciseCatalogue onSelect={(ex) => {
          setIsAddModalOpen(true);
          // Pre-fill logic could go here
        }} />;
      case AppView.STATS:
        return <StatsView activities={activities} steps={steps} />;
      case AppView.PROFILE:
        return <ProfileView />;
      default:
        return <Dashboard activities={activities} goals={goals} />;
    }
  };

  if (!token && activeView !== AppView.REGISTER) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      onAddClick={() => setIsAddModalOpen(true)}
      user={user}
      onLogout={handleLogout}
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
