import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { traducirError } from "../firebase/errores";
import styles from "./Auth.module.css";

const estadoInicial = { nombre: "", apellido: "", email: "", password: "", confirmar: "" };

const Registro = () => {
    const [form, setForm] = useState(estadoInicial);
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const { registrar } = useAuth();
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validar = () => {
        if (!form.nombre.trim() || !form.apellido.trim()) return "Completá nombre y apellido.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "El email no es válido.";
        if (form.passwordlength < 6) return "La contraseña debe tener al menos 6 caracteres.";
        if (form.password !== form.confirmar) return "Las contraseñas no coinciden.";
        return null;
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        const errorValidacion = validar();
        if (errorValidacion) {
            setError(errorValidacion);
            return;
        }

        setError(null);
        setEnviando(true);
        try {
            await registrar({
                nombre: form.nombre.trim(),
                apellido: form.apellido.trim(),
                email: form.email.trim(),
                password: form.password
            });
            navigate("/", { replace: true });
        } catch (err) {
            setError(traducirError(err.code));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.tarjeta}>
                <h1 className={styles.titulo}>Crear cuenta</h1>
                <p className={styles.subtitulo}>Regístrate para comprar más rápido</p>

                <form onSubmit={manejarSubmit} className={styles.formulario} noValidate>
                    <div className={styles.fila}>
                        <div className={styles.campo}>
                            <label htmlFor="nombre" className={styles.label}>Nombre</label>
                            <input id="nombre" name="nombre" className={styles.input}
                                value={form.nombre} onChange={manejarCambio} autocomplete="given-name" />
                        </div>
                        <div className={styles.campo}>
                            <label htmlFor="apellido" className={styles.label}>Apellido</label>
                            <input id="apellido" name="apellido" className={styles.input}
                                value={form.apellido} onChange={manejarCambio} autocomplete="family-name" />
                        </div>
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input id="email" name="email" type="email" className={styles.input}
                            value={form.email} onChange={manejarCambio} autocomplete="email" />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <input id="password" name="password" type="password" className={styles.input}
                            value={form.password} onChange={manejarCambio}
                            placeholder="Mínimo 6 caracteres" autocomplete="new-password" />
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="confirmar" className={styles.label}>Repetir contraseña</label>
                        <input id="confirmar" name="confirmar" type="password" className={styles.input}
                            value={form.confirmar} onChange={manejarCambio} autocomplete="new-password" />
                    </div>

                    {error && <p className={styles.error} role="alert">{error}</p>}

                    <button type="submit" className={styles.boton} disabled={enviando}>
                        {enviando ? "Creando cuenta..." : "Registrarme"}
                    </button>
                </form>

                <p className={styles.pie}>
                    ¿Ya tenés cuenta? <Link to="/login" className={styles.enlace}>Iniciá sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Registro;