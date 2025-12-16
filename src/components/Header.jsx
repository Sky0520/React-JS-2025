import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { carrito } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🛒 Mi Tienda</Link>
        
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-white text-decoration-none">Inicio</Link>
          
          {user ? (
            <>
              {/* SOLO MOSTRAMOS ESTE LINK SI ES ADMIN */}
              {user.rol === "admin" && (
                <Link to="/admin" className="text-white text-decoration-none">
                  🔧 Administrar
                </Link>
              )}

              <Link to="/carrito" className="btn btn-primary position-relative">
                🛒 Carrito
                {carrito.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carrito.length}
                  </span>
                )}
              </Link>
              <div className="text-white small ms-2">
                 Hola, {user.rol === "admin" ? "Admin" : "User"}
              </div>
              <button onClick={logout} className="btn btn-outline-light btn-sm">Salir</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-success">Ingresar</Link>
          )}
        </div>
      </div>
    </nav>
  );
}