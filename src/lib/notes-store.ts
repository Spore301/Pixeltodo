import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  projectId?: string;
  status: 'editing' | 'saved' | 'processing' | 'processed';
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  wordCount: number;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'wordCount'>) => string;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => {
        const id = crypto.randomUUID();
        set((state) => ({
          notes: [
            ...state.notes,
            {
              ...note,
              id,
              status: 'editing',
              wordCount: note.content ? note.content.trim().split(/\s+/).length : 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          ]
        }));
        return id;
      },
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map((n) => 
          n.id === id 
            ? { 
                ...n, 
                ...updates, 
                wordCount: updates.content !== undefined ? (updates.content.trim() ? updates.content.trim().split(/\s+/).length : 0) : n.wordCount,
                updatedAt: new Date().toISOString() 
              } 
            : n
        )
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((n) => n.id !== id)
      }))
    }),
    {
      name: 'pixelnotes-notes-storage',
    }
  )
);
