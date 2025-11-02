import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

// 🔒 Componente que protege las rutas privadas según el rol
function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Si no hay token, no puede acceder
  if (!token) return <Navigate to="/" replace />;

  // Si tiene token, pero su rol no coincide
  if (role && userRole !== role) return <Navigate to="/" replace />;

  // Si todo bien, renderiza el componente protegido
  return children;
}

// 🧭 Rutas principales
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🟢 Página de Login */}
        <Route path="/" element={<LoginPage />} />

        {/* 🔵 Panel del administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🟣 Panel del cliente */}
        <Route
          path="/cliente"
          element={
            <ProtectedRoute role="CLIENTE">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🟥 Redirección si no existe la ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
