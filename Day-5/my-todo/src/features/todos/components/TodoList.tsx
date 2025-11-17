import { useTodos } from "../TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { state } = useTodos();

  if (state.todos.length === 0) {
    return <p className="text-center text-gray-500">No todos yet — add one!</p>;
  }

  return (
    <ul className="space-y-2 text-white">
      {state.todos.map((t) => (
        <li key={t.id}>
          <TodoItem todo={t} />
        </li>
      ))}
    </ul>
  );
}