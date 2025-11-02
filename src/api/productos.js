import api from "./axiosConfig";

export const listarProductos = async () => {
  const res = await api.get("/productos/listar");
  return res.data;
};

export const obtenerProducto = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

export const crearProducto = async (producto) => {
  const res = await api.post("/productos", producto);
  return res.data;
};

export const actualizarProducto = async (id, producto) => {
  const res = await api.put(`/productos/${id}`, producto);
  return res.data;
};

export const eliminarProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data;
};
