import { Controller, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { TodoFormValues } from '../types'
import { useEffect } from 'react'

interface TodoFormProps {
  onSubmit: (data: TodoFormValues) => void
  initialValues?: TodoFormValues | null
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialValues }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    defaultValues: {
      _id: '',
      text: '',
    },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const handleFormSubmit = (data: TodoFormValues) => {
    onSubmit({
      ...data,
      _id: initialValues?._id || data._id,
    })
    reset()
  }

  return (
    <div className="flex items-center justify-center ">
      <Card className="mb-16 lg:w-6/12 w-full">
        <CardHeader>
          <CardTitle>{initialValues ? 'Update Todo' : 'Create Todo'}</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="flex flex-col items-center justify-center">
            <Controller
              name="text"
              control={control}
              rules={{ required: 'Text is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter todo text"
                  className={`mt-2 ${errors.text ? 'border-red-500 ' : ''}`}
                />
              )}
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
            )}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="text-base rounded-lg font-semibold text-white bg-blue-500 mt-4 w-full hover:bg-blue-600"
            >
              {initialValues ? 'Update Todo' : 'Create Todo'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default TodoForm
