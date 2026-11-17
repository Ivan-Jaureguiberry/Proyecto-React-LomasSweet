import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import BotonFavorito from "../BotonFavorito";
import styles from "./Item.module.css";

const Item = ({ id, title, price, image }) => {
    const { agregarACarrito } = useCarrito();
    const [contador, setContador] = useState(0);

    const incrementar = () => { setContador(contador + 1) };
    const decrementar = () => {
        if(contador > 0)
            setContador(contador - 1)
    };

    const manejarAgregar = () => {
        agregarACarrito({
            producto: { id, nombre: title, precio: price, image },
            cantidad: contador,
        });
        setContador(0);
    }

    return (
        <article className={styles.card}>
            {/*click en la imagen te lleva al detalle*/}
            <Link to={`/producto/${id}`} className={styles.imageLink}>
                <img src={image} alt={title} className={styles.image} loading="lazy" />
            </Link>

            {/*click en el título / price te lleva al detalle */}
            <Link to={`/producto/${id}`} className={styles.titleLink}>
                <h2 className={styles.title}>{title}</h2>
            </Link>
            <p className={styles.price}>AR${price}</p>

            <div className={styles.actions}>
                <BotonFavorito />

                <div className={styles.counter}>
                    <button onClick={decrementar} className={styles.counterBtn} aria-label="Quitar uno">-</button>
                    <span className={styles.countText}>{contador}</span>
                    <button onClick={incrementar} className={styles.counterBtn} aria-label="Agregar uno">+</button>
                </div>
            </div>

            <button
                onClick={manejarAgregar}
                disabled={contador === 0}
                className={styles.addButton}
            >
                Agregar al carrito
            </button>
        </article>
    );
};

export default Item;