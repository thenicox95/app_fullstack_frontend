import { createSlice } from "@reduxjs/toolkit";

const usuarioGuardado = localStorage.getItem("usuario");
const usuarioInicial = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

const initialState = {
  user: usuarioInicial,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsuario: (state, action) => {

            const { user, token } = action.payload;

            state.user = user;
            state.token = token;

            if (user) {
                localStorage.setItem("usuario", JSON.stringify(user));
            }
            if (token) {
                localStorage.setItem("token", token);
            }
        },
        cerrarSesion: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("usuario");
            localStorage.removeItem("token");
        },
        actualizarUsuario: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("usuario", JSON.stringify(action.payload));
        }
    }
})

export const { setUsuario, cerrarSesion, actualizarUsuario } = authSlice.actions;

export default authSlice.reducer;