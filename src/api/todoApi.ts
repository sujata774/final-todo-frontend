import axios from 'axios'
import api from '../lib/api'
import type {
  TodoPayload,
  GetTodosResponse,
  CreateTodoResponse,
  UpdateTodosResponse,
  TodoUpdateType,
} from '../types'

// Fetch todos with optional params
export const getTodos = async (): Promise<GetTodosResponse> => {
  try {
    const { data } = await api.get<GetTodosResponse>('/todos')
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Fetching todos failed'
    }
    throw error
  }
}

// Create a new todo
export const createTodo = async (
  payload: TodoPayload
): Promise<CreateTodoResponse> => {
  try {
    const { data } = await api.post<CreateTodoResponse>('/todos', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Todo creation failed'
    }
    throw error
  }
}

// Update a todo by ID
export const updateTodo = async (
  id: string,
  payload: Partial<TodoUpdateType>
): Promise<UpdateTodosResponse> => {
  try {
    const { data } = await api.put<UpdateTodosResponse>(`/todos/${id}`, payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Updating todo failed'
    }
    throw error
  }
}

// Delete a todo by ID
export const deleteTodo = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/todos/${id}`)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Deleting todo failed'
    }
    throw error
  }
}
