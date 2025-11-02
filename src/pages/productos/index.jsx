import React, { useState } from "react";
import ProductosList from "./ProductosList";
import ProductoForm from "./ProductoForm";

export default function ProductosPage() {
  const [editing, setEditing] = useState(null); // producto o null
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onEdit = (producto) => {
    setEditing(producto);
    setShowForm(true);
  };

  const onSaved = () => {
    setShowForm(false);
    setEditing(null);
    setRefreshKey(k => k + 1);
  };

  const onCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Productos</h2>
      {showForm ? (
        <ProductoForm producto={editing} onSaved={onSaved} onCancel={onCancel} />
      ) : (
        <ProductosList key={refreshKey} onEdit={onEdit} />
      )}
    </div>
  );
}
