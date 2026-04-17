'use client';

import { Task } from '@/lib/store';
import { PixelButton } from './PixelButton';
import styles from './Settings.module.css';

const ASCII_HEADER = `
   _____ ____  _____   ______   __  _____ _ _____ ____  
  / ____|  _ \\|  __ \\ / __\\ \\ / / |  _  | | ____|  _ \\ 
 | (___ | | | | |__) / / _\\ \\ V /  | | | | |  _| | |_) |
  \\___ \\| |_| |  _  / /_ _ \\ \\ /   | |/| | | |___|  _ < 
  ____) |____/|_| \\_\\____/  \\_/    \\_/ \\_/|_____|_| \\_\\
                                                         
`;

interface SettingsProps {
  tasks: Task[];
  onClearData: () => void;
}

export function Settings({ tasks, onClearData }: SettingsProps) {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className={styles.settings}>
      <pre className={styles.asciiArt}>{ASCII_HEADER}</pre>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>&gt; DATA STATISTICS</h3>
        <div className={styles.dataInfo}>
          <span>
            <span>Total Tasks</span>
            <span>{tasks.length}</span>
          </span>
          <span>
            <span>Completed</span>
            <span>{completedTasks}</span>
          </span>
          <span>
            <span>Pending</span>
            <span>{pendingTasks}</span>
          </span>
          <span>
            <span>Storage</span>
            <span>localStorage</span>
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>&gt; DATA MANAGEMENT</h3>
        <p className={styles.warning}>WARNING: THIS ACTION CANNOT BE UNDONE</p>
        <div className={styles.actions}>
          <PixelButton variant="danger" onClick={onClearData}>
            CLEAR ALL DATA
          </PixelButton>
        </div>
      </div>

      <div className={styles.about}>
        <span>PIXELTODO</span> v1.0<br />
        A retro CLI-inspired task tracker<br />
        Built with Next.js
      </div>
    </div>
  );
}
