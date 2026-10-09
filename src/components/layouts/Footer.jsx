import { useState } from 'react';
import styles from './Footer.module.css';

const INSTAGRAM_URL = 'https://www.instagram.com/lomas.sweet.alfajores/';

const sedes = [
    {
        nombre: 'Casa Central',
        direccion: 'Av. Hipólito Yrigoyen 8950, Lomas de Zamora',
        horario: 'Lun a Sáb · 9 a 20 h',
    },
    {
        nombre: 'Sucursal Banfield',
        direccion: 'Maipú 320, Banfield',
        horario: 'Lun a Sáb · 10 a 19 h',
    },
    {
        nombre: 'Sucursal Temperley',
        direccion: 'Av. Meeks 150, Temperley',
        horario: 'Mar a Dom · 10 a 20 h',
    },
];

const equipo = [
    {
        nombre: 'Agustina López',
        rol: 'Fundadora & Maestra Pastelera',
        descripcion: 'Crea cada receta y cuida que todos los rellenos sean caseros.',
    },
    {
        nombre: 'Lucas Fernández',
        rol: 'Producción',
        descripcion: 'Coordina la cocina y el bañado de cada tanda de alfajores.',
    },
    {
        nombre: 'Belén Ramírez',
        rol: 'Atención al Cliente',
        descripcion: 'Responde pedidos, consultas y arma los envíos mayoristas.',
    },
];

const obtenerIniciales = (nombre) =>
    nombre
        .split(' ')
        .map((parte) => parte[0])
        .slice(0,2)
        .join('')
        .toUpperCase();

const Footer = () => {
    const anioActual = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [suscripto, setSuscripto] = useState(false);

    const manejarSuscripcion = (e) => {
        e.preventDefault();
        setSuscripto(true);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            <section className={styles.team} aria-labelledby='equipo-titulo'>
                <h2 id="equipo-titulo" className={styles.sectionTitle}>Nuestro equipo</h2>
                <div className={styles.teamGrid}>
                    {equipo.map((persona) => (
                        <article key={persona.nombre} className={styles.personCard}>
                            <div className={styles.avatar} aria-hidden="true">
                                {obtenerIniciales(persona.nombre)}
                            </div>
                            <h3 className={styles.personName}>{persona.nombre}</h3>
                            <p className={styles.personRole}>{persona.rol}</p>
                            <p className={styles.personDesc}>{persona.descripcion}</p>
                        </article>
                    ))}
                </div>
            </section>

            <div className={styles.columns}>
                <div className={styles.column}>
                    <p className={styles.logo}>Lomas Sweet</p>
                    <p className={styles.text}>
                        Alfajores artesanales con rellenos caseros, hechos todos los días en Lomas de Zamora. 
                    </p>

                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.social}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                        </svg>
                        @lomas.sweet.alfajores
                    </a>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Sucursales</h3>
                    <ul className={styles.list}>
                        {sedes.map((sede) => (
                            <li key={sede.nombre} className={styles.sede}>
                                <strong>{sede.nombre}</strong>
                                <span>{sede.direccion}</span>
                                <span className={styles.muted}>{sede.horario}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <nav className={styles.column} aria-label="Contacto y legales">
                    <h3 className={styles.columnTitle}>Contacto</h3>
                    <ul className={styles.list}>
                        <li>
                            <a href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                Whatsapp: 11 0000-0000
                            </a>
                        </li>
                        <li>
                            <a href="mailto:hola@lomassweet.com.ar" className={styles.link}>
                                hola@lomassweet.com.ar
                            </a>
                        </li>
                        <li>
                            <a href="mailto:mayoristas@lomassweet.com.ar" className={styles.link}>
                                Ventas mayoristas
                            </a>
                        </li>
                    </ul>

                    <h3 className={`${styles.columnTitle} ${styles.spaced}`}>Legal</h3>
                    <ul className={styles.list}>
                        <li><a href="#privacidad" className={styles.link}>Políticas de privacidad</a></li>
                        <li><a href="#terminos" className={styles.link}>Términos y condiciones</a></li>
                    </ul>
                </nav>
                
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Newsletter</h3>
                    <p className={styles.text}>
                        Enterate primero de los sabores nuevos y las promos de la semana.
                    </p>
                    <form className={styles.newsletter} onSubmit={manejarSuscripcion}>
                        <label htmlFor="newsletter-email" className={styles.srOnly}>
                            Tu email
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            required
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setSuscripto(false);
                            }}
                            onInvalid={(e) => e.target.setCustomValidity('Ingresa un email válido')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>
                            Suscribirme
                        </button>
                    </form>
                    {suscripto && (
                        <p className={styles.success} role="status">¡Listo! Ya estás suscripto.</p>
                    )}
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>
                    © {anioActual} <span className={styles.brand}>Lomas Sweet</span>. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;