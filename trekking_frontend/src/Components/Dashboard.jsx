import "./ComponentsCss/Dashboard.css";
import ListadoRutas from "./ListadoRutas";
import { NavLink } from "react-router";

const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <main className="dashboard-contenido">

        <div className="dashboard-acciones">
          <NavLink to="/crear-ruta" className="btn-crear-ruta">
            + Crear nueva ruta
          </NavLink>
        </div>

        <ListadoRutas />

      </main>
    </div>
  );
};

export default Dashboard;