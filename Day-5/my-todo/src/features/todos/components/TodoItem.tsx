import { useState } from "react";
import type { Todo } from "../types";
import { useTodos } from "../TodoContext";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { updateTodo, deleteTodo, state } = useTodos();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const updating = state.loading.updating[todo.id];
  const deleting = state.loading.deleting[todo.id];

  const onToggle = async () => {
    await updateTodo({ ...todo, completed: !todo.completed });
  };

  const onSave = async () => {
    if (!title.trim()) return;
    await updateTodo({ ...todo, title: title.trim() });
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border rounded p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          disabled={updating || deleting}
          className="w-4 h-4"
          aria-label={`Toggle ${todo.title}`}
        />
        {!editing ? (
          <div>
            <p className={`text-sm ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.title}</p>
            <p className="text-xs text-gray-400">{todo.id.startsWith("tmp-") ? "Saving..." : ""}</p>
          </div>
        ) : (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-2 py-1 border rounded text-black"
            disabled={updating}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {!editing ? (
          <>
            <button
              onClick={() => {
                setTitle(todo.title);
                setEditing(true);
              }}
              className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={updating || deleting}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-xs px-2 py-1 rounded hover:bg-red-50 text-red-600"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        ) : (
          <>
            <button onClick={onSave} className="text-xs px-2 py-1 rounded bg-green-600 text-white" disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditing(false)} className="text-xs px-2 py-1 rounded">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}