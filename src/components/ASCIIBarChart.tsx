'use client';

import { useEffect, useState } from 'react';
import styles from './ASCIIBarChart.module.css';

interface ChartData {
  label: string;
  value: number;
  max?: number;
}

interface ASCIIBarChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}

export function ASCIIBarChart({ data, title, color = 'var(--accent-green)' }: ASCIIBarChartProps) {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <span className={styles.title}>&gt; {title}</span>
      </div>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        return (
          <div key={index} className={styles.row}>
            <span className={styles.day}>{item.label}</span>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{
                  width: animated ? `${percentage}%` : '0%',
                  background: color,
                  transitionDelay: `${index * 50}ms`,
                }}
              />
            </div>
            <span className={styles.value}>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}
