import { useCarrito } from '../context/CarritoContext';
import styles from './Carrito.module.css';

const Carrito = () => {
    const { carrito, vaciarCarrito, eliminarDelCarrito,
        incrementarCantidad, decrementarCantidad, cobroTotal } = useCarrito();

    if (carrito.length === 0) {
        return (
            <div className={styles.vacio}>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
            </div>
        );
    }

    return (
        <div className = {styles.container}>
            <div className={styles.lista}>
                <h1>Carrito de Compras</h1>
                {carrito.map(item => (
                    <div key={item.id} className={styles.item}>
                        {item.image && <img src={item.image} alt={item.nombre} className={styles.imagen} />}

                        <div className={styles.info}>
                            <h4 className={styles.nombre}>{item.nombre}</h4>
                            <p className={styles.precio}>Precio unitario: ${item.precio}</p>
                            <p className={styles.subtotal}>
                                Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                            </p>
                        </div>

                        <div className={styles.contador}>
                            <button
                                onClick={() => decrementarCantidad(item.id)}
                                className = {styles.contadorBtn}
                                aria-label = "Quitar uno"
                            >-</button>

                            <span className={styles.cantidad}>{item.cantidad}</span>
                            <button
                                onClick={() => incrementarCantidad(item.id)}
                                className={styles.contadorBtn}
                                aria-label="Agregar uno"
                            >+</button>
                        </div>

                        <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className={styles.eliminarBtn}
                            title = "Eliminar Producto"
                            aria-label = {`Eliminar ${item.nombre}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <hr />

            <div className={styles.resumen}>
                <h3>Total a pagar: ${cobroTotal().toFixed(2)}</h3>
                <button onClick={vaciarCarrito} className={styles.vaciarBtn}>
                    Vaciar Carrito
                </button>
            </div>
        </div>
    );
};

export default Carrito;