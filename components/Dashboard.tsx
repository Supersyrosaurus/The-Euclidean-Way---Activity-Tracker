
import React from 'react';
import { Activity, Goal, ActivityType } from '../types';

interface DashboardProps {
  activities: Activity[];
  goals: Goal[];
}

export const Dashboard: React.FC<DashboardProps> = ({ activities, goals }) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const todayActivities = activities.filter(a => new Date(a.timestamp).setHours(0, 0, 0, 0) === today);
  
  const getStatsByType = (type: ActivityType) => {
    return todayActivities
      .filter(a => a.type === type)
      .reduce((acc, curr) => acc + curr.value, 0);
  };

  const fitnessValue = getStatsByType('fitness');
  const habitValue = getStatsByType('habit');
  const taskValue = getStatsByType('task');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Good Day, Jane</h1>
          <p className="text-slate-500">Here's what's happening with your activities today.</p>
        </div>
        <div className="text-sm font-medium text-slate-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-orange-100 text-orange-600 rounded-xl text-lg">🔥</span>
            <h3 className="font-bold text-slate-700">Fitness</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">{fitnessValue}</span>
            <span className="text-slate-400 font-medium">min</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Active movement today</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl text-lg">✨</span>
            <h3 className="font-bold text-slate-700">Habits</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">{habitValue}</span>
            <span className="text-slate-400 font-medium">acts</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Consistency is key</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-blue-100 text-blue-600 rounded-xl text-lg">✅</span>
            <h3 className="font-bold text-slate-700">Tasks</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">{taskValue}</span>
            <span className="text-slate-400 font-medium">done</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Check them off the list</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals Progress */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Active Goals</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {goals.slice(0, 3).map(goal => {
              const progress = Math.min(100, (goal.current / goal.target) * 100);
              return (
                <div key={goal.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-700">{goal.name}</span>
                    <span className="text-sm font-bold text-slate-500">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Logs</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">Details</button>
          </div>
          <div className="space-y-4">
            {todayActivities.length === 0 ? (
              <div className="py-10 text-center text-slate-400">
                <p>No activities logged yet today.</p>
              </div>
            ) : (
              todayActivities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      activity.type === 'fitness' ? 'bg-orange-50 text-orange-500' :
                      activity.type === 'habit' ? 'bg-emerald-50 text-emerald-500' :
                      'bg-blue-50 text-blue-500'
                    }`}>
                      {activity.type === 'fitness' ? '🏃' : activity.type === 'habit' ? '💎' : '📝'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{activity.name}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-bold text-slate-700">
                    +{activity.value} <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{activity.unit}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
