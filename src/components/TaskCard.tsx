'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { PixelCheckbox } from './PixelCheckbox';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartTracking?: (id: string) => void;
  onStopTracking?: (id: string) => void;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function TaskCard({ task, onToggle, onDelete, onStartTracking, onStopTracking }: TaskCardProps) {
  const [showStamp, setShowStamp] = useState(false);
  const [wasCompleted, setWasCompleted] = useState(task.completed);
  const [displayTime, setDisplayTime] = useState(task.timeSpent);

  useEffect(() => {
    if (task.completed && !wasCompleted) {
      setShowStamp(true);
    }
    setWasCompleted(task.completed);
  }, [task.completed, wasCompleted]);

  useEffect(() => {
    setDisplayTime(task.timeSpent);
  }, [task.timeSpent]);

  useEffect(() => {
    if (!task.isTracking || task.completed) return;

    const interval = setInterval(() => {
      const lastSession = task.sessions[task.sessions.length - 1];
      if (lastSession) {
        const elapsed = Math.floor((Date.now() - new Date(lastSession.startTime).getTime()) / 1000);
        setDisplayTime(task.timeSpent + elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.isTracking, task.sessions, task.timeSpent, task.completed]);

  const handleTimerToggle = useCallback(() => {
    if (task.isTracking) {
      onStopTracking?.(task.id);
    } else {
      onStartTracking?.(task.id);
    }
  }, [task.isTracking, task.id, onStartTracking, onStopTracking]);

  const priorityIcons: Record<string, string> = {
    high: '!!!',
    medium: '!!',
    low: '!',
  };

  const getTimeStatus = () => {
    if (!task.estimatedMinutes) return null;
    const estimatedSeconds = task.estimatedMinutes * 60;
    const ratio = displayTime / estimatedSeconds;
    if (ratio > 1) return 'over';
    if (ratio > 0.8) return 'warning';
    return 'ok';
  };

  const timeStatus = getTimeStatus();

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <PixelCheckbox
        label=""
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className={styles.content}>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.meta}>
          <span className={`${styles.priority} ${styles[task.priority]}`}>
            {priorityIcons[task.priority]} {task.priority}
          </span>
          {task.dueDate && <span>DUE: {formatDate(task.dueDate)}</span>}
        </div>
      </div>
      <div className={styles.timer}>
        <button
          className={`${styles.timerBtn} ${task.isTracking ? styles.tracking : ''}`}
          onClick={handleTimerToggle}
          disabled={task.completed}
          title={task.isTracking ? 'Stop timer' : 'Start timer'}
        >
          {task.isTracking ? '[■]' : '[▶]'}
        </button>
        <span className={`${styles.time} ${timeStatus ? styles[timeStatus] : ''}`}>
          {formatTime(displayTime)}
          {task.estimatedMinutes && (
            <span className={styles.estimate}>/ {task.estimatedMinutes}m</span>
          )}
        </span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          [X]
        </button>
      </div>
      <div className={`${styles.stamp} ${showStamp ? styles.showStamp : ''}`}>
        Done!
      </div>
    </div>
  );
}
