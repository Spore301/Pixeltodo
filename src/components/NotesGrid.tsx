import { useState } from 'react';
import { useNotesStore, Note } from '@/lib/notes-store';
import { NoteCard } from './NoteCard';
import { NoteEditor } from './NoteEditor';
import styles from './NotesGrid.module.css';

export function NotesGrid() {
  const { notes, addNote } = useNotesStore();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const handleNewNote = () => {
    const newId = addNote({
      title: '',
      content: '',
      tags: [],
    });
    setEditingNoteId(newId);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>MY NOTES</h2>
        <div className={styles.actions}>
          <button className={styles.newBtn} onClick={handleNewNote}>[+ New]</button>
          <button className={styles.searchBtn}>[🔍]</button>
        </div>
      </header>

      <div className={styles.grid}>
        {notes.map((note) => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onClick={() => setEditingNoteId(note.id)} 
          />
        ))}
        <div className={styles.newCard} onClick={handleNewNote}>
          <div className={styles.newCardContent}>
            <span className={styles.plus}>+</span>
            <span className={styles.newText}>NEW</span>
          </div>
        </div>
      </div>

      {editingNoteId && (
        <NoteEditor 
          noteId={editingNoteId} 
          onClose={() => setEditingNoteId(null)} 
        />
      )}
    </div>
  );
}
