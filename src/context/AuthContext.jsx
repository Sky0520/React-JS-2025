import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (email) => {
    // LÓGICA DE ROLES SIMULADA
    // Si el mail es 'admin@admin.com', le damos rol 'admin'. Si no, 'user'.
    const rol = email === "admin@admin.com" ? "admin" : "user";

    const usuarioSimulado = { 
        email, 
        rol, // Guardamos el rol aquí
        token: "123456" 
    };

    setUser(usuarioSimulado);
    localStorage.setItem("usuario", JSON.stringify(usuarioSimulado));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);