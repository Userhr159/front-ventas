import { useState } from "react";
import api from "../api/axiosConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", { username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.rol);

      if (res.data.rol === "ADMIN") {
        window.location.href = "/admin";
      } else if (res.data.rol === "CLIENTE") {
        window.location.href = "/cliente";
      }
    } catch (err) {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
