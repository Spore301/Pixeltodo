import { useProjectsStore } from '@/lib/projects-store';
import { useStore } from '@/lib/store';
import styles from './ProjectView.module.css';

export function ProjectView() {
  const { projects } = useProjectsStore();
  const { state } = useStore();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>PROJECTS</h2>
        <div className={styles.actions}>
          <button className={styles.newBtn}>[+ New Project]</button>
        </div>
      </header>

      <div className={styles.projectList}>
        {projects.length === 0 && (
          <div className={styles.empty}>No projects yet. Scribe auto-generates them from notes.</div>
        )}
        
        {projects.map((proj) => {
          return (
            <div key={proj.id} className={styles.projectBlock}>
              <div className={styles.projectHeader}>
                <span className={styles.circle} style={{ color: proj.color }}>●</span>
                <span className={styles.projName}>{proj.name}</span>
                <span className={styles.meta}>· {proj.deadline ? proj.deadline : 'No deadline'}</span>
              </div>
              <div className={styles.projectBody}>
                <div className={styles.taskList}>
                  <div className={styles.taskItem}>• Review pending items for {proj.name}</div>
                  <div className={styles.taskItem}>• Check assigned notes</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
