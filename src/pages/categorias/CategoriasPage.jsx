import React, { useState } from "react";
import CategoriasList from "./CategoriasList";
import CategoriaForm from "./CategoriaForm";

export default function CategoriasPage() {
  const [editing, setEditing] = useState(null); // categoría actual o null
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // para forzar recarga de lista

  const onEdit = (categoria) => {
    setEditing(categoria);
    setShowForm(true);
  };

  const onSaved = () => {
    setShowForm(false);
    setEditing(null);
    setRefreshKey((k) => k + 1);
  };

  const onCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Categorías</h2>
      {showForm ? (
        <CategoriaForm
          categoria={editing}
          onSuccess={onSaved}
          onCancel={onCancel}
        />
      ) : (
        <CategoriasList key={refreshKey} onEdit={onEdit} />
      )}
    </div>
  );
}
