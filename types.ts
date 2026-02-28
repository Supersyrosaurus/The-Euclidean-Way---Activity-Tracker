
export type ActivityType = 'fitness' | 'habit' | 'task' | 'steps';

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  caloriesBurned?: number;
}

export interface UserProfile {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'male' | 'female' | 'other';
  dailyStepGoal?: number;
  dailyCalorieGoal?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  type: ActivityType;
}

export interface StepEntry {
  id: string;
  userId: string;
  count: number;
  timestamp: number;
}

export interface Challenge {
  id: string;
  name: string;
  type: 'steps' | 'calories' | 'activities';
  target: number;
  participants: string[];
  leaderboard: {
    userId: string;
    name: string;
    score: number;
  }[];
}

export enum AppView {
  DASHBOARD = 'dashboard',
  LOG = 'log',
  GOALS = 'goals',
  STATS = 'stats',
  PROFILE = 'profile',
  CHALLENGES = 'challenges',
  CATALOGUE = 'catalogue',
  LOGIN = 'login',
  REGISTER = 'register'
}

export interface NavigationItem {
  id: AppView;
  label: string;
  icon: string;
}

// Fix: Defining missing interfaces for PageSection and PageBlueprint required by BlueprintView.tsx
export interface PageSection {
  title: string;
  items: string[];
}

export interface PageBlueprint {
  purpose: string;
  sections: PageSection[];
  actions?: string[];
  dataHierarchy?: string[];
}
