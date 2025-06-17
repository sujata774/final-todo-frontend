import { type TodoFormValues, type TodoType } from '../types'
import TodoCard from './TodoCard'

interface TodoListProps {
  todos: TodoType[]
  filter: string
  onEdit: React.Dispatch<React.SetStateAction<TodoFormValues | null>>
  onDelete: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter, onEdit, onDelete }) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (filteredTodos.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold text-gray-900">No todos found</h3>
          <p className="mt-2 text-sm text-gray-500">Add a new task to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {filteredTodos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          filter=""
        />
      ))}
    </div>
  )
}

export default TodoList
