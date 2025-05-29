import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { Button, Form } from '@heroui/react'
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormInput } from '../common/FormInput.tsx'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

import axios, { AxiosError } from 'axios'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router'

type Inputs = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { setToken } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/auth/authenticate', data)
      if (response.status === 200) {
        setToken(response.data.access_token)
        navigate('/')
      }
    } catch (err) {
      const error = err as AxiosError
      if (error.request.status === 400) {
        setLoginError('Invalid email or password')
      } else {
        setLoginError('Service is unavailable. Please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-[470px] gap-[46px] font-bold">
      <img src="/street-map.png" alt="Street map" className="w-[125px]" />
      <div className="flex flex-col w-full gap-10">
        <div className="flex flex-col w-full gap-8">
          <h1 className="text-[32px] lg:text-5xl">Welcome back!</h1>

          {loginError && (
            <div className="bg-[#FFC2C2] w-full h-[40px] rounded border-l-6 border-[#FF4545] text-[#FF4545] flex items-center p-3 gap-2">
              <ExclamationCircleIcon className="w-6 h-6" />
              <span className="font-lato text-base">{loginError}</span>
            </div>
          )}

          <FormInput
            label="E-mail"
            register={register('email', {
              required: { value: true, message: 'Field is required' },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email address'
              }
            })}
            error={errors.email}
            startIcon={<EnvelopeIcon className="w-5 h-5 text-black" />}
          />

          <div className="flex flex-col w-full gap-2">
            <FormInput
              label="Password"
              register={register('password', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.password}
              startIcon={<LockClosedIcon className="w-5 h-5 text-black" />}
              endIcon={
                showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 h-6 text-black cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 h-6 text-black cursor-pointer"
                  />
                )
              }
              type={showPassword ? 'text' : 'password'}
            />
            <a href="#" className="font-lato self-end text-mainGreen">
              Forgot password?
            </a>
          </div>
        </div>
      </div>

      <Button isLoading={isLoading} type="submit" radius="sm" className="w-full bg-mainGreen">
        <span className="text-white">
          <span className="text-xl flex items-center gap-1">
            Sign In <ArrowRightIcon className="w-5 h-5" />
          </span>
        </span>
      </Button>

      <p className="font-lato self-center">
        Don't have an account?{' '}
        <a href="#" className="text-mainGreen underline">
          Sign Up
        </a>
      </p>
    </Form>
  )
}
