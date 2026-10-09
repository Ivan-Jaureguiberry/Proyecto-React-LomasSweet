import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import styles from './DetalleProducto.module.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const { agregarACarrito } = useCarrito();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const manejarAgregarACarrito = () => {
        const productoFormateado = {
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            image: producto.image
        };

        agregarACarrito({ producto: productoFormateado, cantidad: 1 });
    };

    useEffect(() => {
        setCargando(true);
        fetch(`${import.meta.env.BASE_URL}data/productos.json`)
            .then((res) => {
                if(!res.ok) throw new Error('No se encontró el producto');
                return res.json();
            })
            .then((datos) => {
                const encontrado = datos.find((p) => p.id === Number(id));
                if (!encontrado) throw new Error('No se encontró el producto');
                setProducto({
                    ...encontrado,
                    image: `${import.meta.env.BASE_URL}${encontrado.image}`,
                });
            })
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, [id]);

    if (cargando) return <div className={styles.statusContainer}>Cargando detalle del producto...</div>;
    if (error) return <div className={styles.statusContainer}>Error: {error}</div>;
    if (!producto) return <div className={styles.statusContainer}>Producto no encontrado</div>;

    return (
        <div className={styles.container}>
            <Link to="/productos" className={styles.backLink}>
                ← Volver a productos
            </Link>

            <div className={styles.grid}>
                <div className={styles.imageWrapper}>
                    <img src={producto.image} alt={producto.title} className={styles.image} />
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{producto.title}</h1>
                    <p className={styles.price}>AR${producto.price}</p>

                    <h3 className={styles.descriptionTitle}>Descripción</h3>
                    <p className={styles.description}>{producto.description}</p>

                    <button className={styles.buyButton} onClick={manejarAgregarACarrito}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;