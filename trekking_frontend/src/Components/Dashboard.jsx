import "./ComponentsCss/Dashboard.css";
import ListadoRutas from "./ListadoRutas";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCategorias } from "../store/slices/categoriasSlice";
import { useEffect } from "react";
import { axiosConfig } from "../utils/axiosConfig";

const Dashboard = () => {

  //Cuando entramos al dashboard que es obligatorio, ya cargamos las categorias.
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias.categorias);

  const cargadas = useSelector((state) => state.categorias.cargadas);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await axiosConfig.get("/v1/categorias/all");

        const categoriasRecibidas = response.data.data ?? response.data;

        dispatch(setCategorias(categoriasRecibidas));

      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    if (!cargadas) {
      cargarCategorias();
    }

  }, [dispatch, cargadas]);

  return (
    <div className="dashboard-container">
      <main className="dashboard-contenido">
        <div className="dashboard-acciones">
          <NavLink to="/crear-ruta" className="btn-crear-ruta">
            + Crear nueva ruta
          </NavLink>
          <NavLink to="/categorias" className="btn-crear-ruta">
            Ver todas las categorías
          </NavLink>
        </div>

        <ListadoRutas />

      </main>
    </div>
  );
};

export default Dashboard;