import TodoForm from "../features/todos/components/TodoForm";
import TodoList from "../features/todos/components/TodoList";
import { useTodos } from "../features/todos/TodoContext";

export default function TodosPage() {
  const { state } = useTodos();

  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Your To-Dos</h2>

      {state.error ? (
        <div className="mb-3 p-2 bg-red-50 text-red-700 rounded">{state.error}</div>
      ) : null}

      <TodoForm />
      <TodoList />
    </section>
  );
}