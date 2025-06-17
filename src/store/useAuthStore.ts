
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { fetchme, login, register } from '../api/authApi'

import type {
  LoginType,
  RegisterType,
  LoginResponse,
  RegisterResponse,
  UserType,
} from '../types'


type AuthState = {
  user: UserType | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  loginUser: (credentials: LoginType) => Promise<void>
  registerUser: (payload: RegisterType) => Promise<void>
  logout: () => void
  fetchCurrentUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      loginUser: async (credentials) => {
        set({ loading: true })
        try {
          const response: LoginResponse = await login(credentials)
          set({
            token: response.token,
            isAuthenticated: true,
          })
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>
          toast.error(error.response?.data?.message || 'Login failed')
          throw error
        } finally {
          set({ loading: false })
        }
      },

      registerUser: async (payload) => {
        set({ loading: true })
        try {
          const res: RegisterResponse = await register(payload)
          set({
            user: res.data,
            token: res.token,
            isAuthenticated: true,
          })
          toast.success('Registered successfully. You can now log in.')
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>
          toast.error(error.response?.data?.message || 'Registration failed')
          throw error
        } finally {
          set({ loading: false })
        }
      },
    fetchCurrentUser: async () => {
        try {
          const { data } = await fetchme()
          set({
            user: data,
            isAuthenticated: true,
          })
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>
          toast.error(
            error.response?.data?.message || 'fail to get Information'
          )
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },
        logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ token: state.token }), // persist only token
    }
  )
)
