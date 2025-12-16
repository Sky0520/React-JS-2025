import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify"; // Feedback visual (Req #3)

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto (evita duplicados sumando cantidad o simple)
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    toast.success("Producto agregado al carrito 🛒");
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((prod) => prod.id !== id));
    toast.info("Producto eliminado del carrito");
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    toast.warn("Se vació el carrito");
  };

  // Calcular total (Opcional pero recomendado)
  const precioTotal = () => {
    return carrito.reduce((acc, prod) => acc + Number(prod.precio), 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        precioTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
