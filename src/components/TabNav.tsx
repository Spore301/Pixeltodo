'use client';

import styles from './TabNav.module.css';

interface TabNavProps {
  activeTab: 'notes' | 'projects' | 'planner';
  onTabChange: (tab: 'notes' | 'projects' | 'planner') => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className={styles.nav}>
      {(['notes', 'projects', 'planner'] as const).map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
