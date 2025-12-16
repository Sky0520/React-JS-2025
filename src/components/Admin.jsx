import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para leer ID de url y navegar
import { toast } from "react-toastify";

export default function Admin() {
  const { id } = useParams(); // Si existe ID, estamos editando
  const navigate = useNavigate();

  // ⚠️ IMPORTANTE: REEMPLAZA ESTA URL POR LA TUYA DE MOCKAPI
  const URL_API = "https://6940b107993d68afba6cbf84.mockapi.io/producto"; 

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    categoria: "",
    descripcion: "",
  });

  // Si estamos en modo edición, cargamos los datos del producto
  useEffect(() => {
    if (id) {
      fetch(`${URL_API}/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(() => toast.error("Error al cargar producto"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones (Req #2)
    if (!form.nombre || form.precio <= 0 || form.descripcion.length < 10) {
      return toast.warning("Verifica: Precio > 0 y Descripción > 10 caracteres");
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `${URL_API}/${id}` : URL_API;

      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      toast.success(id ? "Producto Actualizado!" : "Producto Creado!");
      navigate("/"); // Volvemos al inicio al terminar
    } catch (error) {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" name="precio" className="form-control" value={form.precio} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de Imagen</label>
          <input name="imagen" className="form-control" value={form.imagen} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" className="form-control" value={form.descripcion} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {id ? "Guardar Cambios" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}