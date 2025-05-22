import { useState } from 'react'
import './App.css'

import { useTodoStore, type Todo } from './store/todoStore'
import { ClearDoneButton } from './components/todo/ClearDoneButton'
import { TodoComponent } from './components/todo/TodoComponent'

import { StyledButton } from './components/todo/style'

import { ScrollShadow } from '@heroui/scroll-shadow'
import { Input } from '@heroui/input'

import { motion, AnimatePresence } from 'framer-motion'

import { PlusIcon } from '@heroicons/react/24/outline'

const App = () => {
  /* --- VARIABLES --- */

  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setInputVisibility] = useState(false)

  const { todos, add } = useTodoStore()

  /* --- MAIN --- */

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <div className="todos flex flex-col gap-1">
          {todos.filter((todo) => todo.done).length >= 3 && <ClearDoneButton />}
          <ScrollShadow className="flex-1">
            <AnimatePresence>
              {todos.map((todo: Todo) => (
                <TodoComponent key={todo.id} todo={todo} />
              ))}
            </AnimatePresence>
          </ScrollShadow>
        </div>

        <div className="inputs">
          <AnimatePresence>
            {isInputVisible && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}>
                <Input
                  type="text"
                  value={inputValue}
                  variant="bordered"
                  placeholder="Add new todo"
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

          <StyledButton
            $isVisible={isInputVisible}
            isIconOnly
            radius="full"
            size="lg"
            onPress={() => {
              setInputVisibility(!isInputVisible)
            }}
          >
            <PlusIcon className="w-6 h-6" />
          </StyledButton>
        </div>
      </div>
    </div>
  )
}

export default App
