import { useState } from "react";
import { useSelector } from "react-redux";
import { axiosConfig } from "../utils/axiosConfig";
import toast from 'react-hot-toast';

const DeleteRuta = ({ id, onRutaEliminada }) => {

    const token = useSelector((state) => state.auth.token);

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const eliminarRuta = async () => {

        const confirmar = window.confirm("¿Estás seguro de que querés eliminar esta ruta?");

        if (!confirmar) return;

        try {
            setLoading(true);
            // setError("");

            await axiosConfig.delete(`/v1/rutas/${id}`, {
                headers: {
                    Authorization: token
                }
            });

            onRutaEliminada(id);
            toast.success("Ruta eliminada con éxito.")

        } catch (error) {
            // setError(
            //     error.response?.data?.message || "No se pudo eliminar la ruta."
            // );
            toast.error(error.response?.data?.message || "No se pudo eliminar la ruta.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={eliminarRuta}
                disabled={loading}
            >
                {loading ? "Eliminando..." : "Eliminar"}
            </button>
{/* 
            {error && <p className="error">{error}</p>} */}
        </div>
    );
};

export default DeleteRuta;