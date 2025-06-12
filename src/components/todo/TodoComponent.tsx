import { Button, Checkbox } from '@heroui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

import { type Todo, useTodoStore } from '../../store/todoStore'

type Props = {
  todo: Todo
}

const TodoComponent = ({ todo }: Props) => {
  const { remove, updateDone } = useTodoStore()

  return (
    <motion.div
      key={todo.id}
      layout="position"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50, duration: 0.1 }}
      className="w-full flex justify-between"
    >
      <Checkbox
        isSelected={todo.done}
        onChange={() => updateDone(todo.id)}
        lineThrough
        radius="full"
        size="md"
      >
        {todo.content}
      </Checkbox>

      <Button
        color="danger"
        variant="light"
        radius="full"
        isIconOnly
        onPress={() => remove(todo.id)}
      >
        <TrashIcon className="w-6 h-6" />
      </Button>
    </motion.div>
  )
}

export default TodoComponent
