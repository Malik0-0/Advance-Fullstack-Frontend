import { useState } from "react";
import TodoList from "./components/TodoList";
import Counter, { CounterConditional } from "./components/Counter";
import Button from "./components/Button";
import "./App.css";

const initialTodos= [
  { id: 1, text: "Belajar React dasar", completed: true },
  { id: 2, text: "Buat project Vite + Tailwind", completed: false },
  { id: 3, text: "Implement props & useState", completed: false },
];

function App() {

  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState(initialTodos);
  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <>      
      <div className="min-h-screen flex items-start justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          {/* ----- Counter Section ----- */}
          <h2 className="text-xl font-semibold mb-4">Counter</h2>

          <div className="space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <Counter text={count} />
              <Button text={"add"} EventonClick={() => setCount(count + 1)} />
            </div>

            <div>
              {count > 10 ? (
                <CounterConditional text="Hore sudah lebih dari 10" />
              ) : (
                <CounterConditional text="Belum lebih dari 10" />
              )}
            </div>
          </div>

          {/* ----- Todo Section ----- */}
            <h1 className="text-2xl font-semibold mb-4">To-Do List (Day 1)</h1>
            <TodoList todos={todos} onToggle={toggleCompleted} />
        </div>
      </div>
    </>
  )
}

export default App
