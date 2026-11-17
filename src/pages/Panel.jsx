import { useState, useEffect, useCallback } from "react";
import { obtenerProductos, eliminarProducto, cargarProductosIniciales } from "../firebase/productos";
import { traducirError } from "../firebase/errores";
import FormProductoContainer from "../components/products/FormProductoContainer";
import Modal from "../components/Modal";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import styles from "./Panel.module.css";

const Panel = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [modalForm, setModalForm] = useState({ abierto: false, producto: null });
    const [aEliminar, setAEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);
    const [errorEliminar, setErrorEliminar] = useState(null);
    const [importando, setImportando] = useState(false);
    const [aviso, setAviso] = useState(null);

    const cargar = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            setProductos(await obtenerProductos());
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError(traducirError(err.code));
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargar();
    }, [cargar]);

    // El aviso desaparece a los 3 segundos
    useEffect(() => {
        if(!aviso) return;
        const temporizador = setTimeout(() => setAviso(null), 3000);
        return () => clearTimeout(temporizador);
    }, [aviso]);

    const abrirAgregar = () => setModalForm({ abierto: true, producto: null });
    const abrirEditar = (producto) => setModalForm({ abierto: true, producto });
    const cerrarForm = useCallback(() => setModalForm({ abierto: false, producto: null}), []);

    const manejarGuardado = (producto, esEdicion) => {
        setProductos(prev =>
            esEdicion
                ? prev.map(p => (p.id === producto.id ? producto : p))
                : [...prev, producto]
        );
        cerrarForm();
        setAviso(esEdicion ? "Producto actualizado" : "Producto creado");
    };

    const pedirConfirmacion = (producto) => {
        setErrorEliminar(null);
        setAEliminar(producto);
    };

    const cerrarConfirmacion = useCallback(() => {
        if (!eliminando) setAEliminar(null);
    }, [eliminando]);

    const confirmarEliminar = async () => {
        setEliminando(true);
        setErrorEliminar(null);
        try {
            await eliminarProducto(aEliminar.id);
            setProductos(prev => prev.filter(p => p.id !== aEliminar.id));
            setAviso(`"${aEliminar.title}" fue eliminado`);
            setAEliminar(null);
        } catch (err) {
            console.error("Error al eliminar:", err);
            setErrorEliminar(traducirError(err.code));
        } finally {
            setEliminando(false);
        }
    };

    const importarIniciales = async () => {
        setImportando(true);
        try {
            await cargarProductosIniciales();
            await cargar();
            setAviso("Productos iniciales cargados.");
        } catch (err) {
            console.error("Error al importar:", err);
            setError(traducirError(err.code));
        } finally {
            setImportando(false);
        }
    };

    const renderContenido = () => {
        if (cargando) return <Cargando texto = "Cargando productos..."/>;
        if (error) return <MensajeError mensaje = {error} onReintentar={cargar}/>;

        if (productos.length === 0) {
            return (
                <div className={styles.vacio}>
                    <p>Todavía no hay productos en la base de datos.</p>
                    <button onClick={importarIniciales} className={styles.btnSecundario} disabled={importando}>
                        {importando ? "Cargando..." : "Cargar los productos iniciales"}
                    </button>
                </div>
            );
        }

        return (
            <div className={styles.tablaContenedor}>
                <table className={styles.tabla}>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th className={styles.derecha}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div className={styles.producto}>
                                        <img src={p.image} alt="" className={styles.miniatura} />
                                        <span>{p.title}</span>
                                    </div>
                                </td>
                                <td>AR${Number(p.price).toLocaleString("es-AR")}</td>
                                <td>
                                    <span className={p.stock === 0 ? styles.sinStock : ""}>
                                        {p.stock === 0 ? "Sin stock" : p.stock}
                                    </span>
                                </td>
                                <td className={styles.derecha}>
                                    <div className={styles.acciones}>
                                        <button onClick={() => abrirEditar(p)} className={styles.btnEditar}>
                                            Editar
                                        </button>
                                        <button onClick={() => pedirConfirmacion(p)} className={styles.btnEliminar}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.encabezado}>
                <div>
                    <h1 className={styles.titulo}>Panel de Administración</h1>
                    {!cargando && !error && (
                        <p className={styles.subtitulo}>{productos.length} productos en el catálogo</p>
                    )}
                </div>
                <button onClick={abrirAgregar} className={styles.btnPrimario}>
                    + Agregar producto
                </button>
            </div>

            {renderContenido()}

            {modalForm.abierto && (
                <Modal
                    titulo={modalForm.producto ? "Editar producto" : "Agregar producto"}
                    onCerrar={cerrarForm}
                >
                    <FormProductoContainer
                        productoAEditar={modalForm.producto}
                        onGuardado={manejarGuardado}
                        onCancelar={cerrarForm}
                    />
                </Modal>
            )}

            {aEliminar && (
                <Modal titulo = "Eliminar producto" onCerrar={cerrarConfirmacion} chico>
                    <p className={styles.textoConfirmar}>
                        ¿Seguro que quieres eliminar <strong>{aEliminar.title}</strong>?
                        Esta acción no se puede deshacer.
                    </p>
                    {errorEliminar && <p className={styles.error} role="alert">{errorEliminar}</p>}
                    <div className={styles.botonesConfirmar}>
                        <button onClick={cerrarConfirmacion} className={styles.btnSecundario} disabled={eliminando}>
                            Cancelar
                        </button>
                        <button onClick={confirmarEliminar} className={styles.btnPeligro} disabled={eliminando}>
                            {eliminando ? "Eliminando..." : "Sí, eliminar"}
                        </button>
                    </div>
                </Modal>
            )}

            {aviso && <div className={styles.aviso} role="status">{aviso}</div>}
        </div>
    );
};

export default Panel;