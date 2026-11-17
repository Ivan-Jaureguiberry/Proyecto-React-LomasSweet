import { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ titulo, onCerrar, children, chico = false }) => {
    useEffect(() => {
        const alPresionar = (e) => {
            if (e.key === "Escape") onCerrar();
        };
        document.addEventListener("keydown", alPresionar);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", alPresionar);
            document.body.style.overflow = "";
        };
    }, [onCerrar]);

    return (
        <div className={styles.overlay} onClick={onCerrar}>
            <div
                className={`${styles.contenido} ${chico ? styles.chico : ""}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.encabezado}>
                    <h2 id="modal-titulo" className={styles.titulo}>{titulo}</h2>
                    <button onClick={onCerrar} className={styles.cerrar} aria-label="Cerrar">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;