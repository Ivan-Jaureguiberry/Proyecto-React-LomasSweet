import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaProtegida = ({ children, soloAdmin = false }) => {
    const { usuario, cargando } = useAuth();
    const location = useLocation();

    // Mientras Firebase verifica la sesión, no redirigimos todavía
    if (cargando) return <p style={{ textAlign: "center", padding: "4rem" }}>Verificando sesión...</p>;

    // Si no está logueado, lo mandamos al login y recordamos a dónde quería ir
    if (!usuario) return <Navigate to="/login" replace state = {{ desde: location.pathname }} />;

    // Si la ruta es solo para admin y no lo es, lo mando al inicio
    if (soloAdmin && usuario.rol !== "admin") return <Navigate to="/" replace />;

    return children;
}

export default RutaProtegida;