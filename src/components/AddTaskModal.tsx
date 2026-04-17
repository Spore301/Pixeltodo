'use client';

import { useState, FormEvent } from 'react';
import { PixelButton } from './PixelButton';
import { PixelInput } from './PixelInput';
import styles from './AddTaskModal.module.css';

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    estimatedMinutes?: number;
  }) => void;
}

export function AddTaskModal({ onClose, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    onSubmit({
      title: title.trim(),
      priority,
      dueDate: dueDate || undefined,
      estimatedMinutes: estimatedMinutes ? parseInt(estimatedMinutes) : undefined,
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>&gt; NEW TASK</span>
          <button className={styles.closeBtn} onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.field}>
              <PixelInput
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                error={error}
                autoFocus
              />
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Priority</span>
              <div className={styles.priorityGroup}>
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`${styles.priorityBtn} ${
                      priority === p ? `${styles.selected} ${styles[p]}` : ''
                    }`}
                    onClick={() => setPriority(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Due Date (optional)</span>
              <input
                type="date"
                className={styles.dateInput}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Estimated Time (minutes, optional)</span>
              <input
                type="number"
                className={styles.dateInput}
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(e.target.value)}
                placeholder="e.g. 30"
                min="1"
              />
            </div>
          </div>
          <div className={styles.footer}>
            <PixelButton type="button" variant="ghost" onClick={onClose}>
              Cancel
            </PixelButton>
            <PixelButton type="submit">Create</PixelButton>
          </div>
        </form>
      </div>
    </div>
  );
}
