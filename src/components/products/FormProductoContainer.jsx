import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { crearProducto, actualizarProducto, subirImagen } from "../../firebase/productos";
import { traducirError } from "../../firebase/errores";
import { descending } from "firebase/firestore/pipelines";

const estadoInicial = { title: "", price: "", stock: "", description: "" };

const FormProductoContainer = ({ productoAEditar, onGuardado, onCancelar }) => {
    const [datosForm, setDatosForm] = useState(() =>
        productoAEditar
            ? {
                title: productoAEditar.title ?? "",
                price: String(productoAEditar.price ?? ""),
                stock: String(productoAEditar.stock ?? ""),
                description: productoAEditar.description ?? ""
            }
            : estadoInicial
    );

    const [imagen, setImagen] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState(productoAEditar?.imagen || "");
    const [errores, setErrores] = useState({});
    const [errorGeneral, setErrorGeneral] = useState(null);
    const [cargando, setCargando] = useState(false);

    // Libero URL temporal de la vista previa cuando cambia o se cierra el Form
    useEffect(() => {
        return () => {
            if(vistaPrevia.startsWith("blob:")) URL.revokeObjectURL(vistaPrevia);
        };
    }, [vistaPrevia]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }));
    };

    const manejarCambioImagen = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        setImagen(archivo);
        setVistaPrevia(URL.createObjectURL(archivo));
        if (errores.imagen) setErrores(prev => ({ ...prev, imagen: null }));
    };

    const validar = () => {
        const nuevos = {};
        const precio = Number(datosForm.price);
        const stock = Number(datosForm.stock);

        if(!datosForm.title.trim())
            nuevos.title = "El nombre es obligario.";

        if(!datosForm.price === "")
            nuevos.price = "El precio es obligatorio.";
        else if(precio <= 0)
            nuevos.price = "El precio debe ser mayor que cero.";

        if(!datosForm.stock === "")
            nuevos.stock = "El stock es obligatorio.";
        else if(!Number.isInteger(stock) || stock < 0)
            nuevos.stock = "El stock debe ser un número entero mayor o igual que cero.";

        if(!datosForm.description.trim().length < 10)
            nuevos.description = "La descripción debe tener al menos 10 caracteres.";

        if(!productoAEditar && !imagen)
            nuevos.imagen = "Elegí una imagen para el producto.";
        else if(imagen && imagen.size > 5 * 1024 * 1024)
            nuevos.imagen = "La imagen no puede pesar más de 5 MB.";

        setErrores(nuevos);
        return Object.keys(nuevos).length === 0;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setErrorGeneral(null);
        if (!validar()) return;
        
        setCargando(true);
        try {
            const datos = {
                title: datosForm.title.trim(),
                price: Number(datosForm.price),
                stock: Number(datosForm.stock),
                description: datosForm.description.trim()
            };

            // Solo subo la imagen en caso de si eligieron una nueva
            if (imagen) datos.imagen = await subirImagen(imagen);

            if (productoAEditar) {
                await actualizarProducto(productoAEditar.id, datos);
                onGuardado({ ...productoAEditar, ...datos }, true);
            } else {
                const id = await crearProducto(datos);
                onGuardado({ id, ...datos }, false);
            }
        } catch (err) {
            console.error("Error al guardar el producto:", err);
            setErrorGeneral(traducirError(err.code));
            setCargando(false);
        }
    };

    return (
        <FormProducto
            datosForm={datosForm}
            errores={errores}
            errorGeneral={errorGeneral}
            vistaPrevia={vistaPrevia}
            esEdicion={!!productoAEditar}
            cargando={cargando}
            manejarCambio={manejarCambio}
            manejarCambioImagen={manejarCambioImagen}
            manejarEnvio={manejarEnvio}
            onCancelar={onCancelar}
        />
    );
};

export default FormProductoContainer;