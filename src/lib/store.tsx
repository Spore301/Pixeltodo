'use client';

import { useEffect, useReducer, ReactNode } from 'react';

export interface TimeSession {
  startTime: string;
  endTime?: string;
  duration: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
  estimatedMinutes?: number;
  timeSpent: number;
  sessions: TimeSession[];
  isTracking: boolean;
}

interface AppState {
  tasks: Task[];
  activeTab: 'notes' | 'projects' | 'planner';
  filter: 'all' | 'active' | 'completed';
}

type Action =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'completed' | 'completedAt' | 'timeSpent' | 'sessions' | 'isTracking'> }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TAB'; payload: 'notes' | 'projects' | 'planner' }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'START_TRACKING'; payload: string }
  | { type: 'STOP_TRACKING'; payload: string }
  | { type: 'UPDATE_TIME'; payload: { id: string; timeSpent: number } };

const STORAGE_KEY = 'pixeltodo-state';

const initialState: AppState = {
  tasks: [],
  activeTab: 'notes',
  filter: 'all',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completed: false,
            timeSpent: 0,
            sessions: [],
            isTracking: false,
          },
        ],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : undefined,
                isTracking: false,
              }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'LOAD_STATE':
      return action.payload;
    case 'START_TRACKING':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return {
              ...task,
              isTracking: true,
              sessions: [
                ...task.sessions,
                { startTime: new Date().toISOString(), duration: 0 },
              ],
            };
          }
          if (task.isTracking) {
            const lastSession = task.sessions[task.sessions.length - 1];
            const duration = lastSession 
              ? Math.floor((Date.now() - new Date(lastSession.startTime).getTime()) / 1000)
              : 0;
            return {
              ...task,
              isTracking: false,
              timeSpent: task.timeSpent + duration,
              sessions: task.sessions.map((s, i) =>
                i === task.sessions.length - 1
                  ? { ...s, endTime: new Date().toISOString(), duration }
                  : s
              ),
            };
          }
          return task;
        }),
      };
    case 'STOP_TRACKING':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload && task.isTracking) {
            const lastSession = task.sessions[task.sessions.length - 1];
            const duration = lastSession
              ? Math.floor((Date.now() - new Date(lastSession.startTime).getTime()) / 1000)
              : 0;
            return {
              ...task,
              isTracking: false,
              timeSpent: task.timeSpent + duration,
              sessions: task.sessions.map((s, i) =>
                i === task.sessions.length - 1
                  ? { ...s, endTime: new Date().toISOString(), duration }
                  : s
              ),
            };
          }
          return task;
        }),
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, timeSpent: action.payload.timeSpent }
            : task
        ),
      };
    default:
      return state;
  }
}

function loadState(): AppState {
  if (typeof window === 'undefined') return initialState;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialState;
    }
  }
  return initialState;
}

function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

import { createContext, useContext } from 'react';

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loaded = loadState();
    dispatch({ type: 'LOAD_STATE', payload: loaded });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
