'use client';

import { Task } from '@/lib/store';
import { TaskCard } from './TaskCard';
import { PixelButton } from './PixelButton';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTask: () => void;
  onStartTracking: (id: string) => void;
  onStopTracking: (id: string) => void;
}

const ASCII_HEADER = `
 ____  _        _    ____ _  _______ ___ _____ _____
| __ )| |      / \\  / ___| |/ / ____|_ _|_   _| ____|
|  _ \| |     / _ \\| |   | ' /|  _|  | |  | | |  _|
| |_) | |___ / ___ \\ |___| . \\| |___ | |  | | | |___
|____/|_____/_/   \\_\\____|_|\\_\\_____|___| |_| |_____|
`;

export function TaskList({
  tasks,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  onAddTask,
  onStartTracking,
  onStopTracking,
}: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className={styles.container}>
      <pre className={styles.asciiArt}>{ASCII_HEADER}</pre>
      
      <div className={styles.header}>
        <h2 className={styles.title}>&gt; TASKS</h2>
        <div className={styles.filters}>
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => onFilterChange(f)}
            >
              [{f}]
            </button>
          ))}
          <PixelButton onClick={onAddTask}>+ ADD</PixelButton>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className={styles.empty}>
          {filter === 'all' ? (
            <>NO TASKS YET... ADD ONE!</>
          ) : filter === 'active' ? (
            <>NO ACTIVE TASKS...</>
          ) : (
            <>NO COMPLETED TASKS...</>
          )}
        </div>
      ) : (
        <div className={styles.list}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onStartTracking={onStartTracking}
              onStopTracking={onStopTracking}
            />
          ))}
        </div>
      )}
    </div>
  );
}
