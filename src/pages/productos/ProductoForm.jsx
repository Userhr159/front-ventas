import React, { useState, useEffect } from "react";
import { crearProducto, actualizarProducto } from "../../api/productos";
import { listarCategorias } from "../../api/categorias";

export default function ProductoForm({ producto, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    categoriaId: "",
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    listarCategorias().then(setCategorias);
    if (producto) {
      setForm({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        imagenUrl: producto.imagenUrl,
        categoriaId: producto.categoria?.idCategoria || "",
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (producto) {
        await actualizarProducto(producto.idProducto, form);
        alert("Producto actualizado correctamente");
      } else {
        await crearProducto(form);
        alert("Producto creado correctamente");
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el producto");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
      }}
    >
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del producto"
        required
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <input
        name="precio"
        type="number"
        step="0.01"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio"
        required
      />
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />

      {/* Campo para URL de imagen */}
      <input
        name="imagenUrl"
        value={form.imagenUrl}
        onChange={handleChange}
        placeholder="URL de imagen (ej: Supabase)"
      />

      <select
        name="categoriaId"
        value={form.categoriaId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar categoría</option>
        {categorias.map((c) => (
          <option key={c.idCategoria} value={c.idCategoria}>
            {c.nombre}
          </option>
        ))}
      </select>

      {/* Preview */}
      {form.imagenUrl && (
        <img
          src={form.imagenUrl}
          alt="Vista previa"
          style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }}
        />
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit">💾 Guardar</button>
        <button type="button" onClick={onCancel}>
          ❌ Cancelar
        </button>
      </div>
    </form>
  );
}
