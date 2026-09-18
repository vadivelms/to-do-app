import type { Priority, SortKey, StatusFilter } from '../types'
import styles from './FilterBar.module.css'

interface FilterBarProps {
  status: StatusFilter
  onStatusChange: (status: StatusFilter) => void
  priority: Priority | 'all'
  onPriorityChange: (priority: Priority | 'all') => void
  tag: string
  onTagChange: (tag: string) => void
  allTags: string[]
  sortKey: SortKey
  onSortChange: (sortKey: SortKey) => void
}

export function FilterBar({
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  tag,
  onTagChange,
  allTags,
  sortKey,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <label className={styles.field}>
        Status
        <select value={status} onChange={(e) => onStatusChange(e.target.value as StatusFilter)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label className={styles.field}>
        Priority
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as Priority | 'all')}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label className={styles.field}>
        Tag
        <select value={tag} onChange={(e) => onTagChange(e.target.value)}>
          <option value="all">All</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Sort by
        <select value={sortKey} onChange={(e) => onSortChange(e.target.value as SortKey)}>
          <option value="created">Newest</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </label>
    </div>
  )
}
