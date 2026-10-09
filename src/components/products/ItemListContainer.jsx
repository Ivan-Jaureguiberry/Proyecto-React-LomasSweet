import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import styles from "./ItemListContainer.module.css";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/productos.json`)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo cargar productos");
                return res.json();
            })
            .then((datos) => {
                const conRuta = datos.map((p) => ({
                    ...p,
                    image: `${import.meta.env.BASE_URL}${p.image}`,
                }));
                setProductos(conRuta);
            })
            .catch(err => setError(err.message))
            .finally(() => setCargando(false));
    }, []);

    if (cargando)
        return <div className={styles.statusMessage}>Cargando productos...</div>;

    if (error)
        return <div className={styles.statusMessage}>Error: {error}</div>;

    return (
        <section className={styles.container}>
            <h1>Productos</h1>
            <ItemList productos={productos} />
        </section>
    );
};

export default ItemListContainer;