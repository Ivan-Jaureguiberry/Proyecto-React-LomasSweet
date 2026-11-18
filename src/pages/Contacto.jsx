import { useState } from "react";
import { enviarMensaje } from "../firebase/mensajes";
import { traducirError } from "../firebase/errores";
import {
    SUCURSALES, INSTAGRAM_URL, INSTAGRAM_USUARIO,
    WHATSAPP_URL, WHATSAPP_TEXTO, EMAIL_GENERAL, EMAIL_MAYORISTAS, linkMapa
} from "../data/contacto";
import styles from "./Contacto.module.css";

const MOTIVOS = [
    "Consulta general",
    "Pedido mayorista",
    "Eventos y regalos empresariales",
    "Reclamo o sugerencia"
];
const MAX_MENSAJE = 1000;
const estadoInicial = { nombre: "", email: "", motivo: MOTIVOS[0], mensaje: "" };

const canales = [
    {
        titulo: "WhatsApp",
        detalle: WHATSAPP_TEXTO,
        href: WHATSAPP_URL,
        externo: true,
        icono: <path d="M21 12a9 9 0 0 1-13.2 7.9L3 21l1.1-4.6A9 9 0 1 1 21 12z" />
    },
    {
        titulo: "Email",
        detalle: EMAIL_GENERAL,
        href: `mailto:${EMAIL_GENERAL}`,
        icono: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
            </>
        )
    },
    {
        titulo: "Ventas mayoristas",
        detalle: EMAIL_MAYORISTAS,
        href: `mailto:${EMAIL_MAYORISTAS}`,
        icono: (
            <>
                <path d="M21 8l-9-5-9 5 9 5 9-5z" />
                <path d="M3 8v8l9 5 9-5V8" />
                <path d="M12 13v8" />
            </>
        )
    },
    {
        titulo: "Instagram",
        detalle: INSTAGRAM_USUARIO,
        href: INSTAGRAM_URL,
        externo: true,
        icono: (
            <>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
            </>
        )
    }
];

const Contacto = () => {
    const [form, setForm] = useState(estadoInicial);
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [errorGeneral, setErrorGeneral] = useState(null);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }));
    };

    const validar = () => {
        const nuevos = {};
        if (!form.nombre.trim())
            nuevos.nombre = "Contanos tu nombre.";
        if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
            nuevos.email = "Ingresá un email válido.";
        if (form.mensaje.trim().length < 10)
            nuevos.mensaje = "El mensaje debe tener al menos 10 caracteres.";

        setErrores(nuevos);
        return Object.keys(nuevos).length === 0;
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setErrorGeneral(null);
        if (!validar()) return;

        setEnviando(true);
        try {
            await enviarMensaje({
                nombre: form.nombre.trim(),
                email: form.email.trim(),
                motivo: form.motivo,
                mensaje: form.mensaje.trim()
            });
            setEnviado(true);
            setForm(estadoInicial);
        } catch (err) {
            console.error("Error al enviar el mensaje:", err);
            setErrorGeneral(traducirError(err.code));
        } finally {
            setEnviando(false);
        }
    };

    // Props de accesibilidad para cada campo con posible error
    const propsError = (campo) => ({
        "aria-invalid": !!errores[campo],
        "aria-describedby": errores[campo] ? `error-${campo}` : undefined
    });

    const claseCampo = (campo, base = styles.input) =>
        `${base} ${errores[campo] ? styles.inputError : ""}`;

    return (
        <div className={styles.contacto}>
            <header className={styles.encabezado}>
                <p className={styles.eyebrow}>Contacto</p>
                <h1 className={styles.titulo}>Hablemos</h1>
                <p className={styles.bajada}>
                    ¿Tenés una consulta, querés hacer un pedido grande o armar cajas para un evento?
                    Escribinos y te respondemos dentro de las 24 h hábiles.
                </p>
            </header>

            <div className={styles.grid}>
                <section className={styles.tarjeta} aria-labelledby="titulo-form">
                    <h2 id="titulo-form" className={styles.subtitulo}>Envianos un mensaje</h2>

                    {enviado ? (
                        <div className={styles.exito} role="status">
                            <div className={styles.exitoIcono} aria-hidden="true">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12l5 5L20 7" />
                                </svg>
                            </div>
                            <h3>¡Gracias por escribirnos!</h3>
                            <p>Recibimos tu mensaje. Te vamos a responder por email lo antes posible.</p>
                            <button type="button" onClick={() => setEnviado(false)} className={styles.botonSecundario}>
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={manejarSubmit} className={styles.formulario} noValidate>
                            <div className={styles.fila}>
                                <div className={styles.campo}>
                                    <label htmlFor="nombre" className={styles.label}>Nombre</label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        maxLength={80}
                                        autoComplete="name"
                                        value={form.nombre}
                                        onChange={manejarCambio}
                                        className={claseCampo("nombre")}
                                        {...propsError("nombre")}
                                    />
                                    {errores.nombre && <span id="error-nombre" className={styles.mensajeError}>{errores.nombre}</span>}
                                </div>

                                <div className={styles.campo}>
                                    <label htmlFor="email" className={styles.label}>Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={manejarCambio}
                                        className={claseCampo("email")}
                                        {...propsError("email")}
                                    />
                                    {errores.email && <span id="error-email" className={styles.mensajeError}>{errores.email}</span>}
                                </div>
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="motivo" className={styles.label}>Motivo</label>
                                <select
                                    id="motivo"
                                    name="motivo"
                                    value={form.motivo}
                                    onChange={manejarCambio}
                                    className={styles.input}
                                >
                                    {MOTIVOS.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="mensaje" className={styles.label}>Mensaje</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    maxLength={MAX_MENSAJE}
                                    placeholder="Contanos en qué te podemos ayudar..."
                                    value={form.mensaje}
                                    onChange={manejarCambio}
                                    className={claseCampo("mensaje", styles.textarea)}
                                    {...propsError("mensaje")}
                                />
                                <div className={styles.pieCampo}>
                                    {errores.mensaje
                                        ? <span id="error-mensaje" className={styles.mensajeError}>{errores.mensaje}</span>
                                        : <span />}
                                    <span className={styles.contador}>{form.mensaje.length}/{MAX_MENSAJE}</span>
                                </div>
                            </div>

                            {errorGeneral && <p className={styles.errorGeneral} role="alert">{errorGeneral}</p>}

                            <button type="submit" className={styles.boton} disabled={enviando}>
                                {enviando ? "Enviando..." : "Enviar mensaje"}
                            </button>
                        </form>
                    )}
                </section>

                <aside aria-labelledby="titulo-canales">
                    <h2 id="titulo-canales" className={styles.subtitulo}>Otros canales</h2>
                    <ul className={styles.canales}>
                        {canales.map(canal => (
                            <li key={canal.titulo}>
                                <a
                                    href={canal.href}
                                    className={styles.canal}
                                    {...(canal.externo && { target: "_blank", rel: "noopener noreferrer" })}
                                >
                                    <span className={styles.icono} aria-hidden="true">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {canal.icono}
                                        </svg>
                                    </span>
                                    <span>
                                        <span className={styles.canalTitulo}>{canal.titulo}</span>
                                        <span className={styles.canalDetalle}>{canal.detalle}</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <section aria-labelledby="titulo-sucursales">
                <h2 id="titulo-sucursales" className={styles.subtitulo}>Nuestras sucursales</h2>
                <div className={styles.sucursales}>
                    {SUCURSALES.map(sede => (
                        <article key={sede.nombre} className={styles.sucursal}>
                            <h3 className={styles.sucursalNombre}>{sede.nombre}</h3>
                            <p className={styles.direccion}>{sede.direccion}</p>
                            <p className={styles.horario}>{sede.horario}</p>
                            <a
                                href={linkMapa(sede.direccion)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.comoLlegar}
                            >
                                Cómo llegar
                                <span className="sr-only"> a {sede.nombre} (se abre en Google Maps)</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M7 17L17 7M8 7h9v9" />
                                </svg>
                            </a>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Contacto;