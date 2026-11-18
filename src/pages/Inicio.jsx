import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from '../context/CarritoContext';
import { obtenerProductos } from "../firebase/productos";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import styles from './Inicio.module.css';

const INSTAGRAM_URL = 'https://www.instagram.com/lomas.sweet.alfajores/';
const WHATSAPP_URL = 'https://wa.me/5491100000000';

const IMAGEN_HERO = `${import.meta.env.BASE_URL}images/volcanDeChocolate.webp`;
const ID_DESTACADO = "6";
const CANTIDAD_DESTACADOS = 4;

const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        obtenerProductos()
            .then(setProductos)
            .catch((err) => {
                console.error(err);
                setError(true);
            })
            .finally(() => setCargando(false));
    }, []);

    const destacado = productos.find((p) => p.id === ID_DESTACADO);
    const masPedidos = productos.slice(0, CANTIDAD_DESTACADOS);

    return (
        <div className={styles.inicio}>
            <section className={styles.hero}>
                <div className={`${styles.wrapper} ${styles.heroInner}`}>
                    <div className={styles.heroText}>
                        <p className={styles.eyebrow}>Alfajores artesanales · Lomas de Zamora</p>
                        <h1 className={styles.heroTitle}>
                            Cortalo al medio.<br />El relleno habla solo.
                        </h1>
                        <p className={styles.heroLead}>
                            Rellenos caseros generosos, tapas chocolatosas y baños de chocolate.
                            Hechos todos los días, en tandas chicas.
                        </p>
                        <div className={styles.actions}>
                            <Link to="/productos" className={styles.btnPrimary}>
                                Ver productos
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                            <Link to="/contacto" className={styles.btnSecondary}>
                                Ver sucursales
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroImageBox}>
                        <img
                            src={IMAGEN_HERO}
                            alt="Alfajor Volcán de Chocolate cortado al medio"
                            className={styles.cover}
                            width="500"
                            height="500"
                            fetchPriority="high"
                        />
                    </div>
                </div>
            </section>

            <section className={styles.features} aria-label="Por qué Lomas Sweet">
                <div className={`${styles.wrapper} ${styles.featuresGrid}`}>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon} aria-hidden="true">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3c3 3 6 5.5 6 9a6 6 0 0 1-12 0c0-3.5 3-6 6-9z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className={styles.featureTitle}>Rellenos caseros</h2>
                            <p className={styles.featureText}>Cada sabor lleva su propio relleno, hecho en nuestra cocina.</p>
                        </div>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.featureIcon} aria-hidden="true">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                        </div>
                        <div>
                            <h2 className={styles.featureTitle}>Hechos todos los días</h2>
                            <p className={styles.featureText}>Tandas chicas para que lleguen frescos al mostrador.</p>
                        </div>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.featureIcon} aria-hidden="true">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                                <circle cx="12" cy="9.5" r="2.5" />
                            </svg>
                        </div>
                        <div>
                            <h2 className={styles.featureTitle}>3 sucursales en el sur</h2>
                            <p className={styles.featureText}>Lomas de Zamora, Banfield y Temperley.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.wrapper} ${styles.section}`}>
                <div className={styles.sectionHeader}>
                    <div>
                        <p className={styles.eyebrow}>Los más pedidos</p>
                        <h2 className={styles.sectionTitle}>Elegí tu favorito</h2>
                    </div>
                    <Link to="/productos" className={styles.textLink}>
                        Ver todos los sabores
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>

                {cargando ? (
                    <Cargando texto="Cargando sabores..." />
                ) : error ? (
                    <MensajeError mensaje="No pudimos cargar los productos. Probá recargar la página." />
                ) : (
                    <div className={styles.productGrid}>
                        {masPedidos.map((producto) => (
                            <article key={producto.id} className={styles.productCard}>
                                <Link to={`/producto/${producto.id}`} className={styles.productImageBox}>
                                    <img src={producto.image} alt={producto.title} className={styles.cover} />
                                </Link>
                                <div className={styles.productBody}>
                                    <h3 className={styles.productTitle}>{producto.title}</h3>
                                    <p className={styles.productDesc}>{producto.description}</p>
                                    <div className={styles.productFooter}>
                                        <span className={styles.productPrice}>
                                            AR${producto.price.toLocaleString('es-AR')}
                                        </span>
                                        <Link to={`/producto/${producto.id}`} className={styles.productLink}>
                                            Ver más
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )} 
            </section>

            {destacado && (
                <section className={styles.featured} aria-label="Sabor destacado">
                    <div className={`${styles.wrapper} ${styles.featuredInner}`}>
                        <div className={styles.featuredImageBox}>
                            <img src={destacado.image} alt={destacado.title} className={styles.cover} />
                        </div>
                        <div className={styles.featuredText}>
                            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Sabor destacado</p>
                            <h2 className={styles.featuredTitle}>
                                Tiramisú,<br />en formato alfajor.
                            </h2>
                            <p className={styles.featuredDesc}>{destacado.description}</p>
                            <p className={styles.featuredPrice}>
                                AR${destacado.price.toLocaleString('es-AR')}
                            </p>
                            <Link to={`/producto/${destacado.id}`} className={styles.btnLight}>
                                Probalo
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className={`${styles.wrapper} ${styles.section}`}>
                <div className={styles.ctaGrid}>
                    <div className={`${styles.ctaCard} ${styles.ctaWarm}`}>
                        <h2 className={styles.ctaTitle}>¿Para tu negocio o un evento?</h2>
                        <p className={styles.ctaText}>
                            Armamos pedidos mayoristas y cajas surtidas para cumpleaños, empresas y regalos.
                        </p>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 12a9 9 0 0 1-13.2 7.9L3 21l1.1-4.6A9 9 0 1 1 21 12z" />
                            </svg>
                            Escribinos por WhatsApp
                        </a>
                    </div>

                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Seguinos en Instagram</h2>
                        <p className={styles.ctaText}>
                            Sabores nuevos, ediciones limitadas y los cortes que más nos gustan.
                        </p>
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                            </svg>
                            @lomas.sweet.alfajores
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;