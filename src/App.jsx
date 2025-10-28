import Carrito from "./components/Carrito";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Moda from "./pages/Moda";
import { Routes, Route } from "react-router-dom";
import ProductoDetalle from "./pages/ProductoDetalle";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Tecnologia from "./pages/Tecnologia";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/moda" element={<Moda />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          {/* No se pide para la pre-entrega */}
          <Route
            path="/carrito"
            element={
              <RutaProtegida >
                <Carrito />
              </RutaProtegida>
            }
          />
          {/* No se pide para la pre-entrega */}
          <Route
            path="/admin"
            element={
              <RutaProtegida >
                <Admin />
              </RutaProtegida>
            }
          />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
