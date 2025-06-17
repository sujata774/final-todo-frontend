interface Props {
  filter: string
  setFilter: (filter: string) => void
  clearCompleted: () => void
}

export const TodoFilter = ({ filter, setFilter, clearCompleted }: Props) => {
  return (
    <div className="flex justify-between my-3">
      <div className="space-x-2">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={`px-2 py-1 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={clearCompleted} className="text-red-500 text-sm">
        Clear completed
      </button>
    </div>
  )
}
