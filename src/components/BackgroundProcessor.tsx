import { useEffect, useRef } from 'react';
import { extractTasks } from '@/lib/task-extractor';
import { useNotesStore } from '@/lib/notes-store';
import { useProjectsStore } from '@/lib/projects-store';
import { useStore } from '@/lib/store';

export function BackgroundProcessor() {
  const { notes, updateNote } = useNotesStore();
  const { addProject } = useProjectsStore();
  const { dispatch } = useStore();
  
  const processingIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const processingNotes = notes.filter(n => n.status === 'processing');
    
    processingNotes.forEach(note => {
      if (processingIds.current.has(note.id)) return;
      processingIds.current.add(note.id);
      
      extractTasks(note.content)
        .then(result => {
           let projectId = undefined;
           if (result.project_name) {
             projectId = addProject({
               name: result.project_name,
               color: '#a55eea',
               noteIds: [note.id],
               taskIds: [],
             });
             updateNote(note.id, { projectId });
           }

           result.tasks.forEach(t => {
             let priority: 'low' | 'medium' | 'high' = 'medium';
             if (t.weight >= 7) priority = 'high';
             else if (t.weight <= 3) priority = 'low';

             dispatch({
               type: 'ADD_TASK',
               payload: {
                 title: t.title,
                 priority,
                 dueDate: t.deadline || undefined,
                 estimatedMinutes: t.estimated_minutes || undefined,
               }
             });
           });

           updateNote(note.id, { status: 'processed' });
        })
        .catch(err => {
           console.error("Extraction failed for note:", note.id, err);
           updateNote(note.id, { status: 'saved' }); 
        })
        .finally(() => {
           processingIds.current.delete(note.id);
        });
    });
  }, [notes, addProject, updateNote, dispatch]);

  return null;
}
