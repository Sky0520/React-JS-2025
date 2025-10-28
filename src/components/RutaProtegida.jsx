import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
//no se pide para la Pre-entrega
const RutaProtegida = ({children}) => {
  const { usuario } = useAuthContext();
  
  if(!usuario)
    return <Navigate to="/login" replace />;
  
  return children;
}

export default RutaProtegida;