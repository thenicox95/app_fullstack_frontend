import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("El email debe tener un formato válido.").required("El correo es obligatorio."),
    password: Yup.string().required("La contraseña es obligatoria."),
});

export default loginSchema;