import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  // URL DE TU MOCKAPI
  const API_URL = "https://6940b107993d68afba6cbf84.mockapi.io/producto";

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data));
  }, [id]);

  if (!producto) return <div className="container mt-5">Cargando...</div>;

  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={producto.imagen} className="img-fluid rounded-start" alt={producto.nombre} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{producto.nombre}</h2>
              <p className="card-text">{producto.descripcion}</p>
              <h4 className="text-primary">${producto.precio}</h4>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
