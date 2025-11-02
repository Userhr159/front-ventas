import axios from "axios";

const API_GATEWAY_URL = "http://localhost:8080"; // URL de tu API Gateway

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};
