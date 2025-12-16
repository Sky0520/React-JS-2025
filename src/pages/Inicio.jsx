import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const { agregarAlCarrito } = useCarrito();
  const { user } = useAuth();

  // ⚠️ VERIFICA TU URL (Asegúrate que sea la correcta de MockAPI)
  const API_URL = "https://6940b107993d68afba6cbf84.mockapi.io/producto";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => {
        // PROTECCIÓN: Solo guardamos si es una lista real
        if (Array.isArray(data)) {
            setProductos(data);
        } else {
            console.error("API devolvió algo raro:", data);
            // Si la API no devuelve un array, dejamos la lista vacía para no romper la app
            setProductos([]); 
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al cargar productos");
        setProductos([]); // En caso de error, lista vacía
      });
  }, []);

  // PROTECCIÓN: Filtramos solo si hay productos
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const [pagina, setPagina] = useState(1);
  const porPagina = 6;
  const maximo = Math.ceil(productosFiltrados.length / porPagina);

  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Buscar productos..."
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPagina(1);
        }}
      />

      {productosFiltrados.length === 0 ? (
        <div className="text-center mt-5">
            <h3>Cargando productos o no se encontraron...</h3>
            <p className="text-muted">Si esto tarda mucho, revisa la URL de tu API.</p>
        </div>
      ) : (
        <div className="row">
          {productosFiltrados
            .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((prod) => (
              <div key={prod.id} className="col-12 col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img 
                    src={prod.imagen || "https://placehold.co/400x300"} 
                    className="card-img-top" 
                    alt={prod.nombre} 
                    style={{ height: "200px", objectFit: "cover" }} 
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{prod.nombre}</h5>
                    <p className="card-text fw-bold text-primary">${prod.precio}</p>
                    
                    <div className="mt-auto d-flex gap-2">
                      <Link to={`/productos/${prod.id}`} className="btn btn-outline-secondary w-50">Ver</Link>
                      <button 
                        className="btn btn-primary w-50" 
                        onClick={() => agregarAlCarrito(prod)}
                      >
                        Comprar
                      </button>
                    </div>

                    {/* LÓGICA DE ROLES: Solo Admin ve esto */}
                    {user && user.rol === "admin" && (
                      <div className="d-flex gap-2 mt-2">
                          <Link to={`/editar/${prod.id}`} className="btn btn-warning btn-sm w-50">
                            ✏️ Editar
                          </Link>
                          <button className="btn btn-danger btn-sm w-50">🗑️ Borrar</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {maximo > 1 && (
        <div className="d-flex justify-content-center gap-3 mt-4 mb-5">
          <button className="btn btn-secondary" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
          <span className="align-self-center">Página {pagina} de {maximo}</span>
          <button className="btn btn-secondary" disabled={pagina === maximo} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
        </div>
      )}
    </div>
  );
}