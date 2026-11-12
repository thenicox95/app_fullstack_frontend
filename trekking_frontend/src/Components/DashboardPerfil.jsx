import "./ComponentsCss/DashboardPerfil.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ListadoRutas from "./ListadoRutas";
import FotoPerfil from "./FotoPerfil";
import { axiosConfig } from "../utils/axiosConfig";
import { actualizarUsuario } from "../store/slices/authSlice";

const Perfil = () => {

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const email = user?.email || "No autenticado";

  const cambiarAPremium = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          Authorization: token
        }
      };

      const response = await axiosConfig.patch(
        "/v1/users/me/plan",
        {},
        config
      );

      dispatch(actualizarUsuario(response.data.user));

    } catch (error) {
      console.error("Error al cambiar el plan:", error);

      setError(
        error.response?.data?.message ||
        "No se pudo actualizar el plan."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-container">

      <section className="perfil-card">

        <FotoPerfil />

        <div className="perfil-info">

          <h2 className="perfil-nombre">
            Nombre de usuario: {user?.name}
          </h2>

          <span className="badge badge-rol">
            Usuario {user?.plan}
          </span>

          {user?.plan !== "PREMIUM" && (
            <button
              className="btn-premium"
              onClick={cambiarAPremium}
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Pasar a Premium"}
            </button>
          )}

          {error && <p className="error">{error}</p>}

        </div>

      </section>

      <main className="perfil-contenido">
        <ListadoRutas soloUsuario={true} />
      </main>

    </div>
  );
};

export default Perfil;
