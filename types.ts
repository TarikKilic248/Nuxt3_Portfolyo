export interface Todo{
  userId: number
  id: number
  todo: string
  completed: boolean
}

export interface User{
  id: number
  name: string
  picture: string
}

export interface UserWithTodo extends User{
  todos: Todo[]
}