import { useMemo, useState } from 'react'
import { FilterBar } from './components/FilterBar'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import type { Priority, SortKey, StatusFilter } from './types'
import { sortTasks } from './utils/sort'
import styles from './App.module.css'

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks()
  const [status, setStatus] = useState<StatusFilter>('all')
  const [priority, setPriority] = useState<Priority | 'all'>('all')
  const [tag, setTag] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('created')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    tasks.forEach((task) => task.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [tasks])

  const visibleTasks = useMemo(() => {
    let filtered = tasks
    if (status !== 'all') {
      filtered = filtered.filter((task) => (status === 'completed' ? task.completed : !task.completed))
    }
    if (priority !== 'all') {
      filtered = filtered.filter((task) => task.priority === priority)
    }
    if (tag !== 'all') {
      filtered = filtered.filter((task) => task.tags.includes(tag))
    }
    return sortTasks(filtered, sortKey)
  }, [tasks, status, priority, tag, sortKey])

  const remaining = tasks.filter((task) => !task.completed).length

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Daily Tasks</h1>
        <p className={styles.subtitle}>
          {remaining} {remaining === 1 ? 'task' : 'tasks'} remaining
        </p>
      </header>

      <TaskForm onSubmit={addTask} />

      <FilterBar
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        tag={tag}
        onTagChange={setTag}
        allTags={allTags}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        onEdit={updateTask}
      />
    </div>
  )
}

export default App
