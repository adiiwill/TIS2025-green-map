import { FunctionComponent, ReactNode } from 'react'

import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import { Input, InputProps } from '@heroui/react'

interface FormInputProps extends Partial<InputProps> {
  register: UseFormRegisterReturn<string>
  label: string
  error?: FieldError
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const FormInput: FunctionComponent<FormInputProps> = ({
  register,
  label,
  error,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Input
        type="text"
        radius="sm"
        startContent={startIcon}
        endContent={endIcon}
        label={label}
        labelPlacement="outside"
        {...register}
        {...props}
        classNames={{
          label: '!text-white text-xl'
        }}
      />
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
    </div>
  )
}

export default FormInput
