import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // IMPORTANTE
import "react-toastify/dist/ReactToastify.css";  // IMPORTANTE CSS

import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Carrito from "./components/Carrito";
import ProductoDetalle from "./pages/ProductoDetalle";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./components/Admin";
// Estos dos si no los tienes creados, coméntalos o crea archivos vacíos
import Moda from "./pages/Moda";
import Tecnologia from "./pages/Tecnologia";

function App() {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }}> {/* Para que el footer baje */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/moda" element={<Moda />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />

          {/* Rutas Privadas */}
          <Route path="/carrito" element={
              <RutaProtegida> <Carrito /> </RutaProtegida>
          } />
          <Route path="/admin" element={
              <RutaProtegida> <Admin /> </RutaProtegida>
          } />
          {/* Ruta dinámica para editar */}
          <Route path="/editar/:id" element={
              <RutaProtegida> <Admin /> </RutaProtegida>
          } />
        </Routes>
      </div>
      <Footer />
      
      {/* Esto hace que las notificaciones funcionen */}
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;