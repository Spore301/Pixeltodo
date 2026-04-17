import { Note } from '@/lib/notes-store';
import styles from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  let indicator = null;
  
  if (note.status === 'editing') {
    indicator = <span className={`${styles.indicator} ${styles.indicatorYellow} blink`} title="Watching"></span>;
  } else if (note.status === 'processing') {
    indicator = <span className={`${styles.indicator} ${styles.indicatorCyan} flicker`} title="Thinking..."></span>;
  } else if (note.status === 'processed') {
    indicator = <span className={`${styles.indicator} ${styles.indicatorGreen}`} title="Done ✓">✓</span>;
  }

  return (
    <div 
      className={`${styles.card} ${styles[note.status]}`} 
      onClick={onClick}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{note.title || 'Untitled Note'}</h3>
        {indicator}
      </div>
      <div className={styles.contentPreview}>
        {note.content ? note.content.substring(0, 80) + '...' : <span className={styles.empty}>Empty</span>}
      </div>
      <div className={styles.footer}>
        {note.projectId ? (
          <span className={styles.projectBadge}>proj: ●</span>
        ) : (
          <span className={styles.words}>{note.wordCount} words</span>
        )}
      </div>
    </div>
  );
}
