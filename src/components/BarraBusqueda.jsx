import styles from "./BarraBusqueda.module.css";

const BarraBusqueda = ({ valor, onCambiar, placeholder = "Buscar alfajores..." }) => {
    return (
        <div className={styles.contenedor} role="search">
            <label htmlFor="buscador" className="sr-only">Buscar productos</label>

            <svg className={styles.icono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
            </svg>

            <input 
                id="buscador"
                type="search"
                className={styles.input}
                placeholder={placeholder}
                value={valor}
                onChange={(e) => onCambiar(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && onCambiar("")}
                autoComplete="off"
            />

            {valor && (
                <button
                    type="button"
                    className={styles.limpiar}
                    onClick={() => onCambiar("")}
                    aria-label="Borrar búsqueda"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default BarraBusqueda;