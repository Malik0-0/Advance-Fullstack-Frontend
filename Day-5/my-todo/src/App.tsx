import { Routes, Route, Link } from "react-router-dom";
import TodosPage from "./routes/TodosPage";

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-3xl mx-auto mb-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">To-Do App</h1>
          <div className="space-x-3">
            <Link to="/" className="text-sm px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<TodosPage />} />
        </Routes>
      </main>
    </div>
  );
}