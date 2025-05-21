import { Button } from '@heroui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { CleanIcon } from '@hugeicons/core-free-icons'
import { motion } from 'framer-motion'

import { useTodoStore } from '../store/todoStore'

export const ClearDoneButton = () => {
  const { clearCompleted } = useTodoStore()

  return (
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
  )
}
