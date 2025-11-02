// src/api/validate.js
import axios from "axios";

const API_GATEWAY_URL = "http://localhost:8080";

export const validateToken = async (token) => {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error validando token:", error);
    return null;
  }
};
