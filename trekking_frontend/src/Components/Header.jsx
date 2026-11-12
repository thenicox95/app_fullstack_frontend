import { useSelector, useDispatch } from "react-redux";
import "./ComponentsCss/Header.css";
import { useNavigate } from "react-router";
import { cerrarSesion } from "../store/slices/authSlice";
import PerfilResumen from "./PerfilResumen";

const Header = () => {

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(cerrarSesion());
        navigate("/");
    }

    const estaAutenticado = Boolean(token || user);

    return (
    <header className="header-app">
      {/* Si hay usuario nos lleva al dashboard, si no, nos lleva al inicio. Esto lo hacemos con un ternario que nos devuelve la ruta a la que queremos ir dependiendo de si hay usuario o no. */}
      <h1 onClick={() => navigate(estaAutenticado ? "/dashboard" : "/")}>TREKKING APP</h1>
    {/* Si hay usuario, muestra PerfilResumen; si no, muestra el mensaje */}
    {estaAutenticado ? (
    <div className="header-acciones">
      <PerfilResumen />
      <button onClick={logout} className="btn-logout">
        Cerrar sesión
      </button>
    </div>
    ) : (
  <p>Por favor, inicie sesión.</p>
  )}
    </header>
  );
};

export default Header;