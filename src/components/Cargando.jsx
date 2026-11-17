import styles from "./Estado.module.css";

const Cargando = ({ texto = "Cargando..." }) => (
    <div className={styles.estado} role="status">
        <span className={styles.spinner} aria-hidden="true" />
        <p>{texto}</p>
    </div>
);

export default Cargando;