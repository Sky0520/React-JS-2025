import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, precioTotal } = useCarrito();

  if (carrito.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>El carrito está vacío 😢</h2>
        <Link to="/" className="btn btn-primary mt-3">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Tu Carrito</h2>
      <ul className="list-group mb-3">
        {carrito.map((prod, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-bold">{prod.nombre}</span> - ${prod.precio}
            </div>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => eliminarDelCarrito(prod.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-end">Total: ${precioTotal()}</h3>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-danger" onClick={vaciarCarrito}>Vaciar Carrito</button>
        <button className="btn btn-success">Finalizar Compra</button>
      </div>
    </div>
  );
}