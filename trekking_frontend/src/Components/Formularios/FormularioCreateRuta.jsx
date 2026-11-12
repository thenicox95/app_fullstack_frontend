
import { useState, useEffect } from "react";
import "./ComponentsCss/Auth.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createRutaSchema from "./Validations/createRutaSchema";
import { axiosConfig } from "../../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';

const FormularioCrearRuta = () => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(createRutaSchema),
        mode: "onChange",
        defaultValues: {
            nombre: "",
            descripcion: "",
            dificultad: "",
            distancia: "",
            duracion: "",
            desnivel: "",
            pais: "Uruguay",
            departamento: "",
            ciudad: "",
            categoriaId: ""
        }
    });

    const [loading, setLoading] = useState(false);
    // const [errorCrearRuta, setErrorCrearRuta] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [errorCategorias, setErrorCategorias] = useState(null);

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    // Departamentos de Uruguay
    const departamentos = [
        "Artigas",
        "Canelones",
        "Cerro Largo",
        "Colonia",
        "Durazno",
        "Flores",
        "Florida",
        "Lavalleja",
        "Maldonado",
        "Montevideo",
        "Paysandú",
        "Río Negro",
        "Rivera",
        "Rocha",
        "Salto",
        "San José",
        "Soriano",
        "Tacuarembó",
        "Treinta y Tres"
    ];

    // Obtener categorías desde el backend
    useEffect(() => {

        const obtenerCategorias = async () => {
            try {
                const response = await axiosConfig.get("/v1/categorias");
                setCategorias(response.data.data ?? response.data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
                setErrorCategorias("No se pudieron cargar las categorías.");
            }
        };

        obtenerCategorias();

    }, []);

    // Enviar formulario
    const onSubmit = async (data) => {

        setLoading(true);
        // setErrorCrearRuta(null);

        try {

            const datosRuta = {
                nombre: data.nombre,
                descripcion: data.descripcion,
                dificultad: data.dificultad,
                distancia: Number(data.distancia),
                duracion: Number(data.duracion),
                desnivel: Number(data.desnivel),
                ubicacion: {
                    pais: data.pais,
                    departamento: data.departamento,
                    ciudad: data.ciudad
                },
                categoriaId: data.categoriaId
            };

            const config = {
                headers: {
                    Authorization: token
                }
            };

            await axiosConfig.post("/v1/rutas", datosRuta, config);

            reset();
            navigate("/dashboard");
            toast.success("Nueva ruta creada con éxito.")

        } catch (error) {
            toast.error(error.response?.data?.message || "No se pudo crear la ruta.")
            // setErrorCrearRuta(
            //     error.response?.data?.message || "No se pudo crear la ruta."
            // );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="container">

                <h1 className="title">Crear nueva ruta</h1>
{/* 
                {errorCrearRuta && (
                    <p className="error">{errorCrearRuta}</p>
                )} */}

                {/* Nombre */}
                <div className="inputGroup">
                    <label className="label">Nombre:</label>

                    <Controller
                        control={control}
                        name="nombre"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Nombre de la ruta"
                                className="input"
                            />
                        )}
                    />

                    {errors.nombre && (
                        <p className="error">{errors.nombre.message}</p>
                    )}
                </div>

                {/* Descripción */}
                <div className="inputGroup">
                    <label className="label">Descripción:</label>

                    <Controller
                        control={control}
                        name="descripcion"
                        render={({ field }) => (
                            <textarea
                                {...field}
                                placeholder="Describí la ruta"
                                className="input"
                                rows="4"
                            />
                        )}
                    />

                    {errors.descripcion && (
                        <p className="error">{errors.descripcion.message}</p>
                    )}
                </div>

                {/* Dificultad */}
                <div className="inputGroup">
                    <label className="label">Dificultad:</label>

                    <Controller
                        control={control}
                        name="dificultad"
                        render={({ field }) => (
                            <select {...field} className="input">
                                <option value="">Seleccione una dificultad</option>
                                <option value="FACIL">Fácil</option>
                                <option value="INTERMEDIO">Intermedio</option>
                                <option value="DIFICIL">Difícil</option>
                            </select>
                        )}
                    />

                    {errors.dificultad && (
                        <p className="error">{errors.dificultad.message}</p>
                    )}
                </div>

                {/* Distancia */}
                <div className="inputGroup">
                    <label className="label">Distancia (km):</label>

                    <Controller
                        control={control}
                        name="distancia"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="any"
                                placeholder="Ej: 6.5"
                                className="input"
                            />
                        )}
                    />

                    {errors.distancia && (
                        <p className="error">{errors.distancia.message}</p>
                    )}
                </div>

                {/* Duración */}
                <div className="inputGroup">
                    <label className="label">Duración (horas):</label>

                    <Controller
                        control={control}
                        name="duracion"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="any"
                                placeholder="Ej: 3"
                                className="input"
                            />
                        )}
                    />

                    {errors.duracion && (
                        <p className="error">{errors.duracion.message}</p>
                    )}
                </div>

                {/* Desnivel */}
                <div className="inputGroup">
                    <label className="label">Desnivel (metros):</label>

                    <Controller
                        control={control}
                        name="desnivel"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="any"
                                placeholder="Ej: 10"
                                className="input"
                            />
                        )}
                    />

                    {errors.desnivel && (
                        <p className="error">{errors.desnivel.message}</p>
                    )}
                </div>

                {/* Ubicación */}
                <h2 className="title">Ubicación</h2>

                {/* País */}
                <div className="inputGroup">
                    <label className="label">País:</label>

                    <Controller
                        control={control}
                        name="pais"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="input"
                                readOnly
                            />
                        )}
                    />

                    {errors.pais && (
                        <p className="error">{errors.pais.message}</p>
                    )}
                </div>

                {/* Departamento */}
                <div className="inputGroup">
                    <label className="label">Departamento:</label>

                    <Controller
                        control={control}
                        name="departamento"
                        render={({ field }) => (
                            <select {...field} className="input">
                                <option value="">Seleccione un departamento</option>

                                {departamentos.map((departamento) => (
                                    <option
                                        key={departamento}
                                        value={departamento}
                                    >
                                        {departamento}
                                    </option>
                                ))}
                            </select>
                        )}
                    />

                    {errors.departamento && (
                        <p className="error">{errors.departamento.message}</p>
                    )}
                </div>

                {/* Ciudad */}
                <div className="inputGroup">
                    <label className="label">Ciudad:</label>

                    <Controller
                        control={control}
                        name="ciudad"
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Ej: La Paloma"
                                className="input"
                            />
                        )}
                    />

                    {errors.ciudad && (
                        <p className="error">{errors.ciudad.message}</p>
                    )}
                </div>

                {/* Categoría */}
                <div className="inputGroup">
                    <label className="label">Categoría:</label>

                    <Controller
                        control={control}
                        name="categoriaId"
                        render={({ field }) => (
                            <select {...field} className="input">
                                <option value="">Seleccione una categoría</option>

                                {categorias.map((categoria) => (
                                    <option
                                        key={categoria._id}
                                        value={categoria._id}
                                    >
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    />

                    {errors.categoriaId && (
                        <p className="error">{errors.categoriaId.message}</p>
                    )}

                    {errorCategorias && (
                        <p className="error">{errorCategorias}</p>
                    )}
                </div>

                {/* Botón */}
                <div className="buttonContainer">
                    <button
                        type="button"
                        className="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={!isValid || loading || categorias.length === 0}
                    >
                        {loading ? "Creando ruta..." : "Crear ruta"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormularioCrearRuta;
