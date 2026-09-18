export type Priority = 'low' | 'medium' | 'high'

export type StatusFilter = 'all' | 'active' | 'completed'

export type SortKey = 'dueDate' | 'priority' | 'created'

export interface Task {
  id: string
  title: string
  notes: string
  dueDate: string | null
  priority: Priority
  tags: string[]
  completed: boolean
  createdAt: number
}

export interface TaskInput {
  title: string
  notes: string
  dueDate: string | null
  priority: Priority
  tags: string[]
}
