import { useEffect, useState } from 'react'
import type { Task, TaskInput } from '../types'
import { loadTasks, saveTasks } from '../utils/storage'

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function addTask(input: TaskInput): void {
    const task: Task = {
      id: createId(),
      title: input.title.trim(),
      notes: input.notes.trim(),
      dueDate: input.dueDate,
      priority: input.priority,
      tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [task, ...prev])
  }

  function updateTask(id: string, input: TaskInput): void {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: input.title.trim(),
              notes: input.notes.trim(),
              dueDate: input.dueDate,
              priority: input.priority,
              tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
            }
          : task,
      ),
    )
  }

  function deleteTask(id: string): void {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function toggleComplete(id: string): void {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  return { tasks, addTask, updateTask, deleteTask, toggleComplete }
}
