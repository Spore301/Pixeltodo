import { useEffect, useState, useRef } from 'react';
import { useNotesStore } from '@/lib/notes-store';
import { SaveIndicator } from './SaveIndicator';
import styles from './NoteEditor.module.css';

interface NoteEditorProps {
  noteId: string;
  onClose: () => void;
}

export function NoteEditor({ noteId, onClose }: NoteEditorProps) {
  const { notes, updateNote } = useNotesStore();
  const note = notes.find((n) => n.id === noteId);
  
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  const titleRef = useRef<HTMLInputElement>(null);

  // Autosave
  useEffect(() => {
    if (!note) return;
    const isChanged = title !== note.title || content !== note.content;
    if (!isChanged) return;

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      updateNote(noteId, { title, content, status: 'editing' });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000); 
    
    return () => clearTimeout(timer);
  }, [title, content, noteId, updateNote, note]);

  // Focus title on mount if empty
  useEffect(() => {
    if (!note?.title && titleRef.current) {
      titleRef.current.focus();
    }
  }, [note]);

  if (!note) return null;

  const handleClose = () => {
    const changed = title !== note.title || content !== note.content || note.status === 'editing';
    if (changed && content.trim()) {
      updateNote(noteId, { title, content, status: 'processing' });
    } else {
      updateNote(noteId, { status: 'saved' });
    }
    onClose();
  };

  const handleTriggerAI = () => {
    if (!content.trim()) {
      alert("Write something first!");
      return;
    }
    updateNote(noteId, { title, content, status: 'processing' });
    onClose();
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <button className={styles.iconBtn} onClick={handleClose}>[←]</button>
          <button className={styles.iconBtn} onClick={() => updateNote(noteId, { title, content, status: 'saved' })}>[💾]</button>
        </header>

        <div className={styles.editorBody}>
          <div className={styles.pad}>
            <input
              ref={titleRef}
              className={styles.titleInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Note"
            />
            
            <div className={styles.contentWrapper}>
              <textarea
                className={styles.contentInput}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write freely, Scribe will understand context and extract actionable items when you're done."
              />
            </div>

            <div className={styles.tags}>
              Tags: <button className={styles.addTagBtn}>[+ add]</button>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.meta}>
            {wordCount} words · <SaveIndicator status={saveStatus} />
          </div>
          <button className={styles.doneBtn} onClick={handleTriggerAI}>[✨ Done]</button>
        </footer>
      </div>
    </div>
  );
}
