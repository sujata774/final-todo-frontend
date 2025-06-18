import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

/**
 * Tailwind class merging utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Auth form validation schema (sign-in / sign-up)
 */
export const loginFormSchema = () =>
  z.object({
    phone: z.coerce
      .number({
        invalid_type_error: 'Phone must be a number',
        required_error: 'Phone is required',
      })
      .int()
      .min(1000000, 'Invalid phone number')
      .max(999999999999999, 'Invalid phone number'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .refine((pwd) => /[A-Z]/.test(pwd), {
        message: 'Must contain at least one uppercase letter',
      })
      .refine((pwd) => /[a-z]/.test(pwd), {
        message: 'Must contain at least one lowercase letter',
      })
      .refine((pwd) => /[0-9]/.test(pwd), {
        message: 'Must contain at least one number',
      })
      .refine((pwd) => /[!@#$%^&*()]/.test(pwd), {
        message: 'Must contain at least one special character',
      }),
  })

export const registerFormSchema = () =>
  z.object({
    name: z.string().min(1, 'Name is required'),

    phone: z.coerce
      .number({
        invalid_type_error: 'Phone must be a number',
        required_error: 'Phone is required',
      })
      .int()
      .min(1000000, 'Invalid phone number')
      .max(999999999999999, 'Invalid phone number'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .refine((pwd) => /[A-Z]/.test(pwd), {
        message: 'Must contain at least one uppercase letter',
      })
      .refine((pwd) => /[a-z]/.test(pwd), {
        message: 'Must contain at least one lowercase letter',
      })
      .refine((pwd) => /[0-9]/.test(pwd), {
        message: 'Must contain at least one number',
      })
      .refine((pwd) => /[!@#$%^&*()]/.test(pwd), {
        message: 'Must contain at least one special character',
      }),
  })

/**
 * Todo schema
 */
export const TodoSchema = () =>
  z.object({
    _id: z.string().optional(),
    text: z.string().min(3, 'Text must be at least 3 characters'),
    completed: z.boolean(),
  })

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: ReturnType<typeof setTimeout>

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as ((...args: Parameters<T>) => void) & { cancel: () => void }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}
