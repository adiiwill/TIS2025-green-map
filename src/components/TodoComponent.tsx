import { Checkbox } from '@heroui/checkbox'
import { Button } from '@heroui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Delete01Icon } from '@hugeicons/core-free-icons'
import { motion } from 'framer-motion'

import { useTodoStore, type Todo } from '../store/todoStore'

type Props = {
  todo: Todo
}

export const TodoComponent = ({ todo }: Props) => {
  const { remove, updateDone } = useTodoStore()

  return (
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
  )
}
