import React, { useEffect, useState } from "react";
import { crearCategoria, actualizarCategoria } from "../../api/categorias";

export default function CategoriaForm({ categoria, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    urlIcono: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (categoria) setForm(categoria);
  }, [categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (categoria) {
        await actualizarCategoria(categoria.idCategoria, form);
        setMsg("✅ Categoría actualizada correctamente.");
      } else {
        await crearCategoria(form);
        setMsg("✅ Categoría creada correctamente.");
      }

      // Notificar al padre para refrescar la lista
      onSuccess();
      setForm({ nombre: "", descripcion: "", urlIcono: "" });
    } catch (err) {
      console.error(err);
      setMsg("❌ Error al guardar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 16,
      maxWidth: 400,
      margin: "20px auto"
    }}>
      <h3>{categoria ? "Editar Categoría" : "Nueva Categoría"}</h3>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          rows={3}
        />
        <input
          type="text"
          name="urlIcono"
          placeholder="URL del ícono"
          value={form.urlIcono}
          onChange={handleChange}
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : categoria ? "Actualizar" : "Crear"}
          </button>
          <button type="button" onClick={onCancel} style={{ background: "#ccc" }}>
            Cancelar
          </button>
        </div>
      </form>

      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </div>
  );
}
