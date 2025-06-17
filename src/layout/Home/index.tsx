import { useState, useEffect } from 'react'
import TodoList from '../../components/TodoList'
import { TodoFilter } from '../../components/TodoFilter'
import { useTodoStore } from '../../store/useTodoStore'
import TodoForm from '../../components/TodoForm'
import type { TodoFormValues } from '../../types'
import Header from '../../components/Header'

export const Todo = () => {
  const [filter, setFilter] = useState('all')
  const [editingTodo, setEditingTodo] = useState<TodoFormValues | null>(null)

  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    fetchTodos,
  } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleSubmit = async (data: TodoFormValues) => {
    if (data._id) {
      await updateTodo(data._id, { text: data.text })
    } else {
      await addTodo({
          text: data.text,
          completed: false
      })
    }
    setEditingTodo(null)
  }

  const handleDelete = async (id: string) => {
    await deleteTodo(id)
  }

  return (
    <section className='bg-gray-200'>
         <Header/>
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-auto ">
   
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Todo App
      </h1>

      <TodoForm onSubmit={handleSubmit} initialValues={editingTodo} />

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />

      <TodoList
  todos={todos}
  filter={filter}
  onEdit={setEditingTodo} // ✅ correct if prop is a state setter
  onDelete={handleDelete}
/>


      <p className="text-sm text-gray-500 mt-3 text-center">
        {todos.filter((t) => !t.completed).length} items left
      </p>
      
    </div>
    </section>

  )
}

export default Todo
