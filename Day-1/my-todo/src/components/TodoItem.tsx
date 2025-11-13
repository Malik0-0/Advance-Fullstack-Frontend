import type { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
};

export default function TodoItem({ todo, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
            todo.completed ? "bg-green-500 text-white" : "bg-white"
          }`}
        >
          {todo.completed ? "✓" : ""}
        </button>

        <span className={todo.completed ? "line-through text-slate-400" : ""}>
          {todo.text}
        </span>
      </div>

      {todo.completed && (
        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
          done
        </span>
      )}
    </div>
  );
}