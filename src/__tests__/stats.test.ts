import { describe, expect, it } from 'vitest'
import type { Task } from '../types'
import { computeStats } from '../utils/stats'

function makeTask(overrides: Partial<Task>): Task {
  return {
    id: Math.random().toString(),
    title: 'Task',
    notes: '',
    dueDate: null,
    priority: 'medium',
    tags: [],
    completed: false,
    createdAt: Date.now(),
    ...overrides,
  }
}

describe('computeStats', () => {
  it('returns all zeros for an empty task list', () => {
    expect(computeStats([])).toEqual({
      total: 0,
      active: 0,
      completed: 0,
      overdue: 0,
      byPriority: { high: 0, medium: 0, low: 0 },
    })
  })

  it('counts totals, active, and completed', () => {
    const tasks = [
      makeTask({ completed: true }),
      makeTask({ completed: false }),
      makeTask({ completed: false }),
    ]
    const stats = computeStats(tasks)
    expect(stats.total).toBe(3)
    expect(stats.completed).toBe(1)
    expect(stats.active).toBe(2)
  })

  it('counts overdue only for incomplete tasks past their due date', () => {
    const tasks = [
      makeTask({ dueDate: '2000-01-01T00:00', completed: false }),
      makeTask({ dueDate: '2000-01-01T00:00', completed: true }),
      makeTask({ dueDate: null, completed: false }),
    ]
    expect(computeStats(tasks).overdue).toBe(1)
  })

  it('buckets active tasks by priority, ignoring completed ones', () => {
    const tasks = [
      makeTask({ priority: 'high', completed: false }),
      makeTask({ priority: 'high', completed: true }),
      makeTask({ priority: 'low', completed: false }),
    ]
    expect(computeStats(tasks).byPriority).toEqual({ high: 1, medium: 0, low: 1 })
  })
})
