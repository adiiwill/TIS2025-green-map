import { useState } from 'react'
import './App.css'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Checkbox } from '@heroui/checkbox'

import { motion, AnimatePresence } from 'framer-motion'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Delete01Icon, CleanIcon } from '@hugeicons/core-free-icons'

interface Todo {
  id: number
  content: string
  done: boolean
}

interface TodoStore {
  todos: Todo[]
  add: (content: string) => void
  remove: (id: number) => void
  updateDone: (id: number) => void
  clearCompleted: () => void
}

const useTodoStore = create<TodoStore>()(
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
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.done)
        }))
    }),
    { name: 'todos', storage: createJSONStorage(() => sessionStorage) }
  )
)

const App = () => {
  /* --- VARIABLES --- */

  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setInputVisibility] = useState(false)

  const { todos, add, remove, clearCompleted, updateDone } = useTodoStore()

  /* --- MAIN --- */

  return (
    <div className={'sm:w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 wrapper'}>
      <div className="todos flex flex-col gap-1">
        <AnimatePresence>
          {todos.filter((todo) => todo.done).length >= 3 && (
            <motion.div
              layout={'position'}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 500, damping: 50, duration: 0.1 }}
              className={'flex justify-center'}
            >
              <Button color={'warning'} variant={'flat'} onPress={() => clearCompleted()}>
                <HugeiconsIcon icon={CleanIcon} /> Clear done
              </Button>
            </motion.div>
          )}

          {todos.map((todo: Todo) => (
            <motion.div
              key={todo.id}
              layout={'position'}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 50, duration: 0.1 }}
              className={'w-full flex justify-between'}
            >
              <Checkbox isSelected={todo.done} onChange={() => updateDone(todo.id)} lineThrough icon={<></>} radius={'full'} size={'md'}>
                {todo.content}
              </Checkbox>

              <Button color={'danger'} variant={'light'} radius={'full'} isIconOnly onPress={() => remove(todo.id)}>
                <HugeiconsIcon icon={Delete01Icon} />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="inputs">
        <AnimatePresence>
          {isInputVisible && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}>
              <Input
                type="text"
                value={inputValue}
                variant={'bordered'}
                placeholder={'Add new todo'}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (inputValue.trim() !== '' && e.key === 'Enter') {
                    add(inputValue)
                    setInputValue('')
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          isIconOnly
          radius={'full'}
          size={'lg'}
          onPress={() => {
            setInputVisibility(!isInputVisible)
          }}
          style={{
            transition: 'transform 0.3s ease',
            transform: isInputVisible ? 'rotate(45deg)' : 'rotate(0deg)',
            background: '#fbd44c',
            color: '#fff'
          }}
        >
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
      </div>
    </div>
  )
}

export default App
