import type { Priority, SortKey, Task } from '../types'

const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function sortTasks(tasks: Task[], sortKey: SortKey): Task[] {
  const sorted = [...tasks]

  switch (sortKey) {
    case 'dueDate':
      sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
      break
    case 'priority':
      sorted.sort((a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority])
      break
    case 'created':
      sorted.sort((a, b) => b.createdAt - a.createdAt)
      break
  }

  return sorted
}

export function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) return false
  return new Date(task.dueDate).getTime() < Date.now()
}
