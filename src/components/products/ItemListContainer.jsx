import { useState, useEffect, useCallback } from "react";
import { obtenerProductos } from "../../firebase/productos";
import { traducirError } from "../../firebase/errores";
import ItemList from "./ItemList";
import Cargando from "../Cargando";
import MensajeError from "../MensajeError"
import styles from "./ItemListContainer.module.css";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    if (cargando) return <Cargando texto="Cargando productos..." />;
    if (error) return <MensajeError mensaje={error} onReintentar={cargar} />;

    return (
        <section className={styles.container}>
            <h1>Productos</h1>
            {productos.length === 0
                ? <p className={styles.statusMessage}>Todavía no hay productos disponibles.</p>
                : <ItemList productos={productos} />
            }
        </section>
    );
};

export default ItemListContainer;