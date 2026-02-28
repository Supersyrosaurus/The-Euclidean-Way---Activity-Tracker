import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { UserProfile } from '../types';

export const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    weight: 70,
    height: 175,
    age: 25,
    gender: 'other',
    dailyStepGoal: 10000,
    dailyCalorieGoal: 2500
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await api.getProfile();
      setProfile(data);
      setFormData(data);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const updated = await api.updateProfile(formData);
    setProfile(updated);
    setEditing(false);
  };

  if (!profile) return <div className="py-20 text-center text-slate-400">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-black border-4 border-white/10 shadow-xl">
            {profile.gender === 'male' ? '👨' : profile.gender === 'female' ? '👩' : '👤'}
          </div>
          <div>
            <h2 className="text-3xl font-black">User Profile</h2>
            <p className="text-slate-400 font-medium">Manage your fitness metrics</p>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Weight (kg)</label>
            {editing ? (
              <input 
                type="number" 
                value={formData.weight} 
                onChange={e => setFormData({...formData, weight: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-xl font-bold text-slate-800">{profile.weight} kg</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Height (cm)</label>
            {editing ? (
              <input 
                type="number" 
                value={formData.height} 
                onChange={e => setFormData({...formData, height: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-xl font-bold text-slate-800">{profile.height} cm</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Age</label>
            {editing ? (
              <input 
                type="number" 
                value={formData.age} 
                onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-xl font-bold text-slate-800">{profile.age} years</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Gender</label>
            {editing ? (
              <select 
                value={formData.gender} 
                onChange={e => setFormData({...formData, gender: e.target.value as any})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-xl font-bold text-slate-800 capitalize">{profile.gender}</p>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Daily Goals</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Step Goal</label>
              {editing ? (
                <input 
                  type="number" 
                  value={formData.dailyStepGoal} 
                  onChange={e => setFormData({...formData, dailyStepGoal: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xl font-bold text-slate-800">{profile.dailyStepGoal?.toLocaleString()} steps</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Calorie Goal</label>
              {editing ? (
                <input 
                  type="number" 
                  value={formData.dailyCalorieGoal} 
                  onChange={e => setFormData({...formData, dailyCalorieGoal: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xl font-bold text-slate-800">{profile.dailyCalorieGoal?.toLocaleString()} kcal</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8">
          {editing ? (
            <div className="flex gap-4">
              <button 
                onClick={handleSave}
                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setEditing(false)}
                className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setEditing(true)}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
