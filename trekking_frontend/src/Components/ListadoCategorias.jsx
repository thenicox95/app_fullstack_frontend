import "./ComponentsCss/ListadoCategorias.css";
import { useState } from "react";
import { axiosConfig } from "../utils/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { eliminarCategoria } from "../store/slices/categoriasSlice";
import toast from "react-hot-toast";

const ListadoCategorias = () => {
    const categorias = useSelector((state) => state.categorias.categorias);
    const dispatch = useDispatch();

    //Ahora traigo las categorias con redux.
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);  

    const tokenRedux = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const token = tokenRedux || localStorage.getItem("token");

    const usuarioAdmin = user?.role === "ADMIN";
    const [loadingEliminar, setLoadingEliminar] = useState(false);

    const eliminarCategoriaBackend = async (nombre, id) => {
        try {
            setLoadingEliminar(true);

            const config = {
                headers: {
                    Authorization: token
                }
            };

            await axiosConfig.delete(`/v1/categorias/${nombre}`, config);

            dispatch(eliminarCategoria(id));

            toast.success("Categoría eliminada correctamente.");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "No se pudo eliminar la categoría."
            );
        } finally {
            setLoadingEliminar(false);
        }
    };

    return (
        <div className="listado-categorias-container">

            <h2>Listado de categorías</h2>

            {categorias.length === 0 && (
                <p>No hay categorías disponibles.</p>
            )}

            {categorias.length > 0 && (
                <div className="categorias-grid">

                    {categorias.map((categoria) => (
                        <div className="categoria-card" key={categoria._id}>
                            <h3>{categoria.nombre}</h3>
                            {usuarioAdmin && (
                                <button onClick={() => eliminarCategoriaBackend(categoria.nombre, categoria._id)} disabled={loadingEliminar}>
                                    {loadingEliminar ? "Eliminando..." : "Eliminar"}
                                </button>
                            )}
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default ListadoCategorias;