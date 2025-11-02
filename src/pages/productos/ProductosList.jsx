import React, { useEffect, useState } from "react";
import { listarProductos, eliminarProducto } from "../../api/productos";

export default function ProductosList({ onEdit }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await listarProductos();
      setProductos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await eliminarProducto(id);
      fetch();
    } catch (e) {
      alert("No se pudo eliminar (revisa permisos).");
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (!productos || productos.length === 0) return <p>No hay productos.</p>;

  return (
    <div>
      {role === "ROLE_ADMIN" && (
        <button onClick={() => onEdit(null)} style={{ marginBottom: 12 }}>
          ➕ Crear producto
        </button>
      )}

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {productos.map((p) => (
          <div
            key={p.idProducto}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#fafafa",
            }}
          >
            {/* Mostrar imagen si existe */}
            {p.urlImagenPrincipal ? (
              <img
                src={p.urlImagenPrincipal}
                alt={p.nombre}
                style={{
                  width: "100%",
                  maxWidth: 220,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
            ) : (
              <div
                style={{
                  width: 220,
                  height: 150,
                  background: "#eee",
                  borderRadius: 8,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                }}
              >
                Sin imagen
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <h3 style={{ margin: "6px 0" }}>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <p>
                <strong>S/ {p.precio}</strong> • Stock: {p.stock}
              </p>
              <p>Categoría: {p.categoria?.nombre || "-"}</p>
            </div>

            {role === "ROLE_ADMIN" && (
              <div style={{ marginTop: 8 }}>
                <button onClick={() => onEdit(p)} style={{ marginRight: 6 }}>
                  ✏️
                </button>
                <button onClick={() => handleDelete(p.idProducto)}>🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
