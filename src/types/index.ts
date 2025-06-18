export type RegisterType = {
  name: string
  phone: number
  password: string
}

export type UserType = {
  _id: string
  name: string
  phone: number
}

export type RegisterResponse = {
  data: UserType
  token: string
}


export type LoginType = {
  phone: number
  password: string
}

export type LoginResponse = {
  message: string
  token: string
}


export type TodoPayload = {
  text: string
  completed: boolean
}

export type TodoType = {
  _id: string
  text: string
  completed: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
export type CreateTodoResponse = {
  data: TodoType
  message: string
}

export type GetTodosResponse = {
  data: TodoType[]
}

export type UpdateTodosResponse = {
  message: string
  data: TodoType
}

export type TodoUpdateType = {
  todoId?: string
  text?: string
  completed?: boolean
}

export type TodoFormValues = {
  text: string
  completed: boolean
  _id?: string
}

export interface LoginResponseType {
  token: string
  message: string
  user: {
    id: string
    name: string
    phone: string
  }
}
