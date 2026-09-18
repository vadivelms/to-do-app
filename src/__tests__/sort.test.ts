import { describe, expect, it } from 'vitest'
import type { Task } from '../types'
import { isOverdue, sortTasks } from '../utils/sort'

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

describe('sortTasks', () => {
  it('sorts by due date ascending, with no-date tasks last', () => {
    const a = makeTask({ id: 'a', dueDate: '2026-01-03T00:00' })
    const b = makeTask({ id: 'b', dueDate: '2026-01-01T00:00' })
    const c = makeTask({ id: 'c', dueDate: null })

    const result = sortTasks([a, b, c], 'dueDate')
    expect(result.map((t) => t.id)).toEqual(['b', 'a', 'c'])
  })

  it('sorts by priority high -> medium -> low', () => {
    const low = makeTask({ id: 'low', priority: 'low' })
    const high = makeTask({ id: 'high', priority: 'high' })
    const medium = makeTask({ id: 'medium', priority: 'medium' })

    const result = sortTasks([low, high, medium], 'priority')
    expect(result.map((t) => t.id)).toEqual(['high', 'medium', 'low'])
  })

  it('sorts by created descending (newest first)', () => {
    const older = makeTask({ id: 'older', createdAt: 1 })
    const newer = makeTask({ id: 'newer', createdAt: 2 })

    const result = sortTasks([older, newer], 'created')
    expect(result.map((t) => t.id)).toEqual(['newer', 'older'])
  })
})

describe('isOverdue', () => {
  it('returns true for a past due date on an incomplete task', () => {
    const task = makeTask({ dueDate: '2000-01-01T00:00', completed: false })
    expect(isOverdue(task)).toBe(true)
  })

  it('returns false for a completed task even if past due', () => {
    const task = makeTask({ dueDate: '2000-01-01T00:00', completed: true })
    expect(isOverdue(task)).toBe(false)
  })

  it('returns false when there is no due date', () => {
    const task = makeTask({ dueDate: null })
    expect(isOverdue(task)).toBe(false)
  })
})
