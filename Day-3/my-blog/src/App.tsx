import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">My Blog</Link>
          <div className="flex gap-3 items-center">
            <Link to="/" className="text-sm">Home</Link>
            <Link to="/about" className="text-sm">About</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
  );
}