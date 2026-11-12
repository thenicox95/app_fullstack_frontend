import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { axiosConfig } from "../utils/axiosConfig";
import "./ComponentsCss/DetalleRuta.css";

const DetalleRuta = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Obtenemos el token desde Redux o localStorage.
    const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

    // Estados del componente.
    const [informacionIA, setInformacionIA] = useState(null);
    const [datosClima, setDatosClima] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDetalleYClima = async () => {

            if (!token) {
                setError("No estás autenticado. Por favor, iniciá sesión.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            // Configuración de autenticación para Axios.
            const config = {
                headers: {
                    Authorization: token,
                },
            };

            try {
                // Consultamos IA y clima en paralelo.
                const [resIA, resClima] = await Promise.all([
                    axiosConfig.post(`/v1/ia/groq/${id}`, {}, config), //El segundo elemento es el body que va vacio.
                    axiosConfig.get(`/v1/rutas/clima/${id}`, config),
                ]);

                // Guardamos las respuestas en los estados.
                setInformacionIA(resIA.data);
                setDatosClima(resClima.data.clima);

            } catch (err) {
                console.error("Error al obtener los detalles:", err);

                if (err.response?.status === 401) {
                    setError("Sesión expirada o no autorizada. Probá iniciando sesión nuevamente.");
                } else {
                    setError("No se pudo cargar la información de la ruta.");
                }

            } finally {
                setLoading(false);
            }
        };

        if (id) {
            obtenerDetalleYClima();
        }

    }, [id, token]);

    // Renderizado según el estado de la petición.
    if (loading) {
        return (
            <div className="detalle-container">
                <p>Cargando detalle de la ruta...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detalle-container">
                <p className="error">{error}</p>
            </div>
        );
    }

    return (
        <div className="detalle-container">

            <button className="btn-volver" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <h2>{informacionIA?.rutaOriginal || "Detalle de la Ruta"}</h2>

            {datosClima && (
                <section className="clima-card">
                    <h3>Clima actual en {datosClima.ciudad}</h3>

                    <p>
                        <strong>Temperatura:</strong> {datosClima.temperatura}°C
                        (Sensación térmica: {datosClima.sensacionTermica}°C)
                    </p>

                    <p>
                        <strong>Estado:</strong> {datosClima.descripcionClima}
                    </p>

                    <p>
                        <strong>Humedad:</strong> {datosClima.humedad}%
                    </p>

                    <p>
                        <strong>Viento:</strong> {datosClima.viento} km/h
                    </p>
                </section>
            )}

            {informacionIA?.descripcionSugerida && (
                <section className="ia-card">
                    <h3>Descripción y Recomendaciones (IA)</h3>
                    <p className="ia-texto">
                        {informacionIA.descripcionSugerida}
                    </p>
                </section>
            )}

        </div>
    );
};

export default DetalleRuta;
