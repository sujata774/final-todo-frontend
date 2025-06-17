import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

import { Form } from '../../components/ui/form'
import { Button } from '../../components/ui/button'
import CustomInput from '../../components/CustomInput'
import { useAuthStore } from '../../store/useAuthStore'
import { registerFormSchema } from '../../lib/utils'

const SignUp = () => {
  const { registerUser, loading } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const schema = registerFormSchema()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: undefined,
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true)
    try {
      await registerUser({
        name: data.name,
        phone: data.phone,
        password: data.password,
      })
      toast.success('Account created successfully! Please log in.')
      navigate('/login')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <section className="flex flex-col items-center w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account 👋</h1>
            <p className="mt-2 text-sm text-gray-500">Fill in the details to get started</p>
          </header>

          <Form {...form}>
            <form
              className="space-y-6 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <CustomInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
              <CustomInput
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="Enter your phone number"
                type="number"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />

              <Button
                type="submit"
                disabled={isLoading || loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {isLoading || loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
          </Form>

          <footer className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </footer>
        </section>
      </div>
    </main>
  )
}

export default SignUp
