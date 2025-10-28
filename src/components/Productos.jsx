import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { CarritoContext } from '../context/CarritoContext';
//CSS
import styles from './Productos.module.css'; 


const Productos = () => {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  const { agregarAlCarrito } = useContext(CarritoContext);

  const URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    fetch(URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => setError('Error al cargar productos'))
      .finally(() => setCargando(false))
  },[]);

  if (cargando) return 'Cargando productos...';
  if (error) return error;

  return(
    <div>
      <h2>Productos</h2>
      {/* <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.title} : {producto.price}$
            <img src={producto.image} height={80} width={80}/>
            <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
            <Link to={`/productos/${producto.id}`} >Detalles</Link>
          </li>
        ))}
      </ul> */}

      
      <div className={styles.productosContainer}>
          {productos.map((producto) => (
              <div key={producto.id} className={styles.productoCard}>
                  <img 
                      src={producto.image} 
                      alt={producto.title} 
                      className={styles.productoImagen}
                  />
                  <h3 className={styles.productoNombre}>{producto.title}</h3>
                  <p className={styles.productoPrecio}>${producto.price}</p>
                  {/* <Link to={`/productos/${producto.id}`} >Detalles</Link> */}
                  <button 
                      className={styles.productoBoton}
                      onClick={() => agregarAlCarrito(producto)}
                  >
                      Agregar al carrito
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Productos;
