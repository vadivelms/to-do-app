import type { TaskStats } from '../utils/stats'
import styles from './Dashboard.module.css'

interface DashboardProps {
  stats: TaskStats
}

export function Dashboard({ stats }: DashboardProps) {
  const completionRate = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

  return (
    <section className={styles.dashboard} aria-label="Task dashboard">
      <div className={styles.card}>
        <span className={styles.value}>{stats.total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>{stats.active}</span>
        <span className={styles.label}>Active</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>{stats.completed}</span>
        <span className={styles.label}>Completed</span>
      </div>
      <div className={`${styles.card} ${stats.overdue > 0 ? styles.warning : ''}`}>
        <span className={styles.value}>{stats.overdue}</span>
        <span className={styles.label}>Overdue</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>{completionRate}%</span>
        <span className={styles.label}>Done</span>
      </div>
      <div className={styles.priorities}>
        <span className={styles.priorityItem}>
          <span className={`${styles.dot} ${styles.high}`} /> High {stats.byPriority.high}
        </span>
        <span className={styles.priorityItem}>
          <span className={`${styles.dot} ${styles.medium}`} /> Medium {stats.byPriority.medium}
        </span>
        <span className={styles.priorityItem}>
          <span className={`${styles.dot} ${styles.low}`} /> Low {stats.byPriority.low}
        </span>
      </div>
    </section>
  )
}
