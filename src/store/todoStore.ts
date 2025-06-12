import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Todo {
  id: number
  content: string
  done: boolean
}

export interface TodoStore {
  todos: Todo[]
  add: (content: string) => void
  remove: (id: number) => void
  updateDone: (id: number) => void
  clearCompleted: () => void
  todoReset: () => void
}

interface State {
  todos: Todo[]
}

const initialState: State = {
  todos: []
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      add: (content: string) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), content, done: false }]
        })),
      remove: (id: number) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        })),
      updateDone: (id: number) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          )
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.done)
        })),
      todoReset: () => set(initialState)
    }),
    { name: 'todos', storage: createJSONStorage(() => sessionStorage) }
  )
)
