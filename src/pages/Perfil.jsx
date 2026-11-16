import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

const Perfil = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        await logout();
        navigate("/", { replace: true });
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.tarjeta}>
                <h1 className={styles.titulo}>Mi cuenta</h1>
                <p className={styles.subtitulo}>Sesión iniciada</p>

                <div className={styles.datos}>
                    {usuario.nombre && (
                        <div className={styles.dato}>
                            <span className={styles.datoLabel}>Nombre</span>
                            <span>{usuario.nombre} {usuario.apellido}</span>
                        </div>
                    )}
                    <div className={styles.dato}>
                        <span className={styles.datoLabel}>Email</span>
                        <span>{usuario.email}</span>
                    </div>
                    <div className={styles.dato}>
                        <span className={styles.datoLabel}>Tipo de cuenta</span>
                        <span>{usuario.rol === "admin" ? "Administrador" : "Cliente"}</span>
                    </div>
                </div>

                <button onClick={cerrarSesion} className={styles.botonSecundario}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Perfil;