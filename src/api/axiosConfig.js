import axios from "axios";
import { createBrowserHistory } from "history";

// 🔗 URL base (tu API Gateway en Spring Boot)
const API_GATEWAY = "http://localhost:8080";

// Crear historial para redirecciones manuales si se desea usar React Router
export const history = createBrowserHistory();

// Crear instancia de axios
const api = axios.create({
  baseURL: API_GATEWAY,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // tiempo máximo de espera (opcional)
});

// ============================
// 🛡️ INTERCEPTOR DE REQUEST
// ============================
// Antes de enviar la petición, adjunta el token JWT (si existe)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================
// 🚨 INTERCEPTOR DE RESPUESTA
// ============================
// Si el servidor responde con 401, el token expiró o no es válido
api.interceptors.response.use(
  (response) => response, // pasa las respuestas exitosas
  (error) => {
    if (error.response) {
      // Si el backend devuelve un 401, redirigimos al login
      if (error.response.status === 401) {
        console.warn("Token inválido o expirado. Redirigiendo al login...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // Redirigir al login
        window.location.href = "/";
      }

      // Si ocurre un error 403 (prohibido)
      if (error.response.status === 403) {
        alert("No tienes permiso para acceder a este recurso.");
      }
    } else {
      console.error("Error de conexión con el servidor:", error);
    }

    return Promise.reject(error);
  }
);

// ============================
// 📦 EXPORTAR
// ============================
export default api;
