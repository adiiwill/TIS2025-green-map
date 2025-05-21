import { useState } from 'react'
import './App.css'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'

import { useTodoStore, type Todo } from './store/todoStore.ts'
import { ClearDoneButton } from './components/ClearDoneButton.tsx'
import { TodoComponent } from './components/TodoComponent.tsx'

import { motion, AnimatePresence } from 'framer-motion'

import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'

const App = () => {
  /* --- VARIABLES --- */

  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setInputVisibility] = useState(false)

  const { todos, add } = useTodoStore()

  /* --- MAIN --- */

  return (
    <div className="wrapper">
      <div className="todos flex flex-col gap-1">
        <AnimatePresence>
          {todos.filter((todo) => todo.done).length >= 3 && <ClearDoneButton />}

          {todos.map((todo: Todo) => (
            <TodoComponent key={todo.id} todo={todo} />
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
