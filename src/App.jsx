import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Panel from "./pages/Panel";
import RutaProtegida from "./components/RutaProtegida";
import Layout from "./components/layouts/Layout";
import Inicio from "./pages/Inicio";
import ItemListContainer from "./components/products/ItemListContainer";
import DetalleProducto from "./components/products/DetalleProducto";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Inicio />}/>
            <Route path='/contacto' element={<h1>Contacto</h1>}/>
            <Route path='/productos' element={<ItemListContainer />}/>
            <Route path='/producto/:id' element={<DetalleProducto />}/>
            <Route path='/carrito' element={<Carrito />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="/registro" element={<Registro />}/>
            <Route path="/perfil" element={
              <RutaProtegida><Perfil /></RutaProtegida>
            }/>
            <Route path="/panel" element={
              <RutaProtegida soloAdmin><Panel /></RutaProtegida>
            }/>
          </Route>
          <Route path="/contacto" element={<Contacto />}/>
      </Routes>
    </>
  );
}

export default App
