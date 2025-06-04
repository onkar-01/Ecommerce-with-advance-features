'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export default function LoginForm () {
  const { data: session } = useSession();
  const user = session?.user
  
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const [error, setError] = useState<null | string>(null)
  const onsubmit: SubmitHandler<Inputs> = async data => {
    const { email, password } = data

    signIn('credentials', {
      email,
      password,
      redirect: false
    }).then(res => {
      if (res?.error) {
        setError(res.error)
      }
      if (res?.ok) {
        if (user?.role === 'Admin') {
          router.push('/admin/dashboard')
        }
      }
    })
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen py-2'>
      <h1 className='text-2xl font-bold'>Register</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <Input
            type='email'
            id='email'
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            id='password'
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className='text-red-500'>This field is required</span>
          )}
          {error && <span className='text-red-500'>{error}</span>}
        </div>
        <Button type='submit' className='bg-blue-500 text- p-2 rounded mt-4'>
          Register
        </Button>
      </form>
    </div>
  )
}
