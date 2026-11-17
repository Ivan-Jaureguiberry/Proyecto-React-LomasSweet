import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { obtenerProducto } from '../../firebase/productos';
import { traducirError } from '../../firebase/errores';
import Cargando from '../Cargando';
import MensajeError from '../MensajeError';
import styles from './DetalleProducto.module.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const { agregarACarrito } = useCarrito();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargar = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            setProducto(await obtenerProducto(id));
        } catch (err) {
            console.error("Error al obtener el producto:", err);
            setError(traducirError(err.code));
        } finally {
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        cargar();
    }, [cargar]);

    const manejarAgregarACarrito = () => {
        agregarACarrito({
            producto: {
                id: producto.id,
                nombre: producto.title,
                precio: producto.price,
                image: producto.image
            },
            cantidad: 1
        });
    };

    if (cargando) return <Cargando texto="Cargando detalle del producto..." />;
    if (error) return <MensajeError mensaje={error} onReintentar={cargar} />;

    const sinStock = producto.stock === 0;

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
                    <p className={styles.price}>AR${Number(producto.price).toLocaleString("es-AR")}</p>

                    <h3 className={styles.descriptionTitle}>Descripción</h3>
                    <p className={styles.description}>{producto.description}</p>

                    <button className={styles.buyButton} onClick={manejarAgregarACarrito} disabled={sinStock}>
                        {sinStock ? "Sin stock" : "Agregar al carrito"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;