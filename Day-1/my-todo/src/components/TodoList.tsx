import TodoItem from "./TodoItem";
import type { Todo } from "../types";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
};

export default function TodoList({ todos, onToggle }: Props) {
  if (!todos || todos.length === 0) {
    return <p className="text-slate-500">Belum ada to-do.</p>;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </div>
  );
}