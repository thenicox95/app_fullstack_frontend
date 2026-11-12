import React from "react";
import "./ComponentsCss/PerfilResumen.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const PerfilResumen = () => {
  // Leemos el usuario desde Redux (o mostramos un avatar por defecto)
  const user = useSelector((state) => state.auth.user);

  return (
    <NavLink to="/profile" className="perfil-resumen-box">
      <img
        src={user?.image || "https://via.placeholder.com/40"}
        alt="Foto de perfil"
        className="perfil-imagen"
      />
      <span className="usuario-nombre">{user?.name || "Mi Perfil"}</span>
    </NavLink>
  );
};

export default PerfilResumen;