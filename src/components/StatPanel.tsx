import { ReactNode } from 'react';
import styles from './StatPanel.module.css';

interface StatPanelProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  children?: ReactNode;
}

export function StatPanel({ value, label, trend, trendValue, children }: StatPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      {trend && trendValue && (
        <div className={`${styles.trend} ${styles[trend]}`}>
          {trend === 'up' ? '+' : '-'}{trendValue}
        </div>
      )}
      {children}
    </div>
  );
}
