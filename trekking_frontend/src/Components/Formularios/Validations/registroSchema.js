import * as Yup from "yup";

const registroSchema = Yup.object().shape({
    name: Yup.string().typeError("El nombre debe ser un texto.").min(2, "El nombre debe tener al menos 2 caracteres.").max(50, "El nombre no puede exceder los 50 caracteres.").required("El nombre es obligatorio."),
    email: Yup.string().typeError("El correo debe ser un texto.").email("Formato de correo invalido.").required("El correo es obligatorio."),
    password: Yup.string().typeError("La contrasena debe ser un texto.").min(8, "Debe contener al menos 8 caracteres").max(50, "La contrasena no puede exceder los 50 caracteres.").required("La contrasena es obligatoria."),
    confirmPassword: Yup.string().typeError("Las contrasenas no son iguales.").oneOf([Yup.ref("password")], "Las contrasenas deben coincidir.").required("La confirmacion de contrasena es obligatoria."),
});

export default registroSchema;