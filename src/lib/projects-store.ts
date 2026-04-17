import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  color: string;
  noteIds: string[];
  taskIds: string[];
  deadline?: string;
  createdAt: string;
}

interface ProjectsState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => {
        const id = crypto.randomUUID();
        set((state) => ({
          projects: [
            ...state.projects,
            {
              ...project,
              id,
              createdAt: new Date().toISOString(),
            }
          ]
        }));
        return id;
      },
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, ...updates } : p
        )
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      }))
    }),
    {
      name: 'pixelnotes-projects-storage',
    }
  )
);
