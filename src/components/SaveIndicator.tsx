import styles from './SaveIndicator.module.css';

interface SaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved';
}

export function SaveIndicator({ status }: SaveIndicatorProps) {
  if (status === 'idle') return null;

  return (
    <span className={styles.indicator}>
      {status === 'saving' ? (
        <span className="blink">Saving...</span>
      ) : (
        <span className={styles.saved}>Saved ✓</span>
      )}
    </span>
  );
}
