import { useState } from "react";
import "./ComponentsCss/Auth.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./Validations/loginSchema";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { setUsuario } from "../../store/slices/authSlice";
import { axiosConfig } from "../../utils/axiosConfig";
import toast from 'react-hot-toast';

const FormularioLogin = () => {

    //Aca es una destructuracion de useForm, que nos devuelve varias funciones y propiedades para manejar el formulario. Le pasamos el esquema de validacion y el modo de validacion.
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid } //Los valores que tiene la propiedad de formState, que nos devuelve un objeto con los errores y si el formulario es valido o no.
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
        defaultValues: { //Los valores por defecto del formulario, que son los que se van a mostrar en los inputs al cargar la pagina y van a matchear con el controller.
            email: "",
            password: "",
        }
    })

    //Le hacemos destructuring al array que nos devuelve useState y ponemos como valor por defecto false.
    const [showPassword, setShowPassword] = useState(false)
    // const [errorLogin, setErrorLogin] = useState(null)
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Definimos la funcion que va a utilizar el boton de REGISTRO.
    const onSubmit = async (data) => {

        setLoading(true);
        // setErrorLogin(null); //Por mensajes anteriores.

        try {
            // 1. Login: obtenemos el token y el usuario que ahora el backend lo entrega completo.

            const response = await axiosConfig.post("/v1/auth/login", data);

            const { token, user } = response.data;

            // 2. Guardamos usuario completo y token en Redux
            dispatch(setUsuario({
                user,
                token
            }));

            reset();
            navigate("/dashboard");
            toast.success("Usuario logeado exitosamente.")

        } catch (error) {
            // const mensajeError = error.response?.data?.message || "Ocurrió un error al iniciar sesión.";
            // setErrorLogin(mensajeError);
            toast.error(error.response?.data?.message || "Ocurrió un error al iniciar sesión.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">
            <div className="container">
                <h1 className="title">Login</h1>
                {/* Mostrar mensaje si las credenciales no coinciden
                {errorLogin && (
                    <p className="error">
                        {errorLogin}
                    </p>
                )} */}
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

                <div className="buttonContainer">
                    <button
                        type="button"
                        className="button"
                        //Hacemos que la funcion onClick del boton sea la funcion handleSubmit que nos devuelve useForm, y le pasamos como parametro la funcion onSubmit que definimos arriba. Esto hace que cuando el usuario haga click en el boton, se ejecute la funcion onSubmit y se envie el formulario.
                        onClick={handleSubmit(onSubmit)}
                        //Basicamente si el formulario no cumple con las reglas establecidas en el schema, no va a permitir que el usuario haga click en el boton de REGISTRO. Esto es lo que hace la propiedad isValid que nos devuelve useForm.
                        disabled={!isValid || loading}>
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>
                </div>
                <div className="registerLink">
                    <Link to="/registro">¿No tienes cuenta? Registrese</Link>
                </div>
            </div>
        </div>
    )
}

export default FormularioLogin;