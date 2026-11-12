// src/components/RutaProtegida.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RutaProtegida = () => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
    const user = useSelector((state) => state.auth.user);

    // Si no hay token NI usuario, rebotamos al Login ("/")
    if (!token && !user) {
        return <Navigate to="/" replace />;
    }

    // Si está autenticado, renderiza los componentes hijos (Dashboard, Perfil, etc.)
    return <Outlet />;
};

export default RutaProtegida;