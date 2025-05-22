'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onsubmit: SubmitHandler<Inputs> = async data => {
    const { name, email, password, confirmPassword } = data
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const user = await res.json()
    if (res.status === 201) {
      alert('User created successfully')
    }
    if (res.status === 400) {
      alert(user.error)
    }
    if (res.status === 500) {
      alert('Internal server error')
      console.log(user.error)
    }
  }

  return (
    <div className='flex flex-col bg-white  items-center justify-center max-h-screen md:min-h-[500px] max-w-screen md:min-w-[400px] border rounded-[32px] border-grey-400 py-2'>
      <div className='relative flex flex-row justify-center w-full items-center px-4 py-2'>
        <h1 className='text-2xl font-bold'>Register</h1>
        <RxCross2
          className='absolute right-[20px] top-[10px] text-red-500 text-[30px] cursor-pointer'
          onClick={() => window.close()}
        />
      </div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className='flex flex-col gap-4 w-full p-4'
      >
        <div className='flex flex-col w-full'>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            id='name'
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
        <div className='flex flex-col w-full'>
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
        <div className='flex flex-col w-full'>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            id='password'
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <Input
            type='password'
            id='confirmPassword'
            {...register('confirmPassword', { required: true })}
          />
          {errors.confirmPassword && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
        <Button type='submit' className='bg-black text-white p-2 rounded mt-4'>
          Register
        </Button>
      </form>
    </div>
  )
}
