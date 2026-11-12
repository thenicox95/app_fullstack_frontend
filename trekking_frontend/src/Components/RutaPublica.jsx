// src/components/RutaPublica.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RutaPublica = () => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    // Si ya existe sesión activa, rebotamos al dashboard
    if (token || user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default RutaPublica;