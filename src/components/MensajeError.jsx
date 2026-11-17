import styles from "./Estado.module.css";

const MensajeError =({ mensaje, onReintentar }) => (
    <div className={styles.estado} role="alert">
        <p className={styles.error}>{mensaje}</p>
        {onReintentar && (
            <button onClick={onReintentar} className={styles.reintentar}>
                Reintentar
            </button>
        )}
    </div>
);

export default MensajeError;