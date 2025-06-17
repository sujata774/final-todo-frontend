

import { CiEdit } from "react-icons/ci";

import { MdDeleteForever } from "react-icons/md";
import { Card } from './ui/card'
import { type TodoType } from '../types'
import { useTodoStore } from '../store/useTodoStore'

interface TodoCardProps {
  todo: TodoType
  filter: string
  onEdit: (todo: TodoType) => void
  onDelete: (id: string) => void
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
  const { updateTodo } = useTodoStore()

  return (
    <Card className="flex items-center  bg-white p-3 px-1 gap-4 w-full ">
      {/* Checkbox and Text */}
      <div className="flex items-center gap-8 ">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={async () => {
            try {
              await updateTodo(todo._id, {
                completed: !todo.completed,
              })
            } catch (error) {
              console.error('Failed to update todo:', error)
            }
          }}
          className="h-4 w-4 accent-blue-600"
        />
        <span
          className={`text-sm ${
            todo.completed ? 'line-through opacity-50' : ''
          }`}
        >
          {todo.text}
        </span>
      

      {/* Edit and Delete buttons */}
<CiEdit
  size={32}
  onClick={() => {
    if (!todo.completed) onEdit(todo)
  }}
  className={`cursor-pointer rounded border p-1 transition
    ${todo.completed
      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'}
  `}
/>


<MdDeleteForever
  size={32}
  onClick={() => onDelete(todo._id)}
  className="cursor-pointer rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 p-1 transition"
/>

      
      </div>
    </Card>
  )
}

export default TodoCard
