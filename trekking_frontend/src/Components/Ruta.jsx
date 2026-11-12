import "./ComponentsCss/RutaCard.css";
import { useNavigate } from "react-router";

//Cambiar los props segun necesidad.
const Ruta = ({ id, nombre, ubicacion, distancia, dificultad }) => {

  const navigate = useNavigate();

  return (
    <article className="ruta-card">
      <div className="ruta-header">
        <h3>{nombre}</h3>
        <span className={`badge dificultad-${dificultad.toLowerCase()}`}>
          {dificultad}
        </span>
      </div>
      <div className="ruta-body">
        <p><strong>Ubicación:</strong> {ubicacion}</p>
        <p><strong>Distancia:</strong> {distancia} km</p>
      </div>
      <div className="ruta-footer">
        <button type="button" className="btn-detalle" onClick={() => navigate(`/rutas/${id}`)}>Ver detalle</button>
      </div>
    </article>
  );
};

export default Ruta;