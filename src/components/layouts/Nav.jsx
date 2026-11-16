import { NavLink, Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';

const Nav = () => {
    const { itemsEnCarrito } = useCarrito();
    const totalItems = itemsEnCarrito();
    const { usuario, esAdmin } = useAuth();

    const claseLink = ({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

    return (
        <nav className={styles.navContainer} aria-label="Principal">
            <ul className={styles.navList}>
                <li>
                    <NavLink to="/" end className={claseLink}>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/productos" className={claseLink}>
                        Productos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contacto" className={claseLink}>
                        Contacto
                    </NavLink>
                </li>
                <li>
                    <Link 
                        to="/carrito"
                        className={styles.cartButton}
                        aria-label={`Carrito, ${totalItems} productos`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="20" r="1.5" />
                            <circle cx="18" cy="20" r="1.5" />
                            <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
                        </svg>
                        <span className={styles.cartCount}>{totalItems}</span>
                    </Link>
                </li>
                {esAdmin && (
                    <li>
                        <NavLink to="/panel" className={claseLink}>Panel</NavLink>
                    </li>
                )}
                <li>
                    {usuario ? (
                        <NavLink to="/perfil" className={claseLink}>Mi cuenta</NavLink>
                    ) : (
                        <NavLink to="/login" className={claseLink}>Ingresar</NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Nav;