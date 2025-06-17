import api from '../lib/api'
import axios from 'axios'
import type { LoginType, RegisterResponse, RegisterType } from '../types'

export const register = async (
  payload: RegisterType
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>('/auth/register', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Register error:', error.response?.data)
      throw error.response?.data || 'Registration failed'
    }
    throw error
  }
}

export const login = async (payload: LoginType) => {
  try {
    const response = await api.post('/auth/login', payload)
    return response.data
  } catch (error: any) {
    console.error('Login error:', error?.response?.data || error.message)
    throw new Error(
      error?.response?.data?.message || 'Login failed. Please try again.'
    )
  }
}

export const fetchme = async () => {
  const endpoint = 'auth/me'
  try {
    const { data } = await api.get(endpoint)
    
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user information:', error.response)
      throw error.response
    } else {
      console.error('Unexpected error:', error)
      throw error
    }
  }
}
