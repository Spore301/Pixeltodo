import { useStore } from '@/lib/store';
import styles from './PlannerView.module.css';

export function PlannerView() {
  const { state } = useStore();
  const tasks = state.tasks;
  
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const sortedTasks = [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  const totalMins = sortedTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 30), 0);
  const capacityPct = Math.min(100, Math.round((totalMins / 480) * 100));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>DAILY PLANNER ─── <span className={styles.date}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span></h2>
        <div className={styles.nav}>
          <button className={styles.navBtn}>[◀]</button>
          <button className={styles.navBtn}>[Today]</button>
          <button className={styles.navBtn}>[▶]</button>
        </div>
      </header>

      <div className={styles.capacity}>
        <div className={styles.capBar}>
          <div className={styles.capFill} style={{ width: `${capacityPct}%` }}></div>
        </div>
        <div className={styles.capLabel}>{capacityPct}% Capacity</div>
      </div>

      <div className={styles.taskList}>
        {['high', 'medium', 'low'].map((prio) => {
          const prioTasks = sortedTasks.filter(t => t.priority === prio);
          if (prioTasks.length === 0) return null;
          
          return (
            <div key={prio} className={styles.prioGroup}>
              <div className={styles.prioHeader}>
                {prio.toUpperCase()} PRIORITY
              </div>
              <div className={styles.prioList}>
                {prioTasks.map(t => (
                  <div key={t.id} className={styles.detailedTaskCard}>
                    <div className={styles.taskProgBar}>
                      <div className={styles.taskProgFill} style={{ width: t.completed ? '100%' : '0%' }}></div>
                    </div>
                    <div className={styles.taskTitle}>{t.title}</div>
                    <div className={styles.taskMeta}>
                      Est: {t.estimatedMinutes || 30}m · Priority: {t.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {sortedTasks.length === 0 && <span className={styles.empty}>You have no tasks! Open notes and write to extract some.</span>}
      </div>
    </div>
  );
}
