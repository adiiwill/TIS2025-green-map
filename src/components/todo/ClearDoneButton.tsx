import { Button } from '@heroui/react'
import { motion } from 'framer-motion'

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'

import { useTodoStore } from '../../store/todoStore.ts'

export const ClearDoneButton = () => {
  const { clearCompleted } = useTodoStore()

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50, duration: 0.1 }}
      className="flex justify-center"
    >
      <Button color="warning" variant="flat" onPress={() => clearCompleted()}>
        <ArchiveBoxXMarkIcon className="w-6 h-6" /> Clear done
      </Button>
    </motion.div>
  )
}
