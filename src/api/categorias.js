import api from "./axiosConfig";

export const listarCategorias = async () => {
  const res = await api.get("/categorias/listar");
  return res.data;
};

export const crearCategoria = async (categoria) => {
  const res = await api.post("/categorias", categoria);
  return res.data;
};

export const actualizarCategoria = async (id, categoria) => {
  const res = await api.put(`/categorias/${id}`, categoria);
  return res.data;
};

export const eliminarCategoria = async (id) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data;
};
