import axios from "axios";

//Nuestra constante va a ser igual a nuestra variable de entorno que definimos en el archivo .env, que es la URL de nuestra API.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosConfig = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers:{
        //Cabezales que va a utilizar cada vez que se hace una peticion.
        "Content-Type": "application/json",
         Accept: "application/json",
    }
})