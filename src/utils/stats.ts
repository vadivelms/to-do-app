import type { Priority, Task } from '../types'
import { isOverdue } from './sort'

export interface TaskStats {
  total: number
  active: number
  completed: number
  overdue: number
  byPriority: Record<Priority, number>
}

export function computeStats(tasks: Task[]): TaskStats {
  const byPriority: Record<Priority, number> = { high: 0, medium: 0, low: 0 }
  let completed = 0
  let overdue = 0

  for (const task of tasks) {
    if (task.completed) {
      completed += 1
    } else {
      byPriority[task.priority] += 1
      if (isOverdue(task)) overdue += 1
    }
  }

  return {
    total: tasks.length,
    active: tasks.length - completed,
    completed,
    overdue,
    byPriority,
  }
}
