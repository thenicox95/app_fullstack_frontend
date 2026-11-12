import "./ComponentsCss/ListadoRutas.css";
import "./ComponentsCss/PageButtons.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ruta from "./Ruta";
import DeleteRuta from "./DeleteRuta";
import FormularioUpdateRuta from "./Formularios/FormularioUpdateRuta";
import { axiosConfig } from "../utils/axiosConfig";

const ListadoRutas = ({ soloUsuario = false }) => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

  const tokenRedux = useSelector((state) => state.auth.token);
  const token = tokenRedux || localStorage.getItem("token");

  useEffect(() => {
    const obtenerRutas = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (soloUsuario) {
          const config = { headers: { Authorization: token } };
          response = await axiosConfig.get("/v1/users/me/rutas", config);
        } else {
          response = await axiosConfig.get(`/v1/rutas?page=${page}&limit=6`);
        }

        setRutas(response.data.data ?? response.data);

      } catch (error) {
        console.error("Error al obtener las rutas:", error);
        setError("No se pudieron cargar las rutas.");

      } finally {
        setLoading(false);
      }
    };

    if (soloUsuario && !token) {
      setError("No estás autenticado.");
      setLoading(false);
      return;
    }

    obtenerRutas();
  }, [page, soloUsuario, token]);

  const actualizarNombreRuta = (id, nuevoNombre) => {
    setRutas((rutasActuales) =>
      rutasActuales.map((ruta) =>
        ruta._id === id
          ? { ...ruta, nombre: nuevoNombre }
          : ruta
      )
    );

    setRutaSeleccionada(null);
  };

  return (
    <section className="listado-rutas-container">

      {rutaSeleccionada ? (
        <FormularioUpdateRuta
          key={rutaSeleccionada._id}
          ruta={rutaSeleccionada}
          onRutaActualizada={actualizarNombreRuta}
          onCancelar={() => setRutaSeleccionada(null)}
        />
      ) : (
        <>
          <h2>Rutas disponibles:</h2>

          {loading && <p>Cargando rutas...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && !error && rutas.length === 0 && (
            <p>No hay rutas disponibles.</p>
          )}

          {!loading && !error && rutas.length > 0 && (
            <>
              <div className="rutas-grid">
                {rutas.map((item) => (
                  <div key={item._id} className="ruta-wrapper">

                    <Ruta
                      id={item._id}
                      nombre={item.nombre}
                      ubicacion={`${item.ubicacion?.pais || ""}, ${item.ubicacion?.ciudad || ""}, ${item.ubicacion?.departamento || ""}`}
                      distancia={item.distancia}
                      dificultad={item.dificultad}
                    />

                    {soloUsuario && (
                      <div className="ruta-acciones">

                        <button
                          type="button"
                          onClick={() => setRutaSeleccionada(item)}
                        >
                          Modificar
                        </button>

                        <DeleteRuta
                          id={item._id}
                          onRutaEliminada={(id) => {
                            setRutas((rutasActuales) =>
                              rutasActuales.filter(
                                (ruta) => ruta._id !== id
                              )
                            );
                          }}
                        />

                      </div>
                    )}

                  </div>
                ))}
              </div>

              {!soloUsuario && (
                <div className="paginacion-controles">

                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 || loading}
                  >
                    Anterior
                  </button>

                  <span>Página {page}</span>

                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={rutas.length < 6 || loading}
                  >
                    Siguiente
                  </button>

                </div>
              )}
            </>
          )}
        </>
      )}

    </section>
  );
};

export default ListadoRutas;
