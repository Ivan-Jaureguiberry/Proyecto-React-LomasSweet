import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Nav.module.css';

const Nav = () => {
    const { itemsEnCarrito } = useCarrito();
    const totalItems = itemsEnCarrito();
    const { usuario, esAdmin } = useAuth();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    // Cerrar el menú con la tecla Escape
    useEffect(() => {
        if (!menuAbierto) return;
        const alPresionar = (e) => {
            if (e.key === "Escape") setMenuAbierto(false);
        };
        document.addEventListener("keydown", alPresionar);
        return () => document.removeEventListener("keydown", alPresionar);
    }, [menuAbierto]);

    const claseLink = ({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

    return (
        <nav className={styles.navContainer} aria-label="Principal">
            <ul
                id="menu-principal"
                className={`${styles.navList} ${menuAbierto ? styles.abierto : ""}`}
            >
                <li>
                    <NavLink to="/" end className={claseLink} onClick={cerrarMenu}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/productos" className={claseLink} onClick={cerrarMenu}>Productos</NavLink>
                </li>
                <li>
                    <NavLink to="/contacto" className={claseLink} onClick={cerrarMenu}>Contacto</NavLink>
                </li>
                {esAdmin && (
                    <li>
                        <NavLink to="/panel" className={claseLink} onClick={cerrarMenu}>Panel</NavLink>
                    </li>
                )}
                <li>
                    {usuario ? (
                        <NavLink to="/perfil" className={claseLink} onClick={cerrarMenu}>Mi cuenta</NavLink>
                    ) : (
                        <NavLink to="/login" className={claseLink} onClick={cerrarMenu}>Ingresar</NavLink>
                    )}
                </li>
            </ul>

            <Link
                to="/carrito"
                className={styles.cartButton}
                aria-label={`Carrito, ${totalItems} productos`}
                onClick={cerrarMenu}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="9" cy="20" r="1.5" />
                    <circle cx="18" cy="20" r="1.5" />
                    <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
                </svg>
                <span className={styles.cartCount}>{totalItems}</span>
            </Link>

            <button
                type="button"
                className={styles.menuButton}
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-expanded={menuAbierto}
                aria-controls="menu-principal"
                aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    {menuAbierto ? (
                        <path d="M6 6l12 12M18 6L6 18" />
                    ) : (
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    )}
                </svg>
            </button>
        </nav>
    );
};

export default Nav;