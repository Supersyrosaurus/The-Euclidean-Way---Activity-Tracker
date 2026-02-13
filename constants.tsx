
import { NavigationItem, AppView } from './types';

export const NAV_ITEMS: NavigationItem[] = [
  { id: AppView.DASHBOARD, label: 'Dashboard', icon: '🏠' },
  { id: AppView.LOG, label: 'Activity Log', icon: '📋' },
  { id: AppView.GOALS, label: 'Goals', icon: '🎯' },
  { id: AppView.STATS, label: 'Statistics', icon: '📊' },
  { id: AppView.PROFILE, label: 'Profile', icon: '👤' },
];
