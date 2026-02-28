
import { NavigationItem, AppView } from './types';

export const NAV_ITEMS: NavigationItem[] = [
  { id: AppView.DASHBOARD, label: 'Dashboard', icon: '🏠' },
  { id: AppView.LOG, label: 'Activity Log', icon: '📋' },
  { id: AppView.GOALS, label: 'Goals', icon: '🎯' },
  { id: AppView.CHALLENGES, label: 'Challenges', icon: '🏆' },
  { id: AppView.CATALOGUE, label: 'Exercises', icon: '🏋️' },
  { id: AppView.STATS, label: 'Statistics', icon: '📊' },
  { id: AppView.PROFILE, label: 'Profile', icon: '👤' },
];

export const EXERCISE_CATALOGUE = [
  { id: '1', name: 'Running', category: 'Cardio', met: 8.0, unit: 'minutes' },
  { id: '2', name: 'Walking', category: 'Cardio', met: 3.5, unit: 'minutes' },
  { id: '3', name: 'Cycling', category: 'Cardio', met: 7.5, unit: 'minutes' },
  { id: '4', name: 'Swimming', category: 'Cardio', met: 7.0, unit: 'minutes' },
  { id: '5', name: 'Weightlifting', category: 'Strength', met: 3.0, unit: 'minutes' },
  { id: '6', name: 'Yoga', category: 'Flexibility', met: 2.5, unit: 'minutes' },
  { id: '7', name: 'Pushups', category: 'Strength', met: 4.0, unit: 'reps' },
  { id: '8', name: 'Plank', category: 'Strength', met: 3.0, unit: 'seconds' },
];
