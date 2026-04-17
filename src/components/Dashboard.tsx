'use client';

import { Task } from '@/lib/store';
import { getStreak, getWeekData, getPriorityStats, isToday } from '@/lib/utils';
import { StatPanel } from './StatPanel';
import { ASCIIBarChart } from './ASCIIBarChart';
import styles from './Dashboard.module.css';

const ASCII_HEADER = `
 ____  _        _    __  __           _   _ ____  
|  _ \\| |      / \\  |  \\/  | ___ _ __ | |_ / ___| 
| | | | |     / _ \\ | |\\/| |/ _ \\ '_ \\| __\\___ \\ 
| |_| | |___ / ___ \\| |  | |  __/ | | | |_ ___) |
|____/|_____/_/   \\_\\_|  |_|\\___|_| |_|\\__|____/ 
`;

interface DashboardProps {
  tasks: Task[];
}

export function Dashboard({ tasks }: DashboardProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.dashboard}>
        <pre className={styles.asciiArt}>{ASCII_HEADER}</pre>
        <div className={styles.noTasks}>NO DATA YET... ADD TASKS TO SEE ANALYTICS!</div>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completedToday = tasks.filter((t) => t.completed && t.completedAt && isToday(t.completedAt)).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const streak = getStreak(tasks);
  
  const weekData = getWeekData(tasks).map((d) => ({
    label: d.day,
    value: d.count,
  }));
  
  const priorityStats = getPriorityStats(tasks);

  const productivityScore = Math.min(
    100,
    Math.round(
      (completedToday * 20) + 
      (streak * 5) + 
      (completionRate * 0.3)
    )
  );

  return (
    <div className={styles.dashboard}>
      <pre className={styles.asciiArt}>{ASCII_HEADER}</pre>

      <div className={styles.productivityScore}>
        <div className={styles.scoreLabel}>PRODUCTIVITY RATING</div>
        <div className={styles.scoreValue}>
          {productivityScore}<span className={styles.scoreSuffix}>%</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatPanel value={totalTasks} label="Total Tasks" />
        <StatPanel value={completedToday} label="Completed Today" />
        <StatPanel value={`${completionRate}%`} label="Completion Rate" />
        <StatPanel value={streak} label="Day Streak" trend={streak > 0 ? 'up' : undefined} trendValue={streak > 0 ? `${streak}d` : ''} />
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartPanel}>
          <ASCIIBarChart
            data={weekData}
            title="WEEKLY ACTIVITY"
            color="var(--accent-cyan)"
          />
        </div>

        <div className={styles.priorityPanel}>
          <div className={styles.priorityTitle}>&gt; PRIORITY BREAKDOWN</div>
          {priorityStats.map((stat) => {
            const percentage = stat.total > 0 ? (stat.count / stat.total) * 100 : 0;
            return (
              <div key={stat.priority} className={styles.priorityRow}>
                <span className={`${styles.priorityLabel} ${styles[stat.priority]}`}>
                  {stat.priority}
                </span>
                <div className={styles.priorityBarContainer}>
                  <div
                    className={`${styles.priorityBar} ${styles[stat.priority]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={styles.priorityStats}>
                  {stat.count}/{stat.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
