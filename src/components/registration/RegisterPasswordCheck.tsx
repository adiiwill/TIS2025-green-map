import { cn } from '@heroui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface PasswordCheckProps {
  password: string
  checkFn: (password: string) => boolean
  label: string
}

const RegisterPasswordCheck = ({ password, checkFn, label }: PasswordCheckProps) => {
  const passed = checkFn(password)

  return (
    <span className={cn('flex items-center', passed && 'text-mainGreen')}>
      {passed ? <CheckIcon className="h-5 w-5" /> : <XMarkIcon className="h-5 w-5" />}
      {label}
    </span>
  )
}

export default RegisterPasswordCheck
