import { useState } from "react";
import "./ComponentsCss/Auth.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registroSchema from "./Validations/registroSchema";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from "react-router";
import { axiosConfig } from "../../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { setUsuario } from "../../store/slices/authSlice";
import toast from 'react-hot-toast';

const FormularioRegistro = () => {

    const dispatch = useDispatch();
    //Aca es una destructuracion de useForm, que nos devuelve varias funciones y propiedades para manejar el formulario. Le pasamos el esquema de validacion y el modo de validacion.
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid } //Los valores que tiene la propiedad de formState, que nos devuelve un objeto con los errores y si el formulario es valido o no.
    } = useForm({
        resolver: yupResolver(registroSchema),
        mode: "onChange",
        defaultValues: { //Los valores por defecto del formulario, que son los que se van a mostrar en los inputs al cargar la pagina y van a matchear con el controller.
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    //Le hacemos destructuring al array que nos devuelve useState y ponemos como valor por defecto false.
    const [showPassword, setShowPassword] = useState(false)
    // const [errorRegistro, setErrorRegistro] = useState(null); //Estado para manejar el error de registro.
    const [loading, setLoading] = useState(false); //Estado para manejar el loading del formulario.
    const navigate = useNavigate();

    //Definimos la funcion que va a utilizar el boton de REGISTRO.
    const onSubmit = async (data) => {

        setLoading(true);
        // setErrorRegistro(null); //Ponemos el error en null para que no se muestre el mensaje de error anterior.

        try {
            //Sacamos el dato del confirm password a la informacion que vamos a enviar.
            const { confirmPassword, ...datosAEnviar } = data;

            await axiosConfig.post("/v1/auth/signup", datosAEnviar);

            //Aca ya le mandamos con los mismos datos del formulario al login.
            const responseLogin = await axiosConfig.post("/v1/auth/login", {
                email: datosAEnviar.email,
                password: datosAEnviar.password
            });

            const { token } = responseLogin.data;

            //Le pasamos el token al config de axios para que podamos ir al perfil.
            const config = {
                headers: {
                    Authorization: token
                }
            };

            //Aca vamos a la ruta de /me para poder traer datos mas completos con el nombre.
            const responseUser = await axiosConfig.get("/v1/users/me", config);

            dispatch(setUsuario({
                user: responseUser.data,
                token
            }
            ));

            reset();
            navigate("/dashboard");
            toast.success("Registrado y logeado exitosamente.")

        } catch (error) {
            toast.error(error.response?.data?.message || "Ocurrió un error al registrar el usuario.")
            // const mensajeError =
            //     error.response?.data?.message ||
            //     "Ocurrió un error al registrar el usuario.";

            // setErrorRegistro(mensajeError);
        } finally {
            setLoading(false); //Ponemos el loading en false para ocultar el spinner.
        }
    }


    return (
        <div className="page">
            <div className="container">
                <h1 className="title">Registro de persona</h1>
                {/* Muestra el mensaje devuelto por el Backend si la petición falla */}
                {/* {errorRegistro && (
                    <p className="error" style={{ textAlign: "center", marginBottom: "1rem" }}>
                        {errorRegistro}
                    </p>
                )} */}
                <div className="inputGroup">
                    <label className="label">Nombre:</label>
                    <Controller
                        control={control} //Hace referencia al formulario que estamos manejando con useForm.
                        name="name" //Valor del formulario que se va a modificar.
                        render={({ field }) => ( //Le paso por props field, que son los campos del formulario que se van a modificar y renderizo el input con los valores de field.
                            <input
                                {...field}
                                type="text"
                                placeholder="Ingrese su nombre."
                                className="input"
                            />
                        )}
                    />
                    {/* Aca me muestra el mensaje de error que me devuelve el esquema de validacion si el campo no es valido. */}
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="inputGroup">
                    <label className="label">Email:</label>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Ingrese su email."
                                className="input"
                            />
                        )}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className='inputGroup'>
                    <label className='label'>Password:</label>
                    <div className='passwordWrapper'>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Escriba su contraseña.'
                                    className='input'
                                />
                            )}
                        />
                        <button
                            type='button'
                            className='eyeButton'
                            //Aca es donde cambiamos el estado del showPassword, que es el que nos va a permitir mostrar o ocultar la contraseña. Le pasamos la funcion setShowPassword y le pasamos el valor contrario al que tiene actualmente.
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                </div>


                <div className="inputGroup">
                    <label className="label">Repita su contraseña:</label>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Repita su contraseña."
                                className="input"
                            />
                        )}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </div>
                <div className="buttonContainer">
                    <button
                        type="button"
                        className="button"
                        //Hacemos que la funcion onClick del boton sea la funcion handleSubmit que nos devuelve useForm, y le pasamos como parametro la funcion onSubmit que definimos arriba. Esto hace que cuando el usuario haga click en el boton, se ejecute la funcion onSubmit y se envie el formulario.
                        onClick={handleSubmit(onSubmit)}
                        //Basicamente si el formulario no cumple con las reglas establecidas en el schema, no va a permitir que el usuario haga click en el boton de REGISTRO. Esto es lo que hace la propiedad isValid que nos devuelve useForm.
                        disabled={!isValid || loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </div>
                <div className="registerLink">
                    <Link to="/">Volver al Login</Link>
                </div>
            </div>
        </div>
    )
}

export default FormularioRegistro;