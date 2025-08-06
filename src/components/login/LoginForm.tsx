import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import axios, { AxiosError } from 'axios'
import { Button, Form } from '@heroui/react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

import { useAuthStore } from '../../store/authStore'
import { getErrorMessage } from '../../utils/apiErrorHandling'
import FormInput from '../common/FormInput'

interface Inputs {
  email: string
  password: string
}

const LoginForm = () => {
  const { setToken, setEmail } = useAuthStore()

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
        setEmail(data.email)
        navigate('/')
      }
    } catch (err) {
      const error = err as AxiosError
      setLoginError(getErrorMessage(error.request.status))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen xl:pl-24 xl:w-[65vw] flex justify-center items-center mb-15 md:mb-40 xl:mb-0 p-10 xl:p-0">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-[46px] font-bold w-full xl:w-[470px] max-w-xl"
      >
        <img src="/street-map.png" alt="Street map" className="w-[125px]" />
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-col w-full gap-8">
            <h1 className="text-[32px] xl:text-5xl">Welcome back!</h1>

            {loginError && (
              <div className="bg-[#FFC2C2] w-full rounded border-l-6 border-[#FF4545] text-[#FF4545] flex items-start p-3 gap-2">
                <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
                <span className="font-lato text-base break-words min-w-0">{loginError}</span>
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
              <a href="/#" className="font-lato self-end text-mainGreen">
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        <Button
          isLoading={isLoading}
          type="submit"
          radius="sm"
          className="w-full bg-mainGreen"
        >
          <span className="text-white">
            <span className="text-xl flex items-center gap-1">
              Sign In <ArrowRightIcon className="w-5 h-5" />
            </span>
          </span>
        </Button>

        <p className="font-lato self-center">
          Don't have an account?
          <a href="/register" className="text-mainGreen underline ml-1">
            Sign Up
          </a>
        </p>
      </Form>
    </div>
  )
}

export default LoginForm
