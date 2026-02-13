
export type ActivityType = 'fitness' | 'habit' | 'task';

export interface Activity {
  id: string;
  type: ActivityType;
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  type: ActivityType;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  LOG = 'log',
  GOALS = 'goals',
  STATS = 'stats',
  PROFILE = 'profile'
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
