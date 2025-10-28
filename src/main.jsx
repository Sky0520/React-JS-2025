import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
