import { useState } from 'react'
import type { Task, TaskInput } from '../types'
import { isOverdue } from '../utils/sort'
import { TaskForm } from './TaskForm'
import styles from './TaskItem.module.css'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, input: TaskInput) => void
}

const PRIORITY_LABEL: Record<Task['priority'], string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <TaskForm
        initialTask={task}
        onSubmit={(input) => {
          onEdit(task.id, input)
          setIsEditing(false)
        }}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  const overdue = isOverdue(task)

  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'complete'}`}
      />

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{task.title}</span>
          <span className={`${styles.priority} ${styles[task.priority]}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>
        </div>

        {task.notes && <p className={styles.notes}>{task.notes}</p>}

        <div className={styles.meta}>
          {task.dueDate && (
            <span className={overdue ? styles.overdue : styles.due}>
              {overdue ? 'Overdue: ' : 'Due '}
              {new Date(task.dueDate).toLocaleString()}
            </span>
          )}
          {task.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}
