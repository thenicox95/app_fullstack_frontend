import "./ComponentsCss/DashboardPerfil.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ListadoRutas from "./ListadoRutas";
import FotoPerfil from "./FotoPerfil";
import { axiosConfig } from "../utils/axiosConfig";
import { actualizarUsuario } from "../store/slices/authSlice";
import GraficaProgreso from "./GraficaProgreso";
import toast from 'react-hot-toast';

const Perfil = () => {

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  //El estado de las rutas actual para poder crear la grafica.
  const [rutas, setRutas] = useState([]);

  // const email = user?.email || "No autenticado";
  //Calculamos el porcentaje.
  const porcentaje = Math.min((rutas.length / 4) * 100, 100);

  const cambiarAPremium = async () => {
    try {
      setLoading(true);
      // setError(null);

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
      toast.success("Bienvenido a la comunidad PREMIUM.")

    } catch (error) {
      toast.error(error.response?.data?.message ||"No se pudo actualizar el plan.")

      // setError(
      //   error.response?.data?.message ||
      //   "No se pudo actualizar el plan."
      // );

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
{/* 
          {error && (
            <p className="error">{error}</p>
          )} */}

        </div>

        {user?.plan === "PLUS" && (
          <GraficaProgreso porcentaje={porcentaje} />
        )}

      </section>

      <main className="perfil-contenido">

        <ListadoRutas
          soloUsuario={true}
          onRutasCargadas={setRutas}
        />

      </main>

    </div>
  );
};

export default Perfil;
