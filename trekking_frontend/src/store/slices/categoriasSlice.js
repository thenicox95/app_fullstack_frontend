import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categorias: [],
    cargadas: false
};

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
        setCategorias: (state, action) => {
            state.categorias = action.payload;
            //Esto es para no entrar en un bucle en el if cuando las cargo del dashbaord.
            state.cargadas = true;
        },

        //Esto no lo uso nunca porque no esta previsto en el back.
        agregarCategoria: (state, action) => {
            state.categorias.push(action.payload)
        },

        eliminarCategoria: (state, action) => {
            state.categorias = state.categorias.filter(
                (categoria) => categoria._id !== action.payload
            );
        },
    }
})

export const { setCategorias, agregarCategoria, eliminarCategoria } = categoriasSlice.actions;

export default categoriasSlice.reducer;