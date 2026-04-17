'use client';

import { StoreProvider, useStore } from '@/lib/store';
import { TabNav } from '@/components/TabNav';
import { NotesGrid } from '@/components/NotesGrid';
import { ProjectView } from '@/components/ProjectView';
import { PlannerView } from '@/components/PlannerView';
import { BackgroundProcessor } from '@/components/BackgroundProcessor';
import styles from './page.module.css';

function AppContent() {
  const { state, dispatch } = useStore();

  return (
    <div className={styles.container}>
      <BackgroundProcessor />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.menuIcon}>[≡]</span>
            <h1 className={styles.title}>PIXELNOTES</h1>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.aiStatus}>[AI: Ready]</span>
            <span className={styles.settingsIcon}>[⚙]</span>
          </div>
        </header>

        <TabNav
          activeTab={state.activeTab}
          onTabChange={(tab) => dispatch({ type: 'SET_TAB', payload: tab })}
        />

        <div className={styles.contentArea}>
          {state.activeTab === 'notes' && <NotesGrid />}
          {state.activeTab === 'projects' && <ProjectView />}
          {state.activeTab === 'planner' && <PlannerView />}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
