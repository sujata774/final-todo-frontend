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
import { loginFormSchema } from '../../lib/utils'

const LogIn = () => {
  const navigate = useNavigate()
  const { loginUser, loading } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const schema = loginFormSchema()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: undefined,
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true)
    try {
      await loginUser({
        phone: data.phone,
        password: data.password,
      })

      // ✅ Navigate to home on successful login
      navigate('/')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Authentication failed'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
   <main className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <section className="flex flex-col items-center w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your credentials to continue
            </p>
          </header>

          <Form {...form}>
            <form
              className="space-y-6 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <CustomInput
                control={form.control}
                name="phone"
                label="Phone"
                type="number"
                placeholder="Enter your phone number"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                disabled={isLoading || loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                Login
              </Button>
            </form>
          </Form>

          <footer className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/sign-up"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </footer>
        </section>
      </div>
    </main>
  )
}

export default LogIn
