import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosConfig } from "../utils/axiosConfig";
import { actualizarUsuario } from "../store/slices/authSlice";
import toast from 'react-hot-toast';
import "./ComponentsCss/FotoPerfil.css";

const FotoPerfil = () => {

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const dispatch = useDispatch();
    const inputFoto = useRef(null);

    const [subiendoFoto, setSubiendoFoto] = useState(false);
    // const [errorFoto, setErrorFoto] = useState(null);

    const subirFoto = async (event) => {
        const archivo = event.target.files[0];

        if (!archivo) return;

        try {
            setSubiendoFoto(true);
            // setErrorFoto(null);

            const formData = new FormData();
            formData.append("imagen", archivo);

            //Cambio el la configuracion de axios para poder enviar la imagen.
            const config = {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            };

            const response = await axiosConfig.post(
                "/v1/uploads",
                formData,
                config
            );

            //La imagen se borra despues del logout porque borramos el cache y steamos el estado del user a inicial. 
            //El login no trae la imagen por defectos en el backend.
            dispatch(actualizarUsuario(response.data.user));
            toast.success("Foto de perfil actualizada con éxito.")

        } catch (error) {
            toast.error(error.response?.data?.message ||"No se pudo subir la imagen.")
            // setErrorFoto(
            //     error.response?.data?.message ||
            //     "No se pudo subir la imagen."
            // );
        } finally {
            setSubiendoFoto(false);
            event.target.value = "";
        }
    };

    return (
        <div className="perfil-avatar-wrapper">

            <img
                src={user?.image || "https://via.placeholder.com/120"}
                alt="Foto de perfil"
                className="perfil-avatar-img"
            />

            <input
                type="file"
                accept="image/*"
                ref={inputFoto}
                onChange={subirFoto}
                style={{ display: "none" }}
            />

            <button
                type="button"
                className="btn-cambiar-foto"
                onClick={() => inputFoto.current.click()}
                disabled={subiendoFoto}
            >
                {subiendoFoto ? "Subiendo..." : "Cambiar foto"}
            </button>

            {/* {errorFoto && <p className="error">{errorFoto}</p>} */}

        </div>
    );
};

export default FotoPerfil;
