import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority, Task, TaskInput } from '../types'
import styles from './TaskForm.module.css'

interface TaskFormProps {
  initialTask?: Task
  onSubmit: (input: TaskInput) => void
  onCancel?: () => void
}

function toInputValue(task?: Task): TaskInput {
  return {
    title: task?.title ?? '',
    notes: task?.notes ?? '',
    dueDate: task?.dueDate ?? null,
    priority: task?.priority ?? 'medium',
    tags: task?.tags ?? [],
  }
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [values, setValues] = useState<TaskInput>(() => toInputValue(initialTask))
  const [tagsText, setTagsText] = useState(() => (initialTask?.tags ?? []).join(', '))

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!values.title.trim()) return

    onSubmit({
      ...values,
      tags: tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })

    if (!initialTask) {
      setValues(toInputValue())
      setTagsText('')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.title}
        type="text"
        placeholder="What needs to be done?"
        value={values.title}
        onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
        required
      />

      <textarea
        className={styles.notes}
        placeholder="Notes (optional)"
        value={values.notes}
        onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        rows={2}
      />

      <div className={styles.row}>
        <label className={styles.field}>
          Due date
          <input
            type="datetime-local"
            value={values.dueDate ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, dueDate: e.target.value || null }))}
          />
        </label>

        <label className={styles.field}>
          Priority
          <select
            value={values.priority}
            onChange={(e) => setValues((v) => ({ ...v, priority: e.target.value as Priority }))}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className={styles.field}>
          Tags
          <input
            type="text"
            placeholder="work, personal"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          {initialTask ? 'Save changes' : 'Add task'}
        </button>
        {onCancel && (
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
