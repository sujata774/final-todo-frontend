import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  type?: string
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className='flex flex-col gap-1.5'>
          <FormLabel className='text-sm font-medium text-gray-700'>
            {label}
          </FormLabel>
          <FormControl>
          <Input
  {...field}
  id={name}
  type={type}
  placeholder={placeholder}
  onChange={(e) =>
    type === 'number'
      ? field.onChange(e.target.value === '' ? '' : Number(e.target.value))
      : field.onChange(e)
  }
  value={field.value ?? ''}
  className='...'
/>

          </FormControl>
          {fieldState.error && (
            <FormMessage className='text-xs text-red-500 mt-1'>
              {fieldState.error.message}
            </FormMessage>
          )}
        </div>
      )}
    />
  )
}

export default CustomInput