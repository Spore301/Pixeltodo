export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatFullDate(dateString: string | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getDaysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

export function getStreak(tasks: { completed: boolean; completedAt?: string }[]): number {
  const completedTasks = tasks
    .filter((t) => t.completed && t.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

  if (completedTasks.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedDates = new Set(
    completedTasks.map((t) => {
      const d = new Date(t.completedAt!);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  );

  let currentDate = new Date(today);
  
  while (completedDates.has(currentDate.getTime())) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  if (streak === 0 && completedDates.has(today.getTime() - 86400000)) {
    streak = 1;
    currentDate = new Date(today.getTime() - 86400000);
    while (completedDates.has(currentDate.getTime())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }

  return streak;
}

export function getWeekData(tasks: { completed: boolean; completedAt?: string }[]): { day: string; count: number }[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result: { day: string; count: number }[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const count = tasks.filter((t) => {
      if (!t.completed || !t.completedAt) return false;
      const completed = new Date(t.completedAt);
      completed.setHours(0, 0, 0, 0);
      return completed.getTime() === date.getTime();
    }).length;
    
    result.push({ day: days[date.getDay()], count });
  }
  
  return result;
}

export function getPriorityStats(tasks: { priority: string; completed: boolean }[]): { priority: string; count: number; total: number }[] {
  const priorities = ['high', 'medium', 'low'];
  return priorities.map((p) => {
    const count = tasks.filter((t) => t.priority === p && t.completed).length;
    const total = tasks.filter((t) => t.priority === p).length;
    return { priority: p, count, total };
  });
}
