
import { useState } from "react";
import { useSelector } from "react-redux";
import { axiosConfig } from "../utils/axiosConfig";
import toast from 'react-hot-toast';

const UpdateRuta = ({ id, nombre, onRutaActualizada }) => {

    const token = useSelector((state) => state.auth.token);

    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const actualizarRuta = async () => {

        try {
            setLoading(true);
            // setError("");

            await axiosConfig.put(`/v1/rutas/${id}`, {
                nombre: nuevoNombre
            }, {
                headers: {
                    Authorization: token
                }
            });
            onRutaActualizada(id, nuevoNombre);
            toast.success(`Ruta actualizada con exito como: ${nuevoNombre}`)

        } catch (error) {
            // setError(
            //     error.response?.data?.message || "No se pudo actualizar la ruta."
            // );
            toast.error(error.response?.data?.message || "No se pudo actualizar la ruta.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
            />

            <button
                type="button"
                onClick={actualizarRuta}
                disabled={loading || !nuevoNombre.trim()}
            >
                {loading ? "Actualizando..." : "Actualizar"}
            </button>

            {/* {error && <p className="error">{error}</p>} */}
        </div>
    );
};

export default UpdateRuta;
