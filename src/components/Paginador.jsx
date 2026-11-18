import styles from "./Paginador.module.css";

// Devuelve los números a mostrar, ej: [1, "...", 4, 5, 6, "...", 12]
const obtenerPaginas = (actual, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const paginas = [1];
    const inicio = Math.max(2, actual - 1);
    const fin = Math.min(total - 1, actual + 1);

    if (inicio > 2) paginas.push("...");
    for (let i = inicio; i <= fin; i++) paginas.push(i);
    if (fin < total - 1) paginas.push("...");
    paginas.push(total);

    return paginas;
};

const Paginador = ({ paginaActual, totalPaginas, onCambiar }) => {
    if (totalPaginas <= 1) return null;

    return (
        <nav className={styles.paginador} aria-label="Paginación de productos">
            <button
                type="button"
                className={styles.boton}
                onClick={() => onCambiar(paginaActual - 1)}
                disabled={paginaActual === 1}
                aria-label="Página anterior"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                <span className={styles.texto}>Anterior</span>
            </button>

            {obtenerPaginas(paginaActual, totalPaginas).map((pagina, i) =>
                pagina === "..." ? (
                    <span key={`puntos-${i}`} className={styles.puntos} aria-hidden="true">…</span>
                ) : (
                    <button
                        key={pagina}
                        type="button"
                        className={`${styles.boton} ${pagina === paginaActual ? styles.activa : ""}`}
                        onClick={() => onCambiar(pagina)}
                        aria-label={`Página ${pagina}`}
                        aria-current={pagina === paginaActual ? "page" : undefined}
                    >
                        {pagina}
                    </button>
                )
            )}

            <button
                type="button"
                className={styles.boton}
                onClick={() => onCambiar(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                aria-label="Página siguiente"
            >
                <span className={styles.texto}>Siguiente</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </nav>
    );
};

export default Paginador;