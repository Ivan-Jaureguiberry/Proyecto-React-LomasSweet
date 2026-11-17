import { Link } from "react-router-dom";
import Nav from "./Nav";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.headerWrapper}>
            <div className={styles.headerContainer}>
                <Link to="/" className={styles.brandLogo}>
                    Lomas Sweet
                </Link>
                <Nav />
            </div>
        </header>
    );
};

export default Header;