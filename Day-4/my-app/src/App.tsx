import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Products from "./routes/Products";
import ProductDetail from "./routes/ProductDetail";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Admin from "./routes/Admin";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/admin"
              element={
                <RequireAuth role="admin">
                  <Admin />
                </RequireAuth>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}