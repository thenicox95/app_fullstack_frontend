import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { axiosConfig } from "../../utils/axiosConfig";
import { useState } from "react";
import "./ComponentsCss/Auth.css";

const FormularioUpdateRuta = ({
  ruta,
  onRutaActualizada,
  onCancelar
}) => {

  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      nombre: ruta.nombre
    }
  });

  const actualizarRuta = async (data) => {

    console.log("Token:", token);
    console.log("ID de ruta:", ruta._id);
    console.log("Datos enviados:", data);

    try {
      setError("");

      await axiosConfig.put(
        `/v1/rutas/${ruta._id}`,
        {
          nombre: data.nombre
        },
        {
          headers: { Authorization: token }
        }
      );

      onRutaActualizada(ruta._id, data.nombre);
    } catch (error) {
      console.error("Error al actualizar la ruta:", error);
      setError(
        error.response?.data?.message ||
        "No se pudo actualizar la ruta."
      );
    }
  };

  return (
    <div className="page">
      <div className="container">

        <h2 className="title">Modificar ruta</h2>

        <form onSubmit={handleSubmit(actualizarRuta)}>

          <div className="inputGroup">
            <label htmlFor="nombre" className="label">
              Nombre de la ruta
            </label>

            <input
              type="text"
              id="nombre"
              className="input"
              placeholder="Ingresá el nombre de la ruta"
              {...register("nombre", {
                required: "El nombre es obligatorio.",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres."
                }
              })}
            />

            {errors.nombre && (
              <p className="error">{errors.nombre.message}</p>
            )}
          </div>

          {error && <p className="error">{error}</p>}

          <div className="buttonContainer">
            <button
              type="submit"
              className="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar ruta"}
            </button>

            <button
              type="button"
              className="button"
              onClick={onCancelar}
              style={{ marginTop: "10px" }}
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormularioUpdateRuta;
