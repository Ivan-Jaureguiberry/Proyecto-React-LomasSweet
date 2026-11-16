import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { traducirError } from "../firebase/errores";
import styles from "./Auth.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const destino = location.state?.desde || "/";

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password) {
            setError("Completá el mail y la contraseña.");
            return;
        }

        setEnviado(true);
        try {
            await login(email, password);
            navigate(destino, { replace: true });
        } catch(err) {
            setError(traducirError(err.code));
        } finally {
            setEnviado(false);
        }
    };

    return (
        <div className = {styles.contenedor}>
            <div className = {styles.tarjeta}>
                <h1 className = {styles.titulo}>Iniciar Sesión</h1>
                <p className= {styles.subtitulo}>Ingresá con tu cuenta</p>

                <form onSubmir = {manejarSubmit} className = {styles.formulario} noValidate>
                    <div className = {styles.campo}>
                        <label htmlFor="email" className = {styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className = {styles.input}
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>

                    <div className = {styles.campo}>
                        <label htmlFor="password" className = {styles.label}>Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            className = {styles.input}
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className = {styles.error} role="alert">{error}</p>}

                    <button type="submit" className = {styles.boton} disabled={enviando}>
                        {enviando ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <p className = {styles.pie}>
                    ¿No tenés cuenta? <Link to="/registro" className = {styles.enlace}>Registrate</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;