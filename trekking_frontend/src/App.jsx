import React from 'react';
import './App.css';
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router';
import FormularioRegistro from './Components/Formularios/FormularioRegistro';
import FormularioCreateRuta from "./Components/Formularios/FormularioCreateRuta"
import Header from "./Components/Header";
import Inicio from './Components/Inicio';
import RutaPublica from './Components/RutaPublica';
import RutaProtegida from './Components/RutaProtegida';
import Dashboard from './Components/Dashboard';
import DashboardPerfil from './Components/DashboardPerfil';
import DetalleRuta from "./Components/DetalleRuta"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<RutaPublica />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<FormularioRegistro />} />
        </Route>
        <Route element={<RutaProtegida />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<DashboardPerfil />} />
          <Route path="/rutas/:id" element={<DetalleRuta />} />
          <Route path="/crear-ruta" element={<FormularioCreateRuta />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
};

export default App;