import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTasks } from '../hooks/useTasks'
import type { TaskInput } from '../types'

const baseInput: TaskInput = {
  title: 'Buy milk',
  notes: '',
  dueDate: null,
  priority: 'medium',
  tags: ['errands'],
}

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a task', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask(baseInput)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toMatchObject({
      title: 'Buy milk',
      priority: 'medium',
      tags: ['errands'],
      completed: false,
    })
  })

  it('toggles completion', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask(baseInput)
    })
    const id = result.current.tasks[0].id

    act(() => {
      result.current.toggleComplete(id)
    })

    expect(result.current.tasks[0].completed).toBe(true)
  })

  it('updates a task', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask(baseInput)
    })
    const id = result.current.tasks[0].id

    act(() => {
      result.current.updateTask(id, { ...baseInput, title: 'Buy oat milk', priority: 'high' })
    })

    expect(result.current.tasks[0]).toMatchObject({ title: 'Buy oat milk', priority: 'high' })
  })

  it('deletes a task', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask(baseInput)
    })
    const id = result.current.tasks[0].id

    act(() => {
      result.current.deleteTask(id)
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it('persists tasks to localStorage across hook instances', () => {
    const { result, unmount } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask(baseInput)
    })
    unmount()

    const { result: second } = renderHook(() => useTasks())
    expect(second.current.tasks).toHaveLength(1)
    expect(second.current.tasks[0].title).toBe('Buy milk')
  })
})
