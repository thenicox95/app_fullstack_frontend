
import * as yup from "yup";

const createRutaSchema = yup.object().shape({

    nombre: yup
        .string()
        .trim()
        .required("El nombre es obligatorio."),

    descripcion: yup
        .string()
        .trim()
        .required("La descripción es obligatoria."),

    dificultad: yup
        .string()
        .oneOf(
            ["FACIL", "INTERMEDIO", "DIFICIL"],
            "Seleccione una dificultad válida."
        )
        .required("La dificultad es obligatoria."),

    distancia: yup
        .number()
        .typeError("La distancia debe ser un número.")
        .required("La distancia es obligatoria."),

    duracion: yup
        .number()
        .typeError("La duración debe ser un número.")
        .required("La duración es obligatoria."),

    desnivel: yup
        .number()
        .typeError("El desnivel debe ser un número.")
        .required("El desnivel es obligatorio."),

    pais: yup
        .string()
        .required("El país es obligatorio."),

    departamento: yup
        .string()
        .required("El departamento es obligatorio."),

    ciudad: yup
        .string()
        .trim()
        .required("La ciudad es obligatoria."),

    categoriaId: yup
        .string()
        .required("Debe seleccionar una categoría.")

});

export default createRutaSchema;
