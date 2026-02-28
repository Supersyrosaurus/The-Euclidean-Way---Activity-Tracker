import { Activity, Goal, User, UserProfile, StepEntry, Challenge } from '../types';

const API_URL = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('at_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const api = {
  async login(credentials: any) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async register(data: any) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async getProfile(): Promise<UserProfile> {
    const res = await fetch(`${API_URL}/profile`, { headers: getHeaders() });
    return res.json();
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profile)
    });
    return res.json();
  },

  async getActivities(): Promise<Activity[]> {
    const res = await fetch(`${API_URL}/activities`, { headers: getHeaders() });
    return res.json();
  },

  async addActivity(activity: Partial<Activity>): Promise<Activity> {
    const res = await fetch(`${API_URL}/activities`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(activity)
    });
    return res.json();
  },

  async getGoals(): Promise<Goal[]> {
    const res = await fetch(`${API_URL}/goals`, { headers: getHeaders() });
    return res.json();
  },

  async addGoal(goal: Partial<Goal>): Promise<Goal> {
    const res = await fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(goal)
    });
    return res.json();
  },

  async getSteps(): Promise<StepEntry[]> {
    const res = await fetch(`${API_URL}/steps`, { headers: getHeaders() });
    return res.json();
  },

  async addSteps(steps: Partial<StepEntry>): Promise<StepEntry> {
    const res = await fetch(`${API_URL}/steps`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(steps)
    });
    return res.json();
  },

  async getChallenges(): Promise<Challenge[]> {
    const res = await fetch(`${API_URL}/challenges`, { headers: getHeaders() });
    return res.json();
  },

  async joinChallenge(id: string): Promise<Challenge> {
    const res = await fetch(`${API_URL}/challenges/${id}/join`, {
      method: 'POST',
      headers: getHeaders()
    });
    return res.json();
  }
};
