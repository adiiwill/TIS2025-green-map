import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import axios, { AxiosError } from 'axios'
import { Button, Form } from '@heroui/react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

import RegisterPasswordCheck from './RegisterPasswordCheck'
import { useAuthStore } from '../../store/authStore'
import { getErrorMessage } from '../../utils/apiErrorHandling'
import FormInput from '../common/FormInput'

interface RegisterInputs {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const RegisterForm = () => {
  const navigate = useNavigate()
  const { setToken } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const [regError, setRegError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterInputs>()

  const onSubmit: SubmitHandler<RegisterInputs> = async (data: RegisterInputs) => {
    try {
      setIsLoading(true)
      const { email, password } = data
      const response = await axios.post('/api/auth/register', { email, password })
      if (response.status === 200) {
        setToken(response.data.access_token)
        navigate('/')
      }
    } catch (err) {
      const error = err as AxiosError
      setRegError(getErrorMessage(error.request.status))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex xl:flex-col gap-6 xl:gap-12 xl:items-baseline xl:mr-50 mb-30 md:mb-42 xl:mb-0"
      >
        {regError && (
          <div className="bg-[#FFC2C2] max-w-[470px] rounded border-l-6 border-[#FF4545] text-[#FF4545] flex items-start p-3 gap-2">
            <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
            <span className="font-lato text-base break-words min-w-0">{regError}</span>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-16 w-full">
          <FormInput
            label="Firstname"
            error={errors.firstName}
            register={register('firstName', {
              required: { value: true, message: 'Field is required' }
            })}
            placeholder=" "
            className="max-w-[470px] xl:w-screen"
          />

          <FormInput
            label="Lastname"
            error={errors.lastName}
            register={register('lastName', {
              required: { value: true, message: 'Field is required' }
            })}
            placeholder=" "
            className="max-w-[470px] xl:w-screen"
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-16 w-full">
          <FormInput
            label="Email"
            error={errors.email}
            register={register('email', {
              required: { value: true, message: 'Field is required' },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email address'
              }
            })}
            startIcon={<EnvelopeIcon className="w-5 h-5 text-black" />}
            className="max-w-[470px] xl:w-screen"
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-16 w-full">
          <FormInput
            label="Password"
            error={errors.password}
            register={register('password', {
              required: { value: true, message: 'Field is required' },
              validate: {
                isValid: (v) => allPasswordValid(v) || 'Must be a valid password'
              }
            })}
            startIcon={<LockClosedIcon className="w-5 h-5 text-black" />}
            endIcon={
              showPassword ? (
                <EyeSlashIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 text-black cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 text-black cursor-pointer"
                />
              )
            }
            type={showPassword ? 'text' : 'password'}
            className="max-w-[470px] xl:w-screen"
          />

          <FormInput
            label="Confirm password"
            error={errors.passwordConfirmation}
            register={register('passwordConfirmation', {
              required: { value: true, message: 'Field is required' },
              validate: {
                doesMatch: (v) => v === watch('password') || 'Passwords do not match'
              }
            })}
            startIcon={<LockClosedIcon className="w-5 h-5 text-black" />}
            endIcon={
              showPasswordConfirm ? (
                <EyeSlashIcon
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="w-5 h-5 text-black cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="w-5 h-5 text-black cursor-pointer"
                />
              )
            }
            type={showPasswordConfirm ? 'text' : 'password'}
            className="max-w-[470px] xl:w-screen"
          />
        </div>

        <div className="flex flex-col gap-1 xl:flex-wrap xl:self-auto xl:max-h-24 w-fit gap-x-3 font-lato text-white font-bold">
          <RegisterPasswordCheck
            password={watch('password')}
            checkFn={eightCharMin}
            label="8 characters minimum"
          />
          <RegisterPasswordCheck
            password={watch('password')}
            checkFn={oneLowerCase}
            label="One lowercase character"
          />
          <RegisterPasswordCheck
            password={watch('password')}
            checkFn={oneUpperCase}
            label="One uppercase character"
          />
          <RegisterPasswordCheck
            password={watch('password')}
            checkFn={oneSpecialChar}
            label="One special character"
          />
          <RegisterPasswordCheck
            password={watch('password')}
            checkFn={oneNumberChar}
            label="One number"
          />
        </div>

        <div className="flex flex-col gap-5 w-full">
          <Button
            className="bg-mainGreen max-w-[470px] w-full"
            radius="sm"
            type="submit"
            isLoading={isLoading}
          >
            <span className="flex items-center gap-1 text-xl text-white font-bold font-lato">
              Sign Up <ArrowRightIcon className="w-5 h-5" />
            </span>
          </Button>

          <span className="font-lato text-white self-center xl:self-auto">
            Already have an account?{' '}
            <a href="/login" className="text-mainGreen underline font-bold">
              Sign In
            </a>
          </span>
        </div>
      </Form>
    </>
  )
}

// HELPERS

const eightCharMin = (pass: string = ''): boolean => {
  return pass.length >= 8
}

const oneLowerCase = (pass: string = ''): boolean => {
  return /[a-z]/.test(pass)
}

const oneUpperCase = (pass: string = ''): boolean => {
  return /[A-Z]/.test(pass)
}

const oneSpecialChar = (pass: string = ''): boolean => {
  return /\W/.test(pass)
}

const oneNumberChar = (pass: string = ''): boolean => {
  return /[0-9]/.test(pass)
}

const allPasswordValid = (pass: string = ''): boolean => {
  return (
    eightCharMin(pass) &&
    oneLowerCase(pass) &&
    oneUpperCase(pass) &&
    oneSpecialChar(pass) &&
    oneNumberChar(pass)
  )
}

export default RegisterForm
