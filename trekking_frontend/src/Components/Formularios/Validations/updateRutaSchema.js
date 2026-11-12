import * as yup from "yup";

const updateRutaSchema = yup.object({
  nombre: yup
    .string()
    .required("El nombre es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres.")
});

export default updateRutaSchema;