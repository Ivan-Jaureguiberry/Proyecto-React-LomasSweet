import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { obtenerProductos } from "../../firebase/productos";
import { traducirError } from "../../firebase/errores";
import ItemList from "./ItemList";
import Cargando from "../Cargando";
import MensajeError from "../MensajeError";
import BarraBusqueda from "../BarraBusqueda";
import Paginador from "../Paginador";
import styles from "./ItemListContainer.module.css";

const PRODUCTOS_POR_PAGINA = 6;

// Pasa a minúsculas y saca tildes: "Volcán" → "volcan"
const normalizar = (texto = "") =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // La búsqueda y la página viven en la URL: /productos?q=dulce&pagina=2
    const [searchParams, setSearchParams] = useSearchParams();
    const busqueda = searchParams.get("q") ?? "";
    const pagina = Math.max(1, parseInt(searchParams.get("pagina")) || 1);

    const listaRef = useRef(null);

    const cargar = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            setProductos(await obtenerProductos());
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError(traducirError(err.code));
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargar();
    }, [cargar]);

    // Filtrado en tiempo real por nombre y descripción
    const productosFiltrados = useMemo(() => {
        const termino = normalizar(busqueda.trim());
        if (!termino) return productos;
        return productos.filter((p) =>
            normalizar(`${p.title} ${p.description}`).includes(termino)
        );
    }, [productos, busqueda]);

    // Paginación
    const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA));
    const paginaActual = Math.min(pagina, totalPaginas);
    const desde = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const productosPagina = productosFiltrados.slice(desde, desde + PRODUCTOS_POR_PAGINA);

    const cambiarBusqueda = (valor) => {
        const nuevos = new URLSearchParams(searchParams);
        if (valor) nuevos.set("q", valor);
        else nuevos.delete("q");
        nuevos.delete("pagina"); // al buscar, volvemos a la página 1
        setSearchParams(nuevos, { replace: true });
    };

    const cambiarPagina = (nueva) => {
        const nuevos = new URLSearchParams(searchParams);
        if (nueva === 1) nuevos.delete("pagina");
        else nuevos.set("pagina", nueva);
        setSearchParams(nuevos);
        listaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const textoResumen = () => {
        const total = productosFiltrados.length;
        if (total === 0) return "";
        if (busqueda) return `${total} ${total === 1 ? "resultado" : "resultados"} para "${busqueda}"`;
        return `Mostrando ${desde + 1}–${desde + productosPagina.length} de ${total} productos`;
    };

    if (cargando) return <Cargando texto="Cargando productos..." />;
    if (error) return <MensajeError mensaje={error} onReintentar={cargar} />;

    return (
        <section ref={listaRef} className={styles.container}>
            <h1>Productos</h1>

            <BarraBusqueda valor={busqueda} onCambiar={cambiarBusqueda} />

            <p className={styles.resumen} aria-live="polite">{textoResumen()}</p>

            {productosFiltrados.length === 0 ? (
                <div className={styles.vacio}>
                    <p>
                        {busqueda
                            ? `No encontramos alfajores que coincidan con "${busqueda}".`
                            : "Todavía no hay productos disponibles."}
                    </p>
                    {busqueda && (
                        <button type="button" onClick={() => cambiarBusqueda("")} className={styles.botonLimpiar}>
                            Ver todos los productos
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <ItemList productos={productosPagina} />
                    <Paginador
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        onCambiar={cambiarPagina}
                    />
                </>
            )}
        </section>
    );
};

export default ItemListContainer;