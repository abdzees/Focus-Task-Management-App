
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'deadline' | 'task' | 'reminder';
  description?: string;
  createdAt: string;
}

export interface AppSettings {
  darkMode: boolean;
  defaultView: string;
  weekStart: 'sunday' | 'monday';
}

const STORAGE_KEYS = {
  TASKS: 'focus_tasks',
  EVENTS: 'focus_events',
  SETTINGS: 'focus_settings',
};

// Tasks
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
  return saved ? JSON.parse(saved) : [];
};

// Calendar Events
export const saveEvents = (events: CalendarEvent[]) => {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

export const loadEvents = (): CalendarEvent[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
  return saved ? JSON.parse(saved) : [];
};

// Settings
export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const loadSettings = (): AppSettings => {
  const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return saved ? JSON.parse(saved) : {
    darkMode: false,
    defaultView: 'dashboard',
    weekStart: 'monday'
  };
};

// Reset all data
export const resetAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.TASKS);
  localStorage.removeItem(STORAGE_KEYS.EVENTS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
};
